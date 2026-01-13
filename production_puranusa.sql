-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 13 Jan 2026 pada 14.27
-- Versi server: 10.11.13-MariaDB-0ubuntu0.24.04.1
-- Versi PHP: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `production_puranusa`
--

DELIMITER $$
--
-- Prosedur
--
CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus` (IN `m_id` INT, IN `in_date` DATE, IN `v_bonus` DECIMAL(15,2))  MODIFIES SQL DATA BEGIN

  DECLARE v_id INT DEFAULT NULL;
  DECLARE d_start, d_end DATE;

  SELECT `id` INTO v_id FROM `customer_bonuses` WHERE `member_id`=m_id AND `date`=in_date LIMIT 0,1;
    IF v_id IS NULL THEN
      INSERT INTO customer_bonuses (`member_id`,`amount`,`date`) VALUES (m_id,v_bonus,in_date);
    ELSE
      UPDATE `customer_bonuses` SET `amount`=`amount` + v_bonus WHERE `id`=v_id;
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_cashback` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_bonus DECIMAL(15,2);

    SELECT customer_id, cashback_amount
    INTO v_customer, v_bonus
    FROM orders
    WHERE id = p_order_id;

    IF v_bonus > 0 THEN
        INSERT INTO customer_bonus_cashbacks
        VALUES (
            NULL, v_customer, p_order_id,
            v_bonus, 0, 0,
            CONCAT('Cashback Plan B - Order#', p_order_id),
            NOW(), NULL
        );
    END IF;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_engine_run` (IN `p_order_id` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    CALL sp_validate_order(p_order_id);
    CALL sp_update_personal_omzet(p_order_id);
    CALL sp_update_group_omzet(p_order_id);

    CALL sp_bonus_plan_a(p_order_id);
    CALL sp_bonus_plan_b(p_order_id);

    CALL sp_finalize_order(p_order_id);

    COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_matching` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_sponsor INT DEFAULT NULL;
    DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
    DECLARE v_level VARCHAR(50);
    DECLARE v_parent INT;
    DECLARE v_guard INT DEFAULT 0;

    DECLARE l1 INT DEFAULT 0;
    DECLARE l2 INT DEFAULT 0;
    DECLARE l3 INT DEFAULT 0;
    DECLARE l4 INT DEFAULT 0;

    -- Ambil data awal dari order
    SELECT o.customer_id, c.sponsor_id, o.match_amount
    INTO v_customer, v_sponsor, v_bonus
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    -- Label 'matching_loop' ditambahkan agar LEAVE bisa bekerja
    matching_loop: WHILE v_sponsor IS NOT NULL AND v_guard < 100 DO
        SET v_guard = v_guard + 1;

        SELECT level, sponsor_id
        INTO v_level, v_parent
        FROM customers WHERE id = v_sponsor;

        SET @pay := 0;

        -- Logika Penentuan Bonus
        IF v_level = 'Associate' AND l1 = 0 THEN
            SET @pay = v_bonus * 0.25; 
            SET l1 = 1;

        ELSEIF v_level = 'Senior Associate' AND l2 = 0 THEN
            SET @pay = IF(l1 = 0, v_bonus * 0.5, v_bonus * 0.25); 
            SET l1 = 1; 
            SET l2 = 1;

        ELSEIF v_level = 'Executive' AND l3 = 0 THEN
            SET @pay = IF(l1 + l2 = 0, v_bonus * 0.75,
                     IF(l1 = 1 AND l2 = 0, v_bonus * 0.5,
                     IF(l1 = 1 AND l2 = 1, v_bonus * 0.25, 0)));
            SET l1 = 1; SET l2 = 1; SET l3 = 1;

        ELSEIF v_level = 'Director' AND l4 = 0 THEN
            SET @pay = IF(l1 + l2 + l3 = 0, v_bonus,
                     IF(l1 = 1 AND l2 = 0 AND l3 = 0, v_bonus * 0.75,
                     IF(l1 = 1 AND l2 = 1 AND l3 = 0, v_bonus * 0.5,
                     IF(l1 = 1 AND l2 = 1 AND l3 = 1, v_bonus * 0.25, 0))));
            SET l1 = 1; SET l2 = 1; SET l3 = 1; SET l4 = 1;

        END IF;

        -- Input ke tabel bonus jika ada pembayaran
        IF @pay > 0 THEN
            INSERT INTO customer_bonus_matchings
            (member_id, from_member_id, level, amount, status, description, created_at, updated_at)
            VALUES (
                v_sponsor, v_customer,
                v_level, @pay, 0,
                CONCAT('Matching Plan A - Order#', p_order_id),
                NOW(), NULL
            );
        END IF;

        -- Keluar dari loop jika level tertinggi (Director) sudah tercapai
        IF l4 = 1 THEN 
            LEAVE matching_loop; 
        END IF;

        SET v_sponsor = v_parent;
    END WHILE matching_loop;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_pairing` (IN `p_order_id` INT, IN `p_pair_value` DECIMAL(15,2), IN `p_bonus` DECIMAL(15,2))   BEGIN
    DECLARE v_customer INT;
    DECLARE v_upline INT;
    DECLARE v_left DECIMAL(15,2);
    DECLARE v_right DECIMAL(15,2);
    DECLARE v_daily INT;
    DECLARE v_max INT;
    DECLARE v_last DATE;
    DECLARE v_parent INT;
    DECLARE v_guard INT DEFAULT 0;

    SELECT customer_id, upline_id
    INTO v_customer, v_upline
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    WHILE v_upline IS NOT NULL AND v_guard < 100 DO
        SET v_guard = v_guard + 1;

        SELECT omzet_pairing_left,
               omzet_pairing_right,
               daily_pairing,
               max_daily_pairing,
               last_pairing_date,
               upline_id
        INTO v_left, v_right, v_daily, v_max, v_last, v_parent
        FROM customers
        WHERE id = v_upline
        FOR UPDATE;

        IF v_last <> CURRENT_DATE() OR v_last IS NULL THEN
            UPDATE customers
            SET daily_pairing = 0,
                last_pairing_date = CURRENT_DATE()
            WHERE id = v_upline;
            SET v_daily = 0;
        END IF;

        SET @possible = FLOOR(LEAST(v_left, v_right) / p_pair_value);
        SET @exec = LEAST(@possible, v_max - v_daily);

        IF @exec > 0 THEN
            INSERT INTO customer_bonus_pairings (
                member_id, source_member_id,
                amount, pairing_count, status, pairing_date,
                created_at
            )
            VALUES (
                v_upline, v_customer,
                p_bonus * @exec, @exec, 0,
                CURRENT_DATE(), NOW()
            )
            ON DUPLICATE KEY UPDATE
                amount = amount + VALUES(amount),
                pairing_count = pairing_count + VALUES(pairing_count);

            UPDATE customers
            SET omzet_pairing_left  = omzet_pairing_left  - (p_pair_value * @exec),
                omzet_pairing_right = omzet_pairing_right - (p_pair_value * @exec),
                daily_pairing     = daily_pairing + @exec
            WHERE id = v_upline;
        END IF;

        SET v_upline = v_parent;
    END WHILE;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_pairing_manual` (IN `p_order_id` INT, IN `p_pair_value` DECIMAL(15,2), IN `p_bonus` DECIMAL(15,2))   BEGIN
    DECLARE v_customer INT;
    DECLARE v_upline INT;
    DECLARE v_left DECIMAL(15,2);
    DECLARE v_right DECIMAL(15,2);
    DECLARE v_daily INT;
    DECLARE v_max INT;
    DECLARE v_last DATE;
    DECLARE v_parent INT;
    DECLARE v_guard INT DEFAULT 0;
    DECLARE v_date DATE;
    DECLARE v_datetime DATETIME;

    SELECT o.customer_id, c.upline_id, DATE(o.created_at), o.created_at
    INTO v_customer, v_upline, v_date, v_datetime
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    WHILE v_upline IS NOT NULL AND v_guard < 200 DO
        SET v_guard = v_guard + 1;

        SELECT omzet_pairing_left,
               omzet_pairing_right,
               daily_pairing,
               max_daily_pairing,
               last_pairing_date,
               upline_id
        INTO v_left, v_right, v_daily, v_max, v_last, v_parent
        FROM customers
        WHERE id = v_upline
        FOR UPDATE;

        IF v_last <> v_date OR v_last IS NULL THEN
            UPDATE customers
            SET daily_pairing = 0,
                last_pairing_date = v_date
            WHERE id = v_upline;
            SET v_daily = 0;
        END IF;

        SET @possible = FLOOR(LEAST(v_left, v_right) / p_pair_value);
        SET @exec = LEAST(@possible, v_max - v_daily);

        IF @exec > 0 THEN
            INSERT INTO customer_bonus_pairings (
                member_id, source_member_id,
                amount, pairing_count, status, pairing_date,
                created_at
            )
            VALUES (
                v_upline, v_customer,
                p_bonus * @exec, @exec, 0,
                v_date, v_datetime
            )
            ON DUPLICATE KEY UPDATE
                amount = amount + VALUES(amount),
                pairing_count = pairing_count + VALUES(pairing_count);

            UPDATE customers
            SET omzet_pairing_left  = omzet_pairing_left  - (p_pair_value * @exec),
                omzet_pairing_right = omzet_pairing_right - (p_pair_value * @exec),
                daily_pairing     = daily_pairing + @exec
            WHERE id = v_upline;
        END IF;

        SET v_upline = v_parent;
    END WHILE;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_pairing_placement` (IN `p_customer_id` INT, IN `p_pair_value` DECIMAL(15,2), IN `p_bonus` DECIMAL(15,2))   BEGIN
    DECLARE v_customer INT;
    DECLARE v_upline INT;
    DECLARE v_left DECIMAL(15,2);
    DECLARE v_right DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pairing DECIMAL(15,2) DEFAULT 0;
    DECLARE v_daily INT;
    DECLARE v_max INT;
    DECLARE v_last DATE;
    DECLARE v_parent INT;
    DECLARE v_guard INT DEFAULT 0;

	SELECT SUM(pairing_amount)
    INTO v_pairing
    FROM orders
    WHERE customer_id = p_customer_id AND `status`='PAID';
    
    IF v_pairing > 0 AND v_pairing IS NOT NULL THEN
        SELECT upline_id
        INTO v_upline
        FROM customers
        WHERE id = p_customer_id;

        SET v_customer=p_customer_id;

        WHILE v_upline IS NOT NULL AND v_guard < 100 DO
            SET v_guard = v_guard + 1;

            SELECT omzet_pairing_left,
                   omzet_pairing_right,
                   daily_pairing,
                   max_daily_pairing,
                   last_pairing_date,
                   upline_id
            INTO v_left, v_right, v_daily, v_max, v_last, v_parent
            FROM customers
            WHERE id = v_upline
            FOR UPDATE;

            IF v_last <> CURRENT_DATE() OR v_last IS NULL THEN
                UPDATE customers
                SET daily_pairing = 0,
                    last_pairing_date = CURRENT_DATE()
                WHERE id = v_upline;
                SET v_daily = 0;
            END IF;

            SET @possible = FLOOR(LEAST(v_left, v_right) / p_pair_value);
            SET @exec = LEAST(@possible, v_max - v_daily);

            IF @exec > 0 THEN
                INSERT INTO customer_bonus_pairings (
                    member_id, source_member_id,
                    amount, pairing_count, status, pairing_date,
                    created_at
                )
                VALUES (
                    v_upline, v_customer,
                    p_bonus * @exec, @exec, 0,
                    CURRENT_DATE(), NOW()
                )
                ON DUPLICATE KEY UPDATE
                    amount = amount + VALUES(amount),
                    pairing_count = pairing_count + VALUES(pairing_count);

                UPDATE customers
                SET omzet_pairing_left  = omzet_pairing_left  - (p_pair_value * @exec),
                    omzet_pairing_right = omzet_pairing_right - (p_pair_value * @exec),
                    daily_pairing     = daily_pairing + @exec
                WHERE id = v_upline;
            END IF;

            SET v_upline = v_parent;
        END WHILE;
    END IF;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_plan_a` (IN `p_order_id` INT)   BEGIN
    IF (SELECT type FROM orders WHERE id = p_order_id) = 'planA' THEN
        CALL sp_bonus_sponsor(p_order_id);
        CALL sp_bonus_matching(p_order_id);
        CALL sp_bonus_pairing(p_order_id, 350000,20000);
        /*CALL sp_bonus_reward(p_order_id);*/
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_plan_b` (IN `p_order_id` INT)   BEGIN
    IF (SELECT type FROM orders WHERE id = p_order_id) = 'planB' THEN
        CALL sp_bonus_retail(p_order_id);
        CALL sp_bonus_cashback(p_order_id);
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_retail` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_sponsor INT;
    DECLARE v_bonus DECIMAL(15,2);

    SELECT o.customer_id, c.sponsor_id, o.retail_amount
    INTO v_customer, v_sponsor, v_bonus
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    IF v_sponsor IS NOT NULL AND v_bonus > 0 THEN
        INSERT INTO customer_bonus_retails
        VALUES (
            NULL, v_sponsor, v_customer,
            v_bonus, 0, 0,
            CONCAT('Retail Plan B - Order#', p_order_id),
            NOW(), NULL
        );
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_sponsor` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_sponsor INT;
    DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;

    SELECT o.customer_id, c.sponsor_id, o.sponsor_amount
    INTO v_customer, v_sponsor, v_bonus
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    IF v_sponsor IS NOT NULL AND v_bonus > 0 THEN
        INSERT INTO customer_bonus_sponsors
        VALUES (
            NULL, v_sponsor, v_customer,
            v_bonus, 0, 0,
            CONCAT('Sponsor Plan A - Order#', p_order_id),
            NOW(), NULL
        );
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_bonus_sponsor_placement` (IN `p_customer_id` INT)   BEGIN
    DECLARE v_sponsor INT;
    DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;

    SELECT SUM(sponsor_amount)
    INTO v_bonus
    FROM orders
    WHERE customer_id = p_customer_id AND `status`='PAID';
    
    IF v_bonus > 0 AND v_bonus IS NOT NULL THEN
        SELECT sponsor_id INTO v_sponsor FROM customers WHERE id=p_customer_id;
        IF v_sponsor IS NOT NULL AND v_bonus > 0 THEN
            INSERT INTO customer_bonus_sponsors
            VALUES (
                NULL, v_sponsor, p_customer_id,
                v_bonus, 0, 0,
                CONCAT('Sponsor Plan A - Placement'),
                NOW(), NULL
            );
        END IF;
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_ewallet` (IN `in_date` DATE)   BEGIN

  DECLARE v_id,v_memberid INT DEFAULT NULL;
  DECLARE v_phone,v_uname,v_fname VARCHAR(50);
  DECLARE v_bonus,v_tax,v_bp, v_index,v_idx, v_ewallet, v_balance DECIMAL(15,2) DEFAULT 0;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT bns.id,bns.member_id, bns.amount,bns.index_value,bns.tax_value,m.username,m.name,m.phone,m.ewallet_saldo
      FROM customer_bonuses bns, customers m
      WHERE bns.member_id=m.id AND bns.date= in_date AND bns.status=0;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;

  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_id, v_memberid, v_bonus,v_index, v_tax,v_uname,v_fname,v_phone,v_balance;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

    /*SET v_idx=(v_bonus*v_index)/100;*/
    SET v_ewallet = v_bonus - REPLACE(v_tax,'-','');

    UPDATE `customers` SET `ewallet_saldo`=`ewallet_saldo` + v_ewallet WHERE id=v_memberid;

    INSERT INTO customer_wallet_transactions (`customer_id`,`type`,`amount`,`balance_before`,`balance_after`,`status`,`notes`,`completed_at`,`created_at`) 
    VALUES (v_memberid,'bonus',v_bonus,v_balance,v_balance + v_bonus,'completed',concat('Akumulasi komisi tanggal  ',in_date),NOW(),NOW());

    /*IF v_idx > 0 THEN
      INSERT INTO tbl_ewallet_transaction (`member_id`,`type`,`debit`,`note`) VALUES (v_memberid,1,v_idx,concat('Index bonus tanggal ',in_date));
    END IF;*/

    INSERT INTO customer_wallet_transactions (`customer_id`,`type`,`amount`,`balance_before`,`balance_after`,`status`,`notes`,`completed_at`,`created_at`) 
    VALUES (v_memberid,'tax',REPLACE(v_tax,'-',''),v_balance + v_bonus,(v_balance + v_bonus) - REPLACE(v_tax,'-',''),'completed',concat('Pajak komisi tanggal  ',in_date),NOW(),NOW());

    /*INSERT INTO `tbl_whatsapp` VALUES (NULL,v_memberid,CONCAT(v_fname,' (',v_uname,')'),v_phone,in_date,FORMAT(v_bonus,0),NULL,1,0,NOW());*/

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_finalize_order` (IN `p_order_id` INT)   BEGIN
    UPDATE orders
    SET bonus_generated = 1,
        processed_at = NOW()
    WHERE id = p_order_id;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus` ()   BEGIN

  DECLARE l_curdate,in_date,l_tgl1 DATE;
  DECLARE l_month,l_tgl,l_thari INTEGER DEFAULT 0;
  DECLARE d_start, d_end DATE;
  
  START TRANSACTION;
  
    SET l_curdate = CURDATE();
    SELECT DATE_ADD(l_curdate, INTERVAL -1 DAY) INTO in_date;

    SELECT LAST_DAY(in_date - INTERVAL 1 MONTH) + INTERVAL 1 DAY INTO l_tgl1;
    SELECT DAY(l_curdate) INTO l_tgl;
    SELECT DAY(LAST_DAY(CURRENT_DATE)) INTO l_thari;
    
    CALL sp_generate_bonus_sponsor(in_date);
    CALL sp_generate_bonus_pairing(in_date);
    CALL sp_generate_bonus_matching(in_date);
    CALL sp_generate_bonus_retail(in_date);
    CALL sp_generate_bonus_cashback(in_date);
    
    /*CALL sp_index(in_date);*/
    CALL sp_pph21(in_date,in_date);
    CALL sp_ewallet(in_date);
  
  IF DAY(NOW()) = 1 THEN
    SET d_start=last_day(curdate() - interval 2 month) + interval 1 day;
    SET d_end= last_day(curdate() - interval 1 month);
    CALL sp_pph21_report(d_start,d_end);
  END IF;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus_cashback` (IN `in_date` DATE)  MODIFIES SQL DATA BEGIN

  DECLARE v_memberid INT DEFAULT 0;
  DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
  DECLARE v_date DATE;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT `member_id`, SUM(`amount`)AS bns, DATE(`created_at`)
      FROM `customer_bonus_cashbacks`
      /*WHERE DATE(`created_at`)=in_date AND `status`=0*/
      WHERE `status`=0
      GROUP BY `member_id`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_memberid, v_bonus, v_date;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

    call sp_bonus(v_memberid,in_date,v_bonus);
    UPDATE `customer_bonus_cashbacks` SET `status`=1 WHERE `member_id`=v_memberid AND `status`=0;

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus_matching` (IN `in_date` DATE)  MODIFIES SQL DATA BEGIN

  DECLARE v_memberid INT DEFAULT 0;
  DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
  DECLARE v_date DATE;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT `member_id`, SUM(`amount`)AS bns, DATE(`created_at`)
      FROM `customer_bonus_matchings`
      /*WHERE DATE(`created_at`)=in_date AND `status`=0*/
      WHERE `status`=0
      GROUP BY `member_id`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_memberid, v_bonus, v_date;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

  call sp_bonus(v_memberid,in_date,v_bonus);
    UPDATE `customer_bonus_matchings` SET `status`=1 WHERE `member_id`=v_memberid AND `status`=0;

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus_pairing` (IN `in_date` DATE)  MODIFIES SQL DATA BEGIN

  DECLARE v_memberid INT DEFAULT 0;
  DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
  DECLARE v_date DATE;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT `member_id`, SUM(`amount`)AS bns, DATE(`created_at`)
      FROM `customer_bonus_pairings`
      /*WHERE DATE(`created_at`)=in_date AND `status`=0*/
      WHERE `status`=0
      GROUP BY `member_id`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_memberid, v_bonus, v_date;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

  call sp_bonus(v_memberid,in_date,v_bonus);
    UPDATE `customer_bonus_pairings` SET `status`=1 WHERE `member_id`=v_memberid AND `status`=0;

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus_retail` (IN `in_date` DATE)  MODIFIES SQL DATA BEGIN

  DECLARE v_memberid INT DEFAULT 0;
  DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
  DECLARE v_date DATE;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT `member_id`, SUM(`amount`)AS bns, DATE(`created_at`)
      FROM `customer_bonus_retails`
      /*WHERE DATE(`created_at`)=in_date AND `status`=0*/
      WHERE `status`=0
      GROUP BY `member_id`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_memberid, v_bonus, v_date;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

    call sp_bonus(v_memberid,in_date,v_bonus);
    UPDATE `customer_bonus_retails` SET `status`=1 WHERE `member_id`=v_memberid AND `status`=0;

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_bonus_sponsor` (IN `in_date` DATE)  MODIFIES SQL DATA BEGIN

  DECLARE v_memberid INT DEFAULT 0;
  DECLARE v_bonus DECIMAL(15,2) DEFAULT 0;
  DECLARE v_date DATE;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT `member_id`, SUM(`amount`)AS bns, DATE(`created_at`)
      FROM `customer_bonus_sponsors`
      /*WHERE DATE(`created_at`)=in_date AND `status`=0*/
      WHERE `status`=0
      GROUP BY `member_id`;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_memberid, v_bonus, v_date;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

	call sp_bonus(v_memberid,in_date,v_bonus);
    UPDATE `customer_bonus_sponsors` SET `status`=1 WHERE `member_id`=v_memberid AND `status`=0;

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_reward_plana` (IN `v_mid` INT, IN `v_left` INT, IN `v_right` INT)   BEGIN

  DECLARE v_id INT DEFAULT NULL;

  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    select id from rewards where type=0 AND `start`<=CURRENT_DATE AND `end`>=CURRENT_DATE AND status=1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;
  
  START TRANSACTION;

  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_id;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;

      CALL sp_generate_reward_plana_detail(v_mid,v_id,v_left,v_right);

  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_generate_reward_plana_detail` (IN `v_mid` INT, IN `v_rid` INT, IN `vp_left` DECIMAL(15,2), IN `vp_right` DECIMAL(15,2))   BEGIN
      
      DECLARE v_id INT DEFAULT NULL;
      DECLARE v_status INT DEFAULT NULL;

      START TRANSACTION;

      SELECT id,status INTO v_id,v_status FROM `customer_bv_rewards` WHERE member_id=v_mid AND reward_id=v_rid LIMIT 1;
      IF v_id IS NOT NULL AND v_status=0 THEN
        UPDATE customer_bv_rewards SET omzet_left=omzet_left + vp_left,omzet_right=omzet_right + vp_right WHERE id=v_id;
      ELSEIF v_id IS NULL THEN
        INSERT INTO customer_bv_rewards (member_id,reward_id,omzet_left,omzet_right,status,created_on) VALUES (v_mid,v_rid,vp_left,vp_right,0,NOW());
      END IF;

      COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_pph21` (IN `in_tglawal` DATE, IN `in_tglakhir` DATE)  MODIFIES SQL DATA BEGIN
  DECLARE l_ptkp_default DOUBLE DEFAULT 3000000; 
  
  DECLARE l_titlebonus INTEGER DEFAULT 99;
  DECLARE v_id, v_memberid,l_countnpwp,l_countpph,l_countpph2,l_countpph3,l_countnpwp2,l_newyear,l_jmlanak INTEGER DEFAULT 0;
  
  DECLARE l_nama, l_kerja, l_office, l_nonpwp, l_menikah,l_menikah2 VARCHAR(50) DEFAULT '';
  DECLARE l_alamat VARCHAR(225) DEFAULT '';
  DECLARE l_bruto,l_ptkp,l_totalpph, v_bruto, akumulasi_t,l_akumulasi_ptkp DOUBLE DEFAULT 0;
  DECLARE l_maxptkp,l_ptkp_nikah,l_ptkp_anak DOUBLE DEFAULT 0;

  DECLARE l_pkp, l_pph21, tarif, tarifnpwp DOUBLE DEFAULT 0;
  DECLARE l_npwpdate DATE;
  DECLARE l_gender integer default 0;
  
  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE cursor1 CURSOR FOR
    SELECT bns.id,bns.member_id,bns.amount
      FROM customer_bonuses bns
      WHERE bns.status=0 AND bns.date BETWEEN in_tglawal AND in_tglakhir;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done :=1;

  START TRANSACTION;
  OPEN cursor1;
loop1:LOOP FETCH cursor1 INTO v_id, v_memberid, v_bruto;
    IF done THEN
      CLOSE cursor1;
      LEAVE loop1;
    END IF;
    SET l_pkp = 0;
    SET l_pph21 = 0;
    SET l_ptkp_anak = 0;
    SET l_ptkp_nikah = 0;

    IF v_bruto > 0 THEN
            SELECT COUNT(id) INTO l_countnpwp FROM customer_npwp WHERE member_id = v_memberid AND DATE(created) <= in_tglakhir;
      IF l_countnpwp > 0 THEN
        SELECT  jk,DATE(created), IFNULL(npwp, '-')AS npwp, alamat, kerja, office, IFNULL(menikah, 'N')AS menikah, IFNULL(anak, 0) AS anak
          INTO l_gender,l_npwpdate, l_nonpwp, l_alamat, l_kerja, l_office, l_menikah, l_jmlanak
        FROM customer_npwp WHERE member_id = v_memberid AND DATE(created) <= in_tglakhir 
        ORDER BY id DESC LIMIT 0,1;
        
        SET tarifnpwp = 100;
        SET l_kerja = 'Y';
        
                IF l_kerja = 'Y' THEN
          SET l_ptkp = 0;
        ELSE
          if l_gender = 1 then             IF l_menikah = 'Y' THEN
              SET l_ptkp_nikah = 250000;
            END IF;
            IF l_jmlanak > 0 THEN
              if l_jmlanak > 3 then 
                set l_jmlanak = 3;
              end if;
              SET l_ptkp_anak = l_jmlanak * 250000;
            END IF;

            SET l_ptkp = l_ptkp_default+l_ptkp_nikah+l_ptkp_anak;
          ELSE
            SET l_ptkp = l_ptkp_default;
          end if;
        END IF;
      ELSE
        SET l_ptkp = 0;
        SET l_nonpwp = '-'; 
        SET l_office = ''; 
        SET l_menikah = 'N';  
        SET l_jmlanak = 0;
        SET tarifnpwp = 100;
        SET l_kerja = 'N';
      END IF;
      
      SELECT COUNT(id) INTO l_countpph FROM customer_pph WHERE member_id=v_memberid AND periode BETWEEN CONCAT(SUBSTR(in_tglakhir,1,7),'-01') AND in_tglakhir;
      IF l_countpph > 0 THEN
        SELECT ROUND(SUM(bonus)/2) INTO l_akumulasi_ptkp FROM customer_pph WHERE member_id=v_memberid AND periode BETWEEN CONCAT(SUBSTR(in_tglakhir,1,7),'-01') AND in_tglakhir;
      ELSE 
        SET l_akumulasi_ptkp = 0;
      END IF;
      
      SET l_bruto = ROUND(v_bruto/2);
      
      IF l_akumulasi_ptkp >= l_ptkp THEN
        SET l_pkp = l_bruto;
        SET l_maxptkp = 0;
        SET l_akumulasi_ptkp = l_ptkp;
      ELSEIF((l_bruto+l_akumulasi_ptkp)-l_ptkp) > 0 THEN
        SET l_pkp = (l_bruto+l_akumulasi_ptkp)-l_ptkp;
        SET l_maxptkp = l_bruto-l_pkp;
        SET l_akumulasi_ptkp = l_ptkp;
      ELSE
        SET l_maxptkp = l_bruto;
        SET l_pkp = 0;
        SET l_akumulasi_ptkp = l_bruto+l_akumulasi_ptkp;
      END IF;
      
      IF l_pkp <= 0 THEN SET l_pkp = 0; END IF;
      
      
      SELECT COUNT(*) INTO l_countpph2 FROM customer_pph WHERE member_id = v_memberid AND MONTH(periode) = MONTH(in_tglakhir) AND YEAR(periode) = YEAR(in_tglakhir);
      IF l_countpph2 > 0 THEN
        IF l_countnpwp > 0 THEN
                    SELECT COUNT(*) INTO l_countpph3 FROM customer_pph WHERE member_id = v_memberid AND SUBSTR(DATE(periode),1,7) BETWEEN SUBSTR(l_npwpdate,1,7) AND SUBSTR(in_tglakhir,1,7);
          IF l_countpph3 > 0 THEN 
            SELECT sum_of_pkp INTO akumulasi_t FROM customer_pph WHERE member_id = v_memberid ORDER BY id DESC LIMIT 0,1;
          ELSE
            SET akumulasi_t = 0;
          END IF;
        ELSE        
          SELECT sum_of_pkp INTO akumulasi_t FROM customer_pph WHERE member_id = v_memberid ORDER BY id DESC LIMIT 0,1;
        END IF;
      ELSE
        SET akumulasi_t = 0;
      END IF;

      IF l_pkp > 0 THEN       
        IF (l_pkp + akumulasi_t) >= 500000000 THEN
          IF akumulasi_t >= 500000000 THEN
            SET tarif = 30; SET l_pph21 = l_pkp * (tarif / 100) * (tarifnpwp / 100);
          ELSE 
            IF akumulasi_t >= 250000000 THEN
              SET tarif = 25; SET l_pph21 = (500000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
              SET tarif = 30; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-500000000) * (tarif / 100) * (tarifnpwp / 100));
            ELSEIF akumulasi_t >= 60000000 THEN
              SET tarif = 15; SET l_pph21 = (250000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
              SET tarif = 25; SET l_pph21 = l_pph21+((500000000-250000000) * (tarif / 100) * (tarifnpwp / 100));
              SET tarif = 30; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-500000000) * (tarif / 100) * (tarifnpwp / 100));
            ELSE 
              SET tarif = 5;  SET l_pph21 = (60000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
              SET tarif = 15; SET l_pph21 = l_pph21+((250000000-60000000) * (tarif / 100) * (tarifnpwp / 100));
              SET tarif = 25; SET l_pph21 = l_pph21+((500000000-250000000) * (tarif / 100) * (tarifnpwp / 100));
              SET tarif = 30; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-500000000) * (tarif / 100) * (tarifnpwp / 100));
            END IF;
          END IF;
        ELSEIF (l_pkp + akumulasi_t) >= 250000000 THEN
          IF akumulasi_t >= 250000000 THEN            
            SET tarif = 25; SET l_pph21 = l_pkp * (tarif / 100) * (tarifnpwp / 100);
          ELSE
            IF akumulasi_t >= 60000000 THEN           
              SET tarif = 15; SET l_pph21 = (250000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
              SET tarif = 25; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-250000000) * (tarif / 100) * (tarifnpwp / 100));
            ELSE
              SET tarif = 5;  SET l_pph21 = (60000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
              SET tarif = 15; SET l_pph21 = l_pph21+((250000000-60000000) * (tarif / 100) * (tarifnpwp / 100));
              SET tarif = 25; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-250000000) * (tarif / 100) * (tarifnpwp / 100));
            END IF;
          END IF;
        ELSEIF (l_pkp + akumulasi_t) >= 60000000 THEN
          IF akumulasi_t >= 60000000 THEN           
            SET tarif = 15; SET l_pph21 = l_pkp * (tarif / 100) * (tarifnpwp / 100);
          ELSE
            SET tarif = 5;  SET l_pph21 = (60000000-akumulasi_t) * (tarif / 100) * (tarifnpwp / 100);
            SET tarif = 15; SET l_pph21 = l_pph21+(((l_pkp + akumulasi_t)-60000000) * (tarif / 100) * (tarifnpwp / 100));
          END IF;
        ELSE
          SET tarif = 5;  SET l_pph21 = l_pkp * (tarif / 100) * (tarifnpwp / 100);
        END IF;
        
        SET l_pph21 = ROUND(l_pph21);
        
        IF l_pph21 > 0 THEN
          UPDATE `customer_bonuses` SET `tax_netto`=akumulasi_t,`tax_percent`=(tarif*tarifnpwp)/100, `tax_value`=-ROUND(l_pph21,0) WHERE id=v_id;
        END IF;       
      END IF;
        
      SET akumulasi_t = l_pkp + akumulasi_t;
      
      if l_menikah = 'Y' then
        set l_menikah2='1';
      else
        set l_menikah2='0';
      end if;
      INSERT INTO `customer_pph` 
          ( `id`        ,`member_id`  ,`nama`     , jk, `alamat`    ,`npwp`
            ,`krj`        ,`kantor`   ,`status`   ,`kid`      ,`bonus`
            ,`periode`      ,`ptkp`     ,`pkp`      ,`akumulasi_bruto_temp`
            ,`tarif`    ,`tarif_npwp` ,`pph21`    ,`created`
            ,`created_by`,sum_of_pkp,akumulasi_ptkp,buffer) 
          VALUES
          ( NULL        , v_memberid      , l_nama      , l_gender, l_alamat    , l_nonpwp
            , l_kerja, l_office   , l_menikah2    , l_jmlanak     , v_bruto
            , in_tglakhir   , l_maxptkp     , l_pkp     , akumulasi_t
            , tarif     , tarifnpwp   , l_pph21     , CURDATE()
            , 'automatic',akumulasi_t, l_akumulasi_ptkp, 0);
          
          UPDATE `customer_bonuses` SET `tax_netto`=akumulasi_t WHERE id=v_id;
    END IF;
  END LOOP loop1;
  COMMIT;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_process_omzet_batch` ()   BEGIN
    DECLARE v_order_id INT; -- Variabel penampung ID (sesuaikan tipe data jika bukan INT)
    DECLARE done INT DEFAULT FALSE; -- Penanda kapan loop selesai

    DECLARE cur_orders CURSOR FOR 
        SELECT o.id 
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        WHERE o.type = 'planB' 
          AND o.status = 'PAID' 
          AND c.status = 3;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_orders;

    read_loop: LOOP
        FETCH cur_orders INTO v_order_id;

        IF done THEN
            LEAVE read_loop;
        END IF;

        CALL sp_update_group_omzet_manual(v_order_id);

    END LOOP;

    CLOSE cur_orders;

END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_register` (IN `v_member_id` INT)   BEGIN
	
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_register_` (IN `@member_id` INT)  MODIFIES SQL DATA BEGIN
  
  set @package_id=NULL;
  set @last_level = 1;
  set @last_lvl=1;
  set @type=NULL;
  set @possponsor=NULL;
  
  select `sponsor_id`,`upline_id`,`position`,`omzet`
  into @sponsor_id,@upline_id,@last_position,@omzet
  from `customers` where `id`=@member_id;

  set @sponsor_member_id=@sponsor_id;
  set @last_sponsor=@sponsor_id;

  SELECT `id` INTO @package_id FROM `customer_package` WHERE `price`<=@omzet ORDER BY `price` DESC LIMIT 1;

  if @package_id IS NOT NULL then
    update `customers` set `package_id`=@package_id where `id`=@member_id;
  end if;

  if @last_position = 'left' then
    update `customers` set foot_left = @member_id where id = @upline_id;
  else
    update `customers` set foot_right = @member_id where id = @upline_id;
  end if;

  SET @last_upline=@upline_id;
  while @last_upline > 0 do
    insert into customer_networks values(null,@member_id,@last_upline,@last_position,1,@last_level,NULL,NOW(),NULL);
    set @last_level = @last_level + 1;
    select `upline_id`, `position` 
    into @last_upline, @last_position 
    from customers where id=@last_upline;
  end while;

  while @last_sponsor > 0 do
    insert into customer_network_matrix values(null,@member_id,@last_sponsor,@last_lvl,NULL,CURRENT_DATE(),NULL);
    select `sponsor_id`,`level`
      into @llast_sponsor,@stype
      from customers where id=@last_sponsor;
      SET @last_sponsor=@llast_sponsor;
      set @last_lvl = @last_lvl + 1;
  end while;  

  select `position` 
    into @possponsor 
    from customer_networks where member_id=@member_id AND upline_id=@sponsor_id;

  IF @possponsor IS NOT NULL THEN
    IF @possponsor = 'left' THEN
        update customers set sponsor_left=sponsor_left + 1 where id = @sponsor_id;
        SET @sleft= @sleft + 1;
    ELSE
        update customers set sponsor_right=sponsor_right + 1 where id = @sponsor_id;
        SET @sright= @sright + 1;
    END IF;
  END IF;

  while @upline_id > 0 do
  
    select `sponsor_id`,`upline_id`,`total_left`, `total_right`,`sponsor_left`,`sponsor_right`
    into @sponsor_upline_id,@parent_upline,@parent_total_left,@parent_total_right,@pspl,@pspr
    from customers where id = @upline_id;

    select `position`, `upline_id`
    into @member_position, @member_id 
    from customers where id = @member_id;
    
    if @member_position = 'right' then
      update customers 
      set total_right = total_right + 1
      where id = @upline_id;
    else
      update customers 
      set total_left = total_left + 1
      where id = @upline_id;
    end if;
      
    set @upline_id = @parent_upline;
  end while;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_registration` (IN `p_member_id` INT UNSIGNED)   main: BEGIN
    /* =========================
       Callback / status output
       ========================= */
    DECLARE v_success TINYINT DEFAULT 0;
    DECLARE v_code    INT DEFAULT 0;
    DECLARE v_message VARCHAR(512) DEFAULT 'OK';

    /* transaksi flag (biar ROLLBACK tidak error kalau tx belum mulai) */
    DECLARE v_tx_started TINYINT DEFAULT 0;

    /* =========================
       Error diagnostics (MySQL 8+)
       ========================= */
    DECLARE v_errno    INT DEFAULT 0;
    DECLARE v_sqlstate CHAR(5) DEFAULT '00000';
    DECLARE v_errmsg   TEXT;

    /* NOT FOUND flag (untuk SELECT ... INTO yang tidak ketemu) */
    DECLARE v_not_found TINYINT DEFAULT 0;

    /* =========================
       Business variables
       ========================= */
    DECLARE v_sponsor_id     INT UNSIGNED;
    DECLARE v_upline_id      INT UNSIGNED;
    DECLARE v_last_position  VARCHAR(10);
    DECLARE v_omzet          DECIMAL(18,2);

    DECLARE v_package_id     INT UNSIGNED;
    DECLARE v_flush_out      INT UNSIGNED;

    DECLARE v_last_upline    INT UNSIGNED;
    DECLARE v_level          INT DEFAULT 1;

    DECLARE v_last_sponsor   INT UNSIGNED;
    DECLARE v_prev_sponsor   INT UNSIGNED;
    DECLARE v_lvl            INT DEFAULT 1;

    DECLARE v_pos_sponsor    VARCHAR(10);

    DECLARE v_cur_member     INT UNSIGNED;
    DECLARE v_cur_upline     INT UNSIGNED;
    DECLARE v_member_pos     VARCHAR(10);

    /* =========================
       HANDLERS (harus SETELAH semua DECLARE variable)
       ========================= */
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_not_found = 1;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            v_errno    = MYSQL_ERRNO,
            v_sqlstate = RETURNED_SQLSTATE,
            v_errmsg   = MESSAGE_TEXT;

        IF v_tx_started = 1 THEN
            ROLLBACK;
        END IF;

        SET v_success = 0;
        SET v_code    = IFNULL(v_errno, -1);
        SET v_message = CONCAT(
            'sp_register_test gagal (SQLSTATE ', IFNULL(v_sqlstate,'-----'), '): ',
            IFNULL(v_errmsg,'Unknown error')
        );

        SELECT v_success AS success, v_code AS code, v_message AS message;
    END;

    /* =========================
       Validate input
       ========================= */
    IF p_member_id IS NULL OR p_member_id = 0 THEN
        SET v_success = 0;
        SET v_code    = 400;
        SET v_message = 'member_id tidak valid';
        SELECT v_success AS success, v_code AS code, v_message AS message;
        LEAVE main;
    END IF;

    START TRANSACTION;
    SET v_tx_started = 1;
    
    /*CALL sp_update_personal_omzet_placement(p_member_id);*/

    /* =========================
       Ambil data member (lock row)
       ========================= */
    SET v_not_found = 0;
    SELECT sponsor_id, upline_id, position, omzet
      INTO v_sponsor_id, v_upline_id, v_last_position, v_omzet
    FROM customers
    WHERE id = p_member_id
    FOR UPDATE;

    IF v_not_found = 1 THEN
        ROLLBACK;
        SET v_tx_started = 0;

        SET v_success = 0;
        SET v_code    = 404;
        SET v_message = CONCAT('Member tidak ditemukan: id=', p_member_id);
        SELECT v_success AS success, v_code AS code, v_message AS message;
        LEAVE main;
    END IF;

    SET v_omzet = IFNULL(v_omzet, 0);

    /* =========================
       Tentukan package dari omzet (kalau ada)
       ========================= */
    SET v_not_found = 0;
    SELECT id, flush_out
      INTO v_package_id, v_flush_out
    FROM customer_package
    WHERE price <= v_omzet
    ORDER BY price DESC
    LIMIT 1;

    IF v_not_found = 1 THEN
        SET v_package_id = NULL;
    END IF;

    IF v_package_id IS NOT NULL THEN
        UPDATE customers
        SET package_id = v_package_id, max_daily_pairing=v_flush_out, network_generated=1
        WHERE id = p_member_id;
    END IF;

    /* =========================
       Validasi upline & set foot kiri/kanan (hindari overwrite)
       ========================= */
    IF v_upline_id IS NULL OR v_upline_id = 0 THEN
        ROLLBACK;
        SET v_tx_started = 0;

        SET v_success = 0;
        SET v_code    = 422;
        SET v_message = 'Upline tidak valid / belum di-set untuk member ini';
        SELECT v_success AS success, v_code AS code, v_message AS message;
        LEAVE main;
    END IF;

    /*IF v_last_position = 'left' THEN
        UPDATE customers
        SET foot_left = p_member_id
        WHERE id = v_upline_id
          AND (foot_left IS NULL OR foot_left = 0);

        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 409;
            SET v_message = CONCAT('Slot upline.left sudah terisi (upline_id=', v_upline_id, ')');
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;

    ELSEIF v_last_position = 'right' THEN
        UPDATE customers
        SET foot_right = p_member_id
        WHERE id = v_upline_id
          AND (foot_right IS NULL OR foot_right = 0);

        IF ROW_COUNT() = 0 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 409;
            SET v_message = CONCAT('Slot upline.right sudah terisi (upline_id=', v_upline_id, ')');
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;
    ELSE
        ROLLBACK;
        SET v_tx_started = 0;

        SET v_success = 0;
        SET v_code    = 422;
        SET v_message = CONCAT('Position member tidak valid: ', IFNULL(v_last_position,'NULL'));
        SELECT v_success AS success, v_code AS code, v_message AS message;
        LEAVE main;
    END IF;*/

    /* =========================
       Build customer_networks (jalur upline)
       ========================= */
    SET v_last_upline = v_upline_id;

    WHILE v_last_upline IS NOT NULL AND v_last_upline > 0 DO
        INSERT INTO customer_networks
        VALUES (NULL, p_member_id, v_last_upline, v_last_position, 1, v_level, NULL, NOW(), NULL);

        SET v_level = v_level + 1;

        SET v_not_found = 0;
        SELECT upline_id, position
          INTO v_last_upline, v_last_position
        FROM customers
        WHERE id = v_last_upline;

        IF v_not_found = 1 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 500;
            SET v_message = 'Integrity error: data upline chain putus (customers tidak ditemukan)';
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;
    END WHILE;

    /* =========================
       Build customer_network_matrixes (jalur sponsor)
       ========================= */
    SET v_last_sponsor = IFNULL(v_sponsor_id, 0);

    WHILE v_last_sponsor IS NOT NULL AND v_last_sponsor > 0 DO
        INSERT INTO customer_network_matrixes
        VALUES (NULL, p_member_id, v_last_sponsor, v_lvl, NULL, CURRENT_DATE(), NULL);

        SET v_lvl = v_lvl + 1;
        SET v_prev_sponsor = v_last_sponsor;

        SET v_not_found = 0;
        SELECT sponsor_id
          INTO v_last_sponsor
        FROM customers
        WHERE id = v_prev_sponsor;

        IF v_not_found = 1 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 500;
            SET v_message = CONCAT('Integrity error: sponsor chain putus (sponsor_id tidak ditemukan untuk id=', v_prev_sponsor, ')');
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;

        SET v_last_sponsor = IFNULL(v_last_sponsor, 0);
    END WHILE;

    /* =========================
       Update sponsor_left / sponsor_right
       ========================= */
    IF v_sponsor_id IS NOT NULL AND v_sponsor_id > 0 THEN
        SET v_not_found = 0;
        SELECT position
          INTO v_pos_sponsor
        FROM customer_networks
        WHERE member_id = p_member_id
          AND upline_id = v_sponsor_id
        LIMIT 1;

        IF v_not_found = 0 AND v_pos_sponsor IS NOT NULL THEN
            IF v_pos_sponsor = 'left' THEN
                UPDATE customers SET sponsor_left  = sponsor_left  + 1 WHERE id = v_sponsor_id;
            ELSEIF v_pos_sponsor = 'right' THEN
                UPDATE customers SET sponsor_right = sponsor_right + 1 WHERE id = v_sponsor_id;
            END IF;
        END IF;
    END IF;

    /* =========================
       Update total_left / total_right untuk seluruh upline chain
       ========================= */
    SET v_cur_member = p_member_id;
    SET v_cur_upline = v_upline_id;

    WHILE v_cur_upline IS NOT NULL AND v_cur_upline > 0 DO
        SET v_not_found = 0;
        SELECT position
          INTO v_member_pos
        FROM customers
        WHERE id = v_cur_member;

        IF v_not_found = 1 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 500;
            SET v_message = 'Integrity error: member chain putus saat update total_left/total_right';
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;

        IF v_member_pos = 'right' THEN
            UPDATE customers SET total_right = total_right + 1 WHERE id = v_cur_upline;
        ELSE
            UPDATE customers SET total_left  = total_left  + 1 WHERE id = v_cur_upline;
        END IF;

        SET v_cur_member = v_cur_upline;

        SET v_not_found = 0;
        SELECT upline_id
          INTO v_cur_upline
        FROM customers
        WHERE id = v_cur_member;

        IF v_not_found = 1 THEN
            ROLLBACK;
            SET v_tx_started = 0;

            SET v_success = 0;
            SET v_code    = 500;
            SET v_message = 'Integrity error: upline_id parent tidak ditemukan';
            SELECT v_success AS success, v_code AS code, v_message AS message;
            LEAVE main;
        END IF;

        SET v_cur_upline = IFNULL(v_cur_upline, 0);
    END WHILE;
    
    CALL sp_update_group_omzet_placement(p_member_id);
    CALL sp_bonus_sponsor_placement(p_member_id);
    CALL sp_bonus_pairing_placement(p_member_id, 350000,20000);

    COMMIT;
    SET v_tx_started = 0;

    SET v_success = 1;
    SET v_code    = 200;
    SET v_message = CONCAT(
        'Register berhasil. member_id=', p_member_id,
        ', package_id=', IFNULL(v_package_id, 0),
        ', sponsor_id=', IFNULL(v_sponsor_id, 0),
        ', upline_id=', IFNULL(v_upline_id, 0)
    );

    SELECT v_success AS success, v_code AS code, v_message AS message;
END main$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_update_group_omzet` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_subtotal DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pairing DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pr DECIMAL(15,2) DEFAULT 0;
    DECLARE v_type VARCHAR(20);
    DECLARE v_upline INT;
    DECLARE v_parent INT;
    DECLARE v_pos VARCHAR(10);
    DECLARE v_guard INT DEFAULT 0;
    
    SET v_subtotal=0;

    SELECT o.customer_id, o.subtotal_amount, o.pairing_amount, o.bv_amount, c.upline_id, c.position,o.type
    INTO v_customer, v_subtotal, v_pairing, v_pr, v_upline, v_pos, v_type
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    WHILE v_upline IS NOT NULL DO
        SET v_guard = v_guard + 1;
        IF v_type = 'planA' THEN
            IF v_pos = 'left' THEN
                UPDATE customers
                SET omzet_group_left = omzet_group_left + v_subtotal, omzet_pairing_left = omzet_pairing_left + v_pairing, omzet_group_left_plana = omzet_group_left_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,v_pr,0);
            ELSE
                UPDATE customers
                SET omzet_group_right = omzet_group_right + v_subtotal, omzet_pairing_right = omzet_pairing_right + v_pairing, omzet_group_right_plana = omzet_group_right_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,0,v_pr);
            END IF;
        ELSEIF v_type = 'planB' THEN
            IF v_pos = 'left' THEN
                UPDATE customers
                SET omzet_group_left = omzet_group_left + v_subtotal, omzet_group_left_planb = omzet_group_left_planb + v_subtotal
                WHERE id = v_upline;
            ELSE
                UPDATE customers
                SET omzet_group_right = omzet_group_right + v_subtotal, omzet_group_right_planb = omzet_group_right_planb + v_subtotal
                WHERE id = v_upline;
            END IF;
        END IF;

        SELECT position, upline_id
        INTO v_pos, v_parent
        FROM customers
        WHERE id = v_upline;

        /*SET v_customer = v_upline;*/
        SET v_upline = v_parent;
    END WHILE;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_update_group_omzet_manual` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_subtotal DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pairing DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pr DECIMAL(15,2) DEFAULT 0;
    DECLARE v_type VARCHAR(20);
    DECLARE v_upline INT;
    DECLARE v_parent INT;
    DECLARE v_pos VARCHAR(10);
    DECLARE v_guard INT DEFAULT 0;
    
    SET v_subtotal=0;

    SELECT o.customer_id, o.subtotal_amount, o.pairing_amount, o.bv_amount, c.upline_id, c.position, o.type
    INTO v_customer, v_subtotal, v_pairing, v_pr, v_upline, v_pos, v_type
    FROM orders o
    JOIN customers c ON c.id = o.customer_id
    WHERE o.id = p_order_id;

    WHILE v_upline IS NOT NULL DO

        IF v_type = 'planA' THEN
            IF v_pos = 'left' THEN
                UPDATE customers
                SET omzet_group_left = omzet_group_left + v_subtotal, omzet_pairing_left = omzet_pairing_left + v_pairing, omzet_group_left_plana = omzet_group_left_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,v_pr,0);
            ELSE
                UPDATE customers
                SET omzet_group_right = omzet_group_right + v_subtotal, omzet_pairing_right = omzet_pairing_right + v_pairing, omzet_group_right_plana = omzet_group_right_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,0,v_pr);
            END IF;
        ELSEIF v_type = 'planB' THEN
            IF v_pos = 'left' THEN
                UPDATE customers
                SET omzet_group_left = omzet_group_left + v_subtotal, omzet_group_left_planb = omzet_group_left_planb + v_subtotal
                WHERE id = v_upline;
            ELSE
                UPDATE customers
                SET omzet_group_right = omzet_group_right + v_subtotal, omzet_group_right_planb = omzet_group_right_planb + v_subtotal
                WHERE id = v_upline;
            END IF;
        END IF;

        SELECT position, upline_id
        INTO v_pos, v_parent
        FROM customers
        WHERE id = v_upline;

        /*SET v_customer = v_upline;*/
        SET v_upline = v_parent;
    END WHILE;
    
    /*CALL sp_bonus_pairing_manual(p_order_id,350000,20000);*/
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_update_group_omzet_placement` (IN `p_customer_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_subtotal DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pairing DECIMAL(15,2) DEFAULT 0;
    DECLARE v_pr DECIMAL(15,2) DEFAULT 0;
    DECLARE v_type VARCHAR(20);
    DECLARE v_upline INT;
    DECLARE v_parent INT;
    DECLARE v_pos VARCHAR(10);
    DECLARE v_guard INT DEFAULT 0;

    SELECT SUM(subtotal_amount), SUM(pairing_amount), SUM(bv_amount)
    INTO v_subtotal, v_pairing, v_pr
    FROM orders
    WHERE customer_id = p_customer_id AND `status`='PAID';
    
    IF v_subtotal > 0 AND v_subtotal IS NOT NULL THEN
        SELECT upline_id, position INTO v_upline, v_pos FROM customers WHERE id=p_customer_id;
        SET v_customer=p_customer_id;

        WHILE v_upline IS NOT NULL DO
            SET v_guard = v_guard + 1;

            IF v_pos = 'left' THEN
                UPDATE customers
                SET omzet_group_left = omzet_group_left + v_subtotal, omzet_pairing_left = omzet_pairing_left + v_pairing, omzet_group_left_plana = omzet_group_left_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,v_pr,0);
            ELSE
                UPDATE customers
                SET omzet_group_right = omzet_group_right + v_subtotal, omzet_pairing_right = omzet_pairing_right + v_pairing, omzet_group_right_plana = omzet_group_right_plana + v_pairing
                WHERE id = v_upline;
                CALL sp_generate_reward_plana(v_upline,0,v_pr);
            END IF;

            SELECT position, upline_id
            INTO v_pos, v_parent
            FROM customers
            WHERE id = v_upline;

            SET v_upline = v_parent;
        END WHILE;
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_update_personal_omzet` (IN `p_order_id` INT)   BEGIN
    DECLARE v_customer INT;
    DECLARE v_subtotal DECIMAL(15,2) DEFAULT 0;
    DECLARE v_type VARCHAR(20);

    SELECT customer_id, subtotal_amount, type
    INTO v_customer, v_subtotal, v_type
    FROM orders
    WHERE id = p_order_id;

    IF v_type = 'planA' THEN
        UPDATE customers
        SET omzet = omzet + v_subtotal
        WHERE id = v_customer;
    ELSE
        UPDATE customers
        SET omzet_planb = omzet_planb + v_subtotal
        WHERE id = v_customer;
    END IF;
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_update_personal_omzet_placement` (IN `p_member_id` INT)   BEGIN
    DECLARE v_subtotal DECIMAL(15,2) DEFAULT 0;
    DECLARE v_package INT;

    SELECT sum(subtotal_amount)
    INTO v_subtotal
    FROM orders
    WHERE customer_id = p_member_id AND `status`='PAID';

	IF v_subtotal > 0 THEN
    UPDATE customers
        SET omzet = omzet + v_subtotal
        WHERE id = p_member_id;
    END IF;
    
END$$

CREATE DEFINER=`production_puranusa`@`%` PROCEDURE `sp_validate_order` (IN `p_order_id` INT)   BEGIN
    DECLARE v_done INT;

    SELECT bonus_generated
    INTO v_done
    FROM orders
    WHERE id = p_order_id
    FOR UPDATE;

    IF v_done = 1 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order already processed';
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `seo_title`, `seo_description`, `is_published`, `published_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Manfaat Utama Komposisi Feminine Wash & Spray', 'FeminineWash', 'Perawatan kewanitaan', 'Perawatan kewanitaan diformulasikan secara khusus dengan perpaduan bahan alami dan aktif yang unggul untuk menjaga kebersihan, kesehatan, dan kenyamanan area kewanitaan', 1, '2026-01-01 04:44:00', '2026-01-01 04:44:25', '2026-01-01 04:57:08', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `article_contents`
--

CREATE TABLE `article_contents` (
  `id` int(10) UNSIGNED NOT NULL,
  `article_id` int(10) UNSIGNED NOT NULL,
  `content` longtext NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `article_contents`
--

INSERT INTO `article_contents` (`id`, `article_id`, `content`, `tags`, `created_at`, `updated_at`) VALUES
(1, 1, '[{\"id\":\"block-1767267534925-0.12504607535589096\",\"type\":\"image\",\"content\":{\"url\":\"/storage/articles/images/01KDWNQSYGX6ZH8P7T1DZT3CVR.jpeg\",\"alt\":\"\",\"caption\":\"\"}},{\"id\":\"block-1767268510388-0.16353118321686888\",\"type\":\"heading\",\"content\":{\"level\":1,\"text\":\"Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni\"}},{\"id\":\"block-1767267636921-0.13472435291619544\",\"type\":\"heading\",\"content\":{\"level\":2,\"text\":\"Manfaat Utama Komposisi Feminine Wash & Spray\"}},{\"id\":\"block-1767267662807-0.014421188424156628\",\"type\":\"paragraph\",\"content\":{\"text\":\"<p style=\\\"text-align: justify;\\\">Produk Feminine Wash &amp; Spray diformulasikan secara khusus dengan perpaduan bahan alami dan aktif yang unggul untuk menjaga kebersihan, kesehatan, dan kenyamanan area kewanitaan.</p>\"}},{\"id\":\"block-1767267713802-0.795501241527931\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Niacinamide, Bahan Aktif Membantu mencerahkan dan meratakan warna kulit area kewanitaan, mengurangi noda gelap, serta memperkuat fungsi barrier kulit.\"]}},{\"id\":\"block-1767268041845-0.9888458800026321\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Glycerin, Pelembap Berfungsi sebagai humektan yang kuat, membantu menjaga kelembapan alami kulit, mencegah kekeringan, dan memberikan rasa nyaman.\"]}},{\"id\":\"block-1767268079497-0.8225647641725632\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Hydrolyzed Collagen Extract, Pelembap & Peremajaan Membantu meningkatkan elastisitas dan kekencangan kulit, serta menjaga area intim tetap terhidrasi dan terasa lebih kenyal.\"]}},{\"id\":\"block-1767268115142-0.9957395901348929\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Piper Betle Extract (Ekstrak Sirih), Antiseptik Alami Dikenal luas memiliki sifat antiseptik dan antibakteri alami yang kuat. Sangat efektif membantu membersihkan area intim, mengurangi bau tak sedap, dan mencegah infeksi.\"]}},{\"id\":\"block-1767268175016-0.020234756593269232\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Propolis Extract, Anti-Inflamasi & Antioksidan. Memiliki sifat anti-inflamasi, antibakteri, dan antijamur. Membantu menenangkan kulit, mempercepat penyembuhan iritasi, dan melindungi dari radikal bebas.\"]}},{\"id\":\"block-1767268231101-0.23020773302042075\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Centella Asiatica Extract (Cica), Menenangkan & Perbaikan. Kaya akan Madecassoside dan Asiaticoside, berfungsi untuk menenangkan kulit yang teriritasi, mengurangi kemerahan, dan membantu proses regenerasi kulit.\"]}},{\"id\":\"block-1767268284507-0.8869495303103689\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Chamomile Extract, Menenangkan Memiliki sifat anti-inflamasi yang lembut. Sangat baik untuk menenangkan kulit sensitif, mengurangi rasa gatal, dan memberikan efek relaksasi.\"]}},{\"id\":\"block-1767268338750-0.6913297627111568\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Rosemary Extract Antioksidan & Stimulasi, Berfungsi sebagai antioksidan dan memiliki sifat antimikroba. Membantu menjaga kesegaran dan kesehatan kulit area intim.\"]}},{\"id\":\"block-1767268375295-0.977269026712041\",\"type\":\"list\",\"content\":{\"ordered\":false,\"items\":[\"Glycyrrhiza glabra root extract (Ekstrak Akar Licorice), Pencerah & Anti-Inflamasi Memiliki komponen Glabridin yang membantu mencerahkan warna kulit secara alami dan memberikan efek anti-inflamasi untuk mengurangi kemerahan.\"]}},{\"id\":\"block-1767268448571-0.43247744707614466\",\"type\":\"paragraph\",\"content\":{\"text\":\"<p style=\\\"text-align: justify;\\\"><em>Dirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.</em></p>\"}}]', '[]', '2026-01-01 04:44:25', '2026-01-01 04:58:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('puranusa-cache-admin_dashboard_stats', 'a:15:{s:12:\"totalRevenue\";d:0;s:11:\"totalOrders\";i:114;s:14:\"totalCustomers\";i:219;s:13:\"totalProducts\";i:11;s:7:\"totalBV\";d:0;s:12:\"totalBonuses\";d:0;s:19:\"totalNetworkMembers\";i:200;s:13:\"pendingOrders\";i:10;s:15:\"completedOrders\";i:0;s:15:\"activeCustomers\";i:0;s:12:\"recentOrders\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:5:{i:0;a:5:{s:8:\"order_no\";s:19:\"ORD-20260113-LYVUMN\";s:13:\"customer_name\";s:8:\"ZENITH02\";s:11:\"grand_total\";d:407000;s:6:\"status\";s:7:\"PENDING\";s:10:\"created_at\";s:19:\"2026-01-13 06:46:11\";}i:1;a:5:{s:8:\"order_no\";s:19:\"ORD-20260113-NRFXQZ\";s:13:\"customer_name\";s:12:\"Epi Pebriana\";s:11:\"grand_total\";d:350000;s:6:\"status\";s:7:\"PENDING\";s:10:\"created_at\";s:19:\"2026-01-13 06:31:12\";}i:2;a:5:{s:8:\"order_no\";s:19:\"ORD-20260113-T5WY59\";s:13:\"customer_name\";s:8:\"Alhozani\";s:11:\"grand_total\";d:350000;s:6:\"status\";s:4:\"PAID\";s:10:\"created_at\";s:19:\"2026-01-13 06:19:25\";}i:3;a:5:{s:8:\"order_no\";s:19:\"ORD-20260113-XPL9GI\";s:13:\"customer_name\";s:8:\"Alhozani\";s:11:\"grand_total\";d:350000;s:6:\"status\";s:4:\"PAID\";s:10:\"created_at\";s:19:\"2026-01-13 06:17:48\";}i:4;a:5:{s:8:\"order_no\";s:19:\"ORD-20260113-IG01BY\";s:13:\"customer_name\";s:27:\"Muhamad Taqiyuddin SKM.MKEs\";s:11:\"grand_total\";d:350000;s:6:\"status\";s:4:\"PAID\";s:10:\"created_at\";s:19:\"2026-01-13 06:13:10\";}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:11:\"topProducts\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:14:\"monthlyRevenue\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:23:\"orderStatusDistribution\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:3:{i:0;a:2:{s:6:\"status\";s:9:\"Cancelled\";s:5:\"count\";i:3;}i:1;a:2:{s:6:\"status\";s:4:\"Paid\";s:5:\"count\";i:101;}i:2;a:2:{s:6:\"status\";s:7:\"Pending\";s:5:\"count\";i:10;}}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}s:10:\"dailySales\";O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:0:{}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}}', 1768289005);

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'IDR',
  `subtotal_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `discount_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `shipping_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `tax_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `grand_total` decimal(15,2) NOT NULL DEFAULT 0.00,
  `applied_promos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`applied_promos`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `carts`
--

INSERT INTO `carts` (`id`, `customer_id`, `session_id`, `currency`, `subtotal_amount`, `discount_amount`, `shipping_amount`, `tax_amount`, `grand_total`, `applied_promos`, `created_at`, `updated_at`) VALUES
(1, 19, NULL, 'IDR', 350000.00, 0.00, 0.00, 0.00, 350000.00, NULL, '2025-12-17 22:27:27', '2025-12-17 22:27:27'),
(2, 21, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, NULL, '2025-12-22 02:11:54', '2025-12-22 02:28:06'),
(3, 117, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, '[]', '2025-12-24 03:28:32', '2025-12-29 23:11:47'),
(4, 25, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, '[]', '2025-12-29 07:20:40', '2025-12-29 19:41:12'),
(5, 169, NULL, 'IDR', 0.00, 0.00, 0.00, 0.00, 0.00, '[]', '2025-12-30 09:44:34', '2025-12-30 09:45:17'),
(6, 22, NULL, 'IDR', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, NULL, '2026-01-05 05:16:51', '2026-01-05 05:38:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `cart_id` int(10) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'IDR',
  `product_sku` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `row_total` decimal(15,2) NOT NULL,
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `qty`, `unit_price`, `currency`, `product_sku`, `product_name`, `row_total`, `meta_json`, `created_at`, `updated_at`) VALUES
(1, 1, 6, 1, 350000.00, 'IDR', 'SKU-003BIOZENERVE', 'BIOZENERVE', 350000.00, NULL, '2025-12-17 22:27:27', '2025-12-17 22:27:27'),
(11, 6, 8, 1, 1500000.00, 'IDR', 'SKU-005ZENIONGREEN', 'BIOZENION PENDANT Green', 1500000.00, NULL, '2026-01-05 05:16:51', '2026-01-05 05:38:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `slug`, `name`, `description`, `sort_order`, `is_active`, `image`, `created_at`, `updated_at`) VALUES
(2, NULL, 'health-therapy', 'Health Therapy', 'Rangkaian Alat Terapi Kesehatan', 3, 1, 'categories/oEHt79HAGKt3YAwUp9luLIkPtmTC7RC3vYWL5yvq.png', '2025-12-16 07:12:54', '2025-12-16 04:41:21'),
(3, NULL, 'herba-care', 'Herba Care', 'Rangkaian Minuman Herbal Kesehatan', 1, 1, 'categories/NCWtiS5HEpiKqrG8sA94RjAcMYsbuYNh5NYAew1W.jpg', '2025-12-16 07:13:47', '2025-12-16 04:39:23'),
(4, NULL, 'Beauty-care', 'Beauty Care', 'Rangkaian Perawatan Wanita dan Pria', 2, 1, 'categories/pRVuu0snEKCZ7cZx1qazhx6K2Nvoe6pzNgRUh6GV.jpg', '2025-12-16 07:14:25', '2025-12-16 04:41:04'),
(5, NULL, 'fashion', 'Fashion', 'Rangkaian Perlengkapan Fashion Pria dan Wanita', 4, 1, 'categories/cduyzz7nEsdf3aOxE04cxqthWcOE7iZSgwyPMpiH.png', '2025-12-16 07:15:10', '2025-12-16 04:41:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key customer',
  `sponsor_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'sponsor referral',
  `upline_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'upline ketika sdh diplacement',
  `position` enum('left','right') DEFAULT NULL,
  `ref_code` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL COMMENT 'Nama lengkap customer',
  `email` varchar(255) NOT NULL COMMENT 'Email unik untuk login dan komunikasi',
  `phone` varchar(255) DEFAULT NULL COMMENT 'Nomor telepon / WhatsApp customer',
  `password` varchar(255) NOT NULL COMMENT 'Password yang telah di-hash untuk autentikasi',
  `gender` enum('laki-laki','perempuan') DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `address` varchar(225) DEFAULT NULL,
  `city_id` int(10) UNSIGNED DEFAULT NULL,
  `province_id` int(10) UNSIGNED DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL COMMENT 'Token remember me untuk tetap login',
  `email_verified_at` timestamp NULL DEFAULT NULL COMMENT 'Waktu ketika email customer terverifikasi',
  `ewallet_id` varchar(255) DEFAULT NULL COMMENT 'ID unik dompet elektronik customer',
  `ewallet_saldo` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Saldo dompet elektronik customer',
  `bank_name` varchar(100) DEFAULT NULL COMMENT 'Nama bank untuk penarikan',
  `bank_account` varchar(50) DEFAULT NULL COMMENT 'Nomor rekening bank',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan mengenai customer',
  `package_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'paket sesuai total omset member',
  `foot_left` int(10) UNSIGNED DEFAULT NULL COMMENT 'kaki kiri level 1',
  `foot_right` int(10) UNSIGNED DEFAULT NULL COMMENT 'kaki kanan level 1',
  `total_left` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah kaki kiri',
  `total_right` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah kaki kanan',
  `sponsor_left` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah member yg disponsorin kaki kiri',
  `sponsor_right` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah member yg disponsorin kaki kanan',
  `pv_left` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah pv untuk pairing dr kaki kiri',
  `pv_right` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'jumlah pv untuk pairing dr kaki kanan',
  `omzet` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_planb` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_group_left` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'jumlah omset plan A dr group binary kaki kiri',
  `omzet_group_right` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'jumlah omset plan A dr group binary kaki kanan',
  `omzet_pairing_left` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_pairing_right` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_group_left_plana` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_group_right_plana` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_group_left_planb` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_group_right_planb` decimal(15,2) NOT NULL DEFAULT 0.00,
  `level` enum('Associate','Senior Associate','Executive','Director') DEFAULT NULL COMMENT '1 = Level Associate, 2 = Level Senior Associate, 3 = Level Executive, 4 = Director',
  `is_stockist` tinyint(1) NOT NULL DEFAULT 0,
  `stockist_kabupaten_id` varchar(10) DEFAULT NULL,
  `stockist_kabupaten_name` varchar(255) DEFAULT NULL,
  `stockist_province_id` int(10) UNSIGNED DEFAULT NULL,
  `stockist_province_name` varchar(255) DEFAULT NULL,
  `daily_pairing` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `max_daily_pairing` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `last_pairing_date` date DEFAULT NULL,
  `network_generated` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Status Customer 1=prosepek, 2=pasif, 3=active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `sponsor_id`, `upline_id`, `position`, `ref_code`, `username`, `nik`, `name`, `email`, `phone`, `password`, `gender`, `alamat`, `address`, `city_id`, `province_id`, `remember_token`, `email_verified_at`, `ewallet_id`, `ewallet_saldo`, `bank_name`, `bank_account`, `description`, `package_id`, `foot_left`, `foot_right`, `total_left`, `total_right`, `sponsor_left`, `sponsor_right`, `pv_left`, `pv_right`, `omzet`, `omzet_planb`, `omzet_group_left`, `omzet_group_right`, `omzet_pairing_left`, `omzet_pairing_right`, `omzet_group_left_plana`, `omzet_group_right_plana`, `omzet_group_left_planb`, `omzet_group_right_planb`, `level`, `is_stockist`, `stockist_kabupaten_id`, `stockist_kabupaten_name`, `stockist_province_id`, `stockist_province_name`, `daily_pairing`, `max_daily_pairing`, `last_pairing_date`, `network_generated`, `status`, `created_at`, `updated_at`) VALUES
(19, NULL, NULL, 'left', 'REF-1x1x1x', 'PURANUSA1', NULL, 'PURANUSA1', 'zenithsinergiutama@gmail.com', '081312000697', '$2y$12$9XlX1FU0ymEfkxLkFLF6mubks3Yzvr2SjTBsHywTL1ycNKZjZuCX2', '', NULL, 'Jalan', 0, 0, NULL, '2025-12-22 01:33:54', NULL, 0.00, NULL, NULL, NULL, 3, 22, NULL, 201, 0, 1, 0, 0, 0, 0.00, 0.00, 42700000.00, 0.00, 40950000.00, 0.00, 40950000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-17 16:40:00', '2025-12-22 06:58:12'),
(22, 19, 19, 'left', '94490CCE', 'PURANUSA2', NULL, 'PURANUSA2', '1zenithsinergiutama@gmail.com', '081312000697', '$2y$12$jlkT7SAGRsazsPY0a0gDOuuQyuVfledw5zXzASlQmi4G4gx7eeBxW', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-OHR4I', 0.00, NULL, NULL, NULL, 3, 23, NULL, 200, 0, 1, 0, 0, 0, 0.00, 0.00, 42700000.00, 0.00, 40950000.00, 0.00, 40950000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 04:50:33', '2025-12-22 07:40:54'),
(23, 22, 22, 'left', 'C1964FC5', 'ZENITH01', NULL, 'ZENITH01', '2zenithsinergiutama@gmail.com', '081312000697', '$2y$12$iKEXHFoApAJfLYDw8DH47ehtwgeGzYB6/IhFHLLnprCsvivTtVj5i', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-LNC7Q', 0.00, NULL, NULL, NULL, 3, 24, 27, 196, 3, 1, 1, 0, 0, 0.00, 0.00, 42700000.00, 0.00, 40950000.00, 0.00, 40950000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 04:55:53', '2025-12-22 07:04:22'),
(24, 23, 23, 'left', 'E4EB40B7', 'ZENITH02', NULL, 'ZENITH02', '3zenithsinergiutama@gmail.com', '081312000697', '$2y$12$6DECgirUkggmeKzoQHPdyOzFK7wQQjNEsZPZIt7Oiz7SwF4ABeJL6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-C4LJA', 50000.00, NULL, NULL, NULL, 3, 25, 26, 55, 140, 1, 2, 0, 0, 0.00, 0.00, 6300000.00, 36400000.00, 0.00, 28350000.00, 6300000.00, 34650000.00, 0.00, 1750000.00, NULL, 0, NULL, NULL, NULL, NULL, 7, 100, '2026-01-13', 1, 3, '2025-12-18 04:58:38', '2026-01-12 06:23:09'),
(25, 24, 24, 'left', '3EC28EF7', 'ZENITH03', NULL, 'ZENITH03', '4zenithsinergiutama@gmail.com', '081312000697', '$2y$12$NP3jv2zsAjYSVOq.FCamweqkRSVASehJeomvy6DNtVJdmmgdCpDZa', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-EDOIU', 800000.00, NULL, NULL, NULL, 3, 30, 33, 10, 44, 1, 1, 0, 0, 0.00, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 05:49:41', '2025-12-29 19:41:12'),
(26, 24, 24, 'right', 'D4696086', 'ZENITH04', NULL, 'ZENITH04', '5zenithsinergiutama@gmail.com', '081312000697', '$2y$12$qAKAbAIj/lH9HAX6rfkvbuAbmkmRVvhRAyayHTycwu5beYOp2igCG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-0HQNJ', 0.00, NULL, NULL, NULL, 3, 36, 39, 136, 3, 1, 1, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 1, 3, '2025-12-18 05:50:51', '2025-12-23 02:17:34'),
(27, 23, 23, 'right', '3C0E78F8', 'ZENITH05', NULL, 'ZENITH05', '6zenithsinergiutama@gmail.com', '081312000697', '$2y$12$oX4c0QQVtJpcb0mg0GWd1uXZHdyyYgOFn2t2Fx6PhobYlRw.oiz5S', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-XV8OU', 0.00, NULL, NULL, NULL, 3, 28, 29, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 05:51:59', '2025-12-22 07:10:04'),
(28, 27, 27, 'left', '968C5B9F', 'ZENITH06', NULL, 'ZENITH06', '7zenithsinergiutama@gmail.com', '081312000697', '$2y$12$Kc5hesVbUTaxXLnGXYi7beDcrQmK7sX.Hv4s4t.WTug9QiITAsX82', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-M6GIO', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 05:53:37', '2025-12-22 07:09:57'),
(29, 27, 27, 'right', '6AD2DEE0', 'ZENITH07', '3375041502800003', 'ZENITH07', 'zenithsinergiutama8@gmail.com', '081312000697', '$2y$12$Ez/l3qcpjYKsqJIEHKknm.RfZF5683sRuKTG1DLv7CM0ZJpzsfLM2', 'laki-laki', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-UOBKB', 0.00, 'MANDIRI', '1090018252585', NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 05:56:58', '2026-01-07 05:23:39'),
(30, 25, 25, 'left', 'E93ABF4D', 'SINERGI01', NULL, 'SINERGI01', '9zenithsinergiutama@gmail.com', '081312000697', '$2y$12$Zj03Ay1bviZxFNVfbcfQwOSC7FuFjO0cmJ4auWdR86kM9pgVePSBK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-PHE7Q', 0.00, NULL, NULL, NULL, 3, 31, NULL, 9, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 05:58:33', '2025-12-22 07:30:17'),
(31, 30, 30, 'left', '067E97B1', 'SINERGI02', NULL, 'SINERGI02', '10zenithsinergiutama@gmail.com', '081312000697', '$2y$12$ApWRvsO4neiBsGGe2j4fJuZP4YzX0xttEL3aNyFXIruUlZgSmCAAm', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-XRMCH', 0.00, NULL, NULL, NULL, 3, 32, NULL, 8, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 05:59:56', '2025-12-22 07:33:48'),
(32, 31, 31, 'left', 'C7167BA4', 'SINERGI03', NULL, 'SINERGI03', '11zenithsinergiutama@gmail.com', '081312000697', '$2y$12$7xvdJIuLhgOcsz6nzfuk/Ox3vfJgpKW7YJzzZPuRdYCkFoPP0RnOO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-7G62D', 0.00, NULL, NULL, NULL, 3, 42, NULL, 7, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 06:00:46', '2025-12-23 03:09:36'),
(33, 25, 25, 'right', '2C8EC9E5', 'UTAMA01', NULL, 'UTAMA01', '12zenithsinergiutama@gmail.com', '081312000697', '$2y$12$feI964LNDsGUXJUpbOuJl.3GKyb3nq7MAEyW0qFxTJ2O0lllfHH4u', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-NIJGR', 0.00, NULL, NULL, NULL, 3, 34, NULL, 43, 0, 1, 0, 0, 0, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 06:02:03', '2025-12-22 07:32:04'),
(34, 33, 33, 'left', 'F9796774', 'UTAMA02', NULL, 'UTAMA02', '13zenithsinergiutama@gmail.com', '081312000697', '$2y$12$903vNieg/W0Ucw6KLSX/PuqYZ4QiaFb7TWCJqtywCMFjWTnqDB1Ay', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-I1DWB', 0.00, NULL, NULL, NULL, 3, 35, NULL, 42, 0, 1, 0, 0, 0, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 06:02:59', '2025-12-22 07:35:07'),
(35, 34, 34, 'left', '5D30E06F', 'UTAMA03', NULL, 'UTAMA03', '14zenithsinergiutama@gmail.com', '081312000697', '$2y$12$DGTSZDHJN70WnBUfYFThvuJ5854pIKsDE1zHsUoK0n0Z/JCSl4..e', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-XSTVB', 0.00, NULL, NULL, NULL, 3, 49, NULL, 41, 0, 1, 0, 0, 0, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 1, 3, '2025-12-18 06:06:53', '2025-12-23 09:13:28'),
(36, 26, 26, 'left', 'E3E65E6A', 'SINERGI04', NULL, 'SINERGI04', '15zenithsinergiutama@gmail.com', '081312000697', '$2y$12$RvjLWGJIQbhM91mJBsC5XOlVLdIKq6y2cq9DHdBFjJeK2lQaFxCKy', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-TA3ZB', 0.00, NULL, NULL, NULL, 3, 37, NULL, 135, 0, 1, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 1, 3, '2025-12-18 06:08:44', '2025-12-23 02:37:55'),
(37, 36, 36, 'left', 'F9836A6F', 'SINERGI05', NULL, 'SINERGI05', '16zenithsinergiutama@gmail.com', '081312000697', '$2y$12$rCdFvAOc2WNWD2/MnfTyu.7NgbJKEMzECfjrQmxCunukeXshYY2wq', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-YRYUQ', 0.00, NULL, NULL, NULL, 3, 38, NULL, 134, 0, 1, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 1, 3, '2025-12-18 06:09:57', '2025-12-23 02:38:40'),
(38, 37, 37, 'left', '26F8D496', 'SINERGI06', NULL, 'SINERGI06', '17zenithsinergiutama@gmail.com', '081312000697', '$2y$12$AFURnAJplOAyKDF1adMi4.DvZljVJ5973yEb6fqPJFxNZoJNkHI2q', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-VOGJD', 0.00, NULL, NULL, NULL, 3, 62, NULL, 133, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 06:10:53', '2025-12-23 09:33:36'),
(39, 26, 26, 'right', '4A7F34A5', 'UTAMA04', NULL, 'UTAMA04', '18zenithsinergiutama@gmail.com', '081312000697', '$2y$12$PSGnLMCLEFvVKxAxnsUQS.PsM8YpAQX/azrnt0jYlJPlzF2dVmLLu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-BREHF', 0.00, NULL, NULL, NULL, 3, 40, NULL, 2, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 1, 3, '2025-12-18 06:12:16', '2025-12-23 02:39:27'),
(40, 39, 39, 'left', 'A502F360', 'UTAMA05', NULL, 'UTAMA05', '19zenithsinergiutama@gmail.com', '081312000697', '$2y$12$MNQycRfLuidV2.JZfltD8OAfPzNwHd4nJwHB7qoWKXQn1iagxyCH2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-GNO5E', 0.00, NULL, NULL, NULL, 3, 41, NULL, 1, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 06:13:06', '2025-12-23 02:39:59'),
(41, 40, 40, 'left', '5E2E87BA', 'UTAMA06', NULL, 'UTAMA06', '20zenithsinergiutama@gmail.com', '081312000697', '$2y$12$IOVXm1ehxwm8wj9QK4q3feVKL.h/VmD6XZOxRSpKoPJz99rt1LoVe', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-TKHHJ', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 06:14:12', '2025-12-23 02:39:59'),
(42, 32, 32, 'left', 'E3F96F3C', 'EAGLE01', '3174050811690003', 'FERRY YULIANTO', 'ferry.yulianto69@gmail.com', '081287027779', '$2y$12$aR0kJ1yNrMSV6dMRdt1kpeGm.4xRq11uswVoh8QVhoeBGvEtITRbK', 'laki-laki', 'Jl. Haji Ilyas No. 32 RT. 8/2 Petukangan Utara Pesanggrahan Pesanggrahan Jakarta Selatan 12260', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-AUHMD', 0.00, 'BCA', '2281455747', NULL, 3, 43, 46, 3, 3, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:01:53', '2026-01-10 01:16:53'),
(43, 42, 42, 'left', '925B0A74', 'EAGLE02', NULL, 'FERRY YULIANTO', '1ferry.yulianto69@gmail.com', '081287027779', '$2y$12$u3o65tNq0SHa8bMSDV.yZeh/nI20u94HyoA.uIGer3/M4gm.hWz4m', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-YRFPL', 0.00, NULL, NULL, NULL, 3, 44, 45, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:04:26', '2025-12-23 20:32:08'),
(44, 43, 43, 'left', 'C51D0569', 'EAGLE03', NULL, 'FERRY YULIANTO', '2ferry.yulianto69@gmail.com', '081287027779', '$2y$12$dszjWsJCXOXZ4qgsav0JQOe4tDlJ5IvYaXn03nMmld56fqmK3Bs6C', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-ZFVXE', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:07:44', '2025-12-23 20:32:23'),
(45, 43, 43, 'right', '4803F481', 'EAGLE04', NULL, 'FERRY YULIANTO', '3ferry.yulianto69@gmail.com', '081287027779', '$2y$12$nbK61W9GtwGwROmZDT2QA.9Rd06d/xsi7XecnmrofaTUf5ZhgK8Yy', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-3DR2F', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:09:17', '2025-12-23 20:32:39'),
(46, 42, 42, 'right', '17C81B0A', 'EAGLE05', NULL, 'FERRY YULIANTO', '4ferry.yulianto69@gmail.com', '081287027779', '$2y$12$rQc0HSQKypHhNbbMiTORcOuBkWUOhqAx.YBJrfQH92kyx.IVyzVJG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-XXXMX', 0.00, NULL, NULL, NULL, 3, 47, 48, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:11:18', '2025-12-23 20:33:35'),
(47, 46, 46, 'left', '77483DD3', 'EAGLE06', NULL, 'FERRY YULIANTO', '5ferry.yulianto69@gmail.com', '081287027779', '$2y$12$.cuSHt4/t43Rfo//54WMMujMufKQTVsUTj3.oTaLdoPvjiA9ocZhG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-2WNKB', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:12:29', '2025-12-23 09:08:45'),
(48, 46, 46, 'right', 'A04BC8E7', 'EAGLE07', NULL, 'FERRY YULIANTO', '6ferry.yulianto69@gmail.com', '081287027779', '$2y$12$Qe7Mp403BTs/.55CZwrlbecc6seNIs5sMZO8ey3wawXnMkzXbytdS', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-Q6RPT', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 08:13:51', '2025-12-23 20:33:48'),
(49, 35, 35, 'left', '1426AC68', 'AkunBersama01', NULL, 'Akun Bersama01', 'apriantorians694@gmail.com', '085940840620', '$2y$12$mL7MxGSuG0F4aZhq3ikNz.o5UEvS0r5Tc06zNs.FWiSOjgjbklhCy', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-D48E6', 0.00, NULL, NULL, NULL, 3, 50, 51, 34, 6, 1, 1, 0, 0, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-18 09:04:36', '2025-12-23 19:16:13'),
(50, 49, 49, 'left', 'CE9082A3', 'AkunBersama02', NULL, 'Akun Bersama02', '1apriantorians694@gmail.com', '085940840620', '$2y$12$aSIqmHmjREhQ44WM/1NDyujRh/sQTbLvZnq6kiUrgGIDaxU/nyteG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-49ENG', 0.00, NULL, NULL, NULL, 3, NULL, 52, 0, 33, 0, 1, 0, 0, 0.00, 0.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 6300000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-18 09:05:45', '2025-12-23 19:22:45'),
(51, 49, 49, 'right', '8DD803C0', 'AkunBersama03', NULL, 'Akun Bersama03', '2apriantorians694@gmail.com', '085940840620', '$2y$12$y22ZmToYVv/R11tqGBxBlu/ceb5QOjyBRcPsxViQswawCDjc8XS.2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-32KWA', 0.00, NULL, NULL, NULL, 3, 55, NULL, 5, 0, 1, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:06:32', '2025-12-23 19:23:49'),
(52, 50, 50, 'right', '187DD49F', 'Aprianto01', '5202080704830002', 'Aprianto', '3apriantorians694@gmail.com', '085940840620', '$2y$12$GC6eCkiYSICamDYAEhHogOLfhPpT5MWSuwqTAsCDOctlH6OybwVdi', 'laki-laki', 'RT 4 dusun gunung agung desa pringgarata kec.pringgarata', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-LIZ3Z', 0.00, 'Bri', '470501003480500', NULL, 3, 53, 54, 15, 17, 2, 2, 0, 0, 0.00, 0.00, 3500000.00, 2800000.00, 700000.00, 0.00, 3500000.00, 2800000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 6, 100, '2026-01-13', 0, 3, '2025-12-18 09:08:14', '2026-01-12 20:52:27'),
(53, 52, 52, 'left', '850F1D55', 'Aprianto02', NULL, 'Aprianto02', '4apriantorians694@gmail.com', '085940840620', '$2y$12$yDbZt8ORX33XmBQF9gaDlu9L.sGaT4KVLFQdkqg6fsUxxeN7MCLAi', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-HTNXQ', 0.00, NULL, NULL, NULL, 3, 128, 129, 6, 8, 1, 1, 0, 0, 0.00, 0.00, 1400000.00, 2100000.00, 0.00, 700000.00, 1400000.00, 2100000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 100, '2026-01-13', 0, 3, '2025-12-18 09:09:21', '2025-12-25 20:28:51'),
(54, 52, 52, 'right', '368CAC15', 'Aprianto03', NULL, 'Aprianto03', '5apriantorians694@gmail.com', '085940840620', '$2y$12$5pjMRCxrwIjiZO7.vu/5D.C38VtK9.DBYyNLEW3jYmq5aGL6GNwmO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-NO0HP', 0.00, NULL, NULL, NULL, 3, 60, 61, 14, 2, 1, 1, 0, 0, 0.00, 0.00, 2450000.00, 350000.00, 2100000.00, 0.00, 2450000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 100, '2026-01-13', 0, 3, '2025-12-18 09:10:16', '2025-12-23 19:31:22'),
(55, 51, 51, 'left', '63D98A10', 'Makhfud01', NULL, 'Makhfud01', 'makhpudalbisri@gmail.com', '087838040789', '$2y$12$CilXfDE64lsqfoF5h6YW3u4flJn/c6ps8a9Fzs7/nOdXOnv6pQsIe', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-R46D4', 0.00, NULL, NULL, NULL, 3, 56, 57, 1, 3, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:11:57', '2025-12-23 19:36:04'),
(56, 55, 55, 'left', 'D975CDE5', 'Makhfud02', NULL, 'Makhfud02', '1makhpudalbisri@gmail.com', '087838040789', '$2y$12$6emNtPWiHtzfRCSbLT0oCuiTMpsNjrTlsEPnsro6VKfYs4qDAf/DO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-3BY4Y', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:13:13', '2025-12-23 19:54:12'),
(57, 55, 55, 'right', '6F4186C4', 'Makhfud03', NULL, 'Makhfud03', '2makhpudalbisri@gmail.com', '087838040789', '$2y$12$sCK5s1xFSBoU39Y8V5ZIpeL3tu6pCcNYJf1./MpxKUNHOPhcn9E5e', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-DGKJN', 0.00, NULL, NULL, NULL, 3, 58, 59, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:14:30', '2025-12-23 19:54:31'),
(58, 57, 57, 'left', 'FFC85CA4', 'Aprianto04', NULL, 'Aprianto04', '6apriantorians694@gmail.com', '085940840620', '$2y$12$gFPBAzlZRmZNKSHiAsliAuMrN24oSjr3MQYM71UflJGRejMAcZdW6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-3SFKL', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:15:50', '2025-12-23 19:31:45'),
(59, 57, 57, 'right', '3BBBA092', 'Aprianto05', NULL, 'Aprianto05', '7apriantorians694@gmail.com', '085940840620', '$2y$12$eUGUpELE5SZ/z8Xk7SJ7seit8uR8bo3lNT7YXFMgLr/erkxnL9Bzq', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-U39PY', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-18 09:17:07', '2025-12-23 19:32:21'),
(60, 54, 54, 'left', 'FED956DA', 'Makhfud04', NULL, 'Makhfud04', '3makhpudalbisri@gmail.com', '087838040789', '$2y$12$97VfuJe7Ot5b7klt5c2Ace1SgOmbABwBMeQITScRwGWLr0b3T7E6W', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-B8KTD', 0.00, NULL, NULL, NULL, 3, 158, 172, 6, 7, 1, 1, 0, 0, 0.00, 0.00, 1050000.00, 1400000.00, 0.00, 350000.00, 1050000.00, 1400000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 3, 100, '2026-01-13', 0, 3, '2025-12-18 09:18:12', '2025-12-30 22:27:31'),
(61, 54, 54, 'right', 'EB1D674A', 'Makhfud05', NULL, 'Makhfud05', '4makhpudalbisri@gmail.com', '087838040789', '$2y$12$GHTHC/k7aXtSrNDY5JB9Gu.DRR9rVehOat0/SAk60JOQBrAJn5dPW', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-FRX4Z', 0.00, NULL, NULL, NULL, 3, NULL, 259, 0, 1, 0, 0, 0, 0, 0.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-18 09:19:28', '2026-01-12 20:44:48'),
(62, 38, 38, 'left', '8E160CDB', 'ROIHOKY01', NULL, 'Roi Martin Marbun01', 'marbunroimartin7@gmail.com', '085272110278', '$2y$12$9t/k0.j2cfOXHI6x385H3O3lb124NSOTsDCY4mfBhDprfMtZbAuSi', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-9ILNW', 0.00, NULL, NULL, NULL, 3, 63, 95, 121, 11, 2, 1, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:33:37', '2025-12-26 19:44:45'),
(63, 62, 62, 'left', '510184B6', 'ROIHOKY02', NULL, 'Roi Martin Marbun02', '1marbunroimartin7@gmail.com', '085272110278', '$2y$12$hgbI39JCZOr1kYML6sVA7ecwXwV.x5zXa3amBi.jDX7H0XSCGETDG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-3TWGN', 0.00, NULL, NULL, NULL, 3, 64, NULL, 120, 0, 1, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:35:05', '2025-12-26 19:45:27'),
(64, 62, 63, 'left', '48934326', 'ROIHOKY03', NULL, 'Roi Martin Marbun03', '2marbunroimartin7@gmail.com', '085272110278', '$2y$12$DUAeLi0h338JXunZECIRVecBtjJEZt89dgQpTd9.qsVCiNff8PXly', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-DTMWD', 48750.00, NULL, NULL, NULL, 3, 65, NULL, 119, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:36:31', '2025-12-26 19:45:59'),
(65, 64, 64, 'left', '1AA2ECB8', 'AZWANMISO01', NULL, 'AZWAN01', 'azwan081169@gmail.com', '081270822275', '$2y$12$GgVo3MczwJwwo086lHYvcuPdHRPFC3JdL87TqwNFtaqYcyPLGaI9i', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-6KP2L', 0.00, NULL, NULL, NULL, 3, 66, NULL, 118, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:38:29', '2025-12-23 23:13:05'),
(66, 65, 65, 'left', '06448011', 'AZWANMISO02', NULL, 'AZWAN02', '1azwan081169@gmail.com', '081270822275', '$2y$12$kwgWRDY0XkpjBGta8cOR7u36vxRCmezMpLk.Q9BkAjWh2PCcMC46.', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-BQFHW', 0.00, 'BSI', '7132511165', NULL, 3, 67, NULL, 117, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:39:51', '2026-01-12 03:56:32'),
(67, 65, 66, 'left', 'E8E57972', 'AZWANMISO03', NULL, 'AZWAN03', '2azwan081169@gmail.com', '081270822275', '$2y$12$W/EOD5q55ZUPtgr3LOvD2.BewqhMK47ZkBxmuUeaRAGIqO481oMqS', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251218-NSM0W', 0.00, NULL, NULL, NULL, 3, 68, NULL, 116, 0, 0, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-18 09:41:01', '2025-12-23 23:14:09'),
(68, 63, 67, 'left', 'D212F66C', 'Jones01', NULL, 'Jones Pukka Tua Parapat', 'jonsparapat@yahoo.com', '082287369737', '$2y$12$9RP1aJwHmF171cOwyXYs9.z3GDnHaz587tUAYQE1eJ871X99q5Zey', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-R6MNA', 0.00, NULL, NULL, NULL, 3, 69, NULL, 115, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 01:50:03', '2025-12-23 22:04:27'),
(69, 68, 68, 'left', '1AC12CE1', 'Jones02', NULL, 'Jones Pukka Tua Parapat02', '1jonsparapat@yahoo.com', '082287369737', '$2y$12$OzgPVlvUBWetaMq5H/a1P.YvbDyjB2MFF9YGde5pw9ygo7LRCSzPC', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-CL2CK', 0.00, NULL, NULL, NULL, 3, 70, NULL, 114, 0, 0, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 01:51:50', '2025-12-23 22:04:40'),
(70, 68, 69, 'left', '29347B90', 'Jones03', NULL, 'Jones Pukka Tua Parapat03', '3jonsparapat@yahoo.com', '082287369737', '$2y$12$LSc4Z3KlVt8.fWlar8tKHeo2hQ1jTb5/R1t9hg3jMSpN5scfis/5W', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-0BZNU', 0.00, NULL, NULL, NULL, 3, 71, NULL, 113, 0, 0, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 01:55:17', '2025-12-23 22:13:15'),
(71, 66, 70, 'left', '0571D4BE', 'Vandior01', NULL, 'Vandior Siahaan01', 'vandiorsiahaan79@gmail.com', '081268999979', '$2y$12$glVXccHMnPyibJg59JTMJeua/z1MWKG./9gy0mlWKRqBvO2OCLBDW', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-FFRHL', 0.00, NULL, NULL, NULL, 3, 72, NULL, 112, 0, 2, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 01:57:28', '2025-12-23 22:14:13'),
(72, 71, 71, 'left', '50EEEC48', 'Vandior02', NULL, 'Vandior Siahaan02', '1vandiorsiahaan79@gmail.com', '081268999979', '$2y$12$xGQNdFbStmiJJGfmqZZw2eE11iqm8Ai7ThGGb7YiSMJMkDfYHCdIG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-XNFRA', 0.00, NULL, NULL, NULL, 3, 73, NULL, 111, 0, 1, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 02:00:16', '2025-12-23 22:14:21'),
(73, 71, 72, 'left', 'B4C4ED0A', 'Vandior03', NULL, 'Vandior Siahaan03', '2vandiorsiahaan79@gmail.com', '081268999979', '$2y$12$AoGiH.gS/bep55YyojA/AuvZIS.V/Pu70falwyi75X2Ha4hHicVNu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-RQABT', 0.00, NULL, NULL, NULL, 3, 74, NULL, 110, 0, 0, 0, 0, 0, 0.00, 0.00, 36400000.00, 0.00, 34650000.00, 0.00, 34650000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-19 02:02:42', '2025-12-23 22:15:24'),
(74, 66, 73, 'left', '3E1CB556', 'Alfi001', '2171115712799003', 'ALFI KASANAH', 'alfikhasanah66@gmail.com', '082289355375', '$2y$12$rev54kRB5z6at/BR6OJYZe0QILkPW2WruAiak204OfJq9IsdNuyOC', 'perempuan', 'Perumahan galaxy park blok c2 nomer 18 RT 04 RW 14 kelurahan Tanjung Riau kecamatan Sekupang Batam Kepri', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-YKOYS', -319750.00, 'BCA', '8550769183', NULL, 3, 75, 117, 98, 11, 2, 1, 0, 0, 0.00, 0.00, 31750000.00, 4650000.00, 25450000.00, 100000.00, 30000000.00, 4650000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 2, 100, '2026-01-12', 0, 3, '2025-12-19 02:10:53', '2026-01-12 04:45:12'),
(75, 74, 74, 'left', '1FFEF628', 'ALFI002', NULL, 'ALFI KASANAH', '1alfikhasanah66@gmail.com', '082289355375', '$2y$12$Vu1Ti.luqllMSTDOKsg7yOOFwfYI.xO7WUtG3UCxkPYlz4RQop.Hi', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-BAQP5', 117000.00, NULL, NULL, NULL, 1, 76, 142, 96, 1, 2, 1, 0, 0, 0.00, 0.00, 31050000.00, 350000.00, 28950000.00, 0.00, 29300000.00, 350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 0, 3, '2025-12-19 02:12:29', '2026-01-02 04:12:47'),
(76, 74, 75, 'left', '25D65AA1', 'ALFI003', NULL, 'ALFI KASANAH', '3alfikhasanah66@gmail.com', '082289355375', '$2y$12$l.nodFSHfETL/riDiJ7eSOmBIi9e8vtRc6arCNpe1Q2N98Vk1oTqC', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-EDOVX', 214500.00, NULL, NULL, NULL, 1, 77, 189, 94, 1, 4, 1, 0, 0, 0.00, 0.00, 30350000.00, 350000.00, 28250000.00, 0.00, 28600000.00, 350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 0, 3, '2025-12-19 02:13:23', '2026-01-02 04:22:50'),
(77, 75, 76, 'left', 'AF986554', 'YASMINAR01', '2171126901739001', 'YASMINAR', 'yasminar034@gmail.com', '081364748637', '$2y$12$mERcNH6jePJyUxRvcs0qpuYfgN07t3rflOP1xhI90KYfgUJXpd6t.', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-JW7U6', 204750.00, 'BCA', '3262522978', NULL, 3, 78, 119, 80, 13, 2, 1, 0, 0, 0.00, 0.00, 27200000.00, 3150000.00, 22300000.00, 0.00, 25450000.00, 3150000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 100, '2026-01-12', 0, 3, '2025-12-19 02:14:40', '2026-01-07 07:21:56'),
(78, 77, 77, 'left', '12613BF0', 'YASMINAR02', '2171126901739001', 'YASMINAR', '1yasminar034@gmail.com', '081364748637', '$2y$12$yIhMhtt9LHMLEhrnp5p9QuMTGkKDhxXOPb1iJ1p.O83m3GnQlNjB2', 'perempuan', 'Sawang Permai blok Fno 3 B.', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-W4TWK', 68250.00, 'BCA', '3262522978', NULL, 1, 79, 184, 78, 1, 0, 1, 0, 0, 0.00, 0.00, 26500000.00, 350000.00, 24400000.00, 0.00, 24750000.00, 350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-10', 0, 3, '2025-12-19 02:15:39', '2026-01-07 07:32:30'),
(79, 77, 78, 'left', '0F547E00', 'YASMINAR03', '2171126901739001', 'YASMINAR', '2yasminar034@gmail.com', '081364748637', '$2y$12$OCDquD74APQfAzKKCLApiuReXufVm5IdkMozAMcQJFSKVzhHsFpMW', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-89ROO', 0.00, 'BCA', '3262522978', NULL, 1, 80, NULL, 77, 0, 0, 0, 0, 0, 0.00, 0.00, 26150000.00, 0.00, 24400000.00, 0.00, 24400000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-10', 0, 3, '2025-12-19 02:16:35', '2026-01-07 07:39:18'),
(80, 75, 79, 'left', '36094524', 'Nurhalimah1', '1304014303730001', 'Nurhalimah', 'limahnur.1973@gmail.com', '082392460926', '$2y$12$3VbJWQDKDIDTrLnP.zTM1uepf58hUWyR2hhtrh7QrdfgNxqcNvhRW', 'perempuan', 'Perumahan citra Laguna tahap2 blok C11 no 8', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-0IVTC', -117000.00, 'BSI', '7294089602', 'Seorang ibu rumah tangga', 1, 81, 121, 74, 2, 2, 2, 0, 0, 0.00, 0.00, 25100000.00, 700000.00, 22650000.00, 0.00, 23350000.00, 700000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:20:04', '2026-01-12 04:45:20'),
(81, 80, 80, 'left', 'DF5BBD3A', 'Nurhalimah2', '1304014303730001', 'Nurhalimah', '1limahnur.1973@gmail.com', '082392460926', '$2y$12$gOkZIkvt4tQzuD3ZMq/Jquuwy8zaBK1p4LnJzdFJ7dK.9Byp2H1By', 'perempuan', 'Perumahan citra Laguna tahap2 blok C11 no 8', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-YYMIA', 0.00, 'BSI', '7294089602', NULL, 1, 82, NULL, 73, 0, 0, 0, 0, 0, 0.00, 0.00, 24750000.00, 0.00, 23000000.00, 0.00, 23000000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:22:09', '2026-01-07 19:52:26'),
(82, 80, 81, 'left', '33FDC8D9', 'Nurhalimah3', '1304014303730001', 'Nurhalimah', '3limahnur.1973@gmail.com', '082392460926', '$2y$12$/kkjIE3mJISLMyXcgTSXIOPnDVSVX8DnPgkvqGYEbgCSOviN1JZ3e', 'perempuan', 'Perumahan citra Laguna tahap2 blok C11 no 8', NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-X68VE', -117000.00, 'BSI', '7294089602', 'Seorang ibu rumah tangga', 3, 83, 146, 65, 7, 0, 0, 0, 0, 0.00, 0.00, 22650000.00, 2100000.00, 18800000.00, 0.00, 20900000.00, 2100000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:26:18', '2026-01-12 04:45:30'),
(83, 72, 82, 'left', 'DF7EE411', 'MRNOONG1', NULL, 'NURHAYAKIN', 'globallintasmedia@gmail.com', '08127000199', '$2y$12$kgd87XjeYE8rJXqzlJ9A8OXaoV0LV67.rwdT5yyk6GQlEvSBJ722u', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-ZSOQV', 0.00, NULL, NULL, NULL, 3, 84, NULL, 64, 0, 2, 0, 0, 0, 0.00, 0.00, 22650000.00, 0.00, 20900000.00, 0.00, 20900000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:35:52', '2025-12-25 03:03:31'),
(84, 83, 83, 'left', '45791096', 'MRNOONG2', NULL, 'NURHAYAKIN2', '1globallintasmedia@gmail.com', '08127000199', '$2y$12$rkW4JnLkldh/HNXX/Nto3u0M/tE1KZAPd6VoE1/NRmoGcpBS8YIEK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-FYT2G', 0.00, NULL, NULL, NULL, 3, 85, NULL, 63, 0, 0, 0, 0, 0, 0.00, 0.00, 22650000.00, 0.00, 20900000.00, 0.00, 20900000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:40:35', '2025-12-25 03:04:27'),
(85, 83, 84, 'left', '4705CEF5', 'MRNOONG3', NULL, 'NURHAYAKIN3', '2globallintasmedia@gmail.com', '08127000199', '$2y$12$Uj7azEcDMH1PC9uuFq/4F.NGzOriKWWXVp840qQmn5Hy4nhn6NzZu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-BMHQF', 0.00, NULL, NULL, NULL, 3, 86, NULL, 62, 0, 0, 0, 0, 0, 0.00, 0.00, 22650000.00, 0.00, 20900000.00, 0.00, 20900000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:42:05', '2025-12-25 03:06:23'),
(86, 76, 85, 'left', 'E2B8EBBA', 'EPIE01', '2171124302789001', 'Epi Pebriana', 'epie1023@gmail.com', '081364223004', '$2y$12$9gIu33iPd85RFuI4HIygDOrichLgZv674mXl7x/WGy5jmoYs0kwbe', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-LDSVF', 23000.00, 'BCA', '8550541077', 'Ok', 3, 87, 120, 50, 11, 2, 1, 0, 0, 0.00, 0.00, 19500000.00, 3150000.00, 14600000.00, 0.00, 17750000.00, 3150000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 03:45:36', '2026-01-07 05:56:24'),
(87, 86, 86, 'left', '1BE20147', 'EPIE02', '2171124302789001', 'Epi Pebriana', '1epie1023@gmail.com', '081364223004', '$2y$12$1q3gCnBzYFFwXUe0KO0fu.55Ywa5b6NoXQSVr6X/qJjzK3FO6UIby', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-XWOYH', 48750.00, 'BCA', '8550541077', NULL, 1, 88, NULL, 49, 0, 1, 0, 0, 0, 0.00, 0.00, 19150000.00, 0.00, 17400000.00, 0.00, 17400000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-10', 0, 3, '2025-12-19 03:46:40', '2026-01-07 08:08:30'),
(88, 86, 87, 'left', '6E784113', 'EPIE03', '2171124302789001', 'Epi Pebriana', '3epie1023@gmail.com', '081364223004', '$2y$12$LvxkT2s7yceoI8xNPAodfeTaROjU6L8eyuhZ49iZA32bnkxXdQEQi', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-HAELK', 0.00, 'BCA', '8550541077', NULL, 1, 105, NULL, 48, 0, 0, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-10', 0, 3, '2025-12-19 03:47:40', '2026-01-07 08:19:52'),
(89, 64, 113, 'left', '1D5F934B', 'ELLY01', '2171076802739003', 'Elly Marlina1', 'ellymarlina197@gmail.com', '082286784718', '$2y$12$W94RXvUqB4pgGh5SjXVHZ.CPqUbT9DYTEKF3cB3kXZwX168ZdPc.q', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-45QCM', 48750.00, 'BCA', '3262271835', NULL, 3, 90, 233, 35, 3, 2, 1, 0, 0, 0.00, 0.00, 15100000.00, 3350000.00, 10200000.00, 200000.00, 13350000.00, 3350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 9, 100, '2026-01-10', 0, 3, '2025-12-19 03:49:25', '2026-01-10 05:34:24'),
(90, 89, 89, 'left', 'D5D13190', 'ELLY02', '2171076802739003', 'Elly Marlina2', '1ellymarlina197@gmail.com', '082286784718', '$2y$12$VhZj0M3GsePLQRo1o8PyFOK24CegplUFr1bsiissD3nhiFNKEwOC6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-D5YCH', 0.00, 'BCA', '3262271835', NULL, 1, 91, 235, 33, 1, 0, 1, 0, 0, 0.00, 0.00, 14400000.00, 350000.00, 12300000.00, 0.00, 12650000.00, 350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2026-01-10', 0, 3, '2025-12-19 03:50:29', '2026-01-10 05:35:25'),
(91, 89, 90, 'left', 'E2635B34', 'ELLY03', '2171076802739003', 'Elly Marlina3', '3ellymarlina197@gmail.com', '082286784718', '$2y$12$a3z.eqdFB7hkkVQmLbCpLehGePNspIUK.L8x5dzL8auqkdduHywQe', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-YHSQY', 0.00, 'BCA', '3262271835', NULL, 3, 114, 239, 31, 1, 1, 1, 0, 0, 0.00, 0.00, 14050000.00, 350000.00, 11950000.00, 0.00, 12300000.00, 350000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 100, '2026-01-10', 0, 3, '2025-12-19 03:51:20', '2026-01-10 05:41:57'),
(92, 87, 114, 'left', '4005EED7', 'DINA001', '2171124104830002', 'T Sri Aprilla Dinanti', 'tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$UDha2KSH4otfJdmRxzQcheVwNCEt6WwI4Rxj/uyhtXnUBnJycbQee', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-LVBXJ', 368550.00, 'BNI', '1918000172', NULL, 1, 93, 123, 25, 4, 2, 1, 0, 0, 0.00, 0.00, 10600000.00, 3100000.00, 6050000.00, 300000.00, 8850000.00, 3100000.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 0, 3, '2025-12-19 03:52:50', '2026-01-10 02:25:44'),
(93, 92, 92, 'left', '890FCFED', 'DINA002', NULL, 'T Sri Aprilla Dinanti', '1tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$owOamcJHgerVPqHvP5HGmO.pSSX91ZEr6u4L2XaFR8vnwWE0SKEG6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-OGOG9', 68250.00, NULL, NULL, NULL, 1, 94, 196, 23, 1, 0, 1, 0, 0, 1750000.00, 1750000.00, 8150000.00, 350000.00, 7800000.00, 0.00, 8150000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 0, 3, '2025-12-19 03:54:07', '2026-01-11 18:10:16'),
(94, 92, 93, 'left', '01A2FDE8', 'DINA003', NULL, 'T Sri Aprilla Dinanti', '3tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$GPIc7GryR9Gyd9cSBxdVWe7.9nyyWLhCj3wU1O.vRI1k0nSSnaK8C', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-TAI1D', 68250.00, NULL, NULL, NULL, 3, 198, 150, 21, 1, 0, 1, 0, 0, 0.00, 0.00, 7800000.00, 350000.00, 7450000.00, 0.00, 7800000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-08', 0, 3, '2025-12-19 03:55:23', '2026-01-03 03:36:44'),
(95, 62, 62, 'right', 'C1C68572', 'ROIHOKY04', NULL, 'Roi Martin Marbun04', '3marbunroimartin7@gmail.com', '\'085272110278', '$2y$12$fsGXyA.5REyIQckZn/.Voe0SEAzNhEJVAu63cEletGve676t8TaKK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-FBA0S', 0.00, NULL, NULL, NULL, 3, NULL, 96, 0, 10, 0, 1, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:04:14', '2025-12-26 19:46:29'),
(96, 95, 95, 'right', '508B3DDE', 'ROIHOKY05', NULL, 'Roi Martin Marbun05', '4marbunroimartin7@gmail.com', '085272110278', '$2y$12$UeBTxNIGe2Vjeh8DKIMEwuowGuB021Z7D0bowqXF/h/CTS3ujNz.u', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-HJLFU', 0.00, NULL, NULL, NULL, 3, NULL, 97, 0, 9, 0, 2, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:05:42', '2025-12-26 19:47:02'),
(97, 96, 96, 'right', '4239DB3E', 'RAJAHOKI1225', NULL, 'Wisma wibowo01', 'RAJAHOKI1225@gmail.com', '081379444756', '$2y$12$mzfR90DTyc2TQVyTaEx0Vux7sVf137hKmg7iRPmjXGZAuAs62tQce', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-HJH90', 0.00, NULL, NULL, NULL, 3, NULL, 98, 0, 8, 0, 2, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:10:16', '2025-12-23 09:52:20'),
(98, 97, 97, 'right', 'E1A1E60B', 'RAJAHOKI1226', NULL, 'Wisma wibowo2', '1RAJAHOKI1225@gmail.com', '081379444756', '$2y$12$JBqu5BZtJd8g2LOweZeei.PevIuY1ONxTnc4mPZ097W3pqiPTPQiO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-ISEDK', 0.00, NULL, NULL, NULL, 3, NULL, 99, 0, 7, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:13:05', '2025-12-23 22:49:14'),
(99, 97, 98, 'right', '2301B862', 'RAJAHOKI1227', NULL, 'Wisma wibowo3', '2RAJAHOKI1225@gmail.com', '081379444756', '$2y$12$RRUaCaQDmAtplD/iyrxhkOHQ4brrlVVJCAooYNMWByvYN16unpyzK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-D5RJN', 0.00, NULL, NULL, NULL, 3, NULL, 100, 0, 6, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:14:27', '2025-12-23 22:50:07'),
(100, 96, 99, 'right', '2F90735F', 'Jamal01', NULL, 'Jamalul Islam1', 'jamalulislam25@gmail.com', '081276916651', '$2y$12$yPRfPXMPYDSIkYqtIOHp5OHMe6zaKvJmipU9BqCdGXRb.zrNWw0oi', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-JMW6L', 0.00, NULL, NULL, NULL, 3, NULL, 101, 0, 5, 0, 2, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:20:09', '2025-12-23 22:50:32'),
(101, 100, 100, 'right', 'F12E68B4', 'Jamal02', NULL, 'Jamalul Islam2', '1jamalulislam25@gmail.com', '081276916651', '$2y$12$d5ImNY60OVVBxtkD3Ap35O9G5HF9D0jqdwAX1FbCaA29gkV7tnog2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-5UNFX', 0.00, NULL, NULL, NULL, 3, NULL, 115, 0, 4, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:21:50', '2025-12-24 00:26:35'),
(102, 38, 115, 'right', '412F0E85', 'Saut001', NULL, 'Saut Manumpak Sitinjak1', 'sautsitinjak001@gmail.com', '081365070049', '$2y$12$aiCOeLEeDQDYBERen.bFcOWc6/G.pNwl6hzGA4Y3fyoV0pCJIguq.', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-REUKN', 0.00, NULL, NULL, NULL, 3, NULL, 103, 0, 2, 0, 2, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:25:37', '2025-12-24 00:28:06'),
(103, 102, 102, 'right', 'C202C822', 'Saut002', NULL, 'Saut Manumpak Sitinjak2', '2sautsitinjak001@gmail.com', '081365070049', '$2y$12$9A8i2zj8xIT6Kluyq1qXYurdyU91/6GeZ.aUb1/Mh0wP8nLOjeKky', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-CYCEI', 0.00, NULL, NULL, NULL, 3, NULL, 104, 0, 1, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:28:20', '2025-12-24 00:28:29'),
(104, 102, 103, 'right', '3AE46D02', 'Saut003', NULL, 'Saut Manumpak Sitinjak3', '3sautsitinjak001@gmail.com', '081365070049', '$2y$12$TeKdaTBz96I5BvJ5RWPgjORRj3sxw.t3c.OgTz5bUscethdW6R1Nu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-TQDWU', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-19 05:29:54', '2025-12-24 00:28:29'),
(105, 24, 88, 'left', '73E42117', 'PRATAMA01', NULL, 'PRATAMA1', 'mrsyusrita@gmail.com', '085268443302', '$2y$12$TrBFrmsIi5L05SaKhLH.behIExq7OC8WeZ70BWVHoePj8gQcZvrvu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-HXN4D', 0.00, NULL, NULL, NULL, 3, 106, NULL, 47, 0, 2, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 07:03:26', '2025-12-23 22:30:05'),
(106, 105, 105, 'left', '8242DB59', 'PRATAMA02', NULL, 'PRATAMA2', '1mrsyusrita@gmail.com', '085268443302', '$2y$12$O2mp.VI0tw6qC6RbQNtwn.Rgfw1ao/VTBQcszhU1X55uoTuq6xX5e', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-8IXB1', 0.00, NULL, NULL, NULL, 3, 107, NULL, 46, 0, 1, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 07:13:01', '2025-12-23 22:30:14'),
(107, 105, 106, 'left', '7364CBF7', 'PRATAMA03', NULL, 'PRATAMA3', '2mrsyusrita@gmail.com', '085268443302', '$2y$12$3lhlg4o4AEJBjsXRz32YRuW5CIH3/sNTjo5e98yHnrqRuxp/.1.pe', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-RNZPT', 0.00, NULL, NULL, NULL, 3, 108, NULL, 45, 0, 0, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 07:15:35', '2025-12-23 22:31:40'),
(108, 106, 107, 'left', '34498B43', 'IRIT001', NULL, 'YUSRITA1', '3mrsyusrita@gmail.com', '081381845953', '$2y$12$xBVYK4kRVfpVtRE.5itFUeZY2eFY8B4NoztC//gMkiXzUTx2hRp2q', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-PNXPG', 0.00, NULL, NULL, NULL, 3, 109, NULL, 44, 0, 2, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 07:27:37', '2025-12-23 22:32:21'),
(109, 108, 108, 'left', 'E3935332', 'IRIT002', NULL, 'YUSRITA2', '4mrsyusrita@gmail.com', '081381845953', '$2y$12$J5a97yNlTz7slIZ7nFGW8.KkypgKqPrTdWmHS23osEp/SPS15YuC.', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-YFA6S', 0.00, NULL, NULL, NULL, 3, 110, NULL, 43, 0, 1, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 09:19:26', '2025-12-23 22:32:29'),
(110, 108, 109, 'left', '9EA7D42A', 'IRIT003', NULL, 'YUSRITA3', '5mrsyusrita@gmail.com', '081381845953', '$2y$12$HNoyLMlY15PJW/Ghob65sueIij/KsE2Zcg0P59ZUUMklWhsgtDumG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-JXZCF', 0.00, NULL, NULL, NULL, 3, 111, NULL, 42, 0, 0, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 09:21:06', '2025-12-23 22:33:34'),
(111, 109, 110, 'left', '7CC19C16', 'RATUEZUMI1', NULL, 'EZUMI1', 'ratuezumi0109@gmail.com', '085272107620', '$2y$12$Nlft2EEgSP/r1/.dIwDUiOjQrm6ODZTAcRrT3g8n0MVG2nzisFBlK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-XPKVD', 0.00, NULL, NULL, NULL, 3, 112, NULL, 41, 0, 2, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 09:23:05', '2025-12-23 22:34:04'),
(112, 111, 111, 'left', '1D8187DC', 'RATUEZUMI2', NULL, 'EZUMI2', '1ratuezumi0109@gmail.com', '085272107620', '$2y$12$egRNwXIBHinICWoy1rJCheD.1Vikxr4f7Tf/kXLrSLsRVcP7fwuv6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-FOL6S', 0.00, NULL, NULL, NULL, 3, 113, NULL, 40, 0, 0, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 09:24:50', '2025-12-23 22:34:11'),
(113, 111, 112, 'left', '0ABE2F97', 'RATUEZUMI3', NULL, 'EZUMI3', '2ratuezumi0109@gmail.com', '085272107620', '$2y$12$ehKIKh3zxLWY2GwXyfyZ0eG0UKKP7zr.9OuVBdXlch6zb4gp/NHi2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-2G1HY', 0.00, NULL, NULL, NULL, 3, 89, NULL, 39, 0, 0, 0, 0, 0, 0.00, 0.00, 18800000.00, 0.00, 17050000.00, 0.00, 17050000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-10', 0, 3, '2025-12-19 09:26:03', '2025-12-23 22:35:30'),
(114, 91, 91, 'left', '37CBDAEA', 'PRATAMA001', NULL, 'PRATAMA', '6mrsyusrita@gmail.com', '085268443302', '$2y$12$G9UDexfer.0LV.F8WZClC.O78delP4k/ZXnQ/3c/YjNx9ig/9mlJu', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-22 01:33:54', 'EW-20251219-FDDUL', 0.00, NULL, NULL, NULL, 3, 92, NULL, 30, 0, 0, 0, 0, 0, 0.00, 0.00, 14050000.00, 0.00, 12300000.00, 0.00, 12300000.00, 0.00, 1750000.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-08', 0, 3, '2025-12-19 09:28:32', '2025-12-23 22:44:51'),
(115, 100, 101, 'right', '788E729C', 'Jamal03', NULL, 'Jamalul Islam3', '3jamalulislam25@gmail.com', '081276916651', '$2y$12$kglsHeHpG1r9RpDq2Dm9l.AnggGtqyy96pGFm2hUfsZhqz6tTwEhG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251224-P0JZI', 0.00, NULL, NULL, NULL, 3, NULL, 102, 0, 3, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2025-12-23 22:55:58', '2025-12-24 00:27:40'),
(117, 74, 74, 'right', 'REF-VIG7PT34', 'alfi004', NULL, 'Alfi Kasanah', 'alfikasanah8767@gmail.com', '082289355375', '$2y$12$2pJES0ZFOQtAYrunLZzX2.fSo5N91ig5Eo6c40boftN1eLu.480S6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-24 03:03:08', 'EW-20251224-BHWSS', 117000.00, NULL, NULL, NULL, 2, 188, 118, 1, 9, 1, 2, 0, 0, 1500000.00, 0.00, 350000.00, 2800000.00, 0.00, 2450000.00, 350000.00, 2800000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 50, '2026-01-12', 1, 3, '2025-12-24 03:03:08', '2026-01-07 06:33:20');
INSERT INTO `customers` (`id`, `sponsor_id`, `upline_id`, `position`, `ref_code`, `username`, `nik`, `name`, `email`, `phone`, `password`, `gender`, `alamat`, `address`, `city_id`, `province_id`, `remember_token`, `email_verified_at`, `ewallet_id`, `ewallet_saldo`, `bank_name`, `bank_account`, `description`, `package_id`, `foot_left`, `foot_right`, `total_left`, `total_right`, `sponsor_left`, `sponsor_right`, `pv_left`, `pv_right`, `omzet`, `omzet_planb`, `omzet_group_left`, `omzet_group_right`, `omzet_pairing_left`, `omzet_pairing_right`, `omzet_group_left_plana`, `omzet_group_right_plana`, `omzet_group_left_planb`, `omzet_group_right_planb`, `level`, `is_stockist`, `stockist_kabupaten_id`, `stockist_kabupaten_name`, `stockist_province_id`, `stockist_province_name`, `daily_pairing`, `max_daily_pairing`, `last_pairing_date`, `network_generated`, `status`, `created_at`, `updated_at`) VALUES
(118, 117, 117, 'right', 'REF-RXRW0FN9', 'alfi005', NULL, 'ALFI KASANAH', 'alfi005@gmail.com', '082289355375', '$2y$12$JrkgDTCVNL4NH2haspqm7uypNE3VRL2gLp8QnBwcLvZEVePC60/G2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-24 03:33:13', 'EW-20251224-PQCGM', 48750.00, NULL, NULL, NULL, 1, NULL, 190, 0, 8, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2025-12-24 03:33:13', '2026-01-02 04:32:05'),
(119, 77, 77, 'right', 'REF-T3HGTATZ', 'yasminar04', '2171126901739001', 'Yasminar', 'yasmin29@gmail.com', '081364748637', '$2y$12$qlJKa1ayr2kuwfEXFRph.uwuK7Z3ffO3d7mzZr9vB.uN.KqCkUAou', 'perempuan', 'Perumahan sawang permai \nBlok F.no 3 B.  Rt.O3.  Rw  11\nKelurahan Buliang\nKecamatan Batu Aji Batam.', NULL, NULL, NULL, NULL, '2025-12-25 01:17:19', 'EW-20251225-G0W4R', 117000.00, 'BCA', '3262522978', NULL, 1, 183, 173, 1, 11, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 2450000.00, 0.00, 2100000.00, 350000.00, 2450000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2025-12-25 01:17:19', '2026-01-07 07:41:45'),
(120, 86, 86, 'right', 'REF-OTRSIBVZ', 'epie04', '2171124302789001', 'Epi Pebriana', 'epie10443@gmail.com', '081364223004', '$2y$12$0aHsC0/YjLy6FIm52giC1OYKDyfVtD7icSA.6dwpCukDvzmqsmZWy', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-25 01:59:23', 'EW-20251225-YUPGQ', 7500.00, 'BCA', '8550541077', NULL, 1, NULL, 163, 0, 10, 0, 2, 0, 0, 350000.00, 0.00, 0.00, 2800000.00, 0.00, 2800000.00, 0.00, 2800000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-25 01:59:23', '2026-01-07 08:28:44'),
(121, 80, 80, 'right', 'REF-IHJH5FNH', 'nurhalimah4', '1304014303730001', 'Nurhalimah', 'limahnur.999@gmail.com', '082392460926', '$2y$12$2zHbUaf9M17GP4ZSHIrZcOWUViF8mBoV9CvE1cFqMa7m7JhY9eG4O', 'perempuan', 'Perumahan citra Laguna tahap2 blok C11 no 8', NULL, NULL, NULL, NULL, '2025-12-25 02:11:35', 'EW-20251225-WAJGN', 0.00, 'BSI', '7294089602', NULL, 1, NULL, 143, 0, 1, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2025-12-25 02:11:35', '2026-01-07 22:39:31'),
(123, 92, 92, 'right', 'REF-XXX6ZOKX', 'dina004', NULL, 'T Sri Aprilla Dinanti', '10tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$NcBZJSv57wkJGoZ1sX/pU.9dTWUxS6L5H/q0GbX1wO1570XNL.qAS', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-25 03:33:43', 'EW-20251225-OEFMS', 251550.00, NULL, NULL, NULL, 1, 195, 194, 1, 2, 1, 1, 0, 0, 1200000.00, 0.00, 1200000.00, 700000.00, 500000.00, 0.00, 1200000.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2026-01-03', 1, 3, '2025-12-25 03:33:43', '2026-01-10 02:03:50'),
(124, 86, NULL, NULL, 'REF-2PIOTBUY', 'rara01', NULL, 'Epi pebriana', 'vi12346@gmail.com', '081364223004', '$2y$12$uy5mEAHb9XQY//IQrtB61OcPBysTX60TWiL2kidjCyftElZqS0882', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-25 04:14:37', 'EW-20251225-FCLBN', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-25 04:14:37', '2025-12-25 04:14:37'),
(128, 53, 53, 'left', '0F5BDA1C', 'JUNAIDI01', NULL, 'Moh Junaidi', 'mohjunaidi1286@gmail.com', '081909276224', '$2y$12$dkqAfrBRRBoZdrQeHOPgbe1F3H0cQFoqSMvuFxk.WgLyxstKLs0/2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251226-AH2VJ', 0.00, NULL, NULL, NULL, 3, 161, NULL, 5, 0, 1, 0, 0, 0, 0.00, 0.00, 1400000.00, 0.00, 1400000.00, 0.00, 1400000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-25 20:23:25', '2026-01-12 01:23:33'),
(129, 53, 53, 'right', '770C2B3E', 'ANAM01', NULL, 'KHAIRIL ANAM', 'libianiurfi@gmail.com', '087863547617', '$2y$12$GPKS/XExp3p4a658fSdUnOIFJu61HWT8Nbq4mt4LkSmxT2a6BYKwy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251226-WR93L', 0.00, NULL, NULL, NULL, 3, 162, 157, 2, 5, 1, 1, 0, 0, 0.00, 0.00, 700000.00, 1400000.00, 0.00, 700000.00, 700000.00, 1400000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 2, 100, '2026-01-12', 0, 3, '2025-12-25 20:27:06', '2026-01-12 00:46:05'),
(132, 87, NULL, NULL, 'REF-MN9B5LOL', 'epie06', NULL, 'Epi pebriana', 'vi1234@gmail.com', '081364223004', '$2y$12$6xPn7aLbjZ/GtnUyX1KmoOcMRq.jYQVD9ooHsLFiQdXchHf/YAFdu', '', NULL, NULL, NULL, NULL, NULL, '2025-12-26 02:25:13', 'EW-20251226-WHGTL', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-26 02:25:13', '2025-12-26 02:25:13'),
(142, 75, 75, 'right', 'REF-W4RLMOIB', 'alfi007', NULL, 'Alfi Kasanah', 'alfikasanah9876@gmail.com', '082289355375', '$2y$12$pr/Qk9HDhRGdm9R80Homa.0TzlbZAQaaBB68EpfTMDCBvzPrDhMyO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-26 04:20:38', 'EW-20251226-GWQ5G', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-26 04:20:38', '2026-01-02 04:12:47'),
(143, 80, 121, 'right', 'REF-FPKPEVGB', 'reva123', '1304015301060002', 'Reva Rahayu', 'limahnur.2006@gmail.com', '082287488893', '$2y$12$xzn7IcCKIxEfLRhFXEOvGeHmZklUs6kv3L292Ehvjvf9cgwpc.YOO', 'perempuan', 'Perumahan citra Laguna tahap2 blok C11 no 8 RT 001 RW 023\nKelurahan Tembesi kec Sagulung Batam kepri', NULL, NULL, NULL, NULL, '2025-12-26 18:54:31', 'EW-20251227-1ATAT', 0.00, 'BCA', '0613976750', 'Seorang karyawan swasta', 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-26 18:54:31', '2026-01-07 23:26:58'),
(144, 80, NULL, NULL, 'REF-81CJSL5O', 'revi03', '1304015001030001', 'Revi asnuru wahyuni', 'limahnur.2003@gmail.com', '081364640696', '$2y$12$J15UFGrZLu62R6DruAv3Yestt5k5eGoF9rKweZht/sczR5UUezyyy', '', 'Perumahan citra Laguna tahap2 blok C11 no 8 RT 001 RW 023 kelurahan Tembesi kec Sagulung Batam kepri', NULL, NULL, NULL, NULL, '2025-12-26 22:31:04', 'EW-20251227-GFFPI', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-26 22:31:04', '2025-12-26 22:31:04'),
(145, 80, NULL, NULL, 'REF-IG8FHMST', 'siregar73', '2171021908730001', 'Juspar Hamonangan Siregar', 'juspar.1973@gmail.com', '082174583373', '$2y$12$ljdXOSIJrlk3LFOdvUQu7utIR5VSoK43/PMIiYNtV7w/yHIl2Dfde', '', 'Sei tering II no. 33\nRT 006 RW 005\nTanjung sengkuang', NULL, NULL, NULL, NULL, '2025-12-26 23:24:06', 'EW-20251227-S19UY', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-26 23:24:06', '2025-12-26 23:24:06'),
(146, 76, 82, 'right', 'REF-BGAR0ZAA', 'herlina01', '2171126908689004', 'Herlina sibarani', 'sibaranih28@gmail.com', '085355458769', '$2y$12$vcU7JxSGDx92jTBroz.tQ.RTvRhOfjOSVRgifiDzDdo3rieeLMGpm', 'perempuan', 'Kp. Bunguran no.12 RT 005 RW 026 buliang batu aji', NULL, NULL, NULL, NULL, '2025-12-27 00:56:02', 'EW-20251227-AMH0O', 0.00, 'BRI', '808801006709537', NULL, 1, 220, 222, 3, 3, 1, 1, 0, 0, 350000.00, 0.00, 1050000.00, 700000.00, 350000.00, 0.00, 1050000.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 2, 15, '2026-01-05', 1, 3, '2025-12-27 00:56:02', '2026-01-12 01:35:07'),
(147, 92, NULL, NULL, 'REF-MMKQYTTK', 'yusuf001', NULL, 'Yusuf ardiyanto', 'yusuf@gmail.com', '089508131925', '$2y$12$xC4PlKXpjeKdZDrjcxbqmO4igpkWZoEBoSD0/BZpNDCi/e.k46ucO', '', 'Marina garden blok m 28', NULL, NULL, NULL, NULL, '2025-12-27 02:07:22', 'EW-20251227-P0HVY', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-27 02:07:22', '2025-12-27 02:07:22'),
(150, 94, 94, 'right', 'REF-EVCPYFHT', 'dina008', NULL, 'T. Sri aprilla dinanti', '001tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$Q5H4MckO.EQ71B.0l1PmG.m4iSEKRFf2LByOReLMQIC8dVThZdz6e', '', 'Marina grden blok m no 28', NULL, NULL, NULL, NULL, '2025-12-27 03:00:13', 'EW-20251227-PNDR1', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-27 03:00:13', '2026-01-02 06:15:34'),
(151, 92, NULL, NULL, 'REF-URX4SECP', 'aprilla004', NULL, 'T.Sri aprilla dinanti', '002tengkusriapriladinanti@gmail.com', '081234050137', '$2y$12$.Kf5BNDgtpXsvk6Qgxo4b.CKSpgwgUgrb19Hn3BJIm5kwXMDkUxkm', '', 'Marin grden blok m no 28', NULL, NULL, NULL, NULL, '2025-12-27 03:12:04', 'EW-20251227-7KALP', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-27 03:12:04', '2025-12-27 03:12:04'),
(153, 66, NULL, NULL, 'REF-PQFYKVA2', 'anisafjwn', NULL, 'Anisa Fujiwan', 'anisafujiwan20@gmail.com', '0895411031236', '$2y$12$Givp8PxtbhZMlG3aXLh7r.VR4phQwLnSo1uWueQe1K/j.ogv4/xd.', NULL, 'Tembesi Lestari  Rt003 Rw013 blok B no 44', NULL, NULL, NULL, NULL, '2025-12-29 06:38:28', 'EW-20251229-R5U9E', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2025-12-29 06:38:28', '2025-12-29 06:38:28'),
(157, 129, 129, 'right', 'REF-UWCHSY10', 'anam02', NULL, 'Khairil anam', 'libianiurfii@gmail.com', '087863547617', '$2y$12$qC.t61JCAR16Shiu.aSVguYICZ0MkJKM.DsQX/x6G0tv585m/T6/C', '', 'Jenggik', NULL, NULL, NULL, NULL, '2025-12-29 20:12:50', 'EW-20251230-RWQEA', 0.00, NULL, NULL, NULL, 1, NULL, 245, 0, 4, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 1050000.00, 0.00, 1050000.00, 0.00, 1050000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2025-12-29 20:12:50', '2026-01-12 01:31:52'),
(158, 60, 60, 'left', '8BDC5BB7', 'Hidayat01', NULL, 'Rudi haryana Hidayat', 'sayamursidin@gmail.com', '081917472726', '$2y$12$BfrIRuXSr/xE5g7MlrJnue1v8X8d7oTt1fLHe/t/rbmTQFT0N260y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251230-WEHVM', 0.00, NULL, NULL, NULL, 3, 160, 256, 4, 1, 1, 1, 0, 0, 0.00, 0.00, 700000.00, 350000.00, 350000.00, 0.00, 700000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-13', 0, 3, '2025-12-29 20:37:03', '2026-01-12 07:08:36'),
(160, 158, 158, 'left', 'REF-NK9EMCIN', 'hidayat02', NULL, 'Rudi haryana Hidayat', 'Sayamursidiin@gmail.com', '081917472726', '$2y$12$TQTfghkxCOJa/ZRkoRQUuOnzGkRSQySoHz7CihkNTKAMurPKKhd0O', '', 'Spakek', NULL, NULL, NULL, NULL, '2025-12-29 20:57:20', 'EW-20251230-FXIUQ', 0.00, NULL, NULL, NULL, 1, 265, NULL, 3, 0, 1, 0, 0, 0, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-13', 1, 3, '2025-12-29 20:57:20', '2026-01-12 20:51:48'),
(161, 128, 128, 'left', 'REF-WHT5CCNT', 'junsidi02', NULL, 'Moh Junaidi', 'mohjunaidii1286@gmail', '081909276224', '$2y$12$75746tCaWhXZludKqZILBeNAmrpPa2d1WnmHm5bXhxjpAX8GFAppC', '', 'Keeuak', NULL, NULL, NULL, NULL, '2025-12-29 21:03:33', 'EW-20251230-XTJ4L', 0.00, NULL, NULL, NULL, 1, 253, NULL, 4, 0, 0, 0, 0, 0, 350000.00, 0.00, 1050000.00, 0.00, 1050000.00, 0.00, 1050000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-13', 1, 3, '2025-12-29 21:03:33', '2026-01-12 05:39:46'),
(162, 129, 129, 'left', 'REF-0N0SXYFZ', 'anam03', NULL, 'Khairil anam', 'libianiuurfi@gmail.com', '087863547617', '$2y$12$t5iXX/3piq2EaZea6eYyze.effb6wp5/Oja/F9mqsRmmG21KXGAVu', '', 'Jenggik', NULL, NULL, NULL, NULL, '2025-12-30 01:00:09', 'EW-20251230-5IS4N', 0.00, NULL, NULL, NULL, 1, 244, NULL, 1, 0, 1, 0, 0, 0, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2025-12-30 01:00:09', '2026-01-12 01:27:11'),
(163, 120, 120, 'right', 'REF-9UYUEN7P', 'epie05', '2171124302789001', 'Epi pebriana', 'aevi17107@gmail.com', '081364223004', '$2y$12$jz10YeYRr7kduD8dzKaYJ.jqXdX5TUT/TDB3f5s0omNKPO.FP/th.', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-30 06:39:43', 'EW-20251230-3TJOI', 48750.00, 'Bca', '8550541077', 'Ok', 1, NULL, 164, 0, 9, 0, 2, 0, 0, 350000.00, 0.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-30 06:39:43', '2026-01-07 08:32:49'),
(164, 163, 163, 'right', '9342ECC5', 'MISADI01', '2171121212819007', 'Mis Adi', 'adipaguruyung@gmail.com', '081364223002', '$2y$12$XAk6Z22a.nB30cFO/yZqleajy/E1u.Z5yM68OpeHVY3EFo/9l7DD2', 'laki-laki', 'Taman cipta indah  e3 no 32', NULL, NULL, NULL, NULL, NULL, 'EW-20251230-YSPVY', 48750.00, 'BCA', '8550646006', NULL, 1, NULL, 165, 0, 8, 0, 1, 0, 0, 0.00, 0.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 2450000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 0, 3, '2025-12-30 08:08:20', '2026-01-07 07:37:43'),
(165, 164, 164, 'right', 'REF-N7XIUAWL', 'misadi02', '2171121212819007', 'mis adi', 'adipaguruyung1@gmail.com', '081364223002', '$2y$12$PGcaUv1/GcJWF/EyAws13.HHAm9RruKcLcuE8vwIrOuECIlU1Eota', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 08:30:43', 'EW-20251230-V9ATI', 48750.00, 'BCA', '8550646006', NULL, 1, NULL, 166, 0, 7, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 2100000.00, 0.00, 2100000.00, 0.00, 2100000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-30 08:30:43', '2026-01-07 07:47:42'),
(166, 165, 165, 'right', 'REF-TTEJAPJK', 'ema23', NULL, 'marhamah1', 'marhamahema1@gmail.com', '082283767382', '$2y$12$27cK0oZopAIYaJCIXrArXuvWT7jv2KQhiXe7r.B2/RD2CLhqFxeAO', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 08:54:16', 'EW-20251230-HBMNC', 0.00, NULL, NULL, NULL, 1, NULL, 167, 0, 6, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-30 08:54:16', '2025-12-30 09:28:43'),
(167, 120, 166, 'right', 'REF-F5YAIOLX', 'mona12', NULL, 'mei mona', 'monae12@gmail.com', '081345318095', '$2y$12$tEnZFNb96uqj5weK4EXJbe.E5COMXIChvITAT9jeCUuTOBLlJXns.', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 09:22:48', 'EW-20251230-IQWMC', 117000.00, NULL, NULL, NULL, 1, 168, 169, 1, 4, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 1050000.00, 0.00, 700000.00, 350000.00, 1050000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2025-12-30', 1, 3, '2025-12-30 09:22:48', '2025-12-30 09:57:36'),
(168, 167, 167, 'left', 'REF-78DIRFBO', 'mona121', NULL, 'mei mona', '3mona01@gmail.com', '081345318095', '$2y$12$LGGkXuwL1Pk4xz.qxUn0b.Em6MLLlYB2QIGt3MuFb2.amkHRNcZku', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 09:35:21', 'EW-20251230-YEEKC', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-30 09:35:21', '2025-12-30 09:57:36'),
(169, 167, 167, 'right', 'REF-RZL1GR8F', 'mona122', NULL, 'mei mona', '2monae12@gmail.com', '081345318095', '$2y$12$eVlOOhVomJa6s5kCnDTcn.iOR1LVQq2p3FHYw/9IqtonLREqIVVfW', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 09:41:17', 'EW-20251230-ZOIOE', 0.00, NULL, NULL, NULL, 1, NULL, 170, 0, 3, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-30 09:41:17', '2025-12-30 10:21:47'),
(170, 163, 169, 'right', 'REF-QNGNIG2B', 'radian11', NULL, 'Radian', 'ryanradian34@gmail.com', '081364600483', '$2y$12$juj5Dx1TdFXGNaIAFSHJdOQdMfQjWogEu6DaCozS2II21mJcjv2kq', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 10:07:43', 'EW-20251230-XLDGE', 48750.00, NULL, NULL, NULL, 1, 185, 171, 1, 1, 1, 1, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-30', 1, 3, '2025-12-30 10:07:43', '2026-01-02 01:53:54'),
(171, 170, 170, 'right', 'REF-NGKXA433', 'radian02', NULL, 'Radian', 'ryanradian334@gmail.com', '081345318095', '$2y$12$XCriV7xyAFs9Wndveiw9oeLTjOESM7YhojOf9VUAR5B5kG6Q1wbh6', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-30 10:16:32', 'EW-20251230-NUFKX', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-30 10:16:32', '2025-12-30 10:30:19'),
(172, 60, 60, 'right', '177191E2', 'Amir629', NULL, 'Amir Hamdan', 'amirhamdan54629@gmail.com', '081997977782', '$2y$12$YMm9QPgEzLhGNnr3YNbnyuPhOyxpZqXxOgNj0MWT/JpXc.dLzbL2i', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251231-HGSWO', 0.00, NULL, NULL, NULL, 3, 261, 262, 5, 1, 1, 1, 0, 0, 0.00, 0.00, 1050000.00, 350000.00, 700000.00, 0.00, 1050000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 100, '2026-01-13', 0, 3, '2025-12-30 22:26:40', '2026-01-12 20:39:05'),
(173, 119, 119, 'right', 'REF-OPCVYVBV', 'yasminar05', '2171126901739001', 'YASMINAR', 'yasmin73@gmail.com', '081364748637', '$2y$12$UJAXuf/T/ypck4Ac4g9PY.wQ.M8ejcA8Cabk3V5VtWE32jyKcmOtS', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2025-12-31 05:43:56', 'EW-20251231-J2MCC', 0.00, 'BCA', '3262522978', NULL, 1, 175, 174, 3, 7, 2, 1, 0, 0, 350000.00, 0.00, 350000.00, 1750000.00, 0.00, 1400000.00, 350000.00, 1750000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2026-01-12', 1, 3, '2025-12-31 05:43:56', '2026-01-09 20:46:30'),
(174, 173, 173, 'right', '47ADA005', 'Apriyan001', NULL, 'Apriyan Syafri', '11apriyansyafri@gmail.com', '081364948124', '$2y$12$GaJUYtnXHBQo4cZ0S2SHqO7qsepoI7pHGydTrnwA01smGj12OAVka', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251231-IFBFR', 48750.00, NULL, NULL, NULL, 3, NULL, 176, 0, 6, 0, 1, 0, 0, 0.00, 0.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2025-12-31', 0, 3, '2025-12-31 06:01:04', '2026-01-02 06:25:11'),
(175, 173, 173, 'left', '8A4872FC', 'Asya01', NULL, 'Asyara Aura Azani', 'asyaraauraazani@gmail.com', '0895629097944', '$2y$12$WfIdGuz.662FCi7/Hp6Ad.fwR/uTqP0WtqDZqZTUusHSUaTXWAjhO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251231-MAGPJ', 0.00, NULL, NULL, NULL, 3, 249, NULL, 2, 0, 1, 0, 0, 0, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2025-12-31 06:32:05', '2026-01-12 05:10:19'),
(176, 174, 174, 'right', 'REF-IYJLIJUG', 'apriyan02', NULL, 'Apriyan Syafri', '12apriyansyafri@gmail.com', '081364948124', '$2y$12$L1XHUkkN1c4fg8zvyxPqze0q6T/o2nKg1umLPLfjr/mbuD6m8PEg2', '', NULL, NULL, NULL, NULL, NULL, '2025-12-31 06:36:46', 'EW-20251231-PXYWW', 48750.00, NULL, NULL, NULL, 1, NULL, 177, 0, 5, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 1400000.00, 0.00, 1400000.00, 0.00, 1400000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-31', 1, 3, '2025-12-31 06:36:46', '2025-12-31 06:55:33'),
(177, 176, 176, 'right', 'REF-GDDONWO0', 'tirta01', NULL, 'Tirtaningsih', 'tirtaningsih13@gmail.com', '085355460530', '$2y$12$lipQfr6x2ymsN2xxb9vaO.nF2IA.O3EQtpbgzeBO.WmNsGxOej6w2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 06:49:23', 'EW-20251231-F8IW8', 68250.00, NULL, NULL, NULL, 1, 180, 178, 2, 2, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 700000.00, 0.00, 350000.00, 350000.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2025-12-31', 1, 3, '2025-12-31 06:49:23', '2025-12-31 07:28:04'),
(178, 177, 177, 'right', 'REF-3HEXLTYZ', 'tirta02', NULL, 'Tirtaningsih', '2tirtaningsih13@gmail.com', '085355460530', '$2y$12$vR1eg8wE6F8tXRJ2CqblA.s/nlOXhG6x8rwNez4i7C6xsLS/3cbRC', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 07:16:57', 'EW-20251231-UOEBH', 48750.00, NULL, NULL, NULL, 1, NULL, 179, 0, 1, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2025-12-31', 1, 3, '2025-12-31 07:16:57', '2025-12-31 07:25:23'),
(179, 178, 178, 'right', 'REF-DU2M5LAR', 'tirta03', NULL, 'Tirtaningsih', '3tirtaningsih13@gmail.com', '085355460530', '$2y$12$UvMm0D9xWBfEaqD648NJiugnCuUowU2mX7f1TK/gBwO0/OkDsXj6W', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 07:23:04', 'EW-20251231-IYMCS', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-31 07:23:04', '2025-12-31 07:25:23'),
(180, 177, 177, 'left', 'F3BC4A9C', 'Tirta04', NULL, 'Tirtaningsih', '4tirtaningsih13@gmail.com', '085355460530', '$2y$12$grga9MlPnNi1dUPfFkp.v.U7.0L2qHXQ5ykX3NxYxei0PPk3H12le', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20251231-RAOEO', 48750.00, NULL, NULL, NULL, 3, 182, NULL, 1, 0, 1, 0, 0, 0, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2025-12-31', 0, 3, '2025-12-31 07:27:37', '2026-01-02 06:25:32'),
(182, 180, 180, 'left', 'REF-Y2QDIEJY', 'tirta05', NULL, 'Tirtaningsih', '5tirtaningsih13@gmail.com', '085355460530', '$2y$12$9MFUrKP9Mh4SbronxawCherieUxJb0OI6bbz3LaLfTuqOSDA3XMrK', NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 07:30:46', 'EW-20251231-UEKL8', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-31 07:30:46', '2025-12-31 07:32:53'),
(183, 119, 119, 'left', 'REF-IP5FJGDH', 'yasminar06', '2171126901739001', 'YASMINAR', 'yasmin291@gmail.com', '081364748637', '$2y$12$tHknNz6x7tfS3D/RzCCeeuiQbXspGwKv1ojvjmWnD80d7jrrTjCq.', 'perempuan', 'Sawang permai blok F no. 3B', NULL, NULL, NULL, NULL, '2025-12-31 07:35:57', 'EW-20251231-V5D41', 0.00, 'BCA', '3262522978', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-31 07:35:57', '2026-01-09 20:55:05'),
(184, 78, 78, 'right', 'REF-KJNOPZJQ', 'yasminar07', '2171126901739001', 'YASMINAR', 'yasmin292@gmail.com', '081364748637', '$2y$12$UNVc7GckDEYKtUh0wvG6HeGfkmoSoUeD9eq2rpuyO4JVFR7rc.Phu', 'perempuan', 'Sawang permai blok F no 3B', NULL, NULL, NULL, NULL, '2025-12-31 07:41:48', 'EW-20251231-MGLTQ', 0.00, 'BCA', '3262522978', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2025-12-31 07:41:48', '2026-01-09 20:58:48'),
(185, 170, 170, 'left', '25D4DCAB', 'Radian01', NULL, 'Radian', 'radian7768@gmail.com', '081364600483', '$2y$12$dP9z32apEELlKumLrkWRa.k3WiCkQqKx5aauNBSpW8HLjAraSDrlK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260102-18HKB', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2026-01-02 01:53:25', '2026-01-02 06:27:39'),
(186, 168, NULL, NULL, 'REF-UKGROTLG', 'resgi102', NULL, 'Resgia andina', 'gia005@gmail.com', '082385688896', '$2y$12$T3JV1MtLtMriSFB/u/H3MOIuyUcq3bVV8TFoBfhDcVlhevg6zRGbu', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 03:37:06', 'EW-20260102-6KEON', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-02 03:37:06', '2026-01-02 03:37:06'),
(187, 168, NULL, NULL, 'REF-J3GXG4O2', 'mona04', NULL, 'Meimona', '3monae12@gmail.com', '081345318095', '$2y$12$g2PeV.q0ruMyAX/0o0oiS.YblK078wxPQLsP7PEAqjFv3IvLq9EU6', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 03:52:03', 'EW-20260102-JLNNJ', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-02 03:52:03', '2026-01-02 03:52:03'),
(188, 117, 117, 'left', 'REF-KDAEWEES', 'alfi006', NULL, 'ALFI KASANAH', 'alfikasanah8768@gmail.com', '082289355375', '$2y$12$8LS9Blf0.j4vzm4404ktpea7.0bziIhHxzDwWVl3SHUFdBU59LTDe', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 04:04:30', 'EW-20260102-CYWHB', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-02 04:04:30', '2026-01-02 04:06:33'),
(189, 76, 76, 'right', 'REF-OAV0AYNX', 'alfi008', NULL, 'ALFI KASANAH', 'alfikasanah8769@gmail.com', '082289355375', '$2y$12$EvFyNsG0tcpmAtfO/t1Z9.EKu9ZB/LGTldTpa4k4PiP0xEgVXmBS.', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 04:20:28', 'EW-20260102-MQLB0', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-02 04:20:28', '2026-01-02 04:22:50'),
(190, 118, 118, 'right', 'REF-LHZZKIZ9', 'darman01', NULL, 'Darman', 'suryapowerindo1@gmail.com', '082392245200', '$2y$12$JLJ25ilJiW0q84gsk2cLMe.wHp4c9cfGJmuSD.6rBE5czqU3QmjPy', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 04:29:15', 'EW-20260102-1IGSW', 117000.00, NULL, NULL, NULL, 1, 192, 191, 2, 5, 1, 1, 0, 0, 350000.00, 0.00, 700000.00, 1400000.00, 0.00, 700000.00, 700000.00, 1400000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2026-01-02 04:29:15', '2026-01-07 05:14:33'),
(191, 190, 190, 'right', 'REF-VBL4CHV9', 'darman02', NULL, 'Darman', 'suryapowerindo2@gmail.com', '082392245200', '$2y$12$RknECkIdRd7PAVpspOXGfO7DJRZ9eEsGEDoyRhatXQfueMmT64uPq', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 04:34:10', 'EW-20260102-GQONH', 0.00, NULL, NULL, NULL, 1, 227, 193, 1, 3, 0, 1, 0, 0, 350000.00, 0.00, 350000.00, 700000.00, 0.00, 350000.00, 350000.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2026-01-12', 1, 3, '2026-01-02 04:34:10', '2026-01-07 06:35:35'),
(192, 190, 190, 'left', 'REF-WMQ7XXXT', 'darman03', NULL, 'Darman', 'suryapowerindo3@gmail.com', '082392245200', '$2y$12$/uvdNn58xOrRk3rHO96V6O/bTcvsT4.SNrsBvRQTJJvhwCMUwLdPK', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 04:35:08', 'EW-20260102-JDB3S', 0.00, NULL, NULL, NULL, 1, NULL, 226, 0, 1, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-07', 1, 3, '2026-01-02 04:35:08', '2026-01-07 05:15:10'),
(193, 191, 191, 'right', '6E9D77BE', 'Akbar01', NULL, 'Muhammad Khairul Aulia Syah Akbar', 'khairul03@gmail.com', '08566576504', '$2y$12$bzAh4VG729TeCZESSUWU3.xZGn4tOuY.fOTv7sT.BR8ipZsmCJE9C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260102-QFXMV', 0.00, NULL, NULL, NULL, 3, 250, 251, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2026-01-02 04:47:30', '2026-01-12 05:26:56'),
(194, 123, 123, 'right', 'REF-WEK58KOT', 'dina005', NULL, 'T Sri Aprilla Dinanti', 'tengkusriapriladinanti5@gmail.com', '081234050137', '$2y$12$id7f0bDwrNUiKy7Lb4FxguKHv.SkuUkHYucBAFTh1IUwAPwjYieau', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 05:42:45', 'EW-20260102-GJKCP', 48750.00, NULL, NULL, NULL, 1, NULL, 197, 0, 1, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-03', 1, 3, '2026-01-02 05:42:45', '2026-01-03 03:16:45'),
(195, 123, 123, 'left', 'REF-DKVLDOS6', 'dina006', NULL, 'T Sri Aprilla Dinanti', 'tengkusriapriladinanti6@gmail.com', '081234050137', '$2y$12$K4Jy1ehM5AyqQFyzlQBkdOKS.G2F4JmDHwnTJAdytQ4dvSmPYpfn6', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 05:44:17', 'EW-20260102-PDUAX', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 1200000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-02 05:44:17', '2026-01-02 05:47:03'),
(196, 93, 93, 'right', 'REF-PBLCSGDJ', 'dina007', NULL, 'T Sri Aprilla Dinanti', 'tengkusriapriladinanti7@gmail.com', '081234050137', '$2y$12$V5QwbCLuHxVjlroUQpaFcuh7QW8ioKEFTjqE5CdB3ef78EbNdqy3y', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-02 05:54:42', 'EW-20260102-9BVJV', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-02 05:54:42', '2026-01-02 05:56:49'),
(197, 194, 194, 'right', 'REF-AR18I89O', 'dina009', NULL, 'T Sri Aprilla Dinanti', 'tengkusriapriladinanti9@gmail.com', '0882022170623', '$2y$12$knRMGHL7z3IJT2q9QiqNcec09DRnrnY155Cuwlj17hOMPWejHBs46', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 03:10:39', 'EW-20260103-AZBYF', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 03:10:39', '2026-01-03 03:16:45'),
(198, 76, 94, 'left', 'REF-QYFGB3TF', 'dedy001', NULL, 'DEDY SUKMANA', 'dedy001@gmail.com', '081346338886', '$2y$12$XGgs080CtgaQi108joeHO.qs8x8GeSuuCq5FSmM4EGZPamtJwk51y', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 03:34:06', 'EW-20260103-K1WNM', 390000.00, NULL, NULL, NULL, 1, 199, 202, 16, 4, 1, 1, 0, 0, 350000.00, 0.00, 4900000.00, 2550000.00, 2450000.00, 100000.00, 4900000.00, 2550000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 03:34:06', '2026-01-03 05:45:44'),
(199, 198, 198, 'left', 'REF-DBIPZPLE', 'dedy002', NULL, 'DEDY SUKMANA', 'dedy002@gmail.com', '081346338886', '$2y$12$jTE7eWTi9H82THOhoJqwgerWl16IRXTEegSCcBk7NW02g19K5oW3e', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 03:40:41', 'EW-20260103-X2ORI', 68250.00, NULL, NULL, NULL, 1, 200, 201, 14, 1, 1, 1, 0, 0, 350000.00, 0.00, 4200000.00, 350000.00, 3850000.00, 0.00, 4200000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 03:40:41', '2026-01-03 03:49:56'),
(200, 199, 199, 'left', 'DE19A649', 'DEDY003', NULL, 'DEDY SUKMANA', 'dedy003@gmail.com', '081346338886', '$2y$12$JK5WjIwPF7mNcVJjZHeFkeXV8cOYFVHGbfHsvwYD.W.Rbggnxz/AC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260103-WIRMA', 48750.00, NULL, NULL, NULL, 3, 207, 206, 12, 1, 1, 1, 0, 0, 0.00, 0.00, 3850000.00, 350000.00, 3500000.00, 0.00, 3850000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-08', 0, 3, '2026-01-03 03:45:56', '2026-01-03 04:36:42'),
(201, 199, 199, 'right', 'REF-MQLWC4YU', 'dedy004', NULL, 'DEDY SUKMANA', 'dedy004@gmail.com', '081346338886', '$2y$12$9DK/8cjGrHZFpOtrROkj5u.jjTKhkMF.fYLEgJL9psM4lF.jO0V.C', '', NULL, NULL, NULL, NULL, NULL, '2026-01-03 03:48:02', 'EW-20260103-TW6YM', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 03:48:02', '2026-01-03 03:49:56'),
(202, 198, 198, 'right', 'REF-JIRTHI80', 'dedy005', NULL, 'DEDY SUKMANA', 'dedy005@gmail.com', '081346338886', '$2y$12$UBxcz27GOCMazmEiJVjNYeGEzexvlkAKjXDu9JiW/0LXko8Diffee', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 03:57:24', 'EW-20260103-Q5E6F', 117000.00, NULL, NULL, NULL, 2, 204, 203, 1, 2, 1, 1, 0, 0, 1500000.00, 0.00, 350000.00, 700000.00, 0.00, 350000.00, 350000.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 50, '2026-01-03', 1, 3, '2026-01-03 03:57:24', '2026-01-03 04:06:44'),
(203, 202, 202, 'right', 'REF-BMSKETFJ', 'dedy007', NULL, 'DEDY SUKMANA', 'dedy007@gmail.com', '081346338886', '$2y$12$SsDzqVFurjleoiD5Wan5G.1tGtoBDl.K6xisO11Mn/FHLTSDkW1MW', '', NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:00:31', 'EW-20260103-YLCFY', 48750.00, NULL, NULL, NULL, 1, NULL, 205, 0, 1, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-03', 1, 3, '2026-01-03 04:00:31', '2026-01-03 04:12:07'),
(204, 202, 202, 'left', 'REF-WTNMU77A', 'dedy006', NULL, 'DEDY SUKMANA', 'dedy006@gmail.com', '081346338886', '$2y$12$Z0ZTJ5SrSCB2f2.3ijS5weYDB7tWqRXodZeviqNnztckQ2u5ezguO', '', NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:01:39', 'EW-20260103-RIQQA', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 04:01:39', '2026-01-03 04:06:37'),
(205, 203, 203, 'right', 'REF-BQ2UPODC', 'aprianti01', NULL, 'SYARIFAH DWI APRIANTI', 'aprianti01@gmail.com', '082287328399', '$2y$12$a76WdhFoYmhglLqqp./0yepEb4nmy9SMhH7Mf1B48csaPx.3Dmz1G', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:10:33', 'EW-20260103-GF37Q', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 04:10:33', '2026-01-03 04:12:07'),
(206, 200, 200, 'right', 'REF-RZO6MJOY', 'dedy008', NULL, 'DEDY SUKMANA', 'dedy008@gmail.com', '0881025681589', '$2y$12$TkEpneT0Tr0AhftM69//Z.MKjGS39.EVZRgQHfFxmGtMSyp1IYC5S', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:23:18', 'EW-20260103-BOIWM', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 04:23:18', '2026-01-03 04:25:06'),
(207, 76, 200, 'left', 'REF-DMFQSY8R', 'kasanah01', NULL, 'KASANAH', 'umiubay007@gmail.com', '082283034407', '$2y$12$BzII3MzMjIpbah/8tskoD.fKTv54shnRHoHhTW2TRcivgbUMV1lve', '', NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:30:43', 'EW-20260103-TAYM3', 117000.00, NULL, NULL, NULL, 1, 208, 210, 10, 1, 1, 1, 0, 0, 350000.00, 0.00, 3150000.00, 350000.00, 2800000.00, 0.00, 3150000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 04:30:43', '2026-01-03 04:47:03'),
(208, 207, 207, 'left', 'REF-A1QBUN3C', 'kasanah02', NULL, 'KASANAH', 'umiubaya007@gmail.com', '082283034407', '$2y$12$VtAz9SLqrsIw8X16vIBua.z6Y2OO9CH3Tg3GyTJVD2OmgbU9Fs7VW', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:41:27', 'EW-20260103-Z0CS1', 97500.00, NULL, NULL, NULL, 1, 211, NULL, 9, 0, 2, 0, 0, 0, 350000.00, 0.00, 2800000.00, 0.00, 2800000.00, 0.00, 2800000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 04:41:27', '2026-01-03 04:51:55'),
(210, 207, 207, 'right', 'REF-TLAIIBTR', 'kasahan03', NULL, 'KASANAH', '3umiubaya007@gmail.com', '082283034407', '$2y$12$n6SoHSvPhOXSr2g9KhRnr.2xm/JvbISUkZmSMGTDrvm8Zbef6VP3W', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:42:59', 'EW-20260103-BHHBT', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 04:42:59', '2026-01-03 04:47:03'),
(211, 208, 208, 'left', 'REF-078DOZMI', 'baniah01', NULL, 'BANIAH', 'baniah01@gmail.com', '082288421778', '$2y$12$wTPmXz2X2UtewBndHRrNnegXcLmMLzP/ZTJKnwQvo3lexh7ksxdU6', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:50:03', 'EW-20260103-5IIYK', 117000.00, NULL, NULL, NULL, 1, 212, 213, 7, 1, 1, 1, 0, 0, 350000.00, 0.00, 2100000.00, 350000.00, 1750000.00, 0.00, 2100000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 04:50:03', '2026-01-03 04:56:55'),
(212, 211, 211, 'left', 'REF-YA7NOCTT', 'baniah02', NULL, 'BANIAH', 'baniah02@gmail.com', '082288421778', '$2y$12$XnqvH6XwSuNrwR9g6IKMz.OfqHgaFVTHCf0.v3fkktUcu5I8g0JCS', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:52:44', 'EW-20260103-QIIDD', 0.00, NULL, NULL, NULL, 1, 214, NULL, 6, 0, 0, 0, 0, 0, 350000.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 1750000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 04:52:44', '2026-01-03 05:01:08'),
(213, 211, 211, 'right', 'REF-BQGLOTBS', 'baniah03', NULL, 'BANIAH', 'baniah03@gmail.com', '082288421778', '$2y$12$0DVVvJAOnL.jTcInyazGAuLUIm7J/zy6LctnyE7AbRsfjMnLtchJG', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:53:31', 'EW-20260103-AK2YC', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 04:53:31', '2026-01-03 04:56:55'),
(214, 208, 212, 'left', 'REF-KLFOJKXH', 'tina001', NULL, 'TINA SISWATI', 'tinasiswati28@gmail.com', '082169066557', '$2y$12$/KN5TtLOAvdNQ/r1hZHEA.snxnfEQcemQ8jmLoxGHJdrsflyYeklW', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 04:59:00', 'EW-20260103-PW5UL', 117000.00, NULL, NULL, NULL, 1, 216, 217, 4, 1, 1, 1, 0, 0, 350000.00, 0.00, 1050000.00, 350000.00, 700000.00, 0.00, 1050000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 04:59:00', '2026-01-03 05:08:00'),
(216, 214, 214, 'left', 'REF-YLXFJHL2', 'tina002', NULL, 'TINA SISWATI', 'tinasiswati282@gmail.com', '082169066557', '$2y$12$OtJKk8w8e79p1/.BPH.cd.j9rJigrzTxQ6az1vw3Outy/LITs7V6K', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 05:02:23', 'EW-20260103-26QE8', 0.00, NULL, NULL, NULL, 1, 229, NULL, 3, 0, 0, 0, 0, 0, 350000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-03 05:02:23', '2026-01-08 02:01:11'),
(217, 214, 214, 'right', 'REF-KEHORPEJ', 'tina003', NULL, 'TINA SISWATI', 'tinasiswati283@gmail.com', '082169066557', '$2y$12$yfD0caYSpsp6gjeoQle7t.otT1FZn8zvjCrr0Mbo6By1lZFTz8qgC', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-03 05:03:03', 'EW-20260103-UKUUA', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-03 05:03:03', '2026-01-03 05:08:00'),
(219, 82, NULL, NULL, 'REF-GUOT6S0A', 'kepri001', NULL, 'Dewinta Puspitasari', 'carabelajaranakcerdas@gmail.com', '083878407121', '$2y$12$yvs8fDvb15I6laChewi/gepJkkyTFNLeBhlmtBgo3eQiQJDc1Mwra', '', NULL, NULL, NULL, NULL, NULL, '2026-01-04 10:54:03', 'EW-20260104-ASTQR', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-04 10:54:03', '2026-01-04 10:54:03'),
(220, 146, 146, 'left', 'REF-YKQGHLFV', 'herlina02', '2171126908689004', 'HERLINA SIBARANI', 'herlina02@gmail.com', '085355458769', '$2y$12$Bs1ojsWzc9Dl9P01yJ.A1.fqBMBei/EYANszP5uM7DXg9CY5tOryG', NULL, 'Batam', NULL, NULL, NULL, NULL, '2026-01-05 01:04:54', 'EW-20260105-NMGTS', -117000.00, 'BRI', '808801006709537', NULL, 1, 221, 223, 1, 1, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 15, '2026-01-05', 1, 3, '2026-01-05 01:04:54', '2026-01-12 04:46:28'),
(221, 220, 220, 'left', 'REF-XGUEMIMT', 'herlina04', '2171126908689004', 'HERLINA SIBARANI', 'herlina04@gmail.com', '085355458769', '$2y$12$9veRyiZjH/FAPDxtN9x2deV8OgJXPoxmcW/x0Du1gGE.wQTHg0Zg2', NULL, 'BATAM', NULL, NULL, NULL, NULL, '2026-01-05 01:25:32', 'EW-20260105-NE6TD', 0.00, 'BRI', '808801006709537', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-05 01:25:32', '2026-01-12 01:36:55'),
(222, 146, 146, 'right', 'REF-UYSF11ON', 'herlina03', '2171126908689004', 'HERLINA SIBARANI', 'herlina03@gmail.com', '085355458769', '$2y$12$ZPct4f72pLEufUxnQXCDlOCFKJy/Y4iC6il2.ZXOADKGk4iw92CNG', 'perempuan', 'BATAM', NULL, NULL, NULL, NULL, '2026-01-05 01:26:52', 'EW-20260105-EQUFS', 48750.00, 'BRI', '808801006709537', NULL, 1, 224, 225, 1, 1, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-05', 1, 3, '2026-01-05 01:26:52', '2026-01-12 01:38:43'),
(223, 220, 220, 'right', 'REF-NHTJTXOZ', 'herlina05', '2171126908689004', 'HERLINA SIBARANI', 'herlina05@gmail.com', '085355458769', '$2y$12$.czdECKFUpJiHpHjvLlPiOqlOQJGUkgOANMoojZuc0Mlg3F1Vs2eq', NULL, 'Batam', NULL, NULL, NULL, NULL, '2026-01-05 01:34:04', 'EW-20260105-DMHJO', 0.00, 'BRI', '808801006709537', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-05 01:34:04', '2026-01-12 01:39:34'),
(224, 222, 222, 'left', 'REF-RJDLL9NV', 'herlina06', '2171126908689004', 'HERLINA SIBARANI', 'herlina06@gmail.com', '085355458769', '$2y$12$HJhNi7I7hRe5vkenADeP4eJS/PDvAUtfzSQBRH.FexrscV9EwRJHC', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-05 02:11:30', 'EW-20260105-Q45OO', 0.00, 'BRI', '808801006709537', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-05 02:11:30', '2026-01-12 01:40:45'),
(225, 222, 222, 'right', '5071A19E', 'HERLINA07', NULL, 'HERLINA SIBARANI', 'Herlina07@gmail.com', '085355458769', '$2y$12$Y5LGhEpyy70KbqrytPB0O.bj9d95RMCGClNSvPxIrp25KnwRXgzCe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260105-WQKBR', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2026-01-05 02:18:06', '2026-01-05 02:22:19'),
(226, 192, 192, 'right', 'REF-28MD5O0Q', 'lisna01', '1208095202910001', 'Lisnawati', 'lisnawatisengkuang@gmail.com', '081267093045', '$2y$12$LGDK0VkDHVaNPI1AwpTgLuQPJH7vgr4yT7vuqgtZZYVnm4vcMIa0G', 'perempuan', 'Perum Marine Batam', NULL, NULL, NULL, NULL, '2026-01-07 04:24:09', 'EW-20260107-R9YEJ', 0.00, 'BANK RIAU KEPRI', '1323100994', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-07 04:24:09', '2026-01-12 05:42:41'),
(227, 117, 191, 'left', 'REF-4TVKN6QO', 'alibasar001', '2171100102729011', 'Alibasar bsc', 'alibasarbsc70@gmail.com', '081277301249', '$2y$12$GGOPFFtEbA5eYmIOtzYl9Oj18L/nvMpm8dRsHSY6.EdBcsEWY8oAi', 'laki-laki', 'Perumahan bukit sakinah blok thursina 1 no 01 rt 003 rw 027 kelurahan buliang ,kec batu aji,', NULL, NULL, NULL, NULL, '2026-01-07 06:05:05', 'EW-20260107-HM6XN', 0.00, 'BANK PERMATA', '9931624404', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-07 06:05:05', '2026-01-07 06:56:00'),
(228, 120, NULL, NULL, 'REF-4TKL9RZQ', 'epie07', '2171124302789001', 'Epi pebriana', 'epie1027@gmail.com', '081364223002', '$2y$12$HCY69NcNSYtjNiWhuC2ghu7VupDqdVw4..lvM4NpZquAxZ7F8pT3m', 'perempuan', 'taman cipta indah blok E3 no e3', NULL, NULL, NULL, NULL, '2026-01-07 09:24:48', 'EW-20260107-SI1LP', 0.00, 'BCA', '8550541077', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-07 09:24:48', '2026-01-07 09:28:22'),
(229, 200, 216, 'left', 'REF-ALKYCLJR', 'lisma001', '2171114410800001', 'HAYATULISMA', 'hayatulisma81@gmail.com', '082169549269', '$2y$12$PrSOPTtb75xCNnKRxuw/wO4oP6oYArZcJMiQXJOIv9nw9dqPeFPqO', 'perempuan', 'Batam', NULL, NULL, NULL, NULL, '2026-01-08 01:56:45', 'EW-20260108-YZHHD', 0.00, NULL, NULL, NULL, 1, 231, 232, 1, 1, 1, 1, 0, 0, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-08', 1, 3, '2026-01-08 01:56:45', '2026-01-08 02:08:56'),
(231, 229, 229, 'left', 'REF-Z3UVCC9H', 'lisma002', NULL, 'HAYATULISMA', 'hayatulisma82@gmail.com', '082169549269', '$2y$12$tjyqA7YT8JwoImYAXPjjm.eCg2RDpFiqybZOhekJCQzNF5D8UIEx.', 'perempuan', 'BATAM', NULL, NULL, NULL, NULL, '2026-01-08 02:03:12', 'EW-20260108-GIYAC', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-08 02:03:12', '2026-01-08 02:08:50'),
(232, 229, 229, 'right', 'B76DC157', 'LISMA003', NULL, 'HAYATULISMA', 'hayatulisma@gmail.com', '082169549269', '$2y$12$3byZBN/OpM517PVnA7XMwuxdmLOLmCJ5ZuZbsLi0uH2RdOwQPzZhK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260108-PWBXZ', 0.00, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, NULL, 0, 3, '2026-01-08 02:06:32', '2026-01-08 02:09:20'),
(233, 89, 89, 'right', 'REF-95YZHTUX', 'elly004', '2171076802739003', 'Elly Marlina', 'ellymarlina194@gmail.com', '082286784718', '$2y$12$hyAFBxOzQx2mygnoaKs2PeIt27XejGcWBizoy0tmBTC3B.tRqsaXa', NULL, 'Batam', NULL, NULL, NULL, NULL, '2026-01-10 04:48:37', 'EW-20260110-ATHD4', 0.00, 'BCA', '3262271835', NULL, 2, 236, 238, 1, 1, 1, 1, 0, 0, 1500000.00, 0.00, 350000.00, 1500000.00, 0.00, 1150000.00, 350000.00, 1500000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 1, 50, '2026-01-10', 1, 3, '2026-01-10 04:48:37', '2026-01-10 05:31:26'),
(235, 90, 90, 'right', 'REF-E5AACGIW', 'elly005', '2171076802739003', 'Elly Marlina', 'ellymarlina195@gmail.com', '082286784718', '$2y$12$eZt6tTipbeg8VTnPRfU6jepN/GZZPnXK..RZh.IvWWyy3/H8zDN1O', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-10 05:16:25', 'EW-20260110-UWJ1W', 0.00, 'BCA', '3262271835', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-10 05:16:25', '2026-01-10 05:33:28'),
(236, 233, 233, 'left', 'REF-7IWGZOZA', 'elly006', '2171076802739003', 'Elly Marlina', 'ellymarlina196@gmail.com', '082286784718', '$2y$12$PZCX9pka1Gd7olOBE2Ski.E6WAEdKHjHJc75hjr2rVsUqVIyQs10q', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-10 05:17:41', 'EW-20260110-3ZTX8', 0.00, 'BCA', '3262271835', NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-10 05:17:41', '2026-01-10 05:30:25'),
(238, 233, 233, 'right', 'REF-JLYKJARN', 'elly007', '2171076802739003', 'Elly Marlina', 'ellymarlina198@gmail.com', '082286784718', '$2y$12$HrbdUK3PC310CIgp3sckvua6bZcME87ye7qleoP211qSqYG7f0hmS', NULL, NULL, NULL, NULL, NULL, NULL, '2026-01-10 05:18:34', 'EW-20260110-H4D6U', 0.00, 'BCA', '3262271835', NULL, 2, NULL, NULL, 0, 0, 0, 0, 0, 0, 1500000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 50, NULL, 1, 3, '2026-01-10 05:18:34', '2026-01-10 05:29:35'),
(239, 91, 91, 'right', 'REF-8L7JNXNH', 'elly008', '2171076802739003', 'Elly Marlina', 'ellymarlina08@gmail.com', '082288312098', '$2y$12$dc.PSxVsajVgRkZFp/Y6AOY8U.pl2pKz8d/WHgFkuBdFjcrIsNX/2', 'perempuan', 'BATAM', NULL, NULL, NULL, NULL, '2026-01-10 05:39:33', 'EW-20260110-GTVON', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-10 05:39:33', '2026-01-10 05:41:57'),
(240, 55, NULL, NULL, 'REF-AIBB7SXL', 'furqon23', '5203192312900006', 'Lalu muhammad furqon', 'furqonolet@gmail.com', '081997633177', '$2y$12$Q7RnS0HlKkkITulMRYgfjO1JUZl9lLEkwdbEUzKwOa7TvytBF/3Z2', 'laki-laki', 'Tembok desa tanak kaken,kec.sakra barat,kab.lombok timur Nusa tenggara barat', NULL, NULL, NULL, NULL, '2026-01-10 19:35:24', 'EW-20260111-KO6LJ', 0.00, 'Bank syariah mandiri', '7218914033', NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-10 19:35:24', '2026-01-10 19:38:02'),
(241, 121, NULL, NULL, 'REF-6U47LSMO', 'atjeh', '1103032911920002', 'KHAIRULLAH', 'idriskhairul68@gmail.com', '+6282163557786', '$2y$12$POKQ0b252CzFOtRqEgNHp.aBlRtisobNi0zcP0o7WHXxJvo1TNPE2', 'laki-laki', 'Balee Gantung', NULL, NULL, NULL, NULL, '2026-01-11 22:04:03', 'EW-20260112-LVEWJ', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-11 22:04:03', '2026-01-11 22:04:03'),
(242, 62, NULL, NULL, 'REF-F7Z9S6AD', 'ketuazul10', '2171071005690001', 'Zulkarnain', 'ketuazulkarnain@gmail.com', '+6282288326144', '$2y$12$wJIGF92WRi/bCalJn4kGjuNdG3/u8EelyHQ/1P4O74zIbpkw2OOa6', 'laki-laki', 'Permata asri blok B1 no 2 RT03 RW07 Duriangkang sungai beduk Tanjung Piayu batam', NULL, NULL, NULL, NULL, '2026-01-12 00:08:12', 'EW-20260112-DPZYB', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-12 00:08:12', '2026-01-12 00:08:12');
INSERT INTO `customers` (`id`, `sponsor_id`, `upline_id`, `position`, `ref_code`, `username`, `nik`, `name`, `email`, `phone`, `password`, `gender`, `alamat`, `address`, `city_id`, `province_id`, `remember_token`, `email_verified_at`, `ewallet_id`, `ewallet_saldo`, `bank_name`, `bank_account`, `description`, `package_id`, `foot_left`, `foot_right`, `total_left`, `total_right`, `sponsor_left`, `sponsor_right`, `pv_left`, `pv_right`, `omzet`, `omzet_planb`, `omzet_group_left`, `omzet_group_right`, `omzet_pairing_left`, `omzet_pairing_right`, `omzet_group_left_plana`, `omzet_group_right_plana`, `omzet_group_left_planb`, `omzet_group_right_planb`, `level`, `is_stockist`, `stockist_kabupaten_id`, `stockist_kabupaten_name`, `stockist_province_id`, `stockist_province_name`, `daily_pairing`, `max_daily_pairing`, `last_pairing_date`, `network_generated`, `status`, `created_at`, `updated_at`) VALUES
(244, 162, 162, 'left', 'REF-9E7C2WLV', 'anam04', NULL, 'Khairil anam', 'libianiurfiia@gmail.com', '087863547617', '$2y$12$WpfoHN.Iq1woM.c2t7gRne4iDaoVMv5FitPvH8hsemFP.7UStiUca', 'laki-laki', 'Jenggik', NULL, NULL, NULL, NULL, '2026-01-12 00:55:39', 'EW-20260112-AD2C1', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 00:55:39', '2026-01-12 01:27:11'),
(245, 157, 157, 'right', 'REF-YTZSXJWR', 'anam05', NULL, 'Khairil anam', 'libianiurfiim@gmail.com', '087863547617', '$2y$12$D1KN0RA3cPjvZI3CcpX28.BiUbn1xPCGvDeP.DbVkkfAd2yr1ml9q', 'laki-laki', 'Jenggik', NULL, NULL, NULL, NULL, '2026-01-12 00:59:27', 'EW-20260112-AF78P', 0.00, NULL, NULL, NULL, 1, NULL, 246, 0, 3, 0, 1, 0, 0, 350000.00, 0.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 1, 3, '2026-01-12 00:59:27', '2026-01-12 02:26:59'),
(246, 245, 245, 'right', '64592DC5', 'Dewi01', NULL, 'Dewi Nur Sjamsuniah', 'dewi.nursjamsuniah@gmail.com', '081807434750', '$2y$12$4bJKzrwOkNdtNZUZQ/4.SeycmCF/K.Z0fT1yk7HgSQpZe/mO19JiO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260112-WSVGI', 0.00, NULL, NULL, NULL, 3, 257, 258, 1, 1, 1, 1, 0, 0, 0.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, 350000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-12', 0, 3, '2026-01-12 02:21:52', '2026-01-12 07:35:26'),
(247, 173, 249, 'left', 'REF-MMGTQODQ', 'rita01', '2171125405769006', 'Rita hartati', 'Ritateteh76@gmail.com', '081364618580', '$2y$12$swWk4ooLfVbPCGjsulTXXeDpWMq4kyhUUT1.m46PHgQlwIrqiVkw.', 'perempuan', NULL, NULL, NULL, NULL, NULL, '2026-01-12 03:15:41', 'EW-20260112-35LDU', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 03:15:41', '2026-01-12 05:11:58'),
(249, 175, 175, 'left', '70204BF1', 'Arya01', NULL, 'Arya Noera Prilingga', 'aryanoera65601@gmail.com', '087797563237', '$2y$12$DFZqmoVO1H8/U06IaQWToethQRV0B4M42ZyJLwO1fShDo8dBHEw6q', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260112-G5696', 0.00, NULL, NULL, NULL, 3, 247, NULL, 1, 0, 0, 0, 0, 0, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 100, '2026-01-12', 0, 3, '2026-01-12 05:09:52', '2026-01-12 05:11:58'),
(250, 193, 193, 'left', 'REF-7XNO8NVC', 'akbar02', NULL, 'Muhammad Khairul Aulia Syah Akbar', 'khairul02@gmail.com', '08566576504', '$2y$12$U9bJp4E4c2T5lwvFmQO6Aes.e/PqiDl2jw.u.x0sDR2aqS5CoOuxW', 'laki-laki', NULL, NULL, NULL, NULL, NULL, '2026-01-12 05:15:00', 'EW-20260112-N8NLB', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 05:15:00', '2026-01-12 05:23:59'),
(251, 193, 193, 'right', 'REF-JAWUBAF3', 'akbar03', NULL, 'Muhammad Khairul Aulia Syah Akbar', 'khairul003@gmail.com', '08566576504', '$2y$12$nDTMUBJZnOhphJnZVtMJ3exgAfmxIx31Q.tnMlhUy25K2CuwHcFmG', 'laki-laki', NULL, NULL, NULL, NULL, NULL, '2026-01-12 05:18:24', 'EW-20260112-SVF5I', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 05:18:24', '2026-01-12 05:24:06'),
(252, 53, NULL, NULL, '2D05DCAC', 'MTAQI01', NULL, 'MUHAMAD TAQIYUDDIN. SKM. MKES', 'taqiyuddin240718@gmail.com', '087730097012', '$2y$12$bp02DGCViKGnZ5ILKQ6SH.xrgmSkOn0Bbw9VF3LjLCN83SdW5UbfG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260112-DDY3W', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 2, '2026-01-12 05:29:47', '2026-01-12 05:29:47'),
(253, 52, 161, 'left', '9B1615A2', 'MuhTaqi01', NULL, 'MUHAMAD TAQIYUDDIN. SKM. MKES', '1taqiyuddin240718@gmail.com', '087730097012', '$2y$12$ipDB0vMzWR4pY0pqiEMh5uGYDTG7FIlfjakfYtBj8r7N60STwkDIy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260112-PONRU', 0.00, NULL, NULL, NULL, 3, 254, 255, 2, 1, 2, 1, 0, 0, 0.00, 0.00, 700000.00, 350000.00, 700000.00, 350000.00, 700000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, '2026-01-13', 0, 3, '2026-01-12 05:38:00', '2026-01-12 07:29:41'),
(254, 253, 253, 'left', 'REF-MTPZXMTK', 'muhtaqi02', NULL, 'Muhamad Taqiyuddin SKM.MKEs', 'taqiyuddinn240718@gmail.com', '087730097012', '$2y$12$6tWFTFHwFj8ef.tBK4H0POsHylYm6az1ednKA9ajRmkJ5PsAWFTgu', 'laki-laki', 'BTN renteng-pray', NULL, NULL, NULL, NULL, '2026-01-12 05:52:25', 'EW-20260112-YJNXS', 0.00, NULL, NULL, NULL, 1, 269, NULL, 1, 0, 0, 0, 0, 0, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-13', 1, 3, '2026-01-12 05:52:25', '2026-01-12 23:14:10'),
(255, 253, 253, 'right', 'REF-PTVD4JLF', 'muhtaqi03', NULL, 'Muhamad Taqiyuddin SKM.mkes', 'taqiyuddinnn240718@gmail.com', '087730097012', '$2y$12$eWSLS6G.KLluHCG01kR8/.6g0ER00RUh6mgUzvuei4NNA4SdRbgsG', 'laki-laki', 'BTN renteng-pray', NULL, NULL, NULL, NULL, '2026-01-12 05:59:03', 'EW-20260112-I1J9V', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 05:59:03', '2026-01-12 07:15:56'),
(256, 158, 158, 'right', 'REF-EAV2NUPS', 'hidayat03', NULL, 'Rudi Haryana Hidayat', 'sayamursidiiin@gmail.com', '081917472726', '$2y$12$qUKwx3XHQCFiPaF3jUhGEe1gWuo2Z66Ui2Sijl9laAbCnUN6wbaQy', 'laki-laki', 'Sepakek', NULL, NULL, NULL, NULL, '2026-01-12 06:07:45', 'EW-20260112-EM2UQ', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 06:07:45', '2026-01-12 07:05:55'),
(257, 246, 246, 'left', 'REF-I8AA8SQY', 'dewi02', NULL, 'Dewi Nur sjamsuniah', 'dewi.nursjamsuniahh@gmail.com', '081807434750', '$2y$12$sQIX5YPpJywxPrVKAmIiLOpQAEXWTa4nH/vzZzCJZAzNpeXuMFJ0G', 'perempuan', 'Jl.danau Singkarak', NULL, NULL, NULL, NULL, '2026-01-12 06:15:22', 'EW-20260112-C5VBY', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 06:15:22', '2026-01-12 06:35:07'),
(258, 246, 246, 'right', 'REF-GUGD2N36', 'dewi03', NULL, 'Dewi Nur sjamsuniah', 'dewi.nursjamsuniaah@gmail.com', '081807434750', '$2y$12$BezO7.ZVwecJqsnWCLydHeN9BE1MHQ3sCBw0jyy0z8B55PImnVE/O', 'perempuan', 'Jl.danau Singkarak', NULL, NULL, NULL, NULL, '2026-01-12 06:19:35', 'EW-20260112-MJ9K4', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 06:19:35', '2026-01-12 06:39:55'),
(259, 52, 61, 'right', 'REF-BQGITCLU', 'atang01', NULL, 'Atang Rahman', 'rahman.alfatih1453@gmail.com', '085237627779', '$2y$12$V6kJk.KATRKJE470S00Nk.G3xRXD7dlZdyZxoUUMSLDCsClELyIxi', 'laki-laki', 'Gunung agung', NULL, NULL, NULL, NULL, '2026-01-12 15:17:24', 'EW-20260112-DEAJZ', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 15:17:24', '2026-01-12 20:44:48'),
(261, 172, 172, 'left', 'REF-9U1QSQ1Z', 'amir628', NULL, 'Amir Hamdan', 'amirhamdann54629@gmail.com', '081997977782', '$2y$12$SeFADhzQuaer0g3vsCc.7.WJ0FRAERgn4zdxpRzyHWPbLC5l3/JmG', 'laki-laki', 'Sakra timur', NULL, NULL, NULL, NULL, '2026-01-12 15:30:41', 'EW-20260112-0ALTO', 0.00, NULL, NULL, NULL, 1, 267, NULL, 4, 0, 1, 0, 0, 0, 350000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 700000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-13', 1, 3, '2026-01-12 15:30:41', '2026-01-12 21:59:34'),
(262, 172, 172, 'right', 'REF-DT5VD7US', 'amir627', NULL, 'Amir Hamdan', 'amirhamdane54629@gmail.com', '081997977782', '$2y$12$MbRN6PHxjPX5FLbQmmMvCuISQv2s7rNtM7P87bsit9BNuSqJ/MekS', 'laki-laki', 'Sakra timur', NULL, NULL, NULL, NULL, '2026-01-12 15:36:03', 'EW-20260112-QRITM', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 15:36:03', '2026-01-12 20:39:05'),
(263, 52, NULL, NULL, 'REF-IGU7SPM5', 'ocied-84', '5202021607840002', 'Rosidi', 'ocied84pound@gmail.com', '087841917515', '$2y$12$mSu1F6NY7K.6y7r2aW/W8e1nw4NLABv7HXi9m.BKEqxJyA56UHtYe', 'laki-laki', 'Mentokok desa jelantik kecamatan jonggat kabupaten lombok tengah  propinsi  nusa tenggara barat', NULL, NULL, NULL, NULL, '2026-01-12 17:02:35', 'EW-20260113-81IE5', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-12 17:02:35', '2026-01-12 17:02:35'),
(264, 263, NULL, NULL, 'REF-KCRHU6LO', 'moel-123', '5202024601840003', 'Muliani', 'muliani060189@gmail.com', '087837996771', '$2y$12$8D3kFVV2ab2JDjex8bolo.JyM4Sbm4TtSmejA7eOuJFa.KeDdcgVy', 'perempuan', 'Mentokok Desa jelantik,kec jonggat,kab lombok tengah', NULL, NULL, NULL, NULL, '2026-01-12 18:30:33', 'EW-20260113-96MEW', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-12 18:30:33', '2026-01-12 18:30:33'),
(265, 160, 160, 'left', '7D8BEA4F', 'Syarif01', NULL, 'Syarif', 'mastengmaskot@gmail.com', '085237368620', '$2y$12$p6dPZKBJONe/G6mj0Ip.ceNlARnnneJ42MpoyfFoStlrXE1RkQCam', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260113-VK0PC', 0.00, NULL, NULL, NULL, 1, 266, NULL, 2, 0, 1, 0, 0, 0, 0.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 350000.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, '2026-01-13', 0, 3, '2026-01-12 20:51:16', '2026-01-12 22:39:01'),
(266, 265, 265, 'left', 'REF-FYVIJYQL', 'sayarif02', NULL, 'Syarif', 'Mastengmaskott@gmail.com', '085237368620', '$2y$12$/I/8SSXksZBqykYtRjc4b.QbjfubRuZmQMtxyqMt2RPd0sqD6qCqi', 'laki-laki', 'Dasan agung-mataram', NULL, NULL, NULL, NULL, '2026-01-12 20:59:46', 'EW-20260113-ETUJD', 0.00, NULL, NULL, NULL, 1, 274, NULL, 1, 0, 1, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 20:59:46', '2026-01-13 00:16:54'),
(267, 261, 261, 'left', '760934C3', 'Alhozani01', NULL, 'Alhozani', 'alhozaniiza@gmail.com', '081917800253', '$2y$12$Ng2.dNNJ0f/T3I/6rhL2Fuq6d3zJ/89QYgvQTOT/McT06D8TnFY4i', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260113-OZQ9T', 0.00, NULL, NULL, NULL, 1, 271, 272, 2, 1, 1, 1, 0, 0, 0.00, 0.00, 350000.00, 350000.00, 350000.00, 350000.00, 350000.00, 350000.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, '2026-01-13', 0, 3, '2026-01-12 21:59:01', '2026-01-12 23:20:28'),
(269, 253, 254, 'left', 'REF-VTBG2AZ7', 'muhtaqi04', NULL, 'Muhamad Taqiyuddin SKM.MKEs', 'taqiyuddinne240718@gmail.com', '087730097012', '$2y$12$EIWh0FDjNtU.B/25CNT2TeMi10bWnf/FHKBRyqTaUFBae1gy71aUm', 'laki-laki', 'BTN renteng-pray', NULL, NULL, NULL, NULL, '2026-01-12 22:03:26', 'EW-20260113-TKZ6Q', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 22:03:26', '2026-01-12 23:14:10'),
(271, 267, 267, 'left', 'REF-27WI9RQE', 'alhozani02', NULL, 'Alhozani', 'alhozaniizaa@gmail.com', '081917800253', '$2y$12$EjpS7kUU8gOsQp18ijKZEuhEIBbvo4WA3NGCkl4HaiggvZ.BS.ZOy', 'laki-laki', 'Sakra', NULL, NULL, NULL, NULL, '2026-01-12 22:29:45', 'EW-20260113-0KQOG', 0.00, NULL, NULL, NULL, 1, 275, NULL, 1, 0, 1, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 22:29:45', '2026-01-13 00:21:31'),
(272, 267, 267, 'right', 'REF-QNP1O5SO', 'alhozani03', NULL, 'Alhozani', 'alhozaniizaaa@gmail.com', '081917800253', '$2y$12$KcWqyZlhcYwsgz7o8hMweePu70No6xirQqxCrCsoAHmDQ8/wak0Ha', 'laki-laki', 'Sakra', NULL, NULL, NULL, NULL, '2026-01-12 22:31:30', 'EW-20260113-5O81R', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 350000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 15, NULL, 1, 3, '2026-01-12 22:31:30', '2026-01-12 23:20:28'),
(273, 86, NULL, NULL, 'REF-PTIVRBPD', 'iisnaeni06', NULL, 'Iisnaeni', 'iisnaenyazkaniken@gmail.com', '087838241300', '$2y$12$/1.bjuk9Ej5WuYJAZxIfvOTVaiXVWiDkl1BoZqDLmDS6wP.YI/ZVq', 'perempuan', 'Dusun kebonan 05 06 Yosowilangun lumajang', NULL, NULL, NULL, NULL, '2026-01-12 22:55:40', 'EW-20260113-SOINR', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 1, '2026-01-12 22:55:40', '2026-01-12 22:55:40'),
(274, 266, 266, 'left', '5A9FDC7D', 'RAHIM01', NULL, 'H.ABDURRAHIM', 'abdurrahimamin74@gmail.com', '085937087980', '$2y$12$yG7NoqR/U0YJ4DGvKpU5KeVTxQbUozqAMYYJygxZJTTnLDOdubUFu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260113-ACTUE', 0.00, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 3, '2026-01-13 00:16:23', '2026-01-13 00:18:23'),
(275, 271, 271, 'left', '44DA651F', 'Muradul01', NULL, 'MURADUL ASYIQIN', 'asyiqinmuradul@gmail.com', '087863471008', '$2y$12$6e5M6GJx49J8qpa7FTOiZuBXREGL4sY9/nddSMRKZZMdrx9aepNsu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'EW-20260113-E168F', 0.00, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, NULL, 0, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, 3, '2026-01-13 00:21:03', '2026-01-13 00:21:31');

--
-- Trigger `customers`
--
DELIMITER $$
CREATE TRIGGER `trg_update_status_after_omzet` BEFORE UPDATE ON `customers` FOR EACH ROW BEGIN
    IF NEW.omzet > 0 AND OLD.status = 1 THEN
        SET NEW.status = 2;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers_rewards`
--

CREATE TABLE `customers_rewards` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `reward_id` int(10) UNSIGNED NOT NULL,
  `reward` varchar(225) NOT NULL,
  `total_bv_achieved` decimal(15,2) NOT NULL DEFAULT 0.00,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_addresses`
--

CREATE TABLE `customer_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL COMMENT 'Primary key alamat customer',
  `customer_id` bigint(20) UNSIGNED NOT NULL COMMENT 'Relasi ke tabel customers sebagai pemilik alamat',
  `label` varchar(255) DEFAULT NULL COMMENT 'Label alamat, misalnya: Rumah, Kantor, dll',
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Menandakan apakah ini alamat utama (default) customer',
  `recipient_name` varchar(255) NOT NULL COMMENT 'Nama penerima barang pada alamat ini',
  `recipient_phone` varchar(255) NOT NULL COMMENT 'Nomor telepon penerima pada alamat ini',
  `address_line1` text NOT NULL COMMENT 'Detail utama alamat (jalan, blok, nomor rumah)',
  `address_line2` text DEFAULT NULL COMMENT 'Detail tambahan alamat (patokan, gedung, unit, dll)',
  `province_label` varchar(100) NOT NULL COMMENT 'Nama provinsi sesuai layanan ekspedisi / API',
  `province_id` int(11) NOT NULL COMMENT 'ID provinsi sesuai referensi / API pihak ketiga',
  `city_label` varchar(100) NOT NULL COMMENT 'Nama kota/kabupaten sesuai layanan ekspedisi / API',
  `city_id` int(11) NOT NULL COMMENT 'ID kota/kabupaten sesuai referensi / API pihak ketiga',
  `postal_code` varchar(255) DEFAULT NULL COMMENT 'Kode pos alamat penerima',
  `country` varchar(255) NOT NULL DEFAULT 'Indonesia' COMMENT 'Negara alamat, default Indonesia',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan mengenai alamat ini',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_addresses`
--

INSERT INTO `customer_addresses` (`id`, `customer_id`, `label`, `is_default`, `recipient_name`, `recipient_phone`, `address_line1`, `address_line2`, `province_label`, `province_id`, `city_label`, `city_id`, `postal_code`, `country`, `description`, `created_at`, `updated_at`) VALUES
(1, 21, 'Pick Up', 0, 'alan testing', '081212439564', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-22 02:27:17', '2025-12-22 02:27:17'),
(2, 80, NULL, 0, 'Nurhalimah', '082392460926', 'Perumahan citra Laguna tahap2 blok C11 no 8 RT 001 RW 023 Kel. Tembesi kec. Sagulung Batam kepri', NULL, 'KEPULAUAN RIAU', 8, 'BATAM', 90, '29432', 'Indonesia', NULL, '2025-12-26 18:27:33', '2025-12-26 18:27:33'),
(6, 25, 'Pick Up', 0, 'alan gentina', '085220206259', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 07:21:31', '2025-12-29 07:21:31'),
(7, 25, 'Pick Up', 0, 'alan gentina', '085220206259', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 16:43:41', '2025-12-29 16:43:41'),
(8, 25, 'Pick Up', 0, 'Eris Firgilius', '085220322999', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 17:20:11', '2025-12-29 17:20:11'),
(9, 25, 'Pick Up', 0, 'Eris Firgilius', '085220322999', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 17:29:56', '2025-12-29 17:29:56'),
(10, 25, 'Pick Up', 0, 'testing', '085220206259', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 17:43:55', '2025-12-29 17:43:55'),
(11, 25, 'Pick Up', 0, 'testing', '085220206259', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 17:44:52', '2025-12-29 17:44:52'),
(12, 25, 'Pick Up', 0, 'Eris Firgilius', '085220322999', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 17:55:30', '2025-12-29 17:55:30'),
(13, 117, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 19:05:53', '2025-12-29 19:05:53'),
(16, 25, 'Pick Up', 0, 'alan testing', '085220206259', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 19:32:54', '2025-12-29 19:32:54'),
(17, 25, 'Pick Up', 0, 'Eris Firgilius', '085220322999', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 19:41:12', '2025-12-29 19:41:12'),
(18, 117, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-29 23:11:47', '2025-12-29 23:11:47'),
(19, 117, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 01:22:27', '2025-12-30 01:22:27'),
(20, 119, 'Pick Up', 0, 'Yasminar', '081364748637', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 03:33:59', '2025-12-30 03:33:59'),
(21, 120, 'Pick Up', 0, 'epi', '081364223004', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 04:10:03', '2025-12-30 04:10:03'),
(22, 163, 'Pick Up', 0, 'epi', '081364223004', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 07:37:08', '2025-12-30 07:37:08'),
(23, 165, 'Pick Up', 0, 'mis adi', '081364223002', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 08:36:01', '2025-12-30 08:36:01'),
(24, 166, 'Pick Up', 0, 'ema', '082283767382', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 08:57:58', '2025-12-30 08:57:58'),
(25, 167, 'Pick Up', 0, 'mei mona', '081345318095', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 09:26:44', '2025-12-30 09:26:44'),
(26, 169, 'Pick Up', 0, 'mei mona', '081345318095', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 09:45:17', '2025-12-30 09:45:17'),
(27, 168, 'Pick Up', 0, 'meimona', '081345318095', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 09:56:15', '2025-12-30 09:56:15'),
(28, 170, 'Pick Up', 0, 'radian', '081345318095', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 10:12:02', '2025-12-30 10:12:02'),
(29, 171, 'Pick Up', 0, 'radian', '081364600483', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-30 10:26:10', '2025-12-30 10:26:10'),
(30, 173, 'Pick Up', 0, 'Yasminar', '081364748637', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 05:52:00', '2025-12-31 05:52:00'),
(31, 176, 'Pick Up', 0, 'Apriyan Syafri', '081364948124', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 06:44:20', '2025-12-31 06:44:20'),
(32, 177, 'Pick Up', 0, 'Tirtaningsih', '085355460530', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 06:55:04', '2025-12-31 06:55:04'),
(33, 178, 'Pick Up', 0, 'Tirtaningsih', '085355460530', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 07:21:00', '2025-12-31 07:21:00'),
(34, 179, 'Pick Up', 0, 'Tirtaningsih', '085355460530', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 07:24:45', '2025-12-31 07:24:45'),
(35, 182, 'Pick Up', 0, 'Tirtaningsih', '085355460530', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 07:32:08', '2025-12-31 07:32:08'),
(36, 183, 'Pick Up', 0, 'YASMINAR', '081364748637', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 07:40:39', '2025-12-31 07:40:39'),
(37, 184, 'Pick Up', 0, 'YASMINAR', '081364748637', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2025-12-31 07:43:27', '2025-12-31 07:43:27'),
(38, 121, 'Pick Up', 0, 'Nurhalimah', '082392460926', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 02:18:53', '2026-01-02 02:18:53'),
(39, 118, 'Pick Up', 0, 'ALFI', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 03:59:41', '2026-01-02 03:59:41'),
(40, 188, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:05:51', '2026-01-02 04:05:51'),
(41, 142, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:11:53', '2026-01-02 04:11:53'),
(42, 189, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:21:32', '2026-01-02 04:21:32'),
(43, 190, 'Pick Up', 0, 'Darman', '082392245200', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:30:20', '2026-01-02 04:30:20'),
(44, 192, 'Pick Up', 0, 'Darman', '082392245200', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:38:23', '2026-01-02 04:38:23'),
(45, 191, 'Pick Up', 0, 'Darman', '082392245200', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 04:39:51', '2026-01-02 04:39:51'),
(46, 123, 'Pick Up', 0, 'DINA', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 05:38:57', '2026-01-02 05:38:57'),
(47, 195, 'Pick Up', 0, 'DINA', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 05:45:41', '2026-01-02 05:45:41'),
(48, 196, 'Pick Up', 0, 'DINA', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 05:56:03', '2026-01-02 05:56:03'),
(49, 194, 'Pick Up', 0, 'DINA', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 06:02:02', '2026-01-02 06:02:02'),
(50, 150, 'Pick Up', 0, 'DINA', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-02 06:11:30', '2026-01-02 06:11:30'),
(51, 197, 'Pick Up', 0, 'DINA', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 03:15:21', '2026-01-03 03:15:21'),
(52, 198, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 03:35:30', '2026-01-03 03:35:30'),
(53, 199, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 03:41:59', '2026-01-03 03:41:59'),
(54, 201, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 03:49:22', '2026-01-03 03:49:22'),
(55, 202, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 03:58:58', '2026-01-03 03:58:58'),
(56, 204, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:05:10', '2026-01-03 04:05:10'),
(57, 203, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:06:04', '2026-01-03 04:06:04'),
(58, 205, 'Pick Up', 0, 'SYARIFAH', '082287328399', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:11:44', '2026-01-03 04:11:44'),
(59, 206, 'Pick Up', 0, 'DEDY SUKMANA', '081346338886', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:24:33', '2026-01-03 04:24:33'),
(60, 207, 'Pick Up', 0, 'KASANAH', '082283034407', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:35:35', '2026-01-03 04:35:35'),
(61, 210, 'Pick Up', 0, 'KASANAH', '082283034407', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:44:49', '2026-01-03 04:44:49'),
(62, 208, 'Pick Up', 0, 'KASANAH', '082283034407', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:45:54', '2026-01-03 04:45:54'),
(63, 211, 'Pick Up', 0, 'BANIAH', '082288421778', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:51:30', '2026-01-03 04:51:30'),
(64, 213, 'Pick Up', 0, 'BANIAH', '082288421778', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:55:18', '2026-01-03 04:55:18'),
(65, 212, 'Pick Up', 0, 'BANIAH', '082288421778', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 04:56:25', '2026-01-03 04:56:25'),
(66, 214, 'Pick Up', 0, 'TINA', '082169066557', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 05:00:36', '2026-01-03 05:00:36'),
(67, 217, 'Pick Up', 0, 'TINA', '082169066557', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 05:04:36', '2026-01-03 05:04:36'),
(68, 216, 'Pick Up', 0, 'TINA', '082169066557', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-03 05:05:26', '2026-01-03 05:05:26'),
(69, 146, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 00:50:45', '2026-01-05 00:50:45'),
(70, 222, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 01:28:52', '2026-01-05 01:28:52'),
(71, 220, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 01:30:03', '2026-01-05 01:30:03'),
(72, 221, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 01:31:57', '2026-01-05 01:31:57'),
(73, 223, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 01:58:17', '2026-01-05 01:58:17'),
(74, 224, 'Pick Up', 0, 'HERLINA', '085355458769', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-05 02:15:27', '2026-01-05 02:15:27'),
(77, 226, 'Pick Up', 0, 'Lisnawati', '081267093045', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-07 04:28:17', '2026-01-07 04:28:17'),
(78, 227, 'Pick Up', 0, 'Ali', '081277301249', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-07 06:30:09', '2026-01-07 06:30:09'),
(79, 143, 'Pick Up', 0, 'REVA', '082287488893', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-07 22:37:56', '2026-01-07 22:37:56'),
(80, 42, 'Alamat Pengiriman', 0, 'Ferry Yulianto', '081287027779', 'Jl. Haji Ilyas No. 32 RT. 8/2 Petukangan Utara Pesanggrahan', NULL, 'DKI JAKARTA', 10, 'JAKARTA SELATAN', 136, '12260', 'Indonesia', NULL, '2026-01-08 01:45:13', '2026-01-08 01:45:13'),
(81, 229, 'Pick Up', 0, 'Lisma', '082169549269', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-08 01:58:47', '2026-01-08 01:58:47'),
(82, 231, 'Pick Up', 0, 'Lisma', '082169549269', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-08 02:08:12', '2026-01-08 02:08:12'),
(83, 93, 'Pick Up', 0, 'DINA', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-08 02:21:42', '2026-01-08 02:21:42'),
(85, 29, 'Pick Up', 0, 'ZAKY', '081312000697', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 01:08:47', '2026-01-10 01:08:47'),
(86, 233, 'Pick Up', 0, 'ELLY', '082286784718', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 04:51:20', '2026-01-10 04:51:20'),
(87, 238, 'Pick Up', 0, 'ELLY', '082286784718', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 05:23:25', '2026-01-10 05:23:25'),
(88, 236, 'Pick Up', 0, 'ELLY', '082286784718', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 05:25:14', '2026-01-10 05:25:14'),
(89, 235, 'Pick Up', 0, 'ELLY', '082286784718', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 05:26:38', '2026-01-10 05:26:38'),
(90, 239, 'Pick Up', 0, 'ELLY', '082288312098', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-10 05:41:26', '2026-01-10 05:41:26'),
(91, 240, 'Tembok desa tanak kaken kecamatan sakra barat kabupaten lombok timur nusa tenggara barat', 0, 'Lalu muhammad furqon', '081997633177', 'Jalan raya keruak', 'Samping SPBU tanak kaken', 'NUSA TENGGARA BARAT (NTB)', 1, 'LOMBOK TIMUR', 5, '83671', 'Indonesia', NULL, '2026-01-10 19:40:34', '2026-01-10 19:40:34'),
(92, 93, 'Pick Up', 0, 'dina', '081234050137', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-11 18:10:16', '2026-01-11 18:10:16'),
(93, 157, 'Pick Up', 0, 'Khiril anam', '087863547617', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 00:39:47', '2026-01-12 00:39:47'),
(94, 162, 'Pick Up', 0, 'Khiril anam', '087863547617', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 00:42:09', '2026-01-12 00:42:09'),
(95, 161, 'Pick Up', 0, 'Moh Junaidi', '081909276224', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 01:22:34', '2026-01-12 01:22:34'),
(96, 244, 'Pick Up', 0, 'Khairil anam', '087863547617', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 01:25:13', '2026-01-12 01:25:13'),
(97, 245, 'Pick Up', 0, 'Khairil anam', '087863547617', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 01:30:57', '2026-01-12 01:30:57'),
(100, 247, 'Pick Up', 0, 'Yasminar', '081364748637', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 05:04:47', '2026-01-12 05:04:47'),
(101, 251, 'Pick Up', 0, 'Alfi Kasanah', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 05:22:31', '2026-01-12 05:22:31'),
(102, 250, 'Pick Up', 0, 'ALFI', '082289355375', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 05:23:31', '2026-01-12 05:23:31'),
(104, 257, 'Pick Up', 0, 'Dewi Nur sjamsuniah', '081807434750', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 06:33:56', '2026-01-12 06:33:56'),
(105, 258, 'Pick Up', 0, 'Dewi Nur sjamsuniah', '081807434750', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 06:38:57', '2026-01-12 06:38:57'),
(106, 256, 'Pick Up', 0, 'Rudi Haryana Hidayat', '081917472726', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 07:05:05', '2026-01-12 07:05:05'),
(107, 160, 'Pick Up', 0, 'Rudi Haryana Hidayat', '081917472726', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 07:07:51', '2026-01-12 07:07:51'),
(108, 254, 'Pick Up', 0, 'Muhamad Taqiyuddin', '087730097012', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 07:12:21', '2026-01-12 07:12:21'),
(109, 255, 'Pick Up', 0, 'Muhamad Taqiyuddin', '087730097012', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 07:14:46', '2026-01-12 07:14:46'),
(110, 262, 'Pick Up', 0, 'Amir Hamdan', '081997977782', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 20:36:00', '2026-01-12 20:36:00'),
(111, 261, 'Pick Up', 0, 'Amir Hamdan', '081997977782', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 20:37:58', '2026-01-12 20:37:58'),
(112, 259, 'Pick Up', 0, 'Atang Rahman', '085237627779', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 20:42:35', '2026-01-12 20:42:35'),
(113, 266, 'Pick Up', 0, 'Syarif', '085237368620', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 22:38:03', '2026-01-12 22:38:03'),
(114, 24, 'Alamat Pengiriman', 0, 'Tumbur Siahaan', '081277171566', 'Komplek union sejahtera blok c no 26 kec tanjung buntung Batam (kepulauan riau)', NULL, 'KEPULAUAN RIAU', 8, 'BATAM', 90, '29432', 'Indonesia', NULL, '2026-01-12 22:57:21', '2026-01-12 22:57:21'),
(115, 269, 'Pick Up', 0, 'Muhamad Taqiyuddin', '087730097012', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 23:13:10', '2026-01-12 23:13:10'),
(116, 271, 'Pick Up', 0, 'Alhozani', '081917800523', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 23:17:48', '2026-01-12 23:17:48'),
(117, 272, 'Pick Up', 0, 'Alhozani', '087863547617', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 23:19:25', '2026-01-12 23:19:25'),
(118, 86, 'Pick Up', 0, 'Gjurgj', '35747', 'PICKUP - Ambil di tempat', NULL, '-', 0, '-', 0, '-', 'Indonesia', NULL, '2026-01-12 23:31:12', '2026-01-12 23:31:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonuses`
--

CREATE TABLE `customer_bonuses` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key bonus customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member penerima bonus',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus kotor yang diterima sebelum perhitungan pajak',
  `index_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai index/point yang berkaitan dengan bonus ini',
  `tax_netto` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus bersih setelah pajak (netto)',
  `tax_percent` int(11) NOT NULL DEFAULT 0 COMMENT 'Persentase pajak yang dikenakan terhadap bonus',
  `tax_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal pajak yang dipotong dari bonus',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status bonus: 0 = pending, 1 = sudah dibayarkan / dirilis',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait bonus customer',
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_bonuses`
--

INSERT INTO `customer_bonuses` (`id`, `member_id`, `amount`, `index_value`, `tax_netto`, `tax_percent`, `tax_value`, `status`, `description`, `date`, `created_at`, `updated_at`) VALUES
(1, 64, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(2, 74, 390000.00, 0.00, 195000.00, 5, -9750.00, 0, NULL, '2026-01-05', NULL, NULL),
(3, 75, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(4, 76, 220000.00, 0.00, 110000.00, 5, -5500.00, 0, NULL, '2026-01-05', NULL, NULL),
(5, 77, 210000.00, 0.00, 105000.00, 5, -5250.00, 0, NULL, '2026-01-05', NULL, NULL),
(6, 78, 70000.00, 0.00, 35000.00, 5, -1750.00, 0, NULL, '2026-01-05', NULL, NULL),
(7, 80, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(8, 86, 280000.00, 0.00, 140000.00, 5, -7000.00, 0, NULL, '2026-01-05', NULL, NULL),
(9, 87, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(10, 89, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(11, 92, 378000.00, 0.00, 189000.00, 5, -9450.00, 0, NULL, '2026-01-05', NULL, NULL),
(12, 93, 70000.00, 0.00, 35000.00, 5, -1750.00, 0, NULL, '2026-01-05', NULL, NULL),
(13, 94, 70000.00, 0.00, 35000.00, 5, -1750.00, 0, NULL, '2026-01-05', NULL, NULL),
(14, 117, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(15, 118, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(16, 119, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(17, 120, 100000.00, 0.00, 50000.00, 5, -2500.00, 0, NULL, '2026-01-05', NULL, NULL),
(18, 123, 258000.00, 0.00, 129000.00, 5, -6450.00, 0, NULL, '2026-01-05', NULL, NULL),
(19, 146, 140000.00, 0.00, 70000.00, 5, -3500.00, 0, NULL, '2026-01-05', NULL, NULL),
(20, 163, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(21, 164, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(22, 165, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(23, 167, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(24, 170, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(25, 174, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(26, 176, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(27, 177, 70000.00, 0.00, 35000.00, 5, -1750.00, 0, NULL, '2026-01-05', NULL, NULL),
(28, 178, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(29, 180, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(30, 190, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(31, 194, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(32, 198, 400000.00, 0.00, 200000.00, 5, -10000.00, 0, NULL, '2026-01-05', NULL, NULL),
(33, 199, 70000.00, 0.00, 35000.00, 5, -1750.00, 0, NULL, '2026-01-05', NULL, NULL),
(34, 200, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(35, 202, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(36, 203, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(37, 207, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(38, 208, 100000.00, 0.00, 50000.00, 5, -2500.00, 0, NULL, '2026-01-05', NULL, NULL),
(39, 211, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(40, 214, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(41, 220, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL),
(42, 222, 50000.00, 0.00, 25000.00, 5, -1250.00, 0, NULL, '2026-01-05', NULL, NULL),
(43, 82, 120000.00, 0.00, 60000.00, 5, -3000.00, 0, NULL, '2026-01-05', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_cashbacks`
--

CREATE TABLE `customer_bonus_cashbacks` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `index_value` decimal(15,2) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=released',
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_bonus_cashbacks`
--

INSERT INTO `customer_bonus_cashbacks` (`id`, `member_id`, `order_id`, `amount`, `index_value`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 93, 77, 100000.00, 0.00, 0, 'Cashback Plan B - Order#77', '2026-01-08 09:21:42', NULL),
(2, 93, 85, 150000.00, 0.00, 0, 'Cashback Plan B - Order#85', '2026-01-12 01:10:16', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_lifetime_cash_rewards`
--

CREATE TABLE `customer_bonus_lifetime_cash_rewards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL COMMENT 'Member penerima lifetime cash reward',
  `reward_name` varchar(255) NOT NULL COMMENT 'Nama reward (e.g., Silver, Gold, Platinum)',
  `reward` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai reward target',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal yang diterima',
  `bv` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Business Volume yang dibutuhkan',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status: 0 = pending, 1 = released',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_matchings`
--

CREATE TABLE `customer_bonus_matchings` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key bonus matching customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member penerima bonus matching',
  `from_member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member sumber/asal omset yang memicu bonus matching',
  `level` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Level kedalaman dari member sumber terhadap penerima bonus',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus matching yang diterima',
  `index_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai index/point yang berkaitan dengan bonus matching ini',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status bonus matching: 0 = pending, 1 = sudah dibayarkan / dirilis',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait bonus matching',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_pairings`
--

CREATE TABLE `customer_bonus_pairings` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key bonus pairing customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member penerima bonus pairing',
  `source_member_id` int(10) UNSIGNED NOT NULL,
  `pairing_count` int(11) NOT NULL DEFAULT 0 COMMENT 'Jumlah pasangan (pair) yang tercapai dalam periode tertentu',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus pairing yang diterima',
  `index_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai index/point yang berkaitan dengan bonus pairing ini',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status bonus pairing: 0 = pending, 1 = sudah dibayarkan / dirilis',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait bonus pairing',
  `pairing_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_bonus_pairings`
--

INSERT INTO `customer_bonus_pairings` (`id`, `member_id`, `source_member_id`, `pairing_count`, `amount`, `index_value`, `status`, `description`, `pairing_date`, `created_at`, `updated_at`) VALUES
(1, 74, 117, 4, 80000.00, 0.00, 1, NULL, '2025-12-30', '2025-12-30 01:22:27', NULL),
(2, 77, 119, 1, 20000.00, 0.00, 1, NULL, '2025-12-30', '2025-12-30 03:33:59', NULL),
(3, 86, 120, 1, 20000.00, 0.00, 1, NULL, '2025-12-30', '2025-12-30 04:10:03', NULL),
(4, 167, 168, 1, 20000.00, 0.00, 1, NULL, '2025-12-30', '2025-12-30 09:56:15', NULL),
(5, 77, 173, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 05:52:00', NULL),
(6, 77, 176, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 06:44:20', NULL),
(7, 77, 177, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 06:55:04', NULL),
(8, 77, 178, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:21:00', NULL),
(9, 77, 179, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:24:45', NULL),
(10, 177, 182, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:32:08', NULL),
(11, 77, 182, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:32:08', NULL),
(12, 119, 183, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:40:39', NULL),
(13, 77, 183, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:40:39', NULL),
(14, 78, 184, 1, 20000.00, 0.00, 1, NULL, '2025-12-31', '2025-12-31 07:43:27', NULL),
(15, 80, 121, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 02:18:53', NULL),
(16, 74, 118, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 03:59:41', NULL),
(17, 117, 188, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:05:51', NULL),
(18, 74, 188, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:05:51', NULL),
(19, 75, 142, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:11:53', NULL),
(20, 76, 189, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:21:32', NULL),
(21, 74, 190, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:30:20', NULL),
(22, 74, 192, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:38:23', NULL),
(23, 190, 191, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:39:51', NULL),
(24, 74, 191, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 04:39:51', NULL),
(25, 86, 123, 3, 60000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 05:38:57', NULL),
(26, 86, 195, 3, 60000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 05:45:41', NULL),
(27, 92, 196, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 05:56:03', NULL),
(28, 86, 196, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 05:56:03', NULL),
(29, 123, 194, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 06:02:02', NULL),
(30, 86, 194, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 06:02:02', NULL),
(31, 93, 150, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 06:11:30', NULL),
(32, 92, 150, 1, 20000.00, 0.00, 1, NULL, '2026-01-02', '2026-01-02 06:11:30', NULL),
(33, 123, 197, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:15:21', NULL),
(34, 94, 198, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:35:30', NULL),
(35, 92, 198, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:35:30', NULL),
(36, 92, 199, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:41:59', NULL),
(37, 92, 201, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:49:22', NULL),
(38, 198, 202, 2, 40000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:58:58', NULL),
(39, 92, 202, 3, 60000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 03:58:58', NULL),
(40, 202, 203, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:06:04', NULL),
(41, 199, 206, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:24:33', NULL),
(42, 198, 206, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:24:33', NULL),
(43, 198, 207, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:35:35', NULL),
(44, 198, 210, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:44:49', NULL),
(45, 207, 208, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:45:54', NULL),
(46, 198, 208, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:45:54', NULL),
(47, 198, 211, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:51:30', NULL),
(48, 211, 212, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 04:56:25', NULL),
(49, 214, 216, 1, 20000.00, 0.00, 1, NULL, '2026-01-03', '2026-01-03 05:05:26', NULL),
(50, 82, 146, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 00:50:45', NULL),
(51, 82, 222, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:28:52', NULL),
(52, 146, 220, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:30:03', NULL),
(53, 82, 220, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:30:03', NULL),
(54, 82, 221, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:31:57', NULL),
(55, 220, 223, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:58:17', NULL),
(56, 82, 223, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 01:58:17', NULL),
(57, 146, 224, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 02:15:27', NULL),
(58, 82, 224, 1, 20000.00, 0.00, 1, NULL, '2026-01-05', '2026-01-05 02:15:27', NULL),
(59, 74, 226, 1, 20000.00, 0.00, 0, NULL, '2026-01-07', '2026-01-07 11:29:06', NULL),
(60, 190, 227, 1, 20000.00, 0.00, 0, NULL, '2026-01-07', '2026-01-07 13:35:35', NULL),
(61, 74, 227, 1, 20000.00, 0.00, 0, NULL, '2026-01-07', '2026-01-07 13:35:35', NULL),
(62, 80, 143, 1, 20000.00, 0.00, 0, NULL, '2026-01-08', '2026-01-08 05:39:32', NULL),
(63, 200, 203, 1, 20000.00, 0.00, 0, NULL, '2026-01-08', '2026-01-08 04:06:04', NULL),
(64, 89, 233, 4, 80000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 11:52:24', NULL),
(65, 89, 236, 1, 20000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 12:25:43', NULL),
(66, 233, 238, 1, 20000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 12:25:50', NULL),
(67, 89, 238, 4, 80000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 12:25:50', NULL),
(68, 90, 235, 1, 20000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 12:27:10', NULL),
(69, 91, 239, 1, 20000.00, 0.00, 0, NULL, '2026-01-10', '2026-01-10 12:41:57', NULL),
(70, 24, 162, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 07:45:12', NULL),
(71, 129, 157, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 07:46:05', NULL),
(72, 24, 157, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 07:46:05', NULL),
(73, 53, 161, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 08:23:34', NULL),
(74, 24, 161, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 08:23:34', NULL),
(75, 24, 244, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 08:27:12', NULL),
(76, 129, 245, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 08:31:53', NULL),
(77, 24, 245, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 08:31:53', NULL),
(78, 173, 247, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 12:11:58', NULL),
(79, 77, 247, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 12:11:58', NULL),
(80, 191, 250, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 12:23:59', NULL),
(81, 74, 250, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 12:23:59', NULL),
(82, 74, 251, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 12:24:06', NULL),
(83, 24, 257, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 13:35:07', NULL),
(84, 24, 258, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 13:39:55', NULL),
(85, 52, 256, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:05:55', NULL),
(86, 24, 256, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:05:55', NULL),
(87, 52, 160, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:08:36', NULL),
(88, 24, 160, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:08:36', NULL),
(89, 246, 258, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 06:19:35', NULL),
(90, 53, 254, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:39', NULL),
(91, 24, 254, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:39', NULL),
(92, 53, 255, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:56', NULL),
(93, 24, 255, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:56', NULL),
(94, 193, 251, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:56', NULL),
(95, 158, 256, 1, 20000.00, 0.00, 0, NULL, '2026-01-12', '2026-01-12 14:15:56', NULL),
(96, 60, 261, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:38:46', NULL),
(97, 52, 261, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:38:46', NULL),
(98, 24, 261, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:38:46', NULL),
(99, 172, 262, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:39:05', NULL),
(100, 60, 262, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:39:05', NULL),
(101, 52, 262, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:39:05', NULL),
(102, 24, 262, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:39:05', NULL),
(103, 54, 259, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:44:49', NULL),
(104, 52, 259, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:44:49', NULL),
(105, 24, 259, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 03:44:49', NULL),
(106, 52, 266, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 05:39:01', NULL),
(107, 24, 266, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 05:39:01', NULL),
(108, 53, 269, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:14:10', NULL),
(109, 24, 269, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:14:10', NULL),
(110, 60, 271, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:20:14', NULL),
(111, 52, 271, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:20:14', NULL),
(112, 24, 271, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:20:14', NULL),
(113, 52, 272, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:20:29', NULL),
(114, 24, 272, 1, 20000.00, 0.00, 0, NULL, '2026-01-13', '2026-01-13 06:20:29', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_retails`
--

CREATE TABLE `customer_bonus_retails` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key bonus retail customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member penerima bonus retail',
  `from_member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member yang memicu bonus retail',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus retail yang diterima',
  `index_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai index/point yang berkaitan dengan bonus retail ini',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status bonus retail: 0 = pending, 1 = sudah dibayarkan / dirilis',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait bonus retail',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_bonus_retails`
--

INSERT INTO `customer_bonus_retails` (`id`, `member_id`, `from_member_id`, `amount`, `index_value`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 92, 93, 50000.00, 0.00, 0, 'Retail Plan B - Order#77', '2026-01-08 09:32:42', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_rewards`
--

CREATE TABLE `customer_bonus_rewards` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `reward_type` varchar(255) DEFAULT NULL COMMENT 'promotion, lifetime',
  `reward` varchar(225) NOT NULL,
  `bv` decimal(15,2) NOT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `index_value` decimal(15,2) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=released',
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bonus_sponsors`
--

CREATE TABLE `customer_bonus_sponsors` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key bonus sponsor customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member penerima bonus sponsor',
  `from_member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member yang direkrut (downline) yang memicu bonus sponsor',
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nominal bonus sponsor yang diterima',
  `index_value` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Nilai index/point yang berkaitan dengan bonus sponsor ini',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT 'Status bonus sponsor: 0 = pending, 1 = sudah dibayarkan / dirilis',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait bonus sponsor',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_bonus_sponsors`
--

INSERT INTO `customer_bonus_sponsors` (`id`, `member_id`, `from_member_id`, `amount`, `index_value`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 74, 117, 210000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 09:03:38', NULL),
(2, 77, 119, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 11:01:02', NULL),
(3, 86, 120, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 11:38:54', NULL),
(4, 120, 163, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 14:41:57', NULL),
(5, 164, 165, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 15:39:20', NULL),
(6, 165, 166, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 16:00:10', NULL),
(7, 120, 167, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 16:28:44', NULL),
(8, 167, 169, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 16:49:07', NULL),
(9, 167, 168, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 16:57:37', NULL),
(10, 163, 170, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 17:21:48', NULL),
(11, 170, 171, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-30 17:30:20', NULL),
(12, 119, 173, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 12:55:33', NULL),
(13, 174, 176, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 13:46:07', NULL),
(14, 176, 177, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 13:55:34', NULL),
(15, 177, 178, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 14:21:43', NULL),
(16, 178, 179, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 14:25:24', NULL),
(17, 180, 182, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 14:32:54', NULL),
(18, 119, 183, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-31 14:44:50', NULL),
(19, 80, 121, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 09:20:46', NULL),
(20, 117, 118, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:00:17', NULL),
(21, 117, 188, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:06:34', NULL),
(22, 75, 142, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:12:48', NULL),
(23, 76, 189, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:22:50', NULL),
(24, 118, 190, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:32:05', NULL),
(25, 190, 191, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:41:06', NULL),
(26, 190, 192, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 11:41:16', NULL),
(27, 92, 123, 168000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 12:39:32', NULL),
(28, 123, 195, 168000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 12:47:04', NULL),
(29, 93, 196, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 12:56:50', NULL),
(30, 94, 150, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-02 13:12:05', NULL),
(31, 123, 194, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 05:08:05', NULL),
(32, 194, 197, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 10:16:46', NULL),
(33, 76, 198, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 10:36:45', NULL),
(34, 198, 199, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 10:43:18', NULL),
(35, 199, 201, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 10:49:57', NULL),
(36, 198, 202, 210000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 10:59:28', NULL),
(37, 202, 204, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:06:38', NULL),
(38, 202, 203, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:06:45', NULL),
(39, 203, 205, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:12:08', NULL),
(40, 200, 206, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:25:07', NULL),
(41, 76, 207, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:36:43', NULL),
(42, 207, 208, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:46:59', NULL),
(43, 207, 210, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:47:04', NULL),
(44, 208, 211, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:51:57', NULL),
(45, 211, 212, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:56:50', NULL),
(46, 211, 213, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 11:56:56', NULL),
(47, 208, 214, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 12:01:09', NULL),
(48, 214, 216, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 12:07:56', NULL),
(49, 214, 217, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-03 12:08:02', NULL),
(50, 78, 184, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 07:37:04', NULL),
(51, 76, 146, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 07:51:43', NULL),
(52, 146, 222, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 08:30:44', NULL),
(53, 146, 220, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 08:30:50', NULL),
(54, 220, 221, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 08:32:56', NULL),
(55, 220, 223, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 08:58:46', NULL),
(56, 222, 224, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2026-01-05 09:15:55', NULL),
(57, 86, 88, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(58, 64, 89, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(59, 89, 90, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(60, 87, 92, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(61, 92, 93, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(62, 75, 80, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(63, 80, 81, 50000.00, 0.00, 1, 'Sponsor Plan A - Placement', '2025-12-18 17:00:02', NULL),
(64, 192, 226, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-07 11:29:06', NULL),
(65, 117, 227, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-07 13:35:35', NULL),
(66, 80, 143, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-08 05:39:32', NULL),
(67, 200, 229, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-08 09:01:12', NULL),
(68, 229, 231, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-08 09:08:50', NULL),
(69, 89, 233, 210000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-10 11:52:24', NULL),
(70, 233, 236, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-10 12:25:43', NULL),
(71, 233, 238, 210000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-10 12:25:50', NULL),
(72, 90, 235, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-10 12:27:10', NULL),
(73, 91, 239, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-10 12:41:57', NULL),
(74, 129, 162, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 07:45:12', NULL),
(75, 129, 157, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 07:46:05', NULL),
(76, 128, 161, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 08:23:34', NULL),
(77, 162, 244, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 08:27:12', NULL),
(78, 157, 245, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 08:31:53', NULL),
(79, 173, 247, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 12:11:58', NULL),
(80, 193, 250, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 12:23:59', NULL),
(81, 193, 251, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 12:24:06', NULL),
(82, 246, 257, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 13:35:07', NULL),
(83, 246, 258, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 13:39:55', NULL),
(84, 158, 256, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 14:05:55', NULL),
(85, 158, 160, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 14:08:36', NULL),
(86, 253, 254, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 14:15:39', NULL),
(87, 253, 255, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-12 14:15:56', NULL),
(88, 172, 261, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 03:38:46', NULL),
(89, 172, 262, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 03:39:05', NULL),
(90, 52, 259, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 03:44:49', NULL),
(91, 265, 266, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 05:39:01', NULL),
(92, 253, 269, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 06:14:10', NULL),
(93, 267, 271, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 06:20:14', NULL),
(94, 267, 272, 50000.00, 0.00, 0, 'Sponsor Plan A - Placement', '2026-01-13 06:20:29', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_bv_rewards`
--

CREATE TABLE `customer_bv_rewards` (
  `id` int(10) UNSIGNED NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `reward_id` int(10) UNSIGNED NOT NULL,
  `omzet_left` decimal(15,2) NOT NULL DEFAULT 0.00,
  `omzet_right` decimal(15,2) NOT NULL DEFAULT 0.00,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data untuk tabel `customer_bv_rewards`
--

INSERT INTO `customer_bv_rewards` (`id`, `member_id`, `reward_id`, `omzet_left`, `omzet_right`, `status`, `created_on`) VALUES
(1, 74, 1, 30000000.00, 3500000.00, 0, '2026-01-09 11:20:30'),
(2, 74, 3, 30000000.00, 3500000.00, 0, '2026-01-09 11:20:30'),
(3, 74, 4, 30000000.00, 3500000.00, 0, '2026-01-09 11:20:30'),
(4, 73, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(5, 73, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(6, 73, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(7, 72, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(8, 72, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(9, 72, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(10, 71, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(11, 71, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(12, 71, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(13, 70, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(14, 70, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(15, 70, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(16, 69, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(17, 69, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(18, 69, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(19, 68, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(20, 68, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(21, 68, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(22, 67, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(23, 67, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(24, 67, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(25, 66, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(26, 66, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(27, 66, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(28, 65, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(29, 65, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(30, 65, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(31, 64, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(32, 64, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(33, 64, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(34, 63, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(35, 63, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(36, 63, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(37, 62, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(38, 62, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(39, 62, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(40, 38, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(41, 38, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(42, 38, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(43, 37, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(44, 37, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(45, 37, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(46, 36, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(47, 36, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(48, 36, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(49, 26, 1, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(50, 26, 3, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(51, 26, 4, 33500000.00, 0.00, 0, '2026-01-09 11:20:30'),
(52, 24, 1, 6300000.00, 33500000.00, 0, '2026-01-09 11:20:30'),
(53, 24, 3, 6300000.00, 33500000.00, 0, '2026-01-09 11:20:30'),
(54, 24, 4, 6300000.00, 33500000.00, 0, '2026-01-09 11:20:30'),
(55, 23, 1, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(56, 23, 3, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(57, 23, 4, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(58, 22, 1, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(59, 22, 3, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(60, 22, 4, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(61, 19, 1, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(62, 19, 3, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(63, 19, 4, 39800000.00, 0.00, 0, '2026-01-09 11:20:30'),
(64, 75, 1, 29300000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(65, 75, 3, 29300000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(66, 75, 4, 29300000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(67, 77, 1, 25450000.00, 3150000.00, 0, '2026-01-09 11:20:30'),
(68, 77, 3, 25450000.00, 3150000.00, 0, '2026-01-09 11:20:30'),
(69, 77, 4, 25450000.00, 3150000.00, 0, '2026-01-09 11:20:30'),
(70, 76, 1, 28600000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(71, 76, 3, 28600000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(72, 76, 4, 28600000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(73, 78, 1, 24750000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(74, 78, 3, 24750000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(75, 78, 4, 24750000.00, 350000.00, 0, '2026-01-09 11:20:30'),
(76, 86, 1, 17750000.00, 3150000.00, 0, '2026-01-09 11:20:31'),
(77, 86, 3, 17750000.00, 3150000.00, 0, '2026-01-09 11:20:31'),
(78, 86, 4, 17750000.00, 3150000.00, 0, '2026-01-09 11:20:31'),
(79, 85, 1, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(80, 85, 3, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(81, 85, 4, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(82, 84, 1, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(83, 84, 3, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(84, 84, 4, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(85, 83, 1, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(86, 83, 3, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(87, 83, 4, 20900000.00, 0.00, 0, '2026-01-09 11:20:31'),
(88, 82, 1, 20900000.00, 2100000.00, 0, '2026-01-09 11:20:31'),
(89, 82, 3, 20900000.00, 2100000.00, 0, '2026-01-09 11:20:31'),
(90, 82, 4, 20900000.00, 2100000.00, 0, '2026-01-09 11:20:31'),
(91, 81, 1, 23000000.00, 0.00, 0, '2026-01-09 11:20:31'),
(92, 81, 3, 23000000.00, 0.00, 0, '2026-01-09 11:20:31'),
(93, 81, 4, 23000000.00, 0.00, 0, '2026-01-09 11:20:31'),
(94, 80, 1, 23350000.00, 700000.00, 0, '2026-01-09 11:20:31'),
(95, 80, 3, 23350000.00, 700000.00, 0, '2026-01-09 11:20:31'),
(96, 80, 4, 23350000.00, 700000.00, 0, '2026-01-09 11:20:31'),
(97, 79, 1, 24400000.00, 0.00, 0, '2026-01-09 11:20:31'),
(98, 79, 3, 24400000.00, 0.00, 0, '2026-01-09 11:20:31'),
(99, 79, 4, 24400000.00, 0.00, 0, '2026-01-09 11:20:31'),
(100, 120, 1, 0.00, 2800000.00, 0, '2026-01-09 11:20:32'),
(101, 120, 3, 0.00, 2800000.00, 0, '2026-01-09 11:20:32'),
(102, 120, 4, 0.00, 2800000.00, 0, '2026-01-09 11:20:32'),
(103, 164, 1, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(104, 164, 3, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(105, 164, 4, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(106, 163, 1, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(107, 163, 3, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(108, 163, 4, 0.00, 2450000.00, 0, '2026-01-09 11:20:32'),
(109, 165, 1, 0.00, 2100000.00, 0, '2026-01-09 11:20:32'),
(110, 165, 3, 0.00, 2100000.00, 0, '2026-01-09 11:20:32'),
(111, 165, 4, 0.00, 2100000.00, 0, '2026-01-09 11:20:32'),
(112, 166, 1, 0.00, 1750000.00, 0, '2026-01-09 11:20:33'),
(113, 166, 3, 0.00, 1750000.00, 0, '2026-01-09 11:20:33'),
(114, 166, 4, 0.00, 1750000.00, 0, '2026-01-09 11:20:33'),
(115, 167, 1, 350000.00, 1050000.00, 0, '2026-01-09 11:20:33'),
(116, 167, 3, 350000.00, 1050000.00, 0, '2026-01-09 11:20:33'),
(117, 167, 4, 350000.00, 1050000.00, 0, '2026-01-09 11:20:33'),
(118, 169, 1, 0.00, 700000.00, 0, '2026-01-09 11:20:34'),
(119, 169, 3, 0.00, 700000.00, 0, '2026-01-09 11:20:34'),
(120, 169, 4, 0.00, 700000.00, 0, '2026-01-09 11:20:34'),
(121, 170, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:34'),
(122, 170, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:34'),
(123, 170, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:34'),
(124, 119, 1, 350000.00, 2450000.00, 0, '2026-01-09 11:20:34'),
(125, 119, 3, 350000.00, 2450000.00, 0, '2026-01-09 11:20:34'),
(126, 119, 4, 350000.00, 2450000.00, 0, '2026-01-09 11:20:34'),
(127, 174, 1, 0.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(128, 174, 3, 0.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(129, 174, 4, 0.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(130, 173, 1, 350000.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(131, 173, 3, 350000.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(132, 173, 4, 350000.00, 1750000.00, 0, '2026-01-09 11:20:35'),
(133, 176, 1, 0.00, 1400000.00, 0, '2026-01-09 11:20:35'),
(134, 176, 3, 0.00, 1400000.00, 0, '2026-01-09 11:20:35'),
(135, 176, 4, 0.00, 1400000.00, 0, '2026-01-09 11:20:35'),
(136, 177, 1, 350000.00, 700000.00, 0, '2026-01-09 11:20:35'),
(137, 177, 3, 350000.00, 700000.00, 0, '2026-01-09 11:20:35'),
(138, 177, 4, 350000.00, 700000.00, 0, '2026-01-09 11:20:35'),
(139, 178, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:35'),
(140, 178, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:35'),
(141, 178, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:35'),
(142, 180, 1, 350000.00, 0.00, 0, '2026-01-09 11:20:36'),
(143, 180, 3, 350000.00, 0.00, 0, '2026-01-09 11:20:36'),
(144, 180, 4, 350000.00, 0.00, 0, '2026-01-09 11:20:36'),
(145, 117, 1, 350000.00, 2800000.00, 0, '2026-01-09 11:20:37'),
(146, 117, 3, 350000.00, 2800000.00, 0, '2026-01-09 11:20:37'),
(147, 117, 4, 350000.00, 2800000.00, 0, '2026-01-09 11:20:37'),
(148, 118, 1, 0.00, 2450000.00, 0, '2026-01-09 11:20:38'),
(149, 118, 3, 0.00, 2450000.00, 0, '2026-01-09 11:20:38'),
(150, 118, 4, 0.00, 2450000.00, 0, '2026-01-09 11:20:38'),
(151, 190, 1, 700000.00, 1400000.00, 0, '2026-01-09 11:20:38'),
(152, 190, 3, 700000.00, 1400000.00, 0, '2026-01-09 11:20:38'),
(153, 190, 4, 700000.00, 1400000.00, 0, '2026-01-09 11:20:38'),
(154, 92, 1, 8850000.00, 3100000.00, 0, '2026-01-09 11:20:39'),
(155, 92, 3, 8850000.00, 3100000.00, 0, '2026-01-09 11:20:39'),
(156, 92, 4, 8850000.00, 3100000.00, 0, '2026-01-09 11:20:39'),
(157, 114, 1, 12300000.00, 0.00, 0, '2026-01-09 11:20:39'),
(158, 114, 3, 12300000.00, 0.00, 0, '2026-01-09 11:20:39'),
(159, 114, 4, 12300000.00, 0.00, 0, '2026-01-09 11:20:39'),
(160, 91, 1, 12300000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(161, 91, 3, 12300000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(162, 91, 4, 12300000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(163, 90, 1, 12650000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(164, 90, 3, 12650000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(165, 90, 4, 12650000.00, 350000.00, 0, '2026-01-09 11:20:39'),
(166, 89, 1, 13350000.00, 3350000.00, 0, '2026-01-09 11:20:39'),
(167, 89, 3, 13350000.00, 3350000.00, 0, '2026-01-09 11:20:39'),
(168, 89, 4, 13350000.00, 3350000.00, 0, '2026-01-09 11:20:39'),
(169, 113, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(170, 113, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(171, 113, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(172, 112, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(173, 112, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(174, 112, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(175, 111, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(176, 111, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(177, 111, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(178, 110, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(179, 110, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(180, 110, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(181, 109, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(182, 109, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(183, 109, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(184, 108, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(185, 108, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(186, 108, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(187, 107, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(188, 107, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(189, 107, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(190, 106, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(191, 106, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(192, 106, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(193, 105, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(194, 105, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(195, 105, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(196, 88, 1, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(197, 88, 3, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(198, 88, 4, 17050000.00, 0.00, 0, '2026-01-09 11:20:39'),
(199, 87, 1, 17400000.00, 0.00, 0, '2026-01-09 11:20:39'),
(200, 87, 3, 17400000.00, 0.00, 0, '2026-01-09 11:20:39'),
(201, 87, 4, 17400000.00, 0.00, 0, '2026-01-09 11:20:39'),
(202, 123, 1, 1200000.00, 700000.00, 0, '2026-01-09 11:20:39'),
(203, 123, 3, 1200000.00, 700000.00, 0, '2026-01-09 11:20:39'),
(204, 123, 4, 1200000.00, 700000.00, 0, '2026-01-09 11:20:39'),
(205, 93, 1, 8150000.00, 350000.00, 0, '2026-01-09 11:20:40'),
(206, 93, 3, 8150000.00, 350000.00, 0, '2026-01-09 11:20:40'),
(207, 93, 4, 8150000.00, 350000.00, 0, '2026-01-09 11:20:40'),
(208, 94, 1, 7800000.00, 350000.00, 0, '2026-01-09 11:20:41'),
(209, 94, 3, 7800000.00, 350000.00, 0, '2026-01-09 11:20:41'),
(210, 94, 4, 7800000.00, 350000.00, 0, '2026-01-09 11:20:41'),
(211, 194, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:41'),
(212, 194, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:41'),
(213, 194, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:41'),
(214, 198, 1, 4900000.00, 2550000.00, 0, '2026-01-09 11:20:42'),
(215, 198, 3, 4900000.00, 2550000.00, 0, '2026-01-09 11:20:42'),
(216, 198, 4, 4900000.00, 2550000.00, 0, '2026-01-09 11:20:42'),
(217, 199, 1, 4200000.00, 350000.00, 0, '2026-01-09 11:20:43'),
(218, 199, 3, 4200000.00, 350000.00, 0, '2026-01-09 11:20:43'),
(219, 199, 4, 4200000.00, 350000.00, 0, '2026-01-09 11:20:43'),
(220, 202, 1, 350000.00, 700000.00, 0, '2026-01-09 11:20:44'),
(221, 202, 3, 350000.00, 700000.00, 0, '2026-01-09 11:20:44'),
(222, 202, 4, 350000.00, 700000.00, 0, '2026-01-09 11:20:44'),
(223, 203, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:45'),
(224, 203, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:45'),
(225, 203, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:45'),
(226, 200, 1, 3850000.00, 350000.00, 0, '2026-01-09 11:20:46'),
(227, 200, 3, 3850000.00, 350000.00, 0, '2026-01-09 11:20:46'),
(228, 200, 4, 3850000.00, 350000.00, 0, '2026-01-09 11:20:46'),
(229, 207, 1, 3150000.00, 350000.00, 0, '2026-01-09 11:20:47'),
(230, 207, 3, 3150000.00, 350000.00, 0, '2026-01-09 11:20:47'),
(231, 207, 4, 3150000.00, 350000.00, 0, '2026-01-09 11:20:47'),
(232, 208, 1, 2800000.00, 0.00, 0, '2026-01-09 11:20:48'),
(233, 208, 3, 2800000.00, 0.00, 0, '2026-01-09 11:20:48'),
(234, 208, 4, 2800000.00, 0.00, 0, '2026-01-09 11:20:48'),
(235, 211, 1, 2100000.00, 350000.00, 0, '2026-01-09 11:20:48'),
(236, 211, 3, 2100000.00, 350000.00, 0, '2026-01-09 11:20:48'),
(237, 211, 4, 2100000.00, 350000.00, 0, '2026-01-09 11:20:48'),
(238, 212, 1, 1750000.00, 0.00, 0, '2026-01-09 11:20:50'),
(239, 212, 3, 1750000.00, 0.00, 0, '2026-01-09 11:20:50'),
(240, 212, 4, 1750000.00, 0.00, 0, '2026-01-09 11:20:50'),
(241, 214, 1, 1050000.00, 350000.00, 0, '2026-01-09 11:20:50'),
(242, 214, 3, 1050000.00, 350000.00, 0, '2026-01-09 11:20:50'),
(243, 214, 4, 1050000.00, 350000.00, 0, '2026-01-09 11:20:50'),
(244, 146, 1, 1050000.00, 700000.00, 0, '2026-01-09 11:20:51'),
(245, 146, 3, 1050000.00, 700000.00, 0, '2026-01-09 11:20:51'),
(246, 146, 4, 1050000.00, 700000.00, 0, '2026-01-09 11:20:51'),
(247, 220, 1, 350000.00, 350000.00, 0, '2026-01-09 11:20:52'),
(248, 220, 3, 350000.00, 350000.00, 0, '2026-01-09 11:20:52'),
(249, 220, 4, 350000.00, 350000.00, 0, '2026-01-09 11:20:52'),
(250, 222, 1, 350000.00, 0.00, 0, '2026-01-09 11:20:53'),
(251, 222, 3, 350000.00, 0.00, 0, '2026-01-09 11:20:53'),
(252, 222, 4, 350000.00, 0.00, 0, '2026-01-09 11:20:53'),
(253, 192, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:55'),
(254, 192, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:55'),
(255, 192, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:55'),
(256, 191, 1, 350000.00, 700000.00, 0, '2026-01-09 11:20:56'),
(257, 191, 3, 350000.00, 700000.00, 0, '2026-01-09 11:20:56'),
(258, 191, 4, 350000.00, 700000.00, 0, '2026-01-09 11:20:56'),
(259, 121, 1, 0.00, 350000.00, 0, '2026-01-09 11:20:56'),
(260, 121, 3, 0.00, 350000.00, 0, '2026-01-09 11:20:56'),
(261, 121, 4, 0.00, 350000.00, 0, '2026-01-09 11:20:56'),
(262, 216, 1, 700000.00, 0.00, 0, '2026-01-09 11:20:56'),
(263, 216, 3, 700000.00, 0.00, 0, '2026-01-09 11:20:56'),
(264, 216, 4, 700000.00, 0.00, 0, '2026-01-09 11:20:56'),
(265, 229, 1, 350000.00, 0.00, 0, '2026-01-09 11:20:57'),
(266, 229, 3, 350000.00, 0.00, 0, '2026-01-09 11:20:57'),
(267, 229, 4, 350000.00, 0.00, 0, '2026-01-09 11:20:57'),
(268, 233, 1, 350000.00, 1500000.00, 0, '2026-01-10 19:25:43'),
(269, 233, 3, 350000.00, 1500000.00, 0, '2026-01-10 19:25:43'),
(270, 233, 4, 350000.00, 1500000.00, 0, '2026-01-10 19:25:43'),
(271, 129, 1, 700000.00, 1400000.00, 0, '2026-01-12 14:45:12'),
(272, 129, 3, 700000.00, 1400000.00, 0, '2026-01-12 14:45:12'),
(273, 129, 4, 700000.00, 1400000.00, 0, '2026-01-12 14:45:12'),
(274, 53, 1, 1400000.00, 2100000.00, 0, '2026-01-12 14:45:12'),
(275, 53, 3, 1400000.00, 2100000.00, 0, '2026-01-12 14:45:12'),
(276, 53, 4, 1400000.00, 2100000.00, 0, '2026-01-12 14:45:12'),
(277, 52, 1, 3500000.00, 2800000.00, 0, '2026-01-12 14:45:12'),
(278, 52, 3, 3500000.00, 2800000.00, 0, '2026-01-12 14:45:12'),
(279, 52, 4, 3500000.00, 2800000.00, 0, '2026-01-12 14:45:12'),
(280, 50, 1, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(281, 50, 3, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(282, 50, 4, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(283, 49, 1, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(284, 49, 3, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(285, 49, 4, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(286, 35, 1, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(287, 35, 3, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(288, 35, 4, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(289, 34, 1, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(290, 34, 3, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(291, 34, 4, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(292, 33, 1, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(293, 33, 3, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(294, 33, 4, 6300000.00, 0.00, 0, '2026-01-12 14:45:12'),
(295, 25, 1, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(296, 25, 3, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(297, 25, 4, 0.00, 6300000.00, 0, '2026-01-12 14:45:12'),
(298, 128, 1, 1400000.00, 0.00, 0, '2026-01-12 15:23:33'),
(299, 128, 3, 1400000.00, 0.00, 0, '2026-01-12 15:23:33'),
(300, 128, 4, 1400000.00, 0.00, 0, '2026-01-12 15:23:33'),
(301, 162, 1, 350000.00, 0.00, 0, '2026-01-12 15:27:12'),
(302, 162, 3, 350000.00, 0.00, 0, '2026-01-12 15:27:12'),
(303, 162, 4, 350000.00, 0.00, 0, '2026-01-12 15:27:12'),
(304, 157, 1, 0.00, 1050000.00, 0, '2026-01-12 15:31:52'),
(305, 157, 3, 0.00, 1050000.00, 0, '2026-01-12 15:31:52'),
(306, 157, 4, 0.00, 1050000.00, 0, '2026-01-12 15:31:52'),
(307, 249, 1, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(308, 249, 3, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(309, 249, 4, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(310, 175, 1, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(311, 175, 3, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(312, 175, 4, 350000.00, 0.00, 0, '2026-01-12 19:11:58'),
(313, 193, 1, 350000.00, 350000.00, 0, '2026-01-12 19:23:59'),
(314, 193, 3, 350000.00, 350000.00, 0, '2026-01-12 19:23:59'),
(315, 193, 4, 350000.00, 350000.00, 0, '2026-01-12 19:23:59'),
(316, 246, 1, 350000.00, 350000.00, 0, '2026-01-12 20:35:07'),
(317, 246, 3, 350000.00, 350000.00, 0, '2026-01-12 20:35:07'),
(318, 246, 4, 350000.00, 350000.00, 0, '2026-01-12 20:35:07'),
(319, 245, 1, 0.00, 700000.00, 0, '2026-01-12 20:35:07'),
(320, 245, 3, 0.00, 700000.00, 0, '2026-01-12 20:35:07'),
(321, 245, 4, 0.00, 700000.00, 0, '2026-01-12 20:35:07'),
(322, 158, 1, 700000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(323, 158, 3, 700000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(324, 158, 4, 700000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(325, 60, 1, 1050000.00, 1400000.00, 0, '2026-01-12 21:05:55'),
(326, 60, 3, 1050000.00, 1400000.00, 0, '2026-01-12 21:05:55'),
(327, 60, 4, 1050000.00, 1400000.00, 0, '2026-01-12 21:05:55'),
(328, 54, 1, 2450000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(329, 54, 3, 2450000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(330, 54, 4, 2450000.00, 350000.00, 0, '2026-01-12 21:05:55'),
(331, 253, 1, 700000.00, 350000.00, 0, '2026-01-12 21:15:39'),
(332, 253, 3, 700000.00, 350000.00, 0, '2026-01-12 21:15:39'),
(333, 253, 4, 700000.00, 350000.00, 0, '2026-01-12 21:15:39'),
(334, 161, 1, 1050000.00, 0.00, 0, '2026-01-12 21:15:39'),
(335, 161, 3, 1050000.00, 0.00, 0, '2026-01-12 21:15:39'),
(336, 161, 4, 1050000.00, 0.00, 0, '2026-01-12 21:15:39'),
(337, 172, 1, 1050000.00, 350000.00, 0, '2026-01-13 10:38:46'),
(338, 172, 3, 1050000.00, 350000.00, 0, '2026-01-13 10:38:46'),
(339, 172, 4, 1050000.00, 350000.00, 0, '2026-01-13 10:38:46'),
(340, 61, 1, 0.00, 350000.00, 0, '2026-01-13 10:44:48'),
(341, 61, 3, 0.00, 350000.00, 0, '2026-01-13 10:44:48'),
(342, 61, 4, 0.00, 350000.00, 0, '2026-01-13 10:44:48'),
(343, 265, 1, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(344, 265, 3, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(345, 265, 4, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(346, 160, 1, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(347, 160, 3, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(348, 160, 4, 350000.00, 0.00, 0, '2026-01-13 12:39:01'),
(349, 254, 1, 350000.00, 0.00, 0, '2026-01-13 13:14:10'),
(350, 254, 3, 350000.00, 0.00, 0, '2026-01-13 13:14:10'),
(351, 254, 4, 350000.00, 0.00, 0, '2026-01-13 13:14:10'),
(352, 267, 1, 350000.00, 350000.00, 0, '2026-01-13 13:20:14'),
(353, 267, 3, 350000.00, 350000.00, 0, '2026-01-13 13:20:14'),
(354, 267, 4, 350000.00, 350000.00, 0, '2026-01-13 13:20:14'),
(355, 261, 1, 700000.00, 0.00, 0, '2026-01-13 13:20:14'),
(356, 261, 3, 700000.00, 0.00, 0, '2026-01-13 13:20:14'),
(357, 261, 4, 700000.00, 0.00, 0, '2026-01-13 13:20:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_networks`
--

CREATE TABLE `customer_networks` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key jaringan customer (binary tree)',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member/downline yang berada di jaringan',
  `upline_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Upline yang menaungi member ini dalam struktur jaringan',
  `position` enum('left','right') NOT NULL DEFAULT 'left' COMMENT 'Posisi member dalam binary tree: left atau right',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Status aktif jaringan: true = aktif, false = tidak aktif',
  `level` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Level kedalaman member dari upline di struktur jaringan',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan mengenai posisi jaringan member',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_networks`
--

INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(1, 22, 19, 'left', 1, 1, NULL, '2025-12-22 13:58:12', NULL),
(2, 23, 22, 'left', 1, 1, NULL, '2025-12-22 13:59:18', NULL),
(3, 23, 19, 'left', 1, 2, NULL, '2025-12-22 13:59:18', NULL),
(4, 24, 23, 'left', 1, 1, NULL, '2025-12-22 14:02:27', NULL),
(5, 24, 22, 'left', 1, 2, NULL, '2025-12-22 14:02:27', NULL),
(6, 24, 19, 'left', 1, 3, NULL, '2025-12-22 14:02:27', NULL),
(7, 27, 23, 'right', 1, 1, NULL, '2025-12-22 14:04:22', NULL),
(8, 27, 22, 'left', 1, 2, NULL, '2025-12-22 14:04:22', NULL),
(9, 27, 19, 'left', 1, 3, NULL, '2025-12-22 14:04:22', NULL),
(10, 25, 24, 'left', 1, 1, NULL, '2025-12-22 14:08:05', NULL),
(11, 25, 23, 'left', 1, 2, NULL, '2025-12-22 14:08:05', NULL),
(12, 25, 22, 'left', 1, 3, NULL, '2025-12-22 14:08:05', NULL),
(13, 25, 19, 'left', 1, 4, NULL, '2025-12-22 14:08:05', NULL),
(14, 26, 24, 'right', 1, 1, NULL, '2025-12-22 14:08:24', NULL),
(15, 26, 23, 'left', 1, 2, NULL, '2025-12-22 14:08:24', NULL),
(16, 26, 22, 'left', 1, 3, NULL, '2025-12-22 14:08:24', NULL),
(17, 26, 19, 'left', 1, 4, NULL, '2025-12-22 14:08:24', NULL),
(18, 28, 27, 'left', 1, 1, NULL, '2025-12-22 14:09:57', NULL),
(19, 28, 23, 'right', 1, 2, NULL, '2025-12-22 14:09:57', NULL),
(20, 28, 22, 'left', 1, 3, NULL, '2025-12-22 14:09:57', NULL),
(21, 28, 19, 'left', 1, 4, NULL, '2025-12-22 14:09:57', NULL),
(22, 29, 27, 'right', 1, 1, NULL, '2025-12-22 14:10:04', NULL),
(23, 29, 23, 'right', 1, 2, NULL, '2025-12-22 14:10:04', NULL),
(24, 29, 22, 'left', 1, 3, NULL, '2025-12-22 14:10:04', NULL),
(25, 29, 19, 'left', 1, 4, NULL, '2025-12-22 14:10:04', NULL),
(26, 30, 25, 'left', 1, 1, NULL, '2025-12-22 14:15:30', NULL),
(27, 30, 24, 'left', 1, 2, NULL, '2025-12-22 14:15:30', NULL),
(28, 30, 23, 'left', 1, 3, NULL, '2025-12-22 14:15:30', NULL),
(29, 30, 22, 'left', 1, 4, NULL, '2025-12-22 14:15:30', NULL),
(30, 30, 19, 'left', 1, 5, NULL, '2025-12-22 14:15:30', NULL),
(31, 33, 25, 'right', 1, 1, NULL, '2025-12-22 14:15:40', NULL),
(32, 33, 24, 'left', 1, 2, NULL, '2025-12-22 14:15:40', NULL),
(33, 33, 23, 'left', 1, 3, NULL, '2025-12-22 14:15:40', NULL),
(34, 33, 22, 'left', 1, 4, NULL, '2025-12-22 14:15:40', NULL),
(35, 33, 19, 'left', 1, 5, NULL, '2025-12-22 14:15:40', NULL),
(36, 31, 30, 'left', 1, 1, NULL, '2025-12-22 14:30:17', NULL),
(37, 31, 25, 'left', 1, 2, NULL, '2025-12-22 14:30:17', NULL),
(38, 31, 24, 'left', 1, 3, NULL, '2025-12-22 14:30:17', NULL),
(39, 31, 23, 'left', 1, 4, NULL, '2025-12-22 14:30:17', NULL),
(40, 31, 22, 'left', 1, 5, NULL, '2025-12-22 14:30:17', NULL),
(41, 31, 19, 'left', 1, 6, NULL, '2025-12-22 14:30:17', NULL),
(42, 34, 33, 'left', 1, 1, NULL, '2025-12-22 14:32:04', NULL),
(43, 34, 25, 'right', 1, 2, NULL, '2025-12-22 14:32:04', NULL),
(44, 34, 24, 'left', 1, 3, NULL, '2025-12-22 14:32:04', NULL),
(45, 34, 23, 'left', 1, 4, NULL, '2025-12-22 14:32:04', NULL),
(46, 34, 22, 'left', 1, 5, NULL, '2025-12-22 14:32:04', NULL),
(47, 34, 19, 'left', 1, 6, NULL, '2025-12-22 14:32:04', NULL),
(48, 32, 31, 'left', 1, 1, NULL, '2025-12-22 14:33:48', NULL),
(49, 32, 30, 'left', 1, 2, NULL, '2025-12-22 14:33:48', NULL),
(50, 32, 25, 'left', 1, 3, NULL, '2025-12-22 14:33:48', NULL),
(51, 32, 24, 'left', 1, 4, NULL, '2025-12-22 14:33:48', NULL),
(52, 32, 23, 'left', 1, 5, NULL, '2025-12-22 14:33:48', NULL),
(53, 32, 22, 'left', 1, 6, NULL, '2025-12-22 14:33:48', NULL),
(54, 32, 19, 'left', 1, 7, NULL, '2025-12-22 14:33:48', NULL),
(55, 35, 34, 'left', 1, 1, NULL, '2025-12-22 14:35:07', NULL),
(56, 35, 33, 'left', 1, 2, NULL, '2025-12-22 14:35:07', NULL),
(57, 35, 25, 'right', 1, 3, NULL, '2025-12-22 14:35:07', NULL),
(58, 35, 24, 'left', 1, 4, NULL, '2025-12-22 14:35:07', NULL),
(59, 35, 23, 'left', 1, 5, NULL, '2025-12-22 14:35:07', NULL),
(60, 35, 22, 'left', 1, 6, NULL, '2025-12-22 14:35:07', NULL),
(61, 35, 19, 'left', 1, 7, NULL, '2025-12-22 14:35:07', NULL),
(62, 36, 26, 'left', 1, 1, NULL, '2025-12-23 07:31:06', NULL),
(63, 36, 24, 'right', 1, 2, NULL, '2025-12-23 07:31:06', NULL),
(64, 36, 23, 'left', 1, 3, NULL, '2025-12-23 07:31:06', NULL),
(65, 36, 22, 'left', 1, 4, NULL, '2025-12-23 07:31:06', NULL),
(66, 36, 19, 'left', 1, 5, NULL, '2025-12-23 07:31:06', NULL),
(67, 39, 26, 'right', 1, 1, NULL, '2025-12-23 09:17:34', NULL),
(68, 39, 24, 'right', 1, 2, NULL, '2025-12-23 09:17:34', NULL),
(69, 39, 23, 'left', 1, 3, NULL, '2025-12-23 09:17:34', NULL),
(70, 39, 22, 'left', 1, 4, NULL, '2025-12-23 09:17:34', NULL),
(71, 39, 19, 'left', 1, 5, NULL, '2025-12-23 09:17:34', NULL),
(72, 37, 36, 'left', 1, 1, NULL, '2025-12-23 09:37:55', NULL),
(73, 37, 26, 'left', 1, 2, NULL, '2025-12-23 09:37:55', NULL),
(74, 37, 24, 'right', 1, 3, NULL, '2025-12-23 09:37:55', NULL),
(75, 37, 23, 'left', 1, 4, NULL, '2025-12-23 09:37:55', NULL),
(76, 37, 22, 'left', 1, 5, NULL, '2025-12-23 09:37:55', NULL),
(77, 37, 19, 'left', 1, 6, NULL, '2025-12-23 09:37:55', NULL),
(78, 38, 37, 'left', 1, 1, NULL, '2025-12-23 09:38:40', NULL),
(79, 38, 36, 'left', 1, 2, NULL, '2025-12-23 09:38:40', NULL),
(80, 38, 26, 'left', 1, 3, NULL, '2025-12-23 09:38:40', NULL),
(81, 38, 24, 'right', 1, 4, NULL, '2025-12-23 09:38:40', NULL),
(82, 38, 23, 'left', 1, 5, NULL, '2025-12-23 09:38:40', NULL),
(83, 38, 22, 'left', 1, 6, NULL, '2025-12-23 09:38:40', NULL),
(84, 38, 19, 'left', 1, 7, NULL, '2025-12-23 09:38:40', NULL),
(85, 40, 39, 'left', 1, 1, NULL, '2025-12-23 09:39:27', NULL),
(86, 40, 26, 'right', 1, 2, NULL, '2025-12-23 09:39:27', NULL),
(87, 40, 24, 'right', 1, 3, NULL, '2025-12-23 09:39:27', NULL),
(88, 40, 23, 'left', 1, 4, NULL, '2025-12-23 09:39:27', NULL),
(89, 40, 22, 'left', 1, 5, NULL, '2025-12-23 09:39:27', NULL),
(90, 40, 19, 'left', 1, 6, NULL, '2025-12-23 09:39:27', NULL),
(91, 41, 40, 'left', 1, 1, NULL, '2025-12-23 09:39:59', NULL),
(92, 41, 39, 'left', 1, 2, NULL, '2025-12-23 09:39:59', NULL),
(93, 41, 26, 'right', 1, 3, NULL, '2025-12-23 09:39:59', NULL),
(94, 41, 24, 'right', 1, 4, NULL, '2025-12-23 09:39:59', NULL),
(95, 41, 23, 'left', 1, 5, NULL, '2025-12-23 09:39:59', NULL),
(96, 41, 22, 'left', 1, 6, NULL, '2025-12-23 09:39:59', NULL),
(97, 41, 19, 'left', 1, 7, NULL, '2025-12-23 09:39:59', NULL),
(98, 42, 32, 'left', 1, 1, NULL, '2025-12-23 10:09:36', NULL),
(99, 42, 31, 'left', 1, 2, NULL, '2025-12-23 10:09:36', NULL),
(100, 42, 30, 'left', 1, 3, NULL, '2025-12-23 10:09:36', NULL),
(101, 42, 25, 'left', 1, 4, NULL, '2025-12-23 10:09:36', NULL),
(102, 42, 24, 'left', 1, 5, NULL, '2025-12-23 10:09:36', NULL),
(103, 42, 23, 'left', 1, 6, NULL, '2025-12-23 10:09:36', NULL),
(104, 42, 22, 'left', 1, 7, NULL, '2025-12-23 10:09:36', NULL),
(105, 42, 19, 'left', 1, 8, NULL, '2025-12-23 10:09:36', NULL),
(106, 43, 42, 'left', 1, 1, NULL, '2025-12-23 16:02:38', NULL),
(107, 43, 32, 'left', 1, 2, NULL, '2025-12-23 16:02:38', NULL),
(108, 43, 31, 'left', 1, 3, NULL, '2025-12-23 16:02:38', NULL),
(109, 43, 30, 'left', 1, 4, NULL, '2025-12-23 16:02:38', NULL),
(110, 43, 25, 'left', 1, 5, NULL, '2025-12-23 16:02:38', NULL),
(111, 43, 24, 'left', 1, 6, NULL, '2025-12-23 16:02:38', NULL),
(112, 43, 23, 'left', 1, 7, NULL, '2025-12-23 16:02:38', NULL),
(113, 43, 22, 'left', 1, 8, NULL, '2025-12-23 16:02:38', NULL),
(114, 43, 19, 'left', 1, 9, NULL, '2025-12-23 16:02:38', NULL),
(115, 46, 42, 'right', 1, 1, NULL, '2025-12-23 16:03:32', NULL),
(116, 46, 32, 'left', 1, 2, NULL, '2025-12-23 16:03:32', NULL),
(117, 46, 31, 'left', 1, 3, NULL, '2025-12-23 16:03:32', NULL),
(118, 46, 30, 'left', 1, 4, NULL, '2025-12-23 16:03:32', NULL),
(119, 46, 25, 'left', 1, 5, NULL, '2025-12-23 16:03:32', NULL),
(120, 46, 24, 'left', 1, 6, NULL, '2025-12-23 16:03:32', NULL),
(121, 46, 23, 'left', 1, 7, NULL, '2025-12-23 16:03:32', NULL),
(122, 46, 22, 'left', 1, 8, NULL, '2025-12-23 16:03:32', NULL),
(123, 46, 19, 'left', 1, 9, NULL, '2025-12-23 16:03:32', NULL),
(124, 44, 43, 'left', 1, 1, NULL, '2025-12-23 16:06:06', NULL),
(125, 44, 42, 'left', 1, 2, NULL, '2025-12-23 16:06:06', NULL),
(126, 44, 32, 'left', 1, 3, NULL, '2025-12-23 16:06:06', NULL),
(127, 44, 31, 'left', 1, 4, NULL, '2025-12-23 16:06:06', NULL),
(128, 44, 30, 'left', 1, 5, NULL, '2025-12-23 16:06:06', NULL),
(129, 44, 25, 'left', 1, 6, NULL, '2025-12-23 16:06:06', NULL),
(130, 44, 24, 'left', 1, 7, NULL, '2025-12-23 16:06:06', NULL),
(131, 44, 23, 'left', 1, 8, NULL, '2025-12-23 16:06:06', NULL),
(132, 44, 22, 'left', 1, 9, NULL, '2025-12-23 16:06:06', NULL),
(133, 44, 19, 'left', 1, 10, NULL, '2025-12-23 16:06:06', NULL),
(134, 45, 43, 'right', 1, 1, NULL, '2025-12-23 16:06:36', NULL),
(135, 45, 42, 'left', 1, 2, NULL, '2025-12-23 16:06:36', NULL),
(136, 45, 32, 'left', 1, 3, NULL, '2025-12-23 16:06:36', NULL),
(137, 45, 31, 'left', 1, 4, NULL, '2025-12-23 16:06:36', NULL),
(138, 45, 30, 'left', 1, 5, NULL, '2025-12-23 16:06:36', NULL),
(139, 45, 25, 'left', 1, 6, NULL, '2025-12-23 16:06:36', NULL),
(140, 45, 24, 'left', 1, 7, NULL, '2025-12-23 16:06:36', NULL),
(141, 45, 23, 'left', 1, 8, NULL, '2025-12-23 16:06:36', NULL),
(142, 45, 22, 'left', 1, 9, NULL, '2025-12-23 16:06:36', NULL),
(143, 45, 19, 'left', 1, 10, NULL, '2025-12-23 16:06:36', NULL),
(144, 47, 46, 'left', 1, 1, NULL, '2025-12-23 16:08:45', NULL),
(145, 47, 42, 'right', 1, 2, NULL, '2025-12-23 16:08:45', NULL),
(146, 47, 32, 'left', 1, 3, NULL, '2025-12-23 16:08:45', NULL),
(147, 47, 31, 'left', 1, 4, NULL, '2025-12-23 16:08:45', NULL),
(148, 47, 30, 'left', 1, 5, NULL, '2025-12-23 16:08:45', NULL),
(149, 47, 25, 'left', 1, 6, NULL, '2025-12-23 16:08:45', NULL),
(150, 47, 24, 'left', 1, 7, NULL, '2025-12-23 16:08:45', NULL),
(151, 47, 23, 'left', 1, 8, NULL, '2025-12-23 16:08:45', NULL),
(152, 47, 22, 'left', 1, 9, NULL, '2025-12-23 16:08:45', NULL),
(153, 47, 19, 'left', 1, 10, NULL, '2025-12-23 16:08:45', NULL),
(154, 48, 46, 'right', 1, 1, NULL, '2025-12-23 16:08:53', NULL),
(155, 48, 42, 'right', 1, 2, NULL, '2025-12-23 16:08:53', NULL),
(156, 48, 32, 'left', 1, 3, NULL, '2025-12-23 16:08:53', NULL),
(157, 48, 31, 'left', 1, 4, NULL, '2025-12-23 16:08:53', NULL),
(158, 48, 30, 'left', 1, 5, NULL, '2025-12-23 16:08:53', NULL),
(159, 48, 25, 'left', 1, 6, NULL, '2025-12-23 16:08:53', NULL),
(160, 48, 24, 'left', 1, 7, NULL, '2025-12-23 16:08:53', NULL),
(161, 48, 23, 'left', 1, 8, NULL, '2025-12-23 16:08:53', NULL),
(162, 48, 22, 'left', 1, 9, NULL, '2025-12-23 16:08:53', NULL),
(163, 48, 19, 'left', 1, 10, NULL, '2025-12-23 16:08:53', NULL),
(164, 49, 35, 'left', 1, 1, NULL, '2025-12-23 16:13:28', NULL),
(165, 49, 34, 'left', 1, 2, NULL, '2025-12-23 16:13:28', NULL),
(166, 49, 33, 'left', 1, 3, NULL, '2025-12-23 16:13:28', NULL),
(167, 49, 25, 'right', 1, 4, NULL, '2025-12-23 16:13:28', NULL),
(168, 49, 24, 'left', 1, 5, NULL, '2025-12-23 16:13:28', NULL),
(169, 49, 23, 'left', 1, 6, NULL, '2025-12-23 16:13:28', NULL),
(170, 49, 22, 'left', 1, 7, NULL, '2025-12-23 16:13:28', NULL),
(171, 49, 19, 'left', 1, 8, NULL, '2025-12-23 16:13:28', NULL),
(172, 50, 49, 'left', 1, 1, NULL, '2025-12-23 16:14:10', NULL),
(173, 50, 35, 'left', 1, 2, NULL, '2025-12-23 16:14:10', NULL),
(174, 50, 34, 'left', 1, 3, NULL, '2025-12-23 16:14:10', NULL),
(175, 50, 33, 'left', 1, 4, NULL, '2025-12-23 16:14:10', NULL),
(176, 50, 25, 'right', 1, 5, NULL, '2025-12-23 16:14:10', NULL),
(177, 50, 24, 'left', 1, 6, NULL, '2025-12-23 16:14:10', NULL),
(178, 50, 23, 'left', 1, 7, NULL, '2025-12-23 16:14:10', NULL),
(179, 50, 22, 'left', 1, 8, NULL, '2025-12-23 16:14:10', NULL),
(180, 50, 19, 'left', 1, 9, NULL, '2025-12-23 16:14:10', NULL),
(181, 51, 49, 'right', 1, 1, NULL, '2025-12-23 16:14:17', NULL),
(182, 51, 35, 'left', 1, 2, NULL, '2025-12-23 16:14:17', NULL),
(183, 51, 34, 'left', 1, 3, NULL, '2025-12-23 16:14:17', NULL),
(184, 51, 33, 'left', 1, 4, NULL, '2025-12-23 16:14:17', NULL),
(185, 51, 25, 'right', 1, 5, NULL, '2025-12-23 16:14:17', NULL),
(186, 51, 24, 'left', 1, 6, NULL, '2025-12-23 16:14:17', NULL),
(187, 51, 23, 'left', 1, 7, NULL, '2025-12-23 16:14:17', NULL),
(188, 51, 22, 'left', 1, 8, NULL, '2025-12-23 16:14:17', NULL),
(189, 51, 19, 'left', 1, 9, NULL, '2025-12-23 16:14:17', NULL),
(190, 52, 50, 'right', 1, 1, NULL, '2025-12-23 16:15:07', NULL),
(191, 52, 49, 'left', 1, 2, NULL, '2025-12-23 16:15:07', NULL),
(192, 52, 35, 'left', 1, 3, NULL, '2025-12-23 16:15:07', NULL),
(193, 52, 34, 'left', 1, 4, NULL, '2025-12-23 16:15:07', NULL),
(194, 52, 33, 'left', 1, 5, NULL, '2025-12-23 16:15:07', NULL),
(195, 52, 25, 'right', 1, 6, NULL, '2025-12-23 16:15:07', NULL),
(196, 52, 24, 'left', 1, 7, NULL, '2025-12-23 16:15:07', NULL),
(197, 52, 23, 'left', 1, 8, NULL, '2025-12-23 16:15:07', NULL),
(198, 52, 22, 'left', 1, 9, NULL, '2025-12-23 16:15:07', NULL),
(199, 52, 19, 'left', 1, 10, NULL, '2025-12-23 16:15:07', NULL),
(200, 53, 52, 'left', 1, 1, NULL, '2025-12-23 16:15:47', NULL),
(201, 53, 50, 'right', 1, 2, NULL, '2025-12-23 16:15:47', NULL),
(202, 53, 49, 'left', 1, 3, NULL, '2025-12-23 16:15:47', NULL),
(203, 53, 35, 'left', 1, 4, NULL, '2025-12-23 16:15:47', NULL),
(204, 53, 34, 'left', 1, 5, NULL, '2025-12-23 16:15:47', NULL),
(205, 53, 33, 'left', 1, 6, NULL, '2025-12-23 16:15:47', NULL),
(206, 53, 25, 'right', 1, 7, NULL, '2025-12-23 16:15:47', NULL),
(207, 53, 24, 'left', 1, 8, NULL, '2025-12-23 16:15:47', NULL),
(208, 53, 23, 'left', 1, 9, NULL, '2025-12-23 16:15:47', NULL),
(209, 53, 22, 'left', 1, 10, NULL, '2025-12-23 16:15:47', NULL),
(210, 53, 19, 'left', 1, 11, NULL, '2025-12-23 16:15:47', NULL),
(211, 54, 52, 'right', 1, 1, NULL, '2025-12-23 16:15:54', NULL),
(212, 54, 50, 'right', 1, 2, NULL, '2025-12-23 16:15:54', NULL),
(213, 54, 49, 'left', 1, 3, NULL, '2025-12-23 16:15:54', NULL),
(214, 54, 35, 'left', 1, 4, NULL, '2025-12-23 16:15:54', NULL),
(215, 54, 34, 'left', 1, 5, NULL, '2025-12-23 16:15:54', NULL),
(216, 54, 33, 'left', 1, 6, NULL, '2025-12-23 16:15:54', NULL),
(217, 54, 25, 'right', 1, 7, NULL, '2025-12-23 16:15:54', NULL),
(218, 54, 24, 'left', 1, 8, NULL, '2025-12-23 16:15:54', NULL),
(219, 54, 23, 'left', 1, 9, NULL, '2025-12-23 16:15:54', NULL),
(220, 54, 22, 'left', 1, 10, NULL, '2025-12-23 16:15:54', NULL),
(221, 54, 19, 'left', 1, 11, NULL, '2025-12-23 16:15:54', NULL),
(222, 60, 54, 'left', 1, 1, NULL, '2025-12-23 16:16:38', NULL),
(223, 60, 52, 'right', 1, 2, NULL, '2025-12-23 16:16:38', NULL),
(224, 60, 50, 'right', 1, 3, NULL, '2025-12-23 16:16:38', NULL),
(225, 60, 49, 'left', 1, 4, NULL, '2025-12-23 16:16:38', NULL),
(226, 60, 35, 'left', 1, 5, NULL, '2025-12-23 16:16:38', NULL),
(227, 60, 34, 'left', 1, 6, NULL, '2025-12-23 16:16:38', NULL),
(228, 60, 33, 'left', 1, 7, NULL, '2025-12-23 16:16:38', NULL),
(229, 60, 25, 'right', 1, 8, NULL, '2025-12-23 16:16:38', NULL),
(230, 60, 24, 'left', 1, 9, NULL, '2025-12-23 16:16:38', NULL),
(231, 60, 23, 'left', 1, 10, NULL, '2025-12-23 16:16:38', NULL),
(232, 60, 22, 'left', 1, 11, NULL, '2025-12-23 16:16:38', NULL),
(233, 60, 19, 'left', 1, 12, NULL, '2025-12-23 16:16:38', NULL),
(234, 61, 54, 'right', 1, 1, NULL, '2025-12-23 16:16:42', NULL),
(235, 61, 52, 'right', 1, 2, NULL, '2025-12-23 16:16:42', NULL),
(236, 61, 50, 'right', 1, 3, NULL, '2025-12-23 16:16:42', NULL),
(237, 61, 49, 'left', 1, 4, NULL, '2025-12-23 16:16:42', NULL),
(238, 61, 35, 'left', 1, 5, NULL, '2025-12-23 16:16:42', NULL),
(239, 61, 34, 'left', 1, 6, NULL, '2025-12-23 16:16:42', NULL),
(240, 61, 33, 'left', 1, 7, NULL, '2025-12-23 16:16:42', NULL),
(241, 61, 25, 'right', 1, 8, NULL, '2025-12-23 16:16:42', NULL),
(242, 61, 24, 'left', 1, 9, NULL, '2025-12-23 16:16:42', NULL),
(243, 61, 23, 'left', 1, 10, NULL, '2025-12-23 16:16:42', NULL),
(244, 61, 22, 'left', 1, 11, NULL, '2025-12-23 16:16:42', NULL),
(245, 61, 19, 'left', 1, 12, NULL, '2025-12-23 16:16:42', NULL),
(246, 55, 51, 'left', 1, 1, NULL, '2025-12-23 16:17:34', NULL),
(247, 55, 49, 'right', 1, 2, NULL, '2025-12-23 16:17:34', NULL),
(248, 55, 35, 'left', 1, 3, NULL, '2025-12-23 16:17:34', NULL),
(249, 55, 34, 'left', 1, 4, NULL, '2025-12-23 16:17:34', NULL),
(250, 55, 33, 'left', 1, 5, NULL, '2025-12-23 16:17:34', NULL),
(251, 55, 25, 'right', 1, 6, NULL, '2025-12-23 16:17:34', NULL),
(252, 55, 24, 'left', 1, 7, NULL, '2025-12-23 16:17:34', NULL),
(253, 55, 23, 'left', 1, 8, NULL, '2025-12-23 16:17:34', NULL),
(254, 55, 22, 'left', 1, 9, NULL, '2025-12-23 16:17:34', NULL),
(255, 55, 19, 'left', 1, 10, NULL, '2025-12-23 16:17:34', NULL),
(256, 56, 55, 'left', 1, 1, NULL, '2025-12-23 16:18:16', NULL),
(257, 56, 51, 'left', 1, 2, NULL, '2025-12-23 16:18:16', NULL),
(258, 56, 49, 'right', 1, 3, NULL, '2025-12-23 16:18:16', NULL),
(259, 56, 35, 'left', 1, 4, NULL, '2025-12-23 16:18:16', NULL),
(260, 56, 34, 'left', 1, 5, NULL, '2025-12-23 16:18:16', NULL),
(261, 56, 33, 'left', 1, 6, NULL, '2025-12-23 16:18:16', NULL),
(262, 56, 25, 'right', 1, 7, NULL, '2025-12-23 16:18:16', NULL),
(263, 56, 24, 'left', 1, 8, NULL, '2025-12-23 16:18:16', NULL),
(264, 56, 23, 'left', 1, 9, NULL, '2025-12-23 16:18:16', NULL),
(265, 56, 22, 'left', 1, 10, NULL, '2025-12-23 16:18:16', NULL),
(266, 56, 19, 'left', 1, 11, NULL, '2025-12-23 16:18:16', NULL),
(267, 57, 55, 'right', 1, 1, NULL, '2025-12-23 16:18:23', NULL),
(268, 57, 51, 'left', 1, 2, NULL, '2025-12-23 16:18:23', NULL),
(269, 57, 49, 'right', 1, 3, NULL, '2025-12-23 16:18:23', NULL),
(270, 57, 35, 'left', 1, 4, NULL, '2025-12-23 16:18:23', NULL),
(271, 57, 34, 'left', 1, 5, NULL, '2025-12-23 16:18:23', NULL),
(272, 57, 33, 'left', 1, 6, NULL, '2025-12-23 16:18:23', NULL),
(273, 57, 25, 'right', 1, 7, NULL, '2025-12-23 16:18:23', NULL),
(274, 57, 24, 'left', 1, 8, NULL, '2025-12-23 16:18:23', NULL),
(275, 57, 23, 'left', 1, 9, NULL, '2025-12-23 16:18:23', NULL),
(276, 57, 22, 'left', 1, 10, NULL, '2025-12-23 16:18:23', NULL),
(277, 57, 19, 'left', 1, 11, NULL, '2025-12-23 16:18:23', NULL),
(278, 58, 57, 'left', 1, 1, NULL, '2025-12-23 16:19:32', NULL),
(279, 58, 55, 'right', 1, 2, NULL, '2025-12-23 16:19:32', NULL),
(280, 58, 51, 'left', 1, 3, NULL, '2025-12-23 16:19:32', NULL),
(281, 58, 49, 'right', 1, 4, NULL, '2025-12-23 16:19:32', NULL),
(282, 58, 35, 'left', 1, 5, NULL, '2025-12-23 16:19:32', NULL),
(283, 58, 34, 'left', 1, 6, NULL, '2025-12-23 16:19:32', NULL),
(284, 58, 33, 'left', 1, 7, NULL, '2025-12-23 16:19:32', NULL),
(285, 58, 25, 'right', 1, 8, NULL, '2025-12-23 16:19:32', NULL),
(286, 58, 24, 'left', 1, 9, NULL, '2025-12-23 16:19:32', NULL),
(287, 58, 23, 'left', 1, 10, NULL, '2025-12-23 16:19:32', NULL),
(288, 58, 22, 'left', 1, 11, NULL, '2025-12-23 16:19:32', NULL),
(289, 58, 19, 'left', 1, 12, NULL, '2025-12-23 16:19:32', NULL),
(290, 59, 57, 'right', 1, 1, NULL, '2025-12-23 16:19:38', NULL),
(291, 59, 55, 'right', 1, 2, NULL, '2025-12-23 16:19:38', NULL),
(292, 59, 51, 'left', 1, 3, NULL, '2025-12-23 16:19:38', NULL),
(293, 59, 49, 'right', 1, 4, NULL, '2025-12-23 16:19:38', NULL),
(294, 59, 35, 'left', 1, 5, NULL, '2025-12-23 16:19:38', NULL),
(295, 59, 34, 'left', 1, 6, NULL, '2025-12-23 16:19:38', NULL),
(296, 59, 33, 'left', 1, 7, NULL, '2025-12-23 16:19:38', NULL),
(297, 59, 25, 'right', 1, 8, NULL, '2025-12-23 16:19:38', NULL),
(298, 59, 24, 'left', 1, 9, NULL, '2025-12-23 16:19:38', NULL),
(299, 59, 23, 'left', 1, 10, NULL, '2025-12-23 16:19:38', NULL),
(300, 59, 22, 'left', 1, 11, NULL, '2025-12-23 16:19:38', NULL),
(301, 59, 19, 'left', 1, 12, NULL, '2025-12-23 16:19:38', NULL),
(302, 62, 38, 'left', 1, 1, NULL, '2025-12-23 16:33:36', NULL),
(303, 62, 37, 'left', 1, 2, NULL, '2025-12-23 16:33:36', NULL),
(304, 62, 36, 'left', 1, 3, NULL, '2025-12-23 16:33:36', NULL),
(305, 62, 26, 'left', 1, 4, NULL, '2025-12-23 16:33:36', NULL),
(306, 62, 24, 'right', 1, 5, NULL, '2025-12-23 16:33:36', NULL),
(307, 62, 23, 'left', 1, 6, NULL, '2025-12-23 16:33:36', NULL),
(308, 62, 22, 'left', 1, 7, NULL, '2025-12-23 16:33:36', NULL),
(309, 62, 19, 'left', 1, 8, NULL, '2025-12-23 16:33:36', NULL),
(310, 63, 62, 'left', 1, 1, NULL, '2025-12-23 16:35:00', NULL),
(311, 63, 38, 'left', 1, 2, NULL, '2025-12-23 16:35:00', NULL),
(312, 63, 37, 'left', 1, 3, NULL, '2025-12-23 16:35:00', NULL),
(313, 63, 36, 'left', 1, 4, NULL, '2025-12-23 16:35:00', NULL),
(314, 63, 26, 'left', 1, 5, NULL, '2025-12-23 16:35:00', NULL),
(315, 63, 24, 'right', 1, 6, NULL, '2025-12-23 16:35:00', NULL),
(316, 63, 23, 'left', 1, 7, NULL, '2025-12-23 16:35:00', NULL),
(317, 63, 22, 'left', 1, 8, NULL, '2025-12-23 16:35:00', NULL),
(318, 63, 19, 'left', 1, 9, NULL, '2025-12-23 16:35:00', NULL),
(319, 95, 62, 'right', 1, 1, NULL, '2025-12-23 16:44:00', NULL),
(320, 95, 38, 'left', 1, 2, NULL, '2025-12-23 16:44:00', NULL),
(321, 95, 37, 'left', 1, 3, NULL, '2025-12-23 16:44:00', NULL),
(322, 95, 36, 'left', 1, 4, NULL, '2025-12-23 16:44:00', NULL),
(323, 95, 26, 'left', 1, 5, NULL, '2025-12-23 16:44:00', NULL),
(324, 95, 24, 'right', 1, 6, NULL, '2025-12-23 16:44:00', NULL),
(325, 95, 23, 'left', 1, 7, NULL, '2025-12-23 16:44:00', NULL),
(326, 95, 22, 'left', 1, 8, NULL, '2025-12-23 16:44:00', NULL),
(327, 95, 19, 'left', 1, 9, NULL, '2025-12-23 16:44:00', NULL),
(328, 96, 95, 'right', 1, 1, NULL, '2025-12-23 16:45:37', NULL),
(329, 96, 62, 'right', 1, 2, NULL, '2025-12-23 16:45:37', NULL),
(330, 96, 38, 'left', 1, 3, NULL, '2025-12-23 16:45:37', NULL),
(331, 96, 37, 'left', 1, 4, NULL, '2025-12-23 16:45:37', NULL),
(332, 96, 36, 'left', 1, 5, NULL, '2025-12-23 16:45:37', NULL),
(333, 96, 26, 'left', 1, 6, NULL, '2025-12-23 16:45:37', NULL),
(334, 96, 24, 'right', 1, 7, NULL, '2025-12-23 16:45:37', NULL),
(335, 96, 23, 'left', 1, 8, NULL, '2025-12-23 16:45:37', NULL),
(336, 96, 22, 'left', 1, 9, NULL, '2025-12-23 16:45:37', NULL),
(337, 96, 19, 'left', 1, 10, NULL, '2025-12-23 16:45:37', NULL),
(338, 97, 96, 'right', 1, 1, NULL, '2025-12-23 16:51:29', NULL),
(339, 97, 95, 'right', 1, 2, NULL, '2025-12-23 16:51:29', NULL),
(340, 97, 62, 'right', 1, 3, NULL, '2025-12-23 16:51:29', NULL),
(341, 97, 38, 'left', 1, 4, NULL, '2025-12-23 16:51:29', NULL),
(342, 97, 37, 'left', 1, 5, NULL, '2025-12-23 16:51:29', NULL),
(343, 97, 36, 'left', 1, 6, NULL, '2025-12-23 16:51:29', NULL),
(344, 97, 26, 'left', 1, 7, NULL, '2025-12-23 16:51:29', NULL),
(345, 97, 24, 'right', 1, 8, NULL, '2025-12-23 16:51:29', NULL),
(346, 97, 23, 'left', 1, 9, NULL, '2025-12-23 16:51:29', NULL),
(347, 97, 22, 'left', 1, 10, NULL, '2025-12-23 16:51:29', NULL),
(348, 97, 19, 'left', 1, 11, NULL, '2025-12-23 16:51:29', NULL),
(349, 98, 97, 'right', 1, 1, NULL, '2025-12-23 16:52:20', NULL),
(350, 98, 96, 'right', 1, 2, NULL, '2025-12-23 16:52:20', NULL),
(351, 98, 95, 'right', 1, 3, NULL, '2025-12-23 16:52:20', NULL),
(352, 98, 62, 'right', 1, 4, NULL, '2025-12-23 16:52:20', NULL),
(353, 98, 38, 'left', 1, 5, NULL, '2025-12-23 16:52:20', NULL),
(354, 98, 37, 'left', 1, 6, NULL, '2025-12-23 16:52:20', NULL),
(355, 98, 36, 'left', 1, 7, NULL, '2025-12-23 16:52:20', NULL),
(356, 98, 26, 'left', 1, 8, NULL, '2025-12-23 16:52:20', NULL),
(357, 98, 24, 'right', 1, 9, NULL, '2025-12-23 16:52:20', NULL),
(358, 98, 23, 'left', 1, 10, NULL, '2025-12-23 16:52:20', NULL),
(359, 98, 22, 'left', 1, 11, NULL, '2025-12-23 16:52:20', NULL),
(360, 98, 19, 'left', 1, 12, NULL, '2025-12-23 16:52:20', NULL),
(361, 64, 63, 'left', 1, 1, NULL, '2025-12-24 03:17:53', NULL),
(362, 64, 62, 'left', 1, 2, NULL, '2025-12-24 03:17:53', NULL),
(363, 64, 38, 'left', 1, 3, NULL, '2025-12-24 03:17:53', NULL),
(364, 64, 37, 'left', 1, 4, NULL, '2025-12-24 03:17:53', NULL),
(365, 64, 36, 'left', 1, 5, NULL, '2025-12-24 03:17:53', NULL),
(366, 64, 26, 'left', 1, 6, NULL, '2025-12-24 03:17:53', NULL),
(367, 64, 24, 'right', 1, 7, NULL, '2025-12-24 03:17:53', NULL),
(368, 64, 23, 'left', 1, 8, NULL, '2025-12-24 03:17:53', NULL),
(369, 64, 22, 'left', 1, 9, NULL, '2025-12-24 03:17:53', NULL),
(370, 64, 19, 'left', 1, 10, NULL, '2025-12-24 03:17:53', NULL),
(371, 65, 64, 'left', 1, 1, NULL, '2025-12-24 04:59:51', NULL),
(372, 65, 63, 'left', 1, 2, NULL, '2025-12-24 04:59:51', NULL),
(373, 65, 62, 'left', 1, 3, NULL, '2025-12-24 04:59:51', NULL),
(374, 65, 38, 'left', 1, 4, NULL, '2025-12-24 04:59:51', NULL),
(375, 65, 37, 'left', 1, 5, NULL, '2025-12-24 04:59:51', NULL),
(376, 65, 36, 'left', 1, 6, NULL, '2025-12-24 04:59:51', NULL),
(377, 65, 26, 'left', 1, 7, NULL, '2025-12-24 04:59:51', NULL),
(378, 65, 24, 'right', 1, 8, NULL, '2025-12-24 04:59:51', NULL),
(379, 65, 23, 'left', 1, 9, NULL, '2025-12-24 04:59:51', NULL),
(380, 65, 22, 'left', 1, 10, NULL, '2025-12-24 04:59:51', NULL),
(381, 65, 19, 'left', 1, 11, NULL, '2025-12-24 04:59:51', NULL),
(382, 66, 65, 'left', 1, 1, NULL, '2025-12-24 05:00:50', NULL),
(383, 66, 64, 'left', 1, 2, NULL, '2025-12-24 05:00:50', NULL),
(384, 66, 63, 'left', 1, 3, NULL, '2025-12-24 05:00:50', NULL),
(385, 66, 62, 'left', 1, 4, NULL, '2025-12-24 05:00:50', NULL),
(386, 66, 38, 'left', 1, 5, NULL, '2025-12-24 05:00:50', NULL),
(387, 66, 37, 'left', 1, 6, NULL, '2025-12-24 05:00:50', NULL),
(388, 66, 36, 'left', 1, 7, NULL, '2025-12-24 05:00:50', NULL),
(389, 66, 26, 'left', 1, 8, NULL, '2025-12-24 05:00:50', NULL),
(390, 66, 24, 'right', 1, 9, NULL, '2025-12-24 05:00:50', NULL),
(391, 66, 23, 'left', 1, 10, NULL, '2025-12-24 05:00:50', NULL),
(392, 66, 22, 'left', 1, 11, NULL, '2025-12-24 05:00:50', NULL),
(393, 66, 19, 'left', 1, 12, NULL, '2025-12-24 05:00:50', NULL),
(394, 67, 66, 'left', 1, 1, NULL, '2025-12-24 05:01:18', NULL),
(395, 67, 65, 'left', 1, 2, NULL, '2025-12-24 05:01:18', NULL),
(396, 67, 64, 'left', 1, 3, NULL, '2025-12-24 05:01:18', NULL),
(397, 67, 63, 'left', 1, 4, NULL, '2025-12-24 05:01:18', NULL),
(398, 67, 62, 'left', 1, 5, NULL, '2025-12-24 05:01:18', NULL),
(399, 67, 38, 'left', 1, 6, NULL, '2025-12-24 05:01:18', NULL),
(400, 67, 37, 'left', 1, 7, NULL, '2025-12-24 05:01:18', NULL),
(401, 67, 36, 'left', 1, 8, NULL, '2025-12-24 05:01:18', NULL),
(402, 67, 26, 'left', 1, 9, NULL, '2025-12-24 05:01:18', NULL),
(403, 67, 24, 'right', 1, 10, NULL, '2025-12-24 05:01:18', NULL),
(404, 67, 23, 'left', 1, 11, NULL, '2025-12-24 05:01:18', NULL),
(405, 67, 22, 'left', 1, 12, NULL, '2025-12-24 05:01:18', NULL),
(406, 67, 19, 'left', 1, 13, NULL, '2025-12-24 05:01:18', NULL),
(407, 68, 67, 'left', 1, 1, NULL, '2025-12-24 05:03:00', NULL),
(408, 68, 66, 'left', 1, 2, NULL, '2025-12-24 05:03:00', NULL),
(409, 68, 65, 'left', 1, 3, NULL, '2025-12-24 05:03:00', NULL),
(410, 68, 64, 'left', 1, 4, NULL, '2025-12-24 05:03:00', NULL),
(411, 68, 63, 'left', 1, 5, NULL, '2025-12-24 05:03:00', NULL),
(412, 68, 62, 'left', 1, 6, NULL, '2025-12-24 05:03:00', NULL),
(413, 68, 38, 'left', 1, 7, NULL, '2025-12-24 05:03:00', NULL),
(414, 68, 37, 'left', 1, 8, NULL, '2025-12-24 05:03:00', NULL),
(415, 68, 36, 'left', 1, 9, NULL, '2025-12-24 05:03:00', NULL),
(416, 68, 26, 'left', 1, 10, NULL, '2025-12-24 05:03:00', NULL),
(417, 68, 24, 'right', 1, 11, NULL, '2025-12-24 05:03:00', NULL),
(418, 68, 23, 'left', 1, 12, NULL, '2025-12-24 05:03:00', NULL),
(419, 68, 22, 'left', 1, 13, NULL, '2025-12-24 05:03:00', NULL),
(420, 68, 19, 'left', 1, 14, NULL, '2025-12-24 05:03:00', NULL),
(421, 69, 68, 'left', 1, 1, NULL, '2025-12-24 05:04:27', NULL),
(422, 69, 67, 'left', 1, 2, NULL, '2025-12-24 05:04:27', NULL),
(423, 69, 66, 'left', 1, 3, NULL, '2025-12-24 05:04:27', NULL),
(424, 69, 65, 'left', 1, 4, NULL, '2025-12-24 05:04:27', NULL),
(425, 69, 64, 'left', 1, 5, NULL, '2025-12-24 05:04:27', NULL),
(426, 69, 63, 'left', 1, 6, NULL, '2025-12-24 05:04:27', NULL),
(427, 69, 62, 'left', 1, 7, NULL, '2025-12-24 05:04:27', NULL),
(428, 69, 38, 'left', 1, 8, NULL, '2025-12-24 05:04:27', NULL),
(429, 69, 37, 'left', 1, 9, NULL, '2025-12-24 05:04:27', NULL),
(430, 69, 36, 'left', 1, 10, NULL, '2025-12-24 05:04:27', NULL),
(431, 69, 26, 'left', 1, 11, NULL, '2025-12-24 05:04:27', NULL),
(432, 69, 24, 'right', 1, 12, NULL, '2025-12-24 05:04:27', NULL),
(433, 69, 23, 'left', 1, 13, NULL, '2025-12-24 05:04:27', NULL),
(434, 69, 22, 'left', 1, 14, NULL, '2025-12-24 05:04:27', NULL),
(435, 69, 19, 'left', 1, 15, NULL, '2025-12-24 05:04:27', NULL),
(436, 70, 69, 'left', 1, 1, NULL, '2025-12-24 05:04:40', NULL),
(437, 70, 68, 'left', 1, 2, NULL, '2025-12-24 05:04:40', NULL),
(438, 70, 67, 'left', 1, 3, NULL, '2025-12-24 05:04:40', NULL),
(439, 70, 66, 'left', 1, 4, NULL, '2025-12-24 05:04:40', NULL),
(440, 70, 65, 'left', 1, 5, NULL, '2025-12-24 05:04:40', NULL),
(441, 70, 64, 'left', 1, 6, NULL, '2025-12-24 05:04:40', NULL),
(442, 70, 63, 'left', 1, 7, NULL, '2025-12-24 05:04:40', NULL),
(443, 70, 62, 'left', 1, 8, NULL, '2025-12-24 05:04:40', NULL),
(444, 70, 38, 'left', 1, 9, NULL, '2025-12-24 05:04:40', NULL),
(445, 70, 37, 'left', 1, 10, NULL, '2025-12-24 05:04:40', NULL),
(446, 70, 36, 'left', 1, 11, NULL, '2025-12-24 05:04:40', NULL),
(447, 70, 26, 'left', 1, 12, NULL, '2025-12-24 05:04:40', NULL),
(448, 70, 24, 'right', 1, 13, NULL, '2025-12-24 05:04:40', NULL),
(449, 70, 23, 'left', 1, 14, NULL, '2025-12-24 05:04:40', NULL),
(450, 70, 22, 'left', 1, 15, NULL, '2025-12-24 05:04:40', NULL),
(451, 70, 19, 'left', 1, 16, NULL, '2025-12-24 05:04:40', NULL),
(452, 71, 70, 'left', 1, 1, NULL, '2025-12-24 05:13:15', NULL),
(453, 71, 69, 'left', 1, 2, NULL, '2025-12-24 05:13:15', NULL),
(454, 71, 68, 'left', 1, 3, NULL, '2025-12-24 05:13:15', NULL),
(455, 71, 67, 'left', 1, 4, NULL, '2025-12-24 05:13:15', NULL),
(456, 71, 66, 'left', 1, 5, NULL, '2025-12-24 05:13:15', NULL),
(457, 71, 65, 'left', 1, 6, NULL, '2025-12-24 05:13:15', NULL),
(458, 71, 64, 'left', 1, 7, NULL, '2025-12-24 05:13:15', NULL),
(459, 71, 63, 'left', 1, 8, NULL, '2025-12-24 05:13:15', NULL),
(460, 71, 62, 'left', 1, 9, NULL, '2025-12-24 05:13:15', NULL),
(461, 71, 38, 'left', 1, 10, NULL, '2025-12-24 05:13:15', NULL),
(462, 71, 37, 'left', 1, 11, NULL, '2025-12-24 05:13:15', NULL),
(463, 71, 36, 'left', 1, 12, NULL, '2025-12-24 05:13:15', NULL),
(464, 71, 26, 'left', 1, 13, NULL, '2025-12-24 05:13:15', NULL),
(465, 71, 24, 'right', 1, 14, NULL, '2025-12-24 05:13:15', NULL),
(466, 71, 23, 'left', 1, 15, NULL, '2025-12-24 05:13:15', NULL),
(467, 71, 22, 'left', 1, 16, NULL, '2025-12-24 05:13:15', NULL),
(468, 71, 19, 'left', 1, 17, NULL, '2025-12-24 05:13:15', NULL),
(469, 72, 71, 'left', 1, 1, NULL, '2025-12-24 05:14:13', NULL),
(470, 72, 70, 'left', 1, 2, NULL, '2025-12-24 05:14:13', NULL),
(471, 72, 69, 'left', 1, 3, NULL, '2025-12-24 05:14:13', NULL),
(472, 72, 68, 'left', 1, 4, NULL, '2025-12-24 05:14:13', NULL),
(473, 72, 67, 'left', 1, 5, NULL, '2025-12-24 05:14:13', NULL),
(474, 72, 66, 'left', 1, 6, NULL, '2025-12-24 05:14:13', NULL),
(475, 72, 65, 'left', 1, 7, NULL, '2025-12-24 05:14:13', NULL),
(476, 72, 64, 'left', 1, 8, NULL, '2025-12-24 05:14:13', NULL),
(477, 72, 63, 'left', 1, 9, NULL, '2025-12-24 05:14:13', NULL),
(478, 72, 62, 'left', 1, 10, NULL, '2025-12-24 05:14:13', NULL),
(479, 72, 38, 'left', 1, 11, NULL, '2025-12-24 05:14:13', NULL),
(480, 72, 37, 'left', 1, 12, NULL, '2025-12-24 05:14:13', NULL),
(481, 72, 36, 'left', 1, 13, NULL, '2025-12-24 05:14:13', NULL),
(482, 72, 26, 'left', 1, 14, NULL, '2025-12-24 05:14:13', NULL),
(483, 72, 24, 'right', 1, 15, NULL, '2025-12-24 05:14:13', NULL),
(484, 72, 23, 'left', 1, 16, NULL, '2025-12-24 05:14:13', NULL),
(485, 72, 22, 'left', 1, 17, NULL, '2025-12-24 05:14:13', NULL),
(486, 72, 19, 'left', 1, 18, NULL, '2025-12-24 05:14:13', NULL),
(487, 73, 72, 'left', 1, 1, NULL, '2025-12-24 05:14:21', NULL),
(488, 73, 71, 'left', 1, 2, NULL, '2025-12-24 05:14:21', NULL),
(489, 73, 70, 'left', 1, 3, NULL, '2025-12-24 05:14:21', NULL),
(490, 73, 69, 'left', 1, 4, NULL, '2025-12-24 05:14:21', NULL),
(491, 73, 68, 'left', 1, 5, NULL, '2025-12-24 05:14:21', NULL),
(492, 73, 67, 'left', 1, 6, NULL, '2025-12-24 05:14:21', NULL),
(493, 73, 66, 'left', 1, 7, NULL, '2025-12-24 05:14:21', NULL),
(494, 73, 65, 'left', 1, 8, NULL, '2025-12-24 05:14:21', NULL),
(495, 73, 64, 'left', 1, 9, NULL, '2025-12-24 05:14:21', NULL),
(496, 73, 63, 'left', 1, 10, NULL, '2025-12-24 05:14:21', NULL),
(497, 73, 62, 'left', 1, 11, NULL, '2025-12-24 05:14:21', NULL),
(498, 73, 38, 'left', 1, 12, NULL, '2025-12-24 05:14:21', NULL),
(499, 73, 37, 'left', 1, 13, NULL, '2025-12-24 05:14:21', NULL),
(500, 73, 36, 'left', 1, 14, NULL, '2025-12-24 05:14:21', NULL),
(501, 73, 26, 'left', 1, 15, NULL, '2025-12-24 05:14:21', NULL),
(502, 73, 24, 'right', 1, 16, NULL, '2025-12-24 05:14:21', NULL),
(503, 73, 23, 'left', 1, 17, NULL, '2025-12-24 05:14:21', NULL),
(504, 73, 22, 'left', 1, 18, NULL, '2025-12-24 05:14:21', NULL),
(505, 73, 19, 'left', 1, 19, NULL, '2025-12-24 05:14:21', NULL),
(506, 74, 73, 'left', 1, 1, NULL, '2025-12-24 05:15:24', NULL),
(507, 74, 72, 'left', 1, 2, NULL, '2025-12-24 05:15:24', NULL),
(508, 74, 71, 'left', 1, 3, NULL, '2025-12-24 05:15:24', NULL),
(509, 74, 70, 'left', 1, 4, NULL, '2025-12-24 05:15:24', NULL),
(510, 74, 69, 'left', 1, 5, NULL, '2025-12-24 05:15:24', NULL),
(511, 74, 68, 'left', 1, 6, NULL, '2025-12-24 05:15:24', NULL),
(512, 74, 67, 'left', 1, 7, NULL, '2025-12-24 05:15:24', NULL),
(513, 74, 66, 'left', 1, 8, NULL, '2025-12-24 05:15:24', NULL),
(514, 74, 65, 'left', 1, 9, NULL, '2025-12-24 05:15:24', NULL),
(515, 74, 64, 'left', 1, 10, NULL, '2025-12-24 05:15:24', NULL),
(516, 74, 63, 'left', 1, 11, NULL, '2025-12-24 05:15:24', NULL),
(517, 74, 62, 'left', 1, 12, NULL, '2025-12-24 05:15:24', NULL),
(518, 74, 38, 'left', 1, 13, NULL, '2025-12-24 05:15:24', NULL),
(519, 74, 37, 'left', 1, 14, NULL, '2025-12-24 05:15:24', NULL),
(520, 74, 36, 'left', 1, 15, NULL, '2025-12-24 05:15:24', NULL),
(521, 74, 26, 'left', 1, 16, NULL, '2025-12-24 05:15:24', NULL),
(522, 74, 24, 'right', 1, 17, NULL, '2025-12-24 05:15:24', NULL),
(523, 74, 23, 'left', 1, 18, NULL, '2025-12-24 05:15:24', NULL),
(524, 74, 22, 'left', 1, 19, NULL, '2025-12-24 05:15:24', NULL),
(525, 74, 19, 'left', 1, 20, NULL, '2025-12-24 05:15:24', NULL),
(526, 75, 74, 'left', 1, 1, NULL, '2025-12-24 05:16:06', NULL),
(527, 75, 73, 'left', 1, 2, NULL, '2025-12-24 05:16:06', NULL),
(528, 75, 72, 'left', 1, 3, NULL, '2025-12-24 05:16:06', NULL),
(529, 75, 71, 'left', 1, 4, NULL, '2025-12-24 05:16:06', NULL),
(530, 75, 70, 'left', 1, 5, NULL, '2025-12-24 05:16:06', NULL),
(531, 75, 69, 'left', 1, 6, NULL, '2025-12-24 05:16:06', NULL),
(532, 75, 68, 'left', 1, 7, NULL, '2025-12-24 05:16:06', NULL),
(533, 75, 67, 'left', 1, 8, NULL, '2025-12-24 05:16:06', NULL),
(534, 75, 66, 'left', 1, 9, NULL, '2025-12-24 05:16:06', NULL),
(535, 75, 65, 'left', 1, 10, NULL, '2025-12-24 05:16:06', NULL),
(536, 75, 64, 'left', 1, 11, NULL, '2025-12-24 05:16:06', NULL),
(537, 75, 63, 'left', 1, 12, NULL, '2025-12-24 05:16:06', NULL),
(538, 75, 62, 'left', 1, 13, NULL, '2025-12-24 05:16:06', NULL),
(539, 75, 38, 'left', 1, 14, NULL, '2025-12-24 05:16:06', NULL),
(540, 75, 37, 'left', 1, 15, NULL, '2025-12-24 05:16:06', NULL),
(541, 75, 36, 'left', 1, 16, NULL, '2025-12-24 05:16:06', NULL),
(542, 75, 26, 'left', 1, 17, NULL, '2025-12-24 05:16:06', NULL),
(543, 75, 24, 'right', 1, 18, NULL, '2025-12-24 05:16:06', NULL),
(544, 75, 23, 'left', 1, 19, NULL, '2025-12-24 05:16:06', NULL),
(545, 75, 22, 'left', 1, 20, NULL, '2025-12-24 05:16:06', NULL),
(546, 75, 19, 'left', 1, 21, NULL, '2025-12-24 05:16:06', NULL),
(547, 76, 75, 'left', 1, 1, NULL, '2025-12-24 05:16:17', NULL),
(548, 76, 74, 'left', 1, 2, NULL, '2025-12-24 05:16:17', NULL),
(549, 76, 73, 'left', 1, 3, NULL, '2025-12-24 05:16:17', NULL),
(550, 76, 72, 'left', 1, 4, NULL, '2025-12-24 05:16:17', NULL),
(551, 76, 71, 'left', 1, 5, NULL, '2025-12-24 05:16:17', NULL),
(552, 76, 70, 'left', 1, 6, NULL, '2025-12-24 05:16:17', NULL),
(553, 76, 69, 'left', 1, 7, NULL, '2025-12-24 05:16:17', NULL),
(554, 76, 68, 'left', 1, 8, NULL, '2025-12-24 05:16:17', NULL),
(555, 76, 67, 'left', 1, 9, NULL, '2025-12-24 05:16:17', NULL),
(556, 76, 66, 'left', 1, 10, NULL, '2025-12-24 05:16:17', NULL),
(557, 76, 65, 'left', 1, 11, NULL, '2025-12-24 05:16:17', NULL),
(558, 76, 64, 'left', 1, 12, NULL, '2025-12-24 05:16:17', NULL),
(559, 76, 63, 'left', 1, 13, NULL, '2025-12-24 05:16:17', NULL),
(560, 76, 62, 'left', 1, 14, NULL, '2025-12-24 05:16:17', NULL),
(561, 76, 38, 'left', 1, 15, NULL, '2025-12-24 05:16:17', NULL),
(562, 76, 37, 'left', 1, 16, NULL, '2025-12-24 05:16:17', NULL),
(563, 76, 36, 'left', 1, 17, NULL, '2025-12-24 05:16:17', NULL),
(564, 76, 26, 'left', 1, 18, NULL, '2025-12-24 05:16:17', NULL),
(565, 76, 24, 'right', 1, 19, NULL, '2025-12-24 05:16:17', NULL),
(566, 76, 23, 'left', 1, 20, NULL, '2025-12-24 05:16:17', NULL),
(567, 76, 22, 'left', 1, 21, NULL, '2025-12-24 05:16:17', NULL),
(568, 76, 19, 'left', 1, 22, NULL, '2025-12-24 05:16:17', NULL),
(569, 77, 76, 'left', 1, 1, NULL, '2025-12-24 05:17:59', NULL),
(570, 77, 75, 'left', 1, 2, NULL, '2025-12-24 05:17:59', NULL),
(571, 77, 74, 'left', 1, 3, NULL, '2025-12-24 05:17:59', NULL),
(572, 77, 73, 'left', 1, 4, NULL, '2025-12-24 05:17:59', NULL),
(573, 77, 72, 'left', 1, 5, NULL, '2025-12-24 05:17:59', NULL),
(574, 77, 71, 'left', 1, 6, NULL, '2025-12-24 05:17:59', NULL),
(575, 77, 70, 'left', 1, 7, NULL, '2025-12-24 05:17:59', NULL),
(576, 77, 69, 'left', 1, 8, NULL, '2025-12-24 05:17:59', NULL),
(577, 77, 68, 'left', 1, 9, NULL, '2025-12-24 05:17:59', NULL),
(578, 77, 67, 'left', 1, 10, NULL, '2025-12-24 05:17:59', NULL),
(579, 77, 66, 'left', 1, 11, NULL, '2025-12-24 05:17:59', NULL),
(580, 77, 65, 'left', 1, 12, NULL, '2025-12-24 05:17:59', NULL),
(581, 77, 64, 'left', 1, 13, NULL, '2025-12-24 05:17:59', NULL),
(582, 77, 63, 'left', 1, 14, NULL, '2025-12-24 05:17:59', NULL),
(583, 77, 62, 'left', 1, 15, NULL, '2025-12-24 05:17:59', NULL),
(584, 77, 38, 'left', 1, 16, NULL, '2025-12-24 05:17:59', NULL),
(585, 77, 37, 'left', 1, 17, NULL, '2025-12-24 05:17:59', NULL),
(586, 77, 36, 'left', 1, 18, NULL, '2025-12-24 05:17:59', NULL),
(587, 77, 26, 'left', 1, 19, NULL, '2025-12-24 05:17:59', NULL),
(588, 77, 24, 'right', 1, 20, NULL, '2025-12-24 05:17:59', NULL),
(589, 77, 23, 'left', 1, 21, NULL, '2025-12-24 05:17:59', NULL),
(590, 77, 22, 'left', 1, 22, NULL, '2025-12-24 05:17:59', NULL),
(591, 77, 19, 'left', 1, 23, NULL, '2025-12-24 05:17:59', NULL),
(592, 78, 77, 'left', 1, 1, NULL, '2025-12-24 05:18:32', NULL),
(593, 78, 76, 'left', 1, 2, NULL, '2025-12-24 05:18:32', NULL),
(594, 78, 75, 'left', 1, 3, NULL, '2025-12-24 05:18:32', NULL),
(595, 78, 74, 'left', 1, 4, NULL, '2025-12-24 05:18:32', NULL),
(596, 78, 73, 'left', 1, 5, NULL, '2025-12-24 05:18:32', NULL),
(597, 78, 72, 'left', 1, 6, NULL, '2025-12-24 05:18:32', NULL),
(598, 78, 71, 'left', 1, 7, NULL, '2025-12-24 05:18:32', NULL),
(599, 78, 70, 'left', 1, 8, NULL, '2025-12-24 05:18:32', NULL),
(600, 78, 69, 'left', 1, 9, NULL, '2025-12-24 05:18:32', NULL),
(601, 78, 68, 'left', 1, 10, NULL, '2025-12-24 05:18:32', NULL),
(602, 78, 67, 'left', 1, 11, NULL, '2025-12-24 05:18:32', NULL),
(603, 78, 66, 'left', 1, 12, NULL, '2025-12-24 05:18:32', NULL),
(604, 78, 65, 'left', 1, 13, NULL, '2025-12-24 05:18:32', NULL),
(605, 78, 64, 'left', 1, 14, NULL, '2025-12-24 05:18:32', NULL),
(606, 78, 63, 'left', 1, 15, NULL, '2025-12-24 05:18:32', NULL),
(607, 78, 62, 'left', 1, 16, NULL, '2025-12-24 05:18:32', NULL),
(608, 78, 38, 'left', 1, 17, NULL, '2025-12-24 05:18:32', NULL),
(609, 78, 37, 'left', 1, 18, NULL, '2025-12-24 05:18:32', NULL),
(610, 78, 36, 'left', 1, 19, NULL, '2025-12-24 05:18:32', NULL),
(611, 78, 26, 'left', 1, 20, NULL, '2025-12-24 05:18:32', NULL),
(612, 78, 24, 'right', 1, 21, NULL, '2025-12-24 05:18:32', NULL),
(613, 78, 23, 'left', 1, 22, NULL, '2025-12-24 05:18:32', NULL),
(614, 78, 22, 'left', 1, 23, NULL, '2025-12-24 05:18:32', NULL),
(615, 78, 19, 'left', 1, 24, NULL, '2025-12-24 05:18:32', NULL),
(616, 79, 78, 'left', 1, 1, NULL, '2025-12-24 05:18:40', NULL),
(617, 79, 77, 'left', 1, 2, NULL, '2025-12-24 05:18:40', NULL),
(618, 79, 76, 'left', 1, 3, NULL, '2025-12-24 05:18:40', NULL),
(619, 79, 75, 'left', 1, 4, NULL, '2025-12-24 05:18:40', NULL),
(620, 79, 74, 'left', 1, 5, NULL, '2025-12-24 05:18:40', NULL),
(621, 79, 73, 'left', 1, 6, NULL, '2025-12-24 05:18:40', NULL),
(622, 79, 72, 'left', 1, 7, NULL, '2025-12-24 05:18:40', NULL),
(623, 79, 71, 'left', 1, 8, NULL, '2025-12-24 05:18:40', NULL),
(624, 79, 70, 'left', 1, 9, NULL, '2025-12-24 05:18:40', NULL),
(625, 79, 69, 'left', 1, 10, NULL, '2025-12-24 05:18:40', NULL),
(626, 79, 68, 'left', 1, 11, NULL, '2025-12-24 05:18:40', NULL),
(627, 79, 67, 'left', 1, 12, NULL, '2025-12-24 05:18:40', NULL),
(628, 79, 66, 'left', 1, 13, NULL, '2025-12-24 05:18:40', NULL),
(629, 79, 65, 'left', 1, 14, NULL, '2025-12-24 05:18:40', NULL),
(630, 79, 64, 'left', 1, 15, NULL, '2025-12-24 05:18:40', NULL),
(631, 79, 63, 'left', 1, 16, NULL, '2025-12-24 05:18:40', NULL),
(632, 79, 62, 'left', 1, 17, NULL, '2025-12-24 05:18:40', NULL),
(633, 79, 38, 'left', 1, 18, NULL, '2025-12-24 05:18:40', NULL),
(634, 79, 37, 'left', 1, 19, NULL, '2025-12-24 05:18:40', NULL),
(635, 79, 36, 'left', 1, 20, NULL, '2025-12-24 05:18:40', NULL),
(636, 79, 26, 'left', 1, 21, NULL, '2025-12-24 05:18:40', NULL),
(637, 79, 24, 'right', 1, 22, NULL, '2025-12-24 05:18:40', NULL),
(638, 79, 23, 'left', 1, 23, NULL, '2025-12-24 05:18:40', NULL),
(639, 79, 22, 'left', 1, 24, NULL, '2025-12-24 05:18:40', NULL),
(640, 79, 19, 'left', 1, 25, NULL, '2025-12-24 05:18:40', NULL),
(641, 80, 79, 'left', 1, 1, NULL, '2025-12-24 05:20:25', NULL),
(642, 80, 78, 'left', 1, 2, NULL, '2025-12-24 05:20:25', NULL),
(643, 80, 77, 'left', 1, 3, NULL, '2025-12-24 05:20:25', NULL),
(644, 80, 76, 'left', 1, 4, NULL, '2025-12-24 05:20:25', NULL),
(645, 80, 75, 'left', 1, 5, NULL, '2025-12-24 05:20:25', NULL),
(646, 80, 74, 'left', 1, 6, NULL, '2025-12-24 05:20:25', NULL),
(647, 80, 73, 'left', 1, 7, NULL, '2025-12-24 05:20:25', NULL),
(648, 80, 72, 'left', 1, 8, NULL, '2025-12-24 05:20:25', NULL),
(649, 80, 71, 'left', 1, 9, NULL, '2025-12-24 05:20:25', NULL),
(650, 80, 70, 'left', 1, 10, NULL, '2025-12-24 05:20:25', NULL),
(651, 80, 69, 'left', 1, 11, NULL, '2025-12-24 05:20:25', NULL),
(652, 80, 68, 'left', 1, 12, NULL, '2025-12-24 05:20:25', NULL),
(653, 80, 67, 'left', 1, 13, NULL, '2025-12-24 05:20:25', NULL),
(654, 80, 66, 'left', 1, 14, NULL, '2025-12-24 05:20:25', NULL),
(655, 80, 65, 'left', 1, 15, NULL, '2025-12-24 05:20:25', NULL),
(656, 80, 64, 'left', 1, 16, NULL, '2025-12-24 05:20:25', NULL),
(657, 80, 63, 'left', 1, 17, NULL, '2025-12-24 05:20:25', NULL),
(658, 80, 62, 'left', 1, 18, NULL, '2025-12-24 05:20:25', NULL),
(659, 80, 38, 'left', 1, 19, NULL, '2025-12-24 05:20:25', NULL),
(660, 80, 37, 'left', 1, 20, NULL, '2025-12-24 05:20:25', NULL),
(661, 80, 36, 'left', 1, 21, NULL, '2025-12-24 05:20:25', NULL),
(662, 80, 26, 'left', 1, 22, NULL, '2025-12-24 05:20:25', NULL),
(663, 80, 24, 'right', 1, 23, NULL, '2025-12-24 05:20:25', NULL),
(664, 80, 23, 'left', 1, 24, NULL, '2025-12-24 05:20:25', NULL),
(665, 80, 22, 'left', 1, 25, NULL, '2025-12-24 05:20:25', NULL),
(666, 80, 19, 'left', 1, 26, NULL, '2025-12-24 05:20:25', NULL),
(667, 81, 80, 'left', 1, 1, NULL, '2025-12-24 05:21:05', NULL),
(668, 81, 79, 'left', 1, 2, NULL, '2025-12-24 05:21:05', NULL),
(669, 81, 78, 'left', 1, 3, NULL, '2025-12-24 05:21:05', NULL),
(670, 81, 77, 'left', 1, 4, NULL, '2025-12-24 05:21:05', NULL),
(671, 81, 76, 'left', 1, 5, NULL, '2025-12-24 05:21:05', NULL),
(672, 81, 75, 'left', 1, 6, NULL, '2025-12-24 05:21:05', NULL),
(673, 81, 74, 'left', 1, 7, NULL, '2025-12-24 05:21:05', NULL),
(674, 81, 73, 'left', 1, 8, NULL, '2025-12-24 05:21:05', NULL),
(675, 81, 72, 'left', 1, 9, NULL, '2025-12-24 05:21:05', NULL),
(676, 81, 71, 'left', 1, 10, NULL, '2025-12-24 05:21:05', NULL),
(677, 81, 70, 'left', 1, 11, NULL, '2025-12-24 05:21:05', NULL),
(678, 81, 69, 'left', 1, 12, NULL, '2025-12-24 05:21:05', NULL),
(679, 81, 68, 'left', 1, 13, NULL, '2025-12-24 05:21:05', NULL),
(680, 81, 67, 'left', 1, 14, NULL, '2025-12-24 05:21:05', NULL),
(681, 81, 66, 'left', 1, 15, NULL, '2025-12-24 05:21:05', NULL),
(682, 81, 65, 'left', 1, 16, NULL, '2025-12-24 05:21:05', NULL),
(683, 81, 64, 'left', 1, 17, NULL, '2025-12-24 05:21:05', NULL),
(684, 81, 63, 'left', 1, 18, NULL, '2025-12-24 05:21:05', NULL),
(685, 81, 62, 'left', 1, 19, NULL, '2025-12-24 05:21:05', NULL),
(686, 81, 38, 'left', 1, 20, NULL, '2025-12-24 05:21:05', NULL),
(687, 81, 37, 'left', 1, 21, NULL, '2025-12-24 05:21:05', NULL),
(688, 81, 36, 'left', 1, 22, NULL, '2025-12-24 05:21:05', NULL),
(689, 81, 26, 'left', 1, 23, NULL, '2025-12-24 05:21:05', NULL),
(690, 81, 24, 'right', 1, 24, NULL, '2025-12-24 05:21:05', NULL),
(691, 81, 23, 'left', 1, 25, NULL, '2025-12-24 05:21:05', NULL),
(692, 81, 22, 'left', 1, 26, NULL, '2025-12-24 05:21:05', NULL),
(693, 81, 19, 'left', 1, 27, NULL, '2025-12-24 05:21:05', NULL),
(694, 82, 81, 'left', 1, 1, NULL, '2025-12-24 05:21:14', NULL),
(695, 82, 80, 'left', 1, 2, NULL, '2025-12-24 05:21:14', NULL),
(696, 82, 79, 'left', 1, 3, NULL, '2025-12-24 05:21:14', NULL),
(697, 82, 78, 'left', 1, 4, NULL, '2025-12-24 05:21:14', NULL),
(698, 82, 77, 'left', 1, 5, NULL, '2025-12-24 05:21:14', NULL),
(699, 82, 76, 'left', 1, 6, NULL, '2025-12-24 05:21:14', NULL),
(700, 82, 75, 'left', 1, 7, NULL, '2025-12-24 05:21:14', NULL),
(701, 82, 74, 'left', 1, 8, NULL, '2025-12-24 05:21:14', NULL),
(702, 82, 73, 'left', 1, 9, NULL, '2025-12-24 05:21:14', NULL),
(703, 82, 72, 'left', 1, 10, NULL, '2025-12-24 05:21:14', NULL),
(704, 82, 71, 'left', 1, 11, NULL, '2025-12-24 05:21:14', NULL),
(705, 82, 70, 'left', 1, 12, NULL, '2025-12-24 05:21:14', NULL),
(706, 82, 69, 'left', 1, 13, NULL, '2025-12-24 05:21:14', NULL),
(707, 82, 68, 'left', 1, 14, NULL, '2025-12-24 05:21:14', NULL),
(708, 82, 67, 'left', 1, 15, NULL, '2025-12-24 05:21:14', NULL),
(709, 82, 66, 'left', 1, 16, NULL, '2025-12-24 05:21:14', NULL),
(710, 82, 65, 'left', 1, 17, NULL, '2025-12-24 05:21:14', NULL),
(711, 82, 64, 'left', 1, 18, NULL, '2025-12-24 05:21:14', NULL),
(712, 82, 63, 'left', 1, 19, NULL, '2025-12-24 05:21:14', NULL),
(713, 82, 62, 'left', 1, 20, NULL, '2025-12-24 05:21:14', NULL),
(714, 82, 38, 'left', 1, 21, NULL, '2025-12-24 05:21:14', NULL),
(715, 82, 37, 'left', 1, 22, NULL, '2025-12-24 05:21:14', NULL),
(716, 82, 36, 'left', 1, 23, NULL, '2025-12-24 05:21:14', NULL),
(717, 82, 26, 'left', 1, 24, NULL, '2025-12-24 05:21:14', NULL),
(718, 82, 24, 'right', 1, 25, NULL, '2025-12-24 05:21:14', NULL),
(719, 82, 23, 'left', 1, 26, NULL, '2025-12-24 05:21:14', NULL),
(720, 82, 22, 'left', 1, 27, NULL, '2025-12-24 05:21:14', NULL),
(721, 82, 19, 'left', 1, 28, NULL, '2025-12-24 05:21:14', NULL),
(722, 83, 82, 'left', 1, 1, NULL, '2025-12-24 05:24:59', NULL),
(723, 83, 81, 'left', 1, 2, NULL, '2025-12-24 05:24:59', NULL),
(724, 83, 80, 'left', 1, 3, NULL, '2025-12-24 05:24:59', NULL),
(725, 83, 79, 'left', 1, 4, NULL, '2025-12-24 05:24:59', NULL),
(726, 83, 78, 'left', 1, 5, NULL, '2025-12-24 05:24:59', NULL),
(727, 83, 77, 'left', 1, 6, NULL, '2025-12-24 05:24:59', NULL),
(728, 83, 76, 'left', 1, 7, NULL, '2025-12-24 05:24:59', NULL),
(729, 83, 75, 'left', 1, 8, NULL, '2025-12-24 05:24:59', NULL),
(730, 83, 74, 'left', 1, 9, NULL, '2025-12-24 05:24:59', NULL),
(731, 83, 73, 'left', 1, 10, NULL, '2025-12-24 05:24:59', NULL),
(732, 83, 72, 'left', 1, 11, NULL, '2025-12-24 05:24:59', NULL),
(733, 83, 71, 'left', 1, 12, NULL, '2025-12-24 05:24:59', NULL),
(734, 83, 70, 'left', 1, 13, NULL, '2025-12-24 05:24:59', NULL),
(735, 83, 69, 'left', 1, 14, NULL, '2025-12-24 05:24:59', NULL),
(736, 83, 68, 'left', 1, 15, NULL, '2025-12-24 05:24:59', NULL),
(737, 83, 67, 'left', 1, 16, NULL, '2025-12-24 05:24:59', NULL),
(738, 83, 66, 'left', 1, 17, NULL, '2025-12-24 05:24:59', NULL),
(739, 83, 65, 'left', 1, 18, NULL, '2025-12-24 05:24:59', NULL),
(740, 83, 64, 'left', 1, 19, NULL, '2025-12-24 05:24:59', NULL),
(741, 83, 63, 'left', 1, 20, NULL, '2025-12-24 05:24:59', NULL),
(742, 83, 62, 'left', 1, 21, NULL, '2025-12-24 05:24:59', NULL),
(743, 83, 38, 'left', 1, 22, NULL, '2025-12-24 05:24:59', NULL),
(744, 83, 37, 'left', 1, 23, NULL, '2025-12-24 05:24:59', NULL),
(745, 83, 36, 'left', 1, 24, NULL, '2025-12-24 05:24:59', NULL),
(746, 83, 26, 'left', 1, 25, NULL, '2025-12-24 05:24:59', NULL),
(747, 83, 24, 'right', 1, 26, NULL, '2025-12-24 05:24:59', NULL),
(748, 83, 23, 'left', 1, 27, NULL, '2025-12-24 05:24:59', NULL),
(749, 83, 22, 'left', 1, 28, NULL, '2025-12-24 05:24:59', NULL),
(750, 83, 19, 'left', 1, 29, NULL, '2025-12-24 05:24:59', NULL),
(751, 84, 83, 'left', 1, 1, NULL, '2025-12-24 05:25:35', NULL),
(752, 84, 82, 'left', 1, 2, NULL, '2025-12-24 05:25:35', NULL),
(753, 84, 81, 'left', 1, 3, NULL, '2025-12-24 05:25:35', NULL),
(754, 84, 80, 'left', 1, 4, NULL, '2025-12-24 05:25:35', NULL),
(755, 84, 79, 'left', 1, 5, NULL, '2025-12-24 05:25:35', NULL),
(756, 84, 78, 'left', 1, 6, NULL, '2025-12-24 05:25:35', NULL),
(757, 84, 77, 'left', 1, 7, NULL, '2025-12-24 05:25:35', NULL),
(758, 84, 76, 'left', 1, 8, NULL, '2025-12-24 05:25:35', NULL),
(759, 84, 75, 'left', 1, 9, NULL, '2025-12-24 05:25:35', NULL),
(760, 84, 74, 'left', 1, 10, NULL, '2025-12-24 05:25:35', NULL),
(761, 84, 73, 'left', 1, 11, NULL, '2025-12-24 05:25:35', NULL),
(762, 84, 72, 'left', 1, 12, NULL, '2025-12-24 05:25:35', NULL),
(763, 84, 71, 'left', 1, 13, NULL, '2025-12-24 05:25:35', NULL),
(764, 84, 70, 'left', 1, 14, NULL, '2025-12-24 05:25:35', NULL),
(765, 84, 69, 'left', 1, 15, NULL, '2025-12-24 05:25:35', NULL),
(766, 84, 68, 'left', 1, 16, NULL, '2025-12-24 05:25:35', NULL),
(767, 84, 67, 'left', 1, 17, NULL, '2025-12-24 05:25:35', NULL),
(768, 84, 66, 'left', 1, 18, NULL, '2025-12-24 05:25:35', NULL),
(769, 84, 65, 'left', 1, 19, NULL, '2025-12-24 05:25:35', NULL),
(770, 84, 64, 'left', 1, 20, NULL, '2025-12-24 05:25:35', NULL),
(771, 84, 63, 'left', 1, 21, NULL, '2025-12-24 05:25:35', NULL),
(772, 84, 62, 'left', 1, 22, NULL, '2025-12-24 05:25:35', NULL),
(773, 84, 38, 'left', 1, 23, NULL, '2025-12-24 05:25:35', NULL),
(774, 84, 37, 'left', 1, 24, NULL, '2025-12-24 05:25:35', NULL),
(775, 84, 36, 'left', 1, 25, NULL, '2025-12-24 05:25:35', NULL),
(776, 84, 26, 'left', 1, 26, NULL, '2025-12-24 05:25:35', NULL),
(777, 84, 24, 'right', 1, 27, NULL, '2025-12-24 05:25:35', NULL),
(778, 84, 23, 'left', 1, 28, NULL, '2025-12-24 05:25:35', NULL),
(779, 84, 22, 'left', 1, 29, NULL, '2025-12-24 05:25:35', NULL),
(780, 84, 19, 'left', 1, 30, NULL, '2025-12-24 05:25:35', NULL),
(781, 85, 84, 'left', 1, 1, NULL, '2025-12-24 05:25:44', NULL),
(782, 85, 83, 'left', 1, 2, NULL, '2025-12-24 05:25:44', NULL),
(783, 85, 82, 'left', 1, 3, NULL, '2025-12-24 05:25:44', NULL),
(784, 85, 81, 'left', 1, 4, NULL, '2025-12-24 05:25:44', NULL),
(785, 85, 80, 'left', 1, 5, NULL, '2025-12-24 05:25:44', NULL),
(786, 85, 79, 'left', 1, 6, NULL, '2025-12-24 05:25:44', NULL),
(787, 85, 78, 'left', 1, 7, NULL, '2025-12-24 05:25:44', NULL),
(788, 85, 77, 'left', 1, 8, NULL, '2025-12-24 05:25:44', NULL),
(789, 85, 76, 'left', 1, 9, NULL, '2025-12-24 05:25:44', NULL),
(790, 85, 75, 'left', 1, 10, NULL, '2025-12-24 05:25:44', NULL),
(791, 85, 74, 'left', 1, 11, NULL, '2025-12-24 05:25:44', NULL),
(792, 85, 73, 'left', 1, 12, NULL, '2025-12-24 05:25:44', NULL),
(793, 85, 72, 'left', 1, 13, NULL, '2025-12-24 05:25:44', NULL),
(794, 85, 71, 'left', 1, 14, NULL, '2025-12-24 05:25:44', NULL),
(795, 85, 70, 'left', 1, 15, NULL, '2025-12-24 05:25:44', NULL),
(796, 85, 69, 'left', 1, 16, NULL, '2025-12-24 05:25:44', NULL),
(797, 85, 68, 'left', 1, 17, NULL, '2025-12-24 05:25:44', NULL),
(798, 85, 67, 'left', 1, 18, NULL, '2025-12-24 05:25:44', NULL),
(799, 85, 66, 'left', 1, 19, NULL, '2025-12-24 05:25:44', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(800, 85, 65, 'left', 1, 20, NULL, '2025-12-24 05:25:44', NULL),
(801, 85, 64, 'left', 1, 21, NULL, '2025-12-24 05:25:44', NULL),
(802, 85, 63, 'left', 1, 22, NULL, '2025-12-24 05:25:44', NULL),
(803, 85, 62, 'left', 1, 23, NULL, '2025-12-24 05:25:44', NULL),
(804, 85, 38, 'left', 1, 24, NULL, '2025-12-24 05:25:44', NULL),
(805, 85, 37, 'left', 1, 25, NULL, '2025-12-24 05:25:44', NULL),
(806, 85, 36, 'left', 1, 26, NULL, '2025-12-24 05:25:44', NULL),
(807, 85, 26, 'left', 1, 27, NULL, '2025-12-24 05:25:44', NULL),
(808, 85, 24, 'right', 1, 28, NULL, '2025-12-24 05:25:44', NULL),
(809, 85, 23, 'left', 1, 29, NULL, '2025-12-24 05:25:44', NULL),
(810, 85, 22, 'left', 1, 30, NULL, '2025-12-24 05:25:44', NULL),
(811, 85, 19, 'left', 1, 31, NULL, '2025-12-24 05:25:44', NULL),
(812, 86, 85, 'left', 1, 1, NULL, '2025-12-24 05:26:56', NULL),
(813, 86, 84, 'left', 1, 2, NULL, '2025-12-24 05:26:56', NULL),
(814, 86, 83, 'left', 1, 3, NULL, '2025-12-24 05:26:56', NULL),
(815, 86, 82, 'left', 1, 4, NULL, '2025-12-24 05:26:56', NULL),
(816, 86, 81, 'left', 1, 5, NULL, '2025-12-24 05:26:56', NULL),
(817, 86, 80, 'left', 1, 6, NULL, '2025-12-24 05:26:56', NULL),
(818, 86, 79, 'left', 1, 7, NULL, '2025-12-24 05:26:56', NULL),
(819, 86, 78, 'left', 1, 8, NULL, '2025-12-24 05:26:56', NULL),
(820, 86, 77, 'left', 1, 9, NULL, '2025-12-24 05:26:56', NULL),
(821, 86, 76, 'left', 1, 10, NULL, '2025-12-24 05:26:56', NULL),
(822, 86, 75, 'left', 1, 11, NULL, '2025-12-24 05:26:56', NULL),
(823, 86, 74, 'left', 1, 12, NULL, '2025-12-24 05:26:56', NULL),
(824, 86, 73, 'left', 1, 13, NULL, '2025-12-24 05:26:56', NULL),
(825, 86, 72, 'left', 1, 14, NULL, '2025-12-24 05:26:56', NULL),
(826, 86, 71, 'left', 1, 15, NULL, '2025-12-24 05:26:56', NULL),
(827, 86, 70, 'left', 1, 16, NULL, '2025-12-24 05:26:56', NULL),
(828, 86, 69, 'left', 1, 17, NULL, '2025-12-24 05:26:56', NULL),
(829, 86, 68, 'left', 1, 18, NULL, '2025-12-24 05:26:56', NULL),
(830, 86, 67, 'left', 1, 19, NULL, '2025-12-24 05:26:56', NULL),
(831, 86, 66, 'left', 1, 20, NULL, '2025-12-24 05:26:56', NULL),
(832, 86, 65, 'left', 1, 21, NULL, '2025-12-24 05:26:56', NULL),
(833, 86, 64, 'left', 1, 22, NULL, '2025-12-24 05:26:56', NULL),
(834, 86, 63, 'left', 1, 23, NULL, '2025-12-24 05:26:56', NULL),
(835, 86, 62, 'left', 1, 24, NULL, '2025-12-24 05:26:56', NULL),
(836, 86, 38, 'left', 1, 25, NULL, '2025-12-24 05:26:56', NULL),
(837, 86, 37, 'left', 1, 26, NULL, '2025-12-24 05:26:56', NULL),
(838, 86, 36, 'left', 1, 27, NULL, '2025-12-24 05:26:56', NULL),
(839, 86, 26, 'left', 1, 28, NULL, '2025-12-24 05:26:56', NULL),
(840, 86, 24, 'right', 1, 29, NULL, '2025-12-24 05:26:56', NULL),
(841, 86, 23, 'left', 1, 30, NULL, '2025-12-24 05:26:56', NULL),
(842, 86, 22, 'left', 1, 31, NULL, '2025-12-24 05:26:56', NULL),
(843, 86, 19, 'left', 1, 32, NULL, '2025-12-24 05:26:56', NULL),
(844, 87, 86, 'left', 1, 1, NULL, '2025-12-24 05:27:28', NULL),
(845, 87, 85, 'left', 1, 2, NULL, '2025-12-24 05:27:28', NULL),
(846, 87, 84, 'left', 1, 3, NULL, '2025-12-24 05:27:28', NULL),
(847, 87, 83, 'left', 1, 4, NULL, '2025-12-24 05:27:28', NULL),
(848, 87, 82, 'left', 1, 5, NULL, '2025-12-24 05:27:28', NULL),
(849, 87, 81, 'left', 1, 6, NULL, '2025-12-24 05:27:28', NULL),
(850, 87, 80, 'left', 1, 7, NULL, '2025-12-24 05:27:28', NULL),
(851, 87, 79, 'left', 1, 8, NULL, '2025-12-24 05:27:28', NULL),
(852, 87, 78, 'left', 1, 9, NULL, '2025-12-24 05:27:28', NULL),
(853, 87, 77, 'left', 1, 10, NULL, '2025-12-24 05:27:28', NULL),
(854, 87, 76, 'left', 1, 11, NULL, '2025-12-24 05:27:28', NULL),
(855, 87, 75, 'left', 1, 12, NULL, '2025-12-24 05:27:28', NULL),
(856, 87, 74, 'left', 1, 13, NULL, '2025-12-24 05:27:28', NULL),
(857, 87, 73, 'left', 1, 14, NULL, '2025-12-24 05:27:28', NULL),
(858, 87, 72, 'left', 1, 15, NULL, '2025-12-24 05:27:28', NULL),
(859, 87, 71, 'left', 1, 16, NULL, '2025-12-24 05:27:28', NULL),
(860, 87, 70, 'left', 1, 17, NULL, '2025-12-24 05:27:28', NULL),
(861, 87, 69, 'left', 1, 18, NULL, '2025-12-24 05:27:28', NULL),
(862, 87, 68, 'left', 1, 19, NULL, '2025-12-24 05:27:28', NULL),
(863, 87, 67, 'left', 1, 20, NULL, '2025-12-24 05:27:28', NULL),
(864, 87, 66, 'left', 1, 21, NULL, '2025-12-24 05:27:28', NULL),
(865, 87, 65, 'left', 1, 22, NULL, '2025-12-24 05:27:28', NULL),
(866, 87, 64, 'left', 1, 23, NULL, '2025-12-24 05:27:28', NULL),
(867, 87, 63, 'left', 1, 24, NULL, '2025-12-24 05:27:28', NULL),
(868, 87, 62, 'left', 1, 25, NULL, '2025-12-24 05:27:28', NULL),
(869, 87, 38, 'left', 1, 26, NULL, '2025-12-24 05:27:28', NULL),
(870, 87, 37, 'left', 1, 27, NULL, '2025-12-24 05:27:28', NULL),
(871, 87, 36, 'left', 1, 28, NULL, '2025-12-24 05:27:28', NULL),
(872, 87, 26, 'left', 1, 29, NULL, '2025-12-24 05:27:28', NULL),
(873, 87, 24, 'right', 1, 30, NULL, '2025-12-24 05:27:28', NULL),
(874, 87, 23, 'left', 1, 31, NULL, '2025-12-24 05:27:28', NULL),
(875, 87, 22, 'left', 1, 32, NULL, '2025-12-24 05:27:28', NULL),
(876, 87, 19, 'left', 1, 33, NULL, '2025-12-24 05:27:28', NULL),
(877, 88, 87, 'left', 1, 1, NULL, '2025-12-24 05:27:36', NULL),
(878, 88, 86, 'left', 1, 2, NULL, '2025-12-24 05:27:36', NULL),
(879, 88, 85, 'left', 1, 3, NULL, '2025-12-24 05:27:36', NULL),
(880, 88, 84, 'left', 1, 4, NULL, '2025-12-24 05:27:36', NULL),
(881, 88, 83, 'left', 1, 5, NULL, '2025-12-24 05:27:36', NULL),
(882, 88, 82, 'left', 1, 6, NULL, '2025-12-24 05:27:36', NULL),
(883, 88, 81, 'left', 1, 7, NULL, '2025-12-24 05:27:36', NULL),
(884, 88, 80, 'left', 1, 8, NULL, '2025-12-24 05:27:36', NULL),
(885, 88, 79, 'left', 1, 9, NULL, '2025-12-24 05:27:36', NULL),
(886, 88, 78, 'left', 1, 10, NULL, '2025-12-24 05:27:36', NULL),
(887, 88, 77, 'left', 1, 11, NULL, '2025-12-24 05:27:36', NULL),
(888, 88, 76, 'left', 1, 12, NULL, '2025-12-24 05:27:36', NULL),
(889, 88, 75, 'left', 1, 13, NULL, '2025-12-24 05:27:36', NULL),
(890, 88, 74, 'left', 1, 14, NULL, '2025-12-24 05:27:36', NULL),
(891, 88, 73, 'left', 1, 15, NULL, '2025-12-24 05:27:36', NULL),
(892, 88, 72, 'left', 1, 16, NULL, '2025-12-24 05:27:36', NULL),
(893, 88, 71, 'left', 1, 17, NULL, '2025-12-24 05:27:36', NULL),
(894, 88, 70, 'left', 1, 18, NULL, '2025-12-24 05:27:36', NULL),
(895, 88, 69, 'left', 1, 19, NULL, '2025-12-24 05:27:36', NULL),
(896, 88, 68, 'left', 1, 20, NULL, '2025-12-24 05:27:36', NULL),
(897, 88, 67, 'left', 1, 21, NULL, '2025-12-24 05:27:36', NULL),
(898, 88, 66, 'left', 1, 22, NULL, '2025-12-24 05:27:36', NULL),
(899, 88, 65, 'left', 1, 23, NULL, '2025-12-24 05:27:36', NULL),
(900, 88, 64, 'left', 1, 24, NULL, '2025-12-24 05:27:36', NULL),
(901, 88, 63, 'left', 1, 25, NULL, '2025-12-24 05:27:36', NULL),
(902, 88, 62, 'left', 1, 26, NULL, '2025-12-24 05:27:36', NULL),
(903, 88, 38, 'left', 1, 27, NULL, '2025-12-24 05:27:36', NULL),
(904, 88, 37, 'left', 1, 28, NULL, '2025-12-24 05:27:36', NULL),
(905, 88, 36, 'left', 1, 29, NULL, '2025-12-24 05:27:36', NULL),
(906, 88, 26, 'left', 1, 30, NULL, '2025-12-24 05:27:36', NULL),
(907, 88, 24, 'right', 1, 31, NULL, '2025-12-24 05:27:36', NULL),
(908, 88, 23, 'left', 1, 32, NULL, '2025-12-24 05:27:36', NULL),
(909, 88, 22, 'left', 1, 33, NULL, '2025-12-24 05:27:36', NULL),
(910, 88, 19, 'left', 1, 34, NULL, '2025-12-24 05:27:36', NULL),
(911, 105, 88, 'left', 1, 1, NULL, '2025-12-24 05:29:36', NULL),
(912, 105, 87, 'left', 1, 2, NULL, '2025-12-24 05:29:36', NULL),
(913, 105, 86, 'left', 1, 3, NULL, '2025-12-24 05:29:36', NULL),
(914, 105, 85, 'left', 1, 4, NULL, '2025-12-24 05:29:36', NULL),
(915, 105, 84, 'left', 1, 5, NULL, '2025-12-24 05:29:36', NULL),
(916, 105, 83, 'left', 1, 6, NULL, '2025-12-24 05:29:36', NULL),
(917, 105, 82, 'left', 1, 7, NULL, '2025-12-24 05:29:36', NULL),
(918, 105, 81, 'left', 1, 8, NULL, '2025-12-24 05:29:36', NULL),
(919, 105, 80, 'left', 1, 9, NULL, '2025-12-24 05:29:36', NULL),
(920, 105, 79, 'left', 1, 10, NULL, '2025-12-24 05:29:36', NULL),
(921, 105, 78, 'left', 1, 11, NULL, '2025-12-24 05:29:36', NULL),
(922, 105, 77, 'left', 1, 12, NULL, '2025-12-24 05:29:36', NULL),
(923, 105, 76, 'left', 1, 13, NULL, '2025-12-24 05:29:36', NULL),
(924, 105, 75, 'left', 1, 14, NULL, '2025-12-24 05:29:36', NULL),
(925, 105, 74, 'left', 1, 15, NULL, '2025-12-24 05:29:36', NULL),
(926, 105, 73, 'left', 1, 16, NULL, '2025-12-24 05:29:36', NULL),
(927, 105, 72, 'left', 1, 17, NULL, '2025-12-24 05:29:36', NULL),
(928, 105, 71, 'left', 1, 18, NULL, '2025-12-24 05:29:36', NULL),
(929, 105, 70, 'left', 1, 19, NULL, '2025-12-24 05:29:36', NULL),
(930, 105, 69, 'left', 1, 20, NULL, '2025-12-24 05:29:36', NULL),
(931, 105, 68, 'left', 1, 21, NULL, '2025-12-24 05:29:36', NULL),
(932, 105, 67, 'left', 1, 22, NULL, '2025-12-24 05:29:36', NULL),
(933, 105, 66, 'left', 1, 23, NULL, '2025-12-24 05:29:36', NULL),
(934, 105, 65, 'left', 1, 24, NULL, '2025-12-24 05:29:36', NULL),
(935, 105, 64, 'left', 1, 25, NULL, '2025-12-24 05:29:36', NULL),
(936, 105, 63, 'left', 1, 26, NULL, '2025-12-24 05:29:36', NULL),
(937, 105, 62, 'left', 1, 27, NULL, '2025-12-24 05:29:36', NULL),
(938, 105, 38, 'left', 1, 28, NULL, '2025-12-24 05:29:36', NULL),
(939, 105, 37, 'left', 1, 29, NULL, '2025-12-24 05:29:36', NULL),
(940, 105, 36, 'left', 1, 30, NULL, '2025-12-24 05:29:36', NULL),
(941, 105, 26, 'left', 1, 31, NULL, '2025-12-24 05:29:36', NULL),
(942, 105, 24, 'right', 1, 32, NULL, '2025-12-24 05:29:36', NULL),
(943, 105, 23, 'left', 1, 33, NULL, '2025-12-24 05:29:36', NULL),
(944, 105, 22, 'left', 1, 34, NULL, '2025-12-24 05:29:36', NULL),
(945, 105, 19, 'left', 1, 35, NULL, '2025-12-24 05:29:36', NULL),
(946, 106, 105, 'left', 1, 1, NULL, '2025-12-24 05:30:05', NULL),
(947, 106, 88, 'left', 1, 2, NULL, '2025-12-24 05:30:05', NULL),
(948, 106, 87, 'left', 1, 3, NULL, '2025-12-24 05:30:05', NULL),
(949, 106, 86, 'left', 1, 4, NULL, '2025-12-24 05:30:05', NULL),
(950, 106, 85, 'left', 1, 5, NULL, '2025-12-24 05:30:05', NULL),
(951, 106, 84, 'left', 1, 6, NULL, '2025-12-24 05:30:05', NULL),
(952, 106, 83, 'left', 1, 7, NULL, '2025-12-24 05:30:05', NULL),
(953, 106, 82, 'left', 1, 8, NULL, '2025-12-24 05:30:05', NULL),
(954, 106, 81, 'left', 1, 9, NULL, '2025-12-24 05:30:05', NULL),
(955, 106, 80, 'left', 1, 10, NULL, '2025-12-24 05:30:05', NULL),
(956, 106, 79, 'left', 1, 11, NULL, '2025-12-24 05:30:05', NULL),
(957, 106, 78, 'left', 1, 12, NULL, '2025-12-24 05:30:05', NULL),
(958, 106, 77, 'left', 1, 13, NULL, '2025-12-24 05:30:05', NULL),
(959, 106, 76, 'left', 1, 14, NULL, '2025-12-24 05:30:05', NULL),
(960, 106, 75, 'left', 1, 15, NULL, '2025-12-24 05:30:05', NULL),
(961, 106, 74, 'left', 1, 16, NULL, '2025-12-24 05:30:05', NULL),
(962, 106, 73, 'left', 1, 17, NULL, '2025-12-24 05:30:05', NULL),
(963, 106, 72, 'left', 1, 18, NULL, '2025-12-24 05:30:05', NULL),
(964, 106, 71, 'left', 1, 19, NULL, '2025-12-24 05:30:05', NULL),
(965, 106, 70, 'left', 1, 20, NULL, '2025-12-24 05:30:05', NULL),
(966, 106, 69, 'left', 1, 21, NULL, '2025-12-24 05:30:05', NULL),
(967, 106, 68, 'left', 1, 22, NULL, '2025-12-24 05:30:05', NULL),
(968, 106, 67, 'left', 1, 23, NULL, '2025-12-24 05:30:05', NULL),
(969, 106, 66, 'left', 1, 24, NULL, '2025-12-24 05:30:05', NULL),
(970, 106, 65, 'left', 1, 25, NULL, '2025-12-24 05:30:05', NULL),
(971, 106, 64, 'left', 1, 26, NULL, '2025-12-24 05:30:05', NULL),
(972, 106, 63, 'left', 1, 27, NULL, '2025-12-24 05:30:05', NULL),
(973, 106, 62, 'left', 1, 28, NULL, '2025-12-24 05:30:05', NULL),
(974, 106, 38, 'left', 1, 29, NULL, '2025-12-24 05:30:05', NULL),
(975, 106, 37, 'left', 1, 30, NULL, '2025-12-24 05:30:05', NULL),
(976, 106, 36, 'left', 1, 31, NULL, '2025-12-24 05:30:05', NULL),
(977, 106, 26, 'left', 1, 32, NULL, '2025-12-24 05:30:05', NULL),
(978, 106, 24, 'right', 1, 33, NULL, '2025-12-24 05:30:05', NULL),
(979, 106, 23, 'left', 1, 34, NULL, '2025-12-24 05:30:05', NULL),
(980, 106, 22, 'left', 1, 35, NULL, '2025-12-24 05:30:05', NULL),
(981, 106, 19, 'left', 1, 36, NULL, '2025-12-24 05:30:05', NULL),
(982, 107, 106, 'left', 1, 1, NULL, '2025-12-24 05:30:14', NULL),
(983, 107, 105, 'left', 1, 2, NULL, '2025-12-24 05:30:14', NULL),
(984, 107, 88, 'left', 1, 3, NULL, '2025-12-24 05:30:14', NULL),
(985, 107, 87, 'left', 1, 4, NULL, '2025-12-24 05:30:14', NULL),
(986, 107, 86, 'left', 1, 5, NULL, '2025-12-24 05:30:14', NULL),
(987, 107, 85, 'left', 1, 6, NULL, '2025-12-24 05:30:14', NULL),
(988, 107, 84, 'left', 1, 7, NULL, '2025-12-24 05:30:14', NULL),
(989, 107, 83, 'left', 1, 8, NULL, '2025-12-24 05:30:14', NULL),
(990, 107, 82, 'left', 1, 9, NULL, '2025-12-24 05:30:14', NULL),
(991, 107, 81, 'left', 1, 10, NULL, '2025-12-24 05:30:14', NULL),
(992, 107, 80, 'left', 1, 11, NULL, '2025-12-24 05:30:14', NULL),
(993, 107, 79, 'left', 1, 12, NULL, '2025-12-24 05:30:14', NULL),
(994, 107, 78, 'left', 1, 13, NULL, '2025-12-24 05:30:14', NULL),
(995, 107, 77, 'left', 1, 14, NULL, '2025-12-24 05:30:14', NULL),
(996, 107, 76, 'left', 1, 15, NULL, '2025-12-24 05:30:14', NULL),
(997, 107, 75, 'left', 1, 16, NULL, '2025-12-24 05:30:14', NULL),
(998, 107, 74, 'left', 1, 17, NULL, '2025-12-24 05:30:14', NULL),
(999, 107, 73, 'left', 1, 18, NULL, '2025-12-24 05:30:14', NULL),
(1000, 107, 72, 'left', 1, 19, NULL, '2025-12-24 05:30:14', NULL),
(1001, 107, 71, 'left', 1, 20, NULL, '2025-12-24 05:30:14', NULL),
(1002, 107, 70, 'left', 1, 21, NULL, '2025-12-24 05:30:14', NULL),
(1003, 107, 69, 'left', 1, 22, NULL, '2025-12-24 05:30:14', NULL),
(1004, 107, 68, 'left', 1, 23, NULL, '2025-12-24 05:30:14', NULL),
(1005, 107, 67, 'left', 1, 24, NULL, '2025-12-24 05:30:14', NULL),
(1006, 107, 66, 'left', 1, 25, NULL, '2025-12-24 05:30:14', NULL),
(1007, 107, 65, 'left', 1, 26, NULL, '2025-12-24 05:30:14', NULL),
(1008, 107, 64, 'left', 1, 27, NULL, '2025-12-24 05:30:14', NULL),
(1009, 107, 63, 'left', 1, 28, NULL, '2025-12-24 05:30:14', NULL),
(1010, 107, 62, 'left', 1, 29, NULL, '2025-12-24 05:30:14', NULL),
(1011, 107, 38, 'left', 1, 30, NULL, '2025-12-24 05:30:14', NULL),
(1012, 107, 37, 'left', 1, 31, NULL, '2025-12-24 05:30:14', NULL),
(1013, 107, 36, 'left', 1, 32, NULL, '2025-12-24 05:30:14', NULL),
(1014, 107, 26, 'left', 1, 33, NULL, '2025-12-24 05:30:14', NULL),
(1015, 107, 24, 'right', 1, 34, NULL, '2025-12-24 05:30:14', NULL),
(1016, 107, 23, 'left', 1, 35, NULL, '2025-12-24 05:30:14', NULL),
(1017, 107, 22, 'left', 1, 36, NULL, '2025-12-24 05:30:14', NULL),
(1018, 107, 19, 'left', 1, 37, NULL, '2025-12-24 05:30:14', NULL),
(1019, 108, 107, 'left', 1, 1, NULL, '2025-12-24 05:31:40', NULL),
(1020, 108, 106, 'left', 1, 2, NULL, '2025-12-24 05:31:40', NULL),
(1021, 108, 105, 'left', 1, 3, NULL, '2025-12-24 05:31:40', NULL),
(1022, 108, 88, 'left', 1, 4, NULL, '2025-12-24 05:31:40', NULL),
(1023, 108, 87, 'left', 1, 5, NULL, '2025-12-24 05:31:40', NULL),
(1024, 108, 86, 'left', 1, 6, NULL, '2025-12-24 05:31:40', NULL),
(1025, 108, 85, 'left', 1, 7, NULL, '2025-12-24 05:31:40', NULL),
(1026, 108, 84, 'left', 1, 8, NULL, '2025-12-24 05:31:40', NULL),
(1027, 108, 83, 'left', 1, 9, NULL, '2025-12-24 05:31:40', NULL),
(1028, 108, 82, 'left', 1, 10, NULL, '2025-12-24 05:31:40', NULL),
(1029, 108, 81, 'left', 1, 11, NULL, '2025-12-24 05:31:40', NULL),
(1030, 108, 80, 'left', 1, 12, NULL, '2025-12-24 05:31:40', NULL),
(1031, 108, 79, 'left', 1, 13, NULL, '2025-12-24 05:31:40', NULL),
(1032, 108, 78, 'left', 1, 14, NULL, '2025-12-24 05:31:40', NULL),
(1033, 108, 77, 'left', 1, 15, NULL, '2025-12-24 05:31:40', NULL),
(1034, 108, 76, 'left', 1, 16, NULL, '2025-12-24 05:31:40', NULL),
(1035, 108, 75, 'left', 1, 17, NULL, '2025-12-24 05:31:40', NULL),
(1036, 108, 74, 'left', 1, 18, NULL, '2025-12-24 05:31:40', NULL),
(1037, 108, 73, 'left', 1, 19, NULL, '2025-12-24 05:31:40', NULL),
(1038, 108, 72, 'left', 1, 20, NULL, '2025-12-24 05:31:40', NULL),
(1039, 108, 71, 'left', 1, 21, NULL, '2025-12-24 05:31:40', NULL),
(1040, 108, 70, 'left', 1, 22, NULL, '2025-12-24 05:31:40', NULL),
(1041, 108, 69, 'left', 1, 23, NULL, '2025-12-24 05:31:40', NULL),
(1042, 108, 68, 'left', 1, 24, NULL, '2025-12-24 05:31:40', NULL),
(1043, 108, 67, 'left', 1, 25, NULL, '2025-12-24 05:31:40', NULL),
(1044, 108, 66, 'left', 1, 26, NULL, '2025-12-24 05:31:40', NULL),
(1045, 108, 65, 'left', 1, 27, NULL, '2025-12-24 05:31:40', NULL),
(1046, 108, 64, 'left', 1, 28, NULL, '2025-12-24 05:31:40', NULL),
(1047, 108, 63, 'left', 1, 29, NULL, '2025-12-24 05:31:40', NULL),
(1048, 108, 62, 'left', 1, 30, NULL, '2025-12-24 05:31:40', NULL),
(1049, 108, 38, 'left', 1, 31, NULL, '2025-12-24 05:31:40', NULL),
(1050, 108, 37, 'left', 1, 32, NULL, '2025-12-24 05:31:40', NULL),
(1051, 108, 36, 'left', 1, 33, NULL, '2025-12-24 05:31:40', NULL),
(1052, 108, 26, 'left', 1, 34, NULL, '2025-12-24 05:31:40', NULL),
(1053, 108, 24, 'right', 1, 35, NULL, '2025-12-24 05:31:40', NULL),
(1054, 108, 23, 'left', 1, 36, NULL, '2025-12-24 05:31:40', NULL),
(1055, 108, 22, 'left', 1, 37, NULL, '2025-12-24 05:31:40', NULL),
(1056, 108, 19, 'left', 1, 38, NULL, '2025-12-24 05:31:40', NULL),
(1057, 109, 108, 'left', 1, 1, NULL, '2025-12-24 05:32:21', NULL),
(1058, 109, 107, 'left', 1, 2, NULL, '2025-12-24 05:32:21', NULL),
(1059, 109, 106, 'left', 1, 3, NULL, '2025-12-24 05:32:21', NULL),
(1060, 109, 105, 'left', 1, 4, NULL, '2025-12-24 05:32:21', NULL),
(1061, 109, 88, 'left', 1, 5, NULL, '2025-12-24 05:32:21', NULL),
(1062, 109, 87, 'left', 1, 6, NULL, '2025-12-24 05:32:21', NULL),
(1063, 109, 86, 'left', 1, 7, NULL, '2025-12-24 05:32:21', NULL),
(1064, 109, 85, 'left', 1, 8, NULL, '2025-12-24 05:32:21', NULL),
(1065, 109, 84, 'left', 1, 9, NULL, '2025-12-24 05:32:21', NULL),
(1066, 109, 83, 'left', 1, 10, NULL, '2025-12-24 05:32:21', NULL),
(1067, 109, 82, 'left', 1, 11, NULL, '2025-12-24 05:32:21', NULL),
(1068, 109, 81, 'left', 1, 12, NULL, '2025-12-24 05:32:21', NULL),
(1069, 109, 80, 'left', 1, 13, NULL, '2025-12-24 05:32:21', NULL),
(1070, 109, 79, 'left', 1, 14, NULL, '2025-12-24 05:32:21', NULL),
(1071, 109, 78, 'left', 1, 15, NULL, '2025-12-24 05:32:21', NULL),
(1072, 109, 77, 'left', 1, 16, NULL, '2025-12-24 05:32:21', NULL),
(1073, 109, 76, 'left', 1, 17, NULL, '2025-12-24 05:32:21', NULL),
(1074, 109, 75, 'left', 1, 18, NULL, '2025-12-24 05:32:21', NULL),
(1075, 109, 74, 'left', 1, 19, NULL, '2025-12-24 05:32:21', NULL),
(1076, 109, 73, 'left', 1, 20, NULL, '2025-12-24 05:32:21', NULL),
(1077, 109, 72, 'left', 1, 21, NULL, '2025-12-24 05:32:21', NULL),
(1078, 109, 71, 'left', 1, 22, NULL, '2025-12-24 05:32:21', NULL),
(1079, 109, 70, 'left', 1, 23, NULL, '2025-12-24 05:32:21', NULL),
(1080, 109, 69, 'left', 1, 24, NULL, '2025-12-24 05:32:21', NULL),
(1081, 109, 68, 'left', 1, 25, NULL, '2025-12-24 05:32:21', NULL),
(1082, 109, 67, 'left', 1, 26, NULL, '2025-12-24 05:32:21', NULL),
(1083, 109, 66, 'left', 1, 27, NULL, '2025-12-24 05:32:21', NULL),
(1084, 109, 65, 'left', 1, 28, NULL, '2025-12-24 05:32:21', NULL),
(1085, 109, 64, 'left', 1, 29, NULL, '2025-12-24 05:32:21', NULL),
(1086, 109, 63, 'left', 1, 30, NULL, '2025-12-24 05:32:21', NULL),
(1087, 109, 62, 'left', 1, 31, NULL, '2025-12-24 05:32:21', NULL),
(1088, 109, 38, 'left', 1, 32, NULL, '2025-12-24 05:32:21', NULL),
(1089, 109, 37, 'left', 1, 33, NULL, '2025-12-24 05:32:21', NULL),
(1090, 109, 36, 'left', 1, 34, NULL, '2025-12-24 05:32:21', NULL),
(1091, 109, 26, 'left', 1, 35, NULL, '2025-12-24 05:32:21', NULL),
(1092, 109, 24, 'right', 1, 36, NULL, '2025-12-24 05:32:21', NULL),
(1093, 109, 23, 'left', 1, 37, NULL, '2025-12-24 05:32:21', NULL),
(1094, 109, 22, 'left', 1, 38, NULL, '2025-12-24 05:32:21', NULL),
(1095, 109, 19, 'left', 1, 39, NULL, '2025-12-24 05:32:21', NULL),
(1096, 110, 109, 'left', 1, 1, NULL, '2025-12-24 05:32:29', NULL),
(1097, 110, 108, 'left', 1, 2, NULL, '2025-12-24 05:32:29', NULL),
(1098, 110, 107, 'left', 1, 3, NULL, '2025-12-24 05:32:29', NULL),
(1099, 110, 106, 'left', 1, 4, NULL, '2025-12-24 05:32:29', NULL),
(1100, 110, 105, 'left', 1, 5, NULL, '2025-12-24 05:32:29', NULL),
(1101, 110, 88, 'left', 1, 6, NULL, '2025-12-24 05:32:29', NULL),
(1102, 110, 87, 'left', 1, 7, NULL, '2025-12-24 05:32:29', NULL),
(1103, 110, 86, 'left', 1, 8, NULL, '2025-12-24 05:32:29', NULL),
(1104, 110, 85, 'left', 1, 9, NULL, '2025-12-24 05:32:29', NULL),
(1105, 110, 84, 'left', 1, 10, NULL, '2025-12-24 05:32:29', NULL),
(1106, 110, 83, 'left', 1, 11, NULL, '2025-12-24 05:32:29', NULL),
(1107, 110, 82, 'left', 1, 12, NULL, '2025-12-24 05:32:29', NULL),
(1108, 110, 81, 'left', 1, 13, NULL, '2025-12-24 05:32:29', NULL),
(1109, 110, 80, 'left', 1, 14, NULL, '2025-12-24 05:32:29', NULL),
(1110, 110, 79, 'left', 1, 15, NULL, '2025-12-24 05:32:29', NULL),
(1111, 110, 78, 'left', 1, 16, NULL, '2025-12-24 05:32:29', NULL),
(1112, 110, 77, 'left', 1, 17, NULL, '2025-12-24 05:32:29', NULL),
(1113, 110, 76, 'left', 1, 18, NULL, '2025-12-24 05:32:29', NULL),
(1114, 110, 75, 'left', 1, 19, NULL, '2025-12-24 05:32:29', NULL),
(1115, 110, 74, 'left', 1, 20, NULL, '2025-12-24 05:32:29', NULL),
(1116, 110, 73, 'left', 1, 21, NULL, '2025-12-24 05:32:29', NULL),
(1117, 110, 72, 'left', 1, 22, NULL, '2025-12-24 05:32:29', NULL),
(1118, 110, 71, 'left', 1, 23, NULL, '2025-12-24 05:32:29', NULL),
(1119, 110, 70, 'left', 1, 24, NULL, '2025-12-24 05:32:29', NULL),
(1120, 110, 69, 'left', 1, 25, NULL, '2025-12-24 05:32:29', NULL),
(1121, 110, 68, 'left', 1, 26, NULL, '2025-12-24 05:32:29', NULL),
(1122, 110, 67, 'left', 1, 27, NULL, '2025-12-24 05:32:29', NULL),
(1123, 110, 66, 'left', 1, 28, NULL, '2025-12-24 05:32:29', NULL),
(1124, 110, 65, 'left', 1, 29, NULL, '2025-12-24 05:32:29', NULL),
(1125, 110, 64, 'left', 1, 30, NULL, '2025-12-24 05:32:29', NULL),
(1126, 110, 63, 'left', 1, 31, NULL, '2025-12-24 05:32:29', NULL),
(1127, 110, 62, 'left', 1, 32, NULL, '2025-12-24 05:32:29', NULL),
(1128, 110, 38, 'left', 1, 33, NULL, '2025-12-24 05:32:29', NULL),
(1129, 110, 37, 'left', 1, 34, NULL, '2025-12-24 05:32:29', NULL),
(1130, 110, 36, 'left', 1, 35, NULL, '2025-12-24 05:32:29', NULL),
(1131, 110, 26, 'left', 1, 36, NULL, '2025-12-24 05:32:29', NULL),
(1132, 110, 24, 'right', 1, 37, NULL, '2025-12-24 05:32:29', NULL),
(1133, 110, 23, 'left', 1, 38, NULL, '2025-12-24 05:32:29', NULL),
(1134, 110, 22, 'left', 1, 39, NULL, '2025-12-24 05:32:29', NULL),
(1135, 110, 19, 'left', 1, 40, NULL, '2025-12-24 05:32:29', NULL),
(1136, 111, 110, 'left', 1, 1, NULL, '2025-12-24 05:33:34', NULL),
(1137, 111, 109, 'left', 1, 2, NULL, '2025-12-24 05:33:34', NULL),
(1138, 111, 108, 'left', 1, 3, NULL, '2025-12-24 05:33:34', NULL),
(1139, 111, 107, 'left', 1, 4, NULL, '2025-12-24 05:33:34', NULL),
(1140, 111, 106, 'left', 1, 5, NULL, '2025-12-24 05:33:34', NULL),
(1141, 111, 105, 'left', 1, 6, NULL, '2025-12-24 05:33:34', NULL),
(1142, 111, 88, 'left', 1, 7, NULL, '2025-12-24 05:33:34', NULL),
(1143, 111, 87, 'left', 1, 8, NULL, '2025-12-24 05:33:34', NULL),
(1144, 111, 86, 'left', 1, 9, NULL, '2025-12-24 05:33:34', NULL),
(1145, 111, 85, 'left', 1, 10, NULL, '2025-12-24 05:33:34', NULL),
(1146, 111, 84, 'left', 1, 11, NULL, '2025-12-24 05:33:34', NULL),
(1147, 111, 83, 'left', 1, 12, NULL, '2025-12-24 05:33:34', NULL),
(1148, 111, 82, 'left', 1, 13, NULL, '2025-12-24 05:33:34', NULL),
(1149, 111, 81, 'left', 1, 14, NULL, '2025-12-24 05:33:34', NULL),
(1150, 111, 80, 'left', 1, 15, NULL, '2025-12-24 05:33:34', NULL),
(1151, 111, 79, 'left', 1, 16, NULL, '2025-12-24 05:33:34', NULL),
(1152, 111, 78, 'left', 1, 17, NULL, '2025-12-24 05:33:34', NULL),
(1153, 111, 77, 'left', 1, 18, NULL, '2025-12-24 05:33:34', NULL),
(1154, 111, 76, 'left', 1, 19, NULL, '2025-12-24 05:33:34', NULL),
(1155, 111, 75, 'left', 1, 20, NULL, '2025-12-24 05:33:34', NULL),
(1156, 111, 74, 'left', 1, 21, NULL, '2025-12-24 05:33:34', NULL),
(1157, 111, 73, 'left', 1, 22, NULL, '2025-12-24 05:33:34', NULL),
(1158, 111, 72, 'left', 1, 23, NULL, '2025-12-24 05:33:34', NULL),
(1159, 111, 71, 'left', 1, 24, NULL, '2025-12-24 05:33:34', NULL),
(1160, 111, 70, 'left', 1, 25, NULL, '2025-12-24 05:33:34', NULL),
(1161, 111, 69, 'left', 1, 26, NULL, '2025-12-24 05:33:34', NULL),
(1162, 111, 68, 'left', 1, 27, NULL, '2025-12-24 05:33:34', NULL),
(1163, 111, 67, 'left', 1, 28, NULL, '2025-12-24 05:33:34', NULL),
(1164, 111, 66, 'left', 1, 29, NULL, '2025-12-24 05:33:34', NULL),
(1165, 111, 65, 'left', 1, 30, NULL, '2025-12-24 05:33:34', NULL),
(1166, 111, 64, 'left', 1, 31, NULL, '2025-12-24 05:33:34', NULL),
(1167, 111, 63, 'left', 1, 32, NULL, '2025-12-24 05:33:34', NULL),
(1168, 111, 62, 'left', 1, 33, NULL, '2025-12-24 05:33:34', NULL),
(1169, 111, 38, 'left', 1, 34, NULL, '2025-12-24 05:33:34', NULL),
(1170, 111, 37, 'left', 1, 35, NULL, '2025-12-24 05:33:34', NULL),
(1171, 111, 36, 'left', 1, 36, NULL, '2025-12-24 05:33:34', NULL),
(1172, 111, 26, 'left', 1, 37, NULL, '2025-12-24 05:33:34', NULL),
(1173, 111, 24, 'right', 1, 38, NULL, '2025-12-24 05:33:34', NULL),
(1174, 111, 23, 'left', 1, 39, NULL, '2025-12-24 05:33:34', NULL),
(1175, 111, 22, 'left', 1, 40, NULL, '2025-12-24 05:33:34', NULL),
(1176, 111, 19, 'left', 1, 41, NULL, '2025-12-24 05:33:34', NULL),
(1177, 112, 111, 'left', 1, 1, NULL, '2025-12-24 05:34:04', NULL),
(1178, 112, 110, 'left', 1, 2, NULL, '2025-12-24 05:34:04', NULL),
(1179, 112, 109, 'left', 1, 3, NULL, '2025-12-24 05:34:04', NULL),
(1180, 112, 108, 'left', 1, 4, NULL, '2025-12-24 05:34:04', NULL),
(1181, 112, 107, 'left', 1, 5, NULL, '2025-12-24 05:34:04', NULL),
(1182, 112, 106, 'left', 1, 6, NULL, '2025-12-24 05:34:04', NULL),
(1183, 112, 105, 'left', 1, 7, NULL, '2025-12-24 05:34:04', NULL),
(1184, 112, 88, 'left', 1, 8, NULL, '2025-12-24 05:34:04', NULL),
(1185, 112, 87, 'left', 1, 9, NULL, '2025-12-24 05:34:04', NULL),
(1186, 112, 86, 'left', 1, 10, NULL, '2025-12-24 05:34:04', NULL),
(1187, 112, 85, 'left', 1, 11, NULL, '2025-12-24 05:34:04', NULL),
(1188, 112, 84, 'left', 1, 12, NULL, '2025-12-24 05:34:04', NULL),
(1189, 112, 83, 'left', 1, 13, NULL, '2025-12-24 05:34:04', NULL),
(1190, 112, 82, 'left', 1, 14, NULL, '2025-12-24 05:34:04', NULL),
(1191, 112, 81, 'left', 1, 15, NULL, '2025-12-24 05:34:04', NULL),
(1192, 112, 80, 'left', 1, 16, NULL, '2025-12-24 05:34:04', NULL),
(1193, 112, 79, 'left', 1, 17, NULL, '2025-12-24 05:34:04', NULL),
(1194, 112, 78, 'left', 1, 18, NULL, '2025-12-24 05:34:04', NULL),
(1195, 112, 77, 'left', 1, 19, NULL, '2025-12-24 05:34:04', NULL),
(1196, 112, 76, 'left', 1, 20, NULL, '2025-12-24 05:34:04', NULL),
(1197, 112, 75, 'left', 1, 21, NULL, '2025-12-24 05:34:04', NULL),
(1198, 112, 74, 'left', 1, 22, NULL, '2025-12-24 05:34:04', NULL),
(1199, 112, 73, 'left', 1, 23, NULL, '2025-12-24 05:34:04', NULL),
(1200, 112, 72, 'left', 1, 24, NULL, '2025-12-24 05:34:04', NULL),
(1201, 112, 71, 'left', 1, 25, NULL, '2025-12-24 05:34:04', NULL),
(1202, 112, 70, 'left', 1, 26, NULL, '2025-12-24 05:34:04', NULL),
(1203, 112, 69, 'left', 1, 27, NULL, '2025-12-24 05:34:04', NULL),
(1204, 112, 68, 'left', 1, 28, NULL, '2025-12-24 05:34:04', NULL),
(1205, 112, 67, 'left', 1, 29, NULL, '2025-12-24 05:34:04', NULL),
(1206, 112, 66, 'left', 1, 30, NULL, '2025-12-24 05:34:04', NULL),
(1207, 112, 65, 'left', 1, 31, NULL, '2025-12-24 05:34:04', NULL),
(1208, 112, 64, 'left', 1, 32, NULL, '2025-12-24 05:34:04', NULL),
(1209, 112, 63, 'left', 1, 33, NULL, '2025-12-24 05:34:04', NULL),
(1210, 112, 62, 'left', 1, 34, NULL, '2025-12-24 05:34:04', NULL),
(1211, 112, 38, 'left', 1, 35, NULL, '2025-12-24 05:34:04', NULL),
(1212, 112, 37, 'left', 1, 36, NULL, '2025-12-24 05:34:04', NULL),
(1213, 112, 36, 'left', 1, 37, NULL, '2025-12-24 05:34:04', NULL),
(1214, 112, 26, 'left', 1, 38, NULL, '2025-12-24 05:34:04', NULL),
(1215, 112, 24, 'right', 1, 39, NULL, '2025-12-24 05:34:04', NULL),
(1216, 112, 23, 'left', 1, 40, NULL, '2025-12-24 05:34:04', NULL),
(1217, 112, 22, 'left', 1, 41, NULL, '2025-12-24 05:34:04', NULL),
(1218, 112, 19, 'left', 1, 42, NULL, '2025-12-24 05:34:04', NULL),
(1219, 113, 112, 'left', 1, 1, NULL, '2025-12-24 05:34:11', NULL),
(1220, 113, 111, 'left', 1, 2, NULL, '2025-12-24 05:34:11', NULL),
(1221, 113, 110, 'left', 1, 3, NULL, '2025-12-24 05:34:11', NULL),
(1222, 113, 109, 'left', 1, 4, NULL, '2025-12-24 05:34:11', NULL),
(1223, 113, 108, 'left', 1, 5, NULL, '2025-12-24 05:34:11', NULL),
(1224, 113, 107, 'left', 1, 6, NULL, '2025-12-24 05:34:11', NULL),
(1225, 113, 106, 'left', 1, 7, NULL, '2025-12-24 05:34:11', NULL),
(1226, 113, 105, 'left', 1, 8, NULL, '2025-12-24 05:34:11', NULL),
(1227, 113, 88, 'left', 1, 9, NULL, '2025-12-24 05:34:11', NULL),
(1228, 113, 87, 'left', 1, 10, NULL, '2025-12-24 05:34:11', NULL),
(1229, 113, 86, 'left', 1, 11, NULL, '2025-12-24 05:34:11', NULL),
(1230, 113, 85, 'left', 1, 12, NULL, '2025-12-24 05:34:11', NULL),
(1231, 113, 84, 'left', 1, 13, NULL, '2025-12-24 05:34:11', NULL),
(1232, 113, 83, 'left', 1, 14, NULL, '2025-12-24 05:34:11', NULL),
(1233, 113, 82, 'left', 1, 15, NULL, '2025-12-24 05:34:11', NULL),
(1234, 113, 81, 'left', 1, 16, NULL, '2025-12-24 05:34:11', NULL),
(1235, 113, 80, 'left', 1, 17, NULL, '2025-12-24 05:34:11', NULL),
(1236, 113, 79, 'left', 1, 18, NULL, '2025-12-24 05:34:11', NULL),
(1237, 113, 78, 'left', 1, 19, NULL, '2025-12-24 05:34:11', NULL),
(1238, 113, 77, 'left', 1, 20, NULL, '2025-12-24 05:34:11', NULL),
(1239, 113, 76, 'left', 1, 21, NULL, '2025-12-24 05:34:11', NULL),
(1240, 113, 75, 'left', 1, 22, NULL, '2025-12-24 05:34:11', NULL),
(1241, 113, 74, 'left', 1, 23, NULL, '2025-12-24 05:34:11', NULL),
(1242, 113, 73, 'left', 1, 24, NULL, '2025-12-24 05:34:11', NULL),
(1243, 113, 72, 'left', 1, 25, NULL, '2025-12-24 05:34:11', NULL),
(1244, 113, 71, 'left', 1, 26, NULL, '2025-12-24 05:34:11', NULL),
(1245, 113, 70, 'left', 1, 27, NULL, '2025-12-24 05:34:11', NULL),
(1246, 113, 69, 'left', 1, 28, NULL, '2025-12-24 05:34:11', NULL),
(1247, 113, 68, 'left', 1, 29, NULL, '2025-12-24 05:34:11', NULL),
(1248, 113, 67, 'left', 1, 30, NULL, '2025-12-24 05:34:11', NULL),
(1249, 113, 66, 'left', 1, 31, NULL, '2025-12-24 05:34:11', NULL),
(1250, 113, 65, 'left', 1, 32, NULL, '2025-12-24 05:34:11', NULL),
(1251, 113, 64, 'left', 1, 33, NULL, '2025-12-24 05:34:11', NULL),
(1252, 113, 63, 'left', 1, 34, NULL, '2025-12-24 05:34:11', NULL),
(1253, 113, 62, 'left', 1, 35, NULL, '2025-12-24 05:34:11', NULL),
(1254, 113, 38, 'left', 1, 36, NULL, '2025-12-24 05:34:11', NULL),
(1255, 113, 37, 'left', 1, 37, NULL, '2025-12-24 05:34:11', NULL),
(1256, 113, 36, 'left', 1, 38, NULL, '2025-12-24 05:34:11', NULL),
(1257, 113, 26, 'left', 1, 39, NULL, '2025-12-24 05:34:11', NULL),
(1258, 113, 24, 'right', 1, 40, NULL, '2025-12-24 05:34:11', NULL),
(1259, 113, 23, 'left', 1, 41, NULL, '2025-12-24 05:34:11', NULL),
(1260, 113, 22, 'left', 1, 42, NULL, '2025-12-24 05:34:11', NULL),
(1261, 113, 19, 'left', 1, 43, NULL, '2025-12-24 05:34:11', NULL),
(1262, 89, 113, 'left', 1, 1, NULL, '2025-12-24 05:35:30', NULL),
(1263, 89, 112, 'left', 1, 2, NULL, '2025-12-24 05:35:30', NULL),
(1264, 89, 111, 'left', 1, 3, NULL, '2025-12-24 05:35:30', NULL),
(1265, 89, 110, 'left', 1, 4, NULL, '2025-12-24 05:35:30', NULL),
(1266, 89, 109, 'left', 1, 5, NULL, '2025-12-24 05:35:30', NULL),
(1267, 89, 108, 'left', 1, 6, NULL, '2025-12-24 05:35:30', NULL),
(1268, 89, 107, 'left', 1, 7, NULL, '2025-12-24 05:35:30', NULL),
(1269, 89, 106, 'left', 1, 8, NULL, '2025-12-24 05:35:30', NULL),
(1270, 89, 105, 'left', 1, 9, NULL, '2025-12-24 05:35:30', NULL),
(1271, 89, 88, 'left', 1, 10, NULL, '2025-12-24 05:35:30', NULL),
(1272, 89, 87, 'left', 1, 11, NULL, '2025-12-24 05:35:30', NULL),
(1273, 89, 86, 'left', 1, 12, NULL, '2025-12-24 05:35:30', NULL),
(1274, 89, 85, 'left', 1, 13, NULL, '2025-12-24 05:35:30', NULL),
(1275, 89, 84, 'left', 1, 14, NULL, '2025-12-24 05:35:30', NULL),
(1276, 89, 83, 'left', 1, 15, NULL, '2025-12-24 05:35:30', NULL),
(1277, 89, 82, 'left', 1, 16, NULL, '2025-12-24 05:35:30', NULL),
(1278, 89, 81, 'left', 1, 17, NULL, '2025-12-24 05:35:30', NULL),
(1279, 89, 80, 'left', 1, 18, NULL, '2025-12-24 05:35:30', NULL),
(1280, 89, 79, 'left', 1, 19, NULL, '2025-12-24 05:35:30', NULL),
(1281, 89, 78, 'left', 1, 20, NULL, '2025-12-24 05:35:30', NULL),
(1282, 89, 77, 'left', 1, 21, NULL, '2025-12-24 05:35:30', NULL),
(1283, 89, 76, 'left', 1, 22, NULL, '2025-12-24 05:35:30', NULL),
(1284, 89, 75, 'left', 1, 23, NULL, '2025-12-24 05:35:30', NULL),
(1285, 89, 74, 'left', 1, 24, NULL, '2025-12-24 05:35:30', NULL),
(1286, 89, 73, 'left', 1, 25, NULL, '2025-12-24 05:35:30', NULL),
(1287, 89, 72, 'left', 1, 26, NULL, '2025-12-24 05:35:30', NULL),
(1288, 89, 71, 'left', 1, 27, NULL, '2025-12-24 05:35:30', NULL),
(1289, 89, 70, 'left', 1, 28, NULL, '2025-12-24 05:35:30', NULL),
(1290, 89, 69, 'left', 1, 29, NULL, '2025-12-24 05:35:30', NULL),
(1291, 89, 68, 'left', 1, 30, NULL, '2025-12-24 05:35:30', NULL),
(1292, 89, 67, 'left', 1, 31, NULL, '2025-12-24 05:35:30', NULL),
(1293, 89, 66, 'left', 1, 32, NULL, '2025-12-24 05:35:30', NULL),
(1294, 89, 65, 'left', 1, 33, NULL, '2025-12-24 05:35:30', NULL),
(1295, 89, 64, 'left', 1, 34, NULL, '2025-12-24 05:35:30', NULL),
(1296, 89, 63, 'left', 1, 35, NULL, '2025-12-24 05:35:30', NULL),
(1297, 89, 62, 'left', 1, 36, NULL, '2025-12-24 05:35:30', NULL),
(1298, 89, 38, 'left', 1, 37, NULL, '2025-12-24 05:35:30', NULL),
(1299, 89, 37, 'left', 1, 38, NULL, '2025-12-24 05:35:30', NULL),
(1300, 89, 36, 'left', 1, 39, NULL, '2025-12-24 05:35:30', NULL),
(1301, 89, 26, 'left', 1, 40, NULL, '2025-12-24 05:35:30', NULL),
(1302, 89, 24, 'right', 1, 41, NULL, '2025-12-24 05:35:30', NULL),
(1303, 89, 23, 'left', 1, 42, NULL, '2025-12-24 05:35:30', NULL),
(1304, 89, 22, 'left', 1, 43, NULL, '2025-12-24 05:35:30', NULL),
(1305, 89, 19, 'left', 1, 44, NULL, '2025-12-24 05:35:30', NULL),
(1306, 90, 89, 'left', 1, 1, NULL, '2025-12-24 05:36:32', NULL),
(1307, 90, 113, 'left', 1, 2, NULL, '2025-12-24 05:36:32', NULL),
(1308, 90, 112, 'left', 1, 3, NULL, '2025-12-24 05:36:32', NULL),
(1309, 90, 111, 'left', 1, 4, NULL, '2025-12-24 05:36:32', NULL),
(1310, 90, 110, 'left', 1, 5, NULL, '2025-12-24 05:36:32', NULL),
(1311, 90, 109, 'left', 1, 6, NULL, '2025-12-24 05:36:32', NULL),
(1312, 90, 108, 'left', 1, 7, NULL, '2025-12-24 05:36:32', NULL),
(1313, 90, 107, 'left', 1, 8, NULL, '2025-12-24 05:36:32', NULL),
(1314, 90, 106, 'left', 1, 9, NULL, '2025-12-24 05:36:32', NULL),
(1315, 90, 105, 'left', 1, 10, NULL, '2025-12-24 05:36:32', NULL),
(1316, 90, 88, 'left', 1, 11, NULL, '2025-12-24 05:36:32', NULL),
(1317, 90, 87, 'left', 1, 12, NULL, '2025-12-24 05:36:32', NULL),
(1318, 90, 86, 'left', 1, 13, NULL, '2025-12-24 05:36:32', NULL),
(1319, 90, 85, 'left', 1, 14, NULL, '2025-12-24 05:36:32', NULL),
(1320, 90, 84, 'left', 1, 15, NULL, '2025-12-24 05:36:32', NULL),
(1321, 90, 83, 'left', 1, 16, NULL, '2025-12-24 05:36:32', NULL),
(1322, 90, 82, 'left', 1, 17, NULL, '2025-12-24 05:36:32', NULL),
(1323, 90, 81, 'left', 1, 18, NULL, '2025-12-24 05:36:32', NULL),
(1324, 90, 80, 'left', 1, 19, NULL, '2025-12-24 05:36:32', NULL),
(1325, 90, 79, 'left', 1, 20, NULL, '2025-12-24 05:36:32', NULL),
(1326, 90, 78, 'left', 1, 21, NULL, '2025-12-24 05:36:32', NULL),
(1327, 90, 77, 'left', 1, 22, NULL, '2025-12-24 05:36:32', NULL),
(1328, 90, 76, 'left', 1, 23, NULL, '2025-12-24 05:36:32', NULL),
(1329, 90, 75, 'left', 1, 24, NULL, '2025-12-24 05:36:32', NULL),
(1330, 90, 74, 'left', 1, 25, NULL, '2025-12-24 05:36:32', NULL),
(1331, 90, 73, 'left', 1, 26, NULL, '2025-12-24 05:36:32', NULL),
(1332, 90, 72, 'left', 1, 27, NULL, '2025-12-24 05:36:32', NULL),
(1333, 90, 71, 'left', 1, 28, NULL, '2025-12-24 05:36:32', NULL),
(1334, 90, 70, 'left', 1, 29, NULL, '2025-12-24 05:36:32', NULL),
(1335, 90, 69, 'left', 1, 30, NULL, '2025-12-24 05:36:32', NULL),
(1336, 90, 68, 'left', 1, 31, NULL, '2025-12-24 05:36:32', NULL),
(1337, 90, 67, 'left', 1, 32, NULL, '2025-12-24 05:36:32', NULL),
(1338, 90, 66, 'left', 1, 33, NULL, '2025-12-24 05:36:32', NULL),
(1339, 90, 65, 'left', 1, 34, NULL, '2025-12-24 05:36:32', NULL),
(1340, 90, 64, 'left', 1, 35, NULL, '2025-12-24 05:36:32', NULL),
(1341, 90, 63, 'left', 1, 36, NULL, '2025-12-24 05:36:32', NULL),
(1342, 90, 62, 'left', 1, 37, NULL, '2025-12-24 05:36:32', NULL),
(1343, 90, 38, 'left', 1, 38, NULL, '2025-12-24 05:36:32', NULL),
(1344, 90, 37, 'left', 1, 39, NULL, '2025-12-24 05:36:32', NULL),
(1345, 90, 36, 'left', 1, 40, NULL, '2025-12-24 05:36:32', NULL),
(1346, 90, 26, 'left', 1, 41, NULL, '2025-12-24 05:36:32', NULL),
(1347, 90, 24, 'right', 1, 42, NULL, '2025-12-24 05:36:32', NULL),
(1348, 90, 23, 'left', 1, 43, NULL, '2025-12-24 05:36:32', NULL),
(1349, 90, 22, 'left', 1, 44, NULL, '2025-12-24 05:36:32', NULL),
(1350, 90, 19, 'left', 1, 45, NULL, '2025-12-24 05:36:32', NULL),
(1351, 91, 90, 'left', 1, 1, NULL, '2025-12-24 05:36:40', NULL),
(1352, 91, 89, 'left', 1, 2, NULL, '2025-12-24 05:36:40', NULL),
(1353, 91, 113, 'left', 1, 3, NULL, '2025-12-24 05:36:40', NULL),
(1354, 91, 112, 'left', 1, 4, NULL, '2025-12-24 05:36:40', NULL),
(1355, 91, 111, 'left', 1, 5, NULL, '2025-12-24 05:36:40', NULL),
(1356, 91, 110, 'left', 1, 6, NULL, '2025-12-24 05:36:40', NULL),
(1357, 91, 109, 'left', 1, 7, NULL, '2025-12-24 05:36:40', NULL),
(1358, 91, 108, 'left', 1, 8, NULL, '2025-12-24 05:36:40', NULL),
(1359, 91, 107, 'left', 1, 9, NULL, '2025-12-24 05:36:40', NULL),
(1360, 91, 106, 'left', 1, 10, NULL, '2025-12-24 05:36:40', NULL),
(1361, 91, 105, 'left', 1, 11, NULL, '2025-12-24 05:36:40', NULL),
(1362, 91, 88, 'left', 1, 12, NULL, '2025-12-24 05:36:40', NULL),
(1363, 91, 87, 'left', 1, 13, NULL, '2025-12-24 05:36:40', NULL),
(1364, 91, 86, 'left', 1, 14, NULL, '2025-12-24 05:36:40', NULL),
(1365, 91, 85, 'left', 1, 15, NULL, '2025-12-24 05:36:40', NULL),
(1366, 91, 84, 'left', 1, 16, NULL, '2025-12-24 05:36:40', NULL),
(1367, 91, 83, 'left', 1, 17, NULL, '2025-12-24 05:36:40', NULL),
(1368, 91, 82, 'left', 1, 18, NULL, '2025-12-24 05:36:40', NULL),
(1369, 91, 81, 'left', 1, 19, NULL, '2025-12-24 05:36:40', NULL),
(1370, 91, 80, 'left', 1, 20, NULL, '2025-12-24 05:36:40', NULL),
(1371, 91, 79, 'left', 1, 21, NULL, '2025-12-24 05:36:40', NULL),
(1372, 91, 78, 'left', 1, 22, NULL, '2025-12-24 05:36:40', NULL),
(1373, 91, 77, 'left', 1, 23, NULL, '2025-12-24 05:36:40', NULL),
(1374, 91, 76, 'left', 1, 24, NULL, '2025-12-24 05:36:40', NULL),
(1375, 91, 75, 'left', 1, 25, NULL, '2025-12-24 05:36:40', NULL),
(1376, 91, 74, 'left', 1, 26, NULL, '2025-12-24 05:36:40', NULL),
(1377, 91, 73, 'left', 1, 27, NULL, '2025-12-24 05:36:40', NULL),
(1378, 91, 72, 'left', 1, 28, NULL, '2025-12-24 05:36:40', NULL),
(1379, 91, 71, 'left', 1, 29, NULL, '2025-12-24 05:36:40', NULL),
(1380, 91, 70, 'left', 1, 30, NULL, '2025-12-24 05:36:40', NULL),
(1381, 91, 69, 'left', 1, 31, NULL, '2025-12-24 05:36:40', NULL),
(1382, 91, 68, 'left', 1, 32, NULL, '2025-12-24 05:36:40', NULL),
(1383, 91, 67, 'left', 1, 33, NULL, '2025-12-24 05:36:40', NULL),
(1384, 91, 66, 'left', 1, 34, NULL, '2025-12-24 05:36:40', NULL),
(1385, 91, 65, 'left', 1, 35, NULL, '2025-12-24 05:36:40', NULL),
(1386, 91, 64, 'left', 1, 36, NULL, '2025-12-24 05:36:40', NULL),
(1387, 91, 63, 'left', 1, 37, NULL, '2025-12-24 05:36:40', NULL),
(1388, 91, 62, 'left', 1, 38, NULL, '2025-12-24 05:36:40', NULL),
(1389, 91, 38, 'left', 1, 39, NULL, '2025-12-24 05:36:40', NULL),
(1390, 91, 37, 'left', 1, 40, NULL, '2025-12-24 05:36:40', NULL),
(1391, 91, 36, 'left', 1, 41, NULL, '2025-12-24 05:36:40', NULL),
(1392, 91, 26, 'left', 1, 42, NULL, '2025-12-24 05:36:40', NULL),
(1393, 91, 24, 'right', 1, 43, NULL, '2025-12-24 05:36:40', NULL),
(1394, 91, 23, 'left', 1, 44, NULL, '2025-12-24 05:36:40', NULL),
(1395, 91, 22, 'left', 1, 45, NULL, '2025-12-24 05:36:40', NULL),
(1396, 91, 19, 'left', 1, 46, NULL, '2025-12-24 05:36:40', NULL),
(1397, 114, 91, 'left', 1, 1, NULL, '2025-12-24 05:43:50', NULL),
(1398, 114, 90, 'left', 1, 2, NULL, '2025-12-24 05:43:50', NULL),
(1399, 114, 89, 'left', 1, 3, NULL, '2025-12-24 05:43:50', NULL),
(1400, 114, 113, 'left', 1, 4, NULL, '2025-12-24 05:43:50', NULL),
(1401, 114, 112, 'left', 1, 5, NULL, '2025-12-24 05:43:50', NULL),
(1402, 114, 111, 'left', 1, 6, NULL, '2025-12-24 05:43:50', NULL),
(1403, 114, 110, 'left', 1, 7, NULL, '2025-12-24 05:43:50', NULL),
(1404, 114, 109, 'left', 1, 8, NULL, '2025-12-24 05:43:50', NULL),
(1405, 114, 108, 'left', 1, 9, NULL, '2025-12-24 05:43:50', NULL),
(1406, 114, 107, 'left', 1, 10, NULL, '2025-12-24 05:43:50', NULL),
(1407, 114, 106, 'left', 1, 11, NULL, '2025-12-24 05:43:50', NULL),
(1408, 114, 105, 'left', 1, 12, NULL, '2025-12-24 05:43:50', NULL),
(1409, 114, 88, 'left', 1, 13, NULL, '2025-12-24 05:43:50', NULL),
(1410, 114, 87, 'left', 1, 14, NULL, '2025-12-24 05:43:50', NULL),
(1411, 114, 86, 'left', 1, 15, NULL, '2025-12-24 05:43:50', NULL),
(1412, 114, 85, 'left', 1, 16, NULL, '2025-12-24 05:43:50', NULL),
(1413, 114, 84, 'left', 1, 17, NULL, '2025-12-24 05:43:50', NULL),
(1414, 114, 83, 'left', 1, 18, NULL, '2025-12-24 05:43:50', NULL),
(1415, 114, 82, 'left', 1, 19, NULL, '2025-12-24 05:43:50', NULL),
(1416, 114, 81, 'left', 1, 20, NULL, '2025-12-24 05:43:50', NULL),
(1417, 114, 80, 'left', 1, 21, NULL, '2025-12-24 05:43:50', NULL),
(1418, 114, 79, 'left', 1, 22, NULL, '2025-12-24 05:43:50', NULL),
(1419, 114, 78, 'left', 1, 23, NULL, '2025-12-24 05:43:50', NULL),
(1420, 114, 77, 'left', 1, 24, NULL, '2025-12-24 05:43:50', NULL),
(1421, 114, 76, 'left', 1, 25, NULL, '2025-12-24 05:43:50', NULL),
(1422, 114, 75, 'left', 1, 26, NULL, '2025-12-24 05:43:50', NULL),
(1423, 114, 74, 'left', 1, 27, NULL, '2025-12-24 05:43:50', NULL),
(1424, 114, 73, 'left', 1, 28, NULL, '2025-12-24 05:43:50', NULL),
(1425, 114, 72, 'left', 1, 29, NULL, '2025-12-24 05:43:50', NULL),
(1426, 114, 71, 'left', 1, 30, NULL, '2025-12-24 05:43:50', NULL),
(1427, 114, 70, 'left', 1, 31, NULL, '2025-12-24 05:43:50', NULL),
(1428, 114, 69, 'left', 1, 32, NULL, '2025-12-24 05:43:50', NULL),
(1429, 114, 68, 'left', 1, 33, NULL, '2025-12-24 05:43:50', NULL),
(1430, 114, 67, 'left', 1, 34, NULL, '2025-12-24 05:43:50', NULL),
(1431, 114, 66, 'left', 1, 35, NULL, '2025-12-24 05:43:50', NULL),
(1432, 114, 65, 'left', 1, 36, NULL, '2025-12-24 05:43:50', NULL),
(1433, 114, 64, 'left', 1, 37, NULL, '2025-12-24 05:43:50', NULL),
(1434, 114, 63, 'left', 1, 38, NULL, '2025-12-24 05:43:50', NULL),
(1435, 114, 62, 'left', 1, 39, NULL, '2025-12-24 05:43:50', NULL),
(1436, 114, 38, 'left', 1, 40, NULL, '2025-12-24 05:43:50', NULL),
(1437, 114, 37, 'left', 1, 41, NULL, '2025-12-24 05:43:50', NULL),
(1438, 114, 36, 'left', 1, 42, NULL, '2025-12-24 05:43:50', NULL),
(1439, 114, 26, 'left', 1, 43, NULL, '2025-12-24 05:43:50', NULL),
(1440, 114, 24, 'right', 1, 44, NULL, '2025-12-24 05:43:50', NULL),
(1441, 114, 23, 'left', 1, 45, NULL, '2025-12-24 05:43:50', NULL),
(1442, 114, 22, 'left', 1, 46, NULL, '2025-12-24 05:43:50', NULL),
(1443, 114, 19, 'left', 1, 47, NULL, '2025-12-24 05:43:50', NULL),
(1444, 92, 114, 'left', 1, 1, NULL, '2025-12-24 05:44:51', NULL),
(1445, 92, 91, 'left', 1, 2, NULL, '2025-12-24 05:44:51', NULL),
(1446, 92, 90, 'left', 1, 3, NULL, '2025-12-24 05:44:51', NULL),
(1447, 92, 89, 'left', 1, 4, NULL, '2025-12-24 05:44:51', NULL),
(1448, 92, 113, 'left', 1, 5, NULL, '2025-12-24 05:44:51', NULL),
(1449, 92, 112, 'left', 1, 6, NULL, '2025-12-24 05:44:51', NULL),
(1450, 92, 111, 'left', 1, 7, NULL, '2025-12-24 05:44:51', NULL),
(1451, 92, 110, 'left', 1, 8, NULL, '2025-12-24 05:44:51', NULL),
(1452, 92, 109, 'left', 1, 9, NULL, '2025-12-24 05:44:51', NULL),
(1453, 92, 108, 'left', 1, 10, NULL, '2025-12-24 05:44:51', NULL),
(1454, 92, 107, 'left', 1, 11, NULL, '2025-12-24 05:44:51', NULL),
(1455, 92, 106, 'left', 1, 12, NULL, '2025-12-24 05:44:51', NULL),
(1456, 92, 105, 'left', 1, 13, NULL, '2025-12-24 05:44:51', NULL),
(1457, 92, 88, 'left', 1, 14, NULL, '2025-12-24 05:44:51', NULL),
(1458, 92, 87, 'left', 1, 15, NULL, '2025-12-24 05:44:51', NULL),
(1459, 92, 86, 'left', 1, 16, NULL, '2025-12-24 05:44:51', NULL),
(1460, 92, 85, 'left', 1, 17, NULL, '2025-12-24 05:44:51', NULL),
(1461, 92, 84, 'left', 1, 18, NULL, '2025-12-24 05:44:51', NULL),
(1462, 92, 83, 'left', 1, 19, NULL, '2025-12-24 05:44:51', NULL),
(1463, 92, 82, 'left', 1, 20, NULL, '2025-12-24 05:44:51', NULL),
(1464, 92, 81, 'left', 1, 21, NULL, '2025-12-24 05:44:51', NULL),
(1465, 92, 80, 'left', 1, 22, NULL, '2025-12-24 05:44:51', NULL),
(1466, 92, 79, 'left', 1, 23, NULL, '2025-12-24 05:44:51', NULL),
(1467, 92, 78, 'left', 1, 24, NULL, '2025-12-24 05:44:51', NULL),
(1468, 92, 77, 'left', 1, 25, NULL, '2025-12-24 05:44:51', NULL),
(1469, 92, 76, 'left', 1, 26, NULL, '2025-12-24 05:44:51', NULL),
(1470, 92, 75, 'left', 1, 27, NULL, '2025-12-24 05:44:51', NULL),
(1471, 92, 74, 'left', 1, 28, NULL, '2025-12-24 05:44:51', NULL),
(1472, 92, 73, 'left', 1, 29, NULL, '2025-12-24 05:44:51', NULL),
(1473, 92, 72, 'left', 1, 30, NULL, '2025-12-24 05:44:51', NULL),
(1474, 92, 71, 'left', 1, 31, NULL, '2025-12-24 05:44:51', NULL),
(1475, 92, 70, 'left', 1, 32, NULL, '2025-12-24 05:44:51', NULL),
(1476, 92, 69, 'left', 1, 33, NULL, '2025-12-24 05:44:51', NULL),
(1477, 92, 68, 'left', 1, 34, NULL, '2025-12-24 05:44:51', NULL),
(1478, 92, 67, 'left', 1, 35, NULL, '2025-12-24 05:44:51', NULL),
(1479, 92, 66, 'left', 1, 36, NULL, '2025-12-24 05:44:51', NULL),
(1480, 92, 65, 'left', 1, 37, NULL, '2025-12-24 05:44:51', NULL),
(1481, 92, 64, 'left', 1, 38, NULL, '2025-12-24 05:44:51', NULL),
(1482, 92, 63, 'left', 1, 39, NULL, '2025-12-24 05:44:51', NULL),
(1483, 92, 62, 'left', 1, 40, NULL, '2025-12-24 05:44:51', NULL),
(1484, 92, 38, 'left', 1, 41, NULL, '2025-12-24 05:44:51', NULL),
(1485, 92, 37, 'left', 1, 42, NULL, '2025-12-24 05:44:51', NULL),
(1486, 92, 36, 'left', 1, 43, NULL, '2025-12-24 05:44:51', NULL),
(1487, 92, 26, 'left', 1, 44, NULL, '2025-12-24 05:44:51', NULL),
(1488, 92, 24, 'right', 1, 45, NULL, '2025-12-24 05:44:51', NULL),
(1489, 92, 23, 'left', 1, 46, NULL, '2025-12-24 05:44:51', NULL),
(1490, 92, 22, 'left', 1, 47, NULL, '2025-12-24 05:44:51', NULL),
(1491, 92, 19, 'left', 1, 48, NULL, '2025-12-24 05:44:51', NULL),
(1492, 93, 92, 'left', 1, 1, NULL, '2025-12-24 05:45:27', NULL),
(1493, 93, 114, 'left', 1, 2, NULL, '2025-12-24 05:45:27', NULL),
(1494, 93, 91, 'left', 1, 3, NULL, '2025-12-24 05:45:27', NULL),
(1495, 93, 90, 'left', 1, 4, NULL, '2025-12-24 05:45:27', NULL),
(1496, 93, 89, 'left', 1, 5, NULL, '2025-12-24 05:45:27', NULL),
(1497, 93, 113, 'left', 1, 6, NULL, '2025-12-24 05:45:27', NULL),
(1498, 93, 112, 'left', 1, 7, NULL, '2025-12-24 05:45:27', NULL),
(1499, 93, 111, 'left', 1, 8, NULL, '2025-12-24 05:45:27', NULL),
(1500, 93, 110, 'left', 1, 9, NULL, '2025-12-24 05:45:27', NULL),
(1501, 93, 109, 'left', 1, 10, NULL, '2025-12-24 05:45:27', NULL),
(1502, 93, 108, 'left', 1, 11, NULL, '2025-12-24 05:45:27', NULL),
(1503, 93, 107, 'left', 1, 12, NULL, '2025-12-24 05:45:27', NULL),
(1504, 93, 106, 'left', 1, 13, NULL, '2025-12-24 05:45:27', NULL),
(1505, 93, 105, 'left', 1, 14, NULL, '2025-12-24 05:45:27', NULL),
(1506, 93, 88, 'left', 1, 15, NULL, '2025-12-24 05:45:27', NULL),
(1507, 93, 87, 'left', 1, 16, NULL, '2025-12-24 05:45:27', NULL),
(1508, 93, 86, 'left', 1, 17, NULL, '2025-12-24 05:45:27', NULL),
(1509, 93, 85, 'left', 1, 18, NULL, '2025-12-24 05:45:27', NULL),
(1510, 93, 84, 'left', 1, 19, NULL, '2025-12-24 05:45:27', NULL),
(1511, 93, 83, 'left', 1, 20, NULL, '2025-12-24 05:45:27', NULL),
(1512, 93, 82, 'left', 1, 21, NULL, '2025-12-24 05:45:27', NULL),
(1513, 93, 81, 'left', 1, 22, NULL, '2025-12-24 05:45:27', NULL),
(1514, 93, 80, 'left', 1, 23, NULL, '2025-12-24 05:45:27', NULL),
(1515, 93, 79, 'left', 1, 24, NULL, '2025-12-24 05:45:27', NULL),
(1516, 93, 78, 'left', 1, 25, NULL, '2025-12-24 05:45:27', NULL),
(1517, 93, 77, 'left', 1, 26, NULL, '2025-12-24 05:45:27', NULL),
(1518, 93, 76, 'left', 1, 27, NULL, '2025-12-24 05:45:27', NULL),
(1519, 93, 75, 'left', 1, 28, NULL, '2025-12-24 05:45:27', NULL),
(1520, 93, 74, 'left', 1, 29, NULL, '2025-12-24 05:45:27', NULL),
(1521, 93, 73, 'left', 1, 30, NULL, '2025-12-24 05:45:27', NULL),
(1522, 93, 72, 'left', 1, 31, NULL, '2025-12-24 05:45:27', NULL),
(1523, 93, 71, 'left', 1, 32, NULL, '2025-12-24 05:45:27', NULL),
(1524, 93, 70, 'left', 1, 33, NULL, '2025-12-24 05:45:27', NULL),
(1525, 93, 69, 'left', 1, 34, NULL, '2025-12-24 05:45:27', NULL),
(1526, 93, 68, 'left', 1, 35, NULL, '2025-12-24 05:45:27', NULL),
(1527, 93, 67, 'left', 1, 36, NULL, '2025-12-24 05:45:27', NULL),
(1528, 93, 66, 'left', 1, 37, NULL, '2025-12-24 05:45:27', NULL),
(1529, 93, 65, 'left', 1, 38, NULL, '2025-12-24 05:45:27', NULL),
(1530, 93, 64, 'left', 1, 39, NULL, '2025-12-24 05:45:27', NULL),
(1531, 93, 63, 'left', 1, 40, NULL, '2025-12-24 05:45:27', NULL),
(1532, 93, 62, 'left', 1, 41, NULL, '2025-12-24 05:45:27', NULL),
(1533, 93, 38, 'left', 1, 42, NULL, '2025-12-24 05:45:27', NULL),
(1534, 93, 37, 'left', 1, 43, NULL, '2025-12-24 05:45:27', NULL),
(1535, 93, 36, 'left', 1, 44, NULL, '2025-12-24 05:45:27', NULL),
(1536, 93, 26, 'left', 1, 45, NULL, '2025-12-24 05:45:27', NULL),
(1537, 93, 24, 'right', 1, 46, NULL, '2025-12-24 05:45:27', NULL),
(1538, 93, 23, 'left', 1, 47, NULL, '2025-12-24 05:45:27', NULL),
(1539, 93, 22, 'left', 1, 48, NULL, '2025-12-24 05:45:27', NULL),
(1540, 93, 19, 'left', 1, 49, NULL, '2025-12-24 05:45:27', NULL),
(1541, 94, 93, 'left', 1, 1, NULL, '2025-12-24 05:45:44', NULL),
(1542, 94, 92, 'left', 1, 2, NULL, '2025-12-24 05:45:44', NULL),
(1543, 94, 114, 'left', 1, 3, NULL, '2025-12-24 05:45:44', NULL),
(1544, 94, 91, 'left', 1, 4, NULL, '2025-12-24 05:45:44', NULL),
(1545, 94, 90, 'left', 1, 5, NULL, '2025-12-24 05:45:44', NULL),
(1546, 94, 89, 'left', 1, 6, NULL, '2025-12-24 05:45:44', NULL),
(1547, 94, 113, 'left', 1, 7, NULL, '2025-12-24 05:45:44', NULL),
(1548, 94, 112, 'left', 1, 8, NULL, '2025-12-24 05:45:44', NULL),
(1549, 94, 111, 'left', 1, 9, NULL, '2025-12-24 05:45:44', NULL),
(1550, 94, 110, 'left', 1, 10, NULL, '2025-12-24 05:45:44', NULL),
(1551, 94, 109, 'left', 1, 11, NULL, '2025-12-24 05:45:44', NULL),
(1552, 94, 108, 'left', 1, 12, NULL, '2025-12-24 05:45:44', NULL),
(1553, 94, 107, 'left', 1, 13, NULL, '2025-12-24 05:45:44', NULL),
(1554, 94, 106, 'left', 1, 14, NULL, '2025-12-24 05:45:44', NULL),
(1555, 94, 105, 'left', 1, 15, NULL, '2025-12-24 05:45:44', NULL),
(1556, 94, 88, 'left', 1, 16, NULL, '2025-12-24 05:45:44', NULL),
(1557, 94, 87, 'left', 1, 17, NULL, '2025-12-24 05:45:44', NULL),
(1558, 94, 86, 'left', 1, 18, NULL, '2025-12-24 05:45:44', NULL),
(1559, 94, 85, 'left', 1, 19, NULL, '2025-12-24 05:45:44', NULL),
(1560, 94, 84, 'left', 1, 20, NULL, '2025-12-24 05:45:44', NULL),
(1561, 94, 83, 'left', 1, 21, NULL, '2025-12-24 05:45:44', NULL),
(1562, 94, 82, 'left', 1, 22, NULL, '2025-12-24 05:45:44', NULL),
(1563, 94, 81, 'left', 1, 23, NULL, '2025-12-24 05:45:44', NULL),
(1564, 94, 80, 'left', 1, 24, NULL, '2025-12-24 05:45:44', NULL),
(1565, 94, 79, 'left', 1, 25, NULL, '2025-12-24 05:45:44', NULL),
(1566, 94, 78, 'left', 1, 26, NULL, '2025-12-24 05:45:44', NULL),
(1567, 94, 77, 'left', 1, 27, NULL, '2025-12-24 05:45:44', NULL),
(1568, 94, 76, 'left', 1, 28, NULL, '2025-12-24 05:45:44', NULL),
(1569, 94, 75, 'left', 1, 29, NULL, '2025-12-24 05:45:44', NULL),
(1570, 94, 74, 'left', 1, 30, NULL, '2025-12-24 05:45:44', NULL),
(1571, 94, 73, 'left', 1, 31, NULL, '2025-12-24 05:45:44', NULL),
(1572, 94, 72, 'left', 1, 32, NULL, '2025-12-24 05:45:44', NULL),
(1573, 94, 71, 'left', 1, 33, NULL, '2025-12-24 05:45:44', NULL),
(1574, 94, 70, 'left', 1, 34, NULL, '2025-12-24 05:45:44', NULL),
(1575, 94, 69, 'left', 1, 35, NULL, '2025-12-24 05:45:44', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(1576, 94, 68, 'left', 1, 36, NULL, '2025-12-24 05:45:44', NULL),
(1577, 94, 67, 'left', 1, 37, NULL, '2025-12-24 05:45:44', NULL),
(1578, 94, 66, 'left', 1, 38, NULL, '2025-12-24 05:45:44', NULL),
(1579, 94, 65, 'left', 1, 39, NULL, '2025-12-24 05:45:44', NULL),
(1580, 94, 64, 'left', 1, 40, NULL, '2025-12-24 05:45:44', NULL),
(1581, 94, 63, 'left', 1, 41, NULL, '2025-12-24 05:45:44', NULL),
(1582, 94, 62, 'left', 1, 42, NULL, '2025-12-24 05:45:44', NULL),
(1583, 94, 38, 'left', 1, 43, NULL, '2025-12-24 05:45:44', NULL),
(1584, 94, 37, 'left', 1, 44, NULL, '2025-12-24 05:45:44', NULL),
(1585, 94, 36, 'left', 1, 45, NULL, '2025-12-24 05:45:44', NULL),
(1586, 94, 26, 'left', 1, 46, NULL, '2025-12-24 05:45:44', NULL),
(1587, 94, 24, 'right', 1, 47, NULL, '2025-12-24 05:45:44', NULL),
(1588, 94, 23, 'left', 1, 48, NULL, '2025-12-24 05:45:44', NULL),
(1589, 94, 22, 'left', 1, 49, NULL, '2025-12-24 05:45:44', NULL),
(1590, 94, 19, 'left', 1, 50, NULL, '2025-12-24 05:45:44', NULL),
(1591, 99, 98, 'right', 1, 1, NULL, '2025-12-24 05:49:14', NULL),
(1592, 99, 97, 'right', 1, 2, NULL, '2025-12-24 05:49:14', NULL),
(1593, 99, 96, 'right', 1, 3, NULL, '2025-12-24 05:49:14', NULL),
(1594, 99, 95, 'right', 1, 4, NULL, '2025-12-24 05:49:14', NULL),
(1595, 99, 62, 'right', 1, 5, NULL, '2025-12-24 05:49:14', NULL),
(1596, 99, 38, 'left', 1, 6, NULL, '2025-12-24 05:49:14', NULL),
(1597, 99, 37, 'left', 1, 7, NULL, '2025-12-24 05:49:14', NULL),
(1598, 99, 36, 'left', 1, 8, NULL, '2025-12-24 05:49:14', NULL),
(1599, 99, 26, 'left', 1, 9, NULL, '2025-12-24 05:49:14', NULL),
(1600, 99, 24, 'right', 1, 10, NULL, '2025-12-24 05:49:14', NULL),
(1601, 99, 23, 'left', 1, 11, NULL, '2025-12-24 05:49:14', NULL),
(1602, 99, 22, 'left', 1, 12, NULL, '2025-12-24 05:49:14', NULL),
(1603, 99, 19, 'left', 1, 13, NULL, '2025-12-24 05:49:14', NULL),
(1604, 100, 99, 'right', 1, 1, NULL, '2025-12-24 05:50:07', NULL),
(1605, 100, 98, 'right', 1, 2, NULL, '2025-12-24 05:50:07', NULL),
(1606, 100, 97, 'right', 1, 3, NULL, '2025-12-24 05:50:07', NULL),
(1607, 100, 96, 'right', 1, 4, NULL, '2025-12-24 05:50:07', NULL),
(1608, 100, 95, 'right', 1, 5, NULL, '2025-12-24 05:50:07', NULL),
(1609, 100, 62, 'right', 1, 6, NULL, '2025-12-24 05:50:07', NULL),
(1610, 100, 38, 'left', 1, 7, NULL, '2025-12-24 05:50:07', NULL),
(1611, 100, 37, 'left', 1, 8, NULL, '2025-12-24 05:50:07', NULL),
(1612, 100, 36, 'left', 1, 9, NULL, '2025-12-24 05:50:07', NULL),
(1613, 100, 26, 'left', 1, 10, NULL, '2025-12-24 05:50:07', NULL),
(1614, 100, 24, 'right', 1, 11, NULL, '2025-12-24 05:50:07', NULL),
(1615, 100, 23, 'left', 1, 12, NULL, '2025-12-24 05:50:07', NULL),
(1616, 100, 22, 'left', 1, 13, NULL, '2025-12-24 05:50:07', NULL),
(1617, 100, 19, 'left', 1, 14, NULL, '2025-12-24 05:50:07', NULL),
(1618, 101, 100, 'right', 1, 1, NULL, '2025-12-24 05:50:32', NULL),
(1619, 101, 99, 'right', 1, 2, NULL, '2025-12-24 05:50:32', NULL),
(1620, 101, 98, 'right', 1, 3, NULL, '2025-12-24 05:50:32', NULL),
(1621, 101, 97, 'right', 1, 4, NULL, '2025-12-24 05:50:32', NULL),
(1622, 101, 96, 'right', 1, 5, NULL, '2025-12-24 05:50:32', NULL),
(1623, 101, 95, 'right', 1, 6, NULL, '2025-12-24 05:50:32', NULL),
(1624, 101, 62, 'right', 1, 7, NULL, '2025-12-24 05:50:32', NULL),
(1625, 101, 38, 'left', 1, 8, NULL, '2025-12-24 05:50:32', NULL),
(1626, 101, 37, 'left', 1, 9, NULL, '2025-12-24 05:50:32', NULL),
(1627, 101, 36, 'left', 1, 10, NULL, '2025-12-24 05:50:32', NULL),
(1628, 101, 26, 'left', 1, 11, NULL, '2025-12-24 05:50:32', NULL),
(1629, 101, 24, 'right', 1, 12, NULL, '2025-12-24 05:50:32', NULL),
(1630, 101, 23, 'left', 1, 13, NULL, '2025-12-24 05:50:32', NULL),
(1631, 101, 22, 'left', 1, 14, NULL, '2025-12-24 05:50:32', NULL),
(1632, 101, 19, 'left', 1, 15, NULL, '2025-12-24 05:50:32', NULL),
(1633, 115, 101, 'right', 1, 1, NULL, '2025-12-24 07:26:35', NULL),
(1634, 115, 100, 'right', 1, 2, NULL, '2025-12-24 07:26:35', NULL),
(1635, 115, 99, 'right', 1, 3, NULL, '2025-12-24 07:26:35', NULL),
(1636, 115, 98, 'right', 1, 4, NULL, '2025-12-24 07:26:35', NULL),
(1637, 115, 97, 'right', 1, 5, NULL, '2025-12-24 07:26:35', NULL),
(1638, 115, 96, 'right', 1, 6, NULL, '2025-12-24 07:26:35', NULL),
(1639, 115, 95, 'right', 1, 7, NULL, '2025-12-24 07:26:35', NULL),
(1640, 115, 62, 'right', 1, 8, NULL, '2025-12-24 07:26:35', NULL),
(1641, 115, 38, 'left', 1, 9, NULL, '2025-12-24 07:26:35', NULL),
(1642, 115, 37, 'left', 1, 10, NULL, '2025-12-24 07:26:35', NULL),
(1643, 115, 36, 'left', 1, 11, NULL, '2025-12-24 07:26:35', NULL),
(1644, 115, 26, 'left', 1, 12, NULL, '2025-12-24 07:26:35', NULL),
(1645, 115, 24, 'right', 1, 13, NULL, '2025-12-24 07:26:35', NULL),
(1646, 115, 23, 'left', 1, 14, NULL, '2025-12-24 07:26:35', NULL),
(1647, 115, 22, 'left', 1, 15, NULL, '2025-12-24 07:26:35', NULL),
(1648, 115, 19, 'left', 1, 16, NULL, '2025-12-24 07:26:35', NULL),
(1649, 102, 115, 'right', 1, 1, NULL, '2025-12-24 07:27:40', NULL),
(1650, 102, 101, 'right', 1, 2, NULL, '2025-12-24 07:27:40', NULL),
(1651, 102, 100, 'right', 1, 3, NULL, '2025-12-24 07:27:40', NULL),
(1652, 102, 99, 'right', 1, 4, NULL, '2025-12-24 07:27:40', NULL),
(1653, 102, 98, 'right', 1, 5, NULL, '2025-12-24 07:27:40', NULL),
(1654, 102, 97, 'right', 1, 6, NULL, '2025-12-24 07:27:40', NULL),
(1655, 102, 96, 'right', 1, 7, NULL, '2025-12-24 07:27:40', NULL),
(1656, 102, 95, 'right', 1, 8, NULL, '2025-12-24 07:27:40', NULL),
(1657, 102, 62, 'right', 1, 9, NULL, '2025-12-24 07:27:40', NULL),
(1658, 102, 38, 'left', 1, 10, NULL, '2025-12-24 07:27:40', NULL),
(1659, 102, 37, 'left', 1, 11, NULL, '2025-12-24 07:27:40', NULL),
(1660, 102, 36, 'left', 1, 12, NULL, '2025-12-24 07:27:40', NULL),
(1661, 102, 26, 'left', 1, 13, NULL, '2025-12-24 07:27:40', NULL),
(1662, 102, 24, 'right', 1, 14, NULL, '2025-12-24 07:27:40', NULL),
(1663, 102, 23, 'left', 1, 15, NULL, '2025-12-24 07:27:40', NULL),
(1664, 102, 22, 'left', 1, 16, NULL, '2025-12-24 07:27:40', NULL),
(1665, 102, 19, 'left', 1, 17, NULL, '2025-12-24 07:27:40', NULL),
(1666, 103, 102, 'right', 1, 1, NULL, '2025-12-24 07:28:06', NULL),
(1667, 103, 115, 'right', 1, 2, NULL, '2025-12-24 07:28:06', NULL),
(1668, 103, 101, 'right', 1, 3, NULL, '2025-12-24 07:28:06', NULL),
(1669, 103, 100, 'right', 1, 4, NULL, '2025-12-24 07:28:06', NULL),
(1670, 103, 99, 'right', 1, 5, NULL, '2025-12-24 07:28:06', NULL),
(1671, 103, 98, 'right', 1, 6, NULL, '2025-12-24 07:28:06', NULL),
(1672, 103, 97, 'right', 1, 7, NULL, '2025-12-24 07:28:06', NULL),
(1673, 103, 96, 'right', 1, 8, NULL, '2025-12-24 07:28:06', NULL),
(1674, 103, 95, 'right', 1, 9, NULL, '2025-12-24 07:28:06', NULL),
(1675, 103, 62, 'right', 1, 10, NULL, '2025-12-24 07:28:06', NULL),
(1676, 103, 38, 'left', 1, 11, NULL, '2025-12-24 07:28:06', NULL),
(1677, 103, 37, 'left', 1, 12, NULL, '2025-12-24 07:28:06', NULL),
(1678, 103, 36, 'left', 1, 13, NULL, '2025-12-24 07:28:06', NULL),
(1679, 103, 26, 'left', 1, 14, NULL, '2025-12-24 07:28:06', NULL),
(1680, 103, 24, 'right', 1, 15, NULL, '2025-12-24 07:28:06', NULL),
(1681, 103, 23, 'left', 1, 16, NULL, '2025-12-24 07:28:06', NULL),
(1682, 103, 22, 'left', 1, 17, NULL, '2025-12-24 07:28:06', NULL),
(1683, 103, 19, 'left', 1, 18, NULL, '2025-12-24 07:28:06', NULL),
(1684, 104, 103, 'right', 1, 1, NULL, '2025-12-24 07:28:29', NULL),
(1685, 104, 102, 'right', 1, 2, NULL, '2025-12-24 07:28:29', NULL),
(1686, 104, 115, 'right', 1, 3, NULL, '2025-12-24 07:28:29', NULL),
(1687, 104, 101, 'right', 1, 4, NULL, '2025-12-24 07:28:29', NULL),
(1688, 104, 100, 'right', 1, 5, NULL, '2025-12-24 07:28:29', NULL),
(1689, 104, 99, 'right', 1, 6, NULL, '2025-12-24 07:28:29', NULL),
(1690, 104, 98, 'right', 1, 7, NULL, '2025-12-24 07:28:29', NULL),
(1691, 104, 97, 'right', 1, 8, NULL, '2025-12-24 07:28:29', NULL),
(1692, 104, 96, 'right', 1, 9, NULL, '2025-12-24 07:28:29', NULL),
(1693, 104, 95, 'right', 1, 10, NULL, '2025-12-24 07:28:29', NULL),
(1694, 104, 62, 'right', 1, 11, NULL, '2025-12-24 07:28:29', NULL),
(1695, 104, 38, 'left', 1, 12, NULL, '2025-12-24 07:28:29', NULL),
(1696, 104, 37, 'left', 1, 13, NULL, '2025-12-24 07:28:29', NULL),
(1697, 104, 36, 'left', 1, 14, NULL, '2025-12-24 07:28:29', NULL),
(1698, 104, 26, 'left', 1, 15, NULL, '2025-12-24 07:28:29', NULL),
(1699, 104, 24, 'right', 1, 16, NULL, '2025-12-24 07:28:29', NULL),
(1700, 104, 23, 'left', 1, 17, NULL, '2025-12-24 07:28:29', NULL),
(1701, 104, 22, 'left', 1, 18, NULL, '2025-12-24 07:28:29', NULL),
(1702, 104, 19, 'left', 1, 19, NULL, '2025-12-24 07:28:29', NULL),
(1703, 128, 53, 'left', 1, 1, NULL, '2025-12-26 03:28:34', NULL),
(1704, 128, 52, 'left', 1, 2, NULL, '2025-12-26 03:28:34', NULL),
(1705, 128, 50, 'right', 1, 3, NULL, '2025-12-26 03:28:34', NULL),
(1706, 128, 49, 'left', 1, 4, NULL, '2025-12-26 03:28:34', NULL),
(1707, 128, 35, 'left', 1, 5, NULL, '2025-12-26 03:28:34', NULL),
(1708, 128, 34, 'left', 1, 6, NULL, '2025-12-26 03:28:34', NULL),
(1709, 128, 33, 'left', 1, 7, NULL, '2025-12-26 03:28:34', NULL),
(1710, 128, 25, 'right', 1, 8, NULL, '2025-12-26 03:28:34', NULL),
(1711, 128, 24, 'left', 1, 9, NULL, '2025-12-26 03:28:34', NULL),
(1712, 128, 23, 'left', 1, 10, NULL, '2025-12-26 03:28:34', NULL),
(1713, 128, 22, 'left', 1, 11, NULL, '2025-12-26 03:28:34', NULL),
(1714, 128, 19, 'left', 1, 12, NULL, '2025-12-26 03:28:34', NULL),
(1715, 129, 53, 'right', 1, 1, NULL, '2025-12-26 03:28:51', NULL),
(1716, 129, 52, 'left', 1, 2, NULL, '2025-12-26 03:28:51', NULL),
(1717, 129, 50, 'right', 1, 3, NULL, '2025-12-26 03:28:51', NULL),
(1718, 129, 49, 'left', 1, 4, NULL, '2025-12-26 03:28:51', NULL),
(1719, 129, 35, 'left', 1, 5, NULL, '2025-12-26 03:28:51', NULL),
(1720, 129, 34, 'left', 1, 6, NULL, '2025-12-26 03:28:51', NULL),
(1721, 129, 33, 'left', 1, 7, NULL, '2025-12-26 03:28:51', NULL),
(1722, 129, 25, 'right', 1, 8, NULL, '2025-12-26 03:28:51', NULL),
(1723, 129, 24, 'left', 1, 9, NULL, '2025-12-26 03:28:51', NULL),
(1724, 129, 23, 'left', 1, 10, NULL, '2025-12-26 03:28:51', NULL),
(1725, 129, 22, 'left', 1, 11, NULL, '2025-12-26 03:28:51', NULL),
(1726, 129, 19, 'left', 1, 12, NULL, '2025-12-26 03:28:51', NULL),
(1727, 158, 60, 'left', 1, 1, NULL, '2025-12-30 03:40:14', NULL),
(1728, 158, 54, 'left', 1, 2, NULL, '2025-12-30 03:40:14', NULL),
(1729, 158, 52, 'right', 1, 3, NULL, '2025-12-30 03:40:14', NULL),
(1730, 158, 50, 'right', 1, 4, NULL, '2025-12-30 03:40:14', NULL),
(1731, 158, 49, 'left', 1, 5, NULL, '2025-12-30 03:40:14', NULL),
(1732, 158, 35, 'left', 1, 6, NULL, '2025-12-30 03:40:14', NULL),
(1733, 158, 34, 'left', 1, 7, NULL, '2025-12-30 03:40:14', NULL),
(1734, 158, 33, 'left', 1, 8, NULL, '2025-12-30 03:40:14', NULL),
(1735, 158, 25, 'right', 1, 9, NULL, '2025-12-30 03:40:14', NULL),
(1736, 158, 24, 'left', 1, 10, NULL, '2025-12-30 03:40:14', NULL),
(1737, 158, 23, 'left', 1, 11, NULL, '2025-12-30 03:40:14', NULL),
(1738, 158, 22, 'left', 1, 12, NULL, '2025-12-30 03:40:14', NULL),
(1739, 158, 19, 'left', 1, 13, NULL, '2025-12-30 03:40:14', NULL),
(1740, 117, 74, 'right', 1, 1, NULL, '2025-12-30 09:03:38', NULL),
(1741, 117, 73, 'left', 1, 2, NULL, '2025-12-30 09:03:38', NULL),
(1742, 117, 72, 'left', 1, 3, NULL, '2025-12-30 09:03:38', NULL),
(1743, 117, 71, 'left', 1, 4, NULL, '2025-12-30 09:03:38', NULL),
(1744, 117, 70, 'left', 1, 5, NULL, '2025-12-30 09:03:38', NULL),
(1745, 117, 69, 'left', 1, 6, NULL, '2025-12-30 09:03:38', NULL),
(1746, 117, 68, 'left', 1, 7, NULL, '2025-12-30 09:03:38', NULL),
(1747, 117, 67, 'left', 1, 8, NULL, '2025-12-30 09:03:38', NULL),
(1748, 117, 66, 'left', 1, 9, NULL, '2025-12-30 09:03:38', NULL),
(1749, 117, 65, 'left', 1, 10, NULL, '2025-12-30 09:03:38', NULL),
(1750, 117, 64, 'left', 1, 11, NULL, '2025-12-30 09:03:38', NULL),
(1751, 117, 63, 'left', 1, 12, NULL, '2025-12-30 09:03:38', NULL),
(1752, 117, 62, 'left', 1, 13, NULL, '2025-12-30 09:03:38', NULL),
(1753, 117, 38, 'left', 1, 14, NULL, '2025-12-30 09:03:38', NULL),
(1754, 117, 37, 'left', 1, 15, NULL, '2025-12-30 09:03:38', NULL),
(1755, 117, 36, 'left', 1, 16, NULL, '2025-12-30 09:03:38', NULL),
(1756, 117, 26, 'left', 1, 17, NULL, '2025-12-30 09:03:38', NULL),
(1757, 117, 24, 'right', 1, 18, NULL, '2025-12-30 09:03:38', NULL),
(1758, 117, 23, 'left', 1, 19, NULL, '2025-12-30 09:03:38', NULL),
(1759, 117, 22, 'left', 1, 20, NULL, '2025-12-30 09:03:38', NULL),
(1760, 117, 19, 'left', 1, 21, NULL, '2025-12-30 09:03:38', NULL),
(1761, 119, 77, 'right', 1, 1, NULL, '2025-12-30 11:01:01', NULL),
(1762, 119, 76, 'left', 1, 2, NULL, '2025-12-30 11:01:01', NULL),
(1763, 119, 75, 'left', 1, 3, NULL, '2025-12-30 11:01:01', NULL),
(1764, 119, 74, 'left', 1, 4, NULL, '2025-12-30 11:01:01', NULL),
(1765, 119, 73, 'left', 1, 5, NULL, '2025-12-30 11:01:01', NULL),
(1766, 119, 72, 'left', 1, 6, NULL, '2025-12-30 11:01:01', NULL),
(1767, 119, 71, 'left', 1, 7, NULL, '2025-12-30 11:01:01', NULL),
(1768, 119, 70, 'left', 1, 8, NULL, '2025-12-30 11:01:01', NULL),
(1769, 119, 69, 'left', 1, 9, NULL, '2025-12-30 11:01:01', NULL),
(1770, 119, 68, 'left', 1, 10, NULL, '2025-12-30 11:01:01', NULL),
(1771, 119, 67, 'left', 1, 11, NULL, '2025-12-30 11:01:01', NULL),
(1772, 119, 66, 'left', 1, 12, NULL, '2025-12-30 11:01:01', NULL),
(1773, 119, 65, 'left', 1, 13, NULL, '2025-12-30 11:01:01', NULL),
(1774, 119, 64, 'left', 1, 14, NULL, '2025-12-30 11:01:01', NULL),
(1775, 119, 63, 'left', 1, 15, NULL, '2025-12-30 11:01:01', NULL),
(1776, 119, 62, 'left', 1, 16, NULL, '2025-12-30 11:01:01', NULL),
(1777, 119, 38, 'left', 1, 17, NULL, '2025-12-30 11:01:01', NULL),
(1778, 119, 37, 'left', 1, 18, NULL, '2025-12-30 11:01:01', NULL),
(1779, 119, 36, 'left', 1, 19, NULL, '2025-12-30 11:01:01', NULL),
(1780, 119, 26, 'left', 1, 20, NULL, '2025-12-30 11:01:01', NULL),
(1781, 119, 24, 'right', 1, 21, NULL, '2025-12-30 11:01:01', NULL),
(1782, 119, 23, 'left', 1, 22, NULL, '2025-12-30 11:01:01', NULL),
(1783, 119, 22, 'left', 1, 23, NULL, '2025-12-30 11:01:01', NULL),
(1784, 119, 19, 'left', 1, 24, NULL, '2025-12-30 11:01:01', NULL),
(1785, 120, 86, 'right', 1, 1, NULL, '2025-12-30 11:38:54', NULL),
(1786, 120, 85, 'left', 1, 2, NULL, '2025-12-30 11:38:54', NULL),
(1787, 120, 84, 'left', 1, 3, NULL, '2025-12-30 11:38:54', NULL),
(1788, 120, 83, 'left', 1, 4, NULL, '2025-12-30 11:38:54', NULL),
(1789, 120, 82, 'left', 1, 5, NULL, '2025-12-30 11:38:54', NULL),
(1790, 120, 81, 'left', 1, 6, NULL, '2025-12-30 11:38:54', NULL),
(1791, 120, 80, 'left', 1, 7, NULL, '2025-12-30 11:38:54', NULL),
(1792, 120, 79, 'left', 1, 8, NULL, '2025-12-30 11:38:54', NULL),
(1793, 120, 78, 'left', 1, 9, NULL, '2025-12-30 11:38:54', NULL),
(1794, 120, 77, 'left', 1, 10, NULL, '2025-12-30 11:38:54', NULL),
(1795, 120, 76, 'left', 1, 11, NULL, '2025-12-30 11:38:54', NULL),
(1796, 120, 75, 'left', 1, 12, NULL, '2025-12-30 11:38:54', NULL),
(1797, 120, 74, 'left', 1, 13, NULL, '2025-12-30 11:38:54', NULL),
(1798, 120, 73, 'left', 1, 14, NULL, '2025-12-30 11:38:54', NULL),
(1799, 120, 72, 'left', 1, 15, NULL, '2025-12-30 11:38:54', NULL),
(1800, 120, 71, 'left', 1, 16, NULL, '2025-12-30 11:38:54', NULL),
(1801, 120, 70, 'left', 1, 17, NULL, '2025-12-30 11:38:54', NULL),
(1802, 120, 69, 'left', 1, 18, NULL, '2025-12-30 11:38:54', NULL),
(1803, 120, 68, 'left', 1, 19, NULL, '2025-12-30 11:38:54', NULL),
(1804, 120, 67, 'left', 1, 20, NULL, '2025-12-30 11:38:54', NULL),
(1805, 120, 66, 'left', 1, 21, NULL, '2025-12-30 11:38:54', NULL),
(1806, 120, 65, 'left', 1, 22, NULL, '2025-12-30 11:38:54', NULL),
(1807, 120, 64, 'left', 1, 23, NULL, '2025-12-30 11:38:54', NULL),
(1808, 120, 63, 'left', 1, 24, NULL, '2025-12-30 11:38:54', NULL),
(1809, 120, 62, 'left', 1, 25, NULL, '2025-12-30 11:38:54', NULL),
(1810, 120, 38, 'left', 1, 26, NULL, '2025-12-30 11:38:54', NULL),
(1811, 120, 37, 'left', 1, 27, NULL, '2025-12-30 11:38:54', NULL),
(1812, 120, 36, 'left', 1, 28, NULL, '2025-12-30 11:38:54', NULL),
(1813, 120, 26, 'left', 1, 29, NULL, '2025-12-30 11:38:54', NULL),
(1814, 120, 24, 'right', 1, 30, NULL, '2025-12-30 11:38:54', NULL),
(1815, 120, 23, 'left', 1, 31, NULL, '2025-12-30 11:38:54', NULL),
(1816, 120, 22, 'left', 1, 32, NULL, '2025-12-30 11:38:54', NULL),
(1817, 120, 19, 'left', 1, 33, NULL, '2025-12-30 11:38:54', NULL),
(1818, 163, 120, 'right', 1, 1, NULL, '2025-12-30 14:41:56', NULL),
(1819, 163, 86, 'right', 1, 2, NULL, '2025-12-30 14:41:56', NULL),
(1820, 163, 85, 'left', 1, 3, NULL, '2025-12-30 14:41:56', NULL),
(1821, 163, 84, 'left', 1, 4, NULL, '2025-12-30 14:41:56', NULL),
(1822, 163, 83, 'left', 1, 5, NULL, '2025-12-30 14:41:56', NULL),
(1823, 163, 82, 'left', 1, 6, NULL, '2025-12-30 14:41:56', NULL),
(1824, 163, 81, 'left', 1, 7, NULL, '2025-12-30 14:41:56', NULL),
(1825, 163, 80, 'left', 1, 8, NULL, '2025-12-30 14:41:56', NULL),
(1826, 163, 79, 'left', 1, 9, NULL, '2025-12-30 14:41:56', NULL),
(1827, 163, 78, 'left', 1, 10, NULL, '2025-12-30 14:41:56', NULL),
(1828, 163, 77, 'left', 1, 11, NULL, '2025-12-30 14:41:56', NULL),
(1829, 163, 76, 'left', 1, 12, NULL, '2025-12-30 14:41:56', NULL),
(1830, 163, 75, 'left', 1, 13, NULL, '2025-12-30 14:41:56', NULL),
(1831, 163, 74, 'left', 1, 14, NULL, '2025-12-30 14:41:56', NULL),
(1832, 163, 73, 'left', 1, 15, NULL, '2025-12-30 14:41:56', NULL),
(1833, 163, 72, 'left', 1, 16, NULL, '2025-12-30 14:41:56', NULL),
(1834, 163, 71, 'left', 1, 17, NULL, '2025-12-30 14:41:56', NULL),
(1835, 163, 70, 'left', 1, 18, NULL, '2025-12-30 14:41:56', NULL),
(1836, 163, 69, 'left', 1, 19, NULL, '2025-12-30 14:41:56', NULL),
(1837, 163, 68, 'left', 1, 20, NULL, '2025-12-30 14:41:56', NULL),
(1838, 163, 67, 'left', 1, 21, NULL, '2025-12-30 14:41:56', NULL),
(1839, 163, 66, 'left', 1, 22, NULL, '2025-12-30 14:41:56', NULL),
(1840, 163, 65, 'left', 1, 23, NULL, '2025-12-30 14:41:56', NULL),
(1841, 163, 64, 'left', 1, 24, NULL, '2025-12-30 14:41:56', NULL),
(1842, 163, 63, 'left', 1, 25, NULL, '2025-12-30 14:41:56', NULL),
(1843, 163, 62, 'left', 1, 26, NULL, '2025-12-30 14:41:56', NULL),
(1844, 163, 38, 'left', 1, 27, NULL, '2025-12-30 14:41:56', NULL),
(1845, 163, 37, 'left', 1, 28, NULL, '2025-12-30 14:41:56', NULL),
(1846, 163, 36, 'left', 1, 29, NULL, '2025-12-30 14:41:56', NULL),
(1847, 163, 26, 'left', 1, 30, NULL, '2025-12-30 14:41:56', NULL),
(1848, 163, 24, 'right', 1, 31, NULL, '2025-12-30 14:41:56', NULL),
(1849, 163, 23, 'left', 1, 32, NULL, '2025-12-30 14:41:56', NULL),
(1850, 163, 22, 'left', 1, 33, NULL, '2025-12-30 14:41:56', NULL),
(1851, 163, 19, 'left', 1, 34, NULL, '2025-12-30 14:41:56', NULL),
(1852, 164, 163, 'right', 1, 1, NULL, '2025-12-30 15:09:21', NULL),
(1853, 164, 120, 'right', 1, 2, NULL, '2025-12-30 15:09:21', NULL),
(1854, 164, 86, 'right', 1, 3, NULL, '2025-12-30 15:09:21', NULL),
(1855, 164, 85, 'left', 1, 4, NULL, '2025-12-30 15:09:21', NULL),
(1856, 164, 84, 'left', 1, 5, NULL, '2025-12-30 15:09:21', NULL),
(1857, 164, 83, 'left', 1, 6, NULL, '2025-12-30 15:09:21', NULL),
(1858, 164, 82, 'left', 1, 7, NULL, '2025-12-30 15:09:21', NULL),
(1859, 164, 81, 'left', 1, 8, NULL, '2025-12-30 15:09:21', NULL),
(1860, 164, 80, 'left', 1, 9, NULL, '2025-12-30 15:09:21', NULL),
(1861, 164, 79, 'left', 1, 10, NULL, '2025-12-30 15:09:21', NULL),
(1862, 164, 78, 'left', 1, 11, NULL, '2025-12-30 15:09:21', NULL),
(1863, 164, 77, 'left', 1, 12, NULL, '2025-12-30 15:09:21', NULL),
(1864, 164, 76, 'left', 1, 13, NULL, '2025-12-30 15:09:21', NULL),
(1865, 164, 75, 'left', 1, 14, NULL, '2025-12-30 15:09:21', NULL),
(1866, 164, 74, 'left', 1, 15, NULL, '2025-12-30 15:09:21', NULL),
(1867, 164, 73, 'left', 1, 16, NULL, '2025-12-30 15:09:21', NULL),
(1868, 164, 72, 'left', 1, 17, NULL, '2025-12-30 15:09:21', NULL),
(1869, 164, 71, 'left', 1, 18, NULL, '2025-12-30 15:09:21', NULL),
(1870, 164, 70, 'left', 1, 19, NULL, '2025-12-30 15:09:21', NULL),
(1871, 164, 69, 'left', 1, 20, NULL, '2025-12-30 15:09:21', NULL),
(1872, 164, 68, 'left', 1, 21, NULL, '2025-12-30 15:09:21', NULL),
(1873, 164, 67, 'left', 1, 22, NULL, '2025-12-30 15:09:21', NULL),
(1874, 164, 66, 'left', 1, 23, NULL, '2025-12-30 15:09:21', NULL),
(1875, 164, 65, 'left', 1, 24, NULL, '2025-12-30 15:09:21', NULL),
(1876, 164, 64, 'left', 1, 25, NULL, '2025-12-30 15:09:21', NULL),
(1877, 164, 63, 'left', 1, 26, NULL, '2025-12-30 15:09:21', NULL),
(1878, 164, 62, 'left', 1, 27, NULL, '2025-12-30 15:09:21', NULL),
(1879, 164, 38, 'left', 1, 28, NULL, '2025-12-30 15:09:21', NULL),
(1880, 164, 37, 'left', 1, 29, NULL, '2025-12-30 15:09:21', NULL),
(1881, 164, 36, 'left', 1, 30, NULL, '2025-12-30 15:09:21', NULL),
(1882, 164, 26, 'left', 1, 31, NULL, '2025-12-30 15:09:21', NULL),
(1883, 164, 24, 'right', 1, 32, NULL, '2025-12-30 15:09:21', NULL),
(1884, 164, 23, 'left', 1, 33, NULL, '2025-12-30 15:09:21', NULL),
(1885, 164, 22, 'left', 1, 34, NULL, '2025-12-30 15:09:21', NULL),
(1886, 164, 19, 'left', 1, 35, NULL, '2025-12-30 15:09:21', NULL),
(1887, 165, 164, 'right', 1, 1, NULL, '2025-12-30 15:39:19', NULL),
(1888, 165, 163, 'right', 1, 2, NULL, '2025-12-30 15:39:19', NULL),
(1889, 165, 120, 'right', 1, 3, NULL, '2025-12-30 15:39:19', NULL),
(1890, 165, 86, 'right', 1, 4, NULL, '2025-12-30 15:39:19', NULL),
(1891, 165, 85, 'left', 1, 5, NULL, '2025-12-30 15:39:19', NULL),
(1892, 165, 84, 'left', 1, 6, NULL, '2025-12-30 15:39:19', NULL),
(1893, 165, 83, 'left', 1, 7, NULL, '2025-12-30 15:39:19', NULL),
(1894, 165, 82, 'left', 1, 8, NULL, '2025-12-30 15:39:19', NULL),
(1895, 165, 81, 'left', 1, 9, NULL, '2025-12-30 15:39:19', NULL),
(1896, 165, 80, 'left', 1, 10, NULL, '2025-12-30 15:39:19', NULL),
(1897, 165, 79, 'left', 1, 11, NULL, '2025-12-30 15:39:19', NULL),
(1898, 165, 78, 'left', 1, 12, NULL, '2025-12-30 15:39:19', NULL),
(1899, 165, 77, 'left', 1, 13, NULL, '2025-12-30 15:39:19', NULL),
(1900, 165, 76, 'left', 1, 14, NULL, '2025-12-30 15:39:19', NULL),
(1901, 165, 75, 'left', 1, 15, NULL, '2025-12-30 15:39:19', NULL),
(1902, 165, 74, 'left', 1, 16, NULL, '2025-12-30 15:39:19', NULL),
(1903, 165, 73, 'left', 1, 17, NULL, '2025-12-30 15:39:19', NULL),
(1904, 165, 72, 'left', 1, 18, NULL, '2025-12-30 15:39:19', NULL),
(1905, 165, 71, 'left', 1, 19, NULL, '2025-12-30 15:39:19', NULL),
(1906, 165, 70, 'left', 1, 20, NULL, '2025-12-30 15:39:19', NULL),
(1907, 165, 69, 'left', 1, 21, NULL, '2025-12-30 15:39:19', NULL),
(1908, 165, 68, 'left', 1, 22, NULL, '2025-12-30 15:39:19', NULL),
(1909, 165, 67, 'left', 1, 23, NULL, '2025-12-30 15:39:19', NULL),
(1910, 165, 66, 'left', 1, 24, NULL, '2025-12-30 15:39:19', NULL),
(1911, 165, 65, 'left', 1, 25, NULL, '2025-12-30 15:39:19', NULL),
(1912, 165, 64, 'left', 1, 26, NULL, '2025-12-30 15:39:19', NULL),
(1913, 165, 63, 'left', 1, 27, NULL, '2025-12-30 15:39:19', NULL),
(1914, 165, 62, 'left', 1, 28, NULL, '2025-12-30 15:39:19', NULL),
(1915, 165, 38, 'left', 1, 29, NULL, '2025-12-30 15:39:19', NULL),
(1916, 165, 37, 'left', 1, 30, NULL, '2025-12-30 15:39:19', NULL),
(1917, 165, 36, 'left', 1, 31, NULL, '2025-12-30 15:39:19', NULL),
(1918, 165, 26, 'left', 1, 32, NULL, '2025-12-30 15:39:19', NULL),
(1919, 165, 24, 'right', 1, 33, NULL, '2025-12-30 15:39:19', NULL),
(1920, 165, 23, 'left', 1, 34, NULL, '2025-12-30 15:39:19', NULL),
(1921, 165, 22, 'left', 1, 35, NULL, '2025-12-30 15:39:19', NULL),
(1922, 165, 19, 'left', 1, 36, NULL, '2025-12-30 15:39:19', NULL),
(1923, 166, 165, 'right', 1, 1, NULL, '2025-12-30 16:00:09', NULL),
(1924, 166, 164, 'right', 1, 2, NULL, '2025-12-30 16:00:09', NULL),
(1925, 166, 163, 'right', 1, 3, NULL, '2025-12-30 16:00:09', NULL),
(1926, 166, 120, 'right', 1, 4, NULL, '2025-12-30 16:00:09', NULL),
(1927, 166, 86, 'right', 1, 5, NULL, '2025-12-30 16:00:09', NULL),
(1928, 166, 85, 'left', 1, 6, NULL, '2025-12-30 16:00:09', NULL),
(1929, 166, 84, 'left', 1, 7, NULL, '2025-12-30 16:00:09', NULL),
(1930, 166, 83, 'left', 1, 8, NULL, '2025-12-30 16:00:09', NULL),
(1931, 166, 82, 'left', 1, 9, NULL, '2025-12-30 16:00:09', NULL),
(1932, 166, 81, 'left', 1, 10, NULL, '2025-12-30 16:00:09', NULL),
(1933, 166, 80, 'left', 1, 11, NULL, '2025-12-30 16:00:09', NULL),
(1934, 166, 79, 'left', 1, 12, NULL, '2025-12-30 16:00:09', NULL),
(1935, 166, 78, 'left', 1, 13, NULL, '2025-12-30 16:00:09', NULL),
(1936, 166, 77, 'left', 1, 14, NULL, '2025-12-30 16:00:09', NULL),
(1937, 166, 76, 'left', 1, 15, NULL, '2025-12-30 16:00:09', NULL),
(1938, 166, 75, 'left', 1, 16, NULL, '2025-12-30 16:00:09', NULL),
(1939, 166, 74, 'left', 1, 17, NULL, '2025-12-30 16:00:09', NULL),
(1940, 166, 73, 'left', 1, 18, NULL, '2025-12-30 16:00:09', NULL),
(1941, 166, 72, 'left', 1, 19, NULL, '2025-12-30 16:00:09', NULL),
(1942, 166, 71, 'left', 1, 20, NULL, '2025-12-30 16:00:09', NULL),
(1943, 166, 70, 'left', 1, 21, NULL, '2025-12-30 16:00:09', NULL),
(1944, 166, 69, 'left', 1, 22, NULL, '2025-12-30 16:00:09', NULL),
(1945, 166, 68, 'left', 1, 23, NULL, '2025-12-30 16:00:09', NULL),
(1946, 166, 67, 'left', 1, 24, NULL, '2025-12-30 16:00:09', NULL),
(1947, 166, 66, 'left', 1, 25, NULL, '2025-12-30 16:00:09', NULL),
(1948, 166, 65, 'left', 1, 26, NULL, '2025-12-30 16:00:09', NULL),
(1949, 166, 64, 'left', 1, 27, NULL, '2025-12-30 16:00:09', NULL),
(1950, 166, 63, 'left', 1, 28, NULL, '2025-12-30 16:00:09', NULL),
(1951, 166, 62, 'left', 1, 29, NULL, '2025-12-30 16:00:09', NULL),
(1952, 166, 38, 'left', 1, 30, NULL, '2025-12-30 16:00:09', NULL),
(1953, 166, 37, 'left', 1, 31, NULL, '2025-12-30 16:00:09', NULL),
(1954, 166, 36, 'left', 1, 32, NULL, '2025-12-30 16:00:09', NULL),
(1955, 166, 26, 'left', 1, 33, NULL, '2025-12-30 16:00:09', NULL),
(1956, 166, 24, 'right', 1, 34, NULL, '2025-12-30 16:00:09', NULL),
(1957, 166, 23, 'left', 1, 35, NULL, '2025-12-30 16:00:09', NULL),
(1958, 166, 22, 'left', 1, 36, NULL, '2025-12-30 16:00:09', NULL),
(1959, 166, 19, 'left', 1, 37, NULL, '2025-12-30 16:00:09', NULL),
(1960, 167, 166, 'right', 1, 1, NULL, '2025-12-30 16:28:43', NULL),
(1961, 167, 165, 'right', 1, 2, NULL, '2025-12-30 16:28:43', NULL),
(1962, 167, 164, 'right', 1, 3, NULL, '2025-12-30 16:28:43', NULL),
(1963, 167, 163, 'right', 1, 4, NULL, '2025-12-30 16:28:43', NULL),
(1964, 167, 120, 'right', 1, 5, NULL, '2025-12-30 16:28:43', NULL),
(1965, 167, 86, 'right', 1, 6, NULL, '2025-12-30 16:28:43', NULL),
(1966, 167, 85, 'left', 1, 7, NULL, '2025-12-30 16:28:43', NULL),
(1967, 167, 84, 'left', 1, 8, NULL, '2025-12-30 16:28:43', NULL),
(1968, 167, 83, 'left', 1, 9, NULL, '2025-12-30 16:28:43', NULL),
(1969, 167, 82, 'left', 1, 10, NULL, '2025-12-30 16:28:43', NULL),
(1970, 167, 81, 'left', 1, 11, NULL, '2025-12-30 16:28:43', NULL),
(1971, 167, 80, 'left', 1, 12, NULL, '2025-12-30 16:28:43', NULL),
(1972, 167, 79, 'left', 1, 13, NULL, '2025-12-30 16:28:43', NULL),
(1973, 167, 78, 'left', 1, 14, NULL, '2025-12-30 16:28:43', NULL),
(1974, 167, 77, 'left', 1, 15, NULL, '2025-12-30 16:28:43', NULL),
(1975, 167, 76, 'left', 1, 16, NULL, '2025-12-30 16:28:43', NULL),
(1976, 167, 75, 'left', 1, 17, NULL, '2025-12-30 16:28:43', NULL),
(1977, 167, 74, 'left', 1, 18, NULL, '2025-12-30 16:28:43', NULL),
(1978, 167, 73, 'left', 1, 19, NULL, '2025-12-30 16:28:43', NULL),
(1979, 167, 72, 'left', 1, 20, NULL, '2025-12-30 16:28:43', NULL),
(1980, 167, 71, 'left', 1, 21, NULL, '2025-12-30 16:28:43', NULL),
(1981, 167, 70, 'left', 1, 22, NULL, '2025-12-30 16:28:43', NULL),
(1982, 167, 69, 'left', 1, 23, NULL, '2025-12-30 16:28:43', NULL),
(1983, 167, 68, 'left', 1, 24, NULL, '2025-12-30 16:28:43', NULL),
(1984, 167, 67, 'left', 1, 25, NULL, '2025-12-30 16:28:43', NULL),
(1985, 167, 66, 'left', 1, 26, NULL, '2025-12-30 16:28:43', NULL),
(1986, 167, 65, 'left', 1, 27, NULL, '2025-12-30 16:28:43', NULL),
(1987, 167, 64, 'left', 1, 28, NULL, '2025-12-30 16:28:43', NULL),
(1988, 167, 63, 'left', 1, 29, NULL, '2025-12-30 16:28:43', NULL),
(1989, 167, 62, 'left', 1, 30, NULL, '2025-12-30 16:28:43', NULL),
(1990, 167, 38, 'left', 1, 31, NULL, '2025-12-30 16:28:43', NULL),
(1991, 167, 37, 'left', 1, 32, NULL, '2025-12-30 16:28:43', NULL),
(1992, 167, 36, 'left', 1, 33, NULL, '2025-12-30 16:28:43', NULL),
(1993, 167, 26, 'left', 1, 34, NULL, '2025-12-30 16:28:43', NULL),
(1994, 167, 24, 'right', 1, 35, NULL, '2025-12-30 16:28:43', NULL),
(1995, 167, 23, 'left', 1, 36, NULL, '2025-12-30 16:28:43', NULL),
(1996, 167, 22, 'left', 1, 37, NULL, '2025-12-30 16:28:43', NULL),
(1997, 167, 19, 'left', 1, 38, NULL, '2025-12-30 16:28:43', NULL),
(1998, 169, 167, 'right', 1, 1, NULL, '2025-12-30 16:49:06', NULL),
(1999, 169, 166, 'right', 1, 2, NULL, '2025-12-30 16:49:06', NULL),
(2000, 169, 165, 'right', 1, 3, NULL, '2025-12-30 16:49:06', NULL),
(2001, 169, 164, 'right', 1, 4, NULL, '2025-12-30 16:49:06', NULL),
(2002, 169, 163, 'right', 1, 5, NULL, '2025-12-30 16:49:06', NULL),
(2003, 169, 120, 'right', 1, 6, NULL, '2025-12-30 16:49:06', NULL),
(2004, 169, 86, 'right', 1, 7, NULL, '2025-12-30 16:49:06', NULL),
(2005, 169, 85, 'left', 1, 8, NULL, '2025-12-30 16:49:06', NULL),
(2006, 169, 84, 'left', 1, 9, NULL, '2025-12-30 16:49:06', NULL),
(2007, 169, 83, 'left', 1, 10, NULL, '2025-12-30 16:49:06', NULL),
(2008, 169, 82, 'left', 1, 11, NULL, '2025-12-30 16:49:06', NULL),
(2009, 169, 81, 'left', 1, 12, NULL, '2025-12-30 16:49:06', NULL),
(2010, 169, 80, 'left', 1, 13, NULL, '2025-12-30 16:49:06', NULL),
(2011, 169, 79, 'left', 1, 14, NULL, '2025-12-30 16:49:06', NULL),
(2012, 169, 78, 'left', 1, 15, NULL, '2025-12-30 16:49:06', NULL),
(2013, 169, 77, 'left', 1, 16, NULL, '2025-12-30 16:49:06', NULL),
(2014, 169, 76, 'left', 1, 17, NULL, '2025-12-30 16:49:06', NULL),
(2015, 169, 75, 'left', 1, 18, NULL, '2025-12-30 16:49:06', NULL),
(2016, 169, 74, 'left', 1, 19, NULL, '2025-12-30 16:49:06', NULL),
(2017, 169, 73, 'left', 1, 20, NULL, '2025-12-30 16:49:06', NULL),
(2018, 169, 72, 'left', 1, 21, NULL, '2025-12-30 16:49:06', NULL),
(2019, 169, 71, 'left', 1, 22, NULL, '2025-12-30 16:49:06', NULL),
(2020, 169, 70, 'left', 1, 23, NULL, '2025-12-30 16:49:06', NULL),
(2021, 169, 69, 'left', 1, 24, NULL, '2025-12-30 16:49:06', NULL),
(2022, 169, 68, 'left', 1, 25, NULL, '2025-12-30 16:49:06', NULL),
(2023, 169, 67, 'left', 1, 26, NULL, '2025-12-30 16:49:06', NULL),
(2024, 169, 66, 'left', 1, 27, NULL, '2025-12-30 16:49:06', NULL),
(2025, 169, 65, 'left', 1, 28, NULL, '2025-12-30 16:49:06', NULL),
(2026, 169, 64, 'left', 1, 29, NULL, '2025-12-30 16:49:06', NULL),
(2027, 169, 63, 'left', 1, 30, NULL, '2025-12-30 16:49:06', NULL),
(2028, 169, 62, 'left', 1, 31, NULL, '2025-12-30 16:49:06', NULL),
(2029, 169, 38, 'left', 1, 32, NULL, '2025-12-30 16:49:06', NULL),
(2030, 169, 37, 'left', 1, 33, NULL, '2025-12-30 16:49:06', NULL),
(2031, 169, 36, 'left', 1, 34, NULL, '2025-12-30 16:49:06', NULL),
(2032, 169, 26, 'left', 1, 35, NULL, '2025-12-30 16:49:06', NULL),
(2033, 169, 24, 'right', 1, 36, NULL, '2025-12-30 16:49:06', NULL),
(2034, 169, 23, 'left', 1, 37, NULL, '2025-12-30 16:49:06', NULL),
(2035, 169, 22, 'left', 1, 38, NULL, '2025-12-30 16:49:06', NULL),
(2036, 169, 19, 'left', 1, 39, NULL, '2025-12-30 16:49:06', NULL),
(2037, 168, 167, 'left', 1, 1, NULL, '2025-12-30 16:57:36', NULL),
(2038, 168, 166, 'right', 1, 2, NULL, '2025-12-30 16:57:36', NULL),
(2039, 168, 165, 'right', 1, 3, NULL, '2025-12-30 16:57:36', NULL),
(2040, 168, 164, 'right', 1, 4, NULL, '2025-12-30 16:57:36', NULL),
(2041, 168, 163, 'right', 1, 5, NULL, '2025-12-30 16:57:36', NULL),
(2042, 168, 120, 'right', 1, 6, NULL, '2025-12-30 16:57:36', NULL),
(2043, 168, 86, 'right', 1, 7, NULL, '2025-12-30 16:57:36', NULL),
(2044, 168, 85, 'left', 1, 8, NULL, '2025-12-30 16:57:36', NULL),
(2045, 168, 84, 'left', 1, 9, NULL, '2025-12-30 16:57:36', NULL),
(2046, 168, 83, 'left', 1, 10, NULL, '2025-12-30 16:57:36', NULL),
(2047, 168, 82, 'left', 1, 11, NULL, '2025-12-30 16:57:36', NULL),
(2048, 168, 81, 'left', 1, 12, NULL, '2025-12-30 16:57:36', NULL),
(2049, 168, 80, 'left', 1, 13, NULL, '2025-12-30 16:57:36', NULL),
(2050, 168, 79, 'left', 1, 14, NULL, '2025-12-30 16:57:36', NULL),
(2051, 168, 78, 'left', 1, 15, NULL, '2025-12-30 16:57:36', NULL),
(2052, 168, 77, 'left', 1, 16, NULL, '2025-12-30 16:57:36', NULL),
(2053, 168, 76, 'left', 1, 17, NULL, '2025-12-30 16:57:36', NULL),
(2054, 168, 75, 'left', 1, 18, NULL, '2025-12-30 16:57:36', NULL),
(2055, 168, 74, 'left', 1, 19, NULL, '2025-12-30 16:57:36', NULL),
(2056, 168, 73, 'left', 1, 20, NULL, '2025-12-30 16:57:36', NULL),
(2057, 168, 72, 'left', 1, 21, NULL, '2025-12-30 16:57:36', NULL),
(2058, 168, 71, 'left', 1, 22, NULL, '2025-12-30 16:57:36', NULL),
(2059, 168, 70, 'left', 1, 23, NULL, '2025-12-30 16:57:36', NULL),
(2060, 168, 69, 'left', 1, 24, NULL, '2025-12-30 16:57:36', NULL),
(2061, 168, 68, 'left', 1, 25, NULL, '2025-12-30 16:57:36', NULL),
(2062, 168, 67, 'left', 1, 26, NULL, '2025-12-30 16:57:36', NULL),
(2063, 168, 66, 'left', 1, 27, NULL, '2025-12-30 16:57:36', NULL),
(2064, 168, 65, 'left', 1, 28, NULL, '2025-12-30 16:57:36', NULL),
(2065, 168, 64, 'left', 1, 29, NULL, '2025-12-30 16:57:36', NULL),
(2066, 168, 63, 'left', 1, 30, NULL, '2025-12-30 16:57:36', NULL),
(2067, 168, 62, 'left', 1, 31, NULL, '2025-12-30 16:57:36', NULL),
(2068, 168, 38, 'left', 1, 32, NULL, '2025-12-30 16:57:36', NULL),
(2069, 168, 37, 'left', 1, 33, NULL, '2025-12-30 16:57:36', NULL),
(2070, 168, 36, 'left', 1, 34, NULL, '2025-12-30 16:57:36', NULL),
(2071, 168, 26, 'left', 1, 35, NULL, '2025-12-30 16:57:36', NULL),
(2072, 168, 24, 'right', 1, 36, NULL, '2025-12-30 16:57:36', NULL),
(2073, 168, 23, 'left', 1, 37, NULL, '2025-12-30 16:57:36', NULL),
(2074, 168, 22, 'left', 1, 38, NULL, '2025-12-30 16:57:36', NULL),
(2075, 168, 19, 'left', 1, 39, NULL, '2025-12-30 16:57:36', NULL),
(2076, 170, 169, 'right', 1, 1, NULL, '2025-12-30 17:21:47', NULL),
(2077, 170, 167, 'right', 1, 2, NULL, '2025-12-30 17:21:47', NULL),
(2078, 170, 166, 'right', 1, 3, NULL, '2025-12-30 17:21:47', NULL),
(2079, 170, 165, 'right', 1, 4, NULL, '2025-12-30 17:21:47', NULL),
(2080, 170, 164, 'right', 1, 5, NULL, '2025-12-30 17:21:47', NULL),
(2081, 170, 163, 'right', 1, 6, NULL, '2025-12-30 17:21:47', NULL),
(2082, 170, 120, 'right', 1, 7, NULL, '2025-12-30 17:21:47', NULL),
(2083, 170, 86, 'right', 1, 8, NULL, '2025-12-30 17:21:47', NULL),
(2084, 170, 85, 'left', 1, 9, NULL, '2025-12-30 17:21:47', NULL),
(2085, 170, 84, 'left', 1, 10, NULL, '2025-12-30 17:21:47', NULL),
(2086, 170, 83, 'left', 1, 11, NULL, '2025-12-30 17:21:47', NULL),
(2087, 170, 82, 'left', 1, 12, NULL, '2025-12-30 17:21:47', NULL),
(2088, 170, 81, 'left', 1, 13, NULL, '2025-12-30 17:21:47', NULL),
(2089, 170, 80, 'left', 1, 14, NULL, '2025-12-30 17:21:47', NULL),
(2090, 170, 79, 'left', 1, 15, NULL, '2025-12-30 17:21:47', NULL),
(2091, 170, 78, 'left', 1, 16, NULL, '2025-12-30 17:21:47', NULL),
(2092, 170, 77, 'left', 1, 17, NULL, '2025-12-30 17:21:47', NULL),
(2093, 170, 76, 'left', 1, 18, NULL, '2025-12-30 17:21:47', NULL),
(2094, 170, 75, 'left', 1, 19, NULL, '2025-12-30 17:21:47', NULL),
(2095, 170, 74, 'left', 1, 20, NULL, '2025-12-30 17:21:47', NULL),
(2096, 170, 73, 'left', 1, 21, NULL, '2025-12-30 17:21:47', NULL),
(2097, 170, 72, 'left', 1, 22, NULL, '2025-12-30 17:21:47', NULL),
(2098, 170, 71, 'left', 1, 23, NULL, '2025-12-30 17:21:47', NULL),
(2099, 170, 70, 'left', 1, 24, NULL, '2025-12-30 17:21:47', NULL),
(2100, 170, 69, 'left', 1, 25, NULL, '2025-12-30 17:21:47', NULL),
(2101, 170, 68, 'left', 1, 26, NULL, '2025-12-30 17:21:47', NULL),
(2102, 170, 67, 'left', 1, 27, NULL, '2025-12-30 17:21:47', NULL),
(2103, 170, 66, 'left', 1, 28, NULL, '2025-12-30 17:21:47', NULL),
(2104, 170, 65, 'left', 1, 29, NULL, '2025-12-30 17:21:47', NULL),
(2105, 170, 64, 'left', 1, 30, NULL, '2025-12-30 17:21:47', NULL),
(2106, 170, 63, 'left', 1, 31, NULL, '2025-12-30 17:21:47', NULL),
(2107, 170, 62, 'left', 1, 32, NULL, '2025-12-30 17:21:47', NULL),
(2108, 170, 38, 'left', 1, 33, NULL, '2025-12-30 17:21:47', NULL),
(2109, 170, 37, 'left', 1, 34, NULL, '2025-12-30 17:21:47', NULL),
(2110, 170, 36, 'left', 1, 35, NULL, '2025-12-30 17:21:47', NULL),
(2111, 170, 26, 'left', 1, 36, NULL, '2025-12-30 17:21:47', NULL),
(2112, 170, 24, 'right', 1, 37, NULL, '2025-12-30 17:21:47', NULL),
(2113, 170, 23, 'left', 1, 38, NULL, '2025-12-30 17:21:47', NULL),
(2114, 170, 22, 'left', 1, 39, NULL, '2025-12-30 17:21:47', NULL),
(2115, 170, 19, 'left', 1, 40, NULL, '2025-12-30 17:21:47', NULL),
(2116, 171, 170, 'right', 1, 1, NULL, '2025-12-30 17:30:19', NULL),
(2117, 171, 169, 'right', 1, 2, NULL, '2025-12-30 17:30:19', NULL),
(2118, 171, 167, 'right', 1, 3, NULL, '2025-12-30 17:30:19', NULL),
(2119, 171, 166, 'right', 1, 4, NULL, '2025-12-30 17:30:19', NULL),
(2120, 171, 165, 'right', 1, 5, NULL, '2025-12-30 17:30:19', NULL),
(2121, 171, 164, 'right', 1, 6, NULL, '2025-12-30 17:30:19', NULL),
(2122, 171, 163, 'right', 1, 7, NULL, '2025-12-30 17:30:19', NULL),
(2123, 171, 120, 'right', 1, 8, NULL, '2025-12-30 17:30:19', NULL),
(2124, 171, 86, 'right', 1, 9, NULL, '2025-12-30 17:30:19', NULL),
(2125, 171, 85, 'left', 1, 10, NULL, '2025-12-30 17:30:19', NULL),
(2126, 171, 84, 'left', 1, 11, NULL, '2025-12-30 17:30:19', NULL),
(2127, 171, 83, 'left', 1, 12, NULL, '2025-12-30 17:30:19', NULL),
(2128, 171, 82, 'left', 1, 13, NULL, '2025-12-30 17:30:19', NULL),
(2129, 171, 81, 'left', 1, 14, NULL, '2025-12-30 17:30:19', NULL),
(2130, 171, 80, 'left', 1, 15, NULL, '2025-12-30 17:30:19', NULL),
(2131, 171, 79, 'left', 1, 16, NULL, '2025-12-30 17:30:19', NULL),
(2132, 171, 78, 'left', 1, 17, NULL, '2025-12-30 17:30:19', NULL),
(2133, 171, 77, 'left', 1, 18, NULL, '2025-12-30 17:30:19', NULL),
(2134, 171, 76, 'left', 1, 19, NULL, '2025-12-30 17:30:19', NULL),
(2135, 171, 75, 'left', 1, 20, NULL, '2025-12-30 17:30:19', NULL),
(2136, 171, 74, 'left', 1, 21, NULL, '2025-12-30 17:30:19', NULL),
(2137, 171, 73, 'left', 1, 22, NULL, '2025-12-30 17:30:19', NULL),
(2138, 171, 72, 'left', 1, 23, NULL, '2025-12-30 17:30:19', NULL),
(2139, 171, 71, 'left', 1, 24, NULL, '2025-12-30 17:30:19', NULL),
(2140, 171, 70, 'left', 1, 25, NULL, '2025-12-30 17:30:19', NULL),
(2141, 171, 69, 'left', 1, 26, NULL, '2025-12-30 17:30:19', NULL),
(2142, 171, 68, 'left', 1, 27, NULL, '2025-12-30 17:30:19', NULL),
(2143, 171, 67, 'left', 1, 28, NULL, '2025-12-30 17:30:19', NULL),
(2144, 171, 66, 'left', 1, 29, NULL, '2025-12-30 17:30:19', NULL),
(2145, 171, 65, 'left', 1, 30, NULL, '2025-12-30 17:30:19', NULL),
(2146, 171, 64, 'left', 1, 31, NULL, '2025-12-30 17:30:19', NULL),
(2147, 171, 63, 'left', 1, 32, NULL, '2025-12-30 17:30:19', NULL),
(2148, 171, 62, 'left', 1, 33, NULL, '2025-12-30 17:30:19', NULL),
(2149, 171, 38, 'left', 1, 34, NULL, '2025-12-30 17:30:19', NULL),
(2150, 171, 37, 'left', 1, 35, NULL, '2025-12-30 17:30:19', NULL),
(2151, 171, 36, 'left', 1, 36, NULL, '2025-12-30 17:30:19', NULL),
(2152, 171, 26, 'left', 1, 37, NULL, '2025-12-30 17:30:19', NULL),
(2153, 171, 24, 'right', 1, 38, NULL, '2025-12-30 17:30:19', NULL),
(2154, 171, 23, 'left', 1, 39, NULL, '2025-12-30 17:30:19', NULL),
(2155, 171, 22, 'left', 1, 40, NULL, '2025-12-30 17:30:19', NULL),
(2156, 171, 19, 'left', 1, 41, NULL, '2025-12-30 17:30:19', NULL),
(2157, 172, 60, 'right', 1, 1, NULL, '2025-12-31 05:27:31', NULL),
(2158, 172, 54, 'left', 1, 2, NULL, '2025-12-31 05:27:31', NULL),
(2159, 172, 52, 'right', 1, 3, NULL, '2025-12-31 05:27:31', NULL),
(2160, 172, 50, 'right', 1, 4, NULL, '2025-12-31 05:27:31', NULL),
(2161, 172, 49, 'left', 1, 5, NULL, '2025-12-31 05:27:31', NULL),
(2162, 172, 35, 'left', 1, 6, NULL, '2025-12-31 05:27:31', NULL),
(2163, 172, 34, 'left', 1, 7, NULL, '2025-12-31 05:27:31', NULL),
(2164, 172, 33, 'left', 1, 8, NULL, '2025-12-31 05:27:31', NULL),
(2165, 172, 25, 'right', 1, 9, NULL, '2025-12-31 05:27:31', NULL),
(2166, 172, 24, 'left', 1, 10, NULL, '2025-12-31 05:27:31', NULL),
(2167, 172, 23, 'left', 1, 11, NULL, '2025-12-31 05:27:31', NULL),
(2168, 172, 22, 'left', 1, 12, NULL, '2025-12-31 05:27:31', NULL),
(2169, 172, 19, 'left', 1, 13, NULL, '2025-12-31 05:27:31', NULL),
(2170, 173, 119, 'right', 1, 1, NULL, '2025-12-31 12:55:33', NULL),
(2171, 173, 77, 'right', 1, 2, NULL, '2025-12-31 12:55:33', NULL),
(2172, 173, 76, 'left', 1, 3, NULL, '2025-12-31 12:55:33', NULL),
(2173, 173, 75, 'left', 1, 4, NULL, '2025-12-31 12:55:33', NULL),
(2174, 173, 74, 'left', 1, 5, NULL, '2025-12-31 12:55:33', NULL),
(2175, 173, 73, 'left', 1, 6, NULL, '2025-12-31 12:55:33', NULL),
(2176, 173, 72, 'left', 1, 7, NULL, '2025-12-31 12:55:33', NULL),
(2177, 173, 71, 'left', 1, 8, NULL, '2025-12-31 12:55:33', NULL),
(2178, 173, 70, 'left', 1, 9, NULL, '2025-12-31 12:55:33', NULL),
(2179, 173, 69, 'left', 1, 10, NULL, '2025-12-31 12:55:33', NULL),
(2180, 173, 68, 'left', 1, 11, NULL, '2025-12-31 12:55:33', NULL),
(2181, 173, 67, 'left', 1, 12, NULL, '2025-12-31 12:55:33', NULL),
(2182, 173, 66, 'left', 1, 13, NULL, '2025-12-31 12:55:33', NULL),
(2183, 173, 65, 'left', 1, 14, NULL, '2025-12-31 12:55:33', NULL),
(2184, 173, 64, 'left', 1, 15, NULL, '2025-12-31 12:55:33', NULL),
(2185, 173, 63, 'left', 1, 16, NULL, '2025-12-31 12:55:33', NULL),
(2186, 173, 62, 'left', 1, 17, NULL, '2025-12-31 12:55:33', NULL),
(2187, 173, 38, 'left', 1, 18, NULL, '2025-12-31 12:55:33', NULL),
(2188, 173, 37, 'left', 1, 19, NULL, '2025-12-31 12:55:33', NULL),
(2189, 173, 36, 'left', 1, 20, NULL, '2025-12-31 12:55:33', NULL),
(2190, 173, 26, 'left', 1, 21, NULL, '2025-12-31 12:55:33', NULL),
(2191, 173, 24, 'right', 1, 22, NULL, '2025-12-31 12:55:33', NULL),
(2192, 173, 23, 'left', 1, 23, NULL, '2025-12-31 12:55:33', NULL),
(2193, 173, 22, 'left', 1, 24, NULL, '2025-12-31 12:55:33', NULL),
(2194, 173, 19, 'left', 1, 25, NULL, '2025-12-31 12:55:33', NULL),
(2195, 174, 173, 'right', 1, 1, NULL, '2025-12-31 13:02:13', NULL),
(2196, 174, 119, 'right', 1, 2, NULL, '2025-12-31 13:02:13', NULL),
(2197, 174, 77, 'right', 1, 3, NULL, '2025-12-31 13:02:13', NULL),
(2198, 174, 76, 'left', 1, 4, NULL, '2025-12-31 13:02:13', NULL),
(2199, 174, 75, 'left', 1, 5, NULL, '2025-12-31 13:02:13', NULL),
(2200, 174, 74, 'left', 1, 6, NULL, '2025-12-31 13:02:13', NULL),
(2201, 174, 73, 'left', 1, 7, NULL, '2025-12-31 13:02:13', NULL),
(2202, 174, 72, 'left', 1, 8, NULL, '2025-12-31 13:02:13', NULL),
(2203, 174, 71, 'left', 1, 9, NULL, '2025-12-31 13:02:13', NULL),
(2204, 174, 70, 'left', 1, 10, NULL, '2025-12-31 13:02:13', NULL),
(2205, 174, 69, 'left', 1, 11, NULL, '2025-12-31 13:02:13', NULL),
(2206, 174, 68, 'left', 1, 12, NULL, '2025-12-31 13:02:13', NULL),
(2207, 174, 67, 'left', 1, 13, NULL, '2025-12-31 13:02:13', NULL),
(2208, 174, 66, 'left', 1, 14, NULL, '2025-12-31 13:02:13', NULL),
(2209, 174, 65, 'left', 1, 15, NULL, '2025-12-31 13:02:13', NULL),
(2210, 174, 64, 'left', 1, 16, NULL, '2025-12-31 13:02:13', NULL),
(2211, 174, 63, 'left', 1, 17, NULL, '2025-12-31 13:02:13', NULL),
(2212, 174, 62, 'left', 1, 18, NULL, '2025-12-31 13:02:13', NULL),
(2213, 174, 38, 'left', 1, 19, NULL, '2025-12-31 13:02:13', NULL),
(2214, 174, 37, 'left', 1, 20, NULL, '2025-12-31 13:02:13', NULL),
(2215, 174, 36, 'left', 1, 21, NULL, '2025-12-31 13:02:13', NULL),
(2216, 174, 26, 'left', 1, 22, NULL, '2025-12-31 13:02:13', NULL),
(2217, 174, 24, 'right', 1, 23, NULL, '2025-12-31 13:02:13', NULL),
(2218, 174, 23, 'left', 1, 24, NULL, '2025-12-31 13:02:13', NULL),
(2219, 174, 22, 'left', 1, 25, NULL, '2025-12-31 13:02:13', NULL),
(2220, 174, 19, 'left', 1, 26, NULL, '2025-12-31 13:02:13', NULL),
(2221, 175, 173, 'left', 1, 1, NULL, '2025-12-31 13:32:51', NULL),
(2222, 175, 119, 'right', 1, 2, NULL, '2025-12-31 13:32:51', NULL),
(2223, 175, 77, 'right', 1, 3, NULL, '2025-12-31 13:32:51', NULL),
(2224, 175, 76, 'left', 1, 4, NULL, '2025-12-31 13:32:51', NULL),
(2225, 175, 75, 'left', 1, 5, NULL, '2025-12-31 13:32:51', NULL),
(2226, 175, 74, 'left', 1, 6, NULL, '2025-12-31 13:32:51', NULL),
(2227, 175, 73, 'left', 1, 7, NULL, '2025-12-31 13:32:51', NULL),
(2228, 175, 72, 'left', 1, 8, NULL, '2025-12-31 13:32:51', NULL),
(2229, 175, 71, 'left', 1, 9, NULL, '2025-12-31 13:32:51', NULL),
(2230, 175, 70, 'left', 1, 10, NULL, '2025-12-31 13:32:51', NULL),
(2231, 175, 69, 'left', 1, 11, NULL, '2025-12-31 13:32:51', NULL),
(2232, 175, 68, 'left', 1, 12, NULL, '2025-12-31 13:32:51', NULL),
(2233, 175, 67, 'left', 1, 13, NULL, '2025-12-31 13:32:51', NULL),
(2234, 175, 66, 'left', 1, 14, NULL, '2025-12-31 13:32:51', NULL),
(2235, 175, 65, 'left', 1, 15, NULL, '2025-12-31 13:32:51', NULL),
(2236, 175, 64, 'left', 1, 16, NULL, '2025-12-31 13:32:51', NULL),
(2237, 175, 63, 'left', 1, 17, NULL, '2025-12-31 13:32:51', NULL),
(2238, 175, 62, 'left', 1, 18, NULL, '2025-12-31 13:32:51', NULL),
(2239, 175, 38, 'left', 1, 19, NULL, '2025-12-31 13:32:51', NULL),
(2240, 175, 37, 'left', 1, 20, NULL, '2025-12-31 13:32:51', NULL),
(2241, 175, 36, 'left', 1, 21, NULL, '2025-12-31 13:32:51', NULL),
(2242, 175, 26, 'left', 1, 22, NULL, '2025-12-31 13:32:51', NULL),
(2243, 175, 24, 'right', 1, 23, NULL, '2025-12-31 13:32:51', NULL),
(2244, 175, 23, 'left', 1, 24, NULL, '2025-12-31 13:32:51', NULL),
(2245, 175, 22, 'left', 1, 25, NULL, '2025-12-31 13:32:51', NULL),
(2246, 175, 19, 'left', 1, 26, NULL, '2025-12-31 13:32:51', NULL),
(2247, 176, 174, 'right', 1, 1, NULL, '2025-12-31 13:46:06', NULL),
(2248, 176, 173, 'right', 1, 2, NULL, '2025-12-31 13:46:06', NULL),
(2249, 176, 119, 'right', 1, 3, NULL, '2025-12-31 13:46:06', NULL),
(2250, 176, 77, 'right', 1, 4, NULL, '2025-12-31 13:46:06', NULL),
(2251, 176, 76, 'left', 1, 5, NULL, '2025-12-31 13:46:06', NULL),
(2252, 176, 75, 'left', 1, 6, NULL, '2025-12-31 13:46:06', NULL),
(2253, 176, 74, 'left', 1, 7, NULL, '2025-12-31 13:46:06', NULL),
(2254, 176, 73, 'left', 1, 8, NULL, '2025-12-31 13:46:06', NULL),
(2255, 176, 72, 'left', 1, 9, NULL, '2025-12-31 13:46:06', NULL),
(2256, 176, 71, 'left', 1, 10, NULL, '2025-12-31 13:46:06', NULL),
(2257, 176, 70, 'left', 1, 11, NULL, '2025-12-31 13:46:06', NULL),
(2258, 176, 69, 'left', 1, 12, NULL, '2025-12-31 13:46:06', NULL),
(2259, 176, 68, 'left', 1, 13, NULL, '2025-12-31 13:46:06', NULL),
(2260, 176, 67, 'left', 1, 14, NULL, '2025-12-31 13:46:06', NULL),
(2261, 176, 66, 'left', 1, 15, NULL, '2025-12-31 13:46:06', NULL),
(2262, 176, 65, 'left', 1, 16, NULL, '2025-12-31 13:46:06', NULL),
(2263, 176, 64, 'left', 1, 17, NULL, '2025-12-31 13:46:06', NULL),
(2264, 176, 63, 'left', 1, 18, NULL, '2025-12-31 13:46:06', NULL),
(2265, 176, 62, 'left', 1, 19, NULL, '2025-12-31 13:46:06', NULL),
(2266, 176, 38, 'left', 1, 20, NULL, '2025-12-31 13:46:06', NULL),
(2267, 176, 37, 'left', 1, 21, NULL, '2025-12-31 13:46:06', NULL),
(2268, 176, 36, 'left', 1, 22, NULL, '2025-12-31 13:46:06', NULL),
(2269, 176, 26, 'left', 1, 23, NULL, '2025-12-31 13:46:06', NULL),
(2270, 176, 24, 'right', 1, 24, NULL, '2025-12-31 13:46:06', NULL),
(2271, 176, 23, 'left', 1, 25, NULL, '2025-12-31 13:46:06', NULL),
(2272, 176, 22, 'left', 1, 26, NULL, '2025-12-31 13:46:06', NULL),
(2273, 176, 19, 'left', 1, 27, NULL, '2025-12-31 13:46:06', NULL),
(2274, 177, 176, 'right', 1, 1, NULL, '2025-12-31 13:55:33', NULL),
(2275, 177, 174, 'right', 1, 2, NULL, '2025-12-31 13:55:33', NULL),
(2276, 177, 173, 'right', 1, 3, NULL, '2025-12-31 13:55:33', NULL),
(2277, 177, 119, 'right', 1, 4, NULL, '2025-12-31 13:55:33', NULL),
(2278, 177, 77, 'right', 1, 5, NULL, '2025-12-31 13:55:33', NULL),
(2279, 177, 76, 'left', 1, 6, NULL, '2025-12-31 13:55:33', NULL),
(2280, 177, 75, 'left', 1, 7, NULL, '2025-12-31 13:55:33', NULL),
(2281, 177, 74, 'left', 1, 8, NULL, '2025-12-31 13:55:33', NULL),
(2282, 177, 73, 'left', 1, 9, NULL, '2025-12-31 13:55:33', NULL),
(2283, 177, 72, 'left', 1, 10, NULL, '2025-12-31 13:55:33', NULL),
(2284, 177, 71, 'left', 1, 11, NULL, '2025-12-31 13:55:33', NULL),
(2285, 177, 70, 'left', 1, 12, NULL, '2025-12-31 13:55:33', NULL),
(2286, 177, 69, 'left', 1, 13, NULL, '2025-12-31 13:55:33', NULL),
(2287, 177, 68, 'left', 1, 14, NULL, '2025-12-31 13:55:33', NULL),
(2288, 177, 67, 'left', 1, 15, NULL, '2025-12-31 13:55:33', NULL),
(2289, 177, 66, 'left', 1, 16, NULL, '2025-12-31 13:55:33', NULL),
(2290, 177, 65, 'left', 1, 17, NULL, '2025-12-31 13:55:33', NULL),
(2291, 177, 64, 'left', 1, 18, NULL, '2025-12-31 13:55:33', NULL),
(2292, 177, 63, 'left', 1, 19, NULL, '2025-12-31 13:55:33', NULL),
(2293, 177, 62, 'left', 1, 20, NULL, '2025-12-31 13:55:33', NULL),
(2294, 177, 38, 'left', 1, 21, NULL, '2025-12-31 13:55:33', NULL),
(2295, 177, 37, 'left', 1, 22, NULL, '2025-12-31 13:55:33', NULL),
(2296, 177, 36, 'left', 1, 23, NULL, '2025-12-31 13:55:33', NULL),
(2297, 177, 26, 'left', 1, 24, NULL, '2025-12-31 13:55:33', NULL),
(2298, 177, 24, 'right', 1, 25, NULL, '2025-12-31 13:55:33', NULL),
(2299, 177, 23, 'left', 1, 26, NULL, '2025-12-31 13:55:33', NULL),
(2300, 177, 22, 'left', 1, 27, NULL, '2025-12-31 13:55:33', NULL),
(2301, 177, 19, 'left', 1, 28, NULL, '2025-12-31 13:55:33', NULL),
(2302, 178, 177, 'right', 1, 1, NULL, '2025-12-31 14:21:43', NULL),
(2303, 178, 176, 'right', 1, 2, NULL, '2025-12-31 14:21:43', NULL),
(2304, 178, 174, 'right', 1, 3, NULL, '2025-12-31 14:21:43', NULL),
(2305, 178, 173, 'right', 1, 4, NULL, '2025-12-31 14:21:43', NULL),
(2306, 178, 119, 'right', 1, 5, NULL, '2025-12-31 14:21:43', NULL),
(2307, 178, 77, 'right', 1, 6, NULL, '2025-12-31 14:21:43', NULL),
(2308, 178, 76, 'left', 1, 7, NULL, '2025-12-31 14:21:43', NULL),
(2309, 178, 75, 'left', 1, 8, NULL, '2025-12-31 14:21:43', NULL),
(2310, 178, 74, 'left', 1, 9, NULL, '2025-12-31 14:21:43', NULL),
(2311, 178, 73, 'left', 1, 10, NULL, '2025-12-31 14:21:43', NULL),
(2312, 178, 72, 'left', 1, 11, NULL, '2025-12-31 14:21:43', NULL),
(2313, 178, 71, 'left', 1, 12, NULL, '2025-12-31 14:21:43', NULL),
(2314, 178, 70, 'left', 1, 13, NULL, '2025-12-31 14:21:43', NULL),
(2315, 178, 69, 'left', 1, 14, NULL, '2025-12-31 14:21:43', NULL),
(2316, 178, 68, 'left', 1, 15, NULL, '2025-12-31 14:21:43', NULL),
(2317, 178, 67, 'left', 1, 16, NULL, '2025-12-31 14:21:43', NULL),
(2318, 178, 66, 'left', 1, 17, NULL, '2025-12-31 14:21:43', NULL),
(2319, 178, 65, 'left', 1, 18, NULL, '2025-12-31 14:21:43', NULL),
(2320, 178, 64, 'left', 1, 19, NULL, '2025-12-31 14:21:43', NULL),
(2321, 178, 63, 'left', 1, 20, NULL, '2025-12-31 14:21:43', NULL),
(2322, 178, 62, 'left', 1, 21, NULL, '2025-12-31 14:21:43', NULL),
(2323, 178, 38, 'left', 1, 22, NULL, '2025-12-31 14:21:43', NULL),
(2324, 178, 37, 'left', 1, 23, NULL, '2025-12-31 14:21:43', NULL),
(2325, 178, 36, 'left', 1, 24, NULL, '2025-12-31 14:21:43', NULL),
(2326, 178, 26, 'left', 1, 25, NULL, '2025-12-31 14:21:43', NULL),
(2327, 178, 24, 'right', 1, 26, NULL, '2025-12-31 14:21:43', NULL),
(2328, 178, 23, 'left', 1, 27, NULL, '2025-12-31 14:21:43', NULL),
(2329, 178, 22, 'left', 1, 28, NULL, '2025-12-31 14:21:43', NULL),
(2330, 178, 19, 'left', 1, 29, NULL, '2025-12-31 14:21:43', NULL),
(2331, 179, 178, 'right', 1, 1, NULL, '2025-12-31 14:25:23', NULL),
(2332, 179, 177, 'right', 1, 2, NULL, '2025-12-31 14:25:23', NULL),
(2333, 179, 176, 'right', 1, 3, NULL, '2025-12-31 14:25:23', NULL),
(2334, 179, 174, 'right', 1, 4, NULL, '2025-12-31 14:25:23', NULL),
(2335, 179, 173, 'right', 1, 5, NULL, '2025-12-31 14:25:23', NULL),
(2336, 179, 119, 'right', 1, 6, NULL, '2025-12-31 14:25:23', NULL),
(2337, 179, 77, 'right', 1, 7, NULL, '2025-12-31 14:25:23', NULL),
(2338, 179, 76, 'left', 1, 8, NULL, '2025-12-31 14:25:23', NULL),
(2339, 179, 75, 'left', 1, 9, NULL, '2025-12-31 14:25:23', NULL),
(2340, 179, 74, 'left', 1, 10, NULL, '2025-12-31 14:25:23', NULL),
(2341, 179, 73, 'left', 1, 11, NULL, '2025-12-31 14:25:23', NULL),
(2342, 179, 72, 'left', 1, 12, NULL, '2025-12-31 14:25:23', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(2343, 179, 71, 'left', 1, 13, NULL, '2025-12-31 14:25:23', NULL),
(2344, 179, 70, 'left', 1, 14, NULL, '2025-12-31 14:25:23', NULL),
(2345, 179, 69, 'left', 1, 15, NULL, '2025-12-31 14:25:23', NULL),
(2346, 179, 68, 'left', 1, 16, NULL, '2025-12-31 14:25:23', NULL),
(2347, 179, 67, 'left', 1, 17, NULL, '2025-12-31 14:25:23', NULL),
(2348, 179, 66, 'left', 1, 18, NULL, '2025-12-31 14:25:23', NULL),
(2349, 179, 65, 'left', 1, 19, NULL, '2025-12-31 14:25:23', NULL),
(2350, 179, 64, 'left', 1, 20, NULL, '2025-12-31 14:25:23', NULL),
(2351, 179, 63, 'left', 1, 21, NULL, '2025-12-31 14:25:23', NULL),
(2352, 179, 62, 'left', 1, 22, NULL, '2025-12-31 14:25:23', NULL),
(2353, 179, 38, 'left', 1, 23, NULL, '2025-12-31 14:25:23', NULL),
(2354, 179, 37, 'left', 1, 24, NULL, '2025-12-31 14:25:23', NULL),
(2355, 179, 36, 'left', 1, 25, NULL, '2025-12-31 14:25:23', NULL),
(2356, 179, 26, 'left', 1, 26, NULL, '2025-12-31 14:25:23', NULL),
(2357, 179, 24, 'right', 1, 27, NULL, '2025-12-31 14:25:23', NULL),
(2358, 179, 23, 'left', 1, 28, NULL, '2025-12-31 14:25:23', NULL),
(2359, 179, 22, 'left', 1, 29, NULL, '2025-12-31 14:25:23', NULL),
(2360, 179, 19, 'left', 1, 30, NULL, '2025-12-31 14:25:23', NULL),
(2361, 180, 177, 'left', 1, 1, NULL, '2025-12-31 14:28:04', NULL),
(2362, 180, 176, 'right', 1, 2, NULL, '2025-12-31 14:28:04', NULL),
(2363, 180, 174, 'right', 1, 3, NULL, '2025-12-31 14:28:04', NULL),
(2364, 180, 173, 'right', 1, 4, NULL, '2025-12-31 14:28:04', NULL),
(2365, 180, 119, 'right', 1, 5, NULL, '2025-12-31 14:28:04', NULL),
(2366, 180, 77, 'right', 1, 6, NULL, '2025-12-31 14:28:04', NULL),
(2367, 180, 76, 'left', 1, 7, NULL, '2025-12-31 14:28:04', NULL),
(2368, 180, 75, 'left', 1, 8, NULL, '2025-12-31 14:28:04', NULL),
(2369, 180, 74, 'left', 1, 9, NULL, '2025-12-31 14:28:04', NULL),
(2370, 180, 73, 'left', 1, 10, NULL, '2025-12-31 14:28:04', NULL),
(2371, 180, 72, 'left', 1, 11, NULL, '2025-12-31 14:28:04', NULL),
(2372, 180, 71, 'left', 1, 12, NULL, '2025-12-31 14:28:04', NULL),
(2373, 180, 70, 'left', 1, 13, NULL, '2025-12-31 14:28:04', NULL),
(2374, 180, 69, 'left', 1, 14, NULL, '2025-12-31 14:28:04', NULL),
(2375, 180, 68, 'left', 1, 15, NULL, '2025-12-31 14:28:04', NULL),
(2376, 180, 67, 'left', 1, 16, NULL, '2025-12-31 14:28:04', NULL),
(2377, 180, 66, 'left', 1, 17, NULL, '2025-12-31 14:28:04', NULL),
(2378, 180, 65, 'left', 1, 18, NULL, '2025-12-31 14:28:04', NULL),
(2379, 180, 64, 'left', 1, 19, NULL, '2025-12-31 14:28:04', NULL),
(2380, 180, 63, 'left', 1, 20, NULL, '2025-12-31 14:28:04', NULL),
(2381, 180, 62, 'left', 1, 21, NULL, '2025-12-31 14:28:04', NULL),
(2382, 180, 38, 'left', 1, 22, NULL, '2025-12-31 14:28:04', NULL),
(2383, 180, 37, 'left', 1, 23, NULL, '2025-12-31 14:28:04', NULL),
(2384, 180, 36, 'left', 1, 24, NULL, '2025-12-31 14:28:04', NULL),
(2385, 180, 26, 'left', 1, 25, NULL, '2025-12-31 14:28:04', NULL),
(2386, 180, 24, 'right', 1, 26, NULL, '2025-12-31 14:28:04', NULL),
(2387, 180, 23, 'left', 1, 27, NULL, '2025-12-31 14:28:04', NULL),
(2388, 180, 22, 'left', 1, 28, NULL, '2025-12-31 14:28:04', NULL),
(2389, 180, 19, 'left', 1, 29, NULL, '2025-12-31 14:28:04', NULL),
(2390, 182, 180, 'left', 1, 1, NULL, '2025-12-31 14:32:53', NULL),
(2391, 182, 177, 'left', 1, 2, NULL, '2025-12-31 14:32:53', NULL),
(2392, 182, 176, 'right', 1, 3, NULL, '2025-12-31 14:32:53', NULL),
(2393, 182, 174, 'right', 1, 4, NULL, '2025-12-31 14:32:53', NULL),
(2394, 182, 173, 'right', 1, 5, NULL, '2025-12-31 14:32:53', NULL),
(2395, 182, 119, 'right', 1, 6, NULL, '2025-12-31 14:32:53', NULL),
(2396, 182, 77, 'right', 1, 7, NULL, '2025-12-31 14:32:53', NULL),
(2397, 182, 76, 'left', 1, 8, NULL, '2025-12-31 14:32:53', NULL),
(2398, 182, 75, 'left', 1, 9, NULL, '2025-12-31 14:32:53', NULL),
(2399, 182, 74, 'left', 1, 10, NULL, '2025-12-31 14:32:53', NULL),
(2400, 182, 73, 'left', 1, 11, NULL, '2025-12-31 14:32:53', NULL),
(2401, 182, 72, 'left', 1, 12, NULL, '2025-12-31 14:32:53', NULL),
(2402, 182, 71, 'left', 1, 13, NULL, '2025-12-31 14:32:53', NULL),
(2403, 182, 70, 'left', 1, 14, NULL, '2025-12-31 14:32:53', NULL),
(2404, 182, 69, 'left', 1, 15, NULL, '2025-12-31 14:32:53', NULL),
(2405, 182, 68, 'left', 1, 16, NULL, '2025-12-31 14:32:53', NULL),
(2406, 182, 67, 'left', 1, 17, NULL, '2025-12-31 14:32:53', NULL),
(2407, 182, 66, 'left', 1, 18, NULL, '2025-12-31 14:32:53', NULL),
(2408, 182, 65, 'left', 1, 19, NULL, '2025-12-31 14:32:53', NULL),
(2409, 182, 64, 'left', 1, 20, NULL, '2025-12-31 14:32:53', NULL),
(2410, 182, 63, 'left', 1, 21, NULL, '2025-12-31 14:32:53', NULL),
(2411, 182, 62, 'left', 1, 22, NULL, '2025-12-31 14:32:53', NULL),
(2412, 182, 38, 'left', 1, 23, NULL, '2025-12-31 14:32:53', NULL),
(2413, 182, 37, 'left', 1, 24, NULL, '2025-12-31 14:32:53', NULL),
(2414, 182, 36, 'left', 1, 25, NULL, '2025-12-31 14:32:53', NULL),
(2415, 182, 26, 'left', 1, 26, NULL, '2025-12-31 14:32:53', NULL),
(2416, 182, 24, 'right', 1, 27, NULL, '2025-12-31 14:32:53', NULL),
(2417, 182, 23, 'left', 1, 28, NULL, '2025-12-31 14:32:53', NULL),
(2418, 182, 22, 'left', 1, 29, NULL, '2025-12-31 14:32:53', NULL),
(2419, 182, 19, 'left', 1, 30, NULL, '2025-12-31 14:32:53', NULL),
(2420, 183, 119, 'left', 1, 1, NULL, '2025-12-31 14:44:50', NULL),
(2421, 183, 77, 'right', 1, 2, NULL, '2025-12-31 14:44:50', NULL),
(2422, 183, 76, 'left', 1, 3, NULL, '2025-12-31 14:44:50', NULL),
(2423, 183, 75, 'left', 1, 4, NULL, '2025-12-31 14:44:50', NULL),
(2424, 183, 74, 'left', 1, 5, NULL, '2025-12-31 14:44:50', NULL),
(2425, 183, 73, 'left', 1, 6, NULL, '2025-12-31 14:44:50', NULL),
(2426, 183, 72, 'left', 1, 7, NULL, '2025-12-31 14:44:50', NULL),
(2427, 183, 71, 'left', 1, 8, NULL, '2025-12-31 14:44:50', NULL),
(2428, 183, 70, 'left', 1, 9, NULL, '2025-12-31 14:44:50', NULL),
(2429, 183, 69, 'left', 1, 10, NULL, '2025-12-31 14:44:50', NULL),
(2430, 183, 68, 'left', 1, 11, NULL, '2025-12-31 14:44:50', NULL),
(2431, 183, 67, 'left', 1, 12, NULL, '2025-12-31 14:44:50', NULL),
(2432, 183, 66, 'left', 1, 13, NULL, '2025-12-31 14:44:50', NULL),
(2433, 183, 65, 'left', 1, 14, NULL, '2025-12-31 14:44:50', NULL),
(2434, 183, 64, 'left', 1, 15, NULL, '2025-12-31 14:44:50', NULL),
(2435, 183, 63, 'left', 1, 16, NULL, '2025-12-31 14:44:50', NULL),
(2436, 183, 62, 'left', 1, 17, NULL, '2025-12-31 14:44:50', NULL),
(2437, 183, 38, 'left', 1, 18, NULL, '2025-12-31 14:44:50', NULL),
(2438, 183, 37, 'left', 1, 19, NULL, '2025-12-31 14:44:50', NULL),
(2439, 183, 36, 'left', 1, 20, NULL, '2025-12-31 14:44:50', NULL),
(2440, 183, 26, 'left', 1, 21, NULL, '2025-12-31 14:44:50', NULL),
(2441, 183, 24, 'right', 1, 22, NULL, '2025-12-31 14:44:50', NULL),
(2442, 183, 23, 'left', 1, 23, NULL, '2025-12-31 14:44:50', NULL),
(2443, 183, 22, 'left', 1, 24, NULL, '2025-12-31 14:44:50', NULL),
(2444, 183, 19, 'left', 1, 25, NULL, '2025-12-31 14:44:50', NULL),
(2445, 185, 170, 'left', 1, 1, NULL, '2026-01-02 08:53:54', NULL),
(2446, 185, 169, 'right', 1, 2, NULL, '2026-01-02 08:53:54', NULL),
(2447, 185, 167, 'right', 1, 3, NULL, '2026-01-02 08:53:54', NULL),
(2448, 185, 166, 'right', 1, 4, NULL, '2026-01-02 08:53:54', NULL),
(2449, 185, 165, 'right', 1, 5, NULL, '2026-01-02 08:53:54', NULL),
(2450, 185, 164, 'right', 1, 6, NULL, '2026-01-02 08:53:54', NULL),
(2451, 185, 163, 'right', 1, 7, NULL, '2026-01-02 08:53:54', NULL),
(2452, 185, 120, 'right', 1, 8, NULL, '2026-01-02 08:53:54', NULL),
(2453, 185, 86, 'right', 1, 9, NULL, '2026-01-02 08:53:54', NULL),
(2454, 185, 85, 'left', 1, 10, NULL, '2026-01-02 08:53:54', NULL),
(2455, 185, 84, 'left', 1, 11, NULL, '2026-01-02 08:53:54', NULL),
(2456, 185, 83, 'left', 1, 12, NULL, '2026-01-02 08:53:54', NULL),
(2457, 185, 82, 'left', 1, 13, NULL, '2026-01-02 08:53:54', NULL),
(2458, 185, 81, 'left', 1, 14, NULL, '2026-01-02 08:53:54', NULL),
(2459, 185, 80, 'left', 1, 15, NULL, '2026-01-02 08:53:54', NULL),
(2460, 185, 79, 'left', 1, 16, NULL, '2026-01-02 08:53:54', NULL),
(2461, 185, 78, 'left', 1, 17, NULL, '2026-01-02 08:53:54', NULL),
(2462, 185, 77, 'left', 1, 18, NULL, '2026-01-02 08:53:54', NULL),
(2463, 185, 76, 'left', 1, 19, NULL, '2026-01-02 08:53:54', NULL),
(2464, 185, 75, 'left', 1, 20, NULL, '2026-01-02 08:53:54', NULL),
(2465, 185, 74, 'left', 1, 21, NULL, '2026-01-02 08:53:54', NULL),
(2466, 185, 73, 'left', 1, 22, NULL, '2026-01-02 08:53:54', NULL),
(2467, 185, 72, 'left', 1, 23, NULL, '2026-01-02 08:53:54', NULL),
(2468, 185, 71, 'left', 1, 24, NULL, '2026-01-02 08:53:54', NULL),
(2469, 185, 70, 'left', 1, 25, NULL, '2026-01-02 08:53:54', NULL),
(2470, 185, 69, 'left', 1, 26, NULL, '2026-01-02 08:53:54', NULL),
(2471, 185, 68, 'left', 1, 27, NULL, '2026-01-02 08:53:54', NULL),
(2472, 185, 67, 'left', 1, 28, NULL, '2026-01-02 08:53:54', NULL),
(2473, 185, 66, 'left', 1, 29, NULL, '2026-01-02 08:53:54', NULL),
(2474, 185, 65, 'left', 1, 30, NULL, '2026-01-02 08:53:54', NULL),
(2475, 185, 64, 'left', 1, 31, NULL, '2026-01-02 08:53:54', NULL),
(2476, 185, 63, 'left', 1, 32, NULL, '2026-01-02 08:53:54', NULL),
(2477, 185, 62, 'left', 1, 33, NULL, '2026-01-02 08:53:54', NULL),
(2478, 185, 38, 'left', 1, 34, NULL, '2026-01-02 08:53:54', NULL),
(2479, 185, 37, 'left', 1, 35, NULL, '2026-01-02 08:53:54', NULL),
(2480, 185, 36, 'left', 1, 36, NULL, '2026-01-02 08:53:54', NULL),
(2481, 185, 26, 'left', 1, 37, NULL, '2026-01-02 08:53:54', NULL),
(2482, 185, 24, 'right', 1, 38, NULL, '2026-01-02 08:53:54', NULL),
(2483, 185, 23, 'left', 1, 39, NULL, '2026-01-02 08:53:54', NULL),
(2484, 185, 22, 'left', 1, 40, NULL, '2026-01-02 08:53:54', NULL),
(2485, 185, 19, 'left', 1, 41, NULL, '2026-01-02 08:53:54', NULL),
(2486, 121, 80, 'right', 1, 1, NULL, '2026-01-02 09:20:45', NULL),
(2487, 121, 79, 'left', 1, 2, NULL, '2026-01-02 09:20:45', NULL),
(2488, 121, 78, 'left', 1, 3, NULL, '2026-01-02 09:20:45', NULL),
(2489, 121, 77, 'left', 1, 4, NULL, '2026-01-02 09:20:45', NULL),
(2490, 121, 76, 'left', 1, 5, NULL, '2026-01-02 09:20:45', NULL),
(2491, 121, 75, 'left', 1, 6, NULL, '2026-01-02 09:20:45', NULL),
(2492, 121, 74, 'left', 1, 7, NULL, '2026-01-02 09:20:45', NULL),
(2493, 121, 73, 'left', 1, 8, NULL, '2026-01-02 09:20:45', NULL),
(2494, 121, 72, 'left', 1, 9, NULL, '2026-01-02 09:20:45', NULL),
(2495, 121, 71, 'left', 1, 10, NULL, '2026-01-02 09:20:45', NULL),
(2496, 121, 70, 'left', 1, 11, NULL, '2026-01-02 09:20:45', NULL),
(2497, 121, 69, 'left', 1, 12, NULL, '2026-01-02 09:20:45', NULL),
(2498, 121, 68, 'left', 1, 13, NULL, '2026-01-02 09:20:45', NULL),
(2499, 121, 67, 'left', 1, 14, NULL, '2026-01-02 09:20:45', NULL),
(2500, 121, 66, 'left', 1, 15, NULL, '2026-01-02 09:20:45', NULL),
(2501, 121, 65, 'left', 1, 16, NULL, '2026-01-02 09:20:45', NULL),
(2502, 121, 64, 'left', 1, 17, NULL, '2026-01-02 09:20:45', NULL),
(2503, 121, 63, 'left', 1, 18, NULL, '2026-01-02 09:20:45', NULL),
(2504, 121, 62, 'left', 1, 19, NULL, '2026-01-02 09:20:45', NULL),
(2505, 121, 38, 'left', 1, 20, NULL, '2026-01-02 09:20:45', NULL),
(2506, 121, 37, 'left', 1, 21, NULL, '2026-01-02 09:20:45', NULL),
(2507, 121, 36, 'left', 1, 22, NULL, '2026-01-02 09:20:45', NULL),
(2508, 121, 26, 'left', 1, 23, NULL, '2026-01-02 09:20:45', NULL),
(2509, 121, 24, 'right', 1, 24, NULL, '2026-01-02 09:20:45', NULL),
(2510, 121, 23, 'left', 1, 25, NULL, '2026-01-02 09:20:45', NULL),
(2511, 121, 22, 'left', 1, 26, NULL, '2026-01-02 09:20:45', NULL),
(2512, 121, 19, 'left', 1, 27, NULL, '2026-01-02 09:20:45', NULL),
(2513, 118, 117, 'right', 1, 1, NULL, '2026-01-02 11:00:17', NULL),
(2514, 118, 74, 'right', 1, 2, NULL, '2026-01-02 11:00:17', NULL),
(2515, 118, 73, 'left', 1, 3, NULL, '2026-01-02 11:00:17', NULL),
(2516, 118, 72, 'left', 1, 4, NULL, '2026-01-02 11:00:17', NULL),
(2517, 118, 71, 'left', 1, 5, NULL, '2026-01-02 11:00:17', NULL),
(2518, 118, 70, 'left', 1, 6, NULL, '2026-01-02 11:00:17', NULL),
(2519, 118, 69, 'left', 1, 7, NULL, '2026-01-02 11:00:17', NULL),
(2520, 118, 68, 'left', 1, 8, NULL, '2026-01-02 11:00:17', NULL),
(2521, 118, 67, 'left', 1, 9, NULL, '2026-01-02 11:00:17', NULL),
(2522, 118, 66, 'left', 1, 10, NULL, '2026-01-02 11:00:17', NULL),
(2523, 118, 65, 'left', 1, 11, NULL, '2026-01-02 11:00:17', NULL),
(2524, 118, 64, 'left', 1, 12, NULL, '2026-01-02 11:00:17', NULL),
(2525, 118, 63, 'left', 1, 13, NULL, '2026-01-02 11:00:17', NULL),
(2526, 118, 62, 'left', 1, 14, NULL, '2026-01-02 11:00:17', NULL),
(2527, 118, 38, 'left', 1, 15, NULL, '2026-01-02 11:00:17', NULL),
(2528, 118, 37, 'left', 1, 16, NULL, '2026-01-02 11:00:17', NULL),
(2529, 118, 36, 'left', 1, 17, NULL, '2026-01-02 11:00:17', NULL),
(2530, 118, 26, 'left', 1, 18, NULL, '2026-01-02 11:00:17', NULL),
(2531, 118, 24, 'right', 1, 19, NULL, '2026-01-02 11:00:17', NULL),
(2532, 118, 23, 'left', 1, 20, NULL, '2026-01-02 11:00:17', NULL),
(2533, 118, 22, 'left', 1, 21, NULL, '2026-01-02 11:00:17', NULL),
(2534, 118, 19, 'left', 1, 22, NULL, '2026-01-02 11:00:17', NULL),
(2535, 188, 117, 'left', 1, 1, NULL, '2026-01-02 11:06:33', NULL),
(2536, 188, 74, 'right', 1, 2, NULL, '2026-01-02 11:06:33', NULL),
(2537, 188, 73, 'left', 1, 3, NULL, '2026-01-02 11:06:33', NULL),
(2538, 188, 72, 'left', 1, 4, NULL, '2026-01-02 11:06:33', NULL),
(2539, 188, 71, 'left', 1, 5, NULL, '2026-01-02 11:06:33', NULL),
(2540, 188, 70, 'left', 1, 6, NULL, '2026-01-02 11:06:33', NULL),
(2541, 188, 69, 'left', 1, 7, NULL, '2026-01-02 11:06:33', NULL),
(2542, 188, 68, 'left', 1, 8, NULL, '2026-01-02 11:06:33', NULL),
(2543, 188, 67, 'left', 1, 9, NULL, '2026-01-02 11:06:33', NULL),
(2544, 188, 66, 'left', 1, 10, NULL, '2026-01-02 11:06:33', NULL),
(2545, 188, 65, 'left', 1, 11, NULL, '2026-01-02 11:06:33', NULL),
(2546, 188, 64, 'left', 1, 12, NULL, '2026-01-02 11:06:33', NULL),
(2547, 188, 63, 'left', 1, 13, NULL, '2026-01-02 11:06:33', NULL),
(2548, 188, 62, 'left', 1, 14, NULL, '2026-01-02 11:06:33', NULL),
(2549, 188, 38, 'left', 1, 15, NULL, '2026-01-02 11:06:33', NULL),
(2550, 188, 37, 'left', 1, 16, NULL, '2026-01-02 11:06:33', NULL),
(2551, 188, 36, 'left', 1, 17, NULL, '2026-01-02 11:06:33', NULL),
(2552, 188, 26, 'left', 1, 18, NULL, '2026-01-02 11:06:33', NULL),
(2553, 188, 24, 'right', 1, 19, NULL, '2026-01-02 11:06:33', NULL),
(2554, 188, 23, 'left', 1, 20, NULL, '2026-01-02 11:06:33', NULL),
(2555, 188, 22, 'left', 1, 21, NULL, '2026-01-02 11:06:33', NULL),
(2556, 188, 19, 'left', 1, 22, NULL, '2026-01-02 11:06:33', NULL),
(2557, 142, 75, 'right', 1, 1, NULL, '2026-01-02 11:12:48', NULL),
(2558, 142, 74, 'left', 1, 2, NULL, '2026-01-02 11:12:48', NULL),
(2559, 142, 73, 'left', 1, 3, NULL, '2026-01-02 11:12:48', NULL),
(2560, 142, 72, 'left', 1, 4, NULL, '2026-01-02 11:12:48', NULL),
(2561, 142, 71, 'left', 1, 5, NULL, '2026-01-02 11:12:48', NULL),
(2562, 142, 70, 'left', 1, 6, NULL, '2026-01-02 11:12:48', NULL),
(2563, 142, 69, 'left', 1, 7, NULL, '2026-01-02 11:12:48', NULL),
(2564, 142, 68, 'left', 1, 8, NULL, '2026-01-02 11:12:48', NULL),
(2565, 142, 67, 'left', 1, 9, NULL, '2026-01-02 11:12:48', NULL),
(2566, 142, 66, 'left', 1, 10, NULL, '2026-01-02 11:12:48', NULL),
(2567, 142, 65, 'left', 1, 11, NULL, '2026-01-02 11:12:48', NULL),
(2568, 142, 64, 'left', 1, 12, NULL, '2026-01-02 11:12:48', NULL),
(2569, 142, 63, 'left', 1, 13, NULL, '2026-01-02 11:12:48', NULL),
(2570, 142, 62, 'left', 1, 14, NULL, '2026-01-02 11:12:48', NULL),
(2571, 142, 38, 'left', 1, 15, NULL, '2026-01-02 11:12:48', NULL),
(2572, 142, 37, 'left', 1, 16, NULL, '2026-01-02 11:12:48', NULL),
(2573, 142, 36, 'left', 1, 17, NULL, '2026-01-02 11:12:48', NULL),
(2574, 142, 26, 'left', 1, 18, NULL, '2026-01-02 11:12:48', NULL),
(2575, 142, 24, 'right', 1, 19, NULL, '2026-01-02 11:12:48', NULL),
(2576, 142, 23, 'left', 1, 20, NULL, '2026-01-02 11:12:48', NULL),
(2577, 142, 22, 'left', 1, 21, NULL, '2026-01-02 11:12:48', NULL),
(2578, 142, 19, 'left', 1, 22, NULL, '2026-01-02 11:12:48', NULL),
(2579, 189, 76, 'right', 1, 1, NULL, '2026-01-02 11:22:50', NULL),
(2580, 189, 75, 'left', 1, 2, NULL, '2026-01-02 11:22:50', NULL),
(2581, 189, 74, 'left', 1, 3, NULL, '2026-01-02 11:22:50', NULL),
(2582, 189, 73, 'left', 1, 4, NULL, '2026-01-02 11:22:50', NULL),
(2583, 189, 72, 'left', 1, 5, NULL, '2026-01-02 11:22:50', NULL),
(2584, 189, 71, 'left', 1, 6, NULL, '2026-01-02 11:22:50', NULL),
(2585, 189, 70, 'left', 1, 7, NULL, '2026-01-02 11:22:50', NULL),
(2586, 189, 69, 'left', 1, 8, NULL, '2026-01-02 11:22:50', NULL),
(2587, 189, 68, 'left', 1, 9, NULL, '2026-01-02 11:22:50', NULL),
(2588, 189, 67, 'left', 1, 10, NULL, '2026-01-02 11:22:50', NULL),
(2589, 189, 66, 'left', 1, 11, NULL, '2026-01-02 11:22:50', NULL),
(2590, 189, 65, 'left', 1, 12, NULL, '2026-01-02 11:22:50', NULL),
(2591, 189, 64, 'left', 1, 13, NULL, '2026-01-02 11:22:50', NULL),
(2592, 189, 63, 'left', 1, 14, NULL, '2026-01-02 11:22:50', NULL),
(2593, 189, 62, 'left', 1, 15, NULL, '2026-01-02 11:22:50', NULL),
(2594, 189, 38, 'left', 1, 16, NULL, '2026-01-02 11:22:50', NULL),
(2595, 189, 37, 'left', 1, 17, NULL, '2026-01-02 11:22:50', NULL),
(2596, 189, 36, 'left', 1, 18, NULL, '2026-01-02 11:22:50', NULL),
(2597, 189, 26, 'left', 1, 19, NULL, '2026-01-02 11:22:50', NULL),
(2598, 189, 24, 'right', 1, 20, NULL, '2026-01-02 11:22:50', NULL),
(2599, 189, 23, 'left', 1, 21, NULL, '2026-01-02 11:22:50', NULL),
(2600, 189, 22, 'left', 1, 22, NULL, '2026-01-02 11:22:50', NULL),
(2601, 189, 19, 'left', 1, 23, NULL, '2026-01-02 11:22:50', NULL),
(2602, 190, 118, 'right', 1, 1, NULL, '2026-01-02 11:32:05', NULL),
(2603, 190, 117, 'right', 1, 2, NULL, '2026-01-02 11:32:05', NULL),
(2604, 190, 74, 'right', 1, 3, NULL, '2026-01-02 11:32:05', NULL),
(2605, 190, 73, 'left', 1, 4, NULL, '2026-01-02 11:32:05', NULL),
(2606, 190, 72, 'left', 1, 5, NULL, '2026-01-02 11:32:05', NULL),
(2607, 190, 71, 'left', 1, 6, NULL, '2026-01-02 11:32:05', NULL),
(2608, 190, 70, 'left', 1, 7, NULL, '2026-01-02 11:32:05', NULL),
(2609, 190, 69, 'left', 1, 8, NULL, '2026-01-02 11:32:05', NULL),
(2610, 190, 68, 'left', 1, 9, NULL, '2026-01-02 11:32:05', NULL),
(2611, 190, 67, 'left', 1, 10, NULL, '2026-01-02 11:32:05', NULL),
(2612, 190, 66, 'left', 1, 11, NULL, '2026-01-02 11:32:05', NULL),
(2613, 190, 65, 'left', 1, 12, NULL, '2026-01-02 11:32:05', NULL),
(2614, 190, 64, 'left', 1, 13, NULL, '2026-01-02 11:32:05', NULL),
(2615, 190, 63, 'left', 1, 14, NULL, '2026-01-02 11:32:05', NULL),
(2616, 190, 62, 'left', 1, 15, NULL, '2026-01-02 11:32:05', NULL),
(2617, 190, 38, 'left', 1, 16, NULL, '2026-01-02 11:32:05', NULL),
(2618, 190, 37, 'left', 1, 17, NULL, '2026-01-02 11:32:05', NULL),
(2619, 190, 36, 'left', 1, 18, NULL, '2026-01-02 11:32:05', NULL),
(2620, 190, 26, 'left', 1, 19, NULL, '2026-01-02 11:32:05', NULL),
(2621, 190, 24, 'right', 1, 20, NULL, '2026-01-02 11:32:05', NULL),
(2622, 190, 23, 'left', 1, 21, NULL, '2026-01-02 11:32:05', NULL),
(2623, 190, 22, 'left', 1, 22, NULL, '2026-01-02 11:32:05', NULL),
(2624, 190, 19, 'left', 1, 23, NULL, '2026-01-02 11:32:05', NULL),
(2625, 191, 190, 'right', 1, 1, NULL, '2026-01-02 11:41:05', NULL),
(2626, 191, 118, 'right', 1, 2, NULL, '2026-01-02 11:41:05', NULL),
(2627, 191, 117, 'right', 1, 3, NULL, '2026-01-02 11:41:05', NULL),
(2628, 191, 74, 'right', 1, 4, NULL, '2026-01-02 11:41:05', NULL),
(2629, 191, 73, 'left', 1, 5, NULL, '2026-01-02 11:41:05', NULL),
(2630, 191, 72, 'left', 1, 6, NULL, '2026-01-02 11:41:05', NULL),
(2631, 191, 71, 'left', 1, 7, NULL, '2026-01-02 11:41:05', NULL),
(2632, 191, 70, 'left', 1, 8, NULL, '2026-01-02 11:41:05', NULL),
(2633, 191, 69, 'left', 1, 9, NULL, '2026-01-02 11:41:05', NULL),
(2634, 191, 68, 'left', 1, 10, NULL, '2026-01-02 11:41:05', NULL),
(2635, 191, 67, 'left', 1, 11, NULL, '2026-01-02 11:41:05', NULL),
(2636, 191, 66, 'left', 1, 12, NULL, '2026-01-02 11:41:05', NULL),
(2637, 191, 65, 'left', 1, 13, NULL, '2026-01-02 11:41:05', NULL),
(2638, 191, 64, 'left', 1, 14, NULL, '2026-01-02 11:41:05', NULL),
(2639, 191, 63, 'left', 1, 15, NULL, '2026-01-02 11:41:05', NULL),
(2640, 191, 62, 'left', 1, 16, NULL, '2026-01-02 11:41:05', NULL),
(2641, 191, 38, 'left', 1, 17, NULL, '2026-01-02 11:41:05', NULL),
(2642, 191, 37, 'left', 1, 18, NULL, '2026-01-02 11:41:05', NULL),
(2643, 191, 36, 'left', 1, 19, NULL, '2026-01-02 11:41:05', NULL),
(2644, 191, 26, 'left', 1, 20, NULL, '2026-01-02 11:41:05', NULL),
(2645, 191, 24, 'right', 1, 21, NULL, '2026-01-02 11:41:05', NULL),
(2646, 191, 23, 'left', 1, 22, NULL, '2026-01-02 11:41:05', NULL),
(2647, 191, 22, 'left', 1, 23, NULL, '2026-01-02 11:41:05', NULL),
(2648, 191, 19, 'left', 1, 24, NULL, '2026-01-02 11:41:05', NULL),
(2649, 192, 190, 'left', 1, 1, NULL, '2026-01-02 11:41:16', NULL),
(2650, 192, 118, 'right', 1, 2, NULL, '2026-01-02 11:41:16', NULL),
(2651, 192, 117, 'right', 1, 3, NULL, '2026-01-02 11:41:16', NULL),
(2652, 192, 74, 'right', 1, 4, NULL, '2026-01-02 11:41:16', NULL),
(2653, 192, 73, 'left', 1, 5, NULL, '2026-01-02 11:41:16', NULL),
(2654, 192, 72, 'left', 1, 6, NULL, '2026-01-02 11:41:16', NULL),
(2655, 192, 71, 'left', 1, 7, NULL, '2026-01-02 11:41:16', NULL),
(2656, 192, 70, 'left', 1, 8, NULL, '2026-01-02 11:41:16', NULL),
(2657, 192, 69, 'left', 1, 9, NULL, '2026-01-02 11:41:16', NULL),
(2658, 192, 68, 'left', 1, 10, NULL, '2026-01-02 11:41:16', NULL),
(2659, 192, 67, 'left', 1, 11, NULL, '2026-01-02 11:41:16', NULL),
(2660, 192, 66, 'left', 1, 12, NULL, '2026-01-02 11:41:16', NULL),
(2661, 192, 65, 'left', 1, 13, NULL, '2026-01-02 11:41:16', NULL),
(2662, 192, 64, 'left', 1, 14, NULL, '2026-01-02 11:41:16', NULL),
(2663, 192, 63, 'left', 1, 15, NULL, '2026-01-02 11:41:16', NULL),
(2664, 192, 62, 'left', 1, 16, NULL, '2026-01-02 11:41:16', NULL),
(2665, 192, 38, 'left', 1, 17, NULL, '2026-01-02 11:41:16', NULL),
(2666, 192, 37, 'left', 1, 18, NULL, '2026-01-02 11:41:16', NULL),
(2667, 192, 36, 'left', 1, 19, NULL, '2026-01-02 11:41:16', NULL),
(2668, 192, 26, 'left', 1, 20, NULL, '2026-01-02 11:41:16', NULL),
(2669, 192, 24, 'right', 1, 21, NULL, '2026-01-02 11:41:16', NULL),
(2670, 192, 23, 'left', 1, 22, NULL, '2026-01-02 11:41:16', NULL),
(2671, 192, 22, 'left', 1, 23, NULL, '2026-01-02 11:41:16', NULL),
(2672, 192, 19, 'left', 1, 24, NULL, '2026-01-02 11:41:16', NULL),
(2673, 193, 191, 'right', 1, 1, NULL, '2026-01-02 11:48:25', NULL),
(2674, 193, 190, 'right', 1, 2, NULL, '2026-01-02 11:48:25', NULL),
(2675, 193, 118, 'right', 1, 3, NULL, '2026-01-02 11:48:25', NULL),
(2676, 193, 117, 'right', 1, 4, NULL, '2026-01-02 11:48:25', NULL),
(2677, 193, 74, 'right', 1, 5, NULL, '2026-01-02 11:48:25', NULL),
(2678, 193, 73, 'left', 1, 6, NULL, '2026-01-02 11:48:25', NULL),
(2679, 193, 72, 'left', 1, 7, NULL, '2026-01-02 11:48:25', NULL),
(2680, 193, 71, 'left', 1, 8, NULL, '2026-01-02 11:48:25', NULL),
(2681, 193, 70, 'left', 1, 9, NULL, '2026-01-02 11:48:25', NULL),
(2682, 193, 69, 'left', 1, 10, NULL, '2026-01-02 11:48:25', NULL),
(2683, 193, 68, 'left', 1, 11, NULL, '2026-01-02 11:48:25', NULL),
(2684, 193, 67, 'left', 1, 12, NULL, '2026-01-02 11:48:25', NULL),
(2685, 193, 66, 'left', 1, 13, NULL, '2026-01-02 11:48:25', NULL),
(2686, 193, 65, 'left', 1, 14, NULL, '2026-01-02 11:48:25', NULL),
(2687, 193, 64, 'left', 1, 15, NULL, '2026-01-02 11:48:25', NULL),
(2688, 193, 63, 'left', 1, 16, NULL, '2026-01-02 11:48:25', NULL),
(2689, 193, 62, 'left', 1, 17, NULL, '2026-01-02 11:48:25', NULL),
(2690, 193, 38, 'left', 1, 18, NULL, '2026-01-02 11:48:25', NULL),
(2691, 193, 37, 'left', 1, 19, NULL, '2026-01-02 11:48:25', NULL),
(2692, 193, 36, 'left', 1, 20, NULL, '2026-01-02 11:48:25', NULL),
(2693, 193, 26, 'left', 1, 21, NULL, '2026-01-02 11:48:25', NULL),
(2694, 193, 24, 'right', 1, 22, NULL, '2026-01-02 11:48:25', NULL),
(2695, 193, 23, 'left', 1, 23, NULL, '2026-01-02 11:48:25', NULL),
(2696, 193, 22, 'left', 1, 24, NULL, '2026-01-02 11:48:25', NULL),
(2697, 193, 19, 'left', 1, 25, NULL, '2026-01-02 11:48:25', NULL),
(2698, 123, 92, 'right', 1, 1, NULL, '2026-01-02 12:39:31', NULL),
(2699, 123, 114, 'left', 1, 2, NULL, '2026-01-02 12:39:31', NULL),
(2700, 123, 91, 'left', 1, 3, NULL, '2026-01-02 12:39:31', NULL),
(2701, 123, 90, 'left', 1, 4, NULL, '2026-01-02 12:39:31', NULL),
(2702, 123, 89, 'left', 1, 5, NULL, '2026-01-02 12:39:31', NULL),
(2703, 123, 113, 'left', 1, 6, NULL, '2026-01-02 12:39:31', NULL),
(2704, 123, 112, 'left', 1, 7, NULL, '2026-01-02 12:39:31', NULL),
(2705, 123, 111, 'left', 1, 8, NULL, '2026-01-02 12:39:31', NULL),
(2706, 123, 110, 'left', 1, 9, NULL, '2026-01-02 12:39:31', NULL),
(2707, 123, 109, 'left', 1, 10, NULL, '2026-01-02 12:39:31', NULL),
(2708, 123, 108, 'left', 1, 11, NULL, '2026-01-02 12:39:31', NULL),
(2709, 123, 107, 'left', 1, 12, NULL, '2026-01-02 12:39:31', NULL),
(2710, 123, 106, 'left', 1, 13, NULL, '2026-01-02 12:39:31', NULL),
(2711, 123, 105, 'left', 1, 14, NULL, '2026-01-02 12:39:31', NULL),
(2712, 123, 88, 'left', 1, 15, NULL, '2026-01-02 12:39:31', NULL),
(2713, 123, 87, 'left', 1, 16, NULL, '2026-01-02 12:39:31', NULL),
(2714, 123, 86, 'left', 1, 17, NULL, '2026-01-02 12:39:31', NULL),
(2715, 123, 85, 'left', 1, 18, NULL, '2026-01-02 12:39:31', NULL),
(2716, 123, 84, 'left', 1, 19, NULL, '2026-01-02 12:39:31', NULL),
(2717, 123, 83, 'left', 1, 20, NULL, '2026-01-02 12:39:31', NULL),
(2718, 123, 82, 'left', 1, 21, NULL, '2026-01-02 12:39:31', NULL),
(2719, 123, 81, 'left', 1, 22, NULL, '2026-01-02 12:39:31', NULL),
(2720, 123, 80, 'left', 1, 23, NULL, '2026-01-02 12:39:31', NULL),
(2721, 123, 79, 'left', 1, 24, NULL, '2026-01-02 12:39:31', NULL),
(2722, 123, 78, 'left', 1, 25, NULL, '2026-01-02 12:39:31', NULL),
(2723, 123, 77, 'left', 1, 26, NULL, '2026-01-02 12:39:31', NULL),
(2724, 123, 76, 'left', 1, 27, NULL, '2026-01-02 12:39:31', NULL),
(2725, 123, 75, 'left', 1, 28, NULL, '2026-01-02 12:39:31', NULL),
(2726, 123, 74, 'left', 1, 29, NULL, '2026-01-02 12:39:31', NULL),
(2727, 123, 73, 'left', 1, 30, NULL, '2026-01-02 12:39:31', NULL),
(2728, 123, 72, 'left', 1, 31, NULL, '2026-01-02 12:39:31', NULL),
(2729, 123, 71, 'left', 1, 32, NULL, '2026-01-02 12:39:31', NULL),
(2730, 123, 70, 'left', 1, 33, NULL, '2026-01-02 12:39:31', NULL),
(2731, 123, 69, 'left', 1, 34, NULL, '2026-01-02 12:39:31', NULL),
(2732, 123, 68, 'left', 1, 35, NULL, '2026-01-02 12:39:31', NULL),
(2733, 123, 67, 'left', 1, 36, NULL, '2026-01-02 12:39:31', NULL),
(2734, 123, 66, 'left', 1, 37, NULL, '2026-01-02 12:39:31', NULL),
(2735, 123, 65, 'left', 1, 38, NULL, '2026-01-02 12:39:31', NULL),
(2736, 123, 64, 'left', 1, 39, NULL, '2026-01-02 12:39:31', NULL),
(2737, 123, 63, 'left', 1, 40, NULL, '2026-01-02 12:39:31', NULL),
(2738, 123, 62, 'left', 1, 41, NULL, '2026-01-02 12:39:31', NULL),
(2739, 123, 38, 'left', 1, 42, NULL, '2026-01-02 12:39:31', NULL),
(2740, 123, 37, 'left', 1, 43, NULL, '2026-01-02 12:39:31', NULL),
(2741, 123, 36, 'left', 1, 44, NULL, '2026-01-02 12:39:31', NULL),
(2742, 123, 26, 'left', 1, 45, NULL, '2026-01-02 12:39:31', NULL),
(2743, 123, 24, 'right', 1, 46, NULL, '2026-01-02 12:39:31', NULL),
(2744, 123, 23, 'left', 1, 47, NULL, '2026-01-02 12:39:31', NULL),
(2745, 123, 22, 'left', 1, 48, NULL, '2026-01-02 12:39:31', NULL),
(2746, 123, 19, 'left', 1, 49, NULL, '2026-01-02 12:39:31', NULL),
(2747, 195, 123, 'left', 1, 1, NULL, '2026-01-02 12:47:03', NULL),
(2748, 195, 92, 'right', 1, 2, NULL, '2026-01-02 12:47:03', NULL),
(2749, 195, 114, 'left', 1, 3, NULL, '2026-01-02 12:47:03', NULL),
(2750, 195, 91, 'left', 1, 4, NULL, '2026-01-02 12:47:03', NULL),
(2751, 195, 90, 'left', 1, 5, NULL, '2026-01-02 12:47:03', NULL),
(2752, 195, 89, 'left', 1, 6, NULL, '2026-01-02 12:47:03', NULL),
(2753, 195, 113, 'left', 1, 7, NULL, '2026-01-02 12:47:03', NULL),
(2754, 195, 112, 'left', 1, 8, NULL, '2026-01-02 12:47:03', NULL),
(2755, 195, 111, 'left', 1, 9, NULL, '2026-01-02 12:47:03', NULL),
(2756, 195, 110, 'left', 1, 10, NULL, '2026-01-02 12:47:03', NULL),
(2757, 195, 109, 'left', 1, 11, NULL, '2026-01-02 12:47:03', NULL),
(2758, 195, 108, 'left', 1, 12, NULL, '2026-01-02 12:47:03', NULL),
(2759, 195, 107, 'left', 1, 13, NULL, '2026-01-02 12:47:03', NULL),
(2760, 195, 106, 'left', 1, 14, NULL, '2026-01-02 12:47:03', NULL),
(2761, 195, 105, 'left', 1, 15, NULL, '2026-01-02 12:47:03', NULL),
(2762, 195, 88, 'left', 1, 16, NULL, '2026-01-02 12:47:03', NULL),
(2763, 195, 87, 'left', 1, 17, NULL, '2026-01-02 12:47:03', NULL),
(2764, 195, 86, 'left', 1, 18, NULL, '2026-01-02 12:47:03', NULL),
(2765, 195, 85, 'left', 1, 19, NULL, '2026-01-02 12:47:03', NULL),
(2766, 195, 84, 'left', 1, 20, NULL, '2026-01-02 12:47:03', NULL),
(2767, 195, 83, 'left', 1, 21, NULL, '2026-01-02 12:47:03', NULL),
(2768, 195, 82, 'left', 1, 22, NULL, '2026-01-02 12:47:03', NULL),
(2769, 195, 81, 'left', 1, 23, NULL, '2026-01-02 12:47:03', NULL),
(2770, 195, 80, 'left', 1, 24, NULL, '2026-01-02 12:47:03', NULL),
(2771, 195, 79, 'left', 1, 25, NULL, '2026-01-02 12:47:03', NULL),
(2772, 195, 78, 'left', 1, 26, NULL, '2026-01-02 12:47:03', NULL),
(2773, 195, 77, 'left', 1, 27, NULL, '2026-01-02 12:47:03', NULL),
(2774, 195, 76, 'left', 1, 28, NULL, '2026-01-02 12:47:03', NULL),
(2775, 195, 75, 'left', 1, 29, NULL, '2026-01-02 12:47:03', NULL),
(2776, 195, 74, 'left', 1, 30, NULL, '2026-01-02 12:47:03', NULL),
(2777, 195, 73, 'left', 1, 31, NULL, '2026-01-02 12:47:03', NULL),
(2778, 195, 72, 'left', 1, 32, NULL, '2026-01-02 12:47:03', NULL),
(2779, 195, 71, 'left', 1, 33, NULL, '2026-01-02 12:47:03', NULL),
(2780, 195, 70, 'left', 1, 34, NULL, '2026-01-02 12:47:03', NULL),
(2781, 195, 69, 'left', 1, 35, NULL, '2026-01-02 12:47:03', NULL),
(2782, 195, 68, 'left', 1, 36, NULL, '2026-01-02 12:47:03', NULL),
(2783, 195, 67, 'left', 1, 37, NULL, '2026-01-02 12:47:03', NULL),
(2784, 195, 66, 'left', 1, 38, NULL, '2026-01-02 12:47:03', NULL),
(2785, 195, 65, 'left', 1, 39, NULL, '2026-01-02 12:47:03', NULL),
(2786, 195, 64, 'left', 1, 40, NULL, '2026-01-02 12:47:03', NULL),
(2787, 195, 63, 'left', 1, 41, NULL, '2026-01-02 12:47:03', NULL),
(2788, 195, 62, 'left', 1, 42, NULL, '2026-01-02 12:47:03', NULL),
(2789, 195, 38, 'left', 1, 43, NULL, '2026-01-02 12:47:03', NULL),
(2790, 195, 37, 'left', 1, 44, NULL, '2026-01-02 12:47:03', NULL),
(2791, 195, 36, 'left', 1, 45, NULL, '2026-01-02 12:47:03', NULL),
(2792, 195, 26, 'left', 1, 46, NULL, '2026-01-02 12:47:03', NULL),
(2793, 195, 24, 'right', 1, 47, NULL, '2026-01-02 12:47:03', NULL),
(2794, 195, 23, 'left', 1, 48, NULL, '2026-01-02 12:47:03', NULL),
(2795, 195, 22, 'left', 1, 49, NULL, '2026-01-02 12:47:03', NULL),
(2796, 195, 19, 'left', 1, 50, NULL, '2026-01-02 12:47:03', NULL),
(2797, 196, 93, 'right', 1, 1, NULL, '2026-01-02 12:56:49', NULL),
(2798, 196, 92, 'left', 1, 2, NULL, '2026-01-02 12:56:49', NULL),
(2799, 196, 114, 'left', 1, 3, NULL, '2026-01-02 12:56:49', NULL),
(2800, 196, 91, 'left', 1, 4, NULL, '2026-01-02 12:56:49', NULL),
(2801, 196, 90, 'left', 1, 5, NULL, '2026-01-02 12:56:49', NULL),
(2802, 196, 89, 'left', 1, 6, NULL, '2026-01-02 12:56:49', NULL),
(2803, 196, 113, 'left', 1, 7, NULL, '2026-01-02 12:56:49', NULL),
(2804, 196, 112, 'left', 1, 8, NULL, '2026-01-02 12:56:49', NULL),
(2805, 196, 111, 'left', 1, 9, NULL, '2026-01-02 12:56:49', NULL),
(2806, 196, 110, 'left', 1, 10, NULL, '2026-01-02 12:56:49', NULL),
(2807, 196, 109, 'left', 1, 11, NULL, '2026-01-02 12:56:49', NULL),
(2808, 196, 108, 'left', 1, 12, NULL, '2026-01-02 12:56:49', NULL),
(2809, 196, 107, 'left', 1, 13, NULL, '2026-01-02 12:56:49', NULL),
(2810, 196, 106, 'left', 1, 14, NULL, '2026-01-02 12:56:49', NULL),
(2811, 196, 105, 'left', 1, 15, NULL, '2026-01-02 12:56:49', NULL),
(2812, 196, 88, 'left', 1, 16, NULL, '2026-01-02 12:56:49', NULL),
(2813, 196, 87, 'left', 1, 17, NULL, '2026-01-02 12:56:49', NULL),
(2814, 196, 86, 'left', 1, 18, NULL, '2026-01-02 12:56:49', NULL),
(2815, 196, 85, 'left', 1, 19, NULL, '2026-01-02 12:56:49', NULL),
(2816, 196, 84, 'left', 1, 20, NULL, '2026-01-02 12:56:49', NULL),
(2817, 196, 83, 'left', 1, 21, NULL, '2026-01-02 12:56:49', NULL),
(2818, 196, 82, 'left', 1, 22, NULL, '2026-01-02 12:56:49', NULL),
(2819, 196, 81, 'left', 1, 23, NULL, '2026-01-02 12:56:49', NULL),
(2820, 196, 80, 'left', 1, 24, NULL, '2026-01-02 12:56:49', NULL),
(2821, 196, 79, 'left', 1, 25, NULL, '2026-01-02 12:56:49', NULL),
(2822, 196, 78, 'left', 1, 26, NULL, '2026-01-02 12:56:49', NULL),
(2823, 196, 77, 'left', 1, 27, NULL, '2026-01-02 12:56:49', NULL),
(2824, 196, 76, 'left', 1, 28, NULL, '2026-01-02 12:56:49', NULL),
(2825, 196, 75, 'left', 1, 29, NULL, '2026-01-02 12:56:49', NULL),
(2826, 196, 74, 'left', 1, 30, NULL, '2026-01-02 12:56:49', NULL),
(2827, 196, 73, 'left', 1, 31, NULL, '2026-01-02 12:56:49', NULL),
(2828, 196, 72, 'left', 1, 32, NULL, '2026-01-02 12:56:49', NULL),
(2829, 196, 71, 'left', 1, 33, NULL, '2026-01-02 12:56:49', NULL),
(2830, 196, 70, 'left', 1, 34, NULL, '2026-01-02 12:56:49', NULL),
(2831, 196, 69, 'left', 1, 35, NULL, '2026-01-02 12:56:49', NULL),
(2832, 196, 68, 'left', 1, 36, NULL, '2026-01-02 12:56:49', NULL),
(2833, 196, 67, 'left', 1, 37, NULL, '2026-01-02 12:56:49', NULL),
(2834, 196, 66, 'left', 1, 38, NULL, '2026-01-02 12:56:49', NULL),
(2835, 196, 65, 'left', 1, 39, NULL, '2026-01-02 12:56:49', NULL),
(2836, 196, 64, 'left', 1, 40, NULL, '2026-01-02 12:56:49', NULL),
(2837, 196, 63, 'left', 1, 41, NULL, '2026-01-02 12:56:49', NULL),
(2838, 196, 62, 'left', 1, 42, NULL, '2026-01-02 12:56:49', NULL),
(2839, 196, 38, 'left', 1, 43, NULL, '2026-01-02 12:56:49', NULL),
(2840, 196, 37, 'left', 1, 44, NULL, '2026-01-02 12:56:49', NULL),
(2841, 196, 36, 'left', 1, 45, NULL, '2026-01-02 12:56:49', NULL),
(2842, 196, 26, 'left', 1, 46, NULL, '2026-01-02 12:56:49', NULL),
(2843, 196, 24, 'right', 1, 47, NULL, '2026-01-02 12:56:49', NULL),
(2844, 196, 23, 'left', 1, 48, NULL, '2026-01-02 12:56:49', NULL),
(2845, 196, 22, 'left', 1, 49, NULL, '2026-01-02 12:56:49', NULL),
(2846, 196, 19, 'left', 1, 50, NULL, '2026-01-02 12:56:49', NULL),
(2847, 150, 94, 'right', 1, 1, NULL, '2026-01-02 13:12:04', NULL),
(2848, 150, 93, 'left', 1, 2, NULL, '2026-01-02 13:12:04', NULL),
(2849, 150, 92, 'left', 1, 3, NULL, '2026-01-02 13:12:04', NULL),
(2850, 150, 114, 'left', 1, 4, NULL, '2026-01-02 13:12:04', NULL),
(2851, 150, 91, 'left', 1, 5, NULL, '2026-01-02 13:12:04', NULL),
(2852, 150, 90, 'left', 1, 6, NULL, '2026-01-02 13:12:04', NULL),
(2853, 150, 89, 'left', 1, 7, NULL, '2026-01-02 13:12:04', NULL),
(2854, 150, 113, 'left', 1, 8, NULL, '2026-01-02 13:12:04', NULL),
(2855, 150, 112, 'left', 1, 9, NULL, '2026-01-02 13:12:04', NULL),
(2856, 150, 111, 'left', 1, 10, NULL, '2026-01-02 13:12:04', NULL),
(2857, 150, 110, 'left', 1, 11, NULL, '2026-01-02 13:12:04', NULL),
(2858, 150, 109, 'left', 1, 12, NULL, '2026-01-02 13:12:04', NULL),
(2859, 150, 108, 'left', 1, 13, NULL, '2026-01-02 13:12:04', NULL),
(2860, 150, 107, 'left', 1, 14, NULL, '2026-01-02 13:12:04', NULL),
(2861, 150, 106, 'left', 1, 15, NULL, '2026-01-02 13:12:04', NULL),
(2862, 150, 105, 'left', 1, 16, NULL, '2026-01-02 13:12:04', NULL),
(2863, 150, 88, 'left', 1, 17, NULL, '2026-01-02 13:12:04', NULL),
(2864, 150, 87, 'left', 1, 18, NULL, '2026-01-02 13:12:04', NULL),
(2865, 150, 86, 'left', 1, 19, NULL, '2026-01-02 13:12:04', NULL),
(2866, 150, 85, 'left', 1, 20, NULL, '2026-01-02 13:12:04', NULL),
(2867, 150, 84, 'left', 1, 21, NULL, '2026-01-02 13:12:04', NULL),
(2868, 150, 83, 'left', 1, 22, NULL, '2026-01-02 13:12:04', NULL),
(2869, 150, 82, 'left', 1, 23, NULL, '2026-01-02 13:12:04', NULL),
(2870, 150, 81, 'left', 1, 24, NULL, '2026-01-02 13:12:04', NULL),
(2871, 150, 80, 'left', 1, 25, NULL, '2026-01-02 13:12:04', NULL),
(2872, 150, 79, 'left', 1, 26, NULL, '2026-01-02 13:12:04', NULL),
(2873, 150, 78, 'left', 1, 27, NULL, '2026-01-02 13:12:04', NULL),
(2874, 150, 77, 'left', 1, 28, NULL, '2026-01-02 13:12:04', NULL),
(2875, 150, 76, 'left', 1, 29, NULL, '2026-01-02 13:12:04', NULL),
(2876, 150, 75, 'left', 1, 30, NULL, '2026-01-02 13:12:04', NULL),
(2877, 150, 74, 'left', 1, 31, NULL, '2026-01-02 13:12:04', NULL),
(2878, 150, 73, 'left', 1, 32, NULL, '2026-01-02 13:12:04', NULL),
(2879, 150, 72, 'left', 1, 33, NULL, '2026-01-02 13:12:04', NULL),
(2880, 150, 71, 'left', 1, 34, NULL, '2026-01-02 13:12:04', NULL),
(2881, 150, 70, 'left', 1, 35, NULL, '2026-01-02 13:12:04', NULL),
(2882, 150, 69, 'left', 1, 36, NULL, '2026-01-02 13:12:04', NULL),
(2883, 150, 68, 'left', 1, 37, NULL, '2026-01-02 13:12:04', NULL),
(2884, 150, 67, 'left', 1, 38, NULL, '2026-01-02 13:12:04', NULL),
(2885, 150, 66, 'left', 1, 39, NULL, '2026-01-02 13:12:04', NULL),
(2886, 150, 65, 'left', 1, 40, NULL, '2026-01-02 13:12:04', NULL),
(2887, 150, 64, 'left', 1, 41, NULL, '2026-01-02 13:12:04', NULL),
(2888, 150, 63, 'left', 1, 42, NULL, '2026-01-02 13:12:04', NULL),
(2889, 150, 62, 'left', 1, 43, NULL, '2026-01-02 13:12:04', NULL),
(2890, 150, 38, 'left', 1, 44, NULL, '2026-01-02 13:12:04', NULL),
(2891, 150, 37, 'left', 1, 45, NULL, '2026-01-02 13:12:04', NULL),
(2892, 150, 36, 'left', 1, 46, NULL, '2026-01-02 13:12:04', NULL),
(2893, 150, 26, 'left', 1, 47, NULL, '2026-01-02 13:12:04', NULL),
(2894, 150, 24, 'right', 1, 48, NULL, '2026-01-02 13:12:04', NULL),
(2895, 150, 23, 'left', 1, 49, NULL, '2026-01-02 13:12:04', NULL),
(2896, 150, 22, 'left', 1, 50, NULL, '2026-01-02 13:12:04', NULL),
(2897, 150, 19, 'left', 1, 51, NULL, '2026-01-02 13:12:04', NULL),
(2898, 194, 123, 'right', 1, 1, NULL, '2026-01-03 05:08:04', NULL),
(2899, 194, 92, 'right', 1, 2, NULL, '2026-01-03 05:08:04', NULL),
(2900, 194, 114, 'left', 1, 3, NULL, '2026-01-03 05:08:04', NULL),
(2901, 194, 91, 'left', 1, 4, NULL, '2026-01-03 05:08:04', NULL),
(2902, 194, 90, 'left', 1, 5, NULL, '2026-01-03 05:08:04', NULL),
(2903, 194, 89, 'left', 1, 6, NULL, '2026-01-03 05:08:04', NULL),
(2904, 194, 113, 'left', 1, 7, NULL, '2026-01-03 05:08:04', NULL),
(2905, 194, 112, 'left', 1, 8, NULL, '2026-01-03 05:08:04', NULL),
(2906, 194, 111, 'left', 1, 9, NULL, '2026-01-03 05:08:04', NULL),
(2907, 194, 110, 'left', 1, 10, NULL, '2026-01-03 05:08:04', NULL),
(2908, 194, 109, 'left', 1, 11, NULL, '2026-01-03 05:08:04', NULL),
(2909, 194, 108, 'left', 1, 12, NULL, '2026-01-03 05:08:04', NULL),
(2910, 194, 107, 'left', 1, 13, NULL, '2026-01-03 05:08:04', NULL),
(2911, 194, 106, 'left', 1, 14, NULL, '2026-01-03 05:08:04', NULL),
(2912, 194, 105, 'left', 1, 15, NULL, '2026-01-03 05:08:04', NULL),
(2913, 194, 88, 'left', 1, 16, NULL, '2026-01-03 05:08:04', NULL),
(2914, 194, 87, 'left', 1, 17, NULL, '2026-01-03 05:08:04', NULL),
(2915, 194, 86, 'left', 1, 18, NULL, '2026-01-03 05:08:04', NULL),
(2916, 194, 85, 'left', 1, 19, NULL, '2026-01-03 05:08:04', NULL),
(2917, 194, 84, 'left', 1, 20, NULL, '2026-01-03 05:08:04', NULL),
(2918, 194, 83, 'left', 1, 21, NULL, '2026-01-03 05:08:04', NULL),
(2919, 194, 82, 'left', 1, 22, NULL, '2026-01-03 05:08:04', NULL),
(2920, 194, 81, 'left', 1, 23, NULL, '2026-01-03 05:08:04', NULL),
(2921, 194, 80, 'left', 1, 24, NULL, '2026-01-03 05:08:04', NULL),
(2922, 194, 79, 'left', 1, 25, NULL, '2026-01-03 05:08:04', NULL),
(2923, 194, 78, 'left', 1, 26, NULL, '2026-01-03 05:08:04', NULL),
(2924, 194, 77, 'left', 1, 27, NULL, '2026-01-03 05:08:04', NULL),
(2925, 194, 76, 'left', 1, 28, NULL, '2026-01-03 05:08:04', NULL),
(2926, 194, 75, 'left', 1, 29, NULL, '2026-01-03 05:08:04', NULL),
(2927, 194, 74, 'left', 1, 30, NULL, '2026-01-03 05:08:04', NULL),
(2928, 194, 73, 'left', 1, 31, NULL, '2026-01-03 05:08:04', NULL),
(2929, 194, 72, 'left', 1, 32, NULL, '2026-01-03 05:08:04', NULL),
(2930, 194, 71, 'left', 1, 33, NULL, '2026-01-03 05:08:04', NULL),
(2931, 194, 70, 'left', 1, 34, NULL, '2026-01-03 05:08:04', NULL),
(2932, 194, 69, 'left', 1, 35, NULL, '2026-01-03 05:08:04', NULL),
(2933, 194, 68, 'left', 1, 36, NULL, '2026-01-03 05:08:04', NULL),
(2934, 194, 67, 'left', 1, 37, NULL, '2026-01-03 05:08:04', NULL),
(2935, 194, 66, 'left', 1, 38, NULL, '2026-01-03 05:08:04', NULL),
(2936, 194, 65, 'left', 1, 39, NULL, '2026-01-03 05:08:04', NULL),
(2937, 194, 64, 'left', 1, 40, NULL, '2026-01-03 05:08:04', NULL),
(2938, 194, 63, 'left', 1, 41, NULL, '2026-01-03 05:08:04', NULL),
(2939, 194, 62, 'left', 1, 42, NULL, '2026-01-03 05:08:04', NULL),
(2940, 194, 38, 'left', 1, 43, NULL, '2026-01-03 05:08:04', NULL),
(2941, 194, 37, 'left', 1, 44, NULL, '2026-01-03 05:08:04', NULL),
(2942, 194, 36, 'left', 1, 45, NULL, '2026-01-03 05:08:04', NULL),
(2943, 194, 26, 'left', 1, 46, NULL, '2026-01-03 05:08:04', NULL),
(2944, 194, 24, 'right', 1, 47, NULL, '2026-01-03 05:08:04', NULL),
(2945, 194, 23, 'left', 1, 48, NULL, '2026-01-03 05:08:04', NULL),
(2946, 194, 22, 'left', 1, 49, NULL, '2026-01-03 05:08:04', NULL),
(2947, 194, 19, 'left', 1, 50, NULL, '2026-01-03 05:08:04', NULL),
(2948, 197, 194, 'right', 1, 1, NULL, '2026-01-03 10:16:45', NULL),
(2949, 197, 123, 'right', 1, 2, NULL, '2026-01-03 10:16:45', NULL),
(2950, 197, 92, 'right', 1, 3, NULL, '2026-01-03 10:16:45', NULL),
(2951, 197, 114, 'left', 1, 4, NULL, '2026-01-03 10:16:45', NULL),
(2952, 197, 91, 'left', 1, 5, NULL, '2026-01-03 10:16:45', NULL),
(2953, 197, 90, 'left', 1, 6, NULL, '2026-01-03 10:16:45', NULL),
(2954, 197, 89, 'left', 1, 7, NULL, '2026-01-03 10:16:45', NULL),
(2955, 197, 113, 'left', 1, 8, NULL, '2026-01-03 10:16:45', NULL),
(2956, 197, 112, 'left', 1, 9, NULL, '2026-01-03 10:16:45', NULL),
(2957, 197, 111, 'left', 1, 10, NULL, '2026-01-03 10:16:45', NULL),
(2958, 197, 110, 'left', 1, 11, NULL, '2026-01-03 10:16:45', NULL),
(2959, 197, 109, 'left', 1, 12, NULL, '2026-01-03 10:16:45', NULL),
(2960, 197, 108, 'left', 1, 13, NULL, '2026-01-03 10:16:45', NULL),
(2961, 197, 107, 'left', 1, 14, NULL, '2026-01-03 10:16:45', NULL),
(2962, 197, 106, 'left', 1, 15, NULL, '2026-01-03 10:16:45', NULL),
(2963, 197, 105, 'left', 1, 16, NULL, '2026-01-03 10:16:45', NULL),
(2964, 197, 88, 'left', 1, 17, NULL, '2026-01-03 10:16:45', NULL),
(2965, 197, 87, 'left', 1, 18, NULL, '2026-01-03 10:16:45', NULL),
(2966, 197, 86, 'left', 1, 19, NULL, '2026-01-03 10:16:45', NULL),
(2967, 197, 85, 'left', 1, 20, NULL, '2026-01-03 10:16:45', NULL),
(2968, 197, 84, 'left', 1, 21, NULL, '2026-01-03 10:16:45', NULL),
(2969, 197, 83, 'left', 1, 22, NULL, '2026-01-03 10:16:45', NULL),
(2970, 197, 82, 'left', 1, 23, NULL, '2026-01-03 10:16:45', NULL),
(2971, 197, 81, 'left', 1, 24, NULL, '2026-01-03 10:16:45', NULL),
(2972, 197, 80, 'left', 1, 25, NULL, '2026-01-03 10:16:45', NULL),
(2973, 197, 79, 'left', 1, 26, NULL, '2026-01-03 10:16:45', NULL),
(2974, 197, 78, 'left', 1, 27, NULL, '2026-01-03 10:16:45', NULL),
(2975, 197, 77, 'left', 1, 28, NULL, '2026-01-03 10:16:45', NULL),
(2976, 197, 76, 'left', 1, 29, NULL, '2026-01-03 10:16:45', NULL),
(2977, 197, 75, 'left', 1, 30, NULL, '2026-01-03 10:16:45', NULL),
(2978, 197, 74, 'left', 1, 31, NULL, '2026-01-03 10:16:45', NULL),
(2979, 197, 73, 'left', 1, 32, NULL, '2026-01-03 10:16:45', NULL),
(2980, 197, 72, 'left', 1, 33, NULL, '2026-01-03 10:16:45', NULL),
(2981, 197, 71, 'left', 1, 34, NULL, '2026-01-03 10:16:45', NULL),
(2982, 197, 70, 'left', 1, 35, NULL, '2026-01-03 10:16:45', NULL),
(2983, 197, 69, 'left', 1, 36, NULL, '2026-01-03 10:16:45', NULL),
(2984, 197, 68, 'left', 1, 37, NULL, '2026-01-03 10:16:45', NULL),
(2985, 197, 67, 'left', 1, 38, NULL, '2026-01-03 10:16:45', NULL),
(2986, 197, 66, 'left', 1, 39, NULL, '2026-01-03 10:16:45', NULL),
(2987, 197, 65, 'left', 1, 40, NULL, '2026-01-03 10:16:45', NULL),
(2988, 197, 64, 'left', 1, 41, NULL, '2026-01-03 10:16:45', NULL),
(2989, 197, 63, 'left', 1, 42, NULL, '2026-01-03 10:16:45', NULL),
(2990, 197, 62, 'left', 1, 43, NULL, '2026-01-03 10:16:45', NULL),
(2991, 197, 38, 'left', 1, 44, NULL, '2026-01-03 10:16:45', NULL),
(2992, 197, 37, 'left', 1, 45, NULL, '2026-01-03 10:16:45', NULL),
(2993, 197, 36, 'left', 1, 46, NULL, '2026-01-03 10:16:45', NULL),
(2994, 197, 26, 'left', 1, 47, NULL, '2026-01-03 10:16:45', NULL),
(2995, 197, 24, 'right', 1, 48, NULL, '2026-01-03 10:16:45', NULL),
(2996, 197, 23, 'left', 1, 49, NULL, '2026-01-03 10:16:45', NULL),
(2997, 197, 22, 'left', 1, 50, NULL, '2026-01-03 10:16:45', NULL),
(2998, 197, 19, 'left', 1, 51, NULL, '2026-01-03 10:16:45', NULL),
(2999, 198, 94, 'left', 1, 1, NULL, '2026-01-03 10:36:44', NULL),
(3000, 198, 93, 'left', 1, 2, NULL, '2026-01-03 10:36:44', NULL),
(3001, 198, 92, 'left', 1, 3, NULL, '2026-01-03 10:36:44', NULL),
(3002, 198, 114, 'left', 1, 4, NULL, '2026-01-03 10:36:44', NULL),
(3003, 198, 91, 'left', 1, 5, NULL, '2026-01-03 10:36:44', NULL),
(3004, 198, 90, 'left', 1, 6, NULL, '2026-01-03 10:36:44', NULL),
(3005, 198, 89, 'left', 1, 7, NULL, '2026-01-03 10:36:44', NULL),
(3006, 198, 113, 'left', 1, 8, NULL, '2026-01-03 10:36:44', NULL),
(3007, 198, 112, 'left', 1, 9, NULL, '2026-01-03 10:36:44', NULL),
(3008, 198, 111, 'left', 1, 10, NULL, '2026-01-03 10:36:44', NULL),
(3009, 198, 110, 'left', 1, 11, NULL, '2026-01-03 10:36:44', NULL),
(3010, 198, 109, 'left', 1, 12, NULL, '2026-01-03 10:36:44', NULL),
(3011, 198, 108, 'left', 1, 13, NULL, '2026-01-03 10:36:44', NULL),
(3012, 198, 107, 'left', 1, 14, NULL, '2026-01-03 10:36:44', NULL),
(3013, 198, 106, 'left', 1, 15, NULL, '2026-01-03 10:36:44', NULL),
(3014, 198, 105, 'left', 1, 16, NULL, '2026-01-03 10:36:44', NULL),
(3015, 198, 88, 'left', 1, 17, NULL, '2026-01-03 10:36:44', NULL),
(3016, 198, 87, 'left', 1, 18, NULL, '2026-01-03 10:36:44', NULL),
(3017, 198, 86, 'left', 1, 19, NULL, '2026-01-03 10:36:44', NULL),
(3018, 198, 85, 'left', 1, 20, NULL, '2026-01-03 10:36:44', NULL),
(3019, 198, 84, 'left', 1, 21, NULL, '2026-01-03 10:36:44', NULL),
(3020, 198, 83, 'left', 1, 22, NULL, '2026-01-03 10:36:44', NULL),
(3021, 198, 82, 'left', 1, 23, NULL, '2026-01-03 10:36:44', NULL),
(3022, 198, 81, 'left', 1, 24, NULL, '2026-01-03 10:36:44', NULL),
(3023, 198, 80, 'left', 1, 25, NULL, '2026-01-03 10:36:44', NULL),
(3024, 198, 79, 'left', 1, 26, NULL, '2026-01-03 10:36:44', NULL),
(3025, 198, 78, 'left', 1, 27, NULL, '2026-01-03 10:36:44', NULL),
(3026, 198, 77, 'left', 1, 28, NULL, '2026-01-03 10:36:44', NULL),
(3027, 198, 76, 'left', 1, 29, NULL, '2026-01-03 10:36:44', NULL),
(3028, 198, 75, 'left', 1, 30, NULL, '2026-01-03 10:36:44', NULL),
(3029, 198, 74, 'left', 1, 31, NULL, '2026-01-03 10:36:44', NULL),
(3030, 198, 73, 'left', 1, 32, NULL, '2026-01-03 10:36:44', NULL),
(3031, 198, 72, 'left', 1, 33, NULL, '2026-01-03 10:36:44', NULL),
(3032, 198, 71, 'left', 1, 34, NULL, '2026-01-03 10:36:44', NULL),
(3033, 198, 70, 'left', 1, 35, NULL, '2026-01-03 10:36:44', NULL),
(3034, 198, 69, 'left', 1, 36, NULL, '2026-01-03 10:36:44', NULL),
(3035, 198, 68, 'left', 1, 37, NULL, '2026-01-03 10:36:44', NULL),
(3036, 198, 67, 'left', 1, 38, NULL, '2026-01-03 10:36:44', NULL),
(3037, 198, 66, 'left', 1, 39, NULL, '2026-01-03 10:36:44', NULL),
(3038, 198, 65, 'left', 1, 40, NULL, '2026-01-03 10:36:44', NULL),
(3039, 198, 64, 'left', 1, 41, NULL, '2026-01-03 10:36:44', NULL),
(3040, 198, 63, 'left', 1, 42, NULL, '2026-01-03 10:36:44', NULL),
(3041, 198, 62, 'left', 1, 43, NULL, '2026-01-03 10:36:44', NULL),
(3042, 198, 38, 'left', 1, 44, NULL, '2026-01-03 10:36:44', NULL),
(3043, 198, 37, 'left', 1, 45, NULL, '2026-01-03 10:36:44', NULL),
(3044, 198, 36, 'left', 1, 46, NULL, '2026-01-03 10:36:44', NULL),
(3045, 198, 26, 'left', 1, 47, NULL, '2026-01-03 10:36:44', NULL),
(3046, 198, 24, 'right', 1, 48, NULL, '2026-01-03 10:36:44', NULL),
(3047, 198, 23, 'left', 1, 49, NULL, '2026-01-03 10:36:44', NULL),
(3048, 198, 22, 'left', 1, 50, NULL, '2026-01-03 10:36:44', NULL),
(3049, 198, 19, 'left', 1, 51, NULL, '2026-01-03 10:36:44', NULL),
(3050, 199, 198, 'left', 1, 1, NULL, '2026-01-03 10:43:17', NULL),
(3051, 199, 94, 'left', 1, 2, NULL, '2026-01-03 10:43:17', NULL),
(3052, 199, 93, 'left', 1, 3, NULL, '2026-01-03 10:43:17', NULL),
(3053, 199, 92, 'left', 1, 4, NULL, '2026-01-03 10:43:17', NULL),
(3054, 199, 114, 'left', 1, 5, NULL, '2026-01-03 10:43:17', NULL),
(3055, 199, 91, 'left', 1, 6, NULL, '2026-01-03 10:43:17', NULL),
(3056, 199, 90, 'left', 1, 7, NULL, '2026-01-03 10:43:17', NULL),
(3057, 199, 89, 'left', 1, 8, NULL, '2026-01-03 10:43:17', NULL),
(3058, 199, 113, 'left', 1, 9, NULL, '2026-01-03 10:43:17', NULL),
(3059, 199, 112, 'left', 1, 10, NULL, '2026-01-03 10:43:17', NULL),
(3060, 199, 111, 'left', 1, 11, NULL, '2026-01-03 10:43:17', NULL),
(3061, 199, 110, 'left', 1, 12, NULL, '2026-01-03 10:43:17', NULL),
(3062, 199, 109, 'left', 1, 13, NULL, '2026-01-03 10:43:17', NULL),
(3063, 199, 108, 'left', 1, 14, NULL, '2026-01-03 10:43:17', NULL),
(3064, 199, 107, 'left', 1, 15, NULL, '2026-01-03 10:43:17', NULL),
(3065, 199, 106, 'left', 1, 16, NULL, '2026-01-03 10:43:17', NULL),
(3066, 199, 105, 'left', 1, 17, NULL, '2026-01-03 10:43:17', NULL),
(3067, 199, 88, 'left', 1, 18, NULL, '2026-01-03 10:43:17', NULL),
(3068, 199, 87, 'left', 1, 19, NULL, '2026-01-03 10:43:17', NULL),
(3069, 199, 86, 'left', 1, 20, NULL, '2026-01-03 10:43:17', NULL),
(3070, 199, 85, 'left', 1, 21, NULL, '2026-01-03 10:43:17', NULL),
(3071, 199, 84, 'left', 1, 22, NULL, '2026-01-03 10:43:17', NULL),
(3072, 199, 83, 'left', 1, 23, NULL, '2026-01-03 10:43:17', NULL),
(3073, 199, 82, 'left', 1, 24, NULL, '2026-01-03 10:43:17', NULL),
(3074, 199, 81, 'left', 1, 25, NULL, '2026-01-03 10:43:17', NULL),
(3075, 199, 80, 'left', 1, 26, NULL, '2026-01-03 10:43:17', NULL),
(3076, 199, 79, 'left', 1, 27, NULL, '2026-01-03 10:43:17', NULL),
(3077, 199, 78, 'left', 1, 28, NULL, '2026-01-03 10:43:17', NULL),
(3078, 199, 77, 'left', 1, 29, NULL, '2026-01-03 10:43:17', NULL),
(3079, 199, 76, 'left', 1, 30, NULL, '2026-01-03 10:43:17', NULL),
(3080, 199, 75, 'left', 1, 31, NULL, '2026-01-03 10:43:17', NULL),
(3081, 199, 74, 'left', 1, 32, NULL, '2026-01-03 10:43:17', NULL),
(3082, 199, 73, 'left', 1, 33, NULL, '2026-01-03 10:43:17', NULL),
(3083, 199, 72, 'left', 1, 34, NULL, '2026-01-03 10:43:17', NULL),
(3084, 199, 71, 'left', 1, 35, NULL, '2026-01-03 10:43:17', NULL),
(3085, 199, 70, 'left', 1, 36, NULL, '2026-01-03 10:43:17', NULL),
(3086, 199, 69, 'left', 1, 37, NULL, '2026-01-03 10:43:17', NULL),
(3087, 199, 68, 'left', 1, 38, NULL, '2026-01-03 10:43:17', NULL),
(3088, 199, 67, 'left', 1, 39, NULL, '2026-01-03 10:43:17', NULL),
(3089, 199, 66, 'left', 1, 40, NULL, '2026-01-03 10:43:17', NULL),
(3090, 199, 65, 'left', 1, 41, NULL, '2026-01-03 10:43:17', NULL),
(3091, 199, 64, 'left', 1, 42, NULL, '2026-01-03 10:43:17', NULL),
(3092, 199, 63, 'left', 1, 43, NULL, '2026-01-03 10:43:17', NULL),
(3093, 199, 62, 'left', 1, 44, NULL, '2026-01-03 10:43:17', NULL),
(3094, 199, 38, 'left', 1, 45, NULL, '2026-01-03 10:43:17', NULL),
(3095, 199, 37, 'left', 1, 46, NULL, '2026-01-03 10:43:17', NULL),
(3096, 199, 36, 'left', 1, 47, NULL, '2026-01-03 10:43:17', NULL),
(3097, 199, 26, 'left', 1, 48, NULL, '2026-01-03 10:43:17', NULL),
(3098, 199, 24, 'right', 1, 49, NULL, '2026-01-03 10:43:17', NULL),
(3099, 199, 23, 'left', 1, 50, NULL, '2026-01-03 10:43:17', NULL),
(3100, 199, 22, 'left', 1, 51, NULL, '2026-01-03 10:43:17', NULL),
(3101, 199, 19, 'left', 1, 52, NULL, '2026-01-03 10:43:17', NULL),
(3102, 200, 199, 'left', 1, 1, NULL, '2026-01-03 10:46:23', NULL),
(3103, 200, 198, 'left', 1, 2, NULL, '2026-01-03 10:46:23', NULL),
(3104, 200, 94, 'left', 1, 3, NULL, '2026-01-03 10:46:23', NULL),
(3105, 200, 93, 'left', 1, 4, NULL, '2026-01-03 10:46:23', NULL),
(3106, 200, 92, 'left', 1, 5, NULL, '2026-01-03 10:46:23', NULL),
(3107, 200, 114, 'left', 1, 6, NULL, '2026-01-03 10:46:23', NULL),
(3108, 200, 91, 'left', 1, 7, NULL, '2026-01-03 10:46:23', NULL),
(3109, 200, 90, 'left', 1, 8, NULL, '2026-01-03 10:46:23', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(3110, 200, 89, 'left', 1, 9, NULL, '2026-01-03 10:46:23', NULL),
(3111, 200, 113, 'left', 1, 10, NULL, '2026-01-03 10:46:23', NULL),
(3112, 200, 112, 'left', 1, 11, NULL, '2026-01-03 10:46:23', NULL),
(3113, 200, 111, 'left', 1, 12, NULL, '2026-01-03 10:46:23', NULL),
(3114, 200, 110, 'left', 1, 13, NULL, '2026-01-03 10:46:23', NULL),
(3115, 200, 109, 'left', 1, 14, NULL, '2026-01-03 10:46:23', NULL),
(3116, 200, 108, 'left', 1, 15, NULL, '2026-01-03 10:46:23', NULL),
(3117, 200, 107, 'left', 1, 16, NULL, '2026-01-03 10:46:23', NULL),
(3118, 200, 106, 'left', 1, 17, NULL, '2026-01-03 10:46:23', NULL),
(3119, 200, 105, 'left', 1, 18, NULL, '2026-01-03 10:46:23', NULL),
(3120, 200, 88, 'left', 1, 19, NULL, '2026-01-03 10:46:23', NULL),
(3121, 200, 87, 'left', 1, 20, NULL, '2026-01-03 10:46:23', NULL),
(3122, 200, 86, 'left', 1, 21, NULL, '2026-01-03 10:46:23', NULL),
(3123, 200, 85, 'left', 1, 22, NULL, '2026-01-03 10:46:23', NULL),
(3124, 200, 84, 'left', 1, 23, NULL, '2026-01-03 10:46:23', NULL),
(3125, 200, 83, 'left', 1, 24, NULL, '2026-01-03 10:46:23', NULL),
(3126, 200, 82, 'left', 1, 25, NULL, '2026-01-03 10:46:23', NULL),
(3127, 200, 81, 'left', 1, 26, NULL, '2026-01-03 10:46:23', NULL),
(3128, 200, 80, 'left', 1, 27, NULL, '2026-01-03 10:46:23', NULL),
(3129, 200, 79, 'left', 1, 28, NULL, '2026-01-03 10:46:23', NULL),
(3130, 200, 78, 'left', 1, 29, NULL, '2026-01-03 10:46:23', NULL),
(3131, 200, 77, 'left', 1, 30, NULL, '2026-01-03 10:46:23', NULL),
(3132, 200, 76, 'left', 1, 31, NULL, '2026-01-03 10:46:23', NULL),
(3133, 200, 75, 'left', 1, 32, NULL, '2026-01-03 10:46:23', NULL),
(3134, 200, 74, 'left', 1, 33, NULL, '2026-01-03 10:46:23', NULL),
(3135, 200, 73, 'left', 1, 34, NULL, '2026-01-03 10:46:23', NULL),
(3136, 200, 72, 'left', 1, 35, NULL, '2026-01-03 10:46:23', NULL),
(3137, 200, 71, 'left', 1, 36, NULL, '2026-01-03 10:46:23', NULL),
(3138, 200, 70, 'left', 1, 37, NULL, '2026-01-03 10:46:23', NULL),
(3139, 200, 69, 'left', 1, 38, NULL, '2026-01-03 10:46:23', NULL),
(3140, 200, 68, 'left', 1, 39, NULL, '2026-01-03 10:46:23', NULL),
(3141, 200, 67, 'left', 1, 40, NULL, '2026-01-03 10:46:23', NULL),
(3142, 200, 66, 'left', 1, 41, NULL, '2026-01-03 10:46:23', NULL),
(3143, 200, 65, 'left', 1, 42, NULL, '2026-01-03 10:46:23', NULL),
(3144, 200, 64, 'left', 1, 43, NULL, '2026-01-03 10:46:23', NULL),
(3145, 200, 63, 'left', 1, 44, NULL, '2026-01-03 10:46:23', NULL),
(3146, 200, 62, 'left', 1, 45, NULL, '2026-01-03 10:46:23', NULL),
(3147, 200, 38, 'left', 1, 46, NULL, '2026-01-03 10:46:23', NULL),
(3148, 200, 37, 'left', 1, 47, NULL, '2026-01-03 10:46:23', NULL),
(3149, 200, 36, 'left', 1, 48, NULL, '2026-01-03 10:46:23', NULL),
(3150, 200, 26, 'left', 1, 49, NULL, '2026-01-03 10:46:23', NULL),
(3151, 200, 24, 'right', 1, 50, NULL, '2026-01-03 10:46:23', NULL),
(3152, 200, 23, 'left', 1, 51, NULL, '2026-01-03 10:46:23', NULL),
(3153, 200, 22, 'left', 1, 52, NULL, '2026-01-03 10:46:23', NULL),
(3154, 200, 19, 'left', 1, 53, NULL, '2026-01-03 10:46:23', NULL),
(3155, 201, 199, 'right', 1, 1, NULL, '2026-01-03 10:49:56', NULL),
(3156, 201, 198, 'left', 1, 2, NULL, '2026-01-03 10:49:56', NULL),
(3157, 201, 94, 'left', 1, 3, NULL, '2026-01-03 10:49:56', NULL),
(3158, 201, 93, 'left', 1, 4, NULL, '2026-01-03 10:49:56', NULL),
(3159, 201, 92, 'left', 1, 5, NULL, '2026-01-03 10:49:56', NULL),
(3160, 201, 114, 'left', 1, 6, NULL, '2026-01-03 10:49:56', NULL),
(3161, 201, 91, 'left', 1, 7, NULL, '2026-01-03 10:49:56', NULL),
(3162, 201, 90, 'left', 1, 8, NULL, '2026-01-03 10:49:56', NULL),
(3163, 201, 89, 'left', 1, 9, NULL, '2026-01-03 10:49:56', NULL),
(3164, 201, 113, 'left', 1, 10, NULL, '2026-01-03 10:49:56', NULL),
(3165, 201, 112, 'left', 1, 11, NULL, '2026-01-03 10:49:56', NULL),
(3166, 201, 111, 'left', 1, 12, NULL, '2026-01-03 10:49:56', NULL),
(3167, 201, 110, 'left', 1, 13, NULL, '2026-01-03 10:49:56', NULL),
(3168, 201, 109, 'left', 1, 14, NULL, '2026-01-03 10:49:56', NULL),
(3169, 201, 108, 'left', 1, 15, NULL, '2026-01-03 10:49:56', NULL),
(3170, 201, 107, 'left', 1, 16, NULL, '2026-01-03 10:49:56', NULL),
(3171, 201, 106, 'left', 1, 17, NULL, '2026-01-03 10:49:56', NULL),
(3172, 201, 105, 'left', 1, 18, NULL, '2026-01-03 10:49:56', NULL),
(3173, 201, 88, 'left', 1, 19, NULL, '2026-01-03 10:49:56', NULL),
(3174, 201, 87, 'left', 1, 20, NULL, '2026-01-03 10:49:56', NULL),
(3175, 201, 86, 'left', 1, 21, NULL, '2026-01-03 10:49:56', NULL),
(3176, 201, 85, 'left', 1, 22, NULL, '2026-01-03 10:49:56', NULL),
(3177, 201, 84, 'left', 1, 23, NULL, '2026-01-03 10:49:56', NULL),
(3178, 201, 83, 'left', 1, 24, NULL, '2026-01-03 10:49:56', NULL),
(3179, 201, 82, 'left', 1, 25, NULL, '2026-01-03 10:49:56', NULL),
(3180, 201, 81, 'left', 1, 26, NULL, '2026-01-03 10:49:56', NULL),
(3181, 201, 80, 'left', 1, 27, NULL, '2026-01-03 10:49:56', NULL),
(3182, 201, 79, 'left', 1, 28, NULL, '2026-01-03 10:49:56', NULL),
(3183, 201, 78, 'left', 1, 29, NULL, '2026-01-03 10:49:56', NULL),
(3184, 201, 77, 'left', 1, 30, NULL, '2026-01-03 10:49:56', NULL),
(3185, 201, 76, 'left', 1, 31, NULL, '2026-01-03 10:49:56', NULL),
(3186, 201, 75, 'left', 1, 32, NULL, '2026-01-03 10:49:56', NULL),
(3187, 201, 74, 'left', 1, 33, NULL, '2026-01-03 10:49:56', NULL),
(3188, 201, 73, 'left', 1, 34, NULL, '2026-01-03 10:49:56', NULL),
(3189, 201, 72, 'left', 1, 35, NULL, '2026-01-03 10:49:56', NULL),
(3190, 201, 71, 'left', 1, 36, NULL, '2026-01-03 10:49:56', NULL),
(3191, 201, 70, 'left', 1, 37, NULL, '2026-01-03 10:49:56', NULL),
(3192, 201, 69, 'left', 1, 38, NULL, '2026-01-03 10:49:56', NULL),
(3193, 201, 68, 'left', 1, 39, NULL, '2026-01-03 10:49:56', NULL),
(3194, 201, 67, 'left', 1, 40, NULL, '2026-01-03 10:49:56', NULL),
(3195, 201, 66, 'left', 1, 41, NULL, '2026-01-03 10:49:56', NULL),
(3196, 201, 65, 'left', 1, 42, NULL, '2026-01-03 10:49:56', NULL),
(3197, 201, 64, 'left', 1, 43, NULL, '2026-01-03 10:49:56', NULL),
(3198, 201, 63, 'left', 1, 44, NULL, '2026-01-03 10:49:56', NULL),
(3199, 201, 62, 'left', 1, 45, NULL, '2026-01-03 10:49:56', NULL),
(3200, 201, 38, 'left', 1, 46, NULL, '2026-01-03 10:49:56', NULL),
(3201, 201, 37, 'left', 1, 47, NULL, '2026-01-03 10:49:56', NULL),
(3202, 201, 36, 'left', 1, 48, NULL, '2026-01-03 10:49:56', NULL),
(3203, 201, 26, 'left', 1, 49, NULL, '2026-01-03 10:49:56', NULL),
(3204, 201, 24, 'right', 1, 50, NULL, '2026-01-03 10:49:56', NULL),
(3205, 201, 23, 'left', 1, 51, NULL, '2026-01-03 10:49:56', NULL),
(3206, 201, 22, 'left', 1, 52, NULL, '2026-01-03 10:49:56', NULL),
(3207, 201, 19, 'left', 1, 53, NULL, '2026-01-03 10:49:56', NULL),
(3208, 202, 198, 'right', 1, 1, NULL, '2026-01-03 10:59:27', NULL),
(3209, 202, 94, 'left', 1, 2, NULL, '2026-01-03 10:59:27', NULL),
(3210, 202, 93, 'left', 1, 3, NULL, '2026-01-03 10:59:27', NULL),
(3211, 202, 92, 'left', 1, 4, NULL, '2026-01-03 10:59:27', NULL),
(3212, 202, 114, 'left', 1, 5, NULL, '2026-01-03 10:59:27', NULL),
(3213, 202, 91, 'left', 1, 6, NULL, '2026-01-03 10:59:27', NULL),
(3214, 202, 90, 'left', 1, 7, NULL, '2026-01-03 10:59:27', NULL),
(3215, 202, 89, 'left', 1, 8, NULL, '2026-01-03 10:59:27', NULL),
(3216, 202, 113, 'left', 1, 9, NULL, '2026-01-03 10:59:27', NULL),
(3217, 202, 112, 'left', 1, 10, NULL, '2026-01-03 10:59:27', NULL),
(3218, 202, 111, 'left', 1, 11, NULL, '2026-01-03 10:59:27', NULL),
(3219, 202, 110, 'left', 1, 12, NULL, '2026-01-03 10:59:27', NULL),
(3220, 202, 109, 'left', 1, 13, NULL, '2026-01-03 10:59:27', NULL),
(3221, 202, 108, 'left', 1, 14, NULL, '2026-01-03 10:59:27', NULL),
(3222, 202, 107, 'left', 1, 15, NULL, '2026-01-03 10:59:27', NULL),
(3223, 202, 106, 'left', 1, 16, NULL, '2026-01-03 10:59:27', NULL),
(3224, 202, 105, 'left', 1, 17, NULL, '2026-01-03 10:59:27', NULL),
(3225, 202, 88, 'left', 1, 18, NULL, '2026-01-03 10:59:27', NULL),
(3226, 202, 87, 'left', 1, 19, NULL, '2026-01-03 10:59:27', NULL),
(3227, 202, 86, 'left', 1, 20, NULL, '2026-01-03 10:59:27', NULL),
(3228, 202, 85, 'left', 1, 21, NULL, '2026-01-03 10:59:27', NULL),
(3229, 202, 84, 'left', 1, 22, NULL, '2026-01-03 10:59:27', NULL),
(3230, 202, 83, 'left', 1, 23, NULL, '2026-01-03 10:59:27', NULL),
(3231, 202, 82, 'left', 1, 24, NULL, '2026-01-03 10:59:27', NULL),
(3232, 202, 81, 'left', 1, 25, NULL, '2026-01-03 10:59:27', NULL),
(3233, 202, 80, 'left', 1, 26, NULL, '2026-01-03 10:59:27', NULL),
(3234, 202, 79, 'left', 1, 27, NULL, '2026-01-03 10:59:27', NULL),
(3235, 202, 78, 'left', 1, 28, NULL, '2026-01-03 10:59:27', NULL),
(3236, 202, 77, 'left', 1, 29, NULL, '2026-01-03 10:59:27', NULL),
(3237, 202, 76, 'left', 1, 30, NULL, '2026-01-03 10:59:27', NULL),
(3238, 202, 75, 'left', 1, 31, NULL, '2026-01-03 10:59:27', NULL),
(3239, 202, 74, 'left', 1, 32, NULL, '2026-01-03 10:59:27', NULL),
(3240, 202, 73, 'left', 1, 33, NULL, '2026-01-03 10:59:27', NULL),
(3241, 202, 72, 'left', 1, 34, NULL, '2026-01-03 10:59:27', NULL),
(3242, 202, 71, 'left', 1, 35, NULL, '2026-01-03 10:59:27', NULL),
(3243, 202, 70, 'left', 1, 36, NULL, '2026-01-03 10:59:27', NULL),
(3244, 202, 69, 'left', 1, 37, NULL, '2026-01-03 10:59:27', NULL),
(3245, 202, 68, 'left', 1, 38, NULL, '2026-01-03 10:59:27', NULL),
(3246, 202, 67, 'left', 1, 39, NULL, '2026-01-03 10:59:27', NULL),
(3247, 202, 66, 'left', 1, 40, NULL, '2026-01-03 10:59:27', NULL),
(3248, 202, 65, 'left', 1, 41, NULL, '2026-01-03 10:59:27', NULL),
(3249, 202, 64, 'left', 1, 42, NULL, '2026-01-03 10:59:27', NULL),
(3250, 202, 63, 'left', 1, 43, NULL, '2026-01-03 10:59:27', NULL),
(3251, 202, 62, 'left', 1, 44, NULL, '2026-01-03 10:59:27', NULL),
(3252, 202, 38, 'left', 1, 45, NULL, '2026-01-03 10:59:27', NULL),
(3253, 202, 37, 'left', 1, 46, NULL, '2026-01-03 10:59:27', NULL),
(3254, 202, 36, 'left', 1, 47, NULL, '2026-01-03 10:59:27', NULL),
(3255, 202, 26, 'left', 1, 48, NULL, '2026-01-03 10:59:27', NULL),
(3256, 202, 24, 'right', 1, 49, NULL, '2026-01-03 10:59:27', NULL),
(3257, 202, 23, 'left', 1, 50, NULL, '2026-01-03 10:59:27', NULL),
(3258, 202, 22, 'left', 1, 51, NULL, '2026-01-03 10:59:27', NULL),
(3259, 202, 19, 'left', 1, 52, NULL, '2026-01-03 10:59:27', NULL),
(3260, 204, 202, 'left', 1, 1, NULL, '2026-01-03 11:06:37', NULL),
(3261, 204, 198, 'right', 1, 2, NULL, '2026-01-03 11:06:37', NULL),
(3262, 204, 94, 'left', 1, 3, NULL, '2026-01-03 11:06:37', NULL),
(3263, 204, 93, 'left', 1, 4, NULL, '2026-01-03 11:06:37', NULL),
(3264, 204, 92, 'left', 1, 5, NULL, '2026-01-03 11:06:37', NULL),
(3265, 204, 114, 'left', 1, 6, NULL, '2026-01-03 11:06:37', NULL),
(3266, 204, 91, 'left', 1, 7, NULL, '2026-01-03 11:06:37', NULL),
(3267, 204, 90, 'left', 1, 8, NULL, '2026-01-03 11:06:37', NULL),
(3268, 204, 89, 'left', 1, 9, NULL, '2026-01-03 11:06:37', NULL),
(3269, 204, 113, 'left', 1, 10, NULL, '2026-01-03 11:06:37', NULL),
(3270, 204, 112, 'left', 1, 11, NULL, '2026-01-03 11:06:37', NULL),
(3271, 204, 111, 'left', 1, 12, NULL, '2026-01-03 11:06:37', NULL),
(3272, 204, 110, 'left', 1, 13, NULL, '2026-01-03 11:06:37', NULL),
(3273, 204, 109, 'left', 1, 14, NULL, '2026-01-03 11:06:37', NULL),
(3274, 204, 108, 'left', 1, 15, NULL, '2026-01-03 11:06:37', NULL),
(3275, 204, 107, 'left', 1, 16, NULL, '2026-01-03 11:06:37', NULL),
(3276, 204, 106, 'left', 1, 17, NULL, '2026-01-03 11:06:37', NULL),
(3277, 204, 105, 'left', 1, 18, NULL, '2026-01-03 11:06:37', NULL),
(3278, 204, 88, 'left', 1, 19, NULL, '2026-01-03 11:06:37', NULL),
(3279, 204, 87, 'left', 1, 20, NULL, '2026-01-03 11:06:37', NULL),
(3280, 204, 86, 'left', 1, 21, NULL, '2026-01-03 11:06:37', NULL),
(3281, 204, 85, 'left', 1, 22, NULL, '2026-01-03 11:06:37', NULL),
(3282, 204, 84, 'left', 1, 23, NULL, '2026-01-03 11:06:37', NULL),
(3283, 204, 83, 'left', 1, 24, NULL, '2026-01-03 11:06:37', NULL),
(3284, 204, 82, 'left', 1, 25, NULL, '2026-01-03 11:06:37', NULL),
(3285, 204, 81, 'left', 1, 26, NULL, '2026-01-03 11:06:37', NULL),
(3286, 204, 80, 'left', 1, 27, NULL, '2026-01-03 11:06:37', NULL),
(3287, 204, 79, 'left', 1, 28, NULL, '2026-01-03 11:06:37', NULL),
(3288, 204, 78, 'left', 1, 29, NULL, '2026-01-03 11:06:37', NULL),
(3289, 204, 77, 'left', 1, 30, NULL, '2026-01-03 11:06:37', NULL),
(3290, 204, 76, 'left', 1, 31, NULL, '2026-01-03 11:06:37', NULL),
(3291, 204, 75, 'left', 1, 32, NULL, '2026-01-03 11:06:37', NULL),
(3292, 204, 74, 'left', 1, 33, NULL, '2026-01-03 11:06:37', NULL),
(3293, 204, 73, 'left', 1, 34, NULL, '2026-01-03 11:06:37', NULL),
(3294, 204, 72, 'left', 1, 35, NULL, '2026-01-03 11:06:37', NULL),
(3295, 204, 71, 'left', 1, 36, NULL, '2026-01-03 11:06:37', NULL),
(3296, 204, 70, 'left', 1, 37, NULL, '2026-01-03 11:06:37', NULL),
(3297, 204, 69, 'left', 1, 38, NULL, '2026-01-03 11:06:37', NULL),
(3298, 204, 68, 'left', 1, 39, NULL, '2026-01-03 11:06:37', NULL),
(3299, 204, 67, 'left', 1, 40, NULL, '2026-01-03 11:06:37', NULL),
(3300, 204, 66, 'left', 1, 41, NULL, '2026-01-03 11:06:37', NULL),
(3301, 204, 65, 'left', 1, 42, NULL, '2026-01-03 11:06:37', NULL),
(3302, 204, 64, 'left', 1, 43, NULL, '2026-01-03 11:06:37', NULL),
(3303, 204, 63, 'left', 1, 44, NULL, '2026-01-03 11:06:37', NULL),
(3304, 204, 62, 'left', 1, 45, NULL, '2026-01-03 11:06:37', NULL),
(3305, 204, 38, 'left', 1, 46, NULL, '2026-01-03 11:06:37', NULL),
(3306, 204, 37, 'left', 1, 47, NULL, '2026-01-03 11:06:37', NULL),
(3307, 204, 36, 'left', 1, 48, NULL, '2026-01-03 11:06:37', NULL),
(3308, 204, 26, 'left', 1, 49, NULL, '2026-01-03 11:06:37', NULL),
(3309, 204, 24, 'right', 1, 50, NULL, '2026-01-03 11:06:37', NULL),
(3310, 204, 23, 'left', 1, 51, NULL, '2026-01-03 11:06:37', NULL),
(3311, 204, 22, 'left', 1, 52, NULL, '2026-01-03 11:06:37', NULL),
(3312, 204, 19, 'left', 1, 53, NULL, '2026-01-03 11:06:37', NULL),
(3313, 203, 202, 'right', 1, 1, NULL, '2026-01-03 11:06:44', NULL),
(3314, 203, 198, 'right', 1, 2, NULL, '2026-01-03 11:06:44', NULL),
(3315, 203, 94, 'left', 1, 3, NULL, '2026-01-03 11:06:44', NULL),
(3316, 203, 93, 'left', 1, 4, NULL, '2026-01-03 11:06:44', NULL),
(3317, 203, 92, 'left', 1, 5, NULL, '2026-01-03 11:06:44', NULL),
(3318, 203, 114, 'left', 1, 6, NULL, '2026-01-03 11:06:44', NULL),
(3319, 203, 91, 'left', 1, 7, NULL, '2026-01-03 11:06:44', NULL),
(3320, 203, 90, 'left', 1, 8, NULL, '2026-01-03 11:06:44', NULL),
(3321, 203, 89, 'left', 1, 9, NULL, '2026-01-03 11:06:44', NULL),
(3322, 203, 113, 'left', 1, 10, NULL, '2026-01-03 11:06:44', NULL),
(3323, 203, 112, 'left', 1, 11, NULL, '2026-01-03 11:06:44', NULL),
(3324, 203, 111, 'left', 1, 12, NULL, '2026-01-03 11:06:44', NULL),
(3325, 203, 110, 'left', 1, 13, NULL, '2026-01-03 11:06:44', NULL),
(3326, 203, 109, 'left', 1, 14, NULL, '2026-01-03 11:06:44', NULL),
(3327, 203, 108, 'left', 1, 15, NULL, '2026-01-03 11:06:44', NULL),
(3328, 203, 107, 'left', 1, 16, NULL, '2026-01-03 11:06:44', NULL),
(3329, 203, 106, 'left', 1, 17, NULL, '2026-01-03 11:06:44', NULL),
(3330, 203, 105, 'left', 1, 18, NULL, '2026-01-03 11:06:44', NULL),
(3331, 203, 88, 'left', 1, 19, NULL, '2026-01-03 11:06:44', NULL),
(3332, 203, 87, 'left', 1, 20, NULL, '2026-01-03 11:06:44', NULL),
(3333, 203, 86, 'left', 1, 21, NULL, '2026-01-03 11:06:44', NULL),
(3334, 203, 85, 'left', 1, 22, NULL, '2026-01-03 11:06:44', NULL),
(3335, 203, 84, 'left', 1, 23, NULL, '2026-01-03 11:06:44', NULL),
(3336, 203, 83, 'left', 1, 24, NULL, '2026-01-03 11:06:44', NULL),
(3337, 203, 82, 'left', 1, 25, NULL, '2026-01-03 11:06:44', NULL),
(3338, 203, 81, 'left', 1, 26, NULL, '2026-01-03 11:06:44', NULL),
(3339, 203, 80, 'left', 1, 27, NULL, '2026-01-03 11:06:44', NULL),
(3340, 203, 79, 'left', 1, 28, NULL, '2026-01-03 11:06:44', NULL),
(3341, 203, 78, 'left', 1, 29, NULL, '2026-01-03 11:06:44', NULL),
(3342, 203, 77, 'left', 1, 30, NULL, '2026-01-03 11:06:44', NULL),
(3343, 203, 76, 'left', 1, 31, NULL, '2026-01-03 11:06:44', NULL),
(3344, 203, 75, 'left', 1, 32, NULL, '2026-01-03 11:06:44', NULL),
(3345, 203, 74, 'left', 1, 33, NULL, '2026-01-03 11:06:44', NULL),
(3346, 203, 73, 'left', 1, 34, NULL, '2026-01-03 11:06:44', NULL),
(3347, 203, 72, 'left', 1, 35, NULL, '2026-01-03 11:06:44', NULL),
(3348, 203, 71, 'left', 1, 36, NULL, '2026-01-03 11:06:44', NULL),
(3349, 203, 70, 'left', 1, 37, NULL, '2026-01-03 11:06:44', NULL),
(3350, 203, 69, 'left', 1, 38, NULL, '2026-01-03 11:06:44', NULL),
(3351, 203, 68, 'left', 1, 39, NULL, '2026-01-03 11:06:44', NULL),
(3352, 203, 67, 'left', 1, 40, NULL, '2026-01-03 11:06:44', NULL),
(3353, 203, 66, 'left', 1, 41, NULL, '2026-01-03 11:06:44', NULL),
(3354, 203, 65, 'left', 1, 42, NULL, '2026-01-03 11:06:44', NULL),
(3355, 203, 64, 'left', 1, 43, NULL, '2026-01-03 11:06:44', NULL),
(3356, 203, 63, 'left', 1, 44, NULL, '2026-01-03 11:06:44', NULL),
(3357, 203, 62, 'left', 1, 45, NULL, '2026-01-03 11:06:44', NULL),
(3358, 203, 38, 'left', 1, 46, NULL, '2026-01-03 11:06:44', NULL),
(3359, 203, 37, 'left', 1, 47, NULL, '2026-01-03 11:06:44', NULL),
(3360, 203, 36, 'left', 1, 48, NULL, '2026-01-03 11:06:44', NULL),
(3361, 203, 26, 'left', 1, 49, NULL, '2026-01-03 11:06:44', NULL),
(3362, 203, 24, 'right', 1, 50, NULL, '2026-01-03 11:06:44', NULL),
(3363, 203, 23, 'left', 1, 51, NULL, '2026-01-03 11:06:44', NULL),
(3364, 203, 22, 'left', 1, 52, NULL, '2026-01-03 11:06:44', NULL),
(3365, 203, 19, 'left', 1, 53, NULL, '2026-01-03 11:06:44', NULL),
(3366, 205, 203, 'right', 1, 1, NULL, '2026-01-03 11:12:07', NULL),
(3367, 205, 202, 'right', 1, 2, NULL, '2026-01-03 11:12:07', NULL),
(3368, 205, 198, 'right', 1, 3, NULL, '2026-01-03 11:12:07', NULL),
(3369, 205, 94, 'left', 1, 4, NULL, '2026-01-03 11:12:07', NULL),
(3370, 205, 93, 'left', 1, 5, NULL, '2026-01-03 11:12:07', NULL),
(3371, 205, 92, 'left', 1, 6, NULL, '2026-01-03 11:12:07', NULL),
(3372, 205, 114, 'left', 1, 7, NULL, '2026-01-03 11:12:07', NULL),
(3373, 205, 91, 'left', 1, 8, NULL, '2026-01-03 11:12:07', NULL),
(3374, 205, 90, 'left', 1, 9, NULL, '2026-01-03 11:12:07', NULL),
(3375, 205, 89, 'left', 1, 10, NULL, '2026-01-03 11:12:07', NULL),
(3376, 205, 113, 'left', 1, 11, NULL, '2026-01-03 11:12:07', NULL),
(3377, 205, 112, 'left', 1, 12, NULL, '2026-01-03 11:12:07', NULL),
(3378, 205, 111, 'left', 1, 13, NULL, '2026-01-03 11:12:07', NULL),
(3379, 205, 110, 'left', 1, 14, NULL, '2026-01-03 11:12:07', NULL),
(3380, 205, 109, 'left', 1, 15, NULL, '2026-01-03 11:12:07', NULL),
(3381, 205, 108, 'left', 1, 16, NULL, '2026-01-03 11:12:07', NULL),
(3382, 205, 107, 'left', 1, 17, NULL, '2026-01-03 11:12:07', NULL),
(3383, 205, 106, 'left', 1, 18, NULL, '2026-01-03 11:12:07', NULL),
(3384, 205, 105, 'left', 1, 19, NULL, '2026-01-03 11:12:07', NULL),
(3385, 205, 88, 'left', 1, 20, NULL, '2026-01-03 11:12:07', NULL),
(3386, 205, 87, 'left', 1, 21, NULL, '2026-01-03 11:12:07', NULL),
(3387, 205, 86, 'left', 1, 22, NULL, '2026-01-03 11:12:07', NULL),
(3388, 205, 85, 'left', 1, 23, NULL, '2026-01-03 11:12:07', NULL),
(3389, 205, 84, 'left', 1, 24, NULL, '2026-01-03 11:12:07', NULL),
(3390, 205, 83, 'left', 1, 25, NULL, '2026-01-03 11:12:07', NULL),
(3391, 205, 82, 'left', 1, 26, NULL, '2026-01-03 11:12:07', NULL),
(3392, 205, 81, 'left', 1, 27, NULL, '2026-01-03 11:12:07', NULL),
(3393, 205, 80, 'left', 1, 28, NULL, '2026-01-03 11:12:07', NULL),
(3394, 205, 79, 'left', 1, 29, NULL, '2026-01-03 11:12:07', NULL),
(3395, 205, 78, 'left', 1, 30, NULL, '2026-01-03 11:12:07', NULL),
(3396, 205, 77, 'left', 1, 31, NULL, '2026-01-03 11:12:07', NULL),
(3397, 205, 76, 'left', 1, 32, NULL, '2026-01-03 11:12:07', NULL),
(3398, 205, 75, 'left', 1, 33, NULL, '2026-01-03 11:12:07', NULL),
(3399, 205, 74, 'left', 1, 34, NULL, '2026-01-03 11:12:07', NULL),
(3400, 205, 73, 'left', 1, 35, NULL, '2026-01-03 11:12:07', NULL),
(3401, 205, 72, 'left', 1, 36, NULL, '2026-01-03 11:12:07', NULL),
(3402, 205, 71, 'left', 1, 37, NULL, '2026-01-03 11:12:07', NULL),
(3403, 205, 70, 'left', 1, 38, NULL, '2026-01-03 11:12:07', NULL),
(3404, 205, 69, 'left', 1, 39, NULL, '2026-01-03 11:12:07', NULL),
(3405, 205, 68, 'left', 1, 40, NULL, '2026-01-03 11:12:07', NULL),
(3406, 205, 67, 'left', 1, 41, NULL, '2026-01-03 11:12:07', NULL),
(3407, 205, 66, 'left', 1, 42, NULL, '2026-01-03 11:12:07', NULL),
(3408, 205, 65, 'left', 1, 43, NULL, '2026-01-03 11:12:07', NULL),
(3409, 205, 64, 'left', 1, 44, NULL, '2026-01-03 11:12:07', NULL),
(3410, 205, 63, 'left', 1, 45, NULL, '2026-01-03 11:12:07', NULL),
(3411, 205, 62, 'left', 1, 46, NULL, '2026-01-03 11:12:07', NULL),
(3412, 205, 38, 'left', 1, 47, NULL, '2026-01-03 11:12:07', NULL),
(3413, 205, 37, 'left', 1, 48, NULL, '2026-01-03 11:12:07', NULL),
(3414, 205, 36, 'left', 1, 49, NULL, '2026-01-03 11:12:07', NULL),
(3415, 205, 26, 'left', 1, 50, NULL, '2026-01-03 11:12:07', NULL),
(3416, 205, 24, 'right', 1, 51, NULL, '2026-01-03 11:12:07', NULL),
(3417, 205, 23, 'left', 1, 52, NULL, '2026-01-03 11:12:07', NULL),
(3418, 205, 22, 'left', 1, 53, NULL, '2026-01-03 11:12:07', NULL),
(3419, 205, 19, 'left', 1, 54, NULL, '2026-01-03 11:12:07', NULL),
(3420, 206, 200, 'right', 1, 1, NULL, '2026-01-03 11:25:06', NULL),
(3421, 206, 199, 'left', 1, 2, NULL, '2026-01-03 11:25:06', NULL),
(3422, 206, 198, 'left', 1, 3, NULL, '2026-01-03 11:25:06', NULL),
(3423, 206, 94, 'left', 1, 4, NULL, '2026-01-03 11:25:06', NULL),
(3424, 206, 93, 'left', 1, 5, NULL, '2026-01-03 11:25:06', NULL),
(3425, 206, 92, 'left', 1, 6, NULL, '2026-01-03 11:25:06', NULL),
(3426, 206, 114, 'left', 1, 7, NULL, '2026-01-03 11:25:06', NULL),
(3427, 206, 91, 'left', 1, 8, NULL, '2026-01-03 11:25:06', NULL),
(3428, 206, 90, 'left', 1, 9, NULL, '2026-01-03 11:25:06', NULL),
(3429, 206, 89, 'left', 1, 10, NULL, '2026-01-03 11:25:06', NULL),
(3430, 206, 113, 'left', 1, 11, NULL, '2026-01-03 11:25:06', NULL),
(3431, 206, 112, 'left', 1, 12, NULL, '2026-01-03 11:25:06', NULL),
(3432, 206, 111, 'left', 1, 13, NULL, '2026-01-03 11:25:06', NULL),
(3433, 206, 110, 'left', 1, 14, NULL, '2026-01-03 11:25:06', NULL),
(3434, 206, 109, 'left', 1, 15, NULL, '2026-01-03 11:25:06', NULL),
(3435, 206, 108, 'left', 1, 16, NULL, '2026-01-03 11:25:06', NULL),
(3436, 206, 107, 'left', 1, 17, NULL, '2026-01-03 11:25:06', NULL),
(3437, 206, 106, 'left', 1, 18, NULL, '2026-01-03 11:25:06', NULL),
(3438, 206, 105, 'left', 1, 19, NULL, '2026-01-03 11:25:06', NULL),
(3439, 206, 88, 'left', 1, 20, NULL, '2026-01-03 11:25:06', NULL),
(3440, 206, 87, 'left', 1, 21, NULL, '2026-01-03 11:25:06', NULL),
(3441, 206, 86, 'left', 1, 22, NULL, '2026-01-03 11:25:06', NULL),
(3442, 206, 85, 'left', 1, 23, NULL, '2026-01-03 11:25:06', NULL),
(3443, 206, 84, 'left', 1, 24, NULL, '2026-01-03 11:25:06', NULL),
(3444, 206, 83, 'left', 1, 25, NULL, '2026-01-03 11:25:06', NULL),
(3445, 206, 82, 'left', 1, 26, NULL, '2026-01-03 11:25:06', NULL),
(3446, 206, 81, 'left', 1, 27, NULL, '2026-01-03 11:25:06', NULL),
(3447, 206, 80, 'left', 1, 28, NULL, '2026-01-03 11:25:06', NULL),
(3448, 206, 79, 'left', 1, 29, NULL, '2026-01-03 11:25:06', NULL),
(3449, 206, 78, 'left', 1, 30, NULL, '2026-01-03 11:25:06', NULL),
(3450, 206, 77, 'left', 1, 31, NULL, '2026-01-03 11:25:06', NULL),
(3451, 206, 76, 'left', 1, 32, NULL, '2026-01-03 11:25:06', NULL),
(3452, 206, 75, 'left', 1, 33, NULL, '2026-01-03 11:25:06', NULL),
(3453, 206, 74, 'left', 1, 34, NULL, '2026-01-03 11:25:06', NULL),
(3454, 206, 73, 'left', 1, 35, NULL, '2026-01-03 11:25:06', NULL),
(3455, 206, 72, 'left', 1, 36, NULL, '2026-01-03 11:25:06', NULL),
(3456, 206, 71, 'left', 1, 37, NULL, '2026-01-03 11:25:06', NULL),
(3457, 206, 70, 'left', 1, 38, NULL, '2026-01-03 11:25:06', NULL),
(3458, 206, 69, 'left', 1, 39, NULL, '2026-01-03 11:25:06', NULL),
(3459, 206, 68, 'left', 1, 40, NULL, '2026-01-03 11:25:06', NULL),
(3460, 206, 67, 'left', 1, 41, NULL, '2026-01-03 11:25:06', NULL),
(3461, 206, 66, 'left', 1, 42, NULL, '2026-01-03 11:25:06', NULL),
(3462, 206, 65, 'left', 1, 43, NULL, '2026-01-03 11:25:06', NULL),
(3463, 206, 64, 'left', 1, 44, NULL, '2026-01-03 11:25:06', NULL),
(3464, 206, 63, 'left', 1, 45, NULL, '2026-01-03 11:25:06', NULL),
(3465, 206, 62, 'left', 1, 46, NULL, '2026-01-03 11:25:06', NULL),
(3466, 206, 38, 'left', 1, 47, NULL, '2026-01-03 11:25:06', NULL),
(3467, 206, 37, 'left', 1, 48, NULL, '2026-01-03 11:25:06', NULL),
(3468, 206, 36, 'left', 1, 49, NULL, '2026-01-03 11:25:06', NULL),
(3469, 206, 26, 'left', 1, 50, NULL, '2026-01-03 11:25:06', NULL),
(3470, 206, 24, 'right', 1, 51, NULL, '2026-01-03 11:25:06', NULL),
(3471, 206, 23, 'left', 1, 52, NULL, '2026-01-03 11:25:06', NULL),
(3472, 206, 22, 'left', 1, 53, NULL, '2026-01-03 11:25:06', NULL),
(3473, 206, 19, 'left', 1, 54, NULL, '2026-01-03 11:25:06', NULL),
(3474, 207, 200, 'left', 1, 1, NULL, '2026-01-03 11:36:42', NULL),
(3475, 207, 199, 'left', 1, 2, NULL, '2026-01-03 11:36:42', NULL),
(3476, 207, 198, 'left', 1, 3, NULL, '2026-01-03 11:36:42', NULL),
(3477, 207, 94, 'left', 1, 4, NULL, '2026-01-03 11:36:42', NULL),
(3478, 207, 93, 'left', 1, 5, NULL, '2026-01-03 11:36:42', NULL),
(3479, 207, 92, 'left', 1, 6, NULL, '2026-01-03 11:36:42', NULL),
(3480, 207, 114, 'left', 1, 7, NULL, '2026-01-03 11:36:42', NULL),
(3481, 207, 91, 'left', 1, 8, NULL, '2026-01-03 11:36:42', NULL),
(3482, 207, 90, 'left', 1, 9, NULL, '2026-01-03 11:36:42', NULL),
(3483, 207, 89, 'left', 1, 10, NULL, '2026-01-03 11:36:42', NULL),
(3484, 207, 113, 'left', 1, 11, NULL, '2026-01-03 11:36:42', NULL),
(3485, 207, 112, 'left', 1, 12, NULL, '2026-01-03 11:36:42', NULL),
(3486, 207, 111, 'left', 1, 13, NULL, '2026-01-03 11:36:42', NULL),
(3487, 207, 110, 'left', 1, 14, NULL, '2026-01-03 11:36:42', NULL),
(3488, 207, 109, 'left', 1, 15, NULL, '2026-01-03 11:36:42', NULL),
(3489, 207, 108, 'left', 1, 16, NULL, '2026-01-03 11:36:42', NULL),
(3490, 207, 107, 'left', 1, 17, NULL, '2026-01-03 11:36:42', NULL),
(3491, 207, 106, 'left', 1, 18, NULL, '2026-01-03 11:36:42', NULL),
(3492, 207, 105, 'left', 1, 19, NULL, '2026-01-03 11:36:42', NULL),
(3493, 207, 88, 'left', 1, 20, NULL, '2026-01-03 11:36:42', NULL),
(3494, 207, 87, 'left', 1, 21, NULL, '2026-01-03 11:36:42', NULL),
(3495, 207, 86, 'left', 1, 22, NULL, '2026-01-03 11:36:42', NULL),
(3496, 207, 85, 'left', 1, 23, NULL, '2026-01-03 11:36:42', NULL),
(3497, 207, 84, 'left', 1, 24, NULL, '2026-01-03 11:36:42', NULL),
(3498, 207, 83, 'left', 1, 25, NULL, '2026-01-03 11:36:42', NULL),
(3499, 207, 82, 'left', 1, 26, NULL, '2026-01-03 11:36:42', NULL),
(3500, 207, 81, 'left', 1, 27, NULL, '2026-01-03 11:36:42', NULL),
(3501, 207, 80, 'left', 1, 28, NULL, '2026-01-03 11:36:42', NULL),
(3502, 207, 79, 'left', 1, 29, NULL, '2026-01-03 11:36:42', NULL),
(3503, 207, 78, 'left', 1, 30, NULL, '2026-01-03 11:36:42', NULL),
(3504, 207, 77, 'left', 1, 31, NULL, '2026-01-03 11:36:42', NULL),
(3505, 207, 76, 'left', 1, 32, NULL, '2026-01-03 11:36:42', NULL),
(3506, 207, 75, 'left', 1, 33, NULL, '2026-01-03 11:36:42', NULL),
(3507, 207, 74, 'left', 1, 34, NULL, '2026-01-03 11:36:42', NULL),
(3508, 207, 73, 'left', 1, 35, NULL, '2026-01-03 11:36:42', NULL),
(3509, 207, 72, 'left', 1, 36, NULL, '2026-01-03 11:36:42', NULL),
(3510, 207, 71, 'left', 1, 37, NULL, '2026-01-03 11:36:42', NULL),
(3511, 207, 70, 'left', 1, 38, NULL, '2026-01-03 11:36:42', NULL),
(3512, 207, 69, 'left', 1, 39, NULL, '2026-01-03 11:36:42', NULL),
(3513, 207, 68, 'left', 1, 40, NULL, '2026-01-03 11:36:42', NULL),
(3514, 207, 67, 'left', 1, 41, NULL, '2026-01-03 11:36:42', NULL),
(3515, 207, 66, 'left', 1, 42, NULL, '2026-01-03 11:36:42', NULL),
(3516, 207, 65, 'left', 1, 43, NULL, '2026-01-03 11:36:42', NULL),
(3517, 207, 64, 'left', 1, 44, NULL, '2026-01-03 11:36:42', NULL),
(3518, 207, 63, 'left', 1, 45, NULL, '2026-01-03 11:36:42', NULL),
(3519, 207, 62, 'left', 1, 46, NULL, '2026-01-03 11:36:42', NULL),
(3520, 207, 38, 'left', 1, 47, NULL, '2026-01-03 11:36:42', NULL),
(3521, 207, 37, 'left', 1, 48, NULL, '2026-01-03 11:36:42', NULL),
(3522, 207, 36, 'left', 1, 49, NULL, '2026-01-03 11:36:42', NULL),
(3523, 207, 26, 'left', 1, 50, NULL, '2026-01-03 11:36:42', NULL),
(3524, 207, 24, 'right', 1, 51, NULL, '2026-01-03 11:36:42', NULL),
(3525, 207, 23, 'left', 1, 52, NULL, '2026-01-03 11:36:42', NULL),
(3526, 207, 22, 'left', 1, 53, NULL, '2026-01-03 11:36:42', NULL),
(3527, 207, 19, 'left', 1, 54, NULL, '2026-01-03 11:36:42', NULL),
(3528, 208, 207, 'left', 1, 1, NULL, '2026-01-03 11:46:58', NULL),
(3529, 208, 200, 'left', 1, 2, NULL, '2026-01-03 11:46:58', NULL),
(3530, 208, 199, 'left', 1, 3, NULL, '2026-01-03 11:46:58', NULL),
(3531, 208, 198, 'left', 1, 4, NULL, '2026-01-03 11:46:58', NULL),
(3532, 208, 94, 'left', 1, 5, NULL, '2026-01-03 11:46:58', NULL),
(3533, 208, 93, 'left', 1, 6, NULL, '2026-01-03 11:46:58', NULL),
(3534, 208, 92, 'left', 1, 7, NULL, '2026-01-03 11:46:58', NULL),
(3535, 208, 114, 'left', 1, 8, NULL, '2026-01-03 11:46:58', NULL),
(3536, 208, 91, 'left', 1, 9, NULL, '2026-01-03 11:46:58', NULL),
(3537, 208, 90, 'left', 1, 10, NULL, '2026-01-03 11:46:58', NULL),
(3538, 208, 89, 'left', 1, 11, NULL, '2026-01-03 11:46:58', NULL),
(3539, 208, 113, 'left', 1, 12, NULL, '2026-01-03 11:46:58', NULL),
(3540, 208, 112, 'left', 1, 13, NULL, '2026-01-03 11:46:58', NULL),
(3541, 208, 111, 'left', 1, 14, NULL, '2026-01-03 11:46:58', NULL),
(3542, 208, 110, 'left', 1, 15, NULL, '2026-01-03 11:46:58', NULL),
(3543, 208, 109, 'left', 1, 16, NULL, '2026-01-03 11:46:58', NULL),
(3544, 208, 108, 'left', 1, 17, NULL, '2026-01-03 11:46:58', NULL),
(3545, 208, 107, 'left', 1, 18, NULL, '2026-01-03 11:46:58', NULL),
(3546, 208, 106, 'left', 1, 19, NULL, '2026-01-03 11:46:58', NULL),
(3547, 208, 105, 'left', 1, 20, NULL, '2026-01-03 11:46:58', NULL),
(3548, 208, 88, 'left', 1, 21, NULL, '2026-01-03 11:46:58', NULL),
(3549, 208, 87, 'left', 1, 22, NULL, '2026-01-03 11:46:58', NULL),
(3550, 208, 86, 'left', 1, 23, NULL, '2026-01-03 11:46:58', NULL),
(3551, 208, 85, 'left', 1, 24, NULL, '2026-01-03 11:46:58', NULL),
(3552, 208, 84, 'left', 1, 25, NULL, '2026-01-03 11:46:58', NULL),
(3553, 208, 83, 'left', 1, 26, NULL, '2026-01-03 11:46:58', NULL),
(3554, 208, 82, 'left', 1, 27, NULL, '2026-01-03 11:46:58', NULL),
(3555, 208, 81, 'left', 1, 28, NULL, '2026-01-03 11:46:58', NULL),
(3556, 208, 80, 'left', 1, 29, NULL, '2026-01-03 11:46:58', NULL),
(3557, 208, 79, 'left', 1, 30, NULL, '2026-01-03 11:46:58', NULL),
(3558, 208, 78, 'left', 1, 31, NULL, '2026-01-03 11:46:58', NULL),
(3559, 208, 77, 'left', 1, 32, NULL, '2026-01-03 11:46:58', NULL),
(3560, 208, 76, 'left', 1, 33, NULL, '2026-01-03 11:46:58', NULL),
(3561, 208, 75, 'left', 1, 34, NULL, '2026-01-03 11:46:58', NULL),
(3562, 208, 74, 'left', 1, 35, NULL, '2026-01-03 11:46:58', NULL),
(3563, 208, 73, 'left', 1, 36, NULL, '2026-01-03 11:46:58', NULL),
(3564, 208, 72, 'left', 1, 37, NULL, '2026-01-03 11:46:58', NULL),
(3565, 208, 71, 'left', 1, 38, NULL, '2026-01-03 11:46:58', NULL),
(3566, 208, 70, 'left', 1, 39, NULL, '2026-01-03 11:46:58', NULL),
(3567, 208, 69, 'left', 1, 40, NULL, '2026-01-03 11:46:58', NULL),
(3568, 208, 68, 'left', 1, 41, NULL, '2026-01-03 11:46:58', NULL),
(3569, 208, 67, 'left', 1, 42, NULL, '2026-01-03 11:46:58', NULL),
(3570, 208, 66, 'left', 1, 43, NULL, '2026-01-03 11:46:58', NULL),
(3571, 208, 65, 'left', 1, 44, NULL, '2026-01-03 11:46:58', NULL),
(3572, 208, 64, 'left', 1, 45, NULL, '2026-01-03 11:46:58', NULL),
(3573, 208, 63, 'left', 1, 46, NULL, '2026-01-03 11:46:58', NULL),
(3574, 208, 62, 'left', 1, 47, NULL, '2026-01-03 11:46:58', NULL),
(3575, 208, 38, 'left', 1, 48, NULL, '2026-01-03 11:46:58', NULL),
(3576, 208, 37, 'left', 1, 49, NULL, '2026-01-03 11:46:58', NULL),
(3577, 208, 36, 'left', 1, 50, NULL, '2026-01-03 11:46:58', NULL),
(3578, 208, 26, 'left', 1, 51, NULL, '2026-01-03 11:46:58', NULL),
(3579, 208, 24, 'right', 1, 52, NULL, '2026-01-03 11:46:58', NULL),
(3580, 208, 23, 'left', 1, 53, NULL, '2026-01-03 11:46:58', NULL),
(3581, 208, 22, 'left', 1, 54, NULL, '2026-01-03 11:46:58', NULL),
(3582, 208, 19, 'left', 1, 55, NULL, '2026-01-03 11:46:58', NULL),
(3583, 210, 207, 'right', 1, 1, NULL, '2026-01-03 11:47:03', NULL),
(3584, 210, 200, 'left', 1, 2, NULL, '2026-01-03 11:47:03', NULL),
(3585, 210, 199, 'left', 1, 3, NULL, '2026-01-03 11:47:03', NULL),
(3586, 210, 198, 'left', 1, 4, NULL, '2026-01-03 11:47:03', NULL),
(3587, 210, 94, 'left', 1, 5, NULL, '2026-01-03 11:47:03', NULL),
(3588, 210, 93, 'left', 1, 6, NULL, '2026-01-03 11:47:03', NULL),
(3589, 210, 92, 'left', 1, 7, NULL, '2026-01-03 11:47:03', NULL),
(3590, 210, 114, 'left', 1, 8, NULL, '2026-01-03 11:47:03', NULL),
(3591, 210, 91, 'left', 1, 9, NULL, '2026-01-03 11:47:03', NULL),
(3592, 210, 90, 'left', 1, 10, NULL, '2026-01-03 11:47:03', NULL),
(3593, 210, 89, 'left', 1, 11, NULL, '2026-01-03 11:47:03', NULL),
(3594, 210, 113, 'left', 1, 12, NULL, '2026-01-03 11:47:03', NULL),
(3595, 210, 112, 'left', 1, 13, NULL, '2026-01-03 11:47:03', NULL),
(3596, 210, 111, 'left', 1, 14, NULL, '2026-01-03 11:47:03', NULL),
(3597, 210, 110, 'left', 1, 15, NULL, '2026-01-03 11:47:03', NULL),
(3598, 210, 109, 'left', 1, 16, NULL, '2026-01-03 11:47:03', NULL),
(3599, 210, 108, 'left', 1, 17, NULL, '2026-01-03 11:47:03', NULL),
(3600, 210, 107, 'left', 1, 18, NULL, '2026-01-03 11:47:03', NULL),
(3601, 210, 106, 'left', 1, 19, NULL, '2026-01-03 11:47:03', NULL),
(3602, 210, 105, 'left', 1, 20, NULL, '2026-01-03 11:47:03', NULL),
(3603, 210, 88, 'left', 1, 21, NULL, '2026-01-03 11:47:03', NULL),
(3604, 210, 87, 'left', 1, 22, NULL, '2026-01-03 11:47:03', NULL),
(3605, 210, 86, 'left', 1, 23, NULL, '2026-01-03 11:47:03', NULL),
(3606, 210, 85, 'left', 1, 24, NULL, '2026-01-03 11:47:03', NULL),
(3607, 210, 84, 'left', 1, 25, NULL, '2026-01-03 11:47:03', NULL),
(3608, 210, 83, 'left', 1, 26, NULL, '2026-01-03 11:47:03', NULL),
(3609, 210, 82, 'left', 1, 27, NULL, '2026-01-03 11:47:03', NULL),
(3610, 210, 81, 'left', 1, 28, NULL, '2026-01-03 11:47:03', NULL),
(3611, 210, 80, 'left', 1, 29, NULL, '2026-01-03 11:47:03', NULL),
(3612, 210, 79, 'left', 1, 30, NULL, '2026-01-03 11:47:03', NULL),
(3613, 210, 78, 'left', 1, 31, NULL, '2026-01-03 11:47:03', NULL),
(3614, 210, 77, 'left', 1, 32, NULL, '2026-01-03 11:47:03', NULL),
(3615, 210, 76, 'left', 1, 33, NULL, '2026-01-03 11:47:03', NULL),
(3616, 210, 75, 'left', 1, 34, NULL, '2026-01-03 11:47:03', NULL),
(3617, 210, 74, 'left', 1, 35, NULL, '2026-01-03 11:47:03', NULL),
(3618, 210, 73, 'left', 1, 36, NULL, '2026-01-03 11:47:03', NULL),
(3619, 210, 72, 'left', 1, 37, NULL, '2026-01-03 11:47:03', NULL),
(3620, 210, 71, 'left', 1, 38, NULL, '2026-01-03 11:47:03', NULL),
(3621, 210, 70, 'left', 1, 39, NULL, '2026-01-03 11:47:03', NULL),
(3622, 210, 69, 'left', 1, 40, NULL, '2026-01-03 11:47:03', NULL),
(3623, 210, 68, 'left', 1, 41, NULL, '2026-01-03 11:47:03', NULL),
(3624, 210, 67, 'left', 1, 42, NULL, '2026-01-03 11:47:03', NULL),
(3625, 210, 66, 'left', 1, 43, NULL, '2026-01-03 11:47:03', NULL),
(3626, 210, 65, 'left', 1, 44, NULL, '2026-01-03 11:47:03', NULL),
(3627, 210, 64, 'left', 1, 45, NULL, '2026-01-03 11:47:03', NULL),
(3628, 210, 63, 'left', 1, 46, NULL, '2026-01-03 11:47:03', NULL),
(3629, 210, 62, 'left', 1, 47, NULL, '2026-01-03 11:47:03', NULL),
(3630, 210, 38, 'left', 1, 48, NULL, '2026-01-03 11:47:03', NULL),
(3631, 210, 37, 'left', 1, 49, NULL, '2026-01-03 11:47:03', NULL),
(3632, 210, 36, 'left', 1, 50, NULL, '2026-01-03 11:47:03', NULL),
(3633, 210, 26, 'left', 1, 51, NULL, '2026-01-03 11:47:03', NULL),
(3634, 210, 24, 'right', 1, 52, NULL, '2026-01-03 11:47:03', NULL),
(3635, 210, 23, 'left', 1, 53, NULL, '2026-01-03 11:47:03', NULL),
(3636, 210, 22, 'left', 1, 54, NULL, '2026-01-03 11:47:03', NULL),
(3637, 210, 19, 'left', 1, 55, NULL, '2026-01-03 11:47:03', NULL),
(3638, 211, 208, 'left', 1, 1, NULL, '2026-01-03 11:51:55', NULL),
(3639, 211, 207, 'left', 1, 2, NULL, '2026-01-03 11:51:55', NULL),
(3640, 211, 200, 'left', 1, 3, NULL, '2026-01-03 11:51:55', NULL),
(3641, 211, 199, 'left', 1, 4, NULL, '2026-01-03 11:51:55', NULL),
(3642, 211, 198, 'left', 1, 5, NULL, '2026-01-03 11:51:55', NULL),
(3643, 211, 94, 'left', 1, 6, NULL, '2026-01-03 11:51:55', NULL),
(3644, 211, 93, 'left', 1, 7, NULL, '2026-01-03 11:51:55', NULL),
(3645, 211, 92, 'left', 1, 8, NULL, '2026-01-03 11:51:55', NULL),
(3646, 211, 114, 'left', 1, 9, NULL, '2026-01-03 11:51:55', NULL),
(3647, 211, 91, 'left', 1, 10, NULL, '2026-01-03 11:51:55', NULL),
(3648, 211, 90, 'left', 1, 11, NULL, '2026-01-03 11:51:55', NULL),
(3649, 211, 89, 'left', 1, 12, NULL, '2026-01-03 11:51:55', NULL),
(3650, 211, 113, 'left', 1, 13, NULL, '2026-01-03 11:51:55', NULL),
(3651, 211, 112, 'left', 1, 14, NULL, '2026-01-03 11:51:55', NULL),
(3652, 211, 111, 'left', 1, 15, NULL, '2026-01-03 11:51:55', NULL),
(3653, 211, 110, 'left', 1, 16, NULL, '2026-01-03 11:51:55', NULL),
(3654, 211, 109, 'left', 1, 17, NULL, '2026-01-03 11:51:55', NULL),
(3655, 211, 108, 'left', 1, 18, NULL, '2026-01-03 11:51:55', NULL),
(3656, 211, 107, 'left', 1, 19, NULL, '2026-01-03 11:51:55', NULL),
(3657, 211, 106, 'left', 1, 20, NULL, '2026-01-03 11:51:55', NULL),
(3658, 211, 105, 'left', 1, 21, NULL, '2026-01-03 11:51:55', NULL),
(3659, 211, 88, 'left', 1, 22, NULL, '2026-01-03 11:51:55', NULL),
(3660, 211, 87, 'left', 1, 23, NULL, '2026-01-03 11:51:55', NULL),
(3661, 211, 86, 'left', 1, 24, NULL, '2026-01-03 11:51:55', NULL),
(3662, 211, 85, 'left', 1, 25, NULL, '2026-01-03 11:51:55', NULL),
(3663, 211, 84, 'left', 1, 26, NULL, '2026-01-03 11:51:55', NULL),
(3664, 211, 83, 'left', 1, 27, NULL, '2026-01-03 11:51:55', NULL),
(3665, 211, 82, 'left', 1, 28, NULL, '2026-01-03 11:51:55', NULL),
(3666, 211, 81, 'left', 1, 29, NULL, '2026-01-03 11:51:55', NULL),
(3667, 211, 80, 'left', 1, 30, NULL, '2026-01-03 11:51:55', NULL),
(3668, 211, 79, 'left', 1, 31, NULL, '2026-01-03 11:51:55', NULL),
(3669, 211, 78, 'left', 1, 32, NULL, '2026-01-03 11:51:55', NULL),
(3670, 211, 77, 'left', 1, 33, NULL, '2026-01-03 11:51:55', NULL),
(3671, 211, 76, 'left', 1, 34, NULL, '2026-01-03 11:51:55', NULL),
(3672, 211, 75, 'left', 1, 35, NULL, '2026-01-03 11:51:55', NULL),
(3673, 211, 74, 'left', 1, 36, NULL, '2026-01-03 11:51:55', NULL),
(3674, 211, 73, 'left', 1, 37, NULL, '2026-01-03 11:51:55', NULL),
(3675, 211, 72, 'left', 1, 38, NULL, '2026-01-03 11:51:55', NULL),
(3676, 211, 71, 'left', 1, 39, NULL, '2026-01-03 11:51:55', NULL),
(3677, 211, 70, 'left', 1, 40, NULL, '2026-01-03 11:51:55', NULL),
(3678, 211, 69, 'left', 1, 41, NULL, '2026-01-03 11:51:55', NULL),
(3679, 211, 68, 'left', 1, 42, NULL, '2026-01-03 11:51:55', NULL),
(3680, 211, 67, 'left', 1, 43, NULL, '2026-01-03 11:51:55', NULL),
(3681, 211, 66, 'left', 1, 44, NULL, '2026-01-03 11:51:55', NULL),
(3682, 211, 65, 'left', 1, 45, NULL, '2026-01-03 11:51:55', NULL),
(3683, 211, 64, 'left', 1, 46, NULL, '2026-01-03 11:51:55', NULL),
(3684, 211, 63, 'left', 1, 47, NULL, '2026-01-03 11:51:55', NULL),
(3685, 211, 62, 'left', 1, 48, NULL, '2026-01-03 11:51:55', NULL),
(3686, 211, 38, 'left', 1, 49, NULL, '2026-01-03 11:51:55', NULL),
(3687, 211, 37, 'left', 1, 50, NULL, '2026-01-03 11:51:55', NULL),
(3688, 211, 36, 'left', 1, 51, NULL, '2026-01-03 11:51:55', NULL),
(3689, 211, 26, 'left', 1, 52, NULL, '2026-01-03 11:51:55', NULL),
(3690, 211, 24, 'right', 1, 53, NULL, '2026-01-03 11:51:55', NULL),
(3691, 211, 23, 'left', 1, 54, NULL, '2026-01-03 11:51:55', NULL),
(3692, 211, 22, 'left', 1, 55, NULL, '2026-01-03 11:51:55', NULL),
(3693, 211, 19, 'left', 1, 56, NULL, '2026-01-03 11:51:55', NULL),
(3694, 212, 211, 'left', 1, 1, NULL, '2026-01-03 11:56:49', NULL),
(3695, 212, 208, 'left', 1, 2, NULL, '2026-01-03 11:56:49', NULL),
(3696, 212, 207, 'left', 1, 3, NULL, '2026-01-03 11:56:49', NULL),
(3697, 212, 200, 'left', 1, 4, NULL, '2026-01-03 11:56:49', NULL),
(3698, 212, 199, 'left', 1, 5, NULL, '2026-01-03 11:56:49', NULL),
(3699, 212, 198, 'left', 1, 6, NULL, '2026-01-03 11:56:49', NULL),
(3700, 212, 94, 'left', 1, 7, NULL, '2026-01-03 11:56:49', NULL),
(3701, 212, 93, 'left', 1, 8, NULL, '2026-01-03 11:56:49', NULL),
(3702, 212, 92, 'left', 1, 9, NULL, '2026-01-03 11:56:49', NULL),
(3703, 212, 114, 'left', 1, 10, NULL, '2026-01-03 11:56:49', NULL),
(3704, 212, 91, 'left', 1, 11, NULL, '2026-01-03 11:56:49', NULL),
(3705, 212, 90, 'left', 1, 12, NULL, '2026-01-03 11:56:49', NULL),
(3706, 212, 89, 'left', 1, 13, NULL, '2026-01-03 11:56:49', NULL),
(3707, 212, 113, 'left', 1, 14, NULL, '2026-01-03 11:56:49', NULL),
(3708, 212, 112, 'left', 1, 15, NULL, '2026-01-03 11:56:49', NULL),
(3709, 212, 111, 'left', 1, 16, NULL, '2026-01-03 11:56:49', NULL),
(3710, 212, 110, 'left', 1, 17, NULL, '2026-01-03 11:56:49', NULL),
(3711, 212, 109, 'left', 1, 18, NULL, '2026-01-03 11:56:49', NULL),
(3712, 212, 108, 'left', 1, 19, NULL, '2026-01-03 11:56:49', NULL),
(3713, 212, 107, 'left', 1, 20, NULL, '2026-01-03 11:56:49', NULL),
(3714, 212, 106, 'left', 1, 21, NULL, '2026-01-03 11:56:49', NULL),
(3715, 212, 105, 'left', 1, 22, NULL, '2026-01-03 11:56:49', NULL),
(3716, 212, 88, 'left', 1, 23, NULL, '2026-01-03 11:56:49', NULL),
(3717, 212, 87, 'left', 1, 24, NULL, '2026-01-03 11:56:49', NULL),
(3718, 212, 86, 'left', 1, 25, NULL, '2026-01-03 11:56:49', NULL),
(3719, 212, 85, 'left', 1, 26, NULL, '2026-01-03 11:56:49', NULL),
(3720, 212, 84, 'left', 1, 27, NULL, '2026-01-03 11:56:49', NULL),
(3721, 212, 83, 'left', 1, 28, NULL, '2026-01-03 11:56:49', NULL),
(3722, 212, 82, 'left', 1, 29, NULL, '2026-01-03 11:56:49', NULL),
(3723, 212, 81, 'left', 1, 30, NULL, '2026-01-03 11:56:49', NULL),
(3724, 212, 80, 'left', 1, 31, NULL, '2026-01-03 11:56:49', NULL),
(3725, 212, 79, 'left', 1, 32, NULL, '2026-01-03 11:56:49', NULL),
(3726, 212, 78, 'left', 1, 33, NULL, '2026-01-03 11:56:49', NULL),
(3727, 212, 77, 'left', 1, 34, NULL, '2026-01-03 11:56:49', NULL),
(3728, 212, 76, 'left', 1, 35, NULL, '2026-01-03 11:56:49', NULL),
(3729, 212, 75, 'left', 1, 36, NULL, '2026-01-03 11:56:49', NULL),
(3730, 212, 74, 'left', 1, 37, NULL, '2026-01-03 11:56:49', NULL),
(3731, 212, 73, 'left', 1, 38, NULL, '2026-01-03 11:56:49', NULL),
(3732, 212, 72, 'left', 1, 39, NULL, '2026-01-03 11:56:49', NULL),
(3733, 212, 71, 'left', 1, 40, NULL, '2026-01-03 11:56:49', NULL),
(3734, 212, 70, 'left', 1, 41, NULL, '2026-01-03 11:56:49', NULL),
(3735, 212, 69, 'left', 1, 42, NULL, '2026-01-03 11:56:49', NULL),
(3736, 212, 68, 'left', 1, 43, NULL, '2026-01-03 11:56:49', NULL),
(3737, 212, 67, 'left', 1, 44, NULL, '2026-01-03 11:56:49', NULL),
(3738, 212, 66, 'left', 1, 45, NULL, '2026-01-03 11:56:49', NULL),
(3739, 212, 65, 'left', 1, 46, NULL, '2026-01-03 11:56:49', NULL),
(3740, 212, 64, 'left', 1, 47, NULL, '2026-01-03 11:56:49', NULL),
(3741, 212, 63, 'left', 1, 48, NULL, '2026-01-03 11:56:49', NULL),
(3742, 212, 62, 'left', 1, 49, NULL, '2026-01-03 11:56:49', NULL),
(3743, 212, 38, 'left', 1, 50, NULL, '2026-01-03 11:56:49', NULL),
(3744, 212, 37, 'left', 1, 51, NULL, '2026-01-03 11:56:49', NULL),
(3745, 212, 36, 'left', 1, 52, NULL, '2026-01-03 11:56:49', NULL),
(3746, 212, 26, 'left', 1, 53, NULL, '2026-01-03 11:56:49', NULL),
(3747, 212, 24, 'right', 1, 54, NULL, '2026-01-03 11:56:49', NULL),
(3748, 212, 23, 'left', 1, 55, NULL, '2026-01-03 11:56:49', NULL),
(3749, 212, 22, 'left', 1, 56, NULL, '2026-01-03 11:56:49', NULL),
(3750, 212, 19, 'left', 1, 57, NULL, '2026-01-03 11:56:49', NULL),
(3751, 213, 211, 'right', 1, 1, NULL, '2026-01-03 11:56:55', NULL),
(3752, 213, 208, 'left', 1, 2, NULL, '2026-01-03 11:56:55', NULL),
(3753, 213, 207, 'left', 1, 3, NULL, '2026-01-03 11:56:55', NULL),
(3754, 213, 200, 'left', 1, 4, NULL, '2026-01-03 11:56:55', NULL),
(3755, 213, 199, 'left', 1, 5, NULL, '2026-01-03 11:56:55', NULL),
(3756, 213, 198, 'left', 1, 6, NULL, '2026-01-03 11:56:55', NULL),
(3757, 213, 94, 'left', 1, 7, NULL, '2026-01-03 11:56:55', NULL),
(3758, 213, 93, 'left', 1, 8, NULL, '2026-01-03 11:56:55', NULL),
(3759, 213, 92, 'left', 1, 9, NULL, '2026-01-03 11:56:55', NULL),
(3760, 213, 114, 'left', 1, 10, NULL, '2026-01-03 11:56:55', NULL),
(3761, 213, 91, 'left', 1, 11, NULL, '2026-01-03 11:56:55', NULL),
(3762, 213, 90, 'left', 1, 12, NULL, '2026-01-03 11:56:55', NULL),
(3763, 213, 89, 'left', 1, 13, NULL, '2026-01-03 11:56:55', NULL),
(3764, 213, 113, 'left', 1, 14, NULL, '2026-01-03 11:56:55', NULL),
(3765, 213, 112, 'left', 1, 15, NULL, '2026-01-03 11:56:55', NULL),
(3766, 213, 111, 'left', 1, 16, NULL, '2026-01-03 11:56:55', NULL),
(3767, 213, 110, 'left', 1, 17, NULL, '2026-01-03 11:56:55', NULL),
(3768, 213, 109, 'left', 1, 18, NULL, '2026-01-03 11:56:55', NULL),
(3769, 213, 108, 'left', 1, 19, NULL, '2026-01-03 11:56:55', NULL),
(3770, 213, 107, 'left', 1, 20, NULL, '2026-01-03 11:56:55', NULL),
(3771, 213, 106, 'left', 1, 21, NULL, '2026-01-03 11:56:55', NULL),
(3772, 213, 105, 'left', 1, 22, NULL, '2026-01-03 11:56:55', NULL),
(3773, 213, 88, 'left', 1, 23, NULL, '2026-01-03 11:56:55', NULL),
(3774, 213, 87, 'left', 1, 24, NULL, '2026-01-03 11:56:55', NULL),
(3775, 213, 86, 'left', 1, 25, NULL, '2026-01-03 11:56:55', NULL),
(3776, 213, 85, 'left', 1, 26, NULL, '2026-01-03 11:56:55', NULL),
(3777, 213, 84, 'left', 1, 27, NULL, '2026-01-03 11:56:55', NULL),
(3778, 213, 83, 'left', 1, 28, NULL, '2026-01-03 11:56:55', NULL),
(3779, 213, 82, 'left', 1, 29, NULL, '2026-01-03 11:56:55', NULL),
(3780, 213, 81, 'left', 1, 30, NULL, '2026-01-03 11:56:55', NULL),
(3781, 213, 80, 'left', 1, 31, NULL, '2026-01-03 11:56:55', NULL),
(3782, 213, 79, 'left', 1, 32, NULL, '2026-01-03 11:56:55', NULL),
(3783, 213, 78, 'left', 1, 33, NULL, '2026-01-03 11:56:55', NULL),
(3784, 213, 77, 'left', 1, 34, NULL, '2026-01-03 11:56:55', NULL),
(3785, 213, 76, 'left', 1, 35, NULL, '2026-01-03 11:56:55', NULL),
(3786, 213, 75, 'left', 1, 36, NULL, '2026-01-03 11:56:55', NULL),
(3787, 213, 74, 'left', 1, 37, NULL, '2026-01-03 11:56:55', NULL),
(3788, 213, 73, 'left', 1, 38, NULL, '2026-01-03 11:56:55', NULL),
(3789, 213, 72, 'left', 1, 39, NULL, '2026-01-03 11:56:55', NULL),
(3790, 213, 71, 'left', 1, 40, NULL, '2026-01-03 11:56:55', NULL),
(3791, 213, 70, 'left', 1, 41, NULL, '2026-01-03 11:56:55', NULL),
(3792, 213, 69, 'left', 1, 42, NULL, '2026-01-03 11:56:55', NULL),
(3793, 213, 68, 'left', 1, 43, NULL, '2026-01-03 11:56:55', NULL),
(3794, 213, 67, 'left', 1, 44, NULL, '2026-01-03 11:56:55', NULL),
(3795, 213, 66, 'left', 1, 45, NULL, '2026-01-03 11:56:55', NULL),
(3796, 213, 65, 'left', 1, 46, NULL, '2026-01-03 11:56:55', NULL),
(3797, 213, 64, 'left', 1, 47, NULL, '2026-01-03 11:56:55', NULL),
(3798, 213, 63, 'left', 1, 48, NULL, '2026-01-03 11:56:55', NULL),
(3799, 213, 62, 'left', 1, 49, NULL, '2026-01-03 11:56:55', NULL),
(3800, 213, 38, 'left', 1, 50, NULL, '2026-01-03 11:56:55', NULL),
(3801, 213, 37, 'left', 1, 51, NULL, '2026-01-03 11:56:55', NULL),
(3802, 213, 36, 'left', 1, 52, NULL, '2026-01-03 11:56:55', NULL),
(3803, 213, 26, 'left', 1, 53, NULL, '2026-01-03 11:56:55', NULL),
(3804, 213, 24, 'right', 1, 54, NULL, '2026-01-03 11:56:55', NULL),
(3805, 213, 23, 'left', 1, 55, NULL, '2026-01-03 11:56:55', NULL),
(3806, 213, 22, 'left', 1, 56, NULL, '2026-01-03 11:56:55', NULL),
(3807, 213, 19, 'left', 1, 57, NULL, '2026-01-03 11:56:55', NULL),
(3808, 214, 212, 'left', 1, 1, NULL, '2026-01-03 12:01:08', NULL),
(3809, 214, 211, 'left', 1, 2, NULL, '2026-01-03 12:01:08', NULL),
(3810, 214, 208, 'left', 1, 3, NULL, '2026-01-03 12:01:08', NULL),
(3811, 214, 207, 'left', 1, 4, NULL, '2026-01-03 12:01:08', NULL),
(3812, 214, 200, 'left', 1, 5, NULL, '2026-01-03 12:01:08', NULL),
(3813, 214, 199, 'left', 1, 6, NULL, '2026-01-03 12:01:08', NULL),
(3814, 214, 198, 'left', 1, 7, NULL, '2026-01-03 12:01:08', NULL),
(3815, 214, 94, 'left', 1, 8, NULL, '2026-01-03 12:01:08', NULL),
(3816, 214, 93, 'left', 1, 9, NULL, '2026-01-03 12:01:08', NULL),
(3817, 214, 92, 'left', 1, 10, NULL, '2026-01-03 12:01:08', NULL),
(3818, 214, 114, 'left', 1, 11, NULL, '2026-01-03 12:01:08', NULL),
(3819, 214, 91, 'left', 1, 12, NULL, '2026-01-03 12:01:08', NULL),
(3820, 214, 90, 'left', 1, 13, NULL, '2026-01-03 12:01:08', NULL),
(3821, 214, 89, 'left', 1, 14, NULL, '2026-01-03 12:01:08', NULL),
(3822, 214, 113, 'left', 1, 15, NULL, '2026-01-03 12:01:08', NULL),
(3823, 214, 112, 'left', 1, 16, NULL, '2026-01-03 12:01:08', NULL),
(3824, 214, 111, 'left', 1, 17, NULL, '2026-01-03 12:01:08', NULL),
(3825, 214, 110, 'left', 1, 18, NULL, '2026-01-03 12:01:08', NULL),
(3826, 214, 109, 'left', 1, 19, NULL, '2026-01-03 12:01:08', NULL),
(3827, 214, 108, 'left', 1, 20, NULL, '2026-01-03 12:01:08', NULL),
(3828, 214, 107, 'left', 1, 21, NULL, '2026-01-03 12:01:08', NULL),
(3829, 214, 106, 'left', 1, 22, NULL, '2026-01-03 12:01:08', NULL),
(3830, 214, 105, 'left', 1, 23, NULL, '2026-01-03 12:01:08', NULL),
(3831, 214, 88, 'left', 1, 24, NULL, '2026-01-03 12:01:08', NULL),
(3832, 214, 87, 'left', 1, 25, NULL, '2026-01-03 12:01:08', NULL),
(3833, 214, 86, 'left', 1, 26, NULL, '2026-01-03 12:01:08', NULL),
(3834, 214, 85, 'left', 1, 27, NULL, '2026-01-03 12:01:08', NULL),
(3835, 214, 84, 'left', 1, 28, NULL, '2026-01-03 12:01:08', NULL),
(3836, 214, 83, 'left', 1, 29, NULL, '2026-01-03 12:01:08', NULL),
(3837, 214, 82, 'left', 1, 30, NULL, '2026-01-03 12:01:08', NULL),
(3838, 214, 81, 'left', 1, 31, NULL, '2026-01-03 12:01:08', NULL),
(3839, 214, 80, 'left', 1, 32, NULL, '2026-01-03 12:01:08', NULL),
(3840, 214, 79, 'left', 1, 33, NULL, '2026-01-03 12:01:08', NULL),
(3841, 214, 78, 'left', 1, 34, NULL, '2026-01-03 12:01:08', NULL),
(3842, 214, 77, 'left', 1, 35, NULL, '2026-01-03 12:01:08', NULL),
(3843, 214, 76, 'left', 1, 36, NULL, '2026-01-03 12:01:08', NULL),
(3844, 214, 75, 'left', 1, 37, NULL, '2026-01-03 12:01:08', NULL),
(3845, 214, 74, 'left', 1, 38, NULL, '2026-01-03 12:01:08', NULL),
(3846, 214, 73, 'left', 1, 39, NULL, '2026-01-03 12:01:08', NULL),
(3847, 214, 72, 'left', 1, 40, NULL, '2026-01-03 12:01:08', NULL),
(3848, 214, 71, 'left', 1, 41, NULL, '2026-01-03 12:01:08', NULL),
(3849, 214, 70, 'left', 1, 42, NULL, '2026-01-03 12:01:08', NULL),
(3850, 214, 69, 'left', 1, 43, NULL, '2026-01-03 12:01:08', NULL),
(3851, 214, 68, 'left', 1, 44, NULL, '2026-01-03 12:01:08', NULL),
(3852, 214, 67, 'left', 1, 45, NULL, '2026-01-03 12:01:08', NULL),
(3853, 214, 66, 'left', 1, 46, NULL, '2026-01-03 12:01:08', NULL),
(3854, 214, 65, 'left', 1, 47, NULL, '2026-01-03 12:01:08', NULL),
(3855, 214, 64, 'left', 1, 48, NULL, '2026-01-03 12:01:08', NULL),
(3856, 214, 63, 'left', 1, 49, NULL, '2026-01-03 12:01:08', NULL),
(3857, 214, 62, 'left', 1, 50, NULL, '2026-01-03 12:01:08', NULL),
(3858, 214, 38, 'left', 1, 51, NULL, '2026-01-03 12:01:08', NULL),
(3859, 214, 37, 'left', 1, 52, NULL, '2026-01-03 12:01:08', NULL),
(3860, 214, 36, 'left', 1, 53, NULL, '2026-01-03 12:01:08', NULL),
(3861, 214, 26, 'left', 1, 54, NULL, '2026-01-03 12:01:08', NULL),
(3862, 214, 24, 'right', 1, 55, NULL, '2026-01-03 12:01:08', NULL),
(3863, 214, 23, 'left', 1, 56, NULL, '2026-01-03 12:01:08', NULL),
(3864, 214, 22, 'left', 1, 57, NULL, '2026-01-03 12:01:08', NULL),
(3865, 214, 19, 'left', 1, 58, NULL, '2026-01-03 12:01:08', NULL),
(3866, 216, 214, 'left', 1, 1, NULL, '2026-01-03 12:07:55', NULL),
(3867, 216, 212, 'left', 1, 2, NULL, '2026-01-03 12:07:55', NULL),
(3868, 216, 211, 'left', 1, 3, NULL, '2026-01-03 12:07:55', NULL),
(3869, 216, 208, 'left', 1, 4, NULL, '2026-01-03 12:07:55', NULL),
(3870, 216, 207, 'left', 1, 5, NULL, '2026-01-03 12:07:55', NULL),
(3871, 216, 200, 'left', 1, 6, NULL, '2026-01-03 12:07:55', NULL),
(3872, 216, 199, 'left', 1, 7, NULL, '2026-01-03 12:07:55', NULL),
(3873, 216, 198, 'left', 1, 8, NULL, '2026-01-03 12:07:55', NULL),
(3874, 216, 94, 'left', 1, 9, NULL, '2026-01-03 12:07:55', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(3875, 216, 93, 'left', 1, 10, NULL, '2026-01-03 12:07:55', NULL),
(3876, 216, 92, 'left', 1, 11, NULL, '2026-01-03 12:07:55', NULL),
(3877, 216, 114, 'left', 1, 12, NULL, '2026-01-03 12:07:55', NULL),
(3878, 216, 91, 'left', 1, 13, NULL, '2026-01-03 12:07:55', NULL),
(3879, 216, 90, 'left', 1, 14, NULL, '2026-01-03 12:07:55', NULL),
(3880, 216, 89, 'left', 1, 15, NULL, '2026-01-03 12:07:55', NULL),
(3881, 216, 113, 'left', 1, 16, NULL, '2026-01-03 12:07:55', NULL),
(3882, 216, 112, 'left', 1, 17, NULL, '2026-01-03 12:07:55', NULL),
(3883, 216, 111, 'left', 1, 18, NULL, '2026-01-03 12:07:55', NULL),
(3884, 216, 110, 'left', 1, 19, NULL, '2026-01-03 12:07:55', NULL),
(3885, 216, 109, 'left', 1, 20, NULL, '2026-01-03 12:07:55', NULL),
(3886, 216, 108, 'left', 1, 21, NULL, '2026-01-03 12:07:55', NULL),
(3887, 216, 107, 'left', 1, 22, NULL, '2026-01-03 12:07:55', NULL),
(3888, 216, 106, 'left', 1, 23, NULL, '2026-01-03 12:07:55', NULL),
(3889, 216, 105, 'left', 1, 24, NULL, '2026-01-03 12:07:55', NULL),
(3890, 216, 88, 'left', 1, 25, NULL, '2026-01-03 12:07:55', NULL),
(3891, 216, 87, 'left', 1, 26, NULL, '2026-01-03 12:07:55', NULL),
(3892, 216, 86, 'left', 1, 27, NULL, '2026-01-03 12:07:55', NULL),
(3893, 216, 85, 'left', 1, 28, NULL, '2026-01-03 12:07:55', NULL),
(3894, 216, 84, 'left', 1, 29, NULL, '2026-01-03 12:07:55', NULL),
(3895, 216, 83, 'left', 1, 30, NULL, '2026-01-03 12:07:55', NULL),
(3896, 216, 82, 'left', 1, 31, NULL, '2026-01-03 12:07:55', NULL),
(3897, 216, 81, 'left', 1, 32, NULL, '2026-01-03 12:07:55', NULL),
(3898, 216, 80, 'left', 1, 33, NULL, '2026-01-03 12:07:55', NULL),
(3899, 216, 79, 'left', 1, 34, NULL, '2026-01-03 12:07:55', NULL),
(3900, 216, 78, 'left', 1, 35, NULL, '2026-01-03 12:07:55', NULL),
(3901, 216, 77, 'left', 1, 36, NULL, '2026-01-03 12:07:55', NULL),
(3902, 216, 76, 'left', 1, 37, NULL, '2026-01-03 12:07:55', NULL),
(3903, 216, 75, 'left', 1, 38, NULL, '2026-01-03 12:07:55', NULL),
(3904, 216, 74, 'left', 1, 39, NULL, '2026-01-03 12:07:55', NULL),
(3905, 216, 73, 'left', 1, 40, NULL, '2026-01-03 12:07:55', NULL),
(3906, 216, 72, 'left', 1, 41, NULL, '2026-01-03 12:07:55', NULL),
(3907, 216, 71, 'left', 1, 42, NULL, '2026-01-03 12:07:55', NULL),
(3908, 216, 70, 'left', 1, 43, NULL, '2026-01-03 12:07:55', NULL),
(3909, 216, 69, 'left', 1, 44, NULL, '2026-01-03 12:07:55', NULL),
(3910, 216, 68, 'left', 1, 45, NULL, '2026-01-03 12:07:55', NULL),
(3911, 216, 67, 'left', 1, 46, NULL, '2026-01-03 12:07:55', NULL),
(3912, 216, 66, 'left', 1, 47, NULL, '2026-01-03 12:07:55', NULL),
(3913, 216, 65, 'left', 1, 48, NULL, '2026-01-03 12:07:55', NULL),
(3914, 216, 64, 'left', 1, 49, NULL, '2026-01-03 12:07:55', NULL),
(3915, 216, 63, 'left', 1, 50, NULL, '2026-01-03 12:07:55', NULL),
(3916, 216, 62, 'left', 1, 51, NULL, '2026-01-03 12:07:55', NULL),
(3917, 216, 38, 'left', 1, 52, NULL, '2026-01-03 12:07:55', NULL),
(3918, 216, 37, 'left', 1, 53, NULL, '2026-01-03 12:07:55', NULL),
(3919, 216, 36, 'left', 1, 54, NULL, '2026-01-03 12:07:55', NULL),
(3920, 216, 26, 'left', 1, 55, NULL, '2026-01-03 12:07:55', NULL),
(3921, 216, 24, 'right', 1, 56, NULL, '2026-01-03 12:07:55', NULL),
(3922, 216, 23, 'left', 1, 57, NULL, '2026-01-03 12:07:55', NULL),
(3923, 216, 22, 'left', 1, 58, NULL, '2026-01-03 12:07:55', NULL),
(3924, 216, 19, 'left', 1, 59, NULL, '2026-01-03 12:07:55', NULL),
(3925, 217, 214, 'right', 1, 1, NULL, '2026-01-03 12:08:00', NULL),
(3926, 217, 212, 'left', 1, 2, NULL, '2026-01-03 12:08:00', NULL),
(3927, 217, 211, 'left', 1, 3, NULL, '2026-01-03 12:08:00', NULL),
(3928, 217, 208, 'left', 1, 4, NULL, '2026-01-03 12:08:00', NULL),
(3929, 217, 207, 'left', 1, 5, NULL, '2026-01-03 12:08:00', NULL),
(3930, 217, 200, 'left', 1, 6, NULL, '2026-01-03 12:08:00', NULL),
(3931, 217, 199, 'left', 1, 7, NULL, '2026-01-03 12:08:00', NULL),
(3932, 217, 198, 'left', 1, 8, NULL, '2026-01-03 12:08:00', NULL),
(3933, 217, 94, 'left', 1, 9, NULL, '2026-01-03 12:08:00', NULL),
(3934, 217, 93, 'left', 1, 10, NULL, '2026-01-03 12:08:00', NULL),
(3935, 217, 92, 'left', 1, 11, NULL, '2026-01-03 12:08:00', NULL),
(3936, 217, 114, 'left', 1, 12, NULL, '2026-01-03 12:08:00', NULL),
(3937, 217, 91, 'left', 1, 13, NULL, '2026-01-03 12:08:00', NULL),
(3938, 217, 90, 'left', 1, 14, NULL, '2026-01-03 12:08:00', NULL),
(3939, 217, 89, 'left', 1, 15, NULL, '2026-01-03 12:08:00', NULL),
(3940, 217, 113, 'left', 1, 16, NULL, '2026-01-03 12:08:00', NULL),
(3941, 217, 112, 'left', 1, 17, NULL, '2026-01-03 12:08:00', NULL),
(3942, 217, 111, 'left', 1, 18, NULL, '2026-01-03 12:08:00', NULL),
(3943, 217, 110, 'left', 1, 19, NULL, '2026-01-03 12:08:00', NULL),
(3944, 217, 109, 'left', 1, 20, NULL, '2026-01-03 12:08:00', NULL),
(3945, 217, 108, 'left', 1, 21, NULL, '2026-01-03 12:08:00', NULL),
(3946, 217, 107, 'left', 1, 22, NULL, '2026-01-03 12:08:00', NULL),
(3947, 217, 106, 'left', 1, 23, NULL, '2026-01-03 12:08:00', NULL),
(3948, 217, 105, 'left', 1, 24, NULL, '2026-01-03 12:08:00', NULL),
(3949, 217, 88, 'left', 1, 25, NULL, '2026-01-03 12:08:00', NULL),
(3950, 217, 87, 'left', 1, 26, NULL, '2026-01-03 12:08:00', NULL),
(3951, 217, 86, 'left', 1, 27, NULL, '2026-01-03 12:08:00', NULL),
(3952, 217, 85, 'left', 1, 28, NULL, '2026-01-03 12:08:00', NULL),
(3953, 217, 84, 'left', 1, 29, NULL, '2026-01-03 12:08:00', NULL),
(3954, 217, 83, 'left', 1, 30, NULL, '2026-01-03 12:08:00', NULL),
(3955, 217, 82, 'left', 1, 31, NULL, '2026-01-03 12:08:00', NULL),
(3956, 217, 81, 'left', 1, 32, NULL, '2026-01-03 12:08:00', NULL),
(3957, 217, 80, 'left', 1, 33, NULL, '2026-01-03 12:08:00', NULL),
(3958, 217, 79, 'left', 1, 34, NULL, '2026-01-03 12:08:00', NULL),
(3959, 217, 78, 'left', 1, 35, NULL, '2026-01-03 12:08:00', NULL),
(3960, 217, 77, 'left', 1, 36, NULL, '2026-01-03 12:08:00', NULL),
(3961, 217, 76, 'left', 1, 37, NULL, '2026-01-03 12:08:00', NULL),
(3962, 217, 75, 'left', 1, 38, NULL, '2026-01-03 12:08:00', NULL),
(3963, 217, 74, 'left', 1, 39, NULL, '2026-01-03 12:08:00', NULL),
(3964, 217, 73, 'left', 1, 40, NULL, '2026-01-03 12:08:00', NULL),
(3965, 217, 72, 'left', 1, 41, NULL, '2026-01-03 12:08:00', NULL),
(3966, 217, 71, 'left', 1, 42, NULL, '2026-01-03 12:08:00', NULL),
(3967, 217, 70, 'left', 1, 43, NULL, '2026-01-03 12:08:00', NULL),
(3968, 217, 69, 'left', 1, 44, NULL, '2026-01-03 12:08:00', NULL),
(3969, 217, 68, 'left', 1, 45, NULL, '2026-01-03 12:08:00', NULL),
(3970, 217, 67, 'left', 1, 46, NULL, '2026-01-03 12:08:00', NULL),
(3971, 217, 66, 'left', 1, 47, NULL, '2026-01-03 12:08:00', NULL),
(3972, 217, 65, 'left', 1, 48, NULL, '2026-01-03 12:08:00', NULL),
(3973, 217, 64, 'left', 1, 49, NULL, '2026-01-03 12:08:00', NULL),
(3974, 217, 63, 'left', 1, 50, NULL, '2026-01-03 12:08:00', NULL),
(3975, 217, 62, 'left', 1, 51, NULL, '2026-01-03 12:08:00', NULL),
(3976, 217, 38, 'left', 1, 52, NULL, '2026-01-03 12:08:00', NULL),
(3977, 217, 37, 'left', 1, 53, NULL, '2026-01-03 12:08:00', NULL),
(3978, 217, 36, 'left', 1, 54, NULL, '2026-01-03 12:08:00', NULL),
(3979, 217, 26, 'left', 1, 55, NULL, '2026-01-03 12:08:00', NULL),
(3980, 217, 24, 'right', 1, 56, NULL, '2026-01-03 12:08:00', NULL),
(3981, 217, 23, 'left', 1, 57, NULL, '2026-01-03 12:08:00', NULL),
(3982, 217, 22, 'left', 1, 58, NULL, '2026-01-03 12:08:00', NULL),
(3983, 217, 19, 'left', 1, 59, NULL, '2026-01-03 12:08:00', NULL),
(3984, 184, 78, 'right', 1, 1, NULL, '2026-01-05 07:37:03', NULL),
(3985, 184, 77, 'left', 1, 2, NULL, '2026-01-05 07:37:03', NULL),
(3986, 184, 76, 'left', 1, 3, NULL, '2026-01-05 07:37:03', NULL),
(3987, 184, 75, 'left', 1, 4, NULL, '2026-01-05 07:37:03', NULL),
(3988, 184, 74, 'left', 1, 5, NULL, '2026-01-05 07:37:03', NULL),
(3989, 184, 73, 'left', 1, 6, NULL, '2026-01-05 07:37:03', NULL),
(3990, 184, 72, 'left', 1, 7, NULL, '2026-01-05 07:37:03', NULL),
(3991, 184, 71, 'left', 1, 8, NULL, '2026-01-05 07:37:03', NULL),
(3992, 184, 70, 'left', 1, 9, NULL, '2026-01-05 07:37:03', NULL),
(3993, 184, 69, 'left', 1, 10, NULL, '2026-01-05 07:37:03', NULL),
(3994, 184, 68, 'left', 1, 11, NULL, '2026-01-05 07:37:03', NULL),
(3995, 184, 67, 'left', 1, 12, NULL, '2026-01-05 07:37:03', NULL),
(3996, 184, 66, 'left', 1, 13, NULL, '2026-01-05 07:37:03', NULL),
(3997, 184, 65, 'left', 1, 14, NULL, '2026-01-05 07:37:03', NULL),
(3998, 184, 64, 'left', 1, 15, NULL, '2026-01-05 07:37:03', NULL),
(3999, 184, 63, 'left', 1, 16, NULL, '2026-01-05 07:37:03', NULL),
(4000, 184, 62, 'left', 1, 17, NULL, '2026-01-05 07:37:03', NULL),
(4001, 184, 38, 'left', 1, 18, NULL, '2026-01-05 07:37:03', NULL),
(4002, 184, 37, 'left', 1, 19, NULL, '2026-01-05 07:37:03', NULL),
(4003, 184, 36, 'left', 1, 20, NULL, '2026-01-05 07:37:03', NULL),
(4004, 184, 26, 'left', 1, 21, NULL, '2026-01-05 07:37:03', NULL),
(4005, 184, 24, 'right', 1, 22, NULL, '2026-01-05 07:37:03', NULL),
(4006, 184, 23, 'left', 1, 23, NULL, '2026-01-05 07:37:03', NULL),
(4007, 184, 22, 'left', 1, 24, NULL, '2026-01-05 07:37:03', NULL),
(4008, 184, 19, 'left', 1, 25, NULL, '2026-01-05 07:37:03', NULL),
(4009, 146, 82, 'right', 1, 1, NULL, '2026-01-05 07:51:43', NULL),
(4010, 146, 81, 'left', 1, 2, NULL, '2026-01-05 07:51:43', NULL),
(4011, 146, 80, 'left', 1, 3, NULL, '2026-01-05 07:51:43', NULL),
(4012, 146, 79, 'left', 1, 4, NULL, '2026-01-05 07:51:43', NULL),
(4013, 146, 78, 'left', 1, 5, NULL, '2026-01-05 07:51:43', NULL),
(4014, 146, 77, 'left', 1, 6, NULL, '2026-01-05 07:51:43', NULL),
(4015, 146, 76, 'left', 1, 7, NULL, '2026-01-05 07:51:43', NULL),
(4016, 146, 75, 'left', 1, 8, NULL, '2026-01-05 07:51:43', NULL),
(4017, 146, 74, 'left', 1, 9, NULL, '2026-01-05 07:51:43', NULL),
(4018, 146, 73, 'left', 1, 10, NULL, '2026-01-05 07:51:43', NULL),
(4019, 146, 72, 'left', 1, 11, NULL, '2026-01-05 07:51:43', NULL),
(4020, 146, 71, 'left', 1, 12, NULL, '2026-01-05 07:51:43', NULL),
(4021, 146, 70, 'left', 1, 13, NULL, '2026-01-05 07:51:43', NULL),
(4022, 146, 69, 'left', 1, 14, NULL, '2026-01-05 07:51:43', NULL),
(4023, 146, 68, 'left', 1, 15, NULL, '2026-01-05 07:51:43', NULL),
(4024, 146, 67, 'left', 1, 16, NULL, '2026-01-05 07:51:43', NULL),
(4025, 146, 66, 'left', 1, 17, NULL, '2026-01-05 07:51:43', NULL),
(4026, 146, 65, 'left', 1, 18, NULL, '2026-01-05 07:51:43', NULL),
(4027, 146, 64, 'left', 1, 19, NULL, '2026-01-05 07:51:43', NULL),
(4028, 146, 63, 'left', 1, 20, NULL, '2026-01-05 07:51:43', NULL),
(4029, 146, 62, 'left', 1, 21, NULL, '2026-01-05 07:51:43', NULL),
(4030, 146, 38, 'left', 1, 22, NULL, '2026-01-05 07:51:43', NULL),
(4031, 146, 37, 'left', 1, 23, NULL, '2026-01-05 07:51:43', NULL),
(4032, 146, 36, 'left', 1, 24, NULL, '2026-01-05 07:51:43', NULL),
(4033, 146, 26, 'left', 1, 25, NULL, '2026-01-05 07:51:43', NULL),
(4034, 146, 24, 'right', 1, 26, NULL, '2026-01-05 07:51:43', NULL),
(4035, 146, 23, 'left', 1, 27, NULL, '2026-01-05 07:51:43', NULL),
(4036, 146, 22, 'left', 1, 28, NULL, '2026-01-05 07:51:43', NULL),
(4037, 146, 19, 'left', 1, 29, NULL, '2026-01-05 07:51:43', NULL),
(4038, 222, 146, 'right', 1, 1, NULL, '2026-01-05 08:30:43', NULL),
(4039, 222, 82, 'right', 1, 2, NULL, '2026-01-05 08:30:43', NULL),
(4040, 222, 81, 'left', 1, 3, NULL, '2026-01-05 08:30:43', NULL),
(4041, 222, 80, 'left', 1, 4, NULL, '2026-01-05 08:30:43', NULL),
(4042, 222, 79, 'left', 1, 5, NULL, '2026-01-05 08:30:43', NULL),
(4043, 222, 78, 'left', 1, 6, NULL, '2026-01-05 08:30:43', NULL),
(4044, 222, 77, 'left', 1, 7, NULL, '2026-01-05 08:30:43', NULL),
(4045, 222, 76, 'left', 1, 8, NULL, '2026-01-05 08:30:43', NULL),
(4046, 222, 75, 'left', 1, 9, NULL, '2026-01-05 08:30:43', NULL),
(4047, 222, 74, 'left', 1, 10, NULL, '2026-01-05 08:30:43', NULL),
(4048, 222, 73, 'left', 1, 11, NULL, '2026-01-05 08:30:43', NULL),
(4049, 222, 72, 'left', 1, 12, NULL, '2026-01-05 08:30:43', NULL),
(4050, 222, 71, 'left', 1, 13, NULL, '2026-01-05 08:30:43', NULL),
(4051, 222, 70, 'left', 1, 14, NULL, '2026-01-05 08:30:43', NULL),
(4052, 222, 69, 'left', 1, 15, NULL, '2026-01-05 08:30:43', NULL),
(4053, 222, 68, 'left', 1, 16, NULL, '2026-01-05 08:30:43', NULL),
(4054, 222, 67, 'left', 1, 17, NULL, '2026-01-05 08:30:43', NULL),
(4055, 222, 66, 'left', 1, 18, NULL, '2026-01-05 08:30:43', NULL),
(4056, 222, 65, 'left', 1, 19, NULL, '2026-01-05 08:30:43', NULL),
(4057, 222, 64, 'left', 1, 20, NULL, '2026-01-05 08:30:43', NULL),
(4058, 222, 63, 'left', 1, 21, NULL, '2026-01-05 08:30:43', NULL),
(4059, 222, 62, 'left', 1, 22, NULL, '2026-01-05 08:30:43', NULL),
(4060, 222, 38, 'left', 1, 23, NULL, '2026-01-05 08:30:43', NULL),
(4061, 222, 37, 'left', 1, 24, NULL, '2026-01-05 08:30:43', NULL),
(4062, 222, 36, 'left', 1, 25, NULL, '2026-01-05 08:30:43', NULL),
(4063, 222, 26, 'left', 1, 26, NULL, '2026-01-05 08:30:43', NULL),
(4064, 222, 24, 'right', 1, 27, NULL, '2026-01-05 08:30:43', NULL),
(4065, 222, 23, 'left', 1, 28, NULL, '2026-01-05 08:30:43', NULL),
(4066, 222, 22, 'left', 1, 29, NULL, '2026-01-05 08:30:43', NULL),
(4067, 222, 19, 'left', 1, 30, NULL, '2026-01-05 08:30:43', NULL),
(4068, 220, 146, 'left', 1, 1, NULL, '2026-01-05 08:30:49', NULL),
(4069, 220, 82, 'right', 1, 2, NULL, '2026-01-05 08:30:49', NULL),
(4070, 220, 81, 'left', 1, 3, NULL, '2026-01-05 08:30:49', NULL),
(4071, 220, 80, 'left', 1, 4, NULL, '2026-01-05 08:30:49', NULL),
(4072, 220, 79, 'left', 1, 5, NULL, '2026-01-05 08:30:49', NULL),
(4073, 220, 78, 'left', 1, 6, NULL, '2026-01-05 08:30:49', NULL),
(4074, 220, 77, 'left', 1, 7, NULL, '2026-01-05 08:30:49', NULL),
(4075, 220, 76, 'left', 1, 8, NULL, '2026-01-05 08:30:49', NULL),
(4076, 220, 75, 'left', 1, 9, NULL, '2026-01-05 08:30:49', NULL),
(4077, 220, 74, 'left', 1, 10, NULL, '2026-01-05 08:30:49', NULL),
(4078, 220, 73, 'left', 1, 11, NULL, '2026-01-05 08:30:49', NULL),
(4079, 220, 72, 'left', 1, 12, NULL, '2026-01-05 08:30:49', NULL),
(4080, 220, 71, 'left', 1, 13, NULL, '2026-01-05 08:30:49', NULL),
(4081, 220, 70, 'left', 1, 14, NULL, '2026-01-05 08:30:49', NULL),
(4082, 220, 69, 'left', 1, 15, NULL, '2026-01-05 08:30:49', NULL),
(4083, 220, 68, 'left', 1, 16, NULL, '2026-01-05 08:30:49', NULL),
(4084, 220, 67, 'left', 1, 17, NULL, '2026-01-05 08:30:49', NULL),
(4085, 220, 66, 'left', 1, 18, NULL, '2026-01-05 08:30:49', NULL),
(4086, 220, 65, 'left', 1, 19, NULL, '2026-01-05 08:30:49', NULL),
(4087, 220, 64, 'left', 1, 20, NULL, '2026-01-05 08:30:49', NULL),
(4088, 220, 63, 'left', 1, 21, NULL, '2026-01-05 08:30:49', NULL),
(4089, 220, 62, 'left', 1, 22, NULL, '2026-01-05 08:30:49', NULL),
(4090, 220, 38, 'left', 1, 23, NULL, '2026-01-05 08:30:49', NULL),
(4091, 220, 37, 'left', 1, 24, NULL, '2026-01-05 08:30:49', NULL),
(4092, 220, 36, 'left', 1, 25, NULL, '2026-01-05 08:30:49', NULL),
(4093, 220, 26, 'left', 1, 26, NULL, '2026-01-05 08:30:49', NULL),
(4094, 220, 24, 'right', 1, 27, NULL, '2026-01-05 08:30:49', NULL),
(4095, 220, 23, 'left', 1, 28, NULL, '2026-01-05 08:30:49', NULL),
(4096, 220, 22, 'left', 1, 29, NULL, '2026-01-05 08:30:49', NULL),
(4097, 220, 19, 'left', 1, 30, NULL, '2026-01-05 08:30:49', NULL),
(4098, 221, 220, 'left', 1, 1, NULL, '2026-01-05 08:32:55', NULL),
(4099, 221, 146, 'left', 1, 2, NULL, '2026-01-05 08:32:55', NULL),
(4100, 221, 82, 'right', 1, 3, NULL, '2026-01-05 08:32:55', NULL),
(4101, 221, 81, 'left', 1, 4, NULL, '2026-01-05 08:32:55', NULL),
(4102, 221, 80, 'left', 1, 5, NULL, '2026-01-05 08:32:55', NULL),
(4103, 221, 79, 'left', 1, 6, NULL, '2026-01-05 08:32:55', NULL),
(4104, 221, 78, 'left', 1, 7, NULL, '2026-01-05 08:32:55', NULL),
(4105, 221, 77, 'left', 1, 8, NULL, '2026-01-05 08:32:55', NULL),
(4106, 221, 76, 'left', 1, 9, NULL, '2026-01-05 08:32:55', NULL),
(4107, 221, 75, 'left', 1, 10, NULL, '2026-01-05 08:32:55', NULL),
(4108, 221, 74, 'left', 1, 11, NULL, '2026-01-05 08:32:55', NULL),
(4109, 221, 73, 'left', 1, 12, NULL, '2026-01-05 08:32:55', NULL),
(4110, 221, 72, 'left', 1, 13, NULL, '2026-01-05 08:32:55', NULL),
(4111, 221, 71, 'left', 1, 14, NULL, '2026-01-05 08:32:55', NULL),
(4112, 221, 70, 'left', 1, 15, NULL, '2026-01-05 08:32:55', NULL),
(4113, 221, 69, 'left', 1, 16, NULL, '2026-01-05 08:32:55', NULL),
(4114, 221, 68, 'left', 1, 17, NULL, '2026-01-05 08:32:55', NULL),
(4115, 221, 67, 'left', 1, 18, NULL, '2026-01-05 08:32:55', NULL),
(4116, 221, 66, 'left', 1, 19, NULL, '2026-01-05 08:32:55', NULL),
(4117, 221, 65, 'left', 1, 20, NULL, '2026-01-05 08:32:55', NULL),
(4118, 221, 64, 'left', 1, 21, NULL, '2026-01-05 08:32:55', NULL),
(4119, 221, 63, 'left', 1, 22, NULL, '2026-01-05 08:32:55', NULL),
(4120, 221, 62, 'left', 1, 23, NULL, '2026-01-05 08:32:55', NULL),
(4121, 221, 38, 'left', 1, 24, NULL, '2026-01-05 08:32:55', NULL),
(4122, 221, 37, 'left', 1, 25, NULL, '2026-01-05 08:32:55', NULL),
(4123, 221, 36, 'left', 1, 26, NULL, '2026-01-05 08:32:55', NULL),
(4124, 221, 26, 'left', 1, 27, NULL, '2026-01-05 08:32:55', NULL),
(4125, 221, 24, 'right', 1, 28, NULL, '2026-01-05 08:32:55', NULL),
(4126, 221, 23, 'left', 1, 29, NULL, '2026-01-05 08:32:55', NULL),
(4127, 221, 22, 'left', 1, 30, NULL, '2026-01-05 08:32:55', NULL),
(4128, 221, 19, 'left', 1, 31, NULL, '2026-01-05 08:32:55', NULL),
(4129, 223, 220, 'right', 1, 1, NULL, '2026-01-05 08:58:45', NULL),
(4130, 223, 146, 'left', 1, 2, NULL, '2026-01-05 08:58:45', NULL),
(4131, 223, 82, 'right', 1, 3, NULL, '2026-01-05 08:58:45', NULL),
(4132, 223, 81, 'left', 1, 4, NULL, '2026-01-05 08:58:45', NULL),
(4133, 223, 80, 'left', 1, 5, NULL, '2026-01-05 08:58:45', NULL),
(4134, 223, 79, 'left', 1, 6, NULL, '2026-01-05 08:58:45', NULL),
(4135, 223, 78, 'left', 1, 7, NULL, '2026-01-05 08:58:45', NULL),
(4136, 223, 77, 'left', 1, 8, NULL, '2026-01-05 08:58:45', NULL),
(4137, 223, 76, 'left', 1, 9, NULL, '2026-01-05 08:58:45', NULL),
(4138, 223, 75, 'left', 1, 10, NULL, '2026-01-05 08:58:45', NULL),
(4139, 223, 74, 'left', 1, 11, NULL, '2026-01-05 08:58:45', NULL),
(4140, 223, 73, 'left', 1, 12, NULL, '2026-01-05 08:58:45', NULL),
(4141, 223, 72, 'left', 1, 13, NULL, '2026-01-05 08:58:45', NULL),
(4142, 223, 71, 'left', 1, 14, NULL, '2026-01-05 08:58:45', NULL),
(4143, 223, 70, 'left', 1, 15, NULL, '2026-01-05 08:58:45', NULL),
(4144, 223, 69, 'left', 1, 16, NULL, '2026-01-05 08:58:45', NULL),
(4145, 223, 68, 'left', 1, 17, NULL, '2026-01-05 08:58:45', NULL),
(4146, 223, 67, 'left', 1, 18, NULL, '2026-01-05 08:58:45', NULL),
(4147, 223, 66, 'left', 1, 19, NULL, '2026-01-05 08:58:45', NULL),
(4148, 223, 65, 'left', 1, 20, NULL, '2026-01-05 08:58:45', NULL),
(4149, 223, 64, 'left', 1, 21, NULL, '2026-01-05 08:58:45', NULL),
(4150, 223, 63, 'left', 1, 22, NULL, '2026-01-05 08:58:45', NULL),
(4151, 223, 62, 'left', 1, 23, NULL, '2026-01-05 08:58:45', NULL),
(4152, 223, 38, 'left', 1, 24, NULL, '2026-01-05 08:58:45', NULL),
(4153, 223, 37, 'left', 1, 25, NULL, '2026-01-05 08:58:45', NULL),
(4154, 223, 36, 'left', 1, 26, NULL, '2026-01-05 08:58:45', NULL),
(4155, 223, 26, 'left', 1, 27, NULL, '2026-01-05 08:58:45', NULL),
(4156, 223, 24, 'right', 1, 28, NULL, '2026-01-05 08:58:45', NULL),
(4157, 223, 23, 'left', 1, 29, NULL, '2026-01-05 08:58:45', NULL),
(4158, 223, 22, 'left', 1, 30, NULL, '2026-01-05 08:58:45', NULL),
(4159, 223, 19, 'left', 1, 31, NULL, '2026-01-05 08:58:45', NULL),
(4160, 224, 222, 'left', 1, 1, NULL, '2026-01-05 09:15:55', NULL),
(4161, 224, 146, 'right', 1, 2, NULL, '2026-01-05 09:15:55', NULL),
(4162, 224, 82, 'right', 1, 3, NULL, '2026-01-05 09:15:55', NULL),
(4163, 224, 81, 'left', 1, 4, NULL, '2026-01-05 09:15:55', NULL),
(4164, 224, 80, 'left', 1, 5, NULL, '2026-01-05 09:15:55', NULL),
(4165, 224, 79, 'left', 1, 6, NULL, '2026-01-05 09:15:55', NULL),
(4166, 224, 78, 'left', 1, 7, NULL, '2026-01-05 09:15:55', NULL),
(4167, 224, 77, 'left', 1, 8, NULL, '2026-01-05 09:15:55', NULL),
(4168, 224, 76, 'left', 1, 9, NULL, '2026-01-05 09:15:55', NULL),
(4169, 224, 75, 'left', 1, 10, NULL, '2026-01-05 09:15:55', NULL),
(4170, 224, 74, 'left', 1, 11, NULL, '2026-01-05 09:15:55', NULL),
(4171, 224, 73, 'left', 1, 12, NULL, '2026-01-05 09:15:55', NULL),
(4172, 224, 72, 'left', 1, 13, NULL, '2026-01-05 09:15:55', NULL),
(4173, 224, 71, 'left', 1, 14, NULL, '2026-01-05 09:15:55', NULL),
(4174, 224, 70, 'left', 1, 15, NULL, '2026-01-05 09:15:55', NULL),
(4175, 224, 69, 'left', 1, 16, NULL, '2026-01-05 09:15:55', NULL),
(4176, 224, 68, 'left', 1, 17, NULL, '2026-01-05 09:15:55', NULL),
(4177, 224, 67, 'left', 1, 18, NULL, '2026-01-05 09:15:55', NULL),
(4178, 224, 66, 'left', 1, 19, NULL, '2026-01-05 09:15:55', NULL),
(4179, 224, 65, 'left', 1, 20, NULL, '2026-01-05 09:15:55', NULL),
(4180, 224, 64, 'left', 1, 21, NULL, '2026-01-05 09:15:55', NULL),
(4181, 224, 63, 'left', 1, 22, NULL, '2026-01-05 09:15:55', NULL),
(4182, 224, 62, 'left', 1, 23, NULL, '2026-01-05 09:15:55', NULL),
(4183, 224, 38, 'left', 1, 24, NULL, '2026-01-05 09:15:55', NULL),
(4184, 224, 37, 'left', 1, 25, NULL, '2026-01-05 09:15:55', NULL),
(4185, 224, 36, 'left', 1, 26, NULL, '2026-01-05 09:15:55', NULL),
(4186, 224, 26, 'left', 1, 27, NULL, '2026-01-05 09:15:55', NULL),
(4187, 224, 24, 'right', 1, 28, NULL, '2026-01-05 09:15:55', NULL),
(4188, 224, 23, 'left', 1, 29, NULL, '2026-01-05 09:15:55', NULL),
(4189, 224, 22, 'left', 1, 30, NULL, '2026-01-05 09:15:55', NULL),
(4190, 224, 19, 'left', 1, 31, NULL, '2026-01-05 09:15:55', NULL),
(4191, 225, 222, 'right', 1, 1, NULL, '2026-01-05 09:18:27', NULL),
(4192, 225, 146, 'right', 1, 2, NULL, '2026-01-05 09:18:27', NULL),
(4193, 225, 82, 'right', 1, 3, NULL, '2026-01-05 09:18:27', NULL),
(4194, 225, 81, 'left', 1, 4, NULL, '2026-01-05 09:18:27', NULL),
(4195, 225, 80, 'left', 1, 5, NULL, '2026-01-05 09:18:27', NULL),
(4196, 225, 79, 'left', 1, 6, NULL, '2026-01-05 09:18:27', NULL),
(4197, 225, 78, 'left', 1, 7, NULL, '2026-01-05 09:18:27', NULL),
(4198, 225, 77, 'left', 1, 8, NULL, '2026-01-05 09:18:27', NULL),
(4199, 225, 76, 'left', 1, 9, NULL, '2026-01-05 09:18:27', NULL),
(4200, 225, 75, 'left', 1, 10, NULL, '2026-01-05 09:18:27', NULL),
(4201, 225, 74, 'left', 1, 11, NULL, '2026-01-05 09:18:27', NULL),
(4202, 225, 73, 'left', 1, 12, NULL, '2026-01-05 09:18:27', NULL),
(4203, 225, 72, 'left', 1, 13, NULL, '2026-01-05 09:18:27', NULL),
(4204, 225, 71, 'left', 1, 14, NULL, '2026-01-05 09:18:27', NULL),
(4205, 225, 70, 'left', 1, 15, NULL, '2026-01-05 09:18:27', NULL),
(4206, 225, 69, 'left', 1, 16, NULL, '2026-01-05 09:18:27', NULL),
(4207, 225, 68, 'left', 1, 17, NULL, '2026-01-05 09:18:27', NULL),
(4208, 225, 67, 'left', 1, 18, NULL, '2026-01-05 09:18:27', NULL),
(4209, 225, 66, 'left', 1, 19, NULL, '2026-01-05 09:18:27', NULL),
(4210, 225, 65, 'left', 1, 20, NULL, '2026-01-05 09:18:27', NULL),
(4211, 225, 64, 'left', 1, 21, NULL, '2026-01-05 09:18:27', NULL),
(4212, 225, 63, 'left', 1, 22, NULL, '2026-01-05 09:18:27', NULL),
(4213, 225, 62, 'left', 1, 23, NULL, '2026-01-05 09:18:27', NULL),
(4214, 225, 38, 'left', 1, 24, NULL, '2026-01-05 09:18:27', NULL),
(4215, 225, 37, 'left', 1, 25, NULL, '2026-01-05 09:18:27', NULL),
(4216, 225, 36, 'left', 1, 26, NULL, '2026-01-05 09:18:27', NULL),
(4217, 225, 26, 'left', 1, 27, NULL, '2026-01-05 09:18:27', NULL),
(4218, 225, 24, 'right', 1, 28, NULL, '2026-01-05 09:18:27', NULL),
(4219, 225, 23, 'left', 1, 29, NULL, '2026-01-05 09:18:27', NULL),
(4220, 225, 22, 'left', 1, 30, NULL, '2026-01-05 09:18:27', NULL),
(4221, 225, 19, 'left', 1, 31, NULL, '2026-01-05 09:18:27', NULL),
(4222, 226, 192, 'right', 1, 1, NULL, '2026-01-07 11:29:05', NULL),
(4223, 226, 190, 'left', 1, 2, NULL, '2026-01-07 11:29:05', NULL),
(4224, 226, 118, 'right', 1, 3, NULL, '2026-01-07 11:29:05', NULL),
(4225, 226, 117, 'right', 1, 4, NULL, '2026-01-07 11:29:05', NULL),
(4226, 226, 74, 'right', 1, 5, NULL, '2026-01-07 11:29:05', NULL),
(4227, 226, 73, 'left', 1, 6, NULL, '2026-01-07 11:29:05', NULL),
(4228, 226, 72, 'left', 1, 7, NULL, '2026-01-07 11:29:05', NULL),
(4229, 226, 71, 'left', 1, 8, NULL, '2026-01-07 11:29:05', NULL),
(4230, 226, 70, 'left', 1, 9, NULL, '2026-01-07 11:29:05', NULL),
(4231, 226, 69, 'left', 1, 10, NULL, '2026-01-07 11:29:05', NULL),
(4232, 226, 68, 'left', 1, 11, NULL, '2026-01-07 11:29:05', NULL),
(4233, 226, 67, 'left', 1, 12, NULL, '2026-01-07 11:29:05', NULL),
(4234, 226, 66, 'left', 1, 13, NULL, '2026-01-07 11:29:05', NULL),
(4235, 226, 65, 'left', 1, 14, NULL, '2026-01-07 11:29:05', NULL),
(4236, 226, 64, 'left', 1, 15, NULL, '2026-01-07 11:29:05', NULL),
(4237, 226, 63, 'left', 1, 16, NULL, '2026-01-07 11:29:05', NULL),
(4238, 226, 62, 'left', 1, 17, NULL, '2026-01-07 11:29:05', NULL),
(4239, 226, 38, 'left', 1, 18, NULL, '2026-01-07 11:29:05', NULL),
(4240, 226, 37, 'left', 1, 19, NULL, '2026-01-07 11:29:05', NULL),
(4241, 226, 36, 'left', 1, 20, NULL, '2026-01-07 11:29:05', NULL),
(4242, 226, 26, 'left', 1, 21, NULL, '2026-01-07 11:29:05', NULL),
(4243, 226, 24, 'right', 1, 22, NULL, '2026-01-07 11:29:05', NULL),
(4244, 226, 23, 'left', 1, 23, NULL, '2026-01-07 11:29:05', NULL),
(4245, 226, 22, 'left', 1, 24, NULL, '2026-01-07 11:29:05', NULL),
(4246, 226, 19, 'left', 1, 25, NULL, '2026-01-07 11:29:05', NULL),
(4247, 227, 191, 'left', 1, 1, NULL, '2026-01-07 13:35:35', NULL),
(4248, 227, 190, 'right', 1, 2, NULL, '2026-01-07 13:35:35', NULL),
(4249, 227, 118, 'right', 1, 3, NULL, '2026-01-07 13:35:35', NULL),
(4250, 227, 117, 'right', 1, 4, NULL, '2026-01-07 13:35:35', NULL),
(4251, 227, 74, 'right', 1, 5, NULL, '2026-01-07 13:35:35', NULL),
(4252, 227, 73, 'left', 1, 6, NULL, '2026-01-07 13:35:35', NULL),
(4253, 227, 72, 'left', 1, 7, NULL, '2026-01-07 13:35:35', NULL),
(4254, 227, 71, 'left', 1, 8, NULL, '2026-01-07 13:35:35', NULL),
(4255, 227, 70, 'left', 1, 9, NULL, '2026-01-07 13:35:35', NULL),
(4256, 227, 69, 'left', 1, 10, NULL, '2026-01-07 13:35:35', NULL),
(4257, 227, 68, 'left', 1, 11, NULL, '2026-01-07 13:35:35', NULL),
(4258, 227, 67, 'left', 1, 12, NULL, '2026-01-07 13:35:35', NULL),
(4259, 227, 66, 'left', 1, 13, NULL, '2026-01-07 13:35:35', NULL),
(4260, 227, 65, 'left', 1, 14, NULL, '2026-01-07 13:35:35', NULL),
(4261, 227, 64, 'left', 1, 15, NULL, '2026-01-07 13:35:35', NULL),
(4262, 227, 63, 'left', 1, 16, NULL, '2026-01-07 13:35:35', NULL),
(4263, 227, 62, 'left', 1, 17, NULL, '2026-01-07 13:35:35', NULL),
(4264, 227, 38, 'left', 1, 18, NULL, '2026-01-07 13:35:35', NULL),
(4265, 227, 37, 'left', 1, 19, NULL, '2026-01-07 13:35:35', NULL),
(4266, 227, 36, 'left', 1, 20, NULL, '2026-01-07 13:35:35', NULL),
(4267, 227, 26, 'left', 1, 21, NULL, '2026-01-07 13:35:35', NULL),
(4268, 227, 24, 'right', 1, 22, NULL, '2026-01-07 13:35:35', NULL),
(4269, 227, 23, 'left', 1, 23, NULL, '2026-01-07 13:35:35', NULL),
(4270, 227, 22, 'left', 1, 24, NULL, '2026-01-07 13:35:35', NULL),
(4271, 227, 19, 'left', 1, 25, NULL, '2026-01-07 13:35:35', NULL),
(4272, 143, 121, 'right', 1, 1, NULL, '2026-01-08 05:39:31', NULL),
(4273, 143, 80, 'right', 1, 2, NULL, '2026-01-08 05:39:31', NULL),
(4274, 143, 79, 'left', 1, 3, NULL, '2026-01-08 05:39:31', NULL),
(4275, 143, 78, 'left', 1, 4, NULL, '2026-01-08 05:39:31', NULL),
(4276, 143, 77, 'left', 1, 5, NULL, '2026-01-08 05:39:31', NULL),
(4277, 143, 76, 'left', 1, 6, NULL, '2026-01-08 05:39:31', NULL),
(4278, 143, 75, 'left', 1, 7, NULL, '2026-01-08 05:39:31', NULL),
(4279, 143, 74, 'left', 1, 8, NULL, '2026-01-08 05:39:31', NULL),
(4280, 143, 73, 'left', 1, 9, NULL, '2026-01-08 05:39:31', NULL),
(4281, 143, 72, 'left', 1, 10, NULL, '2026-01-08 05:39:31', NULL),
(4282, 143, 71, 'left', 1, 11, NULL, '2026-01-08 05:39:31', NULL),
(4283, 143, 70, 'left', 1, 12, NULL, '2026-01-08 05:39:31', NULL),
(4284, 143, 69, 'left', 1, 13, NULL, '2026-01-08 05:39:31', NULL),
(4285, 143, 68, 'left', 1, 14, NULL, '2026-01-08 05:39:31', NULL),
(4286, 143, 67, 'left', 1, 15, NULL, '2026-01-08 05:39:31', NULL),
(4287, 143, 66, 'left', 1, 16, NULL, '2026-01-08 05:39:31', NULL),
(4288, 143, 65, 'left', 1, 17, NULL, '2026-01-08 05:39:31', NULL),
(4289, 143, 64, 'left', 1, 18, NULL, '2026-01-08 05:39:31', NULL),
(4290, 143, 63, 'left', 1, 19, NULL, '2026-01-08 05:39:31', NULL),
(4291, 143, 62, 'left', 1, 20, NULL, '2026-01-08 05:39:31', NULL),
(4292, 143, 38, 'left', 1, 21, NULL, '2026-01-08 05:39:31', NULL),
(4293, 143, 37, 'left', 1, 22, NULL, '2026-01-08 05:39:31', NULL),
(4294, 143, 36, 'left', 1, 23, NULL, '2026-01-08 05:39:31', NULL),
(4295, 143, 26, 'left', 1, 24, NULL, '2026-01-08 05:39:31', NULL),
(4296, 143, 24, 'right', 1, 25, NULL, '2026-01-08 05:39:31', NULL),
(4297, 143, 23, 'left', 1, 26, NULL, '2026-01-08 05:39:31', NULL),
(4298, 143, 22, 'left', 1, 27, NULL, '2026-01-08 05:39:31', NULL),
(4299, 143, 19, 'left', 1, 28, NULL, '2026-01-08 05:39:31', NULL),
(4300, 229, 216, 'left', 1, 1, NULL, '2026-01-08 09:01:11', NULL),
(4301, 229, 214, 'left', 1, 2, NULL, '2026-01-08 09:01:11', NULL),
(4302, 229, 212, 'left', 1, 3, NULL, '2026-01-08 09:01:11', NULL),
(4303, 229, 211, 'left', 1, 4, NULL, '2026-01-08 09:01:11', NULL),
(4304, 229, 208, 'left', 1, 5, NULL, '2026-01-08 09:01:11', NULL),
(4305, 229, 207, 'left', 1, 6, NULL, '2026-01-08 09:01:11', NULL),
(4306, 229, 200, 'left', 1, 7, NULL, '2026-01-08 09:01:11', NULL),
(4307, 229, 199, 'left', 1, 8, NULL, '2026-01-08 09:01:11', NULL),
(4308, 229, 198, 'left', 1, 9, NULL, '2026-01-08 09:01:11', NULL),
(4309, 229, 94, 'left', 1, 10, NULL, '2026-01-08 09:01:11', NULL),
(4310, 229, 93, 'left', 1, 11, NULL, '2026-01-08 09:01:11', NULL),
(4311, 229, 92, 'left', 1, 12, NULL, '2026-01-08 09:01:11', NULL),
(4312, 229, 114, 'left', 1, 13, NULL, '2026-01-08 09:01:11', NULL),
(4313, 229, 91, 'left', 1, 14, NULL, '2026-01-08 09:01:11', NULL),
(4314, 229, 90, 'left', 1, 15, NULL, '2026-01-08 09:01:11', NULL),
(4315, 229, 89, 'left', 1, 16, NULL, '2026-01-08 09:01:11', NULL),
(4316, 229, 113, 'left', 1, 17, NULL, '2026-01-08 09:01:11', NULL),
(4317, 229, 112, 'left', 1, 18, NULL, '2026-01-08 09:01:11', NULL),
(4318, 229, 111, 'left', 1, 19, NULL, '2026-01-08 09:01:11', NULL),
(4319, 229, 110, 'left', 1, 20, NULL, '2026-01-08 09:01:11', NULL),
(4320, 229, 109, 'left', 1, 21, NULL, '2026-01-08 09:01:11', NULL),
(4321, 229, 108, 'left', 1, 22, NULL, '2026-01-08 09:01:11', NULL),
(4322, 229, 107, 'left', 1, 23, NULL, '2026-01-08 09:01:11', NULL),
(4323, 229, 106, 'left', 1, 24, NULL, '2026-01-08 09:01:11', NULL),
(4324, 229, 105, 'left', 1, 25, NULL, '2026-01-08 09:01:11', NULL),
(4325, 229, 88, 'left', 1, 26, NULL, '2026-01-08 09:01:11', NULL),
(4326, 229, 87, 'left', 1, 27, NULL, '2026-01-08 09:01:11', NULL),
(4327, 229, 86, 'left', 1, 28, NULL, '2026-01-08 09:01:11', NULL),
(4328, 229, 85, 'left', 1, 29, NULL, '2026-01-08 09:01:11', NULL),
(4329, 229, 84, 'left', 1, 30, NULL, '2026-01-08 09:01:11', NULL),
(4330, 229, 83, 'left', 1, 31, NULL, '2026-01-08 09:01:11', NULL),
(4331, 229, 82, 'left', 1, 32, NULL, '2026-01-08 09:01:11', NULL),
(4332, 229, 81, 'left', 1, 33, NULL, '2026-01-08 09:01:11', NULL),
(4333, 229, 80, 'left', 1, 34, NULL, '2026-01-08 09:01:11', NULL),
(4334, 229, 79, 'left', 1, 35, NULL, '2026-01-08 09:01:11', NULL),
(4335, 229, 78, 'left', 1, 36, NULL, '2026-01-08 09:01:11', NULL),
(4336, 229, 77, 'left', 1, 37, NULL, '2026-01-08 09:01:11', NULL),
(4337, 229, 76, 'left', 1, 38, NULL, '2026-01-08 09:01:11', NULL),
(4338, 229, 75, 'left', 1, 39, NULL, '2026-01-08 09:01:11', NULL),
(4339, 229, 74, 'left', 1, 40, NULL, '2026-01-08 09:01:11', NULL),
(4340, 229, 73, 'left', 1, 41, NULL, '2026-01-08 09:01:11', NULL),
(4341, 229, 72, 'left', 1, 42, NULL, '2026-01-08 09:01:11', NULL),
(4342, 229, 71, 'left', 1, 43, NULL, '2026-01-08 09:01:11', NULL),
(4343, 229, 70, 'left', 1, 44, NULL, '2026-01-08 09:01:11', NULL),
(4344, 229, 69, 'left', 1, 45, NULL, '2026-01-08 09:01:11', NULL),
(4345, 229, 68, 'left', 1, 46, NULL, '2026-01-08 09:01:11', NULL),
(4346, 229, 67, 'left', 1, 47, NULL, '2026-01-08 09:01:11', NULL),
(4347, 229, 66, 'left', 1, 48, NULL, '2026-01-08 09:01:11', NULL),
(4348, 229, 65, 'left', 1, 49, NULL, '2026-01-08 09:01:11', NULL),
(4349, 229, 64, 'left', 1, 50, NULL, '2026-01-08 09:01:11', NULL),
(4350, 229, 63, 'left', 1, 51, NULL, '2026-01-08 09:01:11', NULL),
(4351, 229, 62, 'left', 1, 52, NULL, '2026-01-08 09:01:11', NULL),
(4352, 229, 38, 'left', 1, 53, NULL, '2026-01-08 09:01:11', NULL),
(4353, 229, 37, 'left', 1, 54, NULL, '2026-01-08 09:01:11', NULL),
(4354, 229, 36, 'left', 1, 55, NULL, '2026-01-08 09:01:11', NULL),
(4355, 229, 26, 'left', 1, 56, NULL, '2026-01-08 09:01:11', NULL),
(4356, 229, 24, 'right', 1, 57, NULL, '2026-01-08 09:01:11', NULL),
(4357, 229, 23, 'left', 1, 58, NULL, '2026-01-08 09:01:11', NULL),
(4358, 229, 22, 'left', 1, 59, NULL, '2026-01-08 09:01:11', NULL),
(4359, 229, 19, 'left', 1, 60, NULL, '2026-01-08 09:01:11', NULL),
(4360, 231, 229, 'left', 1, 1, NULL, '2026-01-08 09:08:50', NULL),
(4361, 231, 216, 'left', 1, 2, NULL, '2026-01-08 09:08:50', NULL),
(4362, 231, 214, 'left', 1, 3, NULL, '2026-01-08 09:08:50', NULL),
(4363, 231, 212, 'left', 1, 4, NULL, '2026-01-08 09:08:50', NULL),
(4364, 231, 211, 'left', 1, 5, NULL, '2026-01-08 09:08:50', NULL),
(4365, 231, 208, 'left', 1, 6, NULL, '2026-01-08 09:08:50', NULL),
(4366, 231, 207, 'left', 1, 7, NULL, '2026-01-08 09:08:50', NULL),
(4367, 231, 200, 'left', 1, 8, NULL, '2026-01-08 09:08:50', NULL),
(4368, 231, 199, 'left', 1, 9, NULL, '2026-01-08 09:08:50', NULL),
(4369, 231, 198, 'left', 1, 10, NULL, '2026-01-08 09:08:50', NULL),
(4370, 231, 94, 'left', 1, 11, NULL, '2026-01-08 09:08:50', NULL),
(4371, 231, 93, 'left', 1, 12, NULL, '2026-01-08 09:08:50', NULL),
(4372, 231, 92, 'left', 1, 13, NULL, '2026-01-08 09:08:50', NULL),
(4373, 231, 114, 'left', 1, 14, NULL, '2026-01-08 09:08:50', NULL),
(4374, 231, 91, 'left', 1, 15, NULL, '2026-01-08 09:08:50', NULL),
(4375, 231, 90, 'left', 1, 16, NULL, '2026-01-08 09:08:50', NULL),
(4376, 231, 89, 'left', 1, 17, NULL, '2026-01-08 09:08:50', NULL),
(4377, 231, 113, 'left', 1, 18, NULL, '2026-01-08 09:08:50', NULL),
(4378, 231, 112, 'left', 1, 19, NULL, '2026-01-08 09:08:50', NULL),
(4379, 231, 111, 'left', 1, 20, NULL, '2026-01-08 09:08:50', NULL),
(4380, 231, 110, 'left', 1, 21, NULL, '2026-01-08 09:08:50', NULL),
(4381, 231, 109, 'left', 1, 22, NULL, '2026-01-08 09:08:50', NULL),
(4382, 231, 108, 'left', 1, 23, NULL, '2026-01-08 09:08:50', NULL),
(4383, 231, 107, 'left', 1, 24, NULL, '2026-01-08 09:08:50', NULL),
(4384, 231, 106, 'left', 1, 25, NULL, '2026-01-08 09:08:50', NULL),
(4385, 231, 105, 'left', 1, 26, NULL, '2026-01-08 09:08:50', NULL),
(4386, 231, 88, 'left', 1, 27, NULL, '2026-01-08 09:08:50', NULL),
(4387, 231, 87, 'left', 1, 28, NULL, '2026-01-08 09:08:50', NULL),
(4388, 231, 86, 'left', 1, 29, NULL, '2026-01-08 09:08:50', NULL),
(4389, 231, 85, 'left', 1, 30, NULL, '2026-01-08 09:08:50', NULL),
(4390, 231, 84, 'left', 1, 31, NULL, '2026-01-08 09:08:50', NULL),
(4391, 231, 83, 'left', 1, 32, NULL, '2026-01-08 09:08:50', NULL),
(4392, 231, 82, 'left', 1, 33, NULL, '2026-01-08 09:08:50', NULL),
(4393, 231, 81, 'left', 1, 34, NULL, '2026-01-08 09:08:50', NULL),
(4394, 231, 80, 'left', 1, 35, NULL, '2026-01-08 09:08:50', NULL),
(4395, 231, 79, 'left', 1, 36, NULL, '2026-01-08 09:08:50', NULL),
(4396, 231, 78, 'left', 1, 37, NULL, '2026-01-08 09:08:50', NULL),
(4397, 231, 77, 'left', 1, 38, NULL, '2026-01-08 09:08:50', NULL),
(4398, 231, 76, 'left', 1, 39, NULL, '2026-01-08 09:08:50', NULL),
(4399, 231, 75, 'left', 1, 40, NULL, '2026-01-08 09:08:50', NULL),
(4400, 231, 74, 'left', 1, 41, NULL, '2026-01-08 09:08:50', NULL),
(4401, 231, 73, 'left', 1, 42, NULL, '2026-01-08 09:08:50', NULL),
(4402, 231, 72, 'left', 1, 43, NULL, '2026-01-08 09:08:50', NULL),
(4403, 231, 71, 'left', 1, 44, NULL, '2026-01-08 09:08:50', NULL),
(4404, 231, 70, 'left', 1, 45, NULL, '2026-01-08 09:08:50', NULL),
(4405, 231, 69, 'left', 1, 46, NULL, '2026-01-08 09:08:50', NULL),
(4406, 231, 68, 'left', 1, 47, NULL, '2026-01-08 09:08:50', NULL),
(4407, 231, 67, 'left', 1, 48, NULL, '2026-01-08 09:08:50', NULL),
(4408, 231, 66, 'left', 1, 49, NULL, '2026-01-08 09:08:50', NULL),
(4409, 231, 65, 'left', 1, 50, NULL, '2026-01-08 09:08:50', NULL),
(4410, 231, 64, 'left', 1, 51, NULL, '2026-01-08 09:08:50', NULL),
(4411, 231, 63, 'left', 1, 52, NULL, '2026-01-08 09:08:50', NULL),
(4412, 231, 62, 'left', 1, 53, NULL, '2026-01-08 09:08:50', NULL),
(4413, 231, 38, 'left', 1, 54, NULL, '2026-01-08 09:08:50', NULL),
(4414, 231, 37, 'left', 1, 55, NULL, '2026-01-08 09:08:50', NULL),
(4415, 231, 36, 'left', 1, 56, NULL, '2026-01-08 09:08:50', NULL),
(4416, 231, 26, 'left', 1, 57, NULL, '2026-01-08 09:08:50', NULL),
(4417, 231, 24, 'right', 1, 58, NULL, '2026-01-08 09:08:50', NULL),
(4418, 231, 23, 'left', 1, 59, NULL, '2026-01-08 09:08:50', NULL),
(4419, 231, 22, 'left', 1, 60, NULL, '2026-01-08 09:08:50', NULL),
(4420, 231, 19, 'left', 1, 61, NULL, '2026-01-08 09:08:50', NULL),
(4421, 232, 229, 'right', 1, 1, NULL, '2026-01-08 09:08:56', NULL),
(4422, 232, 216, 'left', 1, 2, NULL, '2026-01-08 09:08:56', NULL),
(4423, 232, 214, 'left', 1, 3, NULL, '2026-01-08 09:08:56', NULL),
(4424, 232, 212, 'left', 1, 4, NULL, '2026-01-08 09:08:56', NULL),
(4425, 232, 211, 'left', 1, 5, NULL, '2026-01-08 09:08:56', NULL),
(4426, 232, 208, 'left', 1, 6, NULL, '2026-01-08 09:08:56', NULL),
(4427, 232, 207, 'left', 1, 7, NULL, '2026-01-08 09:08:56', NULL),
(4428, 232, 200, 'left', 1, 8, NULL, '2026-01-08 09:08:56', NULL),
(4429, 232, 199, 'left', 1, 9, NULL, '2026-01-08 09:08:56', NULL),
(4430, 232, 198, 'left', 1, 10, NULL, '2026-01-08 09:08:56', NULL),
(4431, 232, 94, 'left', 1, 11, NULL, '2026-01-08 09:08:56', NULL),
(4432, 232, 93, 'left', 1, 12, NULL, '2026-01-08 09:08:56', NULL),
(4433, 232, 92, 'left', 1, 13, NULL, '2026-01-08 09:08:56', NULL),
(4434, 232, 114, 'left', 1, 14, NULL, '2026-01-08 09:08:56', NULL),
(4435, 232, 91, 'left', 1, 15, NULL, '2026-01-08 09:08:56', NULL),
(4436, 232, 90, 'left', 1, 16, NULL, '2026-01-08 09:08:56', NULL),
(4437, 232, 89, 'left', 1, 17, NULL, '2026-01-08 09:08:56', NULL),
(4438, 232, 113, 'left', 1, 18, NULL, '2026-01-08 09:08:56', NULL),
(4439, 232, 112, 'left', 1, 19, NULL, '2026-01-08 09:08:56', NULL),
(4440, 232, 111, 'left', 1, 20, NULL, '2026-01-08 09:08:56', NULL),
(4441, 232, 110, 'left', 1, 21, NULL, '2026-01-08 09:08:56', NULL),
(4442, 232, 109, 'left', 1, 22, NULL, '2026-01-08 09:08:56', NULL),
(4443, 232, 108, 'left', 1, 23, NULL, '2026-01-08 09:08:56', NULL),
(4444, 232, 107, 'left', 1, 24, NULL, '2026-01-08 09:08:56', NULL),
(4445, 232, 106, 'left', 1, 25, NULL, '2026-01-08 09:08:56', NULL),
(4446, 232, 105, 'left', 1, 26, NULL, '2026-01-08 09:08:56', NULL),
(4447, 232, 88, 'left', 1, 27, NULL, '2026-01-08 09:08:56', NULL),
(4448, 232, 87, 'left', 1, 28, NULL, '2026-01-08 09:08:56', NULL),
(4449, 232, 86, 'left', 1, 29, NULL, '2026-01-08 09:08:56', NULL),
(4450, 232, 85, 'left', 1, 30, NULL, '2026-01-08 09:08:56', NULL),
(4451, 232, 84, 'left', 1, 31, NULL, '2026-01-08 09:08:56', NULL),
(4452, 232, 83, 'left', 1, 32, NULL, '2026-01-08 09:08:56', NULL),
(4453, 232, 82, 'left', 1, 33, NULL, '2026-01-08 09:08:56', NULL),
(4454, 232, 81, 'left', 1, 34, NULL, '2026-01-08 09:08:56', NULL),
(4455, 232, 80, 'left', 1, 35, NULL, '2026-01-08 09:08:56', NULL),
(4456, 232, 79, 'left', 1, 36, NULL, '2026-01-08 09:08:56', NULL),
(4457, 232, 78, 'left', 1, 37, NULL, '2026-01-08 09:08:56', NULL),
(4458, 232, 77, 'left', 1, 38, NULL, '2026-01-08 09:08:56', NULL),
(4459, 232, 76, 'left', 1, 39, NULL, '2026-01-08 09:08:56', NULL),
(4460, 232, 75, 'left', 1, 40, NULL, '2026-01-08 09:08:56', NULL),
(4461, 232, 74, 'left', 1, 41, NULL, '2026-01-08 09:08:56', NULL),
(4462, 232, 73, 'left', 1, 42, NULL, '2026-01-08 09:08:56', NULL),
(4463, 232, 72, 'left', 1, 43, NULL, '2026-01-08 09:08:56', NULL),
(4464, 232, 71, 'left', 1, 44, NULL, '2026-01-08 09:08:56', NULL),
(4465, 232, 70, 'left', 1, 45, NULL, '2026-01-08 09:08:56', NULL),
(4466, 232, 69, 'left', 1, 46, NULL, '2026-01-08 09:08:56', NULL),
(4467, 232, 68, 'left', 1, 47, NULL, '2026-01-08 09:08:56', NULL),
(4468, 232, 67, 'left', 1, 48, NULL, '2026-01-08 09:08:56', NULL),
(4469, 232, 66, 'left', 1, 49, NULL, '2026-01-08 09:08:56', NULL),
(4470, 232, 65, 'left', 1, 50, NULL, '2026-01-08 09:08:56', NULL),
(4471, 232, 64, 'left', 1, 51, NULL, '2026-01-08 09:08:56', NULL),
(4472, 232, 63, 'left', 1, 52, NULL, '2026-01-08 09:08:56', NULL),
(4473, 232, 62, 'left', 1, 53, NULL, '2026-01-08 09:08:56', NULL),
(4474, 232, 38, 'left', 1, 54, NULL, '2026-01-08 09:08:56', NULL),
(4475, 232, 37, 'left', 1, 55, NULL, '2026-01-08 09:08:56', NULL),
(4476, 232, 36, 'left', 1, 56, NULL, '2026-01-08 09:08:56', NULL),
(4477, 232, 26, 'left', 1, 57, NULL, '2026-01-08 09:08:56', NULL),
(4478, 232, 24, 'right', 1, 58, NULL, '2026-01-08 09:08:56', NULL),
(4479, 232, 23, 'left', 1, 59, NULL, '2026-01-08 09:08:56', NULL),
(4480, 232, 22, 'left', 1, 60, NULL, '2026-01-08 09:08:56', NULL),
(4481, 232, 19, 'left', 1, 61, NULL, '2026-01-08 09:08:56', NULL),
(4482, 233, 89, 'right', 1, 1, NULL, '2026-01-10 11:52:24', NULL),
(4483, 233, 113, 'left', 1, 2, NULL, '2026-01-10 11:52:24', NULL),
(4484, 233, 112, 'left', 1, 3, NULL, '2026-01-10 11:52:24', NULL),
(4485, 233, 111, 'left', 1, 4, NULL, '2026-01-10 11:52:24', NULL),
(4486, 233, 110, 'left', 1, 5, NULL, '2026-01-10 11:52:24', NULL),
(4487, 233, 109, 'left', 1, 6, NULL, '2026-01-10 11:52:24', NULL),
(4488, 233, 108, 'left', 1, 7, NULL, '2026-01-10 11:52:24', NULL),
(4489, 233, 107, 'left', 1, 8, NULL, '2026-01-10 11:52:24', NULL),
(4490, 233, 106, 'left', 1, 9, NULL, '2026-01-10 11:52:24', NULL),
(4491, 233, 105, 'left', 1, 10, NULL, '2026-01-10 11:52:24', NULL),
(4492, 233, 88, 'left', 1, 11, NULL, '2026-01-10 11:52:24', NULL),
(4493, 233, 87, 'left', 1, 12, NULL, '2026-01-10 11:52:24', NULL),
(4494, 233, 86, 'left', 1, 13, NULL, '2026-01-10 11:52:24', NULL),
(4495, 233, 85, 'left', 1, 14, NULL, '2026-01-10 11:52:24', NULL),
(4496, 233, 84, 'left', 1, 15, NULL, '2026-01-10 11:52:24', NULL),
(4497, 233, 83, 'left', 1, 16, NULL, '2026-01-10 11:52:24', NULL),
(4498, 233, 82, 'left', 1, 17, NULL, '2026-01-10 11:52:24', NULL),
(4499, 233, 81, 'left', 1, 18, NULL, '2026-01-10 11:52:24', NULL),
(4500, 233, 80, 'left', 1, 19, NULL, '2026-01-10 11:52:24', NULL),
(4501, 233, 79, 'left', 1, 20, NULL, '2026-01-10 11:52:24', NULL),
(4502, 233, 78, 'left', 1, 21, NULL, '2026-01-10 11:52:24', NULL),
(4503, 233, 77, 'left', 1, 22, NULL, '2026-01-10 11:52:24', NULL),
(4504, 233, 76, 'left', 1, 23, NULL, '2026-01-10 11:52:24', NULL),
(4505, 233, 75, 'left', 1, 24, NULL, '2026-01-10 11:52:24', NULL),
(4506, 233, 74, 'left', 1, 25, NULL, '2026-01-10 11:52:24', NULL),
(4507, 233, 73, 'left', 1, 26, NULL, '2026-01-10 11:52:24', NULL),
(4508, 233, 72, 'left', 1, 27, NULL, '2026-01-10 11:52:24', NULL),
(4509, 233, 71, 'left', 1, 28, NULL, '2026-01-10 11:52:24', NULL),
(4510, 233, 70, 'left', 1, 29, NULL, '2026-01-10 11:52:24', NULL),
(4511, 233, 69, 'left', 1, 30, NULL, '2026-01-10 11:52:24', NULL),
(4512, 233, 68, 'left', 1, 31, NULL, '2026-01-10 11:52:24', NULL),
(4513, 233, 67, 'left', 1, 32, NULL, '2026-01-10 11:52:24', NULL),
(4514, 233, 66, 'left', 1, 33, NULL, '2026-01-10 11:52:24', NULL),
(4515, 233, 65, 'left', 1, 34, NULL, '2026-01-10 11:52:24', NULL),
(4516, 233, 64, 'left', 1, 35, NULL, '2026-01-10 11:52:24', NULL),
(4517, 233, 63, 'left', 1, 36, NULL, '2026-01-10 11:52:24', NULL),
(4518, 233, 62, 'left', 1, 37, NULL, '2026-01-10 11:52:24', NULL),
(4519, 233, 38, 'left', 1, 38, NULL, '2026-01-10 11:52:24', NULL),
(4520, 233, 37, 'left', 1, 39, NULL, '2026-01-10 11:52:24', NULL),
(4521, 233, 36, 'left', 1, 40, NULL, '2026-01-10 11:52:24', NULL),
(4522, 233, 26, 'left', 1, 41, NULL, '2026-01-10 11:52:24', NULL),
(4523, 233, 24, 'right', 1, 42, NULL, '2026-01-10 11:52:24', NULL),
(4524, 233, 23, 'left', 1, 43, NULL, '2026-01-10 11:52:24', NULL),
(4525, 233, 22, 'left', 1, 44, NULL, '2026-01-10 11:52:24', NULL),
(4526, 233, 19, 'left', 1, 45, NULL, '2026-01-10 11:52:24', NULL),
(4527, 236, 233, 'left', 1, 1, NULL, '2026-01-10 12:25:43', NULL),
(4528, 236, 89, 'right', 1, 2, NULL, '2026-01-10 12:25:43', NULL),
(4529, 236, 113, 'left', 1, 3, NULL, '2026-01-10 12:25:43', NULL),
(4530, 236, 112, 'left', 1, 4, NULL, '2026-01-10 12:25:43', NULL),
(4531, 236, 111, 'left', 1, 5, NULL, '2026-01-10 12:25:43', NULL),
(4532, 236, 110, 'left', 1, 6, NULL, '2026-01-10 12:25:43', NULL),
(4533, 236, 109, 'left', 1, 7, NULL, '2026-01-10 12:25:43', NULL),
(4534, 236, 108, 'left', 1, 8, NULL, '2026-01-10 12:25:43', NULL),
(4535, 236, 107, 'left', 1, 9, NULL, '2026-01-10 12:25:43', NULL),
(4536, 236, 106, 'left', 1, 10, NULL, '2026-01-10 12:25:43', NULL),
(4537, 236, 105, 'left', 1, 11, NULL, '2026-01-10 12:25:43', NULL),
(4538, 236, 88, 'left', 1, 12, NULL, '2026-01-10 12:25:43', NULL),
(4539, 236, 87, 'left', 1, 13, NULL, '2026-01-10 12:25:43', NULL),
(4540, 236, 86, 'left', 1, 14, NULL, '2026-01-10 12:25:43', NULL),
(4541, 236, 85, 'left', 1, 15, NULL, '2026-01-10 12:25:43', NULL),
(4542, 236, 84, 'left', 1, 16, NULL, '2026-01-10 12:25:43', NULL),
(4543, 236, 83, 'left', 1, 17, NULL, '2026-01-10 12:25:43', NULL),
(4544, 236, 82, 'left', 1, 18, NULL, '2026-01-10 12:25:43', NULL),
(4545, 236, 81, 'left', 1, 19, NULL, '2026-01-10 12:25:43', NULL),
(4546, 236, 80, 'left', 1, 20, NULL, '2026-01-10 12:25:43', NULL),
(4547, 236, 79, 'left', 1, 21, NULL, '2026-01-10 12:25:43', NULL),
(4548, 236, 78, 'left', 1, 22, NULL, '2026-01-10 12:25:43', NULL),
(4549, 236, 77, 'left', 1, 23, NULL, '2026-01-10 12:25:43', NULL),
(4550, 236, 76, 'left', 1, 24, NULL, '2026-01-10 12:25:43', NULL),
(4551, 236, 75, 'left', 1, 25, NULL, '2026-01-10 12:25:43', NULL),
(4552, 236, 74, 'left', 1, 26, NULL, '2026-01-10 12:25:43', NULL),
(4553, 236, 73, 'left', 1, 27, NULL, '2026-01-10 12:25:43', NULL),
(4554, 236, 72, 'left', 1, 28, NULL, '2026-01-10 12:25:43', NULL),
(4555, 236, 71, 'left', 1, 29, NULL, '2026-01-10 12:25:43', NULL),
(4556, 236, 70, 'left', 1, 30, NULL, '2026-01-10 12:25:43', NULL),
(4557, 236, 69, 'left', 1, 31, NULL, '2026-01-10 12:25:43', NULL),
(4558, 236, 68, 'left', 1, 32, NULL, '2026-01-10 12:25:43', NULL),
(4559, 236, 67, 'left', 1, 33, NULL, '2026-01-10 12:25:43', NULL),
(4560, 236, 66, 'left', 1, 34, NULL, '2026-01-10 12:25:43', NULL),
(4561, 236, 65, 'left', 1, 35, NULL, '2026-01-10 12:25:43', NULL),
(4562, 236, 64, 'left', 1, 36, NULL, '2026-01-10 12:25:43', NULL),
(4563, 236, 63, 'left', 1, 37, NULL, '2026-01-10 12:25:43', NULL),
(4564, 236, 62, 'left', 1, 38, NULL, '2026-01-10 12:25:43', NULL),
(4565, 236, 38, 'left', 1, 39, NULL, '2026-01-10 12:25:43', NULL),
(4566, 236, 37, 'left', 1, 40, NULL, '2026-01-10 12:25:43', NULL),
(4567, 236, 36, 'left', 1, 41, NULL, '2026-01-10 12:25:43', NULL),
(4568, 236, 26, 'left', 1, 42, NULL, '2026-01-10 12:25:43', NULL),
(4569, 236, 24, 'right', 1, 43, NULL, '2026-01-10 12:25:43', NULL),
(4570, 236, 23, 'left', 1, 44, NULL, '2026-01-10 12:25:43', NULL),
(4571, 236, 22, 'left', 1, 45, NULL, '2026-01-10 12:25:43', NULL),
(4572, 236, 19, 'left', 1, 46, NULL, '2026-01-10 12:25:43', NULL),
(4573, 238, 233, 'right', 1, 1, NULL, '2026-01-10 12:25:50', NULL),
(4574, 238, 89, 'right', 1, 2, NULL, '2026-01-10 12:25:50', NULL),
(4575, 238, 113, 'left', 1, 3, NULL, '2026-01-10 12:25:50', NULL),
(4576, 238, 112, 'left', 1, 4, NULL, '2026-01-10 12:25:50', NULL),
(4577, 238, 111, 'left', 1, 5, NULL, '2026-01-10 12:25:50', NULL),
(4578, 238, 110, 'left', 1, 6, NULL, '2026-01-10 12:25:50', NULL),
(4579, 238, 109, 'left', 1, 7, NULL, '2026-01-10 12:25:50', NULL),
(4580, 238, 108, 'left', 1, 8, NULL, '2026-01-10 12:25:50', NULL),
(4581, 238, 107, 'left', 1, 9, NULL, '2026-01-10 12:25:50', NULL),
(4582, 238, 106, 'left', 1, 10, NULL, '2026-01-10 12:25:50', NULL),
(4583, 238, 105, 'left', 1, 11, NULL, '2026-01-10 12:25:50', NULL),
(4584, 238, 88, 'left', 1, 12, NULL, '2026-01-10 12:25:50', NULL),
(4585, 238, 87, 'left', 1, 13, NULL, '2026-01-10 12:25:50', NULL),
(4586, 238, 86, 'left', 1, 14, NULL, '2026-01-10 12:25:50', NULL),
(4587, 238, 85, 'left', 1, 15, NULL, '2026-01-10 12:25:50', NULL),
(4588, 238, 84, 'left', 1, 16, NULL, '2026-01-10 12:25:50', NULL),
(4589, 238, 83, 'left', 1, 17, NULL, '2026-01-10 12:25:50', NULL),
(4590, 238, 82, 'left', 1, 18, NULL, '2026-01-10 12:25:50', NULL),
(4591, 238, 81, 'left', 1, 19, NULL, '2026-01-10 12:25:50', NULL),
(4592, 238, 80, 'left', 1, 20, NULL, '2026-01-10 12:25:50', NULL),
(4593, 238, 79, 'left', 1, 21, NULL, '2026-01-10 12:25:50', NULL),
(4594, 238, 78, 'left', 1, 22, NULL, '2026-01-10 12:25:50', NULL),
(4595, 238, 77, 'left', 1, 23, NULL, '2026-01-10 12:25:50', NULL),
(4596, 238, 76, 'left', 1, 24, NULL, '2026-01-10 12:25:50', NULL),
(4597, 238, 75, 'left', 1, 25, NULL, '2026-01-10 12:25:50', NULL),
(4598, 238, 74, 'left', 1, 26, NULL, '2026-01-10 12:25:50', NULL),
(4599, 238, 73, 'left', 1, 27, NULL, '2026-01-10 12:25:50', NULL),
(4600, 238, 72, 'left', 1, 28, NULL, '2026-01-10 12:25:50', NULL),
(4601, 238, 71, 'left', 1, 29, NULL, '2026-01-10 12:25:50', NULL),
(4602, 238, 70, 'left', 1, 30, NULL, '2026-01-10 12:25:50', NULL),
(4603, 238, 69, 'left', 1, 31, NULL, '2026-01-10 12:25:50', NULL),
(4604, 238, 68, 'left', 1, 32, NULL, '2026-01-10 12:25:50', NULL),
(4605, 238, 67, 'left', 1, 33, NULL, '2026-01-10 12:25:50', NULL),
(4606, 238, 66, 'left', 1, 34, NULL, '2026-01-10 12:25:50', NULL),
(4607, 238, 65, 'left', 1, 35, NULL, '2026-01-10 12:25:50', NULL),
(4608, 238, 64, 'left', 1, 36, NULL, '2026-01-10 12:25:50', NULL),
(4609, 238, 63, 'left', 1, 37, NULL, '2026-01-10 12:25:50', NULL),
(4610, 238, 62, 'left', 1, 38, NULL, '2026-01-10 12:25:50', NULL),
(4611, 238, 38, 'left', 1, 39, NULL, '2026-01-10 12:25:50', NULL),
(4612, 238, 37, 'left', 1, 40, NULL, '2026-01-10 12:25:50', NULL),
(4613, 238, 36, 'left', 1, 41, NULL, '2026-01-10 12:25:50', NULL),
(4614, 238, 26, 'left', 1, 42, NULL, '2026-01-10 12:25:50', NULL),
(4615, 238, 24, 'right', 1, 43, NULL, '2026-01-10 12:25:50', NULL),
(4616, 238, 23, 'left', 1, 44, NULL, '2026-01-10 12:25:50', NULL),
(4617, 238, 22, 'left', 1, 45, NULL, '2026-01-10 12:25:50', NULL),
(4618, 238, 19, 'left', 1, 46, NULL, '2026-01-10 12:25:50', NULL),
(4619, 235, 90, 'right', 1, 1, NULL, '2026-01-10 12:27:10', NULL),
(4620, 235, 89, 'left', 1, 2, NULL, '2026-01-10 12:27:10', NULL),
(4621, 235, 113, 'left', 1, 3, NULL, '2026-01-10 12:27:10', NULL),
(4622, 235, 112, 'left', 1, 4, NULL, '2026-01-10 12:27:10', NULL),
(4623, 235, 111, 'left', 1, 5, NULL, '2026-01-10 12:27:10', NULL),
(4624, 235, 110, 'left', 1, 6, NULL, '2026-01-10 12:27:10', NULL),
(4625, 235, 109, 'left', 1, 7, NULL, '2026-01-10 12:27:10', NULL),
(4626, 235, 108, 'left', 1, 8, NULL, '2026-01-10 12:27:10', NULL),
(4627, 235, 107, 'left', 1, 9, NULL, '2026-01-10 12:27:10', NULL),
(4628, 235, 106, 'left', 1, 10, NULL, '2026-01-10 12:27:10', NULL),
(4629, 235, 105, 'left', 1, 11, NULL, '2026-01-10 12:27:10', NULL),
(4630, 235, 88, 'left', 1, 12, NULL, '2026-01-10 12:27:10', NULL),
(4631, 235, 87, 'left', 1, 13, NULL, '2026-01-10 12:27:10', NULL),
(4632, 235, 86, 'left', 1, 14, NULL, '2026-01-10 12:27:10', NULL),
(4633, 235, 85, 'left', 1, 15, NULL, '2026-01-10 12:27:10', NULL),
(4634, 235, 84, 'left', 1, 16, NULL, '2026-01-10 12:27:10', NULL),
(4635, 235, 83, 'left', 1, 17, NULL, '2026-01-10 12:27:10', NULL),
(4636, 235, 82, 'left', 1, 18, NULL, '2026-01-10 12:27:10', NULL),
(4637, 235, 81, 'left', 1, 19, NULL, '2026-01-10 12:27:10', NULL),
(4638, 235, 80, 'left', 1, 20, NULL, '2026-01-10 12:27:10', NULL),
(4639, 235, 79, 'left', 1, 21, NULL, '2026-01-10 12:27:10', NULL),
(4640, 235, 78, 'left', 1, 22, NULL, '2026-01-10 12:27:10', NULL);
INSERT INTO `customer_networks` (`id`, `member_id`, `upline_id`, `position`, `status`, `level`, `description`, `created_at`, `updated_at`) VALUES
(4641, 235, 77, 'left', 1, 23, NULL, '2026-01-10 12:27:10', NULL),
(4642, 235, 76, 'left', 1, 24, NULL, '2026-01-10 12:27:10', NULL),
(4643, 235, 75, 'left', 1, 25, NULL, '2026-01-10 12:27:10', NULL),
(4644, 235, 74, 'left', 1, 26, NULL, '2026-01-10 12:27:10', NULL),
(4645, 235, 73, 'left', 1, 27, NULL, '2026-01-10 12:27:10', NULL),
(4646, 235, 72, 'left', 1, 28, NULL, '2026-01-10 12:27:10', NULL),
(4647, 235, 71, 'left', 1, 29, NULL, '2026-01-10 12:27:10', NULL),
(4648, 235, 70, 'left', 1, 30, NULL, '2026-01-10 12:27:10', NULL),
(4649, 235, 69, 'left', 1, 31, NULL, '2026-01-10 12:27:10', NULL),
(4650, 235, 68, 'left', 1, 32, NULL, '2026-01-10 12:27:10', NULL),
(4651, 235, 67, 'left', 1, 33, NULL, '2026-01-10 12:27:10', NULL),
(4652, 235, 66, 'left', 1, 34, NULL, '2026-01-10 12:27:10', NULL),
(4653, 235, 65, 'left', 1, 35, NULL, '2026-01-10 12:27:10', NULL),
(4654, 235, 64, 'left', 1, 36, NULL, '2026-01-10 12:27:10', NULL),
(4655, 235, 63, 'left', 1, 37, NULL, '2026-01-10 12:27:10', NULL),
(4656, 235, 62, 'left', 1, 38, NULL, '2026-01-10 12:27:10', NULL),
(4657, 235, 38, 'left', 1, 39, NULL, '2026-01-10 12:27:10', NULL),
(4658, 235, 37, 'left', 1, 40, NULL, '2026-01-10 12:27:10', NULL),
(4659, 235, 36, 'left', 1, 41, NULL, '2026-01-10 12:27:10', NULL),
(4660, 235, 26, 'left', 1, 42, NULL, '2026-01-10 12:27:10', NULL),
(4661, 235, 24, 'right', 1, 43, NULL, '2026-01-10 12:27:10', NULL),
(4662, 235, 23, 'left', 1, 44, NULL, '2026-01-10 12:27:10', NULL),
(4663, 235, 22, 'left', 1, 45, NULL, '2026-01-10 12:27:10', NULL),
(4664, 235, 19, 'left', 1, 46, NULL, '2026-01-10 12:27:10', NULL),
(4665, 239, 91, 'right', 1, 1, NULL, '2026-01-10 12:41:57', NULL),
(4666, 239, 90, 'left', 1, 2, NULL, '2026-01-10 12:41:57', NULL),
(4667, 239, 89, 'left', 1, 3, NULL, '2026-01-10 12:41:57', NULL),
(4668, 239, 113, 'left', 1, 4, NULL, '2026-01-10 12:41:57', NULL),
(4669, 239, 112, 'left', 1, 5, NULL, '2026-01-10 12:41:57', NULL),
(4670, 239, 111, 'left', 1, 6, NULL, '2026-01-10 12:41:57', NULL),
(4671, 239, 110, 'left', 1, 7, NULL, '2026-01-10 12:41:57', NULL),
(4672, 239, 109, 'left', 1, 8, NULL, '2026-01-10 12:41:57', NULL),
(4673, 239, 108, 'left', 1, 9, NULL, '2026-01-10 12:41:57', NULL),
(4674, 239, 107, 'left', 1, 10, NULL, '2026-01-10 12:41:57', NULL),
(4675, 239, 106, 'left', 1, 11, NULL, '2026-01-10 12:41:57', NULL),
(4676, 239, 105, 'left', 1, 12, NULL, '2026-01-10 12:41:57', NULL),
(4677, 239, 88, 'left', 1, 13, NULL, '2026-01-10 12:41:57', NULL),
(4678, 239, 87, 'left', 1, 14, NULL, '2026-01-10 12:41:57', NULL),
(4679, 239, 86, 'left', 1, 15, NULL, '2026-01-10 12:41:57', NULL),
(4680, 239, 85, 'left', 1, 16, NULL, '2026-01-10 12:41:57', NULL),
(4681, 239, 84, 'left', 1, 17, NULL, '2026-01-10 12:41:57', NULL),
(4682, 239, 83, 'left', 1, 18, NULL, '2026-01-10 12:41:57', NULL),
(4683, 239, 82, 'left', 1, 19, NULL, '2026-01-10 12:41:57', NULL),
(4684, 239, 81, 'left', 1, 20, NULL, '2026-01-10 12:41:57', NULL),
(4685, 239, 80, 'left', 1, 21, NULL, '2026-01-10 12:41:57', NULL),
(4686, 239, 79, 'left', 1, 22, NULL, '2026-01-10 12:41:57', NULL),
(4687, 239, 78, 'left', 1, 23, NULL, '2026-01-10 12:41:57', NULL),
(4688, 239, 77, 'left', 1, 24, NULL, '2026-01-10 12:41:57', NULL),
(4689, 239, 76, 'left', 1, 25, NULL, '2026-01-10 12:41:57', NULL),
(4690, 239, 75, 'left', 1, 26, NULL, '2026-01-10 12:41:57', NULL),
(4691, 239, 74, 'left', 1, 27, NULL, '2026-01-10 12:41:57', NULL),
(4692, 239, 73, 'left', 1, 28, NULL, '2026-01-10 12:41:57', NULL),
(4693, 239, 72, 'left', 1, 29, NULL, '2026-01-10 12:41:57', NULL),
(4694, 239, 71, 'left', 1, 30, NULL, '2026-01-10 12:41:57', NULL),
(4695, 239, 70, 'left', 1, 31, NULL, '2026-01-10 12:41:57', NULL),
(4696, 239, 69, 'left', 1, 32, NULL, '2026-01-10 12:41:57', NULL),
(4697, 239, 68, 'left', 1, 33, NULL, '2026-01-10 12:41:57', NULL),
(4698, 239, 67, 'left', 1, 34, NULL, '2026-01-10 12:41:57', NULL),
(4699, 239, 66, 'left', 1, 35, NULL, '2026-01-10 12:41:57', NULL),
(4700, 239, 65, 'left', 1, 36, NULL, '2026-01-10 12:41:57', NULL),
(4701, 239, 64, 'left', 1, 37, NULL, '2026-01-10 12:41:57', NULL),
(4702, 239, 63, 'left', 1, 38, NULL, '2026-01-10 12:41:57', NULL),
(4703, 239, 62, 'left', 1, 39, NULL, '2026-01-10 12:41:57', NULL),
(4704, 239, 38, 'left', 1, 40, NULL, '2026-01-10 12:41:57', NULL),
(4705, 239, 37, 'left', 1, 41, NULL, '2026-01-10 12:41:57', NULL),
(4706, 239, 36, 'left', 1, 42, NULL, '2026-01-10 12:41:57', NULL),
(4707, 239, 26, 'left', 1, 43, NULL, '2026-01-10 12:41:57', NULL),
(4708, 239, 24, 'right', 1, 44, NULL, '2026-01-10 12:41:57', NULL),
(4709, 239, 23, 'left', 1, 45, NULL, '2026-01-10 12:41:57', NULL),
(4710, 239, 22, 'left', 1, 46, NULL, '2026-01-10 12:41:57', NULL),
(4711, 239, 19, 'left', 1, 47, NULL, '2026-01-10 12:41:57', NULL),
(4712, 162, 129, 'left', 1, 1, NULL, '2026-01-12 07:45:12', NULL),
(4713, 162, 53, 'right', 1, 2, NULL, '2026-01-12 07:45:12', NULL),
(4714, 162, 52, 'left', 1, 3, NULL, '2026-01-12 07:45:12', NULL),
(4715, 162, 50, 'right', 1, 4, NULL, '2026-01-12 07:45:12', NULL),
(4716, 162, 49, 'left', 1, 5, NULL, '2026-01-12 07:45:12', NULL),
(4717, 162, 35, 'left', 1, 6, NULL, '2026-01-12 07:45:12', NULL),
(4718, 162, 34, 'left', 1, 7, NULL, '2026-01-12 07:45:12', NULL),
(4719, 162, 33, 'left', 1, 8, NULL, '2026-01-12 07:45:12', NULL),
(4720, 162, 25, 'right', 1, 9, NULL, '2026-01-12 07:45:12', NULL),
(4721, 162, 24, 'left', 1, 10, NULL, '2026-01-12 07:45:12', NULL),
(4722, 162, 23, 'left', 1, 11, NULL, '2026-01-12 07:45:12', NULL),
(4723, 162, 22, 'left', 1, 12, NULL, '2026-01-12 07:45:12', NULL),
(4724, 162, 19, 'left', 1, 13, NULL, '2026-01-12 07:45:12', NULL),
(4725, 157, 129, 'right', 1, 1, NULL, '2026-01-12 07:46:05', NULL),
(4726, 157, 53, 'right', 1, 2, NULL, '2026-01-12 07:46:05', NULL),
(4727, 157, 52, 'left', 1, 3, NULL, '2026-01-12 07:46:05', NULL),
(4728, 157, 50, 'right', 1, 4, NULL, '2026-01-12 07:46:05', NULL),
(4729, 157, 49, 'left', 1, 5, NULL, '2026-01-12 07:46:05', NULL),
(4730, 157, 35, 'left', 1, 6, NULL, '2026-01-12 07:46:05', NULL),
(4731, 157, 34, 'left', 1, 7, NULL, '2026-01-12 07:46:05', NULL),
(4732, 157, 33, 'left', 1, 8, NULL, '2026-01-12 07:46:05', NULL),
(4733, 157, 25, 'right', 1, 9, NULL, '2026-01-12 07:46:05', NULL),
(4734, 157, 24, 'left', 1, 10, NULL, '2026-01-12 07:46:05', NULL),
(4735, 157, 23, 'left', 1, 11, NULL, '2026-01-12 07:46:05', NULL),
(4736, 157, 22, 'left', 1, 12, NULL, '2026-01-12 07:46:05', NULL),
(4737, 157, 19, 'left', 1, 13, NULL, '2026-01-12 07:46:05', NULL),
(4738, 161, 128, 'left', 1, 1, NULL, '2026-01-12 08:23:33', NULL),
(4739, 161, 53, 'left', 1, 2, NULL, '2026-01-12 08:23:33', NULL),
(4740, 161, 52, 'left', 1, 3, NULL, '2026-01-12 08:23:33', NULL),
(4741, 161, 50, 'right', 1, 4, NULL, '2026-01-12 08:23:33', NULL),
(4742, 161, 49, 'left', 1, 5, NULL, '2026-01-12 08:23:33', NULL),
(4743, 161, 35, 'left', 1, 6, NULL, '2026-01-12 08:23:33', NULL),
(4744, 161, 34, 'left', 1, 7, NULL, '2026-01-12 08:23:33', NULL),
(4745, 161, 33, 'left', 1, 8, NULL, '2026-01-12 08:23:33', NULL),
(4746, 161, 25, 'right', 1, 9, NULL, '2026-01-12 08:23:33', NULL),
(4747, 161, 24, 'left', 1, 10, NULL, '2026-01-12 08:23:33', NULL),
(4748, 161, 23, 'left', 1, 11, NULL, '2026-01-12 08:23:33', NULL),
(4749, 161, 22, 'left', 1, 12, NULL, '2026-01-12 08:23:33', NULL),
(4750, 161, 19, 'left', 1, 13, NULL, '2026-01-12 08:23:33', NULL),
(4751, 244, 162, 'left', 1, 1, NULL, '2026-01-12 08:27:12', NULL),
(4752, 244, 129, 'left', 1, 2, NULL, '2026-01-12 08:27:12', NULL),
(4753, 244, 53, 'right', 1, 3, NULL, '2026-01-12 08:27:12', NULL),
(4754, 244, 52, 'left', 1, 4, NULL, '2026-01-12 08:27:12', NULL),
(4755, 244, 50, 'right', 1, 5, NULL, '2026-01-12 08:27:12', NULL),
(4756, 244, 49, 'left', 1, 6, NULL, '2026-01-12 08:27:12', NULL),
(4757, 244, 35, 'left', 1, 7, NULL, '2026-01-12 08:27:12', NULL),
(4758, 244, 34, 'left', 1, 8, NULL, '2026-01-12 08:27:12', NULL),
(4759, 244, 33, 'left', 1, 9, NULL, '2026-01-12 08:27:12', NULL),
(4760, 244, 25, 'right', 1, 10, NULL, '2026-01-12 08:27:12', NULL),
(4761, 244, 24, 'left', 1, 11, NULL, '2026-01-12 08:27:12', NULL),
(4762, 244, 23, 'left', 1, 12, NULL, '2026-01-12 08:27:12', NULL),
(4763, 244, 22, 'left', 1, 13, NULL, '2026-01-12 08:27:12', NULL),
(4764, 244, 19, 'left', 1, 14, NULL, '2026-01-12 08:27:12', NULL),
(4765, 245, 157, 'right', 1, 1, NULL, '2026-01-12 08:31:52', NULL),
(4766, 245, 129, 'right', 1, 2, NULL, '2026-01-12 08:31:52', NULL),
(4767, 245, 53, 'right', 1, 3, NULL, '2026-01-12 08:31:52', NULL),
(4768, 245, 52, 'left', 1, 4, NULL, '2026-01-12 08:31:52', NULL),
(4769, 245, 50, 'right', 1, 5, NULL, '2026-01-12 08:31:52', NULL),
(4770, 245, 49, 'left', 1, 6, NULL, '2026-01-12 08:31:52', NULL),
(4771, 245, 35, 'left', 1, 7, NULL, '2026-01-12 08:31:52', NULL),
(4772, 245, 34, 'left', 1, 8, NULL, '2026-01-12 08:31:52', NULL),
(4773, 245, 33, 'left', 1, 9, NULL, '2026-01-12 08:31:52', NULL),
(4774, 245, 25, 'right', 1, 10, NULL, '2026-01-12 08:31:52', NULL),
(4775, 245, 24, 'left', 1, 11, NULL, '2026-01-12 08:31:52', NULL),
(4776, 245, 23, 'left', 1, 12, NULL, '2026-01-12 08:31:52', NULL),
(4777, 245, 22, 'left', 1, 13, NULL, '2026-01-12 08:31:52', NULL),
(4778, 245, 19, 'left', 1, 14, NULL, '2026-01-12 08:31:52', NULL),
(4779, 246, 245, 'right', 1, 1, NULL, '2026-01-12 09:26:59', NULL),
(4780, 246, 157, 'right', 1, 2, NULL, '2026-01-12 09:26:59', NULL),
(4781, 246, 129, 'right', 1, 3, NULL, '2026-01-12 09:26:59', NULL),
(4782, 246, 53, 'right', 1, 4, NULL, '2026-01-12 09:26:59', NULL),
(4783, 246, 52, 'left', 1, 5, NULL, '2026-01-12 09:26:59', NULL),
(4784, 246, 50, 'right', 1, 6, NULL, '2026-01-12 09:26:59', NULL),
(4785, 246, 49, 'left', 1, 7, NULL, '2026-01-12 09:26:59', NULL),
(4786, 246, 35, 'left', 1, 8, NULL, '2026-01-12 09:26:59', NULL),
(4787, 246, 34, 'left', 1, 9, NULL, '2026-01-12 09:26:59', NULL),
(4788, 246, 33, 'left', 1, 10, NULL, '2026-01-12 09:26:59', NULL),
(4789, 246, 25, 'right', 1, 11, NULL, '2026-01-12 09:26:59', NULL),
(4790, 246, 24, 'left', 1, 12, NULL, '2026-01-12 09:26:59', NULL),
(4791, 246, 23, 'left', 1, 13, NULL, '2026-01-12 09:26:59', NULL),
(4792, 246, 22, 'left', 1, 14, NULL, '2026-01-12 09:26:59', NULL),
(4793, 246, 19, 'left', 1, 15, NULL, '2026-01-12 09:26:59', NULL),
(4794, 249, 175, 'left', 1, 1, NULL, '2026-01-12 12:10:19', NULL),
(4795, 249, 173, 'left', 1, 2, NULL, '2026-01-12 12:10:19', NULL),
(4796, 249, 119, 'right', 1, 3, NULL, '2026-01-12 12:10:19', NULL),
(4797, 249, 77, 'right', 1, 4, NULL, '2026-01-12 12:10:19', NULL),
(4798, 249, 76, 'left', 1, 5, NULL, '2026-01-12 12:10:19', NULL),
(4799, 249, 75, 'left', 1, 6, NULL, '2026-01-12 12:10:19', NULL),
(4800, 249, 74, 'left', 1, 7, NULL, '2026-01-12 12:10:19', NULL),
(4801, 249, 73, 'left', 1, 8, NULL, '2026-01-12 12:10:19', NULL),
(4802, 249, 72, 'left', 1, 9, NULL, '2026-01-12 12:10:19', NULL),
(4803, 249, 71, 'left', 1, 10, NULL, '2026-01-12 12:10:19', NULL),
(4804, 249, 70, 'left', 1, 11, NULL, '2026-01-12 12:10:19', NULL),
(4805, 249, 69, 'left', 1, 12, NULL, '2026-01-12 12:10:19', NULL),
(4806, 249, 68, 'left', 1, 13, NULL, '2026-01-12 12:10:19', NULL),
(4807, 249, 67, 'left', 1, 14, NULL, '2026-01-12 12:10:19', NULL),
(4808, 249, 66, 'left', 1, 15, NULL, '2026-01-12 12:10:19', NULL),
(4809, 249, 65, 'left', 1, 16, NULL, '2026-01-12 12:10:19', NULL),
(4810, 249, 64, 'left', 1, 17, NULL, '2026-01-12 12:10:19', NULL),
(4811, 249, 63, 'left', 1, 18, NULL, '2026-01-12 12:10:19', NULL),
(4812, 249, 62, 'left', 1, 19, NULL, '2026-01-12 12:10:19', NULL),
(4813, 249, 38, 'left', 1, 20, NULL, '2026-01-12 12:10:19', NULL),
(4814, 249, 37, 'left', 1, 21, NULL, '2026-01-12 12:10:19', NULL),
(4815, 249, 36, 'left', 1, 22, NULL, '2026-01-12 12:10:19', NULL),
(4816, 249, 26, 'left', 1, 23, NULL, '2026-01-12 12:10:19', NULL),
(4817, 249, 24, 'right', 1, 24, NULL, '2026-01-12 12:10:19', NULL),
(4818, 249, 23, 'left', 1, 25, NULL, '2026-01-12 12:10:19', NULL),
(4819, 249, 22, 'left', 1, 26, NULL, '2026-01-12 12:10:19', NULL),
(4820, 249, 19, 'left', 1, 27, NULL, '2026-01-12 12:10:19', NULL),
(4821, 247, 249, 'left', 1, 1, NULL, '2026-01-12 12:11:58', NULL),
(4822, 247, 175, 'left', 1, 2, NULL, '2026-01-12 12:11:58', NULL),
(4823, 247, 173, 'left', 1, 3, NULL, '2026-01-12 12:11:58', NULL),
(4824, 247, 119, 'right', 1, 4, NULL, '2026-01-12 12:11:58', NULL),
(4825, 247, 77, 'right', 1, 5, NULL, '2026-01-12 12:11:58', NULL),
(4826, 247, 76, 'left', 1, 6, NULL, '2026-01-12 12:11:58', NULL),
(4827, 247, 75, 'left', 1, 7, NULL, '2026-01-12 12:11:58', NULL),
(4828, 247, 74, 'left', 1, 8, NULL, '2026-01-12 12:11:58', NULL),
(4829, 247, 73, 'left', 1, 9, NULL, '2026-01-12 12:11:58', NULL),
(4830, 247, 72, 'left', 1, 10, NULL, '2026-01-12 12:11:58', NULL),
(4831, 247, 71, 'left', 1, 11, NULL, '2026-01-12 12:11:58', NULL),
(4832, 247, 70, 'left', 1, 12, NULL, '2026-01-12 12:11:58', NULL),
(4833, 247, 69, 'left', 1, 13, NULL, '2026-01-12 12:11:58', NULL),
(4834, 247, 68, 'left', 1, 14, NULL, '2026-01-12 12:11:58', NULL),
(4835, 247, 67, 'left', 1, 15, NULL, '2026-01-12 12:11:58', NULL),
(4836, 247, 66, 'left', 1, 16, NULL, '2026-01-12 12:11:58', NULL),
(4837, 247, 65, 'left', 1, 17, NULL, '2026-01-12 12:11:58', NULL),
(4838, 247, 64, 'left', 1, 18, NULL, '2026-01-12 12:11:58', NULL),
(4839, 247, 63, 'left', 1, 19, NULL, '2026-01-12 12:11:58', NULL),
(4840, 247, 62, 'left', 1, 20, NULL, '2026-01-12 12:11:58', NULL),
(4841, 247, 38, 'left', 1, 21, NULL, '2026-01-12 12:11:58', NULL),
(4842, 247, 37, 'left', 1, 22, NULL, '2026-01-12 12:11:58', NULL),
(4843, 247, 36, 'left', 1, 23, NULL, '2026-01-12 12:11:58', NULL),
(4844, 247, 26, 'left', 1, 24, NULL, '2026-01-12 12:11:58', NULL),
(4845, 247, 24, 'right', 1, 25, NULL, '2026-01-12 12:11:58', NULL),
(4846, 247, 23, 'left', 1, 26, NULL, '2026-01-12 12:11:58', NULL),
(4847, 247, 22, 'left', 1, 27, NULL, '2026-01-12 12:11:58', NULL),
(4848, 247, 19, 'left', 1, 28, NULL, '2026-01-12 12:11:58', NULL),
(4849, 250, 193, 'left', 1, 1, NULL, '2026-01-12 12:23:59', NULL),
(4850, 250, 191, 'right', 1, 2, NULL, '2026-01-12 12:23:59', NULL),
(4851, 250, 190, 'right', 1, 3, NULL, '2026-01-12 12:23:59', NULL),
(4852, 250, 118, 'right', 1, 4, NULL, '2026-01-12 12:23:59', NULL),
(4853, 250, 117, 'right', 1, 5, NULL, '2026-01-12 12:23:59', NULL),
(4854, 250, 74, 'right', 1, 6, NULL, '2026-01-12 12:23:59', NULL),
(4855, 250, 73, 'left', 1, 7, NULL, '2026-01-12 12:23:59', NULL),
(4856, 250, 72, 'left', 1, 8, NULL, '2026-01-12 12:23:59', NULL),
(4857, 250, 71, 'left', 1, 9, NULL, '2026-01-12 12:23:59', NULL),
(4858, 250, 70, 'left', 1, 10, NULL, '2026-01-12 12:23:59', NULL),
(4859, 250, 69, 'left', 1, 11, NULL, '2026-01-12 12:23:59', NULL),
(4860, 250, 68, 'left', 1, 12, NULL, '2026-01-12 12:23:59', NULL),
(4861, 250, 67, 'left', 1, 13, NULL, '2026-01-12 12:23:59', NULL),
(4862, 250, 66, 'left', 1, 14, NULL, '2026-01-12 12:23:59', NULL),
(4863, 250, 65, 'left', 1, 15, NULL, '2026-01-12 12:23:59', NULL),
(4864, 250, 64, 'left', 1, 16, NULL, '2026-01-12 12:23:59', NULL),
(4865, 250, 63, 'left', 1, 17, NULL, '2026-01-12 12:23:59', NULL),
(4866, 250, 62, 'left', 1, 18, NULL, '2026-01-12 12:23:59', NULL),
(4867, 250, 38, 'left', 1, 19, NULL, '2026-01-12 12:23:59', NULL),
(4868, 250, 37, 'left', 1, 20, NULL, '2026-01-12 12:23:59', NULL),
(4869, 250, 36, 'left', 1, 21, NULL, '2026-01-12 12:23:59', NULL),
(4870, 250, 26, 'left', 1, 22, NULL, '2026-01-12 12:23:59', NULL),
(4871, 250, 24, 'right', 1, 23, NULL, '2026-01-12 12:23:59', NULL),
(4872, 250, 23, 'left', 1, 24, NULL, '2026-01-12 12:23:59', NULL),
(4873, 250, 22, 'left', 1, 25, NULL, '2026-01-12 12:23:59', NULL),
(4874, 250, 19, 'left', 1, 26, NULL, '2026-01-12 12:23:59', NULL),
(4875, 251, 193, 'right', 1, 1, NULL, '2026-01-12 12:24:06', NULL),
(4876, 251, 191, 'right', 1, 2, NULL, '2026-01-12 12:24:06', NULL),
(4877, 251, 190, 'right', 1, 3, NULL, '2026-01-12 12:24:06', NULL),
(4878, 251, 118, 'right', 1, 4, NULL, '2026-01-12 12:24:06', NULL),
(4879, 251, 117, 'right', 1, 5, NULL, '2026-01-12 12:24:06', NULL),
(4880, 251, 74, 'right', 1, 6, NULL, '2026-01-12 12:24:06', NULL),
(4881, 251, 73, 'left', 1, 7, NULL, '2026-01-12 12:24:06', NULL),
(4882, 251, 72, 'left', 1, 8, NULL, '2026-01-12 12:24:06', NULL),
(4883, 251, 71, 'left', 1, 9, NULL, '2026-01-12 12:24:06', NULL),
(4884, 251, 70, 'left', 1, 10, NULL, '2026-01-12 12:24:06', NULL),
(4885, 251, 69, 'left', 1, 11, NULL, '2026-01-12 12:24:06', NULL),
(4886, 251, 68, 'left', 1, 12, NULL, '2026-01-12 12:24:06', NULL),
(4887, 251, 67, 'left', 1, 13, NULL, '2026-01-12 12:24:06', NULL),
(4888, 251, 66, 'left', 1, 14, NULL, '2026-01-12 12:24:06', NULL),
(4889, 251, 65, 'left', 1, 15, NULL, '2026-01-12 12:24:06', NULL),
(4890, 251, 64, 'left', 1, 16, NULL, '2026-01-12 12:24:06', NULL),
(4891, 251, 63, 'left', 1, 17, NULL, '2026-01-12 12:24:06', NULL),
(4892, 251, 62, 'left', 1, 18, NULL, '2026-01-12 12:24:06', NULL),
(4893, 251, 38, 'left', 1, 19, NULL, '2026-01-12 12:24:06', NULL),
(4894, 251, 37, 'left', 1, 20, NULL, '2026-01-12 12:24:06', NULL),
(4895, 251, 36, 'left', 1, 21, NULL, '2026-01-12 12:24:06', NULL),
(4896, 251, 26, 'left', 1, 22, NULL, '2026-01-12 12:24:06', NULL),
(4897, 251, 24, 'right', 1, 23, NULL, '2026-01-12 12:24:06', NULL),
(4898, 251, 23, 'left', 1, 24, NULL, '2026-01-12 12:24:06', NULL),
(4899, 251, 22, 'left', 1, 25, NULL, '2026-01-12 12:24:06', NULL),
(4900, 251, 19, 'left', 1, 26, NULL, '2026-01-12 12:24:06', NULL),
(4901, 253, 161, 'left', 1, 1, NULL, '2026-01-12 12:39:46', NULL),
(4902, 253, 128, 'left', 1, 2, NULL, '2026-01-12 12:39:46', NULL),
(4903, 253, 53, 'left', 1, 3, NULL, '2026-01-12 12:39:46', NULL),
(4904, 253, 52, 'left', 1, 4, NULL, '2026-01-12 12:39:46', NULL),
(4905, 253, 50, 'right', 1, 5, NULL, '2026-01-12 12:39:46', NULL),
(4906, 253, 49, 'left', 1, 6, NULL, '2026-01-12 12:39:46', NULL),
(4907, 253, 35, 'left', 1, 7, NULL, '2026-01-12 12:39:46', NULL),
(4908, 253, 34, 'left', 1, 8, NULL, '2026-01-12 12:39:46', NULL),
(4909, 253, 33, 'left', 1, 9, NULL, '2026-01-12 12:39:46', NULL),
(4910, 253, 25, 'right', 1, 10, NULL, '2026-01-12 12:39:46', NULL),
(4911, 253, 24, 'left', 1, 11, NULL, '2026-01-12 12:39:46', NULL),
(4912, 253, 23, 'left', 1, 12, NULL, '2026-01-12 12:39:46', NULL),
(4913, 253, 22, 'left', 1, 13, NULL, '2026-01-12 12:39:46', NULL),
(4914, 253, 19, 'left', 1, 14, NULL, '2026-01-12 12:39:46', NULL),
(4915, 257, 246, 'left', 1, 1, NULL, '2026-01-12 13:35:07', NULL),
(4916, 257, 245, 'right', 1, 2, NULL, '2026-01-12 13:35:07', NULL),
(4917, 257, 157, 'right', 1, 3, NULL, '2026-01-12 13:35:07', NULL),
(4918, 257, 129, 'right', 1, 4, NULL, '2026-01-12 13:35:07', NULL),
(4919, 257, 53, 'right', 1, 5, NULL, '2026-01-12 13:35:07', NULL),
(4920, 257, 52, 'left', 1, 6, NULL, '2026-01-12 13:35:07', NULL),
(4921, 257, 50, 'right', 1, 7, NULL, '2026-01-12 13:35:07', NULL),
(4922, 257, 49, 'left', 1, 8, NULL, '2026-01-12 13:35:07', NULL),
(4923, 257, 35, 'left', 1, 9, NULL, '2026-01-12 13:35:07', NULL),
(4924, 257, 34, 'left', 1, 10, NULL, '2026-01-12 13:35:07', NULL),
(4925, 257, 33, 'left', 1, 11, NULL, '2026-01-12 13:35:07', NULL),
(4926, 257, 25, 'right', 1, 12, NULL, '2026-01-12 13:35:07', NULL),
(4927, 257, 24, 'left', 1, 13, NULL, '2026-01-12 13:35:07', NULL),
(4928, 257, 23, 'left', 1, 14, NULL, '2026-01-12 13:35:07', NULL),
(4929, 257, 22, 'left', 1, 15, NULL, '2026-01-12 13:35:07', NULL),
(4930, 257, 19, 'left', 1, 16, NULL, '2026-01-12 13:35:07', NULL),
(4931, 258, 246, 'right', 1, 1, NULL, '2026-01-12 13:39:55', NULL),
(4932, 258, 245, 'right', 1, 2, NULL, '2026-01-12 13:39:55', NULL),
(4933, 258, 157, 'right', 1, 3, NULL, '2026-01-12 13:39:55', NULL),
(4934, 258, 129, 'right', 1, 4, NULL, '2026-01-12 13:39:55', NULL),
(4935, 258, 53, 'right', 1, 5, NULL, '2026-01-12 13:39:55', NULL),
(4936, 258, 52, 'left', 1, 6, NULL, '2026-01-12 13:39:55', NULL),
(4937, 258, 50, 'right', 1, 7, NULL, '2026-01-12 13:39:55', NULL),
(4938, 258, 49, 'left', 1, 8, NULL, '2026-01-12 13:39:55', NULL),
(4939, 258, 35, 'left', 1, 9, NULL, '2026-01-12 13:39:55', NULL),
(4940, 258, 34, 'left', 1, 10, NULL, '2026-01-12 13:39:55', NULL),
(4941, 258, 33, 'left', 1, 11, NULL, '2026-01-12 13:39:55', NULL),
(4942, 258, 25, 'right', 1, 12, NULL, '2026-01-12 13:39:55', NULL),
(4943, 258, 24, 'left', 1, 13, NULL, '2026-01-12 13:39:55', NULL),
(4944, 258, 23, 'left', 1, 14, NULL, '2026-01-12 13:39:55', NULL),
(4945, 258, 22, 'left', 1, 15, NULL, '2026-01-12 13:39:55', NULL),
(4946, 258, 19, 'left', 1, 16, NULL, '2026-01-12 13:39:55', NULL),
(4947, 256, 158, 'right', 1, 1, NULL, '2026-01-12 14:05:55', NULL),
(4948, 256, 60, 'left', 1, 2, NULL, '2026-01-12 14:05:55', NULL),
(4949, 256, 54, 'left', 1, 3, NULL, '2026-01-12 14:05:55', NULL),
(4950, 256, 52, 'right', 1, 4, NULL, '2026-01-12 14:05:55', NULL),
(4951, 256, 50, 'right', 1, 5, NULL, '2026-01-12 14:05:55', NULL),
(4952, 256, 49, 'left', 1, 6, NULL, '2026-01-12 14:05:55', NULL),
(4953, 256, 35, 'left', 1, 7, NULL, '2026-01-12 14:05:55', NULL),
(4954, 256, 34, 'left', 1, 8, NULL, '2026-01-12 14:05:55', NULL),
(4955, 256, 33, 'left', 1, 9, NULL, '2026-01-12 14:05:55', NULL),
(4956, 256, 25, 'right', 1, 10, NULL, '2026-01-12 14:05:55', NULL),
(4957, 256, 24, 'left', 1, 11, NULL, '2026-01-12 14:05:55', NULL),
(4958, 256, 23, 'left', 1, 12, NULL, '2026-01-12 14:05:55', NULL),
(4959, 256, 22, 'left', 1, 13, NULL, '2026-01-12 14:05:55', NULL),
(4960, 256, 19, 'left', 1, 14, NULL, '2026-01-12 14:05:55', NULL),
(4961, 160, 158, 'left', 1, 1, NULL, '2026-01-12 14:08:36', NULL),
(4962, 160, 60, 'left', 1, 2, NULL, '2026-01-12 14:08:36', NULL),
(4963, 160, 54, 'left', 1, 3, NULL, '2026-01-12 14:08:36', NULL),
(4964, 160, 52, 'right', 1, 4, NULL, '2026-01-12 14:08:36', NULL),
(4965, 160, 50, 'right', 1, 5, NULL, '2026-01-12 14:08:36', NULL),
(4966, 160, 49, 'left', 1, 6, NULL, '2026-01-12 14:08:36', NULL),
(4967, 160, 35, 'left', 1, 7, NULL, '2026-01-12 14:08:36', NULL),
(4968, 160, 34, 'left', 1, 8, NULL, '2026-01-12 14:08:36', NULL),
(4969, 160, 33, 'left', 1, 9, NULL, '2026-01-12 14:08:36', NULL),
(4970, 160, 25, 'right', 1, 10, NULL, '2026-01-12 14:08:36', NULL),
(4971, 160, 24, 'left', 1, 11, NULL, '2026-01-12 14:08:36', NULL),
(4972, 160, 23, 'left', 1, 12, NULL, '2026-01-12 14:08:36', NULL),
(4973, 160, 22, 'left', 1, 13, NULL, '2026-01-12 14:08:36', NULL),
(4974, 160, 19, 'left', 1, 14, NULL, '2026-01-12 14:08:36', NULL),
(4975, 254, 253, 'left', 1, 1, NULL, '2026-01-12 14:15:39', NULL),
(4976, 254, 161, 'left', 1, 2, NULL, '2026-01-12 14:15:39', NULL),
(4977, 254, 128, 'left', 1, 3, NULL, '2026-01-12 14:15:39', NULL),
(4978, 254, 53, 'left', 1, 4, NULL, '2026-01-12 14:15:39', NULL),
(4979, 254, 52, 'left', 1, 5, NULL, '2026-01-12 14:15:39', NULL),
(4980, 254, 50, 'right', 1, 6, NULL, '2026-01-12 14:15:39', NULL),
(4981, 254, 49, 'left', 1, 7, NULL, '2026-01-12 14:15:39', NULL),
(4982, 254, 35, 'left', 1, 8, NULL, '2026-01-12 14:15:39', NULL),
(4983, 254, 34, 'left', 1, 9, NULL, '2026-01-12 14:15:39', NULL),
(4984, 254, 33, 'left', 1, 10, NULL, '2026-01-12 14:15:39', NULL),
(4985, 254, 25, 'right', 1, 11, NULL, '2026-01-12 14:15:39', NULL),
(4986, 254, 24, 'left', 1, 12, NULL, '2026-01-12 14:15:39', NULL),
(4987, 254, 23, 'left', 1, 13, NULL, '2026-01-12 14:15:39', NULL),
(4988, 254, 22, 'left', 1, 14, NULL, '2026-01-12 14:15:39', NULL),
(4989, 254, 19, 'left', 1, 15, NULL, '2026-01-12 14:15:39', NULL),
(4990, 255, 253, 'right', 1, 1, NULL, '2026-01-12 14:15:56', NULL),
(4991, 255, 161, 'left', 1, 2, NULL, '2026-01-12 14:15:56', NULL),
(4992, 255, 128, 'left', 1, 3, NULL, '2026-01-12 14:15:56', NULL),
(4993, 255, 53, 'left', 1, 4, NULL, '2026-01-12 14:15:56', NULL),
(4994, 255, 52, 'left', 1, 5, NULL, '2026-01-12 14:15:56', NULL),
(4995, 255, 50, 'right', 1, 6, NULL, '2026-01-12 14:15:56', NULL),
(4996, 255, 49, 'left', 1, 7, NULL, '2026-01-12 14:15:56', NULL),
(4997, 255, 35, 'left', 1, 8, NULL, '2026-01-12 14:15:56', NULL),
(4998, 255, 34, 'left', 1, 9, NULL, '2026-01-12 14:15:56', NULL),
(4999, 255, 33, 'left', 1, 10, NULL, '2026-01-12 14:15:56', NULL),
(5000, 255, 25, 'right', 1, 11, NULL, '2026-01-12 14:15:56', NULL),
(5001, 255, 24, 'left', 1, 12, NULL, '2026-01-12 14:15:56', NULL),
(5002, 255, 23, 'left', 1, 13, NULL, '2026-01-12 14:15:56', NULL),
(5003, 255, 22, 'left', 1, 14, NULL, '2026-01-12 14:15:56', NULL),
(5004, 255, 19, 'left', 1, 15, NULL, '2026-01-12 14:15:56', NULL),
(5005, 261, 172, 'left', 1, 1, NULL, '2026-01-13 03:38:46', NULL),
(5006, 261, 60, 'right', 1, 2, NULL, '2026-01-13 03:38:46', NULL),
(5007, 261, 54, 'left', 1, 3, NULL, '2026-01-13 03:38:46', NULL),
(5008, 261, 52, 'right', 1, 4, NULL, '2026-01-13 03:38:46', NULL),
(5009, 261, 50, 'right', 1, 5, NULL, '2026-01-13 03:38:46', NULL),
(5010, 261, 49, 'left', 1, 6, NULL, '2026-01-13 03:38:46', NULL),
(5011, 261, 35, 'left', 1, 7, NULL, '2026-01-13 03:38:46', NULL),
(5012, 261, 34, 'left', 1, 8, NULL, '2026-01-13 03:38:46', NULL),
(5013, 261, 33, 'left', 1, 9, NULL, '2026-01-13 03:38:46', NULL),
(5014, 261, 25, 'right', 1, 10, NULL, '2026-01-13 03:38:46', NULL),
(5015, 261, 24, 'left', 1, 11, NULL, '2026-01-13 03:38:46', NULL),
(5016, 261, 23, 'left', 1, 12, NULL, '2026-01-13 03:38:46', NULL),
(5017, 261, 22, 'left', 1, 13, NULL, '2026-01-13 03:38:46', NULL),
(5018, 261, 19, 'left', 1, 14, NULL, '2026-01-13 03:38:46', NULL),
(5019, 262, 172, 'right', 1, 1, NULL, '2026-01-13 03:39:05', NULL),
(5020, 262, 60, 'right', 1, 2, NULL, '2026-01-13 03:39:05', NULL),
(5021, 262, 54, 'left', 1, 3, NULL, '2026-01-13 03:39:05', NULL),
(5022, 262, 52, 'right', 1, 4, NULL, '2026-01-13 03:39:05', NULL),
(5023, 262, 50, 'right', 1, 5, NULL, '2026-01-13 03:39:05', NULL),
(5024, 262, 49, 'left', 1, 6, NULL, '2026-01-13 03:39:05', NULL),
(5025, 262, 35, 'left', 1, 7, NULL, '2026-01-13 03:39:05', NULL),
(5026, 262, 34, 'left', 1, 8, NULL, '2026-01-13 03:39:05', NULL),
(5027, 262, 33, 'left', 1, 9, NULL, '2026-01-13 03:39:05', NULL),
(5028, 262, 25, 'right', 1, 10, NULL, '2026-01-13 03:39:05', NULL),
(5029, 262, 24, 'left', 1, 11, NULL, '2026-01-13 03:39:05', NULL),
(5030, 262, 23, 'left', 1, 12, NULL, '2026-01-13 03:39:05', NULL),
(5031, 262, 22, 'left', 1, 13, NULL, '2026-01-13 03:39:05', NULL),
(5032, 262, 19, 'left', 1, 14, NULL, '2026-01-13 03:39:05', NULL),
(5033, 259, 61, 'right', 1, 1, NULL, '2026-01-13 03:44:48', NULL),
(5034, 259, 54, 'right', 1, 2, NULL, '2026-01-13 03:44:48', NULL),
(5035, 259, 52, 'right', 1, 3, NULL, '2026-01-13 03:44:48', NULL),
(5036, 259, 50, 'right', 1, 4, NULL, '2026-01-13 03:44:48', NULL),
(5037, 259, 49, 'left', 1, 5, NULL, '2026-01-13 03:44:48', NULL),
(5038, 259, 35, 'left', 1, 6, NULL, '2026-01-13 03:44:48', NULL),
(5039, 259, 34, 'left', 1, 7, NULL, '2026-01-13 03:44:48', NULL),
(5040, 259, 33, 'left', 1, 8, NULL, '2026-01-13 03:44:48', NULL),
(5041, 259, 25, 'right', 1, 9, NULL, '2026-01-13 03:44:48', NULL),
(5042, 259, 24, 'left', 1, 10, NULL, '2026-01-13 03:44:48', NULL),
(5043, 259, 23, 'left', 1, 11, NULL, '2026-01-13 03:44:48', NULL),
(5044, 259, 22, 'left', 1, 12, NULL, '2026-01-13 03:44:48', NULL),
(5045, 259, 19, 'left', 1, 13, NULL, '2026-01-13 03:44:48', NULL),
(5046, 265, 160, 'left', 1, 1, NULL, '2026-01-13 03:51:48', NULL),
(5047, 265, 158, 'left', 1, 2, NULL, '2026-01-13 03:51:48', NULL),
(5048, 265, 60, 'left', 1, 3, NULL, '2026-01-13 03:51:48', NULL),
(5049, 265, 54, 'left', 1, 4, NULL, '2026-01-13 03:51:48', NULL),
(5050, 265, 52, 'right', 1, 5, NULL, '2026-01-13 03:51:48', NULL),
(5051, 265, 50, 'right', 1, 6, NULL, '2026-01-13 03:51:48', NULL),
(5052, 265, 49, 'left', 1, 7, NULL, '2026-01-13 03:51:48', NULL),
(5053, 265, 35, 'left', 1, 8, NULL, '2026-01-13 03:51:48', NULL),
(5054, 265, 34, 'left', 1, 9, NULL, '2026-01-13 03:51:48', NULL),
(5055, 265, 33, 'left', 1, 10, NULL, '2026-01-13 03:51:48', NULL),
(5056, 265, 25, 'right', 1, 11, NULL, '2026-01-13 03:51:48', NULL),
(5057, 265, 24, 'left', 1, 12, NULL, '2026-01-13 03:51:48', NULL),
(5058, 265, 23, 'left', 1, 13, NULL, '2026-01-13 03:51:48', NULL),
(5059, 265, 22, 'left', 1, 14, NULL, '2026-01-13 03:51:48', NULL),
(5060, 265, 19, 'left', 1, 15, NULL, '2026-01-13 03:51:48', NULL),
(5061, 267, 261, 'left', 1, 1, NULL, '2026-01-13 04:59:34', NULL),
(5062, 267, 172, 'left', 1, 2, NULL, '2026-01-13 04:59:34', NULL),
(5063, 267, 60, 'right', 1, 3, NULL, '2026-01-13 04:59:34', NULL),
(5064, 267, 54, 'left', 1, 4, NULL, '2026-01-13 04:59:34', NULL),
(5065, 267, 52, 'right', 1, 5, NULL, '2026-01-13 04:59:34', NULL),
(5066, 267, 50, 'right', 1, 6, NULL, '2026-01-13 04:59:34', NULL),
(5067, 267, 49, 'left', 1, 7, NULL, '2026-01-13 04:59:34', NULL),
(5068, 267, 35, 'left', 1, 8, NULL, '2026-01-13 04:59:34', NULL),
(5069, 267, 34, 'left', 1, 9, NULL, '2026-01-13 04:59:34', NULL),
(5070, 267, 33, 'left', 1, 10, NULL, '2026-01-13 04:59:34', NULL),
(5071, 267, 25, 'right', 1, 11, NULL, '2026-01-13 04:59:34', NULL),
(5072, 267, 24, 'left', 1, 12, NULL, '2026-01-13 04:59:34', NULL),
(5073, 267, 23, 'left', 1, 13, NULL, '2026-01-13 04:59:34', NULL),
(5074, 267, 22, 'left', 1, 14, NULL, '2026-01-13 04:59:34', NULL),
(5075, 267, 19, 'left', 1, 15, NULL, '2026-01-13 04:59:34', NULL),
(5076, 266, 265, 'left', 1, 1, NULL, '2026-01-13 05:39:01', NULL),
(5077, 266, 160, 'left', 1, 2, NULL, '2026-01-13 05:39:01', NULL),
(5078, 266, 158, 'left', 1, 3, NULL, '2026-01-13 05:39:01', NULL),
(5079, 266, 60, 'left', 1, 4, NULL, '2026-01-13 05:39:01', NULL),
(5080, 266, 54, 'left', 1, 5, NULL, '2026-01-13 05:39:01', NULL),
(5081, 266, 52, 'right', 1, 6, NULL, '2026-01-13 05:39:01', NULL),
(5082, 266, 50, 'right', 1, 7, NULL, '2026-01-13 05:39:01', NULL),
(5083, 266, 49, 'left', 1, 8, NULL, '2026-01-13 05:39:01', NULL),
(5084, 266, 35, 'left', 1, 9, NULL, '2026-01-13 05:39:01', NULL),
(5085, 266, 34, 'left', 1, 10, NULL, '2026-01-13 05:39:01', NULL),
(5086, 266, 33, 'left', 1, 11, NULL, '2026-01-13 05:39:01', NULL),
(5087, 266, 25, 'right', 1, 12, NULL, '2026-01-13 05:39:01', NULL),
(5088, 266, 24, 'left', 1, 13, NULL, '2026-01-13 05:39:01', NULL),
(5089, 266, 23, 'left', 1, 14, NULL, '2026-01-13 05:39:01', NULL),
(5090, 266, 22, 'left', 1, 15, NULL, '2026-01-13 05:39:01', NULL),
(5091, 266, 19, 'left', 1, 16, NULL, '2026-01-13 05:39:01', NULL),
(5092, 269, 254, 'left', 1, 1, NULL, '2026-01-13 06:14:10', NULL),
(5093, 269, 253, 'left', 1, 2, NULL, '2026-01-13 06:14:10', NULL),
(5094, 269, 161, 'left', 1, 3, NULL, '2026-01-13 06:14:10', NULL),
(5095, 269, 128, 'left', 1, 4, NULL, '2026-01-13 06:14:10', NULL),
(5096, 269, 53, 'left', 1, 5, NULL, '2026-01-13 06:14:10', NULL),
(5097, 269, 52, 'left', 1, 6, NULL, '2026-01-13 06:14:10', NULL),
(5098, 269, 50, 'right', 1, 7, NULL, '2026-01-13 06:14:10', NULL),
(5099, 269, 49, 'left', 1, 8, NULL, '2026-01-13 06:14:10', NULL),
(5100, 269, 35, 'left', 1, 9, NULL, '2026-01-13 06:14:10', NULL),
(5101, 269, 34, 'left', 1, 10, NULL, '2026-01-13 06:14:10', NULL),
(5102, 269, 33, 'left', 1, 11, NULL, '2026-01-13 06:14:10', NULL),
(5103, 269, 25, 'right', 1, 12, NULL, '2026-01-13 06:14:10', NULL),
(5104, 269, 24, 'left', 1, 13, NULL, '2026-01-13 06:14:10', NULL),
(5105, 269, 23, 'left', 1, 14, NULL, '2026-01-13 06:14:10', NULL),
(5106, 269, 22, 'left', 1, 15, NULL, '2026-01-13 06:14:10', NULL),
(5107, 269, 19, 'left', 1, 16, NULL, '2026-01-13 06:14:10', NULL),
(5108, 271, 267, 'left', 1, 1, NULL, '2026-01-13 06:20:14', NULL),
(5109, 271, 261, 'left', 1, 2, NULL, '2026-01-13 06:20:14', NULL),
(5110, 271, 172, 'left', 1, 3, NULL, '2026-01-13 06:20:14', NULL),
(5111, 271, 60, 'right', 1, 4, NULL, '2026-01-13 06:20:14', NULL),
(5112, 271, 54, 'left', 1, 5, NULL, '2026-01-13 06:20:14', NULL),
(5113, 271, 52, 'right', 1, 6, NULL, '2026-01-13 06:20:14', NULL),
(5114, 271, 50, 'right', 1, 7, NULL, '2026-01-13 06:20:14', NULL),
(5115, 271, 49, 'left', 1, 8, NULL, '2026-01-13 06:20:14', NULL),
(5116, 271, 35, 'left', 1, 9, NULL, '2026-01-13 06:20:14', NULL),
(5117, 271, 34, 'left', 1, 10, NULL, '2026-01-13 06:20:14', NULL),
(5118, 271, 33, 'left', 1, 11, NULL, '2026-01-13 06:20:14', NULL),
(5119, 271, 25, 'right', 1, 12, NULL, '2026-01-13 06:20:14', NULL),
(5120, 271, 24, 'left', 1, 13, NULL, '2026-01-13 06:20:14', NULL),
(5121, 271, 23, 'left', 1, 14, NULL, '2026-01-13 06:20:14', NULL),
(5122, 271, 22, 'left', 1, 15, NULL, '2026-01-13 06:20:14', NULL),
(5123, 271, 19, 'left', 1, 16, NULL, '2026-01-13 06:20:14', NULL),
(5124, 272, 267, 'right', 1, 1, NULL, '2026-01-13 06:20:28', NULL),
(5125, 272, 261, 'left', 1, 2, NULL, '2026-01-13 06:20:28', NULL),
(5126, 272, 172, 'left', 1, 3, NULL, '2026-01-13 06:20:28', NULL),
(5127, 272, 60, 'right', 1, 4, NULL, '2026-01-13 06:20:28', NULL),
(5128, 272, 54, 'left', 1, 5, NULL, '2026-01-13 06:20:28', NULL),
(5129, 272, 52, 'right', 1, 6, NULL, '2026-01-13 06:20:28', NULL),
(5130, 272, 50, 'right', 1, 7, NULL, '2026-01-13 06:20:28', NULL),
(5131, 272, 49, 'left', 1, 8, NULL, '2026-01-13 06:20:28', NULL),
(5132, 272, 35, 'left', 1, 9, NULL, '2026-01-13 06:20:28', NULL),
(5133, 272, 34, 'left', 1, 10, NULL, '2026-01-13 06:20:28', NULL),
(5134, 272, 33, 'left', 1, 11, NULL, '2026-01-13 06:20:28', NULL),
(5135, 272, 25, 'right', 1, 12, NULL, '2026-01-13 06:20:28', NULL),
(5136, 272, 24, 'left', 1, 13, NULL, '2026-01-13 06:20:28', NULL),
(5137, 272, 23, 'left', 1, 14, NULL, '2026-01-13 06:20:28', NULL),
(5138, 272, 22, 'left', 1, 15, NULL, '2026-01-13 06:20:28', NULL),
(5139, 272, 19, 'left', 1, 16, NULL, '2026-01-13 06:20:28', NULL),
(5140, 274, 266, 'left', 1, 1, NULL, '2026-01-13 07:16:54', NULL),
(5141, 274, 265, 'left', 1, 2, NULL, '2026-01-13 07:16:54', NULL),
(5142, 274, 160, 'left', 1, 3, NULL, '2026-01-13 07:16:54', NULL),
(5143, 274, 158, 'left', 1, 4, NULL, '2026-01-13 07:16:54', NULL),
(5144, 274, 60, 'left', 1, 5, NULL, '2026-01-13 07:16:54', NULL),
(5145, 274, 54, 'left', 1, 6, NULL, '2026-01-13 07:16:54', NULL),
(5146, 274, 52, 'right', 1, 7, NULL, '2026-01-13 07:16:54', NULL),
(5147, 274, 50, 'right', 1, 8, NULL, '2026-01-13 07:16:54', NULL),
(5148, 274, 49, 'left', 1, 9, NULL, '2026-01-13 07:16:54', NULL),
(5149, 274, 35, 'left', 1, 10, NULL, '2026-01-13 07:16:54', NULL),
(5150, 274, 34, 'left', 1, 11, NULL, '2026-01-13 07:16:54', NULL),
(5151, 274, 33, 'left', 1, 12, NULL, '2026-01-13 07:16:54', NULL),
(5152, 274, 25, 'right', 1, 13, NULL, '2026-01-13 07:16:54', NULL),
(5153, 274, 24, 'left', 1, 14, NULL, '2026-01-13 07:16:54', NULL),
(5154, 274, 23, 'left', 1, 15, NULL, '2026-01-13 07:16:54', NULL),
(5155, 274, 22, 'left', 1, 16, NULL, '2026-01-13 07:16:54', NULL),
(5156, 274, 19, 'left', 1, 17, NULL, '2026-01-13 07:16:54', NULL),
(5157, 275, 271, 'left', 1, 1, NULL, '2026-01-13 07:21:31', NULL),
(5158, 275, 267, 'left', 1, 2, NULL, '2026-01-13 07:21:31', NULL),
(5159, 275, 261, 'left', 1, 3, NULL, '2026-01-13 07:21:31', NULL),
(5160, 275, 172, 'left', 1, 4, NULL, '2026-01-13 07:21:31', NULL),
(5161, 275, 60, 'right', 1, 5, NULL, '2026-01-13 07:21:31', NULL),
(5162, 275, 54, 'left', 1, 6, NULL, '2026-01-13 07:21:31', NULL),
(5163, 275, 52, 'right', 1, 7, NULL, '2026-01-13 07:21:31', NULL),
(5164, 275, 50, 'right', 1, 8, NULL, '2026-01-13 07:21:31', NULL),
(5165, 275, 49, 'left', 1, 9, NULL, '2026-01-13 07:21:31', NULL),
(5166, 275, 35, 'left', 1, 10, NULL, '2026-01-13 07:21:31', NULL),
(5167, 275, 34, 'left', 1, 11, NULL, '2026-01-13 07:21:31', NULL),
(5168, 275, 33, 'left', 1, 12, NULL, '2026-01-13 07:21:31', NULL),
(5169, 275, 25, 'right', 1, 13, NULL, '2026-01-13 07:21:31', NULL),
(5170, 275, 24, 'left', 1, 14, NULL, '2026-01-13 07:21:31', NULL),
(5171, 275, 23, 'left', 1, 15, NULL, '2026-01-13 07:21:31', NULL),
(5172, 275, 22, 'left', 1, 16, NULL, '2026-01-13 07:21:31', NULL),
(5173, 275, 19, 'left', 1, 17, NULL, '2026-01-13 07:21:31', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_network_matrixes`
--

CREATE TABLE `customer_network_matrixes` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'Primary key matrix jaringan customer',
  `member_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Member yang berada di matrix jaringan',
  `sponsor_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Sponsor/introducer yang merekrut member ini',
  `level` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Level kedalaman member dari sponsor di matrix jaringan',
  `description` text DEFAULT NULL COMMENT 'Catatan tambahan terkait posisi member di matrix',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_network_matrixes`
--

INSERT INTO `customer_network_matrixes` (`id`, `member_id`, `sponsor_id`, `level`, `description`, `created_at`, `updated_at`) VALUES
(1, 22, 19, 1, NULL, '2025-12-21 17:00:00', NULL),
(2, 23, 22, 1, NULL, '2025-12-21 17:00:00', NULL),
(3, 23, 19, 2, NULL, '2025-12-21 17:00:00', NULL),
(4, 24, 23, 1, NULL, '2025-12-21 17:00:00', NULL),
(5, 24, 22, 2, NULL, '2025-12-21 17:00:00', NULL),
(6, 24, 19, 3, NULL, '2025-12-21 17:00:00', NULL),
(7, 27, 23, 1, NULL, '2025-12-21 17:00:00', NULL),
(8, 27, 22, 2, NULL, '2025-12-21 17:00:00', NULL),
(9, 27, 19, 3, NULL, '2025-12-21 17:00:00', NULL),
(10, 25, 24, 1, NULL, '2025-12-21 17:00:00', NULL),
(11, 25, 23, 2, NULL, '2025-12-21 17:00:00', NULL),
(12, 25, 22, 3, NULL, '2025-12-21 17:00:00', NULL),
(13, 25, 19, 4, NULL, '2025-12-21 17:00:00', NULL),
(14, 26, 24, 1, NULL, '2025-12-21 17:00:00', NULL),
(15, 26, 23, 2, NULL, '2025-12-21 17:00:00', NULL),
(16, 26, 22, 3, NULL, '2025-12-21 17:00:00', NULL),
(17, 26, 19, 4, NULL, '2025-12-21 17:00:00', NULL),
(18, 28, 27, 1, NULL, '2025-12-21 17:00:00', NULL),
(19, 28, 23, 2, NULL, '2025-12-21 17:00:00', NULL),
(20, 28, 22, 3, NULL, '2025-12-21 17:00:00', NULL),
(21, 28, 19, 4, NULL, '2025-12-21 17:00:00', NULL),
(22, 29, 27, 1, NULL, '2025-12-21 17:00:00', NULL),
(23, 29, 23, 2, NULL, '2025-12-21 17:00:00', NULL),
(24, 29, 22, 3, NULL, '2025-12-21 17:00:00', NULL),
(25, 29, 19, 4, NULL, '2025-12-21 17:00:00', NULL),
(26, 30, 25, 1, NULL, '2025-12-21 17:00:00', NULL),
(27, 30, 24, 2, NULL, '2025-12-21 17:00:00', NULL),
(28, 30, 23, 3, NULL, '2025-12-21 17:00:00', NULL),
(29, 30, 22, 4, NULL, '2025-12-21 17:00:00', NULL),
(30, 30, 19, 5, NULL, '2025-12-21 17:00:00', NULL),
(31, 33, 25, 1, NULL, '2025-12-21 17:00:00', NULL),
(32, 33, 24, 2, NULL, '2025-12-21 17:00:00', NULL),
(33, 33, 23, 3, NULL, '2025-12-21 17:00:00', NULL),
(34, 33, 22, 4, NULL, '2025-12-21 17:00:00', NULL),
(35, 33, 19, 5, NULL, '2025-12-21 17:00:00', NULL),
(36, 31, 30, 1, NULL, '2025-12-21 17:00:00', NULL),
(37, 31, 25, 2, NULL, '2025-12-21 17:00:00', NULL),
(38, 31, 24, 3, NULL, '2025-12-21 17:00:00', NULL),
(39, 31, 23, 4, NULL, '2025-12-21 17:00:00', NULL),
(40, 31, 22, 5, NULL, '2025-12-21 17:00:00', NULL),
(41, 31, 19, 6, NULL, '2025-12-21 17:00:00', NULL),
(42, 34, 33, 1, NULL, '2025-12-21 17:00:00', NULL),
(43, 34, 25, 2, NULL, '2025-12-21 17:00:00', NULL),
(44, 34, 24, 3, NULL, '2025-12-21 17:00:00', NULL),
(45, 34, 23, 4, NULL, '2025-12-21 17:00:00', NULL),
(46, 34, 22, 5, NULL, '2025-12-21 17:00:00', NULL),
(47, 34, 19, 6, NULL, '2025-12-21 17:00:00', NULL),
(48, 32, 31, 1, NULL, '2025-12-21 17:00:00', NULL),
(49, 32, 30, 2, NULL, '2025-12-21 17:00:00', NULL),
(50, 32, 25, 3, NULL, '2025-12-21 17:00:00', NULL),
(51, 32, 24, 4, NULL, '2025-12-21 17:00:00', NULL),
(52, 32, 23, 5, NULL, '2025-12-21 17:00:00', NULL),
(53, 32, 22, 6, NULL, '2025-12-21 17:00:00', NULL),
(54, 32, 19, 7, NULL, '2025-12-21 17:00:00', NULL),
(55, 35, 34, 1, NULL, '2025-12-21 17:00:00', NULL),
(56, 35, 33, 2, NULL, '2025-12-21 17:00:00', NULL),
(57, 35, 25, 3, NULL, '2025-12-21 17:00:00', NULL),
(58, 35, 24, 4, NULL, '2025-12-21 17:00:00', NULL),
(59, 35, 23, 5, NULL, '2025-12-21 17:00:00', NULL),
(60, 35, 22, 6, NULL, '2025-12-21 17:00:00', NULL),
(61, 35, 19, 7, NULL, '2025-12-21 17:00:00', NULL),
(62, 36, 26, 1, NULL, '2025-12-22 17:00:00', NULL),
(63, 36, 24, 2, NULL, '2025-12-22 17:00:00', NULL),
(64, 36, 23, 3, NULL, '2025-12-22 17:00:00', NULL),
(65, 36, 22, 4, NULL, '2025-12-22 17:00:00', NULL),
(66, 36, 19, 5, NULL, '2025-12-22 17:00:00', NULL),
(67, 39, 26, 1, NULL, '2025-12-22 17:00:00', NULL),
(68, 39, 24, 2, NULL, '2025-12-22 17:00:00', NULL),
(69, 39, 23, 3, NULL, '2025-12-22 17:00:00', NULL),
(70, 39, 22, 4, NULL, '2025-12-22 17:00:00', NULL),
(71, 39, 19, 5, NULL, '2025-12-22 17:00:00', NULL),
(72, 37, 36, 1, NULL, '2025-12-22 17:00:00', NULL),
(73, 37, 26, 2, NULL, '2025-12-22 17:00:00', NULL),
(74, 37, 24, 3, NULL, '2025-12-22 17:00:00', NULL),
(75, 37, 23, 4, NULL, '2025-12-22 17:00:00', NULL),
(76, 37, 22, 5, NULL, '2025-12-22 17:00:00', NULL),
(77, 37, 19, 6, NULL, '2025-12-22 17:00:00', NULL),
(78, 38, 37, 1, NULL, '2025-12-22 17:00:00', NULL),
(79, 38, 36, 2, NULL, '2025-12-22 17:00:00', NULL),
(80, 38, 26, 3, NULL, '2025-12-22 17:00:00', NULL),
(81, 38, 24, 4, NULL, '2025-12-22 17:00:00', NULL),
(82, 38, 23, 5, NULL, '2025-12-22 17:00:00', NULL),
(83, 38, 22, 6, NULL, '2025-12-22 17:00:00', NULL),
(84, 38, 19, 7, NULL, '2025-12-22 17:00:00', NULL),
(85, 40, 39, 1, NULL, '2025-12-22 17:00:00', NULL),
(86, 40, 26, 2, NULL, '2025-12-22 17:00:00', NULL),
(87, 40, 24, 3, NULL, '2025-12-22 17:00:00', NULL),
(88, 40, 23, 4, NULL, '2025-12-22 17:00:00', NULL),
(89, 40, 22, 5, NULL, '2025-12-22 17:00:00', NULL),
(90, 40, 19, 6, NULL, '2025-12-22 17:00:00', NULL),
(91, 41, 40, 1, NULL, '2025-12-22 17:00:00', NULL),
(92, 41, 39, 2, NULL, '2025-12-22 17:00:00', NULL),
(93, 41, 26, 3, NULL, '2025-12-22 17:00:00', NULL),
(94, 41, 24, 4, NULL, '2025-12-22 17:00:00', NULL),
(95, 41, 23, 5, NULL, '2025-12-22 17:00:00', NULL),
(96, 41, 22, 6, NULL, '2025-12-22 17:00:00', NULL),
(97, 41, 19, 7, NULL, '2025-12-22 17:00:00', NULL),
(98, 42, 32, 1, NULL, '2025-12-22 17:00:00', NULL),
(99, 42, 31, 2, NULL, '2025-12-22 17:00:00', NULL),
(100, 42, 30, 3, NULL, '2025-12-22 17:00:00', NULL),
(101, 42, 25, 4, NULL, '2025-12-22 17:00:00', NULL),
(102, 42, 24, 5, NULL, '2025-12-22 17:00:00', NULL),
(103, 42, 23, 6, NULL, '2025-12-22 17:00:00', NULL),
(104, 42, 22, 7, NULL, '2025-12-22 17:00:00', NULL),
(105, 42, 19, 8, NULL, '2025-12-22 17:00:00', NULL),
(106, 43, 42, 1, NULL, '2025-12-22 17:00:00', NULL),
(107, 43, 32, 2, NULL, '2025-12-22 17:00:00', NULL),
(108, 43, 31, 3, NULL, '2025-12-22 17:00:00', NULL),
(109, 43, 30, 4, NULL, '2025-12-22 17:00:00', NULL),
(110, 43, 25, 5, NULL, '2025-12-22 17:00:00', NULL),
(111, 43, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(112, 43, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(113, 43, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(114, 43, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(115, 46, 42, 1, NULL, '2025-12-22 17:00:00', NULL),
(116, 46, 32, 2, NULL, '2025-12-22 17:00:00', NULL),
(117, 46, 31, 3, NULL, '2025-12-22 17:00:00', NULL),
(118, 46, 30, 4, NULL, '2025-12-22 17:00:00', NULL),
(119, 46, 25, 5, NULL, '2025-12-22 17:00:00', NULL),
(120, 46, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(121, 46, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(122, 46, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(123, 46, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(124, 44, 43, 1, NULL, '2025-12-22 17:00:00', NULL),
(125, 44, 42, 2, NULL, '2025-12-22 17:00:00', NULL),
(126, 44, 32, 3, NULL, '2025-12-22 17:00:00', NULL),
(127, 44, 31, 4, NULL, '2025-12-22 17:00:00', NULL),
(128, 44, 30, 5, NULL, '2025-12-22 17:00:00', NULL),
(129, 44, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(130, 44, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(131, 44, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(132, 44, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(133, 44, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(134, 45, 43, 1, NULL, '2025-12-22 17:00:00', NULL),
(135, 45, 42, 2, NULL, '2025-12-22 17:00:00', NULL),
(136, 45, 32, 3, NULL, '2025-12-22 17:00:00', NULL),
(137, 45, 31, 4, NULL, '2025-12-22 17:00:00', NULL),
(138, 45, 30, 5, NULL, '2025-12-22 17:00:00', NULL),
(139, 45, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(140, 45, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(141, 45, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(142, 45, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(143, 45, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(144, 47, 46, 1, NULL, '2025-12-22 17:00:00', NULL),
(145, 47, 42, 2, NULL, '2025-12-22 17:00:00', NULL),
(146, 47, 32, 3, NULL, '2025-12-22 17:00:00', NULL),
(147, 47, 31, 4, NULL, '2025-12-22 17:00:00', NULL),
(148, 47, 30, 5, NULL, '2025-12-22 17:00:00', NULL),
(149, 47, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(150, 47, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(151, 47, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(152, 47, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(153, 47, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(154, 48, 46, 1, NULL, '2025-12-22 17:00:00', NULL),
(155, 48, 42, 2, NULL, '2025-12-22 17:00:00', NULL),
(156, 48, 32, 3, NULL, '2025-12-22 17:00:00', NULL),
(157, 48, 31, 4, NULL, '2025-12-22 17:00:00', NULL),
(158, 48, 30, 5, NULL, '2025-12-22 17:00:00', NULL),
(159, 48, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(160, 48, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(161, 48, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(162, 48, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(163, 48, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(164, 49, 35, 1, NULL, '2025-12-22 17:00:00', NULL),
(165, 49, 34, 2, NULL, '2025-12-22 17:00:00', NULL),
(166, 49, 33, 3, NULL, '2025-12-22 17:00:00', NULL),
(167, 49, 25, 4, NULL, '2025-12-22 17:00:00', NULL),
(168, 49, 24, 5, NULL, '2025-12-22 17:00:00', NULL),
(169, 49, 23, 6, NULL, '2025-12-22 17:00:00', NULL),
(170, 49, 22, 7, NULL, '2025-12-22 17:00:00', NULL),
(171, 49, 19, 8, NULL, '2025-12-22 17:00:00', NULL),
(172, 50, 49, 1, NULL, '2025-12-22 17:00:00', NULL),
(173, 50, 35, 2, NULL, '2025-12-22 17:00:00', NULL),
(174, 50, 34, 3, NULL, '2025-12-22 17:00:00', NULL),
(175, 50, 33, 4, NULL, '2025-12-22 17:00:00', NULL),
(176, 50, 25, 5, NULL, '2025-12-22 17:00:00', NULL),
(177, 50, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(178, 50, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(179, 50, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(180, 50, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(181, 51, 49, 1, NULL, '2025-12-22 17:00:00', NULL),
(182, 51, 35, 2, NULL, '2025-12-22 17:00:00', NULL),
(183, 51, 34, 3, NULL, '2025-12-22 17:00:00', NULL),
(184, 51, 33, 4, NULL, '2025-12-22 17:00:00', NULL),
(185, 51, 25, 5, NULL, '2025-12-22 17:00:00', NULL),
(186, 51, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(187, 51, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(188, 51, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(189, 51, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(190, 52, 50, 1, NULL, '2025-12-22 17:00:00', NULL),
(191, 52, 49, 2, NULL, '2025-12-22 17:00:00', NULL),
(192, 52, 35, 3, NULL, '2025-12-22 17:00:00', NULL),
(193, 52, 34, 4, NULL, '2025-12-22 17:00:00', NULL),
(194, 52, 33, 5, NULL, '2025-12-22 17:00:00', NULL),
(195, 52, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(196, 52, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(197, 52, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(198, 52, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(199, 52, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(200, 53, 52, 1, NULL, '2025-12-22 17:00:00', NULL),
(201, 53, 50, 2, NULL, '2025-12-22 17:00:00', NULL),
(202, 53, 49, 3, NULL, '2025-12-22 17:00:00', NULL),
(203, 53, 35, 4, NULL, '2025-12-22 17:00:00', NULL),
(204, 53, 34, 5, NULL, '2025-12-22 17:00:00', NULL),
(205, 53, 33, 6, NULL, '2025-12-22 17:00:00', NULL),
(206, 53, 25, 7, NULL, '2025-12-22 17:00:00', NULL),
(207, 53, 24, 8, NULL, '2025-12-22 17:00:00', NULL),
(208, 53, 23, 9, NULL, '2025-12-22 17:00:00', NULL),
(209, 53, 22, 10, NULL, '2025-12-22 17:00:00', NULL),
(210, 53, 19, 11, NULL, '2025-12-22 17:00:00', NULL),
(211, 54, 52, 1, NULL, '2025-12-22 17:00:00', NULL),
(212, 54, 50, 2, NULL, '2025-12-22 17:00:00', NULL),
(213, 54, 49, 3, NULL, '2025-12-22 17:00:00', NULL),
(214, 54, 35, 4, NULL, '2025-12-22 17:00:00', NULL),
(215, 54, 34, 5, NULL, '2025-12-22 17:00:00', NULL),
(216, 54, 33, 6, NULL, '2025-12-22 17:00:00', NULL),
(217, 54, 25, 7, NULL, '2025-12-22 17:00:00', NULL),
(218, 54, 24, 8, NULL, '2025-12-22 17:00:00', NULL),
(219, 54, 23, 9, NULL, '2025-12-22 17:00:00', NULL),
(220, 54, 22, 10, NULL, '2025-12-22 17:00:00', NULL),
(221, 54, 19, 11, NULL, '2025-12-22 17:00:00', NULL),
(222, 60, 54, 1, NULL, '2025-12-22 17:00:00', NULL),
(223, 60, 52, 2, NULL, '2025-12-22 17:00:00', NULL),
(224, 60, 50, 3, NULL, '2025-12-22 17:00:00', NULL),
(225, 60, 49, 4, NULL, '2025-12-22 17:00:00', NULL),
(226, 60, 35, 5, NULL, '2025-12-22 17:00:00', NULL),
(227, 60, 34, 6, NULL, '2025-12-22 17:00:00', NULL),
(228, 60, 33, 7, NULL, '2025-12-22 17:00:00', NULL),
(229, 60, 25, 8, NULL, '2025-12-22 17:00:00', NULL),
(230, 60, 24, 9, NULL, '2025-12-22 17:00:00', NULL),
(231, 60, 23, 10, NULL, '2025-12-22 17:00:00', NULL),
(232, 60, 22, 11, NULL, '2025-12-22 17:00:00', NULL),
(233, 60, 19, 12, NULL, '2025-12-22 17:00:00', NULL),
(234, 61, 54, 1, NULL, '2025-12-22 17:00:00', NULL),
(235, 61, 52, 2, NULL, '2025-12-22 17:00:00', NULL),
(236, 61, 50, 3, NULL, '2025-12-22 17:00:00', NULL),
(237, 61, 49, 4, NULL, '2025-12-22 17:00:00', NULL),
(238, 61, 35, 5, NULL, '2025-12-22 17:00:00', NULL),
(239, 61, 34, 6, NULL, '2025-12-22 17:00:00', NULL),
(240, 61, 33, 7, NULL, '2025-12-22 17:00:00', NULL),
(241, 61, 25, 8, NULL, '2025-12-22 17:00:00', NULL),
(242, 61, 24, 9, NULL, '2025-12-22 17:00:00', NULL),
(243, 61, 23, 10, NULL, '2025-12-22 17:00:00', NULL),
(244, 61, 22, 11, NULL, '2025-12-22 17:00:00', NULL),
(245, 61, 19, 12, NULL, '2025-12-22 17:00:00', NULL),
(246, 55, 51, 1, NULL, '2025-12-22 17:00:00', NULL),
(247, 55, 49, 2, NULL, '2025-12-22 17:00:00', NULL),
(248, 55, 35, 3, NULL, '2025-12-22 17:00:00', NULL),
(249, 55, 34, 4, NULL, '2025-12-22 17:00:00', NULL),
(250, 55, 33, 5, NULL, '2025-12-22 17:00:00', NULL),
(251, 55, 25, 6, NULL, '2025-12-22 17:00:00', NULL),
(252, 55, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(253, 55, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(254, 55, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(255, 55, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(256, 56, 55, 1, NULL, '2025-12-22 17:00:00', NULL),
(257, 56, 51, 2, NULL, '2025-12-22 17:00:00', NULL),
(258, 56, 49, 3, NULL, '2025-12-22 17:00:00', NULL),
(259, 56, 35, 4, NULL, '2025-12-22 17:00:00', NULL),
(260, 56, 34, 5, NULL, '2025-12-22 17:00:00', NULL),
(261, 56, 33, 6, NULL, '2025-12-22 17:00:00', NULL),
(262, 56, 25, 7, NULL, '2025-12-22 17:00:00', NULL),
(263, 56, 24, 8, NULL, '2025-12-22 17:00:00', NULL),
(264, 56, 23, 9, NULL, '2025-12-22 17:00:00', NULL),
(265, 56, 22, 10, NULL, '2025-12-22 17:00:00', NULL),
(266, 56, 19, 11, NULL, '2025-12-22 17:00:00', NULL),
(267, 57, 55, 1, NULL, '2025-12-22 17:00:00', NULL),
(268, 57, 51, 2, NULL, '2025-12-22 17:00:00', NULL),
(269, 57, 49, 3, NULL, '2025-12-22 17:00:00', NULL),
(270, 57, 35, 4, NULL, '2025-12-22 17:00:00', NULL),
(271, 57, 34, 5, NULL, '2025-12-22 17:00:00', NULL),
(272, 57, 33, 6, NULL, '2025-12-22 17:00:00', NULL),
(273, 57, 25, 7, NULL, '2025-12-22 17:00:00', NULL),
(274, 57, 24, 8, NULL, '2025-12-22 17:00:00', NULL),
(275, 57, 23, 9, NULL, '2025-12-22 17:00:00', NULL),
(276, 57, 22, 10, NULL, '2025-12-22 17:00:00', NULL),
(277, 57, 19, 11, NULL, '2025-12-22 17:00:00', NULL),
(278, 58, 57, 1, NULL, '2025-12-22 17:00:00', NULL),
(279, 58, 55, 2, NULL, '2025-12-22 17:00:00', NULL),
(280, 58, 51, 3, NULL, '2025-12-22 17:00:00', NULL),
(281, 58, 49, 4, NULL, '2025-12-22 17:00:00', NULL),
(282, 58, 35, 5, NULL, '2025-12-22 17:00:00', NULL),
(283, 58, 34, 6, NULL, '2025-12-22 17:00:00', NULL),
(284, 58, 33, 7, NULL, '2025-12-22 17:00:00', NULL),
(285, 58, 25, 8, NULL, '2025-12-22 17:00:00', NULL),
(286, 58, 24, 9, NULL, '2025-12-22 17:00:00', NULL),
(287, 58, 23, 10, NULL, '2025-12-22 17:00:00', NULL),
(288, 58, 22, 11, NULL, '2025-12-22 17:00:00', NULL),
(289, 58, 19, 12, NULL, '2025-12-22 17:00:00', NULL),
(290, 59, 57, 1, NULL, '2025-12-22 17:00:00', NULL),
(291, 59, 55, 2, NULL, '2025-12-22 17:00:00', NULL),
(292, 59, 51, 3, NULL, '2025-12-22 17:00:00', NULL),
(293, 59, 49, 4, NULL, '2025-12-22 17:00:00', NULL),
(294, 59, 35, 5, NULL, '2025-12-22 17:00:00', NULL),
(295, 59, 34, 6, NULL, '2025-12-22 17:00:00', NULL),
(296, 59, 33, 7, NULL, '2025-12-22 17:00:00', NULL),
(297, 59, 25, 8, NULL, '2025-12-22 17:00:00', NULL),
(298, 59, 24, 9, NULL, '2025-12-22 17:00:00', NULL),
(299, 59, 23, 10, NULL, '2025-12-22 17:00:00', NULL),
(300, 59, 22, 11, NULL, '2025-12-22 17:00:00', NULL),
(301, 59, 19, 12, NULL, '2025-12-22 17:00:00', NULL),
(302, 62, 38, 1, NULL, '2025-12-22 17:00:00', NULL),
(303, 62, 37, 2, NULL, '2025-12-22 17:00:00', NULL),
(304, 62, 36, 3, NULL, '2025-12-22 17:00:00', NULL),
(305, 62, 26, 4, NULL, '2025-12-22 17:00:00', NULL),
(306, 62, 24, 5, NULL, '2025-12-22 17:00:00', NULL),
(307, 62, 23, 6, NULL, '2025-12-22 17:00:00', NULL),
(308, 62, 22, 7, NULL, '2025-12-22 17:00:00', NULL),
(309, 62, 19, 8, NULL, '2025-12-22 17:00:00', NULL),
(310, 63, 62, 1, NULL, '2025-12-22 17:00:00', NULL),
(311, 63, 38, 2, NULL, '2025-12-22 17:00:00', NULL),
(312, 63, 37, 3, NULL, '2025-12-22 17:00:00', NULL),
(313, 63, 36, 4, NULL, '2025-12-22 17:00:00', NULL),
(314, 63, 26, 5, NULL, '2025-12-22 17:00:00', NULL),
(315, 63, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(316, 63, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(317, 63, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(318, 63, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(319, 95, 62, 1, NULL, '2025-12-22 17:00:00', NULL),
(320, 95, 38, 2, NULL, '2025-12-22 17:00:00', NULL),
(321, 95, 37, 3, NULL, '2025-12-22 17:00:00', NULL),
(322, 95, 36, 4, NULL, '2025-12-22 17:00:00', NULL),
(323, 95, 26, 5, NULL, '2025-12-22 17:00:00', NULL),
(324, 95, 24, 6, NULL, '2025-12-22 17:00:00', NULL),
(325, 95, 23, 7, NULL, '2025-12-22 17:00:00', NULL),
(326, 95, 22, 8, NULL, '2025-12-22 17:00:00', NULL),
(327, 95, 19, 9, NULL, '2025-12-22 17:00:00', NULL),
(328, 96, 95, 1, NULL, '2025-12-22 17:00:00', NULL),
(329, 96, 62, 2, NULL, '2025-12-22 17:00:00', NULL),
(330, 96, 38, 3, NULL, '2025-12-22 17:00:00', NULL),
(331, 96, 37, 4, NULL, '2025-12-22 17:00:00', NULL),
(332, 96, 36, 5, NULL, '2025-12-22 17:00:00', NULL),
(333, 96, 26, 6, NULL, '2025-12-22 17:00:00', NULL),
(334, 96, 24, 7, NULL, '2025-12-22 17:00:00', NULL),
(335, 96, 23, 8, NULL, '2025-12-22 17:00:00', NULL),
(336, 96, 22, 9, NULL, '2025-12-22 17:00:00', NULL),
(337, 96, 19, 10, NULL, '2025-12-22 17:00:00', NULL),
(338, 97, 96, 1, NULL, '2025-12-22 17:00:00', NULL),
(339, 97, 95, 2, NULL, '2025-12-22 17:00:00', NULL),
(340, 97, 62, 3, NULL, '2025-12-22 17:00:00', NULL),
(341, 97, 38, 4, NULL, '2025-12-22 17:00:00', NULL),
(342, 97, 37, 5, NULL, '2025-12-22 17:00:00', NULL),
(343, 97, 36, 6, NULL, '2025-12-22 17:00:00', NULL),
(344, 97, 26, 7, NULL, '2025-12-22 17:00:00', NULL),
(345, 97, 24, 8, NULL, '2025-12-22 17:00:00', NULL),
(346, 97, 23, 9, NULL, '2025-12-22 17:00:00', NULL),
(347, 97, 22, 10, NULL, '2025-12-22 17:00:00', NULL),
(348, 97, 19, 11, NULL, '2025-12-22 17:00:00', NULL),
(349, 98, 97, 1, NULL, '2025-12-22 17:00:00', NULL),
(350, 98, 96, 2, NULL, '2025-12-22 17:00:00', NULL),
(351, 98, 95, 3, NULL, '2025-12-22 17:00:00', NULL),
(352, 98, 62, 4, NULL, '2025-12-22 17:00:00', NULL),
(353, 98, 38, 5, NULL, '2025-12-22 17:00:00', NULL),
(354, 98, 37, 6, NULL, '2025-12-22 17:00:00', NULL),
(355, 98, 36, 7, NULL, '2025-12-22 17:00:00', NULL),
(356, 98, 26, 8, NULL, '2025-12-22 17:00:00', NULL),
(357, 98, 24, 9, NULL, '2025-12-22 17:00:00', NULL),
(358, 98, 23, 10, NULL, '2025-12-22 17:00:00', NULL),
(359, 98, 22, 11, NULL, '2025-12-22 17:00:00', NULL),
(360, 98, 19, 12, NULL, '2025-12-22 17:00:00', NULL),
(361, 64, 62, 1, NULL, '2025-12-23 17:00:00', NULL),
(362, 64, 38, 2, NULL, '2025-12-23 17:00:00', NULL),
(363, 64, 37, 3, NULL, '2025-12-23 17:00:00', NULL),
(364, 64, 36, 4, NULL, '2025-12-23 17:00:00', NULL),
(365, 64, 26, 5, NULL, '2025-12-23 17:00:00', NULL),
(366, 64, 24, 6, NULL, '2025-12-23 17:00:00', NULL),
(367, 64, 23, 7, NULL, '2025-12-23 17:00:00', NULL),
(368, 64, 22, 8, NULL, '2025-12-23 17:00:00', NULL),
(369, 64, 19, 9, NULL, '2025-12-23 17:00:00', NULL),
(370, 65, 64, 1, NULL, '2025-12-23 17:00:00', NULL),
(371, 65, 62, 2, NULL, '2025-12-23 17:00:00', NULL),
(372, 65, 38, 3, NULL, '2025-12-23 17:00:00', NULL),
(373, 65, 37, 4, NULL, '2025-12-23 17:00:00', NULL),
(374, 65, 36, 5, NULL, '2025-12-23 17:00:00', NULL),
(375, 65, 26, 6, NULL, '2025-12-23 17:00:00', NULL),
(376, 65, 24, 7, NULL, '2025-12-23 17:00:00', NULL),
(377, 65, 23, 8, NULL, '2025-12-23 17:00:00', NULL),
(378, 65, 22, 9, NULL, '2025-12-23 17:00:00', NULL),
(379, 65, 19, 10, NULL, '2025-12-23 17:00:00', NULL),
(380, 66, 65, 1, NULL, '2025-12-23 17:00:00', NULL),
(381, 66, 64, 2, NULL, '2025-12-23 17:00:00', NULL),
(382, 66, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(383, 66, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(384, 66, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(385, 66, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(386, 66, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(387, 66, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(388, 66, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(389, 66, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(390, 66, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(391, 67, 65, 1, NULL, '2025-12-23 17:00:00', NULL),
(392, 67, 64, 2, NULL, '2025-12-23 17:00:00', NULL),
(393, 67, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(394, 67, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(395, 67, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(396, 67, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(397, 67, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(398, 67, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(399, 67, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(400, 67, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(401, 67, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(402, 68, 63, 1, NULL, '2025-12-23 17:00:00', NULL),
(403, 68, 62, 2, NULL, '2025-12-23 17:00:00', NULL),
(404, 68, 38, 3, NULL, '2025-12-23 17:00:00', NULL),
(405, 68, 37, 4, NULL, '2025-12-23 17:00:00', NULL),
(406, 68, 36, 5, NULL, '2025-12-23 17:00:00', NULL),
(407, 68, 26, 6, NULL, '2025-12-23 17:00:00', NULL),
(408, 68, 24, 7, NULL, '2025-12-23 17:00:00', NULL),
(409, 68, 23, 8, NULL, '2025-12-23 17:00:00', NULL),
(410, 68, 22, 9, NULL, '2025-12-23 17:00:00', NULL),
(411, 68, 19, 10, NULL, '2025-12-23 17:00:00', NULL),
(412, 69, 68, 1, NULL, '2025-12-23 17:00:00', NULL),
(413, 69, 63, 2, NULL, '2025-12-23 17:00:00', NULL),
(414, 69, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(415, 69, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(416, 69, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(417, 69, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(418, 69, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(419, 69, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(420, 69, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(421, 69, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(422, 69, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(423, 70, 68, 1, NULL, '2025-12-23 17:00:00', NULL),
(424, 70, 63, 2, NULL, '2025-12-23 17:00:00', NULL),
(425, 70, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(426, 70, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(427, 70, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(428, 70, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(429, 70, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(430, 70, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(431, 70, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(432, 70, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(433, 70, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(434, 71, 66, 1, NULL, '2025-12-23 17:00:00', NULL),
(435, 71, 65, 2, NULL, '2025-12-23 17:00:00', NULL),
(436, 71, 64, 3, NULL, '2025-12-23 17:00:00', NULL),
(437, 71, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(438, 71, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(439, 71, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(440, 71, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(441, 71, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(442, 71, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(443, 71, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(444, 71, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(445, 71, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(446, 72, 71, 1, NULL, '2025-12-23 17:00:00', NULL),
(447, 72, 66, 2, NULL, '2025-12-23 17:00:00', NULL),
(448, 72, 65, 3, NULL, '2025-12-23 17:00:00', NULL),
(449, 72, 64, 4, NULL, '2025-12-23 17:00:00', NULL),
(450, 72, 62, 5, NULL, '2025-12-23 17:00:00', NULL),
(451, 72, 38, 6, NULL, '2025-12-23 17:00:00', NULL),
(452, 72, 37, 7, NULL, '2025-12-23 17:00:00', NULL),
(453, 72, 36, 8, NULL, '2025-12-23 17:00:00', NULL),
(454, 72, 26, 9, NULL, '2025-12-23 17:00:00', NULL),
(455, 72, 24, 10, NULL, '2025-12-23 17:00:00', NULL),
(456, 72, 23, 11, NULL, '2025-12-23 17:00:00', NULL),
(457, 72, 22, 12, NULL, '2025-12-23 17:00:00', NULL),
(458, 72, 19, 13, NULL, '2025-12-23 17:00:00', NULL),
(459, 73, 71, 1, NULL, '2025-12-23 17:00:00', NULL),
(460, 73, 66, 2, NULL, '2025-12-23 17:00:00', NULL),
(461, 73, 65, 3, NULL, '2025-12-23 17:00:00', NULL),
(462, 73, 64, 4, NULL, '2025-12-23 17:00:00', NULL),
(463, 73, 62, 5, NULL, '2025-12-23 17:00:00', NULL),
(464, 73, 38, 6, NULL, '2025-12-23 17:00:00', NULL),
(465, 73, 37, 7, NULL, '2025-12-23 17:00:00', NULL),
(466, 73, 36, 8, NULL, '2025-12-23 17:00:00', NULL),
(467, 73, 26, 9, NULL, '2025-12-23 17:00:00', NULL),
(468, 73, 24, 10, NULL, '2025-12-23 17:00:00', NULL),
(469, 73, 23, 11, NULL, '2025-12-23 17:00:00', NULL),
(470, 73, 22, 12, NULL, '2025-12-23 17:00:00', NULL),
(471, 73, 19, 13, NULL, '2025-12-23 17:00:00', NULL),
(472, 74, 66, 1, NULL, '2025-12-23 17:00:00', NULL),
(473, 74, 65, 2, NULL, '2025-12-23 17:00:00', NULL),
(474, 74, 64, 3, NULL, '2025-12-23 17:00:00', NULL),
(475, 74, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(476, 74, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(477, 74, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(478, 74, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(479, 74, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(480, 74, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(481, 74, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(482, 74, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(483, 74, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(484, 75, 74, 1, NULL, '2025-12-23 17:00:00', NULL),
(485, 75, 66, 2, NULL, '2025-12-23 17:00:00', NULL),
(486, 75, 65, 3, NULL, '2025-12-23 17:00:00', NULL),
(487, 75, 64, 4, NULL, '2025-12-23 17:00:00', NULL),
(488, 75, 62, 5, NULL, '2025-12-23 17:00:00', NULL),
(489, 75, 38, 6, NULL, '2025-12-23 17:00:00', NULL),
(490, 75, 37, 7, NULL, '2025-12-23 17:00:00', NULL),
(491, 75, 36, 8, NULL, '2025-12-23 17:00:00', NULL),
(492, 75, 26, 9, NULL, '2025-12-23 17:00:00', NULL),
(493, 75, 24, 10, NULL, '2025-12-23 17:00:00', NULL),
(494, 75, 23, 11, NULL, '2025-12-23 17:00:00', NULL),
(495, 75, 22, 12, NULL, '2025-12-23 17:00:00', NULL),
(496, 75, 19, 13, NULL, '2025-12-23 17:00:00', NULL),
(497, 76, 74, 1, NULL, '2025-12-23 17:00:00', NULL),
(498, 76, 66, 2, NULL, '2025-12-23 17:00:00', NULL),
(499, 76, 65, 3, NULL, '2025-12-23 17:00:00', NULL),
(500, 76, 64, 4, NULL, '2025-12-23 17:00:00', NULL),
(501, 76, 62, 5, NULL, '2025-12-23 17:00:00', NULL),
(502, 76, 38, 6, NULL, '2025-12-23 17:00:00', NULL),
(503, 76, 37, 7, NULL, '2025-12-23 17:00:00', NULL),
(504, 76, 36, 8, NULL, '2025-12-23 17:00:00', NULL),
(505, 76, 26, 9, NULL, '2025-12-23 17:00:00', NULL),
(506, 76, 24, 10, NULL, '2025-12-23 17:00:00', NULL),
(507, 76, 23, 11, NULL, '2025-12-23 17:00:00', NULL),
(508, 76, 22, 12, NULL, '2025-12-23 17:00:00', NULL),
(509, 76, 19, 13, NULL, '2025-12-23 17:00:00', NULL),
(510, 77, 75, 1, NULL, '2025-12-23 17:00:00', NULL),
(511, 77, 74, 2, NULL, '2025-12-23 17:00:00', NULL),
(512, 77, 66, 3, NULL, '2025-12-23 17:00:00', NULL),
(513, 77, 65, 4, NULL, '2025-12-23 17:00:00', NULL),
(514, 77, 64, 5, NULL, '2025-12-23 17:00:00', NULL),
(515, 77, 62, 6, NULL, '2025-12-23 17:00:00', NULL),
(516, 77, 38, 7, NULL, '2025-12-23 17:00:00', NULL),
(517, 77, 37, 8, NULL, '2025-12-23 17:00:00', NULL),
(518, 77, 36, 9, NULL, '2025-12-23 17:00:00', NULL),
(519, 77, 26, 10, NULL, '2025-12-23 17:00:00', NULL),
(520, 77, 24, 11, NULL, '2025-12-23 17:00:00', NULL),
(521, 77, 23, 12, NULL, '2025-12-23 17:00:00', NULL),
(522, 77, 22, 13, NULL, '2025-12-23 17:00:00', NULL),
(523, 77, 19, 14, NULL, '2025-12-23 17:00:00', NULL),
(524, 78, 77, 1, NULL, '2025-12-23 17:00:00', NULL),
(525, 78, 75, 2, NULL, '2025-12-23 17:00:00', NULL),
(526, 78, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(527, 78, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(528, 78, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(529, 78, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(530, 78, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(531, 78, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(532, 78, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(533, 78, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(534, 78, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(535, 78, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(536, 78, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(537, 78, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(538, 78, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(539, 79, 77, 1, NULL, '2025-12-23 17:00:00', NULL),
(540, 79, 75, 2, NULL, '2025-12-23 17:00:00', NULL),
(541, 79, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(542, 79, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(543, 79, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(544, 79, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(545, 79, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(546, 79, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(547, 79, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(548, 79, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(549, 79, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(550, 79, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(551, 79, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(552, 79, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(553, 79, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(554, 80, 75, 1, NULL, '2025-12-23 17:00:00', NULL),
(555, 80, 74, 2, NULL, '2025-12-23 17:00:00', NULL),
(556, 80, 66, 3, NULL, '2025-12-23 17:00:00', NULL),
(557, 80, 65, 4, NULL, '2025-12-23 17:00:00', NULL),
(558, 80, 64, 5, NULL, '2025-12-23 17:00:00', NULL),
(559, 80, 62, 6, NULL, '2025-12-23 17:00:00', NULL),
(560, 80, 38, 7, NULL, '2025-12-23 17:00:00', NULL),
(561, 80, 37, 8, NULL, '2025-12-23 17:00:00', NULL),
(562, 80, 36, 9, NULL, '2025-12-23 17:00:00', NULL),
(563, 80, 26, 10, NULL, '2025-12-23 17:00:00', NULL),
(564, 80, 24, 11, NULL, '2025-12-23 17:00:00', NULL),
(565, 80, 23, 12, NULL, '2025-12-23 17:00:00', NULL),
(566, 80, 22, 13, NULL, '2025-12-23 17:00:00', NULL),
(567, 80, 19, 14, NULL, '2025-12-23 17:00:00', NULL),
(568, 81, 80, 1, NULL, '2025-12-23 17:00:00', NULL),
(569, 81, 75, 2, NULL, '2025-12-23 17:00:00', NULL),
(570, 81, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(571, 81, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(572, 81, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(573, 81, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(574, 81, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(575, 81, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(576, 81, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(577, 81, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(578, 81, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(579, 81, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(580, 81, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(581, 81, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(582, 81, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(583, 82, 80, 1, NULL, '2025-12-23 17:00:00', NULL),
(584, 82, 75, 2, NULL, '2025-12-23 17:00:00', NULL),
(585, 82, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(586, 82, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(587, 82, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(588, 82, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(589, 82, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(590, 82, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(591, 82, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(592, 82, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(593, 82, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(594, 82, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(595, 82, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(596, 82, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(597, 82, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(598, 83, 72, 1, NULL, '2025-12-23 17:00:00', NULL),
(599, 83, 71, 2, NULL, '2025-12-23 17:00:00', NULL),
(600, 83, 66, 3, NULL, '2025-12-23 17:00:00', NULL),
(601, 83, 65, 4, NULL, '2025-12-23 17:00:00', NULL),
(602, 83, 64, 5, NULL, '2025-12-23 17:00:00', NULL),
(603, 83, 62, 6, NULL, '2025-12-23 17:00:00', NULL),
(604, 83, 38, 7, NULL, '2025-12-23 17:00:00', NULL),
(605, 83, 37, 8, NULL, '2025-12-23 17:00:00', NULL),
(606, 83, 36, 9, NULL, '2025-12-23 17:00:00', NULL),
(607, 83, 26, 10, NULL, '2025-12-23 17:00:00', NULL),
(608, 83, 24, 11, NULL, '2025-12-23 17:00:00', NULL),
(609, 83, 23, 12, NULL, '2025-12-23 17:00:00', NULL),
(610, 83, 22, 13, NULL, '2025-12-23 17:00:00', NULL),
(611, 83, 19, 14, NULL, '2025-12-23 17:00:00', NULL),
(612, 84, 83, 1, NULL, '2025-12-23 17:00:00', NULL),
(613, 84, 72, 2, NULL, '2025-12-23 17:00:00', NULL),
(614, 84, 71, 3, NULL, '2025-12-23 17:00:00', NULL),
(615, 84, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(616, 84, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(617, 84, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(618, 84, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(619, 84, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(620, 84, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(621, 84, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(622, 84, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(623, 84, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(624, 84, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(625, 84, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(626, 84, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(627, 85, 83, 1, NULL, '2025-12-23 17:00:00', NULL),
(628, 85, 72, 2, NULL, '2025-12-23 17:00:00', NULL),
(629, 85, 71, 3, NULL, '2025-12-23 17:00:00', NULL),
(630, 85, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(631, 85, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(632, 85, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(633, 85, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(634, 85, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(635, 85, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(636, 85, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(637, 85, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(638, 85, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(639, 85, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(640, 85, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(641, 85, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(642, 86, 76, 1, NULL, '2025-12-23 17:00:00', NULL),
(643, 86, 74, 2, NULL, '2025-12-23 17:00:00', NULL),
(644, 86, 66, 3, NULL, '2025-12-23 17:00:00', NULL),
(645, 86, 65, 4, NULL, '2025-12-23 17:00:00', NULL),
(646, 86, 64, 5, NULL, '2025-12-23 17:00:00', NULL),
(647, 86, 62, 6, NULL, '2025-12-23 17:00:00', NULL),
(648, 86, 38, 7, NULL, '2025-12-23 17:00:00', NULL),
(649, 86, 37, 8, NULL, '2025-12-23 17:00:00', NULL),
(650, 86, 36, 9, NULL, '2025-12-23 17:00:00', NULL),
(651, 86, 26, 10, NULL, '2025-12-23 17:00:00', NULL),
(652, 86, 24, 11, NULL, '2025-12-23 17:00:00', NULL),
(653, 86, 23, 12, NULL, '2025-12-23 17:00:00', NULL),
(654, 86, 22, 13, NULL, '2025-12-23 17:00:00', NULL),
(655, 86, 19, 14, NULL, '2025-12-23 17:00:00', NULL),
(656, 87, 86, 1, NULL, '2025-12-23 17:00:00', NULL),
(657, 87, 76, 2, NULL, '2025-12-23 17:00:00', NULL),
(658, 87, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(659, 87, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(660, 87, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(661, 87, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(662, 87, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(663, 87, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(664, 87, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(665, 87, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(666, 87, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(667, 87, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(668, 87, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(669, 87, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(670, 87, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(671, 88, 86, 1, NULL, '2025-12-23 17:00:00', NULL),
(672, 88, 76, 2, NULL, '2025-12-23 17:00:00', NULL),
(673, 88, 74, 3, NULL, '2025-12-23 17:00:00', NULL),
(674, 88, 66, 4, NULL, '2025-12-23 17:00:00', NULL),
(675, 88, 65, 5, NULL, '2025-12-23 17:00:00', NULL),
(676, 88, 64, 6, NULL, '2025-12-23 17:00:00', NULL),
(677, 88, 62, 7, NULL, '2025-12-23 17:00:00', NULL),
(678, 88, 38, 8, NULL, '2025-12-23 17:00:00', NULL),
(679, 88, 37, 9, NULL, '2025-12-23 17:00:00', NULL),
(680, 88, 36, 10, NULL, '2025-12-23 17:00:00', NULL),
(681, 88, 26, 11, NULL, '2025-12-23 17:00:00', NULL),
(682, 88, 24, 12, NULL, '2025-12-23 17:00:00', NULL),
(683, 88, 23, 13, NULL, '2025-12-23 17:00:00', NULL),
(684, 88, 22, 14, NULL, '2025-12-23 17:00:00', NULL),
(685, 88, 19, 15, NULL, '2025-12-23 17:00:00', NULL),
(686, 105, 24, 1, NULL, '2025-12-23 17:00:00', NULL),
(687, 105, 23, 2, NULL, '2025-12-23 17:00:00', NULL),
(688, 105, 22, 3, NULL, '2025-12-23 17:00:00', NULL),
(689, 105, 19, 4, NULL, '2025-12-23 17:00:00', NULL),
(690, 106, 105, 1, NULL, '2025-12-23 17:00:00', NULL),
(691, 106, 24, 2, NULL, '2025-12-23 17:00:00', NULL),
(692, 106, 23, 3, NULL, '2025-12-23 17:00:00', NULL),
(693, 106, 22, 4, NULL, '2025-12-23 17:00:00', NULL),
(694, 106, 19, 5, NULL, '2025-12-23 17:00:00', NULL),
(695, 107, 105, 1, NULL, '2025-12-23 17:00:00', NULL),
(696, 107, 24, 2, NULL, '2025-12-23 17:00:00', NULL),
(697, 107, 23, 3, NULL, '2025-12-23 17:00:00', NULL),
(698, 107, 22, 4, NULL, '2025-12-23 17:00:00', NULL),
(699, 107, 19, 5, NULL, '2025-12-23 17:00:00', NULL),
(700, 108, 106, 1, NULL, '2025-12-23 17:00:00', NULL),
(701, 108, 105, 2, NULL, '2025-12-23 17:00:00', NULL),
(702, 108, 24, 3, NULL, '2025-12-23 17:00:00', NULL),
(703, 108, 23, 4, NULL, '2025-12-23 17:00:00', NULL),
(704, 108, 22, 5, NULL, '2025-12-23 17:00:00', NULL),
(705, 108, 19, 6, NULL, '2025-12-23 17:00:00', NULL),
(706, 109, 108, 1, NULL, '2025-12-23 17:00:00', NULL),
(707, 109, 106, 2, NULL, '2025-12-23 17:00:00', NULL),
(708, 109, 105, 3, NULL, '2025-12-23 17:00:00', NULL),
(709, 109, 24, 4, NULL, '2025-12-23 17:00:00', NULL),
(710, 109, 23, 5, NULL, '2025-12-23 17:00:00', NULL),
(711, 109, 22, 6, NULL, '2025-12-23 17:00:00', NULL),
(712, 109, 19, 7, NULL, '2025-12-23 17:00:00', NULL),
(713, 110, 108, 1, NULL, '2025-12-23 17:00:00', NULL),
(714, 110, 106, 2, NULL, '2025-12-23 17:00:00', NULL),
(715, 110, 105, 3, NULL, '2025-12-23 17:00:00', NULL),
(716, 110, 24, 4, NULL, '2025-12-23 17:00:00', NULL),
(717, 110, 23, 5, NULL, '2025-12-23 17:00:00', NULL),
(718, 110, 22, 6, NULL, '2025-12-23 17:00:00', NULL),
(719, 110, 19, 7, NULL, '2025-12-23 17:00:00', NULL),
(720, 111, 109, 1, NULL, '2025-12-23 17:00:00', NULL),
(721, 111, 108, 2, NULL, '2025-12-23 17:00:00', NULL),
(722, 111, 106, 3, NULL, '2025-12-23 17:00:00', NULL),
(723, 111, 105, 4, NULL, '2025-12-23 17:00:00', NULL),
(724, 111, 24, 5, NULL, '2025-12-23 17:00:00', NULL),
(725, 111, 23, 6, NULL, '2025-12-23 17:00:00', NULL),
(726, 111, 22, 7, NULL, '2025-12-23 17:00:00', NULL),
(727, 111, 19, 8, NULL, '2025-12-23 17:00:00', NULL),
(728, 112, 111, 1, NULL, '2025-12-23 17:00:00', NULL),
(729, 112, 109, 2, NULL, '2025-12-23 17:00:00', NULL),
(730, 112, 108, 3, NULL, '2025-12-23 17:00:00', NULL),
(731, 112, 106, 4, NULL, '2025-12-23 17:00:00', NULL),
(732, 112, 105, 5, NULL, '2025-12-23 17:00:00', NULL),
(733, 112, 24, 6, NULL, '2025-12-23 17:00:00', NULL),
(734, 112, 23, 7, NULL, '2025-12-23 17:00:00', NULL),
(735, 112, 22, 8, NULL, '2025-12-23 17:00:00', NULL),
(736, 112, 19, 9, NULL, '2025-12-23 17:00:00', NULL),
(737, 113, 111, 1, NULL, '2025-12-23 17:00:00', NULL),
(738, 113, 109, 2, NULL, '2025-12-23 17:00:00', NULL),
(739, 113, 108, 3, NULL, '2025-12-23 17:00:00', NULL),
(740, 113, 106, 4, NULL, '2025-12-23 17:00:00', NULL),
(741, 113, 105, 5, NULL, '2025-12-23 17:00:00', NULL),
(742, 113, 24, 6, NULL, '2025-12-23 17:00:00', NULL),
(743, 113, 23, 7, NULL, '2025-12-23 17:00:00', NULL),
(744, 113, 22, 8, NULL, '2025-12-23 17:00:00', NULL),
(745, 113, 19, 9, NULL, '2025-12-23 17:00:00', NULL),
(746, 89, 64, 1, NULL, '2025-12-23 17:00:00', NULL),
(747, 89, 62, 2, NULL, '2025-12-23 17:00:00', NULL),
(748, 89, 38, 3, NULL, '2025-12-23 17:00:00', NULL),
(749, 89, 37, 4, NULL, '2025-12-23 17:00:00', NULL),
(750, 89, 36, 5, NULL, '2025-12-23 17:00:00', NULL),
(751, 89, 26, 6, NULL, '2025-12-23 17:00:00', NULL),
(752, 89, 24, 7, NULL, '2025-12-23 17:00:00', NULL),
(753, 89, 23, 8, NULL, '2025-12-23 17:00:00', NULL),
(754, 89, 22, 9, NULL, '2025-12-23 17:00:00', NULL),
(755, 89, 19, 10, NULL, '2025-12-23 17:00:00', NULL),
(756, 90, 89, 1, NULL, '2025-12-23 17:00:00', NULL),
(757, 90, 64, 2, NULL, '2025-12-23 17:00:00', NULL),
(758, 90, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(759, 90, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(760, 90, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(761, 90, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(762, 90, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(763, 90, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(764, 90, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(765, 90, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(766, 90, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(767, 91, 89, 1, NULL, '2025-12-23 17:00:00', NULL),
(768, 91, 64, 2, NULL, '2025-12-23 17:00:00', NULL),
(769, 91, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(770, 91, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(771, 91, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(772, 91, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(773, 91, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(774, 91, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(775, 91, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(776, 91, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(777, 91, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(778, 114, 91, 1, NULL, '2025-12-23 17:00:00', NULL),
(779, 114, 89, 2, NULL, '2025-12-23 17:00:00', NULL),
(780, 114, 64, 3, NULL, '2025-12-23 17:00:00', NULL),
(781, 114, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(782, 114, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(783, 114, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(784, 114, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(785, 114, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(786, 114, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(787, 114, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(788, 114, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(789, 114, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(790, 92, 87, 1, NULL, '2025-12-23 17:00:00', NULL),
(791, 92, 86, 2, NULL, '2025-12-23 17:00:00', NULL),
(792, 92, 76, 3, NULL, '2025-12-23 17:00:00', NULL),
(793, 92, 74, 4, NULL, '2025-12-23 17:00:00', NULL),
(794, 92, 66, 5, NULL, '2025-12-23 17:00:00', NULL),
(795, 92, 65, 6, NULL, '2025-12-23 17:00:00', NULL),
(796, 92, 64, 7, NULL, '2025-12-23 17:00:00', NULL),
(797, 92, 62, 8, NULL, '2025-12-23 17:00:00', NULL),
(798, 92, 38, 9, NULL, '2025-12-23 17:00:00', NULL),
(799, 92, 37, 10, NULL, '2025-12-23 17:00:00', NULL),
(800, 92, 36, 11, NULL, '2025-12-23 17:00:00', NULL),
(801, 92, 26, 12, NULL, '2025-12-23 17:00:00', NULL),
(802, 92, 24, 13, NULL, '2025-12-23 17:00:00', NULL),
(803, 92, 23, 14, NULL, '2025-12-23 17:00:00', NULL),
(804, 92, 22, 15, NULL, '2025-12-23 17:00:00', NULL),
(805, 92, 19, 16, NULL, '2025-12-23 17:00:00', NULL),
(806, 93, 92, 1, NULL, '2025-12-23 17:00:00', NULL),
(807, 93, 87, 2, NULL, '2025-12-23 17:00:00', NULL),
(808, 93, 86, 3, NULL, '2025-12-23 17:00:00', NULL),
(809, 93, 76, 4, NULL, '2025-12-23 17:00:00', NULL),
(810, 93, 74, 5, NULL, '2025-12-23 17:00:00', NULL),
(811, 93, 66, 6, NULL, '2025-12-23 17:00:00', NULL),
(812, 93, 65, 7, NULL, '2025-12-23 17:00:00', NULL),
(813, 93, 64, 8, NULL, '2025-12-23 17:00:00', NULL),
(814, 93, 62, 9, NULL, '2025-12-23 17:00:00', NULL),
(815, 93, 38, 10, NULL, '2025-12-23 17:00:00', NULL),
(816, 93, 37, 11, NULL, '2025-12-23 17:00:00', NULL),
(817, 93, 36, 12, NULL, '2025-12-23 17:00:00', NULL),
(818, 93, 26, 13, NULL, '2025-12-23 17:00:00', NULL),
(819, 93, 24, 14, NULL, '2025-12-23 17:00:00', NULL),
(820, 93, 23, 15, NULL, '2025-12-23 17:00:00', NULL),
(821, 93, 22, 16, NULL, '2025-12-23 17:00:00', NULL),
(822, 93, 19, 17, NULL, '2025-12-23 17:00:00', NULL),
(823, 94, 92, 1, NULL, '2025-12-23 17:00:00', NULL),
(824, 94, 87, 2, NULL, '2025-12-23 17:00:00', NULL),
(825, 94, 86, 3, NULL, '2025-12-23 17:00:00', NULL),
(826, 94, 76, 4, NULL, '2025-12-23 17:00:00', NULL),
(827, 94, 74, 5, NULL, '2025-12-23 17:00:00', NULL),
(828, 94, 66, 6, NULL, '2025-12-23 17:00:00', NULL),
(829, 94, 65, 7, NULL, '2025-12-23 17:00:00', NULL),
(830, 94, 64, 8, NULL, '2025-12-23 17:00:00', NULL),
(831, 94, 62, 9, NULL, '2025-12-23 17:00:00', NULL),
(832, 94, 38, 10, NULL, '2025-12-23 17:00:00', NULL),
(833, 94, 37, 11, NULL, '2025-12-23 17:00:00', NULL),
(834, 94, 36, 12, NULL, '2025-12-23 17:00:00', NULL),
(835, 94, 26, 13, NULL, '2025-12-23 17:00:00', NULL),
(836, 94, 24, 14, NULL, '2025-12-23 17:00:00', NULL),
(837, 94, 23, 15, NULL, '2025-12-23 17:00:00', NULL),
(838, 94, 22, 16, NULL, '2025-12-23 17:00:00', NULL),
(839, 94, 19, 17, NULL, '2025-12-23 17:00:00', NULL),
(840, 99, 97, 1, NULL, '2025-12-23 17:00:00', NULL),
(841, 99, 96, 2, NULL, '2025-12-23 17:00:00', NULL),
(842, 99, 95, 3, NULL, '2025-12-23 17:00:00', NULL),
(843, 99, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(844, 99, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(845, 99, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(846, 99, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(847, 99, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(848, 99, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(849, 99, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(850, 99, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(851, 99, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(852, 100, 96, 1, NULL, '2025-12-23 17:00:00', NULL),
(853, 100, 95, 2, NULL, '2025-12-23 17:00:00', NULL),
(854, 100, 62, 3, NULL, '2025-12-23 17:00:00', NULL),
(855, 100, 38, 4, NULL, '2025-12-23 17:00:00', NULL),
(856, 100, 37, 5, NULL, '2025-12-23 17:00:00', NULL),
(857, 100, 36, 6, NULL, '2025-12-23 17:00:00', NULL),
(858, 100, 26, 7, NULL, '2025-12-23 17:00:00', NULL),
(859, 100, 24, 8, NULL, '2025-12-23 17:00:00', NULL),
(860, 100, 23, 9, NULL, '2025-12-23 17:00:00', NULL),
(861, 100, 22, 10, NULL, '2025-12-23 17:00:00', NULL),
(862, 100, 19, 11, NULL, '2025-12-23 17:00:00', NULL),
(863, 101, 100, 1, NULL, '2025-12-23 17:00:00', NULL),
(864, 101, 96, 2, NULL, '2025-12-23 17:00:00', NULL),
(865, 101, 95, 3, NULL, '2025-12-23 17:00:00', NULL),
(866, 101, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(867, 101, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(868, 101, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(869, 101, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(870, 101, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(871, 101, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(872, 101, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(873, 101, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(874, 101, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(875, 115, 100, 1, NULL, '2025-12-23 17:00:00', NULL),
(876, 115, 96, 2, NULL, '2025-12-23 17:00:00', NULL),
(877, 115, 95, 3, NULL, '2025-12-23 17:00:00', NULL),
(878, 115, 62, 4, NULL, '2025-12-23 17:00:00', NULL),
(879, 115, 38, 5, NULL, '2025-12-23 17:00:00', NULL),
(880, 115, 37, 6, NULL, '2025-12-23 17:00:00', NULL),
(881, 115, 36, 7, NULL, '2025-12-23 17:00:00', NULL),
(882, 115, 26, 8, NULL, '2025-12-23 17:00:00', NULL),
(883, 115, 24, 9, NULL, '2025-12-23 17:00:00', NULL),
(884, 115, 23, 10, NULL, '2025-12-23 17:00:00', NULL),
(885, 115, 22, 11, NULL, '2025-12-23 17:00:00', NULL),
(886, 115, 19, 12, NULL, '2025-12-23 17:00:00', NULL),
(887, 102, 38, 1, NULL, '2025-12-23 17:00:00', NULL),
(888, 102, 37, 2, NULL, '2025-12-23 17:00:00', NULL),
(889, 102, 36, 3, NULL, '2025-12-23 17:00:00', NULL),
(890, 102, 26, 4, NULL, '2025-12-23 17:00:00', NULL),
(891, 102, 24, 5, NULL, '2025-12-23 17:00:00', NULL),
(892, 102, 23, 6, NULL, '2025-12-23 17:00:00', NULL),
(893, 102, 22, 7, NULL, '2025-12-23 17:00:00', NULL),
(894, 102, 19, 8, NULL, '2025-12-23 17:00:00', NULL),
(895, 103, 102, 1, NULL, '2025-12-23 17:00:00', NULL),
(896, 103, 38, 2, NULL, '2025-12-23 17:00:00', NULL),
(897, 103, 37, 3, NULL, '2025-12-23 17:00:00', NULL),
(898, 103, 36, 4, NULL, '2025-12-23 17:00:00', NULL),
(899, 103, 26, 5, NULL, '2025-12-23 17:00:00', NULL),
(900, 103, 24, 6, NULL, '2025-12-23 17:00:00', NULL),
(901, 103, 23, 7, NULL, '2025-12-23 17:00:00', NULL),
(902, 103, 22, 8, NULL, '2025-12-23 17:00:00', NULL),
(903, 103, 19, 9, NULL, '2025-12-23 17:00:00', NULL),
(904, 104, 102, 1, NULL, '2025-12-23 17:00:00', NULL),
(905, 104, 38, 2, NULL, '2025-12-23 17:00:00', NULL),
(906, 104, 37, 3, NULL, '2025-12-23 17:00:00', NULL),
(907, 104, 36, 4, NULL, '2025-12-23 17:00:00', NULL),
(908, 104, 26, 5, NULL, '2025-12-23 17:00:00', NULL),
(909, 104, 24, 6, NULL, '2025-12-23 17:00:00', NULL),
(910, 104, 23, 7, NULL, '2025-12-23 17:00:00', NULL),
(911, 104, 22, 8, NULL, '2025-12-23 17:00:00', NULL),
(912, 104, 19, 9, NULL, '2025-12-23 17:00:00', NULL),
(913, 128, 53, 1, NULL, '2025-12-25 17:00:00', NULL),
(914, 128, 52, 2, NULL, '2025-12-25 17:00:00', NULL),
(915, 128, 50, 3, NULL, '2025-12-25 17:00:00', NULL),
(916, 128, 49, 4, NULL, '2025-12-25 17:00:00', NULL),
(917, 128, 35, 5, NULL, '2025-12-25 17:00:00', NULL),
(918, 128, 34, 6, NULL, '2025-12-25 17:00:00', NULL),
(919, 128, 33, 7, NULL, '2025-12-25 17:00:00', NULL),
(920, 128, 25, 8, NULL, '2025-12-25 17:00:00', NULL),
(921, 128, 24, 9, NULL, '2025-12-25 17:00:00', NULL),
(922, 128, 23, 10, NULL, '2025-12-25 17:00:00', NULL),
(923, 128, 22, 11, NULL, '2025-12-25 17:00:00', NULL),
(924, 128, 19, 12, NULL, '2025-12-25 17:00:00', NULL),
(925, 129, 53, 1, NULL, '2025-12-25 17:00:00', NULL),
(926, 129, 52, 2, NULL, '2025-12-25 17:00:00', NULL),
(927, 129, 50, 3, NULL, '2025-12-25 17:00:00', NULL),
(928, 129, 49, 4, NULL, '2025-12-25 17:00:00', NULL),
(929, 129, 35, 5, NULL, '2025-12-25 17:00:00', NULL),
(930, 129, 34, 6, NULL, '2025-12-25 17:00:00', NULL),
(931, 129, 33, 7, NULL, '2025-12-25 17:00:00', NULL),
(932, 129, 25, 8, NULL, '2025-12-25 17:00:00', NULL),
(933, 129, 24, 9, NULL, '2025-12-25 17:00:00', NULL),
(934, 129, 23, 10, NULL, '2025-12-25 17:00:00', NULL),
(935, 129, 22, 11, NULL, '2025-12-25 17:00:00', NULL),
(936, 129, 19, 12, NULL, '2025-12-25 17:00:00', NULL),
(937, 158, 60, 1, NULL, '2025-12-29 17:00:00', NULL),
(938, 158, 54, 2, NULL, '2025-12-29 17:00:00', NULL),
(939, 158, 52, 3, NULL, '2025-12-29 17:00:00', NULL),
(940, 158, 50, 4, NULL, '2025-12-29 17:00:00', NULL),
(941, 158, 49, 5, NULL, '2025-12-29 17:00:00', NULL),
(942, 158, 35, 6, NULL, '2025-12-29 17:00:00', NULL),
(943, 158, 34, 7, NULL, '2025-12-29 17:00:00', NULL),
(944, 158, 33, 8, NULL, '2025-12-29 17:00:00', NULL),
(945, 158, 25, 9, NULL, '2025-12-29 17:00:00', NULL),
(946, 158, 24, 10, NULL, '2025-12-29 17:00:00', NULL),
(947, 158, 23, 11, NULL, '2025-12-29 17:00:00', NULL),
(948, 158, 22, 12, NULL, '2025-12-29 17:00:00', NULL),
(949, 158, 19, 13, NULL, '2025-12-29 17:00:00', NULL),
(950, 117, 74, 1, NULL, '2025-12-29 17:00:00', NULL),
(951, 117, 66, 2, NULL, '2025-12-29 17:00:00', NULL),
(952, 117, 65, 3, NULL, '2025-12-29 17:00:00', NULL),
(953, 117, 64, 4, NULL, '2025-12-29 17:00:00', NULL),
(954, 117, 62, 5, NULL, '2025-12-29 17:00:00', NULL),
(955, 117, 38, 6, NULL, '2025-12-29 17:00:00', NULL),
(956, 117, 37, 7, NULL, '2025-12-29 17:00:00', NULL),
(957, 117, 36, 8, NULL, '2025-12-29 17:00:00', NULL),
(958, 117, 26, 9, NULL, '2025-12-29 17:00:00', NULL),
(959, 117, 24, 10, NULL, '2025-12-29 17:00:00', NULL),
(960, 117, 23, 11, NULL, '2025-12-29 17:00:00', NULL),
(961, 117, 22, 12, NULL, '2025-12-29 17:00:00', NULL),
(962, 117, 19, 13, NULL, '2025-12-29 17:00:00', NULL),
(963, 119, 77, 1, NULL, '2025-12-29 17:00:00', NULL),
(964, 119, 75, 2, NULL, '2025-12-29 17:00:00', NULL),
(965, 119, 74, 3, NULL, '2025-12-29 17:00:00', NULL),
(966, 119, 66, 4, NULL, '2025-12-29 17:00:00', NULL),
(967, 119, 65, 5, NULL, '2025-12-29 17:00:00', NULL),
(968, 119, 64, 6, NULL, '2025-12-29 17:00:00', NULL),
(969, 119, 62, 7, NULL, '2025-12-29 17:00:00', NULL),
(970, 119, 38, 8, NULL, '2025-12-29 17:00:00', NULL),
(971, 119, 37, 9, NULL, '2025-12-29 17:00:00', NULL);
INSERT INTO `customer_network_matrixes` (`id`, `member_id`, `sponsor_id`, `level`, `description`, `created_at`, `updated_at`) VALUES
(972, 119, 36, 10, NULL, '2025-12-29 17:00:00', NULL),
(973, 119, 26, 11, NULL, '2025-12-29 17:00:00', NULL),
(974, 119, 24, 12, NULL, '2025-12-29 17:00:00', NULL),
(975, 119, 23, 13, NULL, '2025-12-29 17:00:00', NULL),
(976, 119, 22, 14, NULL, '2025-12-29 17:00:00', NULL),
(977, 119, 19, 15, NULL, '2025-12-29 17:00:00', NULL),
(978, 120, 86, 1, NULL, '2025-12-29 17:00:00', NULL),
(979, 120, 76, 2, NULL, '2025-12-29 17:00:00', NULL),
(980, 120, 74, 3, NULL, '2025-12-29 17:00:00', NULL),
(981, 120, 66, 4, NULL, '2025-12-29 17:00:00', NULL),
(982, 120, 65, 5, NULL, '2025-12-29 17:00:00', NULL),
(983, 120, 64, 6, NULL, '2025-12-29 17:00:00', NULL),
(984, 120, 62, 7, NULL, '2025-12-29 17:00:00', NULL),
(985, 120, 38, 8, NULL, '2025-12-29 17:00:00', NULL),
(986, 120, 37, 9, NULL, '2025-12-29 17:00:00', NULL),
(987, 120, 36, 10, NULL, '2025-12-29 17:00:00', NULL),
(988, 120, 26, 11, NULL, '2025-12-29 17:00:00', NULL),
(989, 120, 24, 12, NULL, '2025-12-29 17:00:00', NULL),
(990, 120, 23, 13, NULL, '2025-12-29 17:00:00', NULL),
(991, 120, 22, 14, NULL, '2025-12-29 17:00:00', NULL),
(992, 120, 19, 15, NULL, '2025-12-29 17:00:00', NULL),
(993, 163, 120, 1, NULL, '2025-12-29 17:00:00', NULL),
(994, 163, 86, 2, NULL, '2025-12-29 17:00:00', NULL),
(995, 163, 76, 3, NULL, '2025-12-29 17:00:00', NULL),
(996, 163, 74, 4, NULL, '2025-12-29 17:00:00', NULL),
(997, 163, 66, 5, NULL, '2025-12-29 17:00:00', NULL),
(998, 163, 65, 6, NULL, '2025-12-29 17:00:00', NULL),
(999, 163, 64, 7, NULL, '2025-12-29 17:00:00', NULL),
(1000, 163, 62, 8, NULL, '2025-12-29 17:00:00', NULL),
(1001, 163, 38, 9, NULL, '2025-12-29 17:00:00', NULL),
(1002, 163, 37, 10, NULL, '2025-12-29 17:00:00', NULL),
(1003, 163, 36, 11, NULL, '2025-12-29 17:00:00', NULL),
(1004, 163, 26, 12, NULL, '2025-12-29 17:00:00', NULL),
(1005, 163, 24, 13, NULL, '2025-12-29 17:00:00', NULL),
(1006, 163, 23, 14, NULL, '2025-12-29 17:00:00', NULL),
(1007, 163, 22, 15, NULL, '2025-12-29 17:00:00', NULL),
(1008, 163, 19, 16, NULL, '2025-12-29 17:00:00', NULL),
(1009, 164, 163, 1, NULL, '2025-12-29 17:00:00', NULL),
(1010, 164, 120, 2, NULL, '2025-12-29 17:00:00', NULL),
(1011, 164, 86, 3, NULL, '2025-12-29 17:00:00', NULL),
(1012, 164, 76, 4, NULL, '2025-12-29 17:00:00', NULL),
(1013, 164, 74, 5, NULL, '2025-12-29 17:00:00', NULL),
(1014, 164, 66, 6, NULL, '2025-12-29 17:00:00', NULL),
(1015, 164, 65, 7, NULL, '2025-12-29 17:00:00', NULL),
(1016, 164, 64, 8, NULL, '2025-12-29 17:00:00', NULL),
(1017, 164, 62, 9, NULL, '2025-12-29 17:00:00', NULL),
(1018, 164, 38, 10, NULL, '2025-12-29 17:00:00', NULL),
(1019, 164, 37, 11, NULL, '2025-12-29 17:00:00', NULL),
(1020, 164, 36, 12, NULL, '2025-12-29 17:00:00', NULL),
(1021, 164, 26, 13, NULL, '2025-12-29 17:00:00', NULL),
(1022, 164, 24, 14, NULL, '2025-12-29 17:00:00', NULL),
(1023, 164, 23, 15, NULL, '2025-12-29 17:00:00', NULL),
(1024, 164, 22, 16, NULL, '2025-12-29 17:00:00', NULL),
(1025, 164, 19, 17, NULL, '2025-12-29 17:00:00', NULL),
(1026, 165, 164, 1, NULL, '2025-12-29 17:00:00', NULL),
(1027, 165, 163, 2, NULL, '2025-12-29 17:00:00', NULL),
(1028, 165, 120, 3, NULL, '2025-12-29 17:00:00', NULL),
(1029, 165, 86, 4, NULL, '2025-12-29 17:00:00', NULL),
(1030, 165, 76, 5, NULL, '2025-12-29 17:00:00', NULL),
(1031, 165, 74, 6, NULL, '2025-12-29 17:00:00', NULL),
(1032, 165, 66, 7, NULL, '2025-12-29 17:00:00', NULL),
(1033, 165, 65, 8, NULL, '2025-12-29 17:00:00', NULL),
(1034, 165, 64, 9, NULL, '2025-12-29 17:00:00', NULL),
(1035, 165, 62, 10, NULL, '2025-12-29 17:00:00', NULL),
(1036, 165, 38, 11, NULL, '2025-12-29 17:00:00', NULL),
(1037, 165, 37, 12, NULL, '2025-12-29 17:00:00', NULL),
(1038, 165, 36, 13, NULL, '2025-12-29 17:00:00', NULL),
(1039, 165, 26, 14, NULL, '2025-12-29 17:00:00', NULL),
(1040, 165, 24, 15, NULL, '2025-12-29 17:00:00', NULL),
(1041, 165, 23, 16, NULL, '2025-12-29 17:00:00', NULL),
(1042, 165, 22, 17, NULL, '2025-12-29 17:00:00', NULL),
(1043, 165, 19, 18, NULL, '2025-12-29 17:00:00', NULL),
(1044, 166, 165, 1, NULL, '2025-12-29 17:00:00', NULL),
(1045, 166, 164, 2, NULL, '2025-12-29 17:00:00', NULL),
(1046, 166, 163, 3, NULL, '2025-12-29 17:00:00', NULL),
(1047, 166, 120, 4, NULL, '2025-12-29 17:00:00', NULL),
(1048, 166, 86, 5, NULL, '2025-12-29 17:00:00', NULL),
(1049, 166, 76, 6, NULL, '2025-12-29 17:00:00', NULL),
(1050, 166, 74, 7, NULL, '2025-12-29 17:00:00', NULL),
(1051, 166, 66, 8, NULL, '2025-12-29 17:00:00', NULL),
(1052, 166, 65, 9, NULL, '2025-12-29 17:00:00', NULL),
(1053, 166, 64, 10, NULL, '2025-12-29 17:00:00', NULL),
(1054, 166, 62, 11, NULL, '2025-12-29 17:00:00', NULL),
(1055, 166, 38, 12, NULL, '2025-12-29 17:00:00', NULL),
(1056, 166, 37, 13, NULL, '2025-12-29 17:00:00', NULL),
(1057, 166, 36, 14, NULL, '2025-12-29 17:00:00', NULL),
(1058, 166, 26, 15, NULL, '2025-12-29 17:00:00', NULL),
(1059, 166, 24, 16, NULL, '2025-12-29 17:00:00', NULL),
(1060, 166, 23, 17, NULL, '2025-12-29 17:00:00', NULL),
(1061, 166, 22, 18, NULL, '2025-12-29 17:00:00', NULL),
(1062, 166, 19, 19, NULL, '2025-12-29 17:00:00', NULL),
(1063, 167, 120, 1, NULL, '2025-12-29 17:00:00', NULL),
(1064, 167, 86, 2, NULL, '2025-12-29 17:00:00', NULL),
(1065, 167, 76, 3, NULL, '2025-12-29 17:00:00', NULL),
(1066, 167, 74, 4, NULL, '2025-12-29 17:00:00', NULL),
(1067, 167, 66, 5, NULL, '2025-12-29 17:00:00', NULL),
(1068, 167, 65, 6, NULL, '2025-12-29 17:00:00', NULL),
(1069, 167, 64, 7, NULL, '2025-12-29 17:00:00', NULL),
(1070, 167, 62, 8, NULL, '2025-12-29 17:00:00', NULL),
(1071, 167, 38, 9, NULL, '2025-12-29 17:00:00', NULL),
(1072, 167, 37, 10, NULL, '2025-12-29 17:00:00', NULL),
(1073, 167, 36, 11, NULL, '2025-12-29 17:00:00', NULL),
(1074, 167, 26, 12, NULL, '2025-12-29 17:00:00', NULL),
(1075, 167, 24, 13, NULL, '2025-12-29 17:00:00', NULL),
(1076, 167, 23, 14, NULL, '2025-12-29 17:00:00', NULL),
(1077, 167, 22, 15, NULL, '2025-12-29 17:00:00', NULL),
(1078, 167, 19, 16, NULL, '2025-12-29 17:00:00', NULL),
(1079, 169, 167, 1, NULL, '2025-12-29 17:00:00', NULL),
(1080, 169, 120, 2, NULL, '2025-12-29 17:00:00', NULL),
(1081, 169, 86, 3, NULL, '2025-12-29 17:00:00', NULL),
(1082, 169, 76, 4, NULL, '2025-12-29 17:00:00', NULL),
(1083, 169, 74, 5, NULL, '2025-12-29 17:00:00', NULL),
(1084, 169, 66, 6, NULL, '2025-12-29 17:00:00', NULL),
(1085, 169, 65, 7, NULL, '2025-12-29 17:00:00', NULL),
(1086, 169, 64, 8, NULL, '2025-12-29 17:00:00', NULL),
(1087, 169, 62, 9, NULL, '2025-12-29 17:00:00', NULL),
(1088, 169, 38, 10, NULL, '2025-12-29 17:00:00', NULL),
(1089, 169, 37, 11, NULL, '2025-12-29 17:00:00', NULL),
(1090, 169, 36, 12, NULL, '2025-12-29 17:00:00', NULL),
(1091, 169, 26, 13, NULL, '2025-12-29 17:00:00', NULL),
(1092, 169, 24, 14, NULL, '2025-12-29 17:00:00', NULL),
(1093, 169, 23, 15, NULL, '2025-12-29 17:00:00', NULL),
(1094, 169, 22, 16, NULL, '2025-12-29 17:00:00', NULL),
(1095, 169, 19, 17, NULL, '2025-12-29 17:00:00', NULL),
(1096, 168, 167, 1, NULL, '2025-12-29 17:00:00', NULL),
(1097, 168, 120, 2, NULL, '2025-12-29 17:00:00', NULL),
(1098, 168, 86, 3, NULL, '2025-12-29 17:00:00', NULL),
(1099, 168, 76, 4, NULL, '2025-12-29 17:00:00', NULL),
(1100, 168, 74, 5, NULL, '2025-12-29 17:00:00', NULL),
(1101, 168, 66, 6, NULL, '2025-12-29 17:00:00', NULL),
(1102, 168, 65, 7, NULL, '2025-12-29 17:00:00', NULL),
(1103, 168, 64, 8, NULL, '2025-12-29 17:00:00', NULL),
(1104, 168, 62, 9, NULL, '2025-12-29 17:00:00', NULL),
(1105, 168, 38, 10, NULL, '2025-12-29 17:00:00', NULL),
(1106, 168, 37, 11, NULL, '2025-12-29 17:00:00', NULL),
(1107, 168, 36, 12, NULL, '2025-12-29 17:00:00', NULL),
(1108, 168, 26, 13, NULL, '2025-12-29 17:00:00', NULL),
(1109, 168, 24, 14, NULL, '2025-12-29 17:00:00', NULL),
(1110, 168, 23, 15, NULL, '2025-12-29 17:00:00', NULL),
(1111, 168, 22, 16, NULL, '2025-12-29 17:00:00', NULL),
(1112, 168, 19, 17, NULL, '2025-12-29 17:00:00', NULL),
(1113, 170, 163, 1, NULL, '2025-12-30 17:00:00', NULL),
(1114, 170, 120, 2, NULL, '2025-12-30 17:00:00', NULL),
(1115, 170, 86, 3, NULL, '2025-12-30 17:00:00', NULL),
(1116, 170, 76, 4, NULL, '2025-12-30 17:00:00', NULL),
(1117, 170, 74, 5, NULL, '2025-12-30 17:00:00', NULL),
(1118, 170, 66, 6, NULL, '2025-12-30 17:00:00', NULL),
(1119, 170, 65, 7, NULL, '2025-12-30 17:00:00', NULL),
(1120, 170, 64, 8, NULL, '2025-12-30 17:00:00', NULL),
(1121, 170, 62, 9, NULL, '2025-12-30 17:00:00', NULL),
(1122, 170, 38, 10, NULL, '2025-12-30 17:00:00', NULL),
(1123, 170, 37, 11, NULL, '2025-12-30 17:00:00', NULL),
(1124, 170, 36, 12, NULL, '2025-12-30 17:00:00', NULL),
(1125, 170, 26, 13, NULL, '2025-12-30 17:00:00', NULL),
(1126, 170, 24, 14, NULL, '2025-12-30 17:00:00', NULL),
(1127, 170, 23, 15, NULL, '2025-12-30 17:00:00', NULL),
(1128, 170, 22, 16, NULL, '2025-12-30 17:00:00', NULL),
(1129, 170, 19, 17, NULL, '2025-12-30 17:00:00', NULL),
(1130, 171, 170, 1, NULL, '2025-12-30 17:00:00', NULL),
(1131, 171, 163, 2, NULL, '2025-12-30 17:00:00', NULL),
(1132, 171, 120, 3, NULL, '2025-12-30 17:00:00', NULL),
(1133, 171, 86, 4, NULL, '2025-12-30 17:00:00', NULL),
(1134, 171, 76, 5, NULL, '2025-12-30 17:00:00', NULL),
(1135, 171, 74, 6, NULL, '2025-12-30 17:00:00', NULL),
(1136, 171, 66, 7, NULL, '2025-12-30 17:00:00', NULL),
(1137, 171, 65, 8, NULL, '2025-12-30 17:00:00', NULL),
(1138, 171, 64, 9, NULL, '2025-12-30 17:00:00', NULL),
(1139, 171, 62, 10, NULL, '2025-12-30 17:00:00', NULL),
(1140, 171, 38, 11, NULL, '2025-12-30 17:00:00', NULL),
(1141, 171, 37, 12, NULL, '2025-12-30 17:00:00', NULL),
(1142, 171, 36, 13, NULL, '2025-12-30 17:00:00', NULL),
(1143, 171, 26, 14, NULL, '2025-12-30 17:00:00', NULL),
(1144, 171, 24, 15, NULL, '2025-12-30 17:00:00', NULL),
(1145, 171, 23, 16, NULL, '2025-12-30 17:00:00', NULL),
(1146, 171, 22, 17, NULL, '2025-12-30 17:00:00', NULL),
(1147, 171, 19, 18, NULL, '2025-12-30 17:00:00', NULL),
(1148, 172, 60, 1, NULL, '2025-12-30 17:00:00', NULL),
(1149, 172, 54, 2, NULL, '2025-12-30 17:00:00', NULL),
(1150, 172, 52, 3, NULL, '2025-12-30 17:00:00', NULL),
(1151, 172, 50, 4, NULL, '2025-12-30 17:00:00', NULL),
(1152, 172, 49, 5, NULL, '2025-12-30 17:00:00', NULL),
(1153, 172, 35, 6, NULL, '2025-12-30 17:00:00', NULL),
(1154, 172, 34, 7, NULL, '2025-12-30 17:00:00', NULL),
(1155, 172, 33, 8, NULL, '2025-12-30 17:00:00', NULL),
(1156, 172, 25, 9, NULL, '2025-12-30 17:00:00', NULL),
(1157, 172, 24, 10, NULL, '2025-12-30 17:00:00', NULL),
(1158, 172, 23, 11, NULL, '2025-12-30 17:00:00', NULL),
(1159, 172, 22, 12, NULL, '2025-12-30 17:00:00', NULL),
(1160, 172, 19, 13, NULL, '2025-12-30 17:00:00', NULL),
(1161, 173, 119, 1, NULL, '2025-12-30 17:00:00', NULL),
(1162, 173, 77, 2, NULL, '2025-12-30 17:00:00', NULL),
(1163, 173, 75, 3, NULL, '2025-12-30 17:00:00', NULL),
(1164, 173, 74, 4, NULL, '2025-12-30 17:00:00', NULL),
(1165, 173, 66, 5, NULL, '2025-12-30 17:00:00', NULL),
(1166, 173, 65, 6, NULL, '2025-12-30 17:00:00', NULL),
(1167, 173, 64, 7, NULL, '2025-12-30 17:00:00', NULL),
(1168, 173, 62, 8, NULL, '2025-12-30 17:00:00', NULL),
(1169, 173, 38, 9, NULL, '2025-12-30 17:00:00', NULL),
(1170, 173, 37, 10, NULL, '2025-12-30 17:00:00', NULL),
(1171, 173, 36, 11, NULL, '2025-12-30 17:00:00', NULL),
(1172, 173, 26, 12, NULL, '2025-12-30 17:00:00', NULL),
(1173, 173, 24, 13, NULL, '2025-12-30 17:00:00', NULL),
(1174, 173, 23, 14, NULL, '2025-12-30 17:00:00', NULL),
(1175, 173, 22, 15, NULL, '2025-12-30 17:00:00', NULL),
(1176, 173, 19, 16, NULL, '2025-12-30 17:00:00', NULL),
(1177, 174, 173, 1, NULL, '2025-12-30 17:00:00', NULL),
(1178, 174, 119, 2, NULL, '2025-12-30 17:00:00', NULL),
(1179, 174, 77, 3, NULL, '2025-12-30 17:00:00', NULL),
(1180, 174, 75, 4, NULL, '2025-12-30 17:00:00', NULL),
(1181, 174, 74, 5, NULL, '2025-12-30 17:00:00', NULL),
(1182, 174, 66, 6, NULL, '2025-12-30 17:00:00', NULL),
(1183, 174, 65, 7, NULL, '2025-12-30 17:00:00', NULL),
(1184, 174, 64, 8, NULL, '2025-12-30 17:00:00', NULL),
(1185, 174, 62, 9, NULL, '2025-12-30 17:00:00', NULL),
(1186, 174, 38, 10, NULL, '2025-12-30 17:00:00', NULL),
(1187, 174, 37, 11, NULL, '2025-12-30 17:00:00', NULL),
(1188, 174, 36, 12, NULL, '2025-12-30 17:00:00', NULL),
(1189, 174, 26, 13, NULL, '2025-12-30 17:00:00', NULL),
(1190, 174, 24, 14, NULL, '2025-12-30 17:00:00', NULL),
(1191, 174, 23, 15, NULL, '2025-12-30 17:00:00', NULL),
(1192, 174, 22, 16, NULL, '2025-12-30 17:00:00', NULL),
(1193, 174, 19, 17, NULL, '2025-12-30 17:00:00', NULL),
(1194, 175, 173, 1, NULL, '2025-12-30 17:00:00', NULL),
(1195, 175, 119, 2, NULL, '2025-12-30 17:00:00', NULL),
(1196, 175, 77, 3, NULL, '2025-12-30 17:00:00', NULL),
(1197, 175, 75, 4, NULL, '2025-12-30 17:00:00', NULL),
(1198, 175, 74, 5, NULL, '2025-12-30 17:00:00', NULL),
(1199, 175, 66, 6, NULL, '2025-12-30 17:00:00', NULL),
(1200, 175, 65, 7, NULL, '2025-12-30 17:00:00', NULL),
(1201, 175, 64, 8, NULL, '2025-12-30 17:00:00', NULL),
(1202, 175, 62, 9, NULL, '2025-12-30 17:00:00', NULL),
(1203, 175, 38, 10, NULL, '2025-12-30 17:00:00', NULL),
(1204, 175, 37, 11, NULL, '2025-12-30 17:00:00', NULL),
(1205, 175, 36, 12, NULL, '2025-12-30 17:00:00', NULL),
(1206, 175, 26, 13, NULL, '2025-12-30 17:00:00', NULL),
(1207, 175, 24, 14, NULL, '2025-12-30 17:00:00', NULL),
(1208, 175, 23, 15, NULL, '2025-12-30 17:00:00', NULL),
(1209, 175, 22, 16, NULL, '2025-12-30 17:00:00', NULL),
(1210, 175, 19, 17, NULL, '2025-12-30 17:00:00', NULL),
(1211, 176, 174, 1, NULL, '2025-12-30 17:00:00', NULL),
(1212, 176, 173, 2, NULL, '2025-12-30 17:00:00', NULL),
(1213, 176, 119, 3, NULL, '2025-12-30 17:00:00', NULL),
(1214, 176, 77, 4, NULL, '2025-12-30 17:00:00', NULL),
(1215, 176, 75, 5, NULL, '2025-12-30 17:00:00', NULL),
(1216, 176, 74, 6, NULL, '2025-12-30 17:00:00', NULL),
(1217, 176, 66, 7, NULL, '2025-12-30 17:00:00', NULL),
(1218, 176, 65, 8, NULL, '2025-12-30 17:00:00', NULL),
(1219, 176, 64, 9, NULL, '2025-12-30 17:00:00', NULL),
(1220, 176, 62, 10, NULL, '2025-12-30 17:00:00', NULL),
(1221, 176, 38, 11, NULL, '2025-12-30 17:00:00', NULL),
(1222, 176, 37, 12, NULL, '2025-12-30 17:00:00', NULL),
(1223, 176, 36, 13, NULL, '2025-12-30 17:00:00', NULL),
(1224, 176, 26, 14, NULL, '2025-12-30 17:00:00', NULL),
(1225, 176, 24, 15, NULL, '2025-12-30 17:00:00', NULL),
(1226, 176, 23, 16, NULL, '2025-12-30 17:00:00', NULL),
(1227, 176, 22, 17, NULL, '2025-12-30 17:00:00', NULL),
(1228, 176, 19, 18, NULL, '2025-12-30 17:00:00', NULL),
(1229, 177, 176, 1, NULL, '2025-12-30 17:00:00', NULL),
(1230, 177, 174, 2, NULL, '2025-12-30 17:00:00', NULL),
(1231, 177, 173, 3, NULL, '2025-12-30 17:00:00', NULL),
(1232, 177, 119, 4, NULL, '2025-12-30 17:00:00', NULL),
(1233, 177, 77, 5, NULL, '2025-12-30 17:00:00', NULL),
(1234, 177, 75, 6, NULL, '2025-12-30 17:00:00', NULL),
(1235, 177, 74, 7, NULL, '2025-12-30 17:00:00', NULL),
(1236, 177, 66, 8, NULL, '2025-12-30 17:00:00', NULL),
(1237, 177, 65, 9, NULL, '2025-12-30 17:00:00', NULL),
(1238, 177, 64, 10, NULL, '2025-12-30 17:00:00', NULL),
(1239, 177, 62, 11, NULL, '2025-12-30 17:00:00', NULL),
(1240, 177, 38, 12, NULL, '2025-12-30 17:00:00', NULL),
(1241, 177, 37, 13, NULL, '2025-12-30 17:00:00', NULL),
(1242, 177, 36, 14, NULL, '2025-12-30 17:00:00', NULL),
(1243, 177, 26, 15, NULL, '2025-12-30 17:00:00', NULL),
(1244, 177, 24, 16, NULL, '2025-12-30 17:00:00', NULL),
(1245, 177, 23, 17, NULL, '2025-12-30 17:00:00', NULL),
(1246, 177, 22, 18, NULL, '2025-12-30 17:00:00', NULL),
(1247, 177, 19, 19, NULL, '2025-12-30 17:00:00', NULL),
(1248, 178, 177, 1, NULL, '2025-12-30 17:00:00', NULL),
(1249, 178, 176, 2, NULL, '2025-12-30 17:00:00', NULL),
(1250, 178, 174, 3, NULL, '2025-12-30 17:00:00', NULL),
(1251, 178, 173, 4, NULL, '2025-12-30 17:00:00', NULL),
(1252, 178, 119, 5, NULL, '2025-12-30 17:00:00', NULL),
(1253, 178, 77, 6, NULL, '2025-12-30 17:00:00', NULL),
(1254, 178, 75, 7, NULL, '2025-12-30 17:00:00', NULL),
(1255, 178, 74, 8, NULL, '2025-12-30 17:00:00', NULL),
(1256, 178, 66, 9, NULL, '2025-12-30 17:00:00', NULL),
(1257, 178, 65, 10, NULL, '2025-12-30 17:00:00', NULL),
(1258, 178, 64, 11, NULL, '2025-12-30 17:00:00', NULL),
(1259, 178, 62, 12, NULL, '2025-12-30 17:00:00', NULL),
(1260, 178, 38, 13, NULL, '2025-12-30 17:00:00', NULL),
(1261, 178, 37, 14, NULL, '2025-12-30 17:00:00', NULL),
(1262, 178, 36, 15, NULL, '2025-12-30 17:00:00', NULL),
(1263, 178, 26, 16, NULL, '2025-12-30 17:00:00', NULL),
(1264, 178, 24, 17, NULL, '2025-12-30 17:00:00', NULL),
(1265, 178, 23, 18, NULL, '2025-12-30 17:00:00', NULL),
(1266, 178, 22, 19, NULL, '2025-12-30 17:00:00', NULL),
(1267, 178, 19, 20, NULL, '2025-12-30 17:00:00', NULL),
(1268, 179, 178, 1, NULL, '2025-12-30 17:00:00', NULL),
(1269, 179, 177, 2, NULL, '2025-12-30 17:00:00', NULL),
(1270, 179, 176, 3, NULL, '2025-12-30 17:00:00', NULL),
(1271, 179, 174, 4, NULL, '2025-12-30 17:00:00', NULL),
(1272, 179, 173, 5, NULL, '2025-12-30 17:00:00', NULL),
(1273, 179, 119, 6, NULL, '2025-12-30 17:00:00', NULL),
(1274, 179, 77, 7, NULL, '2025-12-30 17:00:00', NULL),
(1275, 179, 75, 8, NULL, '2025-12-30 17:00:00', NULL),
(1276, 179, 74, 9, NULL, '2025-12-30 17:00:00', NULL),
(1277, 179, 66, 10, NULL, '2025-12-30 17:00:00', NULL),
(1278, 179, 65, 11, NULL, '2025-12-30 17:00:00', NULL),
(1279, 179, 64, 12, NULL, '2025-12-30 17:00:00', NULL),
(1280, 179, 62, 13, NULL, '2025-12-30 17:00:00', NULL),
(1281, 179, 38, 14, NULL, '2025-12-30 17:00:00', NULL),
(1282, 179, 37, 15, NULL, '2025-12-30 17:00:00', NULL),
(1283, 179, 36, 16, NULL, '2025-12-30 17:00:00', NULL),
(1284, 179, 26, 17, NULL, '2025-12-30 17:00:00', NULL),
(1285, 179, 24, 18, NULL, '2025-12-30 17:00:00', NULL),
(1286, 179, 23, 19, NULL, '2025-12-30 17:00:00', NULL),
(1287, 179, 22, 20, NULL, '2025-12-30 17:00:00', NULL),
(1288, 179, 19, 21, NULL, '2025-12-30 17:00:00', NULL),
(1289, 180, 177, 1, NULL, '2025-12-30 17:00:00', NULL),
(1290, 180, 176, 2, NULL, '2025-12-30 17:00:00', NULL),
(1291, 180, 174, 3, NULL, '2025-12-30 17:00:00', NULL),
(1292, 180, 173, 4, NULL, '2025-12-30 17:00:00', NULL),
(1293, 180, 119, 5, NULL, '2025-12-30 17:00:00', NULL),
(1294, 180, 77, 6, NULL, '2025-12-30 17:00:00', NULL),
(1295, 180, 75, 7, NULL, '2025-12-30 17:00:00', NULL),
(1296, 180, 74, 8, NULL, '2025-12-30 17:00:00', NULL),
(1297, 180, 66, 9, NULL, '2025-12-30 17:00:00', NULL),
(1298, 180, 65, 10, NULL, '2025-12-30 17:00:00', NULL),
(1299, 180, 64, 11, NULL, '2025-12-30 17:00:00', NULL),
(1300, 180, 62, 12, NULL, '2025-12-30 17:00:00', NULL),
(1301, 180, 38, 13, NULL, '2025-12-30 17:00:00', NULL),
(1302, 180, 37, 14, NULL, '2025-12-30 17:00:00', NULL),
(1303, 180, 36, 15, NULL, '2025-12-30 17:00:00', NULL),
(1304, 180, 26, 16, NULL, '2025-12-30 17:00:00', NULL),
(1305, 180, 24, 17, NULL, '2025-12-30 17:00:00', NULL),
(1306, 180, 23, 18, NULL, '2025-12-30 17:00:00', NULL),
(1307, 180, 22, 19, NULL, '2025-12-30 17:00:00', NULL),
(1308, 180, 19, 20, NULL, '2025-12-30 17:00:00', NULL),
(1309, 182, 180, 1, NULL, '2025-12-30 17:00:00', NULL),
(1310, 182, 177, 2, NULL, '2025-12-30 17:00:00', NULL),
(1311, 182, 176, 3, NULL, '2025-12-30 17:00:00', NULL),
(1312, 182, 174, 4, NULL, '2025-12-30 17:00:00', NULL),
(1313, 182, 173, 5, NULL, '2025-12-30 17:00:00', NULL),
(1314, 182, 119, 6, NULL, '2025-12-30 17:00:00', NULL),
(1315, 182, 77, 7, NULL, '2025-12-30 17:00:00', NULL),
(1316, 182, 75, 8, NULL, '2025-12-30 17:00:00', NULL),
(1317, 182, 74, 9, NULL, '2025-12-30 17:00:00', NULL),
(1318, 182, 66, 10, NULL, '2025-12-30 17:00:00', NULL),
(1319, 182, 65, 11, NULL, '2025-12-30 17:00:00', NULL),
(1320, 182, 64, 12, NULL, '2025-12-30 17:00:00', NULL),
(1321, 182, 62, 13, NULL, '2025-12-30 17:00:00', NULL),
(1322, 182, 38, 14, NULL, '2025-12-30 17:00:00', NULL),
(1323, 182, 37, 15, NULL, '2025-12-30 17:00:00', NULL),
(1324, 182, 36, 16, NULL, '2025-12-30 17:00:00', NULL),
(1325, 182, 26, 17, NULL, '2025-12-30 17:00:00', NULL),
(1326, 182, 24, 18, NULL, '2025-12-30 17:00:00', NULL),
(1327, 182, 23, 19, NULL, '2025-12-30 17:00:00', NULL),
(1328, 182, 22, 20, NULL, '2025-12-30 17:00:00', NULL),
(1329, 182, 19, 21, NULL, '2025-12-30 17:00:00', NULL),
(1330, 183, 119, 1, NULL, '2025-12-30 17:00:00', NULL),
(1331, 183, 77, 2, NULL, '2025-12-30 17:00:00', NULL),
(1332, 183, 75, 3, NULL, '2025-12-30 17:00:00', NULL),
(1333, 183, 74, 4, NULL, '2025-12-30 17:00:00', NULL),
(1334, 183, 66, 5, NULL, '2025-12-30 17:00:00', NULL),
(1335, 183, 65, 6, NULL, '2025-12-30 17:00:00', NULL),
(1336, 183, 64, 7, NULL, '2025-12-30 17:00:00', NULL),
(1337, 183, 62, 8, NULL, '2025-12-30 17:00:00', NULL),
(1338, 183, 38, 9, NULL, '2025-12-30 17:00:00', NULL),
(1339, 183, 37, 10, NULL, '2025-12-30 17:00:00', NULL),
(1340, 183, 36, 11, NULL, '2025-12-30 17:00:00', NULL),
(1341, 183, 26, 12, NULL, '2025-12-30 17:00:00', NULL),
(1342, 183, 24, 13, NULL, '2025-12-30 17:00:00', NULL),
(1343, 183, 23, 14, NULL, '2025-12-30 17:00:00', NULL),
(1344, 183, 22, 15, NULL, '2025-12-30 17:00:00', NULL),
(1345, 183, 19, 16, NULL, '2025-12-30 17:00:00', NULL),
(1346, 185, 170, 1, NULL, '2026-01-01 17:00:00', NULL),
(1347, 185, 163, 2, NULL, '2026-01-01 17:00:00', NULL),
(1348, 185, 120, 3, NULL, '2026-01-01 17:00:00', NULL),
(1349, 185, 86, 4, NULL, '2026-01-01 17:00:00', NULL),
(1350, 185, 76, 5, NULL, '2026-01-01 17:00:00', NULL),
(1351, 185, 74, 6, NULL, '2026-01-01 17:00:00', NULL),
(1352, 185, 66, 7, NULL, '2026-01-01 17:00:00', NULL),
(1353, 185, 65, 8, NULL, '2026-01-01 17:00:00', NULL),
(1354, 185, 64, 9, NULL, '2026-01-01 17:00:00', NULL),
(1355, 185, 62, 10, NULL, '2026-01-01 17:00:00', NULL),
(1356, 185, 38, 11, NULL, '2026-01-01 17:00:00', NULL),
(1357, 185, 37, 12, NULL, '2026-01-01 17:00:00', NULL),
(1358, 185, 36, 13, NULL, '2026-01-01 17:00:00', NULL),
(1359, 185, 26, 14, NULL, '2026-01-01 17:00:00', NULL),
(1360, 185, 24, 15, NULL, '2026-01-01 17:00:00', NULL),
(1361, 185, 23, 16, NULL, '2026-01-01 17:00:00', NULL),
(1362, 185, 22, 17, NULL, '2026-01-01 17:00:00', NULL),
(1363, 185, 19, 18, NULL, '2026-01-01 17:00:00', NULL),
(1364, 121, 80, 1, NULL, '2026-01-01 17:00:00', NULL),
(1365, 121, 75, 2, NULL, '2026-01-01 17:00:00', NULL),
(1366, 121, 74, 3, NULL, '2026-01-01 17:00:00', NULL),
(1367, 121, 66, 4, NULL, '2026-01-01 17:00:00', NULL),
(1368, 121, 65, 5, NULL, '2026-01-01 17:00:00', NULL),
(1369, 121, 64, 6, NULL, '2026-01-01 17:00:00', NULL),
(1370, 121, 62, 7, NULL, '2026-01-01 17:00:00', NULL),
(1371, 121, 38, 8, NULL, '2026-01-01 17:00:00', NULL),
(1372, 121, 37, 9, NULL, '2026-01-01 17:00:00', NULL),
(1373, 121, 36, 10, NULL, '2026-01-01 17:00:00', NULL),
(1374, 121, 26, 11, NULL, '2026-01-01 17:00:00', NULL),
(1375, 121, 24, 12, NULL, '2026-01-01 17:00:00', NULL),
(1376, 121, 23, 13, NULL, '2026-01-01 17:00:00', NULL),
(1377, 121, 22, 14, NULL, '2026-01-01 17:00:00', NULL),
(1378, 121, 19, 15, NULL, '2026-01-01 17:00:00', NULL),
(1379, 118, 117, 1, NULL, '2026-01-01 17:00:00', NULL),
(1380, 118, 74, 2, NULL, '2026-01-01 17:00:00', NULL),
(1381, 118, 66, 3, NULL, '2026-01-01 17:00:00', NULL),
(1382, 118, 65, 4, NULL, '2026-01-01 17:00:00', NULL),
(1383, 118, 64, 5, NULL, '2026-01-01 17:00:00', NULL),
(1384, 118, 62, 6, NULL, '2026-01-01 17:00:00', NULL),
(1385, 118, 38, 7, NULL, '2026-01-01 17:00:00', NULL),
(1386, 118, 37, 8, NULL, '2026-01-01 17:00:00', NULL),
(1387, 118, 36, 9, NULL, '2026-01-01 17:00:00', NULL),
(1388, 118, 26, 10, NULL, '2026-01-01 17:00:00', NULL),
(1389, 118, 24, 11, NULL, '2026-01-01 17:00:00', NULL),
(1390, 118, 23, 12, NULL, '2026-01-01 17:00:00', NULL),
(1391, 118, 22, 13, NULL, '2026-01-01 17:00:00', NULL),
(1392, 118, 19, 14, NULL, '2026-01-01 17:00:00', NULL),
(1393, 188, 117, 1, NULL, '2026-01-01 17:00:00', NULL),
(1394, 188, 74, 2, NULL, '2026-01-01 17:00:00', NULL),
(1395, 188, 66, 3, NULL, '2026-01-01 17:00:00', NULL),
(1396, 188, 65, 4, NULL, '2026-01-01 17:00:00', NULL),
(1397, 188, 64, 5, NULL, '2026-01-01 17:00:00', NULL),
(1398, 188, 62, 6, NULL, '2026-01-01 17:00:00', NULL),
(1399, 188, 38, 7, NULL, '2026-01-01 17:00:00', NULL),
(1400, 188, 37, 8, NULL, '2026-01-01 17:00:00', NULL),
(1401, 188, 36, 9, NULL, '2026-01-01 17:00:00', NULL),
(1402, 188, 26, 10, NULL, '2026-01-01 17:00:00', NULL),
(1403, 188, 24, 11, NULL, '2026-01-01 17:00:00', NULL),
(1404, 188, 23, 12, NULL, '2026-01-01 17:00:00', NULL),
(1405, 188, 22, 13, NULL, '2026-01-01 17:00:00', NULL),
(1406, 188, 19, 14, NULL, '2026-01-01 17:00:00', NULL),
(1407, 142, 75, 1, NULL, '2026-01-01 17:00:00', NULL),
(1408, 142, 74, 2, NULL, '2026-01-01 17:00:00', NULL),
(1409, 142, 66, 3, NULL, '2026-01-01 17:00:00', NULL),
(1410, 142, 65, 4, NULL, '2026-01-01 17:00:00', NULL),
(1411, 142, 64, 5, NULL, '2026-01-01 17:00:00', NULL),
(1412, 142, 62, 6, NULL, '2026-01-01 17:00:00', NULL),
(1413, 142, 38, 7, NULL, '2026-01-01 17:00:00', NULL),
(1414, 142, 37, 8, NULL, '2026-01-01 17:00:00', NULL),
(1415, 142, 36, 9, NULL, '2026-01-01 17:00:00', NULL),
(1416, 142, 26, 10, NULL, '2026-01-01 17:00:00', NULL),
(1417, 142, 24, 11, NULL, '2026-01-01 17:00:00', NULL),
(1418, 142, 23, 12, NULL, '2026-01-01 17:00:00', NULL),
(1419, 142, 22, 13, NULL, '2026-01-01 17:00:00', NULL),
(1420, 142, 19, 14, NULL, '2026-01-01 17:00:00', NULL),
(1421, 189, 76, 1, NULL, '2026-01-01 17:00:00', NULL),
(1422, 189, 74, 2, NULL, '2026-01-01 17:00:00', NULL),
(1423, 189, 66, 3, NULL, '2026-01-01 17:00:00', NULL),
(1424, 189, 65, 4, NULL, '2026-01-01 17:00:00', NULL),
(1425, 189, 64, 5, NULL, '2026-01-01 17:00:00', NULL),
(1426, 189, 62, 6, NULL, '2026-01-01 17:00:00', NULL),
(1427, 189, 38, 7, NULL, '2026-01-01 17:00:00', NULL),
(1428, 189, 37, 8, NULL, '2026-01-01 17:00:00', NULL),
(1429, 189, 36, 9, NULL, '2026-01-01 17:00:00', NULL),
(1430, 189, 26, 10, NULL, '2026-01-01 17:00:00', NULL),
(1431, 189, 24, 11, NULL, '2026-01-01 17:00:00', NULL),
(1432, 189, 23, 12, NULL, '2026-01-01 17:00:00', NULL),
(1433, 189, 22, 13, NULL, '2026-01-01 17:00:00', NULL),
(1434, 189, 19, 14, NULL, '2026-01-01 17:00:00', NULL),
(1435, 190, 118, 1, NULL, '2026-01-01 17:00:00', NULL),
(1436, 190, 117, 2, NULL, '2026-01-01 17:00:00', NULL),
(1437, 190, 74, 3, NULL, '2026-01-01 17:00:00', NULL),
(1438, 190, 66, 4, NULL, '2026-01-01 17:00:00', NULL),
(1439, 190, 65, 5, NULL, '2026-01-01 17:00:00', NULL),
(1440, 190, 64, 6, NULL, '2026-01-01 17:00:00', NULL),
(1441, 190, 62, 7, NULL, '2026-01-01 17:00:00', NULL),
(1442, 190, 38, 8, NULL, '2026-01-01 17:00:00', NULL),
(1443, 190, 37, 9, NULL, '2026-01-01 17:00:00', NULL),
(1444, 190, 36, 10, NULL, '2026-01-01 17:00:00', NULL),
(1445, 190, 26, 11, NULL, '2026-01-01 17:00:00', NULL),
(1446, 190, 24, 12, NULL, '2026-01-01 17:00:00', NULL),
(1447, 190, 23, 13, NULL, '2026-01-01 17:00:00', NULL),
(1448, 190, 22, 14, NULL, '2026-01-01 17:00:00', NULL),
(1449, 190, 19, 15, NULL, '2026-01-01 17:00:00', NULL),
(1450, 191, 190, 1, NULL, '2026-01-01 17:00:00', NULL),
(1451, 191, 118, 2, NULL, '2026-01-01 17:00:00', NULL),
(1452, 191, 117, 3, NULL, '2026-01-01 17:00:00', NULL),
(1453, 191, 74, 4, NULL, '2026-01-01 17:00:00', NULL),
(1454, 191, 66, 5, NULL, '2026-01-01 17:00:00', NULL),
(1455, 191, 65, 6, NULL, '2026-01-01 17:00:00', NULL),
(1456, 191, 64, 7, NULL, '2026-01-01 17:00:00', NULL),
(1457, 191, 62, 8, NULL, '2026-01-01 17:00:00', NULL),
(1458, 191, 38, 9, NULL, '2026-01-01 17:00:00', NULL),
(1459, 191, 37, 10, NULL, '2026-01-01 17:00:00', NULL),
(1460, 191, 36, 11, NULL, '2026-01-01 17:00:00', NULL),
(1461, 191, 26, 12, NULL, '2026-01-01 17:00:00', NULL),
(1462, 191, 24, 13, NULL, '2026-01-01 17:00:00', NULL),
(1463, 191, 23, 14, NULL, '2026-01-01 17:00:00', NULL),
(1464, 191, 22, 15, NULL, '2026-01-01 17:00:00', NULL),
(1465, 191, 19, 16, NULL, '2026-01-01 17:00:00', NULL),
(1466, 192, 190, 1, NULL, '2026-01-01 17:00:00', NULL),
(1467, 192, 118, 2, NULL, '2026-01-01 17:00:00', NULL),
(1468, 192, 117, 3, NULL, '2026-01-01 17:00:00', NULL),
(1469, 192, 74, 4, NULL, '2026-01-01 17:00:00', NULL),
(1470, 192, 66, 5, NULL, '2026-01-01 17:00:00', NULL),
(1471, 192, 65, 6, NULL, '2026-01-01 17:00:00', NULL),
(1472, 192, 64, 7, NULL, '2026-01-01 17:00:00', NULL),
(1473, 192, 62, 8, NULL, '2026-01-01 17:00:00', NULL),
(1474, 192, 38, 9, NULL, '2026-01-01 17:00:00', NULL),
(1475, 192, 37, 10, NULL, '2026-01-01 17:00:00', NULL),
(1476, 192, 36, 11, NULL, '2026-01-01 17:00:00', NULL),
(1477, 192, 26, 12, NULL, '2026-01-01 17:00:00', NULL),
(1478, 192, 24, 13, NULL, '2026-01-01 17:00:00', NULL),
(1479, 192, 23, 14, NULL, '2026-01-01 17:00:00', NULL),
(1480, 192, 22, 15, NULL, '2026-01-01 17:00:00', NULL),
(1481, 192, 19, 16, NULL, '2026-01-01 17:00:00', NULL),
(1482, 193, 191, 1, NULL, '2026-01-01 17:00:00', NULL),
(1483, 193, 190, 2, NULL, '2026-01-01 17:00:00', NULL),
(1484, 193, 118, 3, NULL, '2026-01-01 17:00:00', NULL),
(1485, 193, 117, 4, NULL, '2026-01-01 17:00:00', NULL),
(1486, 193, 74, 5, NULL, '2026-01-01 17:00:00', NULL),
(1487, 193, 66, 6, NULL, '2026-01-01 17:00:00', NULL),
(1488, 193, 65, 7, NULL, '2026-01-01 17:00:00', NULL),
(1489, 193, 64, 8, NULL, '2026-01-01 17:00:00', NULL),
(1490, 193, 62, 9, NULL, '2026-01-01 17:00:00', NULL),
(1491, 193, 38, 10, NULL, '2026-01-01 17:00:00', NULL),
(1492, 193, 37, 11, NULL, '2026-01-01 17:00:00', NULL),
(1493, 193, 36, 12, NULL, '2026-01-01 17:00:00', NULL),
(1494, 193, 26, 13, NULL, '2026-01-01 17:00:00', NULL),
(1495, 193, 24, 14, NULL, '2026-01-01 17:00:00', NULL),
(1496, 193, 23, 15, NULL, '2026-01-01 17:00:00', NULL),
(1497, 193, 22, 16, NULL, '2026-01-01 17:00:00', NULL),
(1498, 193, 19, 17, NULL, '2026-01-01 17:00:00', NULL),
(1499, 123, 92, 1, NULL, '2026-01-01 17:00:00', NULL),
(1500, 123, 87, 2, NULL, '2026-01-01 17:00:00', NULL),
(1501, 123, 86, 3, NULL, '2026-01-01 17:00:00', NULL),
(1502, 123, 76, 4, NULL, '2026-01-01 17:00:00', NULL),
(1503, 123, 74, 5, NULL, '2026-01-01 17:00:00', NULL),
(1504, 123, 66, 6, NULL, '2026-01-01 17:00:00', NULL),
(1505, 123, 65, 7, NULL, '2026-01-01 17:00:00', NULL),
(1506, 123, 64, 8, NULL, '2026-01-01 17:00:00', NULL),
(1507, 123, 62, 9, NULL, '2026-01-01 17:00:00', NULL),
(1508, 123, 38, 10, NULL, '2026-01-01 17:00:00', NULL),
(1509, 123, 37, 11, NULL, '2026-01-01 17:00:00', NULL),
(1510, 123, 36, 12, NULL, '2026-01-01 17:00:00', NULL),
(1511, 123, 26, 13, NULL, '2026-01-01 17:00:00', NULL),
(1512, 123, 24, 14, NULL, '2026-01-01 17:00:00', NULL),
(1513, 123, 23, 15, NULL, '2026-01-01 17:00:00', NULL),
(1514, 123, 22, 16, NULL, '2026-01-01 17:00:00', NULL),
(1515, 123, 19, 17, NULL, '2026-01-01 17:00:00', NULL),
(1516, 195, 123, 1, NULL, '2026-01-01 17:00:00', NULL),
(1517, 195, 92, 2, NULL, '2026-01-01 17:00:00', NULL),
(1518, 195, 87, 3, NULL, '2026-01-01 17:00:00', NULL),
(1519, 195, 86, 4, NULL, '2026-01-01 17:00:00', NULL),
(1520, 195, 76, 5, NULL, '2026-01-01 17:00:00', NULL),
(1521, 195, 74, 6, NULL, '2026-01-01 17:00:00', NULL),
(1522, 195, 66, 7, NULL, '2026-01-01 17:00:00', NULL),
(1523, 195, 65, 8, NULL, '2026-01-01 17:00:00', NULL),
(1524, 195, 64, 9, NULL, '2026-01-01 17:00:00', NULL),
(1525, 195, 62, 10, NULL, '2026-01-01 17:00:00', NULL),
(1526, 195, 38, 11, NULL, '2026-01-01 17:00:00', NULL),
(1527, 195, 37, 12, NULL, '2026-01-01 17:00:00', NULL),
(1528, 195, 36, 13, NULL, '2026-01-01 17:00:00', NULL),
(1529, 195, 26, 14, NULL, '2026-01-01 17:00:00', NULL),
(1530, 195, 24, 15, NULL, '2026-01-01 17:00:00', NULL),
(1531, 195, 23, 16, NULL, '2026-01-01 17:00:00', NULL),
(1532, 195, 22, 17, NULL, '2026-01-01 17:00:00', NULL),
(1533, 195, 19, 18, NULL, '2026-01-01 17:00:00', NULL),
(1534, 196, 93, 1, NULL, '2026-01-01 17:00:00', NULL),
(1535, 196, 92, 2, NULL, '2026-01-01 17:00:00', NULL),
(1536, 196, 87, 3, NULL, '2026-01-01 17:00:00', NULL),
(1537, 196, 86, 4, NULL, '2026-01-01 17:00:00', NULL),
(1538, 196, 76, 5, NULL, '2026-01-01 17:00:00', NULL),
(1539, 196, 74, 6, NULL, '2026-01-01 17:00:00', NULL),
(1540, 196, 66, 7, NULL, '2026-01-01 17:00:00', NULL),
(1541, 196, 65, 8, NULL, '2026-01-01 17:00:00', NULL),
(1542, 196, 64, 9, NULL, '2026-01-01 17:00:00', NULL),
(1543, 196, 62, 10, NULL, '2026-01-01 17:00:00', NULL),
(1544, 196, 38, 11, NULL, '2026-01-01 17:00:00', NULL),
(1545, 196, 37, 12, NULL, '2026-01-01 17:00:00', NULL),
(1546, 196, 36, 13, NULL, '2026-01-01 17:00:00', NULL),
(1547, 196, 26, 14, NULL, '2026-01-01 17:00:00', NULL),
(1548, 196, 24, 15, NULL, '2026-01-01 17:00:00', NULL),
(1549, 196, 23, 16, NULL, '2026-01-01 17:00:00', NULL),
(1550, 196, 22, 17, NULL, '2026-01-01 17:00:00', NULL),
(1551, 196, 19, 18, NULL, '2026-01-01 17:00:00', NULL),
(1552, 150, 94, 1, NULL, '2026-01-01 17:00:00', NULL),
(1553, 150, 92, 2, NULL, '2026-01-01 17:00:00', NULL),
(1554, 150, 87, 3, NULL, '2026-01-01 17:00:00', NULL),
(1555, 150, 86, 4, NULL, '2026-01-01 17:00:00', NULL),
(1556, 150, 76, 5, NULL, '2026-01-01 17:00:00', NULL),
(1557, 150, 74, 6, NULL, '2026-01-01 17:00:00', NULL),
(1558, 150, 66, 7, NULL, '2026-01-01 17:00:00', NULL),
(1559, 150, 65, 8, NULL, '2026-01-01 17:00:00', NULL),
(1560, 150, 64, 9, NULL, '2026-01-01 17:00:00', NULL),
(1561, 150, 62, 10, NULL, '2026-01-01 17:00:00', NULL),
(1562, 150, 38, 11, NULL, '2026-01-01 17:00:00', NULL),
(1563, 150, 37, 12, NULL, '2026-01-01 17:00:00', NULL),
(1564, 150, 36, 13, NULL, '2026-01-01 17:00:00', NULL),
(1565, 150, 26, 14, NULL, '2026-01-01 17:00:00', NULL),
(1566, 150, 24, 15, NULL, '2026-01-01 17:00:00', NULL),
(1567, 150, 23, 16, NULL, '2026-01-01 17:00:00', NULL),
(1568, 150, 22, 17, NULL, '2026-01-01 17:00:00', NULL),
(1569, 150, 19, 18, NULL, '2026-01-01 17:00:00', NULL),
(1570, 194, 123, 1, NULL, '2026-01-02 17:00:00', NULL),
(1571, 194, 92, 2, NULL, '2026-01-02 17:00:00', NULL),
(1572, 194, 87, 3, NULL, '2026-01-02 17:00:00', NULL),
(1573, 194, 86, 4, NULL, '2026-01-02 17:00:00', NULL),
(1574, 194, 76, 5, NULL, '2026-01-02 17:00:00', NULL),
(1575, 194, 74, 6, NULL, '2026-01-02 17:00:00', NULL),
(1576, 194, 66, 7, NULL, '2026-01-02 17:00:00', NULL),
(1577, 194, 65, 8, NULL, '2026-01-02 17:00:00', NULL),
(1578, 194, 64, 9, NULL, '2026-01-02 17:00:00', NULL),
(1579, 194, 62, 10, NULL, '2026-01-02 17:00:00', NULL),
(1580, 194, 38, 11, NULL, '2026-01-02 17:00:00', NULL),
(1581, 194, 37, 12, NULL, '2026-01-02 17:00:00', NULL),
(1582, 194, 36, 13, NULL, '2026-01-02 17:00:00', NULL),
(1583, 194, 26, 14, NULL, '2026-01-02 17:00:00', NULL),
(1584, 194, 24, 15, NULL, '2026-01-02 17:00:00', NULL),
(1585, 194, 23, 16, NULL, '2026-01-02 17:00:00', NULL),
(1586, 194, 22, 17, NULL, '2026-01-02 17:00:00', NULL),
(1587, 194, 19, 18, NULL, '2026-01-02 17:00:00', NULL),
(1588, 197, 194, 1, NULL, '2026-01-02 17:00:00', NULL),
(1589, 197, 123, 2, NULL, '2026-01-02 17:00:00', NULL),
(1590, 197, 92, 3, NULL, '2026-01-02 17:00:00', NULL),
(1591, 197, 87, 4, NULL, '2026-01-02 17:00:00', NULL),
(1592, 197, 86, 5, NULL, '2026-01-02 17:00:00', NULL),
(1593, 197, 76, 6, NULL, '2026-01-02 17:00:00', NULL),
(1594, 197, 74, 7, NULL, '2026-01-02 17:00:00', NULL),
(1595, 197, 66, 8, NULL, '2026-01-02 17:00:00', NULL),
(1596, 197, 65, 9, NULL, '2026-01-02 17:00:00', NULL),
(1597, 197, 64, 10, NULL, '2026-01-02 17:00:00', NULL),
(1598, 197, 62, 11, NULL, '2026-01-02 17:00:00', NULL),
(1599, 197, 38, 12, NULL, '2026-01-02 17:00:00', NULL),
(1600, 197, 37, 13, NULL, '2026-01-02 17:00:00', NULL),
(1601, 197, 36, 14, NULL, '2026-01-02 17:00:00', NULL),
(1602, 197, 26, 15, NULL, '2026-01-02 17:00:00', NULL),
(1603, 197, 24, 16, NULL, '2026-01-02 17:00:00', NULL),
(1604, 197, 23, 17, NULL, '2026-01-02 17:00:00', NULL),
(1605, 197, 22, 18, NULL, '2026-01-02 17:00:00', NULL),
(1606, 197, 19, 19, NULL, '2026-01-02 17:00:00', NULL),
(1607, 198, 76, 1, NULL, '2026-01-02 17:00:00', NULL),
(1608, 198, 74, 2, NULL, '2026-01-02 17:00:00', NULL),
(1609, 198, 66, 3, NULL, '2026-01-02 17:00:00', NULL),
(1610, 198, 65, 4, NULL, '2026-01-02 17:00:00', NULL),
(1611, 198, 64, 5, NULL, '2026-01-02 17:00:00', NULL),
(1612, 198, 62, 6, NULL, '2026-01-02 17:00:00', NULL),
(1613, 198, 38, 7, NULL, '2026-01-02 17:00:00', NULL),
(1614, 198, 37, 8, NULL, '2026-01-02 17:00:00', NULL),
(1615, 198, 36, 9, NULL, '2026-01-02 17:00:00', NULL),
(1616, 198, 26, 10, NULL, '2026-01-02 17:00:00', NULL),
(1617, 198, 24, 11, NULL, '2026-01-02 17:00:00', NULL),
(1618, 198, 23, 12, NULL, '2026-01-02 17:00:00', NULL),
(1619, 198, 22, 13, NULL, '2026-01-02 17:00:00', NULL),
(1620, 198, 19, 14, NULL, '2026-01-02 17:00:00', NULL),
(1621, 199, 198, 1, NULL, '2026-01-02 17:00:00', NULL),
(1622, 199, 76, 2, NULL, '2026-01-02 17:00:00', NULL),
(1623, 199, 74, 3, NULL, '2026-01-02 17:00:00', NULL),
(1624, 199, 66, 4, NULL, '2026-01-02 17:00:00', NULL),
(1625, 199, 65, 5, NULL, '2026-01-02 17:00:00', NULL),
(1626, 199, 64, 6, NULL, '2026-01-02 17:00:00', NULL),
(1627, 199, 62, 7, NULL, '2026-01-02 17:00:00', NULL),
(1628, 199, 38, 8, NULL, '2026-01-02 17:00:00', NULL),
(1629, 199, 37, 9, NULL, '2026-01-02 17:00:00', NULL),
(1630, 199, 36, 10, NULL, '2026-01-02 17:00:00', NULL),
(1631, 199, 26, 11, NULL, '2026-01-02 17:00:00', NULL),
(1632, 199, 24, 12, NULL, '2026-01-02 17:00:00', NULL),
(1633, 199, 23, 13, NULL, '2026-01-02 17:00:00', NULL),
(1634, 199, 22, 14, NULL, '2026-01-02 17:00:00', NULL),
(1635, 199, 19, 15, NULL, '2026-01-02 17:00:00', NULL),
(1636, 200, 199, 1, NULL, '2026-01-02 17:00:00', NULL),
(1637, 200, 198, 2, NULL, '2026-01-02 17:00:00', NULL),
(1638, 200, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1639, 200, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1640, 200, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1641, 200, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1642, 200, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1643, 200, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1644, 200, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1645, 200, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1646, 200, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1647, 200, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1648, 200, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1649, 200, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1650, 200, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1651, 200, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1652, 201, 199, 1, NULL, '2026-01-02 17:00:00', NULL),
(1653, 201, 198, 2, NULL, '2026-01-02 17:00:00', NULL),
(1654, 201, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1655, 201, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1656, 201, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1657, 201, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1658, 201, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1659, 201, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1660, 201, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1661, 201, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1662, 201, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1663, 201, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1664, 201, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1665, 201, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1666, 201, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1667, 201, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1668, 202, 198, 1, NULL, '2026-01-02 17:00:00', NULL),
(1669, 202, 76, 2, NULL, '2026-01-02 17:00:00', NULL),
(1670, 202, 74, 3, NULL, '2026-01-02 17:00:00', NULL),
(1671, 202, 66, 4, NULL, '2026-01-02 17:00:00', NULL),
(1672, 202, 65, 5, NULL, '2026-01-02 17:00:00', NULL),
(1673, 202, 64, 6, NULL, '2026-01-02 17:00:00', NULL),
(1674, 202, 62, 7, NULL, '2026-01-02 17:00:00', NULL),
(1675, 202, 38, 8, NULL, '2026-01-02 17:00:00', NULL),
(1676, 202, 37, 9, NULL, '2026-01-02 17:00:00', NULL),
(1677, 202, 36, 10, NULL, '2026-01-02 17:00:00', NULL),
(1678, 202, 26, 11, NULL, '2026-01-02 17:00:00', NULL),
(1679, 202, 24, 12, NULL, '2026-01-02 17:00:00', NULL),
(1680, 202, 23, 13, NULL, '2026-01-02 17:00:00', NULL),
(1681, 202, 22, 14, NULL, '2026-01-02 17:00:00', NULL),
(1682, 202, 19, 15, NULL, '2026-01-02 17:00:00', NULL),
(1683, 204, 202, 1, NULL, '2026-01-02 17:00:00', NULL),
(1684, 204, 198, 2, NULL, '2026-01-02 17:00:00', NULL),
(1685, 204, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1686, 204, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1687, 204, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1688, 204, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1689, 204, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1690, 204, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1691, 204, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1692, 204, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1693, 204, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1694, 204, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1695, 204, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1696, 204, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1697, 204, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1698, 204, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1699, 203, 202, 1, NULL, '2026-01-02 17:00:00', NULL),
(1700, 203, 198, 2, NULL, '2026-01-02 17:00:00', NULL),
(1701, 203, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1702, 203, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1703, 203, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1704, 203, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1705, 203, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1706, 203, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1707, 203, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1708, 203, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1709, 203, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1710, 203, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1711, 203, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1712, 203, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1713, 203, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1714, 203, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1715, 205, 203, 1, NULL, '2026-01-02 17:00:00', NULL),
(1716, 205, 202, 2, NULL, '2026-01-02 17:00:00', NULL),
(1717, 205, 198, 3, NULL, '2026-01-02 17:00:00', NULL),
(1718, 205, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1719, 205, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1720, 205, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1721, 205, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1722, 205, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1723, 205, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1724, 205, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1725, 205, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1726, 205, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1727, 205, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1728, 205, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1729, 205, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1730, 205, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1731, 205, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1732, 206, 200, 1, NULL, '2026-01-02 17:00:00', NULL),
(1733, 206, 199, 2, NULL, '2026-01-02 17:00:00', NULL),
(1734, 206, 198, 3, NULL, '2026-01-02 17:00:00', NULL),
(1735, 206, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1736, 206, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1737, 206, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1738, 206, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1739, 206, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1740, 206, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1741, 206, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1742, 206, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1743, 206, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1744, 206, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1745, 206, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1746, 206, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1747, 206, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1748, 206, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1749, 207, 76, 1, NULL, '2026-01-02 17:00:00', NULL),
(1750, 207, 74, 2, NULL, '2026-01-02 17:00:00', NULL),
(1751, 207, 66, 3, NULL, '2026-01-02 17:00:00', NULL),
(1752, 207, 65, 4, NULL, '2026-01-02 17:00:00', NULL),
(1753, 207, 64, 5, NULL, '2026-01-02 17:00:00', NULL),
(1754, 207, 62, 6, NULL, '2026-01-02 17:00:00', NULL),
(1755, 207, 38, 7, NULL, '2026-01-02 17:00:00', NULL),
(1756, 207, 37, 8, NULL, '2026-01-02 17:00:00', NULL),
(1757, 207, 36, 9, NULL, '2026-01-02 17:00:00', NULL),
(1758, 207, 26, 10, NULL, '2026-01-02 17:00:00', NULL),
(1759, 207, 24, 11, NULL, '2026-01-02 17:00:00', NULL),
(1760, 207, 23, 12, NULL, '2026-01-02 17:00:00', NULL),
(1761, 207, 22, 13, NULL, '2026-01-02 17:00:00', NULL),
(1762, 207, 19, 14, NULL, '2026-01-02 17:00:00', NULL),
(1763, 208, 207, 1, NULL, '2026-01-02 17:00:00', NULL),
(1764, 208, 76, 2, NULL, '2026-01-02 17:00:00', NULL),
(1765, 208, 74, 3, NULL, '2026-01-02 17:00:00', NULL),
(1766, 208, 66, 4, NULL, '2026-01-02 17:00:00', NULL),
(1767, 208, 65, 5, NULL, '2026-01-02 17:00:00', NULL),
(1768, 208, 64, 6, NULL, '2026-01-02 17:00:00', NULL),
(1769, 208, 62, 7, NULL, '2026-01-02 17:00:00', NULL),
(1770, 208, 38, 8, NULL, '2026-01-02 17:00:00', NULL),
(1771, 208, 37, 9, NULL, '2026-01-02 17:00:00', NULL),
(1772, 208, 36, 10, NULL, '2026-01-02 17:00:00', NULL),
(1773, 208, 26, 11, NULL, '2026-01-02 17:00:00', NULL),
(1774, 208, 24, 12, NULL, '2026-01-02 17:00:00', NULL),
(1775, 208, 23, 13, NULL, '2026-01-02 17:00:00', NULL),
(1776, 208, 22, 14, NULL, '2026-01-02 17:00:00', NULL),
(1777, 208, 19, 15, NULL, '2026-01-02 17:00:00', NULL),
(1778, 210, 207, 1, NULL, '2026-01-02 17:00:00', NULL),
(1779, 210, 76, 2, NULL, '2026-01-02 17:00:00', NULL),
(1780, 210, 74, 3, NULL, '2026-01-02 17:00:00', NULL),
(1781, 210, 66, 4, NULL, '2026-01-02 17:00:00', NULL),
(1782, 210, 65, 5, NULL, '2026-01-02 17:00:00', NULL),
(1783, 210, 64, 6, NULL, '2026-01-02 17:00:00', NULL),
(1784, 210, 62, 7, NULL, '2026-01-02 17:00:00', NULL),
(1785, 210, 38, 8, NULL, '2026-01-02 17:00:00', NULL),
(1786, 210, 37, 9, NULL, '2026-01-02 17:00:00', NULL),
(1787, 210, 36, 10, NULL, '2026-01-02 17:00:00', NULL),
(1788, 210, 26, 11, NULL, '2026-01-02 17:00:00', NULL),
(1789, 210, 24, 12, NULL, '2026-01-02 17:00:00', NULL),
(1790, 210, 23, 13, NULL, '2026-01-02 17:00:00', NULL),
(1791, 210, 22, 14, NULL, '2026-01-02 17:00:00', NULL),
(1792, 210, 19, 15, NULL, '2026-01-02 17:00:00', NULL),
(1793, 211, 208, 1, NULL, '2026-01-02 17:00:00', NULL),
(1794, 211, 207, 2, NULL, '2026-01-02 17:00:00', NULL),
(1795, 211, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1796, 211, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1797, 211, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1798, 211, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1799, 211, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1800, 211, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1801, 211, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1802, 211, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1803, 211, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1804, 211, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1805, 211, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1806, 211, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1807, 211, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1808, 211, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1809, 212, 211, 1, NULL, '2026-01-02 17:00:00', NULL),
(1810, 212, 208, 2, NULL, '2026-01-02 17:00:00', NULL),
(1811, 212, 207, 3, NULL, '2026-01-02 17:00:00', NULL),
(1812, 212, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1813, 212, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1814, 212, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1815, 212, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1816, 212, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1817, 212, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1818, 212, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1819, 212, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1820, 212, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1821, 212, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1822, 212, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1823, 212, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1824, 212, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1825, 212, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1826, 213, 211, 1, NULL, '2026-01-02 17:00:00', NULL),
(1827, 213, 208, 2, NULL, '2026-01-02 17:00:00', NULL),
(1828, 213, 207, 3, NULL, '2026-01-02 17:00:00', NULL),
(1829, 213, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1830, 213, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1831, 213, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1832, 213, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1833, 213, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1834, 213, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1835, 213, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1836, 213, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1837, 213, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1838, 213, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1839, 213, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1840, 213, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1841, 213, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1842, 213, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1843, 214, 208, 1, NULL, '2026-01-02 17:00:00', NULL),
(1844, 214, 207, 2, NULL, '2026-01-02 17:00:00', NULL),
(1845, 214, 76, 3, NULL, '2026-01-02 17:00:00', NULL),
(1846, 214, 74, 4, NULL, '2026-01-02 17:00:00', NULL),
(1847, 214, 66, 5, NULL, '2026-01-02 17:00:00', NULL),
(1848, 214, 65, 6, NULL, '2026-01-02 17:00:00', NULL),
(1849, 214, 64, 7, NULL, '2026-01-02 17:00:00', NULL),
(1850, 214, 62, 8, NULL, '2026-01-02 17:00:00', NULL),
(1851, 214, 38, 9, NULL, '2026-01-02 17:00:00', NULL),
(1852, 214, 37, 10, NULL, '2026-01-02 17:00:00', NULL),
(1853, 214, 36, 11, NULL, '2026-01-02 17:00:00', NULL),
(1854, 214, 26, 12, NULL, '2026-01-02 17:00:00', NULL),
(1855, 214, 24, 13, NULL, '2026-01-02 17:00:00', NULL),
(1856, 214, 23, 14, NULL, '2026-01-02 17:00:00', NULL),
(1857, 214, 22, 15, NULL, '2026-01-02 17:00:00', NULL),
(1858, 214, 19, 16, NULL, '2026-01-02 17:00:00', NULL),
(1859, 216, 214, 1, NULL, '2026-01-02 17:00:00', NULL),
(1860, 216, 208, 2, NULL, '2026-01-02 17:00:00', NULL),
(1861, 216, 207, 3, NULL, '2026-01-02 17:00:00', NULL),
(1862, 216, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1863, 216, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1864, 216, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1865, 216, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1866, 216, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1867, 216, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1868, 216, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1869, 216, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1870, 216, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1871, 216, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1872, 216, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1873, 216, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1874, 216, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1875, 216, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1876, 217, 214, 1, NULL, '2026-01-02 17:00:00', NULL),
(1877, 217, 208, 2, NULL, '2026-01-02 17:00:00', NULL),
(1878, 217, 207, 3, NULL, '2026-01-02 17:00:00', NULL),
(1879, 217, 76, 4, NULL, '2026-01-02 17:00:00', NULL),
(1880, 217, 74, 5, NULL, '2026-01-02 17:00:00', NULL),
(1881, 217, 66, 6, NULL, '2026-01-02 17:00:00', NULL),
(1882, 217, 65, 7, NULL, '2026-01-02 17:00:00', NULL),
(1883, 217, 64, 8, NULL, '2026-01-02 17:00:00', NULL),
(1884, 217, 62, 9, NULL, '2026-01-02 17:00:00', NULL),
(1885, 217, 38, 10, NULL, '2026-01-02 17:00:00', NULL),
(1886, 217, 37, 11, NULL, '2026-01-02 17:00:00', NULL),
(1887, 217, 36, 12, NULL, '2026-01-02 17:00:00', NULL),
(1888, 217, 26, 13, NULL, '2026-01-02 17:00:00', NULL),
(1889, 217, 24, 14, NULL, '2026-01-02 17:00:00', NULL),
(1890, 217, 23, 15, NULL, '2026-01-02 17:00:00', NULL),
(1891, 217, 22, 16, NULL, '2026-01-02 17:00:00', NULL),
(1892, 217, 19, 17, NULL, '2026-01-02 17:00:00', NULL),
(1893, 184, 78, 1, NULL, '2026-01-04 17:00:00', NULL),
(1894, 184, 77, 2, NULL, '2026-01-04 17:00:00', NULL),
(1895, 184, 75, 3, NULL, '2026-01-04 17:00:00', NULL),
(1896, 184, 74, 4, NULL, '2026-01-04 17:00:00', NULL),
(1897, 184, 66, 5, NULL, '2026-01-04 17:00:00', NULL),
(1898, 184, 65, 6, NULL, '2026-01-04 17:00:00', NULL),
(1899, 184, 64, 7, NULL, '2026-01-04 17:00:00', NULL),
(1900, 184, 62, 8, NULL, '2026-01-04 17:00:00', NULL),
(1901, 184, 38, 9, NULL, '2026-01-04 17:00:00', NULL),
(1902, 184, 37, 10, NULL, '2026-01-04 17:00:00', NULL);
INSERT INTO `customer_network_matrixes` (`id`, `member_id`, `sponsor_id`, `level`, `description`, `created_at`, `updated_at`) VALUES
(1903, 184, 36, 11, NULL, '2026-01-04 17:00:00', NULL),
(1904, 184, 26, 12, NULL, '2026-01-04 17:00:00', NULL),
(1905, 184, 24, 13, NULL, '2026-01-04 17:00:00', NULL),
(1906, 184, 23, 14, NULL, '2026-01-04 17:00:00', NULL),
(1907, 184, 22, 15, NULL, '2026-01-04 17:00:00', NULL),
(1908, 184, 19, 16, NULL, '2026-01-04 17:00:00', NULL),
(1909, 146, 76, 1, NULL, '2026-01-04 17:00:00', NULL),
(1910, 146, 74, 2, NULL, '2026-01-04 17:00:00', NULL),
(1911, 146, 66, 3, NULL, '2026-01-04 17:00:00', NULL),
(1912, 146, 65, 4, NULL, '2026-01-04 17:00:00', NULL),
(1913, 146, 64, 5, NULL, '2026-01-04 17:00:00', NULL),
(1914, 146, 62, 6, NULL, '2026-01-04 17:00:00', NULL),
(1915, 146, 38, 7, NULL, '2026-01-04 17:00:00', NULL),
(1916, 146, 37, 8, NULL, '2026-01-04 17:00:00', NULL),
(1917, 146, 36, 9, NULL, '2026-01-04 17:00:00', NULL),
(1918, 146, 26, 10, NULL, '2026-01-04 17:00:00', NULL),
(1919, 146, 24, 11, NULL, '2026-01-04 17:00:00', NULL),
(1920, 146, 23, 12, NULL, '2026-01-04 17:00:00', NULL),
(1921, 146, 22, 13, NULL, '2026-01-04 17:00:00', NULL),
(1922, 146, 19, 14, NULL, '2026-01-04 17:00:00', NULL),
(1923, 222, 146, 1, NULL, '2026-01-04 17:00:00', NULL),
(1924, 222, 76, 2, NULL, '2026-01-04 17:00:00', NULL),
(1925, 222, 74, 3, NULL, '2026-01-04 17:00:00', NULL),
(1926, 222, 66, 4, NULL, '2026-01-04 17:00:00', NULL),
(1927, 222, 65, 5, NULL, '2026-01-04 17:00:00', NULL),
(1928, 222, 64, 6, NULL, '2026-01-04 17:00:00', NULL),
(1929, 222, 62, 7, NULL, '2026-01-04 17:00:00', NULL),
(1930, 222, 38, 8, NULL, '2026-01-04 17:00:00', NULL),
(1931, 222, 37, 9, NULL, '2026-01-04 17:00:00', NULL),
(1932, 222, 36, 10, NULL, '2026-01-04 17:00:00', NULL),
(1933, 222, 26, 11, NULL, '2026-01-04 17:00:00', NULL),
(1934, 222, 24, 12, NULL, '2026-01-04 17:00:00', NULL),
(1935, 222, 23, 13, NULL, '2026-01-04 17:00:00', NULL),
(1936, 222, 22, 14, NULL, '2026-01-04 17:00:00', NULL),
(1937, 222, 19, 15, NULL, '2026-01-04 17:00:00', NULL),
(1938, 220, 146, 1, NULL, '2026-01-04 17:00:00', NULL),
(1939, 220, 76, 2, NULL, '2026-01-04 17:00:00', NULL),
(1940, 220, 74, 3, NULL, '2026-01-04 17:00:00', NULL),
(1941, 220, 66, 4, NULL, '2026-01-04 17:00:00', NULL),
(1942, 220, 65, 5, NULL, '2026-01-04 17:00:00', NULL),
(1943, 220, 64, 6, NULL, '2026-01-04 17:00:00', NULL),
(1944, 220, 62, 7, NULL, '2026-01-04 17:00:00', NULL),
(1945, 220, 38, 8, NULL, '2026-01-04 17:00:00', NULL),
(1946, 220, 37, 9, NULL, '2026-01-04 17:00:00', NULL),
(1947, 220, 36, 10, NULL, '2026-01-04 17:00:00', NULL),
(1948, 220, 26, 11, NULL, '2026-01-04 17:00:00', NULL),
(1949, 220, 24, 12, NULL, '2026-01-04 17:00:00', NULL),
(1950, 220, 23, 13, NULL, '2026-01-04 17:00:00', NULL),
(1951, 220, 22, 14, NULL, '2026-01-04 17:00:00', NULL),
(1952, 220, 19, 15, NULL, '2026-01-04 17:00:00', NULL),
(1953, 221, 220, 1, NULL, '2026-01-04 17:00:00', NULL),
(1954, 221, 146, 2, NULL, '2026-01-04 17:00:00', NULL),
(1955, 221, 76, 3, NULL, '2026-01-04 17:00:00', NULL),
(1956, 221, 74, 4, NULL, '2026-01-04 17:00:00', NULL),
(1957, 221, 66, 5, NULL, '2026-01-04 17:00:00', NULL),
(1958, 221, 65, 6, NULL, '2026-01-04 17:00:00', NULL),
(1959, 221, 64, 7, NULL, '2026-01-04 17:00:00', NULL),
(1960, 221, 62, 8, NULL, '2026-01-04 17:00:00', NULL),
(1961, 221, 38, 9, NULL, '2026-01-04 17:00:00', NULL),
(1962, 221, 37, 10, NULL, '2026-01-04 17:00:00', NULL),
(1963, 221, 36, 11, NULL, '2026-01-04 17:00:00', NULL),
(1964, 221, 26, 12, NULL, '2026-01-04 17:00:00', NULL),
(1965, 221, 24, 13, NULL, '2026-01-04 17:00:00', NULL),
(1966, 221, 23, 14, NULL, '2026-01-04 17:00:00', NULL),
(1967, 221, 22, 15, NULL, '2026-01-04 17:00:00', NULL),
(1968, 221, 19, 16, NULL, '2026-01-04 17:00:00', NULL),
(1969, 223, 220, 1, NULL, '2026-01-04 17:00:00', NULL),
(1970, 223, 146, 2, NULL, '2026-01-04 17:00:00', NULL),
(1971, 223, 76, 3, NULL, '2026-01-04 17:00:00', NULL),
(1972, 223, 74, 4, NULL, '2026-01-04 17:00:00', NULL),
(1973, 223, 66, 5, NULL, '2026-01-04 17:00:00', NULL),
(1974, 223, 65, 6, NULL, '2026-01-04 17:00:00', NULL),
(1975, 223, 64, 7, NULL, '2026-01-04 17:00:00', NULL),
(1976, 223, 62, 8, NULL, '2026-01-04 17:00:00', NULL),
(1977, 223, 38, 9, NULL, '2026-01-04 17:00:00', NULL),
(1978, 223, 37, 10, NULL, '2026-01-04 17:00:00', NULL),
(1979, 223, 36, 11, NULL, '2026-01-04 17:00:00', NULL),
(1980, 223, 26, 12, NULL, '2026-01-04 17:00:00', NULL),
(1981, 223, 24, 13, NULL, '2026-01-04 17:00:00', NULL),
(1982, 223, 23, 14, NULL, '2026-01-04 17:00:00', NULL),
(1983, 223, 22, 15, NULL, '2026-01-04 17:00:00', NULL),
(1984, 223, 19, 16, NULL, '2026-01-04 17:00:00', NULL),
(1985, 224, 222, 1, NULL, '2026-01-04 17:00:00', NULL),
(1986, 224, 146, 2, NULL, '2026-01-04 17:00:00', NULL),
(1987, 224, 76, 3, NULL, '2026-01-04 17:00:00', NULL),
(1988, 224, 74, 4, NULL, '2026-01-04 17:00:00', NULL),
(1989, 224, 66, 5, NULL, '2026-01-04 17:00:00', NULL),
(1990, 224, 65, 6, NULL, '2026-01-04 17:00:00', NULL),
(1991, 224, 64, 7, NULL, '2026-01-04 17:00:00', NULL),
(1992, 224, 62, 8, NULL, '2026-01-04 17:00:00', NULL),
(1993, 224, 38, 9, NULL, '2026-01-04 17:00:00', NULL),
(1994, 224, 37, 10, NULL, '2026-01-04 17:00:00', NULL),
(1995, 224, 36, 11, NULL, '2026-01-04 17:00:00', NULL),
(1996, 224, 26, 12, NULL, '2026-01-04 17:00:00', NULL),
(1997, 224, 24, 13, NULL, '2026-01-04 17:00:00', NULL),
(1998, 224, 23, 14, NULL, '2026-01-04 17:00:00', NULL),
(1999, 224, 22, 15, NULL, '2026-01-04 17:00:00', NULL),
(2000, 224, 19, 16, NULL, '2026-01-04 17:00:00', NULL),
(2001, 225, 222, 1, NULL, '2026-01-04 17:00:00', NULL),
(2002, 225, 146, 2, NULL, '2026-01-04 17:00:00', NULL),
(2003, 225, 76, 3, NULL, '2026-01-04 17:00:00', NULL),
(2004, 225, 74, 4, NULL, '2026-01-04 17:00:00', NULL),
(2005, 225, 66, 5, NULL, '2026-01-04 17:00:00', NULL),
(2006, 225, 65, 6, NULL, '2026-01-04 17:00:00', NULL),
(2007, 225, 64, 7, NULL, '2026-01-04 17:00:00', NULL),
(2008, 225, 62, 8, NULL, '2026-01-04 17:00:00', NULL),
(2009, 225, 38, 9, NULL, '2026-01-04 17:00:00', NULL),
(2010, 225, 37, 10, NULL, '2026-01-04 17:00:00', NULL),
(2011, 225, 36, 11, NULL, '2026-01-04 17:00:00', NULL),
(2012, 225, 26, 12, NULL, '2026-01-04 17:00:00', NULL),
(2013, 225, 24, 13, NULL, '2026-01-04 17:00:00', NULL),
(2014, 225, 23, 14, NULL, '2026-01-04 17:00:00', NULL),
(2015, 225, 22, 15, NULL, '2026-01-04 17:00:00', NULL),
(2016, 225, 19, 16, NULL, '2026-01-04 17:00:00', NULL),
(2017, 226, 192, 1, NULL, '2026-01-06 17:00:00', NULL),
(2018, 226, 190, 2, NULL, '2026-01-06 17:00:00', NULL),
(2019, 226, 118, 3, NULL, '2026-01-06 17:00:00', NULL),
(2020, 226, 117, 4, NULL, '2026-01-06 17:00:00', NULL),
(2021, 226, 74, 5, NULL, '2026-01-06 17:00:00', NULL),
(2022, 226, 66, 6, NULL, '2026-01-06 17:00:00', NULL),
(2023, 226, 65, 7, NULL, '2026-01-06 17:00:00', NULL),
(2024, 226, 64, 8, NULL, '2026-01-06 17:00:00', NULL),
(2025, 226, 62, 9, NULL, '2026-01-06 17:00:00', NULL),
(2026, 226, 38, 10, NULL, '2026-01-06 17:00:00', NULL),
(2027, 226, 37, 11, NULL, '2026-01-06 17:00:00', NULL),
(2028, 226, 36, 12, NULL, '2026-01-06 17:00:00', NULL),
(2029, 226, 26, 13, NULL, '2026-01-06 17:00:00', NULL),
(2030, 226, 24, 14, NULL, '2026-01-06 17:00:00', NULL),
(2031, 226, 23, 15, NULL, '2026-01-06 17:00:00', NULL),
(2032, 226, 22, 16, NULL, '2026-01-06 17:00:00', NULL),
(2033, 226, 19, 17, NULL, '2026-01-06 17:00:00', NULL),
(2034, 227, 117, 1, NULL, '2026-01-06 17:00:00', NULL),
(2035, 227, 74, 2, NULL, '2026-01-06 17:00:00', NULL),
(2036, 227, 66, 3, NULL, '2026-01-06 17:00:00', NULL),
(2037, 227, 65, 4, NULL, '2026-01-06 17:00:00', NULL),
(2038, 227, 64, 5, NULL, '2026-01-06 17:00:00', NULL),
(2039, 227, 62, 6, NULL, '2026-01-06 17:00:00', NULL),
(2040, 227, 38, 7, NULL, '2026-01-06 17:00:00', NULL),
(2041, 227, 37, 8, NULL, '2026-01-06 17:00:00', NULL),
(2042, 227, 36, 9, NULL, '2026-01-06 17:00:00', NULL),
(2043, 227, 26, 10, NULL, '2026-01-06 17:00:00', NULL),
(2044, 227, 24, 11, NULL, '2026-01-06 17:00:00', NULL),
(2045, 227, 23, 12, NULL, '2026-01-06 17:00:00', NULL),
(2046, 227, 22, 13, NULL, '2026-01-06 17:00:00', NULL),
(2047, 227, 19, 14, NULL, '2026-01-06 17:00:00', NULL),
(2048, 143, 80, 1, NULL, '2026-01-07 17:00:00', NULL),
(2049, 143, 75, 2, NULL, '2026-01-07 17:00:00', NULL),
(2050, 143, 74, 3, NULL, '2026-01-07 17:00:00', NULL),
(2051, 143, 66, 4, NULL, '2026-01-07 17:00:00', NULL),
(2052, 143, 65, 5, NULL, '2026-01-07 17:00:00', NULL),
(2053, 143, 64, 6, NULL, '2026-01-07 17:00:00', NULL),
(2054, 143, 62, 7, NULL, '2026-01-07 17:00:00', NULL),
(2055, 143, 38, 8, NULL, '2026-01-07 17:00:00', NULL),
(2056, 143, 37, 9, NULL, '2026-01-07 17:00:00', NULL),
(2057, 143, 36, 10, NULL, '2026-01-07 17:00:00', NULL),
(2058, 143, 26, 11, NULL, '2026-01-07 17:00:00', NULL),
(2059, 143, 24, 12, NULL, '2026-01-07 17:00:00', NULL),
(2060, 143, 23, 13, NULL, '2026-01-07 17:00:00', NULL),
(2061, 143, 22, 14, NULL, '2026-01-07 17:00:00', NULL),
(2062, 143, 19, 15, NULL, '2026-01-07 17:00:00', NULL),
(2063, 229, 200, 1, NULL, '2026-01-07 17:00:00', NULL),
(2064, 229, 199, 2, NULL, '2026-01-07 17:00:00', NULL),
(2065, 229, 198, 3, NULL, '2026-01-07 17:00:00', NULL),
(2066, 229, 76, 4, NULL, '2026-01-07 17:00:00', NULL),
(2067, 229, 74, 5, NULL, '2026-01-07 17:00:00', NULL),
(2068, 229, 66, 6, NULL, '2026-01-07 17:00:00', NULL),
(2069, 229, 65, 7, NULL, '2026-01-07 17:00:00', NULL),
(2070, 229, 64, 8, NULL, '2026-01-07 17:00:00', NULL),
(2071, 229, 62, 9, NULL, '2026-01-07 17:00:00', NULL),
(2072, 229, 38, 10, NULL, '2026-01-07 17:00:00', NULL),
(2073, 229, 37, 11, NULL, '2026-01-07 17:00:00', NULL),
(2074, 229, 36, 12, NULL, '2026-01-07 17:00:00', NULL),
(2075, 229, 26, 13, NULL, '2026-01-07 17:00:00', NULL),
(2076, 229, 24, 14, NULL, '2026-01-07 17:00:00', NULL),
(2077, 229, 23, 15, NULL, '2026-01-07 17:00:00', NULL),
(2078, 229, 22, 16, NULL, '2026-01-07 17:00:00', NULL),
(2079, 229, 19, 17, NULL, '2026-01-07 17:00:00', NULL),
(2080, 231, 229, 1, NULL, '2026-01-07 17:00:00', NULL),
(2081, 231, 200, 2, NULL, '2026-01-07 17:00:00', NULL),
(2082, 231, 199, 3, NULL, '2026-01-07 17:00:00', NULL),
(2083, 231, 198, 4, NULL, '2026-01-07 17:00:00', NULL),
(2084, 231, 76, 5, NULL, '2026-01-07 17:00:00', NULL),
(2085, 231, 74, 6, NULL, '2026-01-07 17:00:00', NULL),
(2086, 231, 66, 7, NULL, '2026-01-07 17:00:00', NULL),
(2087, 231, 65, 8, NULL, '2026-01-07 17:00:00', NULL),
(2088, 231, 64, 9, NULL, '2026-01-07 17:00:00', NULL),
(2089, 231, 62, 10, NULL, '2026-01-07 17:00:00', NULL),
(2090, 231, 38, 11, NULL, '2026-01-07 17:00:00', NULL),
(2091, 231, 37, 12, NULL, '2026-01-07 17:00:00', NULL),
(2092, 231, 36, 13, NULL, '2026-01-07 17:00:00', NULL),
(2093, 231, 26, 14, NULL, '2026-01-07 17:00:00', NULL),
(2094, 231, 24, 15, NULL, '2026-01-07 17:00:00', NULL),
(2095, 231, 23, 16, NULL, '2026-01-07 17:00:00', NULL),
(2096, 231, 22, 17, NULL, '2026-01-07 17:00:00', NULL),
(2097, 231, 19, 18, NULL, '2026-01-07 17:00:00', NULL),
(2098, 232, 229, 1, NULL, '2026-01-07 17:00:00', NULL),
(2099, 232, 200, 2, NULL, '2026-01-07 17:00:00', NULL),
(2100, 232, 199, 3, NULL, '2026-01-07 17:00:00', NULL),
(2101, 232, 198, 4, NULL, '2026-01-07 17:00:00', NULL),
(2102, 232, 76, 5, NULL, '2026-01-07 17:00:00', NULL),
(2103, 232, 74, 6, NULL, '2026-01-07 17:00:00', NULL),
(2104, 232, 66, 7, NULL, '2026-01-07 17:00:00', NULL),
(2105, 232, 65, 8, NULL, '2026-01-07 17:00:00', NULL),
(2106, 232, 64, 9, NULL, '2026-01-07 17:00:00', NULL),
(2107, 232, 62, 10, NULL, '2026-01-07 17:00:00', NULL),
(2108, 232, 38, 11, NULL, '2026-01-07 17:00:00', NULL),
(2109, 232, 37, 12, NULL, '2026-01-07 17:00:00', NULL),
(2110, 232, 36, 13, NULL, '2026-01-07 17:00:00', NULL),
(2111, 232, 26, 14, NULL, '2026-01-07 17:00:00', NULL),
(2112, 232, 24, 15, NULL, '2026-01-07 17:00:00', NULL),
(2113, 232, 23, 16, NULL, '2026-01-07 17:00:00', NULL),
(2114, 232, 22, 17, NULL, '2026-01-07 17:00:00', NULL),
(2115, 232, 19, 18, NULL, '2026-01-07 17:00:00', NULL),
(2116, 233, 89, 1, NULL, '2026-01-09 17:00:00', NULL),
(2117, 233, 64, 2, NULL, '2026-01-09 17:00:00', NULL),
(2118, 233, 62, 3, NULL, '2026-01-09 17:00:00', NULL),
(2119, 233, 38, 4, NULL, '2026-01-09 17:00:00', NULL),
(2120, 233, 37, 5, NULL, '2026-01-09 17:00:00', NULL),
(2121, 233, 36, 6, NULL, '2026-01-09 17:00:00', NULL),
(2122, 233, 26, 7, NULL, '2026-01-09 17:00:00', NULL),
(2123, 233, 24, 8, NULL, '2026-01-09 17:00:00', NULL),
(2124, 233, 23, 9, NULL, '2026-01-09 17:00:00', NULL),
(2125, 233, 22, 10, NULL, '2026-01-09 17:00:00', NULL),
(2126, 233, 19, 11, NULL, '2026-01-09 17:00:00', NULL),
(2127, 236, 233, 1, NULL, '2026-01-09 17:00:00', NULL),
(2128, 236, 89, 2, NULL, '2026-01-09 17:00:00', NULL),
(2129, 236, 64, 3, NULL, '2026-01-09 17:00:00', NULL),
(2130, 236, 62, 4, NULL, '2026-01-09 17:00:00', NULL),
(2131, 236, 38, 5, NULL, '2026-01-09 17:00:00', NULL),
(2132, 236, 37, 6, NULL, '2026-01-09 17:00:00', NULL),
(2133, 236, 36, 7, NULL, '2026-01-09 17:00:00', NULL),
(2134, 236, 26, 8, NULL, '2026-01-09 17:00:00', NULL),
(2135, 236, 24, 9, NULL, '2026-01-09 17:00:00', NULL),
(2136, 236, 23, 10, NULL, '2026-01-09 17:00:00', NULL),
(2137, 236, 22, 11, NULL, '2026-01-09 17:00:00', NULL),
(2138, 236, 19, 12, NULL, '2026-01-09 17:00:00', NULL),
(2139, 238, 233, 1, NULL, '2026-01-09 17:00:00', NULL),
(2140, 238, 89, 2, NULL, '2026-01-09 17:00:00', NULL),
(2141, 238, 64, 3, NULL, '2026-01-09 17:00:00', NULL),
(2142, 238, 62, 4, NULL, '2026-01-09 17:00:00', NULL),
(2143, 238, 38, 5, NULL, '2026-01-09 17:00:00', NULL),
(2144, 238, 37, 6, NULL, '2026-01-09 17:00:00', NULL),
(2145, 238, 36, 7, NULL, '2026-01-09 17:00:00', NULL),
(2146, 238, 26, 8, NULL, '2026-01-09 17:00:00', NULL),
(2147, 238, 24, 9, NULL, '2026-01-09 17:00:00', NULL),
(2148, 238, 23, 10, NULL, '2026-01-09 17:00:00', NULL),
(2149, 238, 22, 11, NULL, '2026-01-09 17:00:00', NULL),
(2150, 238, 19, 12, NULL, '2026-01-09 17:00:00', NULL),
(2151, 235, 90, 1, NULL, '2026-01-09 17:00:00', NULL),
(2152, 235, 89, 2, NULL, '2026-01-09 17:00:00', NULL),
(2153, 235, 64, 3, NULL, '2026-01-09 17:00:00', NULL),
(2154, 235, 62, 4, NULL, '2026-01-09 17:00:00', NULL),
(2155, 235, 38, 5, NULL, '2026-01-09 17:00:00', NULL),
(2156, 235, 37, 6, NULL, '2026-01-09 17:00:00', NULL),
(2157, 235, 36, 7, NULL, '2026-01-09 17:00:00', NULL),
(2158, 235, 26, 8, NULL, '2026-01-09 17:00:00', NULL),
(2159, 235, 24, 9, NULL, '2026-01-09 17:00:00', NULL),
(2160, 235, 23, 10, NULL, '2026-01-09 17:00:00', NULL),
(2161, 235, 22, 11, NULL, '2026-01-09 17:00:00', NULL),
(2162, 235, 19, 12, NULL, '2026-01-09 17:00:00', NULL),
(2163, 239, 91, 1, NULL, '2026-01-09 17:00:00', NULL),
(2164, 239, 89, 2, NULL, '2026-01-09 17:00:00', NULL),
(2165, 239, 64, 3, NULL, '2026-01-09 17:00:00', NULL),
(2166, 239, 62, 4, NULL, '2026-01-09 17:00:00', NULL),
(2167, 239, 38, 5, NULL, '2026-01-09 17:00:00', NULL),
(2168, 239, 37, 6, NULL, '2026-01-09 17:00:00', NULL),
(2169, 239, 36, 7, NULL, '2026-01-09 17:00:00', NULL),
(2170, 239, 26, 8, NULL, '2026-01-09 17:00:00', NULL),
(2171, 239, 24, 9, NULL, '2026-01-09 17:00:00', NULL),
(2172, 239, 23, 10, NULL, '2026-01-09 17:00:00', NULL),
(2173, 239, 22, 11, NULL, '2026-01-09 17:00:00', NULL),
(2174, 239, 19, 12, NULL, '2026-01-09 17:00:00', NULL),
(2175, 162, 129, 1, NULL, '2026-01-11 17:00:00', NULL),
(2176, 162, 53, 2, NULL, '2026-01-11 17:00:00', NULL),
(2177, 162, 52, 3, NULL, '2026-01-11 17:00:00', NULL),
(2178, 162, 50, 4, NULL, '2026-01-11 17:00:00', NULL),
(2179, 162, 49, 5, NULL, '2026-01-11 17:00:00', NULL),
(2180, 162, 35, 6, NULL, '2026-01-11 17:00:00', NULL),
(2181, 162, 34, 7, NULL, '2026-01-11 17:00:00', NULL),
(2182, 162, 33, 8, NULL, '2026-01-11 17:00:00', NULL),
(2183, 162, 25, 9, NULL, '2026-01-11 17:00:00', NULL),
(2184, 162, 24, 10, NULL, '2026-01-11 17:00:00', NULL),
(2185, 162, 23, 11, NULL, '2026-01-11 17:00:00', NULL),
(2186, 162, 22, 12, NULL, '2026-01-11 17:00:00', NULL),
(2187, 162, 19, 13, NULL, '2026-01-11 17:00:00', NULL),
(2188, 157, 129, 1, NULL, '2026-01-11 17:00:00', NULL),
(2189, 157, 53, 2, NULL, '2026-01-11 17:00:00', NULL),
(2190, 157, 52, 3, NULL, '2026-01-11 17:00:00', NULL),
(2191, 157, 50, 4, NULL, '2026-01-11 17:00:00', NULL),
(2192, 157, 49, 5, NULL, '2026-01-11 17:00:00', NULL),
(2193, 157, 35, 6, NULL, '2026-01-11 17:00:00', NULL),
(2194, 157, 34, 7, NULL, '2026-01-11 17:00:00', NULL),
(2195, 157, 33, 8, NULL, '2026-01-11 17:00:00', NULL),
(2196, 157, 25, 9, NULL, '2026-01-11 17:00:00', NULL),
(2197, 157, 24, 10, NULL, '2026-01-11 17:00:00', NULL),
(2198, 157, 23, 11, NULL, '2026-01-11 17:00:00', NULL),
(2199, 157, 22, 12, NULL, '2026-01-11 17:00:00', NULL),
(2200, 157, 19, 13, NULL, '2026-01-11 17:00:00', NULL),
(2201, 161, 128, 1, NULL, '2026-01-11 17:00:00', NULL),
(2202, 161, 53, 2, NULL, '2026-01-11 17:00:00', NULL),
(2203, 161, 52, 3, NULL, '2026-01-11 17:00:00', NULL),
(2204, 161, 50, 4, NULL, '2026-01-11 17:00:00', NULL),
(2205, 161, 49, 5, NULL, '2026-01-11 17:00:00', NULL),
(2206, 161, 35, 6, NULL, '2026-01-11 17:00:00', NULL),
(2207, 161, 34, 7, NULL, '2026-01-11 17:00:00', NULL),
(2208, 161, 33, 8, NULL, '2026-01-11 17:00:00', NULL),
(2209, 161, 25, 9, NULL, '2026-01-11 17:00:00', NULL),
(2210, 161, 24, 10, NULL, '2026-01-11 17:00:00', NULL),
(2211, 161, 23, 11, NULL, '2026-01-11 17:00:00', NULL),
(2212, 161, 22, 12, NULL, '2026-01-11 17:00:00', NULL),
(2213, 161, 19, 13, NULL, '2026-01-11 17:00:00', NULL),
(2214, 244, 162, 1, NULL, '2026-01-11 17:00:00', NULL),
(2215, 244, 129, 2, NULL, '2026-01-11 17:00:00', NULL),
(2216, 244, 53, 3, NULL, '2026-01-11 17:00:00', NULL),
(2217, 244, 52, 4, NULL, '2026-01-11 17:00:00', NULL),
(2218, 244, 50, 5, NULL, '2026-01-11 17:00:00', NULL),
(2219, 244, 49, 6, NULL, '2026-01-11 17:00:00', NULL),
(2220, 244, 35, 7, NULL, '2026-01-11 17:00:00', NULL),
(2221, 244, 34, 8, NULL, '2026-01-11 17:00:00', NULL),
(2222, 244, 33, 9, NULL, '2026-01-11 17:00:00', NULL),
(2223, 244, 25, 10, NULL, '2026-01-11 17:00:00', NULL),
(2224, 244, 24, 11, NULL, '2026-01-11 17:00:00', NULL),
(2225, 244, 23, 12, NULL, '2026-01-11 17:00:00', NULL),
(2226, 244, 22, 13, NULL, '2026-01-11 17:00:00', NULL),
(2227, 244, 19, 14, NULL, '2026-01-11 17:00:00', NULL),
(2228, 245, 157, 1, NULL, '2026-01-11 17:00:00', NULL),
(2229, 245, 129, 2, NULL, '2026-01-11 17:00:00', NULL),
(2230, 245, 53, 3, NULL, '2026-01-11 17:00:00', NULL),
(2231, 245, 52, 4, NULL, '2026-01-11 17:00:00', NULL),
(2232, 245, 50, 5, NULL, '2026-01-11 17:00:00', NULL),
(2233, 245, 49, 6, NULL, '2026-01-11 17:00:00', NULL),
(2234, 245, 35, 7, NULL, '2026-01-11 17:00:00', NULL),
(2235, 245, 34, 8, NULL, '2026-01-11 17:00:00', NULL),
(2236, 245, 33, 9, NULL, '2026-01-11 17:00:00', NULL),
(2237, 245, 25, 10, NULL, '2026-01-11 17:00:00', NULL),
(2238, 245, 24, 11, NULL, '2026-01-11 17:00:00', NULL),
(2239, 245, 23, 12, NULL, '2026-01-11 17:00:00', NULL),
(2240, 245, 22, 13, NULL, '2026-01-11 17:00:00', NULL),
(2241, 245, 19, 14, NULL, '2026-01-11 17:00:00', NULL),
(2242, 246, 245, 1, NULL, '2026-01-11 17:00:00', NULL),
(2243, 246, 157, 2, NULL, '2026-01-11 17:00:00', NULL),
(2244, 246, 129, 3, NULL, '2026-01-11 17:00:00', NULL),
(2245, 246, 53, 4, NULL, '2026-01-11 17:00:00', NULL),
(2246, 246, 52, 5, NULL, '2026-01-11 17:00:00', NULL),
(2247, 246, 50, 6, NULL, '2026-01-11 17:00:00', NULL),
(2248, 246, 49, 7, NULL, '2026-01-11 17:00:00', NULL),
(2249, 246, 35, 8, NULL, '2026-01-11 17:00:00', NULL),
(2250, 246, 34, 9, NULL, '2026-01-11 17:00:00', NULL),
(2251, 246, 33, 10, NULL, '2026-01-11 17:00:00', NULL),
(2252, 246, 25, 11, NULL, '2026-01-11 17:00:00', NULL),
(2253, 246, 24, 12, NULL, '2026-01-11 17:00:00', NULL),
(2254, 246, 23, 13, NULL, '2026-01-11 17:00:00', NULL),
(2255, 246, 22, 14, NULL, '2026-01-11 17:00:00', NULL),
(2256, 246, 19, 15, NULL, '2026-01-11 17:00:00', NULL),
(2257, 249, 175, 1, NULL, '2026-01-11 17:00:00', NULL),
(2258, 249, 173, 2, NULL, '2026-01-11 17:00:00', NULL),
(2259, 249, 119, 3, NULL, '2026-01-11 17:00:00', NULL),
(2260, 249, 77, 4, NULL, '2026-01-11 17:00:00', NULL),
(2261, 249, 75, 5, NULL, '2026-01-11 17:00:00', NULL),
(2262, 249, 74, 6, NULL, '2026-01-11 17:00:00', NULL),
(2263, 249, 66, 7, NULL, '2026-01-11 17:00:00', NULL),
(2264, 249, 65, 8, NULL, '2026-01-11 17:00:00', NULL),
(2265, 249, 64, 9, NULL, '2026-01-11 17:00:00', NULL),
(2266, 249, 62, 10, NULL, '2026-01-11 17:00:00', NULL),
(2267, 249, 38, 11, NULL, '2026-01-11 17:00:00', NULL),
(2268, 249, 37, 12, NULL, '2026-01-11 17:00:00', NULL),
(2269, 249, 36, 13, NULL, '2026-01-11 17:00:00', NULL),
(2270, 249, 26, 14, NULL, '2026-01-11 17:00:00', NULL),
(2271, 249, 24, 15, NULL, '2026-01-11 17:00:00', NULL),
(2272, 249, 23, 16, NULL, '2026-01-11 17:00:00', NULL),
(2273, 249, 22, 17, NULL, '2026-01-11 17:00:00', NULL),
(2274, 249, 19, 18, NULL, '2026-01-11 17:00:00', NULL),
(2275, 247, 173, 1, NULL, '2026-01-11 17:00:00', NULL),
(2276, 247, 119, 2, NULL, '2026-01-11 17:00:00', NULL),
(2277, 247, 77, 3, NULL, '2026-01-11 17:00:00', NULL),
(2278, 247, 75, 4, NULL, '2026-01-11 17:00:00', NULL),
(2279, 247, 74, 5, NULL, '2026-01-11 17:00:00', NULL),
(2280, 247, 66, 6, NULL, '2026-01-11 17:00:00', NULL),
(2281, 247, 65, 7, NULL, '2026-01-11 17:00:00', NULL),
(2282, 247, 64, 8, NULL, '2026-01-11 17:00:00', NULL),
(2283, 247, 62, 9, NULL, '2026-01-11 17:00:00', NULL),
(2284, 247, 38, 10, NULL, '2026-01-11 17:00:00', NULL),
(2285, 247, 37, 11, NULL, '2026-01-11 17:00:00', NULL),
(2286, 247, 36, 12, NULL, '2026-01-11 17:00:00', NULL),
(2287, 247, 26, 13, NULL, '2026-01-11 17:00:00', NULL),
(2288, 247, 24, 14, NULL, '2026-01-11 17:00:00', NULL),
(2289, 247, 23, 15, NULL, '2026-01-11 17:00:00', NULL),
(2290, 247, 22, 16, NULL, '2026-01-11 17:00:00', NULL),
(2291, 247, 19, 17, NULL, '2026-01-11 17:00:00', NULL),
(2292, 250, 193, 1, NULL, '2026-01-11 17:00:00', NULL),
(2293, 250, 191, 2, NULL, '2026-01-11 17:00:00', NULL),
(2294, 250, 190, 3, NULL, '2026-01-11 17:00:00', NULL),
(2295, 250, 118, 4, NULL, '2026-01-11 17:00:00', NULL),
(2296, 250, 117, 5, NULL, '2026-01-11 17:00:00', NULL),
(2297, 250, 74, 6, NULL, '2026-01-11 17:00:00', NULL),
(2298, 250, 66, 7, NULL, '2026-01-11 17:00:00', NULL),
(2299, 250, 65, 8, NULL, '2026-01-11 17:00:00', NULL),
(2300, 250, 64, 9, NULL, '2026-01-11 17:00:00', NULL),
(2301, 250, 62, 10, NULL, '2026-01-11 17:00:00', NULL),
(2302, 250, 38, 11, NULL, '2026-01-11 17:00:00', NULL),
(2303, 250, 37, 12, NULL, '2026-01-11 17:00:00', NULL),
(2304, 250, 36, 13, NULL, '2026-01-11 17:00:00', NULL),
(2305, 250, 26, 14, NULL, '2026-01-11 17:00:00', NULL),
(2306, 250, 24, 15, NULL, '2026-01-11 17:00:00', NULL),
(2307, 250, 23, 16, NULL, '2026-01-11 17:00:00', NULL),
(2308, 250, 22, 17, NULL, '2026-01-11 17:00:00', NULL),
(2309, 250, 19, 18, NULL, '2026-01-11 17:00:00', NULL),
(2310, 251, 193, 1, NULL, '2026-01-11 17:00:00', NULL),
(2311, 251, 191, 2, NULL, '2026-01-11 17:00:00', NULL),
(2312, 251, 190, 3, NULL, '2026-01-11 17:00:00', NULL),
(2313, 251, 118, 4, NULL, '2026-01-11 17:00:00', NULL),
(2314, 251, 117, 5, NULL, '2026-01-11 17:00:00', NULL),
(2315, 251, 74, 6, NULL, '2026-01-11 17:00:00', NULL),
(2316, 251, 66, 7, NULL, '2026-01-11 17:00:00', NULL),
(2317, 251, 65, 8, NULL, '2026-01-11 17:00:00', NULL),
(2318, 251, 64, 9, NULL, '2026-01-11 17:00:00', NULL),
(2319, 251, 62, 10, NULL, '2026-01-11 17:00:00', NULL),
(2320, 251, 38, 11, NULL, '2026-01-11 17:00:00', NULL),
(2321, 251, 37, 12, NULL, '2026-01-11 17:00:00', NULL),
(2322, 251, 36, 13, NULL, '2026-01-11 17:00:00', NULL),
(2323, 251, 26, 14, NULL, '2026-01-11 17:00:00', NULL),
(2324, 251, 24, 15, NULL, '2026-01-11 17:00:00', NULL),
(2325, 251, 23, 16, NULL, '2026-01-11 17:00:00', NULL),
(2326, 251, 22, 17, NULL, '2026-01-11 17:00:00', NULL),
(2327, 251, 19, 18, NULL, '2026-01-11 17:00:00', NULL),
(2328, 253, 52, 1, NULL, '2026-01-11 17:00:00', NULL),
(2329, 253, 50, 2, NULL, '2026-01-11 17:00:00', NULL),
(2330, 253, 49, 3, NULL, '2026-01-11 17:00:00', NULL),
(2331, 253, 35, 4, NULL, '2026-01-11 17:00:00', NULL),
(2332, 253, 34, 5, NULL, '2026-01-11 17:00:00', NULL),
(2333, 253, 33, 6, NULL, '2026-01-11 17:00:00', NULL),
(2334, 253, 25, 7, NULL, '2026-01-11 17:00:00', NULL),
(2335, 253, 24, 8, NULL, '2026-01-11 17:00:00', NULL),
(2336, 253, 23, 9, NULL, '2026-01-11 17:00:00', NULL),
(2337, 253, 22, 10, NULL, '2026-01-11 17:00:00', NULL),
(2338, 253, 19, 11, NULL, '2026-01-11 17:00:00', NULL),
(2339, 257, 246, 1, NULL, '2026-01-11 17:00:00', NULL),
(2340, 257, 245, 2, NULL, '2026-01-11 17:00:00', NULL),
(2341, 257, 157, 3, NULL, '2026-01-11 17:00:00', NULL),
(2342, 257, 129, 4, NULL, '2026-01-11 17:00:00', NULL),
(2343, 257, 53, 5, NULL, '2026-01-11 17:00:00', NULL),
(2344, 257, 52, 6, NULL, '2026-01-11 17:00:00', NULL),
(2345, 257, 50, 7, NULL, '2026-01-11 17:00:00', NULL),
(2346, 257, 49, 8, NULL, '2026-01-11 17:00:00', NULL),
(2347, 257, 35, 9, NULL, '2026-01-11 17:00:00', NULL),
(2348, 257, 34, 10, NULL, '2026-01-11 17:00:00', NULL),
(2349, 257, 33, 11, NULL, '2026-01-11 17:00:00', NULL),
(2350, 257, 25, 12, NULL, '2026-01-11 17:00:00', NULL),
(2351, 257, 24, 13, NULL, '2026-01-11 17:00:00', NULL),
(2352, 257, 23, 14, NULL, '2026-01-11 17:00:00', NULL),
(2353, 257, 22, 15, NULL, '2026-01-11 17:00:00', NULL),
(2354, 257, 19, 16, NULL, '2026-01-11 17:00:00', NULL),
(2355, 258, 246, 1, NULL, '2026-01-11 17:00:00', NULL),
(2356, 258, 245, 2, NULL, '2026-01-11 17:00:00', NULL),
(2357, 258, 157, 3, NULL, '2026-01-11 17:00:00', NULL),
(2358, 258, 129, 4, NULL, '2026-01-11 17:00:00', NULL),
(2359, 258, 53, 5, NULL, '2026-01-11 17:00:00', NULL),
(2360, 258, 52, 6, NULL, '2026-01-11 17:00:00', NULL),
(2361, 258, 50, 7, NULL, '2026-01-11 17:00:00', NULL),
(2362, 258, 49, 8, NULL, '2026-01-11 17:00:00', NULL),
(2363, 258, 35, 9, NULL, '2026-01-11 17:00:00', NULL),
(2364, 258, 34, 10, NULL, '2026-01-11 17:00:00', NULL),
(2365, 258, 33, 11, NULL, '2026-01-11 17:00:00', NULL),
(2366, 258, 25, 12, NULL, '2026-01-11 17:00:00', NULL),
(2367, 258, 24, 13, NULL, '2026-01-11 17:00:00', NULL),
(2368, 258, 23, 14, NULL, '2026-01-11 17:00:00', NULL),
(2369, 258, 22, 15, NULL, '2026-01-11 17:00:00', NULL),
(2370, 258, 19, 16, NULL, '2026-01-11 17:00:00', NULL),
(2371, 256, 158, 1, NULL, '2026-01-11 17:00:00', NULL),
(2372, 256, 60, 2, NULL, '2026-01-11 17:00:00', NULL),
(2373, 256, 54, 3, NULL, '2026-01-11 17:00:00', NULL),
(2374, 256, 52, 4, NULL, '2026-01-11 17:00:00', NULL),
(2375, 256, 50, 5, NULL, '2026-01-11 17:00:00', NULL),
(2376, 256, 49, 6, NULL, '2026-01-11 17:00:00', NULL),
(2377, 256, 35, 7, NULL, '2026-01-11 17:00:00', NULL),
(2378, 256, 34, 8, NULL, '2026-01-11 17:00:00', NULL),
(2379, 256, 33, 9, NULL, '2026-01-11 17:00:00', NULL),
(2380, 256, 25, 10, NULL, '2026-01-11 17:00:00', NULL),
(2381, 256, 24, 11, NULL, '2026-01-11 17:00:00', NULL),
(2382, 256, 23, 12, NULL, '2026-01-11 17:00:00', NULL),
(2383, 256, 22, 13, NULL, '2026-01-11 17:00:00', NULL),
(2384, 256, 19, 14, NULL, '2026-01-11 17:00:00', NULL),
(2385, 160, 158, 1, NULL, '2026-01-11 17:00:00', NULL),
(2386, 160, 60, 2, NULL, '2026-01-11 17:00:00', NULL),
(2387, 160, 54, 3, NULL, '2026-01-11 17:00:00', NULL),
(2388, 160, 52, 4, NULL, '2026-01-11 17:00:00', NULL),
(2389, 160, 50, 5, NULL, '2026-01-11 17:00:00', NULL),
(2390, 160, 49, 6, NULL, '2026-01-11 17:00:00', NULL),
(2391, 160, 35, 7, NULL, '2026-01-11 17:00:00', NULL),
(2392, 160, 34, 8, NULL, '2026-01-11 17:00:00', NULL),
(2393, 160, 33, 9, NULL, '2026-01-11 17:00:00', NULL),
(2394, 160, 25, 10, NULL, '2026-01-11 17:00:00', NULL),
(2395, 160, 24, 11, NULL, '2026-01-11 17:00:00', NULL),
(2396, 160, 23, 12, NULL, '2026-01-11 17:00:00', NULL),
(2397, 160, 22, 13, NULL, '2026-01-11 17:00:00', NULL),
(2398, 160, 19, 14, NULL, '2026-01-11 17:00:00', NULL),
(2399, 254, 253, 1, NULL, '2026-01-11 17:00:00', NULL),
(2400, 254, 52, 2, NULL, '2026-01-11 17:00:00', NULL),
(2401, 254, 50, 3, NULL, '2026-01-11 17:00:00', NULL),
(2402, 254, 49, 4, NULL, '2026-01-11 17:00:00', NULL),
(2403, 254, 35, 5, NULL, '2026-01-11 17:00:00', NULL),
(2404, 254, 34, 6, NULL, '2026-01-11 17:00:00', NULL),
(2405, 254, 33, 7, NULL, '2026-01-11 17:00:00', NULL),
(2406, 254, 25, 8, NULL, '2026-01-11 17:00:00', NULL),
(2407, 254, 24, 9, NULL, '2026-01-11 17:00:00', NULL),
(2408, 254, 23, 10, NULL, '2026-01-11 17:00:00', NULL),
(2409, 254, 22, 11, NULL, '2026-01-11 17:00:00', NULL),
(2410, 254, 19, 12, NULL, '2026-01-11 17:00:00', NULL),
(2411, 255, 253, 1, NULL, '2026-01-11 17:00:00', NULL),
(2412, 255, 52, 2, NULL, '2026-01-11 17:00:00', NULL),
(2413, 255, 50, 3, NULL, '2026-01-11 17:00:00', NULL),
(2414, 255, 49, 4, NULL, '2026-01-11 17:00:00', NULL),
(2415, 255, 35, 5, NULL, '2026-01-11 17:00:00', NULL),
(2416, 255, 34, 6, NULL, '2026-01-11 17:00:00', NULL),
(2417, 255, 33, 7, NULL, '2026-01-11 17:00:00', NULL),
(2418, 255, 25, 8, NULL, '2026-01-11 17:00:00', NULL),
(2419, 255, 24, 9, NULL, '2026-01-11 17:00:00', NULL),
(2420, 255, 23, 10, NULL, '2026-01-11 17:00:00', NULL),
(2421, 255, 22, 11, NULL, '2026-01-11 17:00:00', NULL),
(2422, 255, 19, 12, NULL, '2026-01-11 17:00:00', NULL),
(2423, 261, 172, 1, NULL, '2026-01-12 17:00:00', NULL),
(2424, 261, 60, 2, NULL, '2026-01-12 17:00:00', NULL),
(2425, 261, 54, 3, NULL, '2026-01-12 17:00:00', NULL),
(2426, 261, 52, 4, NULL, '2026-01-12 17:00:00', NULL),
(2427, 261, 50, 5, NULL, '2026-01-12 17:00:00', NULL),
(2428, 261, 49, 6, NULL, '2026-01-12 17:00:00', NULL),
(2429, 261, 35, 7, NULL, '2026-01-12 17:00:00', NULL),
(2430, 261, 34, 8, NULL, '2026-01-12 17:00:00', NULL),
(2431, 261, 33, 9, NULL, '2026-01-12 17:00:00', NULL),
(2432, 261, 25, 10, NULL, '2026-01-12 17:00:00', NULL),
(2433, 261, 24, 11, NULL, '2026-01-12 17:00:00', NULL),
(2434, 261, 23, 12, NULL, '2026-01-12 17:00:00', NULL),
(2435, 261, 22, 13, NULL, '2026-01-12 17:00:00', NULL),
(2436, 261, 19, 14, NULL, '2026-01-12 17:00:00', NULL),
(2437, 262, 172, 1, NULL, '2026-01-12 17:00:00', NULL),
(2438, 262, 60, 2, NULL, '2026-01-12 17:00:00', NULL),
(2439, 262, 54, 3, NULL, '2026-01-12 17:00:00', NULL),
(2440, 262, 52, 4, NULL, '2026-01-12 17:00:00', NULL),
(2441, 262, 50, 5, NULL, '2026-01-12 17:00:00', NULL),
(2442, 262, 49, 6, NULL, '2026-01-12 17:00:00', NULL),
(2443, 262, 35, 7, NULL, '2026-01-12 17:00:00', NULL),
(2444, 262, 34, 8, NULL, '2026-01-12 17:00:00', NULL),
(2445, 262, 33, 9, NULL, '2026-01-12 17:00:00', NULL),
(2446, 262, 25, 10, NULL, '2026-01-12 17:00:00', NULL),
(2447, 262, 24, 11, NULL, '2026-01-12 17:00:00', NULL),
(2448, 262, 23, 12, NULL, '2026-01-12 17:00:00', NULL),
(2449, 262, 22, 13, NULL, '2026-01-12 17:00:00', NULL),
(2450, 262, 19, 14, NULL, '2026-01-12 17:00:00', NULL),
(2451, 259, 52, 1, NULL, '2026-01-12 17:00:00', NULL),
(2452, 259, 50, 2, NULL, '2026-01-12 17:00:00', NULL),
(2453, 259, 49, 3, NULL, '2026-01-12 17:00:00', NULL),
(2454, 259, 35, 4, NULL, '2026-01-12 17:00:00', NULL),
(2455, 259, 34, 5, NULL, '2026-01-12 17:00:00', NULL),
(2456, 259, 33, 6, NULL, '2026-01-12 17:00:00', NULL),
(2457, 259, 25, 7, NULL, '2026-01-12 17:00:00', NULL),
(2458, 259, 24, 8, NULL, '2026-01-12 17:00:00', NULL),
(2459, 259, 23, 9, NULL, '2026-01-12 17:00:00', NULL),
(2460, 259, 22, 10, NULL, '2026-01-12 17:00:00', NULL),
(2461, 259, 19, 11, NULL, '2026-01-12 17:00:00', NULL),
(2462, 265, 160, 1, NULL, '2026-01-12 17:00:00', NULL),
(2463, 265, 158, 2, NULL, '2026-01-12 17:00:00', NULL),
(2464, 265, 60, 3, NULL, '2026-01-12 17:00:00', NULL),
(2465, 265, 54, 4, NULL, '2026-01-12 17:00:00', NULL),
(2466, 265, 52, 5, NULL, '2026-01-12 17:00:00', NULL),
(2467, 265, 50, 6, NULL, '2026-01-12 17:00:00', NULL),
(2468, 265, 49, 7, NULL, '2026-01-12 17:00:00', NULL),
(2469, 265, 35, 8, NULL, '2026-01-12 17:00:00', NULL),
(2470, 265, 34, 9, NULL, '2026-01-12 17:00:00', NULL),
(2471, 265, 33, 10, NULL, '2026-01-12 17:00:00', NULL),
(2472, 265, 25, 11, NULL, '2026-01-12 17:00:00', NULL),
(2473, 265, 24, 12, NULL, '2026-01-12 17:00:00', NULL),
(2474, 265, 23, 13, NULL, '2026-01-12 17:00:00', NULL),
(2475, 265, 22, 14, NULL, '2026-01-12 17:00:00', NULL),
(2476, 265, 19, 15, NULL, '2026-01-12 17:00:00', NULL),
(2477, 267, 261, 1, NULL, '2026-01-12 17:00:00', NULL),
(2478, 267, 172, 2, NULL, '2026-01-12 17:00:00', NULL),
(2479, 267, 60, 3, NULL, '2026-01-12 17:00:00', NULL),
(2480, 267, 54, 4, NULL, '2026-01-12 17:00:00', NULL),
(2481, 267, 52, 5, NULL, '2026-01-12 17:00:00', NULL),
(2482, 267, 50, 6, NULL, '2026-01-12 17:00:00', NULL),
(2483, 267, 49, 7, NULL, '2026-01-12 17:00:00', NULL),
(2484, 267, 35, 8, NULL, '2026-01-12 17:00:00', NULL),
(2485, 267, 34, 9, NULL, '2026-01-12 17:00:00', NULL),
(2486, 267, 33, 10, NULL, '2026-01-12 17:00:00', NULL),
(2487, 267, 25, 11, NULL, '2026-01-12 17:00:00', NULL),
(2488, 267, 24, 12, NULL, '2026-01-12 17:00:00', NULL),
(2489, 267, 23, 13, NULL, '2026-01-12 17:00:00', NULL),
(2490, 267, 22, 14, NULL, '2026-01-12 17:00:00', NULL),
(2491, 267, 19, 15, NULL, '2026-01-12 17:00:00', NULL),
(2492, 266, 265, 1, NULL, '2026-01-12 17:00:00', NULL),
(2493, 266, 160, 2, NULL, '2026-01-12 17:00:00', NULL),
(2494, 266, 158, 3, NULL, '2026-01-12 17:00:00', NULL),
(2495, 266, 60, 4, NULL, '2026-01-12 17:00:00', NULL),
(2496, 266, 54, 5, NULL, '2026-01-12 17:00:00', NULL),
(2497, 266, 52, 6, NULL, '2026-01-12 17:00:00', NULL),
(2498, 266, 50, 7, NULL, '2026-01-12 17:00:00', NULL),
(2499, 266, 49, 8, NULL, '2026-01-12 17:00:00', NULL),
(2500, 266, 35, 9, NULL, '2026-01-12 17:00:00', NULL),
(2501, 266, 34, 10, NULL, '2026-01-12 17:00:00', NULL),
(2502, 266, 33, 11, NULL, '2026-01-12 17:00:00', NULL),
(2503, 266, 25, 12, NULL, '2026-01-12 17:00:00', NULL),
(2504, 266, 24, 13, NULL, '2026-01-12 17:00:00', NULL),
(2505, 266, 23, 14, NULL, '2026-01-12 17:00:00', NULL),
(2506, 266, 22, 15, NULL, '2026-01-12 17:00:00', NULL),
(2507, 266, 19, 16, NULL, '2026-01-12 17:00:00', NULL),
(2508, 269, 253, 1, NULL, '2026-01-12 17:00:00', NULL),
(2509, 269, 52, 2, NULL, '2026-01-12 17:00:00', NULL),
(2510, 269, 50, 3, NULL, '2026-01-12 17:00:00', NULL),
(2511, 269, 49, 4, NULL, '2026-01-12 17:00:00', NULL),
(2512, 269, 35, 5, NULL, '2026-01-12 17:00:00', NULL),
(2513, 269, 34, 6, NULL, '2026-01-12 17:00:00', NULL),
(2514, 269, 33, 7, NULL, '2026-01-12 17:00:00', NULL),
(2515, 269, 25, 8, NULL, '2026-01-12 17:00:00', NULL),
(2516, 269, 24, 9, NULL, '2026-01-12 17:00:00', NULL),
(2517, 269, 23, 10, NULL, '2026-01-12 17:00:00', NULL),
(2518, 269, 22, 11, NULL, '2026-01-12 17:00:00', NULL),
(2519, 269, 19, 12, NULL, '2026-01-12 17:00:00', NULL),
(2520, 271, 267, 1, NULL, '2026-01-12 17:00:00', NULL),
(2521, 271, 261, 2, NULL, '2026-01-12 17:00:00', NULL),
(2522, 271, 172, 3, NULL, '2026-01-12 17:00:00', NULL),
(2523, 271, 60, 4, NULL, '2026-01-12 17:00:00', NULL),
(2524, 271, 54, 5, NULL, '2026-01-12 17:00:00', NULL),
(2525, 271, 52, 6, NULL, '2026-01-12 17:00:00', NULL),
(2526, 271, 50, 7, NULL, '2026-01-12 17:00:00', NULL),
(2527, 271, 49, 8, NULL, '2026-01-12 17:00:00', NULL),
(2528, 271, 35, 9, NULL, '2026-01-12 17:00:00', NULL),
(2529, 271, 34, 10, NULL, '2026-01-12 17:00:00', NULL),
(2530, 271, 33, 11, NULL, '2026-01-12 17:00:00', NULL),
(2531, 271, 25, 12, NULL, '2026-01-12 17:00:00', NULL),
(2532, 271, 24, 13, NULL, '2026-01-12 17:00:00', NULL),
(2533, 271, 23, 14, NULL, '2026-01-12 17:00:00', NULL),
(2534, 271, 22, 15, NULL, '2026-01-12 17:00:00', NULL),
(2535, 271, 19, 16, NULL, '2026-01-12 17:00:00', NULL),
(2536, 272, 267, 1, NULL, '2026-01-12 17:00:00', NULL),
(2537, 272, 261, 2, NULL, '2026-01-12 17:00:00', NULL),
(2538, 272, 172, 3, NULL, '2026-01-12 17:00:00', NULL),
(2539, 272, 60, 4, NULL, '2026-01-12 17:00:00', NULL),
(2540, 272, 54, 5, NULL, '2026-01-12 17:00:00', NULL),
(2541, 272, 52, 6, NULL, '2026-01-12 17:00:00', NULL),
(2542, 272, 50, 7, NULL, '2026-01-12 17:00:00', NULL),
(2543, 272, 49, 8, NULL, '2026-01-12 17:00:00', NULL),
(2544, 272, 35, 9, NULL, '2026-01-12 17:00:00', NULL),
(2545, 272, 34, 10, NULL, '2026-01-12 17:00:00', NULL),
(2546, 272, 33, 11, NULL, '2026-01-12 17:00:00', NULL),
(2547, 272, 25, 12, NULL, '2026-01-12 17:00:00', NULL),
(2548, 272, 24, 13, NULL, '2026-01-12 17:00:00', NULL),
(2549, 272, 23, 14, NULL, '2026-01-12 17:00:00', NULL),
(2550, 272, 22, 15, NULL, '2026-01-12 17:00:00', NULL),
(2551, 272, 19, 16, NULL, '2026-01-12 17:00:00', NULL),
(2552, 274, 266, 1, NULL, '2026-01-12 17:00:00', NULL),
(2553, 274, 265, 2, NULL, '2026-01-12 17:00:00', NULL),
(2554, 274, 160, 3, NULL, '2026-01-12 17:00:00', NULL),
(2555, 274, 158, 4, NULL, '2026-01-12 17:00:00', NULL),
(2556, 274, 60, 5, NULL, '2026-01-12 17:00:00', NULL),
(2557, 274, 54, 6, NULL, '2026-01-12 17:00:00', NULL),
(2558, 274, 52, 7, NULL, '2026-01-12 17:00:00', NULL),
(2559, 274, 50, 8, NULL, '2026-01-12 17:00:00', NULL),
(2560, 274, 49, 9, NULL, '2026-01-12 17:00:00', NULL),
(2561, 274, 35, 10, NULL, '2026-01-12 17:00:00', NULL),
(2562, 274, 34, 11, NULL, '2026-01-12 17:00:00', NULL),
(2563, 274, 33, 12, NULL, '2026-01-12 17:00:00', NULL),
(2564, 274, 25, 13, NULL, '2026-01-12 17:00:00', NULL),
(2565, 274, 24, 14, NULL, '2026-01-12 17:00:00', NULL),
(2566, 274, 23, 15, NULL, '2026-01-12 17:00:00', NULL),
(2567, 274, 22, 16, NULL, '2026-01-12 17:00:00', NULL),
(2568, 274, 19, 17, NULL, '2026-01-12 17:00:00', NULL),
(2569, 275, 271, 1, NULL, '2026-01-12 17:00:00', NULL),
(2570, 275, 267, 2, NULL, '2026-01-12 17:00:00', NULL),
(2571, 275, 261, 3, NULL, '2026-01-12 17:00:00', NULL),
(2572, 275, 172, 4, NULL, '2026-01-12 17:00:00', NULL),
(2573, 275, 60, 5, NULL, '2026-01-12 17:00:00', NULL),
(2574, 275, 54, 6, NULL, '2026-01-12 17:00:00', NULL),
(2575, 275, 52, 7, NULL, '2026-01-12 17:00:00', NULL),
(2576, 275, 50, 8, NULL, '2026-01-12 17:00:00', NULL),
(2577, 275, 49, 9, NULL, '2026-01-12 17:00:00', NULL),
(2578, 275, 35, 10, NULL, '2026-01-12 17:00:00', NULL),
(2579, 275, 34, 11, NULL, '2026-01-12 17:00:00', NULL),
(2580, 275, 33, 12, NULL, '2026-01-12 17:00:00', NULL),
(2581, 275, 25, 13, NULL, '2026-01-12 17:00:00', NULL),
(2582, 275, 24, 14, NULL, '2026-01-12 17:00:00', NULL),
(2583, 275, 23, 15, NULL, '2026-01-12 17:00:00', NULL),
(2584, 275, 22, 16, NULL, '2026-01-12 17:00:00', NULL),
(2585, 275, 19, 17, NULL, '2026-01-12 17:00:00', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_npwp`
--

CREATE TABLE `customer_npwp` (
  `id` int(11) NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(50) NOT NULL,
  `npwp` varchar(50) NOT NULL,
  `jk` tinyint(4) NOT NULL,
  `npwp_date` date NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `menikah` enum('Y','N') NOT NULL DEFAULT 'Y' COMMENT '0Single 1Menikah',
  `anak` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `kerja` enum('N','Y') NOT NULL DEFAULT 'N',
  `office` varchar(50) NOT NULL DEFAULT '-',
  `created` datetime NOT NULL,
  `createdby` varchar(20) NOT NULL,
  `updated` datetime NOT NULL,
  `updatedby` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_package`
--

CREATE TABLE `customer_package` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `pv` int(11) NOT NULL,
  `pr` int(11) NOT NULL,
  `sponsor` decimal(12,2) NOT NULL,
  `pairing` decimal(10,2) NOT NULL DEFAULT 0.00,
  `matching` decimal(10,2) NOT NULL DEFAULT 0.00,
  `flush_out` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_package`
--

INSERT INTO `customer_package` (`id`, `name`, `alias`, `price`, `pv`, `pr`, `sponsor`, `pairing`, `matching`, `flush_out`) VALUES
(1, 'ZENNER Plus', 'ZENNER Plus', 350000.00, 0, 0, 0.00, 20000.00, 0.00, 15.00),
(2, 'ZENNER Prime', 'ZENNER Prime', 1500000.00, 0, 0, 0.00, 20000.00, 0.00, 50.00),
(3, 'ZENNER Ultra', 'ZENNER Ultra', 3000000.00, 0, 0, 0.00, 20000.00, 0.00, 100.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_password_resets`
--

CREATE TABLE `customer_password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_password_resets`
--

INSERT INTO `customer_password_resets` (`email`, `token`, `created_at`) VALUES
('dedy001@gmail.com', '$2y$12$zYEbjZVCyL6mH4WV/A6TdeTs.cg31u/wfOiuBQQKEbPb/Zi5QVPbq', '2026-01-09 17:04:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_pph`
--

CREATE TABLE `customer_pph` (
  `id` int(11) NOT NULL,
  `member_id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(30) NOT NULL,
  `jk` tinyint(4) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `npwp` varchar(20) NOT NULL,
  `krj` enum('Y','N') NOT NULL DEFAULT 'N',
  `kantor` varchar(50) NOT NULL DEFAULT 'Unknown',
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `kid` tinyint(4) NOT NULL,
  `bonus` decimal(14,2) NOT NULL DEFAULT 0.00,
  `periode` date NOT NULL,
  `ptkp` double NOT NULL,
  `pkp` double NOT NULL,
  `sum_of_pkp` double NOT NULL,
  `sum_of_pkp_temp` double NOT NULL,
  `akumulasi_bruto_temp` double NOT NULL,
  `akumulasi_ptkp` double NOT NULL,
  `akumulasi_bruto` double NOT NULL,
  `tarif` double NOT NULL,
  `tarif_npwp` double NOT NULL,
  `pph21` double NOT NULL,
  `buffer` double NOT NULL,
  `created` datetime NOT NULL,
  `created_by` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `customer_pph`
--

INSERT INTO `customer_pph` (`id`, `member_id`, `nama`, `jk`, `alamat`, `npwp`, `krj`, `kantor`, `status`, `kid`, `bonus`, `periode`, `ptkp`, `pkp`, `sum_of_pkp`, `sum_of_pkp_temp`, `akumulasi_bruto_temp`, `akumulasi_ptkp`, `akumulasi_bruto`, `tarif`, `tarif_npwp`, `pph21`, `buffer`, `created`, `created_by`) VALUES
(1, 19, '', 0, '', '-', 'N', '', '0', 0, 100000.00, '2026-01-05', 0, 50000, 50000, 0, 50000, 0, 0, 5, 100, 2500, 0, '2026-01-06 00:00:00', 'automatic'),
(2, 64, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(3, 74, '', 0, '', '-', 'N', '', '0', 0, 390000.00, '2026-01-05', 0, 195000, 195000, 0, 195000, 0, 0, 5, 100, 9750, 0, '2026-01-06 00:00:00', 'automatic'),
(4, 75, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(5, 76, '', 0, '', '-', 'N', '', '0', 0, 220000.00, '2026-01-05', 0, 110000, 110000, 0, 110000, 0, 0, 5, 100, 5500, 0, '2026-01-06 00:00:00', 'automatic'),
(6, 77, '', 0, '', '-', 'N', '', '0', 0, 210000.00, '2026-01-05', 0, 105000, 105000, 0, 105000, 0, 0, 5, 100, 5250, 0, '2026-01-06 00:00:00', 'automatic'),
(7, 78, '', 0, '', '-', 'N', '', '0', 0, 70000.00, '2026-01-05', 0, 35000, 35000, 0, 35000, 0, 0, 5, 100, 1750, 0, '2026-01-06 00:00:00', 'automatic'),
(8, 80, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(9, 86, '', 0, '', '-', 'N', '', '0', 0, 280000.00, '2026-01-05', 0, 140000, 140000, 0, 140000, 0, 0, 5, 100, 7000, 0, '2026-01-06 00:00:00', 'automatic'),
(10, 87, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(11, 89, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(12, 92, '', 0, '', '-', 'N', '', '0', 0, 378000.00, '2026-01-05', 0, 189000, 189000, 0, 189000, 0, 0, 5, 100, 9450, 0, '2026-01-06 00:00:00', 'automatic'),
(13, 93, '', 0, '', '-', 'N', '', '0', 0, 70000.00, '2026-01-05', 0, 35000, 35000, 0, 35000, 0, 0, 5, 100, 1750, 0, '2026-01-06 00:00:00', 'automatic'),
(14, 94, '', 0, '', '-', 'N', '', '0', 0, 70000.00, '2026-01-05', 0, 35000, 35000, 0, 35000, 0, 0, 5, 100, 1750, 0, '2026-01-06 00:00:00', 'automatic'),
(15, 117, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(16, 118, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(17, 119, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(18, 120, '', 0, '', '-', 'N', '', '0', 0, 100000.00, '2026-01-05', 0, 50000, 50000, 0, 50000, 0, 0, 5, 100, 2500, 0, '2026-01-06 00:00:00', 'automatic'),
(19, 123, '', 0, '', '-', 'N', '', '0', 0, 258000.00, '2026-01-05', 0, 129000, 129000, 0, 129000, 0, 0, 5, 100, 6450, 0, '2026-01-06 00:00:00', 'automatic'),
(20, 146, '', 0, '', '-', 'N', '', '0', 0, 140000.00, '2026-01-05', 0, 70000, 70000, 0, 70000, 0, 0, 5, 100, 3500, 0, '2026-01-06 00:00:00', 'automatic'),
(21, 163, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(22, 164, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(23, 165, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(24, 167, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(25, 170, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(26, 174, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(27, 176, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(28, 177, '', 0, '', '-', 'N', '', '0', 0, 70000.00, '2026-01-05', 0, 35000, 35000, 0, 35000, 0, 0, 5, 100, 1750, 0, '2026-01-06 00:00:00', 'automatic'),
(29, 178, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(30, 180, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(31, 190, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(32, 194, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(33, 198, '', 0, '', '-', 'N', '', '0', 0, 400000.00, '2026-01-05', 0, 200000, 200000, 0, 200000, 0, 0, 5, 100, 10000, 0, '2026-01-06 00:00:00', 'automatic'),
(34, 199, '', 0, '', '-', 'N', '', '0', 0, 70000.00, '2026-01-05', 0, 35000, 35000, 0, 35000, 0, 0, 5, 100, 1750, 0, '2026-01-06 00:00:00', 'automatic'),
(35, 200, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(36, 202, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(37, 203, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(38, 207, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(39, 208, '', 0, '', '-', 'N', '', '0', 0, 100000.00, '2026-01-05', 0, 50000, 50000, 0, 50000, 0, 0, 5, 100, 2500, 0, '2026-01-06 00:00:00', 'automatic'),
(40, 211, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(41, 214, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(42, 220, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic'),
(43, 222, '', 0, '', '-', 'N', '', '0', 0, 50000.00, '2026-01-05', 0, 25000, 25000, 0, 25000, 0, 0, 5, 100, 1250, 0, '2026-01-06 00:00:00', 'automatic'),
(44, 82, '', 0, '', '-', 'N', '', '0', 0, 120000.00, '2026-01-05', 0, 60000, 60000, 0, 60000, 0, 0, 5, 100, 3000, 0, '2026-01-06 00:00:00', 'automatic');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer_wallet_transactions`
--

CREATE TABLE `customer_wallet_transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `type` enum('topup','withdrawal','bonus','purchase','refund','tax') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `balance_before` decimal(15,2) NOT NULL,
  `balance_after` decimal(15,2) NOT NULL,
  `status` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
  `payment_method` varchar(255) DEFAULT NULL,
  `transaction_ref` varchar(255) DEFAULT NULL,
  `midtrans_transaction_id` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_system` tinyint(1) DEFAULT 0 COMMENT 'json pattern',
  `midtrans_signature_key` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer_wallet_transactions`
--

INSERT INTO `customer_wallet_transactions` (`id`, `customer_id`, `type`, `amount`, `balance_before`, `balance_after`, `status`, `payment_method`, `transaction_ref`, `midtrans_transaction_id`, `notes`, `completed_at`, `created_at`, `updated_at`, `is_system`, `midtrans_signature_key`) VALUES
(1, 25, 'topup', 1500000.00, 0.00, 1500000.00, 'completed', 'admin_inject', 'INJECT-Q1CGZHJX9M', NULL, 'topup dari admin testing', '2025-12-29 19:27:04', '2025-12-29 19:27:04', '2025-12-29 19:27:04', 0, NULL),
(2, 25, 'purchase', 350000.00, 1500000.00, 1150000.00, 'completed', 'ewallet', 'PUR-KUQDARS2HT', NULL, 'Pembayaran order ORD-20251230-QI1ZNC', '2025-12-29 19:32:55', '2025-12-29 19:32:55', '2025-12-29 19:32:55', 0, NULL),
(3, 25, 'purchase', 350000.00, 1150000.00, 800000.00, 'completed', 'ewallet', 'PUR-BK6I5EAWMH', NULL, 'Pembayaran order ORD-20251230-YQMWIL', '2025-12-29 19:41:12', '2025-12-29 19:41:12', '2025-12-29 19:41:12', 0, NULL),
(7, 117, 'topup', 1500000.00, 0.00, 1500000.00, 'completed', 'admin_inject', 'INJECT-FXQ3K8YCXE', NULL, 'TRF031225X1FR', '2025-12-30 01:21:11', '2025-12-30 01:21:11', '2025-12-30 01:21:11', 0, NULL),
(8, 117, 'purchase', 1500000.00, 1500000.00, 0.00, 'completed', 'ewallet', 'PUR-VBEVMUZ9F8', NULL, 'Pembayaran order ORD-20251230-WUGVA9', '2025-12-30 01:22:27', '2025-12-30 01:22:27', '2025-12-30 01:22:27', 0, NULL),
(9, 119, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-TSPYSX0ZJ1', NULL, 'TRF061225513T2', '2025-12-30 03:25:50', '2025-12-30 03:25:50', '2025-12-30 03:25:50', 0, NULL),
(10, 119, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-CLT8N161I9', NULL, 'Pembayaran order ORD-20251230-UKT44S', '2025-12-30 03:33:59', '2025-12-30 03:33:59', '2025-12-30 03:33:59', 0, NULL),
(11, 120, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-AYIEZA31XT', NULL, 'TRF241225DG8Q', '2025-12-30 04:05:32', '2025-12-30 04:05:32', '2025-12-30 04:05:32', 0, NULL),
(12, 120, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-G525Z1ITJD', NULL, 'Pembayaran order ORD-20251230-HTSU9D', '2025-12-30 04:10:03', '2025-12-30 04:10:03', '2025-12-30 04:10:03', 0, NULL),
(13, 163, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-2T1IZRDLOB', NULL, 'TRF241225DG8Q', '2025-12-30 07:31:59', '2025-12-30 07:31:59', '2025-12-30 07:31:59', 0, NULL),
(14, 163, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-DAP41LJREZ', NULL, 'Pembayaran order ORD-20251230-MKNXXD', '2025-12-30 07:37:08', '2025-12-30 07:37:08', '2025-12-30 07:37:08', 0, NULL),
(15, 165, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-ATCJLA8ZJJ', NULL, 'TRF311225', '2025-12-30 08:31:48', '2025-12-30 08:31:48', '2025-12-30 08:31:48', 0, NULL),
(16, 165, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-NZ27VISU4V', NULL, 'Pembayaran order ORD-20251230-LFJFQV', '2025-12-30 08:36:01', '2025-12-30 08:36:01', '2025-12-30 08:36:01', 0, NULL),
(17, 166, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-CTHU1VNUSR', NULL, 'TRF131225KZHW', '2025-12-30 08:55:20', '2025-12-30 08:55:20', '2025-12-30 08:55:20', 0, NULL),
(18, 166, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-TXLN0HLX8J', NULL, 'Pembayaran order ORD-20251230-OIER1V', '2025-12-30 08:57:58', '2025-12-30 08:57:58', '2025-12-30 08:57:58', 0, NULL),
(19, 167, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-LEE2AVLTG5', NULL, 'TRF151225PKHSS MONA', '2025-12-30 09:24:27', '2025-12-30 09:24:27', '2025-12-30 09:24:27', 0, NULL),
(20, 167, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-M1MOUTZAM3', NULL, 'Pembayaran order ORD-20251230-ZG3ZF9', '2025-12-30 09:26:44', '2025-12-30 09:26:44', '2025-12-30 09:26:44', 0, NULL),
(21, 168, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-PFAKQJJUN1', NULL, 'TRF151225PKHSS MONA', '2025-12-30 09:40:44', '2025-12-30 09:40:44', '2025-12-30 09:40:44', 0, NULL),
(22, 169, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-YIYM5KYHMZ', NULL, 'TRF151225PKHSS MONA', '2025-12-30 09:42:14', '2025-12-30 09:42:14', '2025-12-30 09:42:14', 0, NULL),
(23, 169, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-2UPSMX36QN', NULL, 'Pembayaran order ORD-20251230-WAJRLX', '2025-12-30 09:45:17', '2025-12-30 09:45:17', '2025-12-30 09:45:17', 0, NULL),
(24, 168, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-ZTSQBCWKI2', NULL, 'Pembayaran order ORD-20251230-HMRNFM', '2025-12-30 09:56:15', '2025-12-30 09:56:15', '2025-12-30 09:56:15', 0, NULL),
(25, 170, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-AOFRRPT14H', NULL, 'TRF241225M9FHZ RADIAN', '2025-12-30 10:09:57', '2025-12-30 10:09:57', '2025-12-30 10:09:57', 0, NULL),
(26, 170, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-CM95X6ULJF', NULL, 'Pembayaran order ORD-20251230-S42WLQ', '2025-12-30 10:12:02', '2025-12-30 10:12:02', '2025-12-30 10:12:02', 0, NULL),
(27, 171, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-TIT6KCGAKT', NULL, 'TRF251225SG53 RADIAN', '2025-12-30 10:23:40', '2025-12-30 10:23:40', '2025-12-30 10:23:40', 0, NULL),
(28, 171, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-I0Q1IJAAAT', NULL, 'Pembayaran order ORD-20251230-GTQGRE', '2025-12-30 10:26:10', '2025-12-30 10:26:10', '2025-12-30 10:26:10', 0, NULL),
(29, 173, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-160KZGFNTQ', NULL, 'TRF061225513T2 YASMINAR', '2025-12-31 05:49:08', '2025-12-31 05:49:08', '2025-12-31 05:49:08', 0, NULL),
(30, 173, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-UXB6A46WMJ', NULL, 'Pembayaran order ORD-20251231-M0FRIP', '2025-12-31 05:52:00', '2025-12-31 05:52:00', '2025-12-31 05:52:00', 0, NULL),
(31, 176, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-GD53NPJ71V', NULL, 'TRF311225M0876 YASMINAR', '2025-12-31 06:42:31', '2025-12-31 06:42:31', '2025-12-31 06:42:31', 0, NULL),
(32, 176, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-U9UFJOJIQR', NULL, 'Pembayaran order ORD-20251231-OLA8WI', '2025-12-31 06:44:20', '2025-12-31 06:44:20', '2025-12-31 06:44:20', 0, NULL),
(33, 177, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-LKLBQD9XQU', NULL, 'TRF101225SCBMD TIRTA', '2025-12-31 06:50:34', '2025-12-31 06:50:34', '2025-12-31 06:50:34', 0, NULL),
(34, 177, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-FN01WZJAEH', NULL, 'Pembayaran order ORD-20251231-Z8YQQB', '2025-12-31 06:55:04', '2025-12-31 06:55:04', '2025-12-31 06:55:04', 0, NULL),
(35, 178, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-A1RLDUKEB2', NULL, 'TRF101225SCBMD TIRTA', '2025-12-31 07:19:34', '2025-12-31 07:19:34', '2025-12-31 07:19:34', 0, NULL),
(36, 178, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-PRQSW8BV0P', NULL, 'Pembayaran order ORD-20251231-8UIPJ2', '2025-12-31 07:21:00', '2025-12-31 07:21:00', '2025-12-31 07:21:00', 0, NULL),
(37, 179, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-YIXMUGXTIH', NULL, 'TRF101225SCBMD TIRTA', '2025-12-31 07:23:29', '2025-12-31 07:23:29', '2025-12-31 07:23:29', 0, NULL),
(38, 179, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-MAGJ891GGC', NULL, 'Pembayaran order ORD-20251231-QM2LHL', '2025-12-31 07:24:45', '2025-12-31 07:24:45', '2025-12-31 07:24:45', 0, NULL),
(39, 182, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-JSEXBDJUKO', NULL, 'TRF101225SCBMD TIRTA', '2025-12-31 07:31:05', '2025-12-31 07:31:05', '2025-12-31 07:31:05', 0, NULL),
(40, 182, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-E52KW1NQ9R', NULL, 'Pembayaran order ORD-20251231-XWP12E', '2025-12-31 07:32:08', '2025-12-31 07:32:08', '2025-12-31 07:32:08', 0, NULL),
(41, 183, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-WHF1FFTQQQ', NULL, 'TRF311225M0876 YASMINAR', '2025-12-31 07:39:09', '2025-12-31 07:39:09', '2025-12-31 07:39:09', 0, NULL),
(42, 183, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-PCP32UJB7M', NULL, 'Pembayaran order ORD-20251231-YOGEZR', '2025-12-31 07:40:39', '2025-12-31 07:40:39', '2025-12-31 07:40:39', 0, NULL),
(43, 184, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-3FIRXRIDTI', NULL, 'TRF311225M0876 YASMINAR', '2025-12-31 07:42:49', '2025-12-31 07:42:49', '2025-12-31 07:42:49', 0, NULL),
(44, 184, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-FXCAIO6ED5', NULL, 'Pembayaran order ORD-20251231-LILLB5', '2025-12-31 07:43:27', '2025-12-31 07:43:27', '2025-12-31 07:43:27', 0, NULL),
(45, 143, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-8A6E6C6N1P', NULL, 'TRF171225ZXL0 NURHALIMAH', '2026-01-02 02:11:38', '2026-01-02 02:11:38', '2026-01-02 02:11:38', 0, NULL),
(46, 121, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-MNCRS5XSY5', NULL, 'TRF171225ZXL0 NURHALIMAH', '2026-01-02 02:15:52', '2026-01-02 02:15:52', '2026-01-02 02:15:52', 0, NULL),
(47, 121, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-OBPW8JUJKU', NULL, 'Pembayaran order ORD-20260102-LFC2C6', '2026-01-02 02:18:53', '2026-01-02 02:18:53', '2026-01-02 02:18:53', 0, NULL),
(48, 118, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-IW91OGRIRH', NULL, 'TRF031225X1FR ALFI', '2026-01-02 03:57:59', '2026-01-02 03:57:59', '2026-01-02 03:57:59', 0, NULL),
(49, 118, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-4UZAGNWT8I', NULL, 'Pembayaran order ORD-20260102-IYMYTN', '2026-01-02 03:59:41', '2026-01-02 03:59:41', '2026-01-02 03:59:41', 0, NULL),
(50, 188, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-SL6EZD9DHD', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:05:07', '2026-01-02 04:05:07', '2026-01-02 04:05:07', 0, NULL),
(51, 188, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-YHIYSGBZGL', NULL, 'Pembayaran order ORD-20260102-L7XZBX', '2026-01-02 04:05:51', '2026-01-02 04:05:51', '2026-01-02 04:05:51', 0, NULL),
(52, 142, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-UFN2HO3KS2', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:09:27', '2026-01-02 04:09:27', '2026-01-02 04:09:27', 0, NULL),
(53, 142, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-DXYG5MJGGJ', NULL, 'Pembayaran order ORD-20260102-LZXTVM', '2026-01-02 04:11:53', '2026-01-02 04:11:53', '2026-01-02 04:11:53', 0, NULL),
(54, 189, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-QMZT1EM75O', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:20:52', '2026-01-02 04:20:52', '2026-01-02 04:20:52', 0, NULL),
(55, 189, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-BUQKFKTZ4D', NULL, 'Pembayaran order ORD-20260102-QGROY5', '2026-01-02 04:21:32', '2026-01-02 04:21:32', '2026-01-02 04:21:32', 0, NULL),
(56, 190, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-MXIFWC7OEN', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:29:35', '2026-01-02 04:29:35', '2026-01-02 04:29:35', 0, NULL),
(57, 190, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-R2VG9LPZUO', NULL, 'Pembayaran order ORD-20260102-XAEREB', '2026-01-02 04:30:20', '2026-01-02 04:30:20', '2026-01-02 04:30:20', 0, NULL),
(58, 191, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-LEO1HXITZV', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:35:45', '2026-01-02 04:35:45', '2026-01-02 04:35:45', 0, NULL),
(59, 192, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-6NKIF1ELTR', NULL, 'TRF031225X1FR ALFI', '2026-01-02 04:35:55', '2026-01-02 04:35:55', '2026-01-02 04:35:55', 0, NULL),
(60, 192, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-DMODBDXGN3', NULL, 'Pembayaran order ORD-20260102-7YOK7B', '2026-01-02 04:38:23', '2026-01-02 04:38:23', '2026-01-02 04:38:23', 0, NULL),
(61, 191, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-OJH6NGSG5N', NULL, 'Pembayaran order ORD-20260102-XN8A4B', '2026-01-02 04:39:51', '2026-01-02 04:39:51', '2026-01-02 04:39:51', 0, NULL),
(62, 123, 'topup', 1200000.00, 0.00, 1200000.00, 'completed', 'admin_inject', 'INJECT-ATWVSO6KTP', NULL, 'TRF301125RLHZ DINA', '2026-01-02 05:37:09', '2026-01-02 05:37:09', '2026-01-02 05:37:09', 0, NULL),
(63, 123, 'purchase', 1200000.00, 1200000.00, 0.00, 'completed', 'ewallet', 'PUR-BE2MBGSHX8', NULL, 'Pembayaran order ORD-20260102-B1BKVC', '2026-01-02 05:38:57', '2026-01-02 05:38:57', '2026-01-02 05:38:57', 0, NULL),
(64, 195, 'topup', 1200000.00, 0.00, 1200000.00, 'completed', 'admin_inject', 'INJECT-UBW2YSOLFX', NULL, 'TRF301125RLHZ DINA', '2026-01-02 05:44:58', '2026-01-02 05:44:58', '2026-01-02 05:44:58', 0, NULL),
(65, 195, 'purchase', 1200000.00, 1200000.00, 0.00, 'completed', 'ewallet', 'PUR-L51WWZZQXB', NULL, 'Pembayaran order ORD-20260102-SCUZ10', '2026-01-02 05:45:41', '2026-01-02 05:45:41', '2026-01-02 05:45:41', 0, NULL),
(66, 196, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-T0Q6ROGGCE', NULL, 'TRF301125RLHZ DINA', '2026-01-02 05:55:12', '2026-01-02 05:55:12', '2026-01-02 05:55:12', 0, NULL),
(67, 196, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-PVQX5LPXB9', NULL, 'Pembayaran order ORD-20260102-QZXXC3', '2026-01-02 05:56:03', '2026-01-02 05:56:03', '2026-01-02 05:56:03', 0, NULL),
(68, 194, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-DYM6YZSJQB', NULL, 'TRF301125RLHZ DINA', '2026-01-02 05:58:51', '2026-01-02 05:58:51', '2026-01-02 05:58:51', 0, NULL),
(69, 194, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-JEEDX9RBGO', NULL, 'Pembayaran order ORD-20260102-LSJXMM', '2026-01-02 06:02:03', '2026-01-02 06:02:03', '2026-01-02 06:02:03', 0, NULL),
(70, 150, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-KSLMDB0S3I', NULL, 'TRF301125RLHZ DINA', '2026-01-02 06:10:32', '2026-01-02 06:10:32', '2026-01-02 06:10:32', 0, NULL),
(71, 150, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WRJ0X9IJQS', NULL, 'Pembayaran order ORD-20260102-VQKTRZ', '2026-01-02 06:11:30', '2026-01-02 06:11:30', '2026-01-02 06:11:30', 0, NULL),
(72, 197, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-BQFICKWGMV', NULL, 'TRF301125RLHZ DINA', '2026-01-03 03:11:09', '2026-01-03 03:11:09', '2026-01-03 03:11:09', 0, NULL),
(73, 197, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-KYZUTUPMPS', NULL, 'Pembayaran order ORD-20260103-Q5EVBV', '2026-01-03 03:15:21', '2026-01-03 03:15:21', '2026-01-03 03:15:21', 0, NULL),
(74, 198, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-7ZUCO1XGPU', NULL, 'TRF111225D87G DEDY S', '2026-01-03 03:34:45', '2026-01-03 03:34:45', '2026-01-03 03:34:45', 0, NULL),
(75, 198, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WTA5OXCDNL', NULL, 'Pembayaran order ORD-20260103-SRXNZN', '2026-01-03 03:35:30', '2026-01-03 03:35:30', '2026-01-03 03:35:30', 0, NULL),
(76, 199, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-USPWMCGSPT', NULL, 'TRF111225D87G DEDY S', '2026-01-03 03:41:05', '2026-01-03 03:41:05', '2026-01-03 03:41:05', 0, NULL),
(77, 199, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-N6FHH9FPK8', NULL, 'Pembayaran order ORD-20260103-FQ5YIJ', '2026-01-03 03:41:59', '2026-01-03 03:41:59', '2026-01-03 03:41:59', 0, NULL),
(78, 201, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-NQCHNAO64R', NULL, 'TRF111225D87G DEDY S', '2026-01-03 03:48:34', '2026-01-03 03:48:34', '2026-01-03 03:48:34', 0, NULL),
(79, 201, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WIVG7EZNBW', NULL, 'Pembayaran order ORD-20260103-TMUGAO', '2026-01-03 03:49:22', '2026-01-03 03:49:22', '2026-01-03 03:49:22', 0, NULL),
(80, 202, 'topup', 1500000.00, 0.00, 1500000.00, 'completed', 'admin_inject', 'INJECT-NOMBE3O9ZH', NULL, 'TRF301225WGSR5 DEDY', '2026-01-03 03:58:20', '2026-01-03 03:58:20', '2026-01-03 03:58:20', 0, NULL),
(81, 202, 'purchase', 1500000.00, 1500000.00, 0.00, 'completed', 'ewallet', 'PUR-EHBPR2WY3U', NULL, 'Pembayaran order ORD-20260103-I8CJWQ', '2026-01-03 03:58:58', '2026-01-03 03:58:58', '2026-01-03 03:58:58', 0, NULL),
(82, 204, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-PWWVV31CQW', NULL, 'TRF111225D87G DEDY S', '2026-01-03 04:04:14', '2026-01-03 04:04:14', '2026-01-03 04:04:14', 0, NULL),
(83, 203, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-DPQRD6KV6U', NULL, 'TRF111225D87G DEDY S', '2026-01-03 04:04:24', '2026-01-03 04:04:24', '2026-01-03 04:04:24', 0, NULL),
(84, 204, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-ICVA6WJ4XT', NULL, 'Pembayaran order ORD-20260103-1FPKT0', '2026-01-03 04:05:10', '2026-01-03 04:05:10', '2026-01-03 04:05:10', 0, NULL),
(85, 203, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-UX0ICQSLXR', NULL, 'Pembayaran order ORD-20260103-IY9EJB', '2026-01-03 04:06:04', '2026-01-03 04:06:04', '2026-01-03 04:06:04', 0, NULL),
(86, 205, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-3HYCVZRDS6', NULL, 'TRF111225D87G DEDY S', '2026-01-03 04:10:57', '2026-01-03 04:10:57', '2026-01-03 04:10:57', 0, NULL),
(87, 205, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-SLGKGNELQI', NULL, 'Pembayaran order ORD-20260103-VCVNGZ', '2026-01-03 04:11:44', '2026-01-03 04:11:44', '2026-01-03 04:11:44', 0, NULL),
(88, 206, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-2K9KKLNNTW', NULL, 'TRF111225D87G DEDY S', '2026-01-03 04:23:44', '2026-01-03 04:23:44', '2026-01-03 04:23:44', 0, NULL),
(89, 206, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-XWN2SI0AP1', NULL, 'Pembayaran order ORD-20260103-WCBF40', '2026-01-03 04:24:33', '2026-01-03 04:24:33', '2026-01-03 04:24:33', 0, NULL),
(90, 207, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-ZR8BJFSLBA', NULL, 'TRF1012250D1V TINA', '2026-01-03 04:34:50', '2026-01-03 04:34:50', '2026-01-03 04:34:50', 0, NULL),
(91, 207, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-IEFAPHTYMV', NULL, 'Pembayaran order ORD-20260103-IR92XZ', '2026-01-03 04:35:35', '2026-01-03 04:35:35', '2026-01-03 04:35:35', 0, NULL),
(92, 208, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-ZDPJCDAJUD', NULL, 'TRF1012T2K5 TINA', '2026-01-03 04:43:42', '2026-01-03 04:43:42', '2026-01-03 04:43:42', 0, NULL),
(93, 210, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-OXY7NSDEG8', NULL, 'TRF101225ZRMJ TINA', '2026-01-03 04:44:10', '2026-01-03 04:44:10', '2026-01-03 04:44:10', 0, NULL),
(94, 210, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-6XKOAP1TNP', NULL, 'Pembayaran order ORD-20260103-Z3KEL3', '2026-01-03 04:44:49', '2026-01-03 04:44:49', '2026-01-03 04:44:49', 0, NULL),
(95, 208, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-FLZETXRXOR', NULL, 'Pembayaran order ORD-20260103-PQDVWA', '2026-01-03 04:45:54', '2026-01-03 04:45:54', '2026-01-03 04:45:54', 0, NULL),
(96, 211, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-OVQLWDRUHV', NULL, 'TRF1112259BNK  BANIAH', '2026-01-03 04:50:48', '2026-01-03 04:50:48', '2026-01-03 04:50:48', 0, NULL),
(97, 211, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-DVYV9HXAVJ', NULL, 'Pembayaran order ORD-20260103-FOF699', '2026-01-03 04:51:30', '2026-01-03 04:51:30', '2026-01-03 04:51:30', 0, NULL),
(98, 212, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-LKIPPXEKZW', NULL, 'TRF1112259BNK  BANIAH', '2026-01-03 04:54:01', '2026-01-03 04:54:01', '2026-01-03 04:54:01', 0, NULL),
(99, 213, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-2CNA5XCKTX', NULL, 'TRF1112259BNK  BANIAH', '2026-01-03 04:54:15', '2026-01-03 04:54:15', '2026-01-03 04:54:15', 0, NULL),
(100, 213, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-E90HEBIWCM', NULL, 'Pembayaran order ORD-20260103-XVLMVX', '2026-01-03 04:55:18', '2026-01-03 04:55:18', '2026-01-03 04:55:18', 0, NULL),
(101, 212, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-UCJKF9NGRL', NULL, 'Pembayaran order ORD-20260103-RZD410', '2026-01-03 04:56:25', '2026-01-03 04:56:25', '2026-01-03 04:56:25', 0, NULL),
(102, 214, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-J2MNT2FTSQ', NULL, 'TRF101225ZRMJ TINA', '2026-01-03 04:59:49', '2026-01-03 04:59:49', '2026-01-03 04:59:49', 0, NULL),
(103, 214, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-1DU4CDS7C8', NULL, 'Pembayaran order ORD-20260103-LPYQTB', '2026-01-03 05:00:36', '2026-01-03 05:00:36', '2026-01-03 05:00:36', 0, NULL),
(104, 216, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-ZNA5MMGHDM', NULL, 'TRF101225SJ5H TINA', '2026-01-03 05:03:42', '2026-01-03 05:03:42', '2026-01-03 05:03:42', 0, NULL),
(105, 217, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-HXYQXXDLNN', NULL, 'TRF101225SJ5H TINA', '2026-01-03 05:03:57', '2026-01-03 05:03:57', '2026-01-03 05:03:57', 0, NULL),
(106, 217, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-EDBWIIBGYO', NULL, 'Pembayaran order ORD-20260103-TRM7WL', '2026-01-03 05:04:36', '2026-01-03 05:04:36', '2026-01-03 05:04:36', 0, NULL),
(107, 216, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-IA1RG8HGAI', NULL, 'Pembayaran order ORD-20260103-SFI9MT', '2026-01-03 05:05:26', '2026-01-03 05:05:26', '2026-01-03 05:05:26', 0, NULL),
(108, 146, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-NBA5ABPBLZ', NULL, 'TRF271225C1X ZAKY', '2026-01-05 00:47:27', '2026-01-05 00:47:27', '2026-01-05 00:47:27', 0, NULL),
(109, 146, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WT0TWGJAEP', NULL, 'Pembayaran order ORD-20260105-C6NTXH', '2026-01-05 00:50:45', '2026-01-05 00:50:45', '2026-01-05 00:50:45', 0, NULL),
(110, 220, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-9RFPTZDOMB', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 01:27:42', '2026-01-05 01:27:42', '2026-01-05 01:27:42', 0, NULL),
(111, 222, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-AP1YWS5SPH', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 01:27:58', '2026-01-05 01:27:58', '2026-01-05 01:27:58', 0, NULL),
(112, 221, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-QA7I1F1CDJ', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 01:28:10', '2026-01-05 01:28:10', '2026-01-05 01:28:10', 0, NULL),
(113, 222, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-W5QEJPCLNO', NULL, 'Pembayaran order ORD-20260105-AK4V0K', '2026-01-05 01:28:52', '2026-01-05 01:28:52', '2026-01-05 01:28:52', 0, NULL),
(114, 220, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-G6JBHVB0NZ', NULL, 'Pembayaran order ORD-20260105-GGFL54', '2026-01-05 01:30:03', '2026-01-05 01:30:03', '2026-01-05 01:30:03', 0, NULL),
(115, 221, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-MUYHCNGMJT', NULL, 'Pembayaran order ORD-20260105-2EYCKD', '2026-01-05 01:31:57', '2026-01-05 01:31:57', '2026-01-05 01:31:57', 0, NULL),
(116, 223, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-H95RQBYFSQ', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 01:57:42', '2026-01-05 01:57:42', '2026-01-05 01:57:42', 0, NULL),
(117, 223, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-JVGESIXXNR', NULL, 'Pembayaran order ORD-20260105-FVV1EW', '2026-01-05 01:58:17', '2026-01-05 01:58:17', '2026-01-05 01:58:17', 0, NULL),
(118, 224, 'topup', 35000.00, 0.00, 35000.00, 'completed', 'admin_inject', 'INJECT-GMM6Y4BE90', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 02:12:05', '2026-01-05 02:12:05', '2026-01-05 02:12:05', 0, NULL),
(119, 224, 'topup', 315000.00, 35000.00, 350000.00, 'completed', 'admin_inject', 'INJECT-JXF8LBFI2P', NULL, 'TRFBCA0301260301 AAN', '2026-01-05 02:13:44', '2026-01-05 02:13:44', '2026-01-05 02:13:44', 0, NULL),
(120, 224, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-QCA3U8LVSL', NULL, 'Pembayaran order ORD-20260105-6YGIGW', '2026-01-05 02:15:27', '2026-01-05 02:15:27', '2026-01-05 02:15:27', 0, NULL),
(121, 64, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(122, 64, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(123, 74, 'bonus', 390000.00, 0.00, 390000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(124, 74, 'tax', 9750.00, 390000.00, 380250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(125, 75, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(126, 75, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(127, 76, 'bonus', 220000.00, 0.00, 220000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(128, 76, 'tax', 5500.00, 220000.00, 214500.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(129, 77, 'bonus', 210000.00, 0.00, 210000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(130, 77, 'tax', 5250.00, 210000.00, 204750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(131, 78, 'bonus', 70000.00, 0.00, 70000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(132, 78, 'tax', 1750.00, 70000.00, 68250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(133, 80, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(134, 80, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(135, 86, 'bonus', 280000.00, 0.00, 280000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(136, 86, 'tax', 7000.00, 280000.00, 273000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(137, 87, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(138, 87, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(139, 89, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(140, 89, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(141, 92, 'bonus', 378000.00, 0.00, 378000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(142, 92, 'tax', 9450.00, 378000.00, 368550.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(143, 93, 'bonus', 70000.00, 0.00, 70000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(144, 93, 'tax', 1750.00, 70000.00, 68250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(145, 94, 'bonus', 70000.00, 0.00, 70000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(146, 94, 'tax', 1750.00, 70000.00, 68250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(147, 117, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(148, 117, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(149, 118, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(150, 118, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(151, 119, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(152, 119, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(153, 120, 'bonus', 100000.00, 0.00, 100000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(154, 120, 'tax', 2500.00, 100000.00, 97500.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(155, 123, 'bonus', 258000.00, 0.00, 258000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(156, 123, 'tax', 6450.00, 258000.00, 251550.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(157, 146, 'bonus', 140000.00, 0.00, 140000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(158, 146, 'tax', 3500.00, 140000.00, 136500.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(159, 163, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(160, 163, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(161, 164, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(162, 164, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(163, 165, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(164, 165, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(165, 167, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(166, 167, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(167, 170, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(168, 170, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(169, 174, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(170, 174, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(171, 176, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(172, 176, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(173, 177, 'bonus', 70000.00, 0.00, 70000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(174, 177, 'tax', 1750.00, 70000.00, 68250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(175, 178, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(176, 178, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(177, 180, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(178, 180, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(179, 190, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(180, 190, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(181, 194, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(182, 194, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(183, 198, 'bonus', 400000.00, 0.00, 400000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(184, 198, 'tax', 10000.00, 400000.00, 390000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(185, 199, 'bonus', 70000.00, 0.00, 70000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(186, 199, 'tax', 1750.00, 70000.00, 68250.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(187, 200, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(188, 200, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(189, 202, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(190, 202, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(191, 203, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(192, 203, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(193, 207, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(194, 207, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(195, 208, 'bonus', 100000.00, 0.00, 100000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(196, 208, 'tax', 2500.00, 100000.00, 97500.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(197, 211, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(198, 211, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(199, 214, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(200, 214, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(201, 220, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(202, 220, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(203, 222, 'bonus', 50000.00, 0.00, 50000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(204, 222, 'tax', 1250.00, 50000.00, 48750.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(205, 82, 'bonus', 120000.00, 0.00, 120000.00, 'completed', NULL, NULL, NULL, 'Akumulasi komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(206, 82, 'tax', 3000.00, 120000.00, 117000.00, 'completed', NULL, NULL, NULL, 'Pajak komisi tanggal  2026-01-05', '2026-01-06 05:22:31', '2026-01-06 05:22:31', NULL, 0, NULL),
(207, 146, 'withdrawal', 136500.00, 136500.00, 0.00, 'failed', NULL, 'WD-20260106062220-I6EF7F', NULL, '{\"bank_name\":\"BCA\",\"bank_account\":\"3616919\",\"bank_holder\":\"ZAKYTES\"}', NULL, '2026-01-05 23:22:20', '2026-01-05 23:30:06', 0, NULL),
(208, 146, 'withdrawal', 136500.00, 136500.00, 0.00, 'completed', 'wallet_withdrawal', 'WD-FVRVENBH22', NULL, 'Withdrawal request: WD-20260106062220-I6EF7F', '2026-01-05 23:22:20', '2026-01-05 23:22:20', '2026-01-05 23:22:20', 0, NULL),
(209, 226, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-QHRZHZO0MU', NULL, 'TRF060126V66\\BNK HARYANTO', '2026-01-07 04:26:43', '2026-01-07 04:26:43', '2026-01-07 04:26:43', 0, NULL),
(210, 226, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-PDTTQLXW1Z', NULL, 'Pembayaran order ORD-20260107-N5WJ2X', '2026-01-07 04:28:17', '2026-01-07 04:28:17', '2026-01-07 04:28:17', 0, NULL),
(212, 86, 'withdrawal', 250000.00, 273000.00, 23000.00, 'completed', 'wallet_withdrawal', 'WD-BHHWL3U8JF', NULL, 'Withdrawal request: WD-20260107125624-PKEZN3', '2026-01-07 05:56:24', '2026-01-07 05:56:24', '2026-01-07 05:56:24', 0, NULL),
(213, 227, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-DF3CBZS3DO', NULL, 'TRF0701267LS7VJ ALI BASAR', '2026-01-07 06:22:47', '2026-01-07 06:22:47', '2026-01-07 06:22:47', 0, NULL),
(214, 227, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WELXD7EYM1', NULL, 'Pembayaran order ORD-20260107-L505AN', '2026-01-07 06:30:09', '2026-01-07 06:30:09', '2026-01-07 06:30:09', 0, NULL),
(216, 120, 'withdrawal', 90000.00, 97500.00, 7500.00, 'completed', 'wallet_withdrawal', 'WD-NMCIATJNCT', NULL, 'Withdrawal request: WD-20260107152844-IKVCLH', '2026-01-07 08:28:44', '2026-01-07 08:28:44', '2026-01-07 08:28:44', 0, NULL),
(217, 143, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-ZLPZSTPSRR', NULL, 'Pembayaran order ORD-20260108-HJLMKJ', '2026-01-07 22:37:56', '2026-01-07 22:37:56', '2026-01-07 22:37:56', 0, NULL),
(218, 229, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-WL5QODGCBN', NULL, 'TRF060125SVHWB AAN', '2026-01-08 01:57:44', '2026-01-08 01:57:44', '2026-01-08 01:57:44', 0, NULL),
(219, 229, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-AHJ1XQF6XC', NULL, 'Pembayaran order ORD-20260108-PTM2PX', '2026-01-08 01:58:47', '2026-01-08 01:58:47', '2026-01-08 01:58:47', 0, NULL),
(220, 231, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-W5ZBCE8IFG', NULL, 'TRF0801268W4PC ALFI', '2026-01-08 02:04:06', '2026-01-08 02:04:06', '2026-01-08 02:04:06', 0, NULL),
(221, 231, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-0AZCMKAXKE', NULL, 'Pembayaran order ORD-20260108-LMHL4V', '2026-01-08 02:08:12', '2026-01-08 02:08:12', '2026-01-08 02:08:12', 0, NULL),
(222, 93, 'topup', 700000.00, 68250.00, 768250.00, 'completed', 'admin_inject', 'INJECT-QPWRNMRD6O', NULL, 'TRF301125RLHZ DINA', '2026-01-08 02:17:17', '2026-01-08 02:17:17', '2026-01-08 02:17:17', 0, NULL),
(223, 93, 'purchase', 700000.00, 768250.00, 68250.00, 'completed', 'ewallet', 'PUR-GISKXUGNPH', NULL, 'Pembayaran order ORD-20260108-KJTQFY', '2026-01-08 02:21:42', '2026-01-08 02:21:42', '2026-01-08 02:21:42', 0, NULL),
(224, 74, 'withdrawal', 350000.00, 380250.00, -319750.00, 'completed', NULL, 'WD-20260110072904-QBWRSF', NULL, '{\"bank_name\":\"BCA\",\"bank_account\":\"8550769183\",\"bank_holder\":\"ALFI KASANAH\",\"gross_amount\":350000,\"admin_fee\":6500,\"net_amount\":343500,\"payout_reference\":null,\"payout_status\":\"unknown\",\"simulated\":false,\"processed_at\":\"2026-01-12 11:45:12\"}', '2026-01-12 04:45:12', '2026-01-10 00:29:04', '2026-01-12 04:45:12', 0, NULL),
(225, 29, 'topup', 350000.00, 0.00, 0.00, 'failed', 'midtrans', 'TOPUP-20260110080234-6962079a073f1-3UG8', '26ac25fb-cb87-4007-9041-4f3d850b3cca', NULL, NULL, '2026-01-10 01:02:34', '2026-01-10 01:04:41', 0, NULL),
(226, 42, 'topup', 1000000.00, 0.00, 0.00, 'pending', 'midtrans', 'TOPUP-20260110081300-69620a0c3eed8-FFAE', 'a4eb42f8-f85a-4fc1-9a16-18c0053dd842', NULL, NULL, '2026-01-10 01:13:00', '2026-01-10 01:13:00', 0, NULL),
(227, 233, 'topup', 1500000.00, 0.00, 1500000.00, 'completed', 'admin_inject', 'INJECT-BO2EPJWWS3', NULL, 'TRF211125301G AAN', '2026-01-10 04:50:25', '2026-01-10 04:50:25', '2026-01-10 04:50:25', 0, NULL),
(228, 233, 'purchase', 1500000.00, 1500000.00, 0.00, 'completed', 'ewallet', 'PUR-OOK6XY1UUL', NULL, 'Pembayaran order ORD-20260110-KLXM33', '2026-01-10 04:51:20', '2026-01-10 04:51:20', '2026-01-10 04:51:20', 0, NULL),
(229, 238, 'topup', 1500000.00, 0.00, 1500000.00, 'completed', 'admin_inject', 'INJECT-GOQ2WDGIK9', NULL, 'TRF020126BQB3K DANA', '2026-01-10 05:20:11', '2026-01-10 05:20:11', '2026-01-10 05:20:11', 0, NULL),
(230, 235, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-WLP0YMSYPX', NULL, 'TRF231225G028T DANA', '2026-01-10 05:21:42', '2026-01-10 05:21:42', '2026-01-10 05:21:42', 0, NULL),
(231, 236, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-Q6W6UBP45F', NULL, 'TRF100126HSDDZ AAN', '2026-01-10 05:22:31', '2026-01-10 05:22:31', '2026-01-10 05:22:31', 0, NULL),
(232, 238, 'purchase', 1500000.00, 1500000.00, 0.00, 'completed', 'ewallet', 'PUR-1WNK4IK7KY', NULL, 'Pembayaran order ORD-20260110-24GIEH', '2026-01-10 05:23:25', '2026-01-10 05:23:25', '2026-01-10 05:23:25', 0, NULL),
(233, 236, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-0M2FCS8SEI', NULL, 'Pembayaran order ORD-20260110-ESDHWG', '2026-01-10 05:25:14', '2026-01-10 05:25:14', '2026-01-10 05:25:14', 0, NULL),
(234, 235, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-S3CSYEYX3Y', NULL, 'Pembayaran order ORD-20260110-61NZMO', '2026-01-10 05:26:38', '2026-01-10 05:26:38', '2026-01-10 05:26:38', 0, NULL),
(235, 239, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-SLVYAKULEO', NULL, 'TRF100126HSDDZ AAN', '2026-01-10 05:40:12', '2026-01-10 05:40:12', '2026-01-10 05:40:12', 0, NULL),
(236, 239, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-DZIWDITHBQ', NULL, 'Pembayaran order ORD-20260110-CWY3UC', '2026-01-10 05:41:26', '2026-01-10 05:41:26', '2026-01-10 05:41:26', 0, NULL),
(237, 93, 'topup', 1050000.00, 68250.00, 1118250.00, 'completed', 'admin_inject', 'INJECT-I9ONRGPOMJ', NULL, 'TRF090126622LQ AAN', '2026-01-11 18:05:59', '2026-01-11 18:05:59', '2026-01-11 18:05:59', 0, NULL),
(238, 93, 'purchase', 1050000.00, 1118250.00, 68250.00, 'completed', 'ewallet', 'PUR-24R6DITRFJ', NULL, 'Pembayaran order ORD-20260112-QBNLJE', '2026-01-11 18:10:16', '2026-01-11 18:10:16', '2026-01-11 18:10:16', 0, NULL),
(239, 157, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-ECJQRATU0P', NULL, 'TRF091225GBL7P APRIANTO', '2026-01-11 22:45:15', '2026-01-11 22:45:15', '2026-01-11 22:45:15', 0, NULL),
(240, 162, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-LIA3BHNUFR', NULL, 'TRF091225GBL7P APRIANTO', '2026-01-11 22:45:30', '2026-01-11 22:45:30', '2026-01-11 22:45:30', 0, NULL),
(241, 157, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-MWM79AWINR', NULL, 'Pembayaran order ORD-20260112-TOE8OM', '2026-01-12 00:39:47', '2026-01-12 00:39:47', '2026-01-12 00:39:47', 0, NULL),
(242, 162, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-RFSEVKNBTR', NULL, 'Pembayaran order ORD-20260112-VW8O0E', '2026-01-12 00:42:09', '2026-01-12 00:42:09', '2026-01-12 00:42:09', 0, NULL),
(243, 161, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-YOZ3LOBBJS', NULL, 'TRF111225B9NDY JUNAIDI', '2026-01-12 01:09:49', '2026-01-12 01:09:49', '2026-01-12 01:09:49', 0, NULL),
(244, 244, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-8QX5RM5DW2', NULL, 'TRF141225FXBH APRIANTO', '2026-01-12 01:11:33', '2026-01-12 01:11:33', '2026-01-12 01:11:33', 0, NULL),
(245, 245, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-YMSFKBWXCH', NULL, 'TRF151225TGHZF APRIANTO', '2026-01-12 01:12:37', '2026-01-12 01:12:37', '2026-01-12 01:12:37', 0, NULL),
(246, 80, 'withdrawal', 117000.00, 117000.00, -117000.00, 'completed', NULL, 'WD-20260112081849-JWUIQF', NULL, '{\"bank_name\":\"BSI\",\"bank_account\":\"7294089602\",\"bank_holder\":\"Nurhalimah\",\"gross_amount\":117000,\"admin_fee\":6500,\"net_amount\":110500,\"payout_reference\":null,\"payout_status\":\"unknown\",\"simulated\":false,\"processed_at\":\"2026-01-12 11:45:20\"}', '2026-01-12 04:45:20', '2026-01-12 01:18:49', '2026-01-12 04:45:20', 0, NULL),
(247, 161, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WS79RFKBIC', NULL, 'Pembayaran order ORD-20260112-WFVO4I', '2026-01-12 01:22:34', '2026-01-12 01:22:34', '2026-01-12 01:22:34', 0, NULL),
(248, 244, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-RT7BWB8U5Z', NULL, 'Pembayaran order ORD-20260112-YGK2LG', '2026-01-12 01:25:13', '2026-01-12 01:25:13', '2026-01-12 01:25:13', 0, NULL),
(249, 82, 'withdrawal', 117000.00, 117000.00, -117000.00, 'completed', NULL, 'WD-20260112082750-O6YECA', NULL, '{\"bank_name\":\"BSI\",\"bank_account\":\"7294089602\",\"bank_holder\":\"Nurhalimah\",\"gross_amount\":117000,\"admin_fee\":6500,\"net_amount\":110500,\"payout_reference\":null,\"payout_status\":\"unknown\",\"simulated\":false,\"processed_at\":\"2026-01-12 11:45:30\"}', '2026-01-12 04:45:30', '2026-01-12 01:27:50', '2026-01-12 04:45:30', 0, NULL),
(250, 245, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-3S2VR3XF9J', NULL, 'Pembayaran order ORD-20260112-U8WLDO', '2026-01-12 01:30:57', '2026-01-12 01:30:57', '2026-01-12 01:30:57', 0, NULL);
INSERT INTO `customer_wallet_transactions` (`id`, `customer_id`, `type`, `amount`, `balance_before`, `balance_after`, `status`, `payment_method`, `transaction_ref`, `midtrans_transaction_id`, `notes`, `completed_at`, `created_at`, `updated_at`, `is_system`, `midtrans_signature_key`) VALUES
(251, 220, 'withdrawal', 117000.00, 117000.00, -117000.00, 'completed', NULL, 'WD-20260112085729-YJQWZN', NULL, '{\"bank_name\":\"BRI\",\"bank_account\":\"808801006709537\",\"bank_holder\":\"HERLINA SIBARANI\",\"gross_amount\":117000,\"admin_fee\":6500,\"net_amount\":110500,\"payout_reference\":null,\"payout_status\":\"unknown\",\"simulated\":false,\"processed_at\":\"2026-01-12 11:46:28\"}', '2026-01-12 04:46:28', '2026-01-12 01:57:29', '2026-01-12 04:46:28', 0, NULL),
(252, 247, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-UP5IFKTC6B', NULL, 'TRF120126PYDX7 RITA H', '2026-01-12 04:58:36', '2026-01-12 04:58:36', '2026-01-12 04:58:36', 0, NULL),
(253, 247, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-91MNJKQPKQ', NULL, 'Pembayaran order ORD-20260112-PVPXX1', '2026-01-12 05:04:47', '2026-01-12 05:04:47', '2026-01-12 05:04:47', 0, NULL),
(254, 250, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-U6CETMUTIR', NULL, 'TRF120126NH74G ALFI K', '2026-01-12 05:19:12', '2026-01-12 05:19:12', '2026-01-12 05:19:12', 0, NULL),
(255, 251, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-GDI2VEOB1U', NULL, 'TRF120126NH74G ALFI K', '2026-01-12 05:19:29', '2026-01-12 05:19:29', '2026-01-12 05:19:29', 0, NULL),
(256, 251, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-BCOYZ8NNWE', NULL, 'Pembayaran order ORD-20260112-RB4BQJ', '2026-01-12 05:22:31', '2026-01-12 05:22:31', '2026-01-12 05:22:31', 0, NULL),
(257, 250, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-E6GSJ6MILE', NULL, 'Pembayaran order ORD-20260112-NAX76Z', '2026-01-12 05:23:31', '2026-01-12 05:23:31', '2026-01-12 05:23:31', 0, NULL),
(258, 24, 'topup', 100000.00, 0.00, 0.00, 'failed', 'midtrans', 'TOPUP-20260112125654-6964ef9637043-UN3L', 'b3e45d9e-8e78-4288-ada5-c63f6c29866f', NULL, NULL, '2026-01-12 05:56:54', '2026-01-12 06:00:38', 0, NULL),
(259, 24, 'topup', 50000.00, 0.00, 50000.00, 'completed', 'midtrans', 'TOPUP-20260112125849-6964f00911cd5-MOAI', '46252709-5076-4652-928b-3bb29f19a29f', NULL, '2026-01-12 06:23:09', '2026-01-12 05:58:49', '2026-01-12 06:23:09', 0, NULL),
(260, 257, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-IJDBHUL9BG', NULL, 'TRF1012251YK01 DEWI', '2026-01-12 06:27:44', '2026-01-12 06:27:44', '2026-01-12 06:27:44', 0, NULL),
(261, 258, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-1XTKMXPFHZ', NULL, 'TRF1012251YK01 DEWI', '2026-01-12 06:28:08', '2026-01-12 06:28:08', '2026-01-12 06:28:08', 0, NULL),
(262, 256, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-IWQCTLILRK', NULL, 'TRF2112257D46 APRIANTO', '2026-01-12 06:31:28', '2026-01-12 06:31:28', '2026-01-12 06:31:28', 0, NULL),
(263, 160, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-UZAUUL209B', NULL, 'TRF251225RCYS0 APRIANTO', '2026-01-12 06:32:00', '2026-01-12 06:32:00', '2026-01-12 06:32:00', 0, NULL),
(264, 254, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-1GUD6Y7OV4', NULL, 'TRF3112253147Q APRIANTO', '2026-01-12 06:33:31', '2026-01-12 06:33:31', '2026-01-12 06:33:31', 0, NULL),
(265, 255, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-GPSE99ISTV', NULL, 'TRF3112253147Q APRIANTO', '2026-01-12 06:33:42', '2026-01-12 06:33:42', '2026-01-12 06:33:42', 0, NULL),
(266, 257, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-4VPVH4Y2T3', NULL, 'Pembayaran order ORD-20260112-V543FS', '2026-01-12 06:33:56', '2026-01-12 06:33:56', '2026-01-12 06:33:56', 0, NULL),
(267, 258, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WRLKAPSG4N', NULL, 'Pembayaran order ORD-20260112-GKLAES', '2026-01-12 06:38:57', '2026-01-12 06:38:57', '2026-01-12 06:38:57', 0, NULL),
(268, 256, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-ZAXOGFBLLD', NULL, 'Pembayaran order ORD-20260112-KUWYKW', '2026-01-12 07:05:05', '2026-01-12 07:05:05', '2026-01-12 07:05:05', 0, NULL),
(269, 160, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-FSSWBDDJZA', NULL, 'Pembayaran order ORD-20260112-IUCVQH', '2026-01-12 07:07:51', '2026-01-12 07:07:51', '2026-01-12 07:07:51', 0, NULL),
(270, 254, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WGWI1VOL2Z', NULL, 'Pembayaran order ORD-20260112-XQXSUI', '2026-01-12 07:12:21', '2026-01-12 07:12:21', '2026-01-12 07:12:21', 0, NULL),
(271, 255, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-4O0N7UYULJ', NULL, 'Pembayaran order ORD-20260112-9DKUZ5', '2026-01-12 07:14:46', '2026-01-12 07:14:46', '2026-01-12 07:14:46', 0, NULL),
(272, 262, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-FTVEYIQOXN', NULL, 'TRF01012268V2SH APRIANTO', '2026-01-12 20:28:02', '2026-01-12 20:28:02', '2026-01-12 20:28:02', 0, NULL),
(273, 261, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-YTLTGGGTKH', NULL, 'TRF01012268V2SH APRIANTO', '2026-01-12 20:28:17', '2026-01-12 20:28:17', '2026-01-12 20:28:17', 0, NULL),
(274, 259, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-SDIH9VOB6S', NULL, 'TRF06012693HM APRIANTO', '2026-01-12 20:29:56', '2026-01-12 20:29:56', '2026-01-12 20:29:56', 0, NULL),
(275, 262, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-4JRFW9MQQF', NULL, 'Pembayaran order ORD-20260113-ZWCK92', '2026-01-12 20:36:00', '2026-01-12 20:36:00', '2026-01-12 20:36:00', 0, NULL),
(276, 261, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-L2BGPVY1IO', NULL, 'Pembayaran order ORD-20260113-RRRGBC', '2026-01-12 20:37:59', '2026-01-12 20:37:59', '2026-01-12 20:37:59', 0, NULL),
(277, 259, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-1AHWJGSXNP', NULL, 'Pembayaran order ORD-20260113-9ZXNN7', '2026-01-12 20:42:35', '2026-01-12 20:42:35', '2026-01-12 20:42:35', 0, NULL),
(278, 266, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-BNDKXRK22E', NULL, 'TRF090126R4T1N APRIANTO', '2026-01-12 21:56:51', '2026-01-12 21:56:51', '2026-01-12 21:56:51', 0, NULL),
(279, 266, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-XXCJ1VP1DV', NULL, 'Pembayaran order ORD-20260113-IO3HYC', '2026-01-12 22:38:03', '2026-01-12 22:38:03', '2026-01-12 22:38:03', 0, NULL),
(280, 271, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-SMXOHLSJRR', NULL, 'TRF030126JCDYS ZAENAL M', '2026-01-12 23:06:32', '2026-01-12 23:06:32', '2026-01-12 23:06:32', 0, NULL),
(281, 272, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-BRIJJK9IRW', NULL, 'TRF030126JCDYS ZAENAL M', '2026-01-12 23:06:53', '2026-01-12 23:06:53', '2026-01-12 23:06:53', 0, NULL),
(282, 269, 'topup', 350000.00, 0.00, 350000.00, 'completed', 'admin_inject', 'INJECT-V8ETQKJXZ4', NULL, 'TRF141225ZN9X MADE ARMEINI', '2026-01-12 23:09:32', '2026-01-12 23:09:32', '2026-01-12 23:09:32', 0, NULL),
(283, 269, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-YWE3RZGMPV', NULL, 'Pembayaran order ORD-20260113-IG01BY', '2026-01-12 23:13:10', '2026-01-12 23:13:10', '2026-01-12 23:13:10', 0, NULL),
(284, 271, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-IPA2CEG1RJ', NULL, 'Pembayaran order ORD-20260113-XPL9GI', '2026-01-12 23:17:48', '2026-01-12 23:17:48', '2026-01-12 23:17:48', 0, NULL),
(285, 272, 'purchase', 350000.00, 350000.00, 0.00, 'completed', 'ewallet', 'PUR-WUHMCUUHZM', NULL, 'Pembayaran order ORD-20260113-T5WY59', '2026-01-12 23:19:25', '2026-01-12 23:19:25', '2026-01-12 23:19:25', 0, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_all_tables', 1),
(2, '2025_12_18_034225_add_stockist_columns_to_customers_table', 2),
(3, '2025_12_18_040659_add_stockist_province_columns_to_customers_table', 2),
(4, '2025_12_17_033610_create_rewards_table', 3),
(5, '2025_12_17_044526_alter_customer_table', 4),
(6, '2025_12_18_062741_add_type_column_to_orders_table', 5),
(7, '2025_12_22_075705_add_b_retail_to_products_table', 6),
(8, '2025_12_23_022342_add_dashboard_performance_indexes', 7),
(9, '2026_01_06_094255_add_bank_columns_to_customers_table', 8);

-- --------------------------------------------------------

--
-- Struktur dari tabel `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `subscribed_at`, `ip_address`, `created_at`, `updated_at`) VALUES
(1, 'akbr.muhammad07@gmail.com', '2025-12-26 01:14:09', '182.2.5.0', '2025-12-26 01:14:09', '2025-12-26 01:14:09'),
(2, 'alfikhasanah66@gmail.com', '2025-12-26 17:47:11', '103.191.250.226', '2025-12-26 17:47:11', '2025-12-26 17:47:11'),
(3, 'suryapewerindo2@gmail.com', '2026-01-07 05:46:41', '182.2.5.16', '2026-01-07 05:46:41', '2026-01-07 05:46:41'),
(4, 'suryapowerindo1@gmail.com', '2026-01-07 05:47:08', '182.2.5.16', '2026-01-07 05:47:08', '2026-01-07 05:47:08'),
(5, 'juantristansiahaan2016@gmail.com', '2026-01-10 22:28:27', '182.2.7.80', '2026-01-10 22:28:27', '2026-01-10 22:28:27'),
(6, 'ketuazulkarnain@gmail.com', '2026-01-12 00:23:08', '180.252.48.149', '2026-01-12 00:23:08', '2026-01-12 00:23:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_no` varchar(255) NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'IDR',
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `subtotal_amount` decimal(15,2) NOT NULL,
  `discount_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `shipping_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `tax_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `grand_total` decimal(15,2) NOT NULL,
  `shipping_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `billing_address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `applied_promos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`applied_promos`)),
  `notes` text DEFAULT NULL,
  `bv_amount` decimal(15,2) DEFAULT 0.00,
  `sponsor_amount` decimal(15,2) DEFAULT 0.00,
  `match_amount` decimal(15,2) DEFAULT 0.00,
  `pairing_amount` decimal(15,2) DEFAULT 0.00,
  `retail_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `cashback_amount` decimal(15,2) DEFAULT 0.00,
  `type` enum('planA','planB') NOT NULL DEFAULT 'planA',
  `bonus_generated` tinyint(1) NOT NULL DEFAULT 0,
  `processed_at` datetime DEFAULT NULL,
  `placed_at` timestamp NULL DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `order_no`, `customer_id`, `currency`, `status`, `subtotal_amount`, `discount_amount`, `shipping_amount`, `tax_amount`, `grand_total`, `shipping_address_id`, `billing_address_id`, `applied_promos`, `notes`, `bv_amount`, `sponsor_amount`, `match_amount`, `pairing_amount`, `retail_amount`, `cashback_amount`, `type`, `bonus_generated`, `processed_at`, `placed_at`, `paid_at`, `created_at`, `updated_at`) VALUES
(1, 'ORD-20251219-UKT1S', 75, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(2, 'ORD-20251219-UKT2S', 76, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(3, 'ORD-20251219-UKT3S', 78, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(4, 'ORD-20251219-UKT4S', 79, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(5, 'ORD-20251219-UKT5S', 87, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(6, 'ORD-20251230-WUGVA9', 117, 'IDR', 'PAID', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, 19, 19, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T08:22:27+00:00\"}}', NULL, 350000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-30 01:22:27', '2025-12-30 01:22:27'),
(7, 'ORD-20251230-UKT44S', 119, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-30 03:33:59', '2025-12-30 03:33:59'),
(8, 'ORD-20251230-HTSU9D', 120, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 21, 21, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T11:10:03+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 04:10:03', '2025-12-30 04:10:03'),
(9, 'ORD-20251230-MKNXXD', 163, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 22, 22, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T14:37:08+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 07:37:08', '2025-12-30 07:37:08'),
(10, 'ORD-20251230-LFJFQV', 165, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 23, 23, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T15:36:01+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 08:36:01', '2025-12-30 08:36:01'),
(11, 'ORD-20251230-OIER1V', 166, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 24, 24, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T15:57:58+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 08:57:58', '2025-12-30 08:57:58'),
(12, 'ORD-20251230-ZG3ZF9', 167, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 25, 25, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T16:26:44+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 09:26:44', '2025-12-30 09:26:44'),
(13, 'ORD-20251230-WAJRLX', 169, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 26, 26, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T16:45:17+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 09:45:17', '2025-12-30 09:45:17'),
(14, 'ORD-20251230-HMRNFM', 168, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 27, 27, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T16:56:15+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 09:56:15', '2025-12-30 09:56:15'),
(15, 'ORD-20251230-S42WLQ', 170, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 28, 28, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T17:12:02+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 10:12:02', '2025-12-30 10:12:02'),
(16, 'ORD-20251230-GTQGRE', 171, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 29, 29, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T17:26:10+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-30 10:26:10', '2025-12-30 10:26:10'),
(17, 'ORD-20251231-M0FRIP', 173, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 30, 30, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T12:52:00+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 05:52:00', '2025-12-31 05:52:00'),
(18, 'ORD-20251231-OLA8WI', 176, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 31, 31, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T13:44:20+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 06:44:20', '2025-12-31 06:44:20'),
(19, 'ORD-20251231-Z8YQQB', 177, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 32, 32, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T13:55:04+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 06:55:04', '2025-12-31 06:55:04'),
(20, 'ORD-20251231-8UIPJ2', 178, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 33, 33, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T14:21:00+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 07:21:00', '2025-12-31 07:21:00'),
(21, 'ORD-20251231-QM2LHL', 179, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 34, 34, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T14:24:45+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 07:24:45', '2025-12-31 07:24:45'),
(22, 'ORD-20251231-XWP12E', 182, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 35, 35, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T14:32:08+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 07:32:08', '2025-12-31 07:32:08'),
(23, 'ORD-20251231-YOGEZR', 183, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 36, 36, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T14:40:39+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 07:40:39', '2025-12-31 07:40:39'),
(24, 'ORD-20251231-LILLB5', 184, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 37, 37, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-31T14:43:27+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2025-12-31 07:43:27', '2025-12-31 07:43:27'),
(25, 'ORD-20260102-LFC2C6', 121, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 38, 38, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T09:18:53+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 02:18:53', '2026-01-02 02:18:53'),
(26, 'ORD-20260102-IYMYTN', 118, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 39, 39, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T10:59:41+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 03:59:41', '2026-01-02 03:59:41'),
(27, 'ORD-20260102-L7XZBX', 188, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 40, 40, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:05:51+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:05:51', '2026-01-02 04:05:51'),
(28, 'ORD-20260102-LZXTVM', 142, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 41, 41, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:11:53+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:11:53', '2026-01-02 04:11:53'),
(29, 'ORD-20260102-QGROY5', 189, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 42, 42, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:21:32+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:21:32', '2026-01-02 04:21:32'),
(30, 'ORD-20260102-XAEREB', 190, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 43, 43, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:30:20+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:30:20', '2026-01-02 04:30:20'),
(31, 'ORD-20260102-7YOK7B', 192, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 44, 44, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:38:23+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:38:23', '2026-01-02 04:38:23'),
(32, 'ORD-20260102-XN8A4B', 191, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 45, 45, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T11:39:51+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 04:39:51', '2026-01-02 04:39:51'),
(33, 'ORD-20260102-B1BKVC', 123, 'IDR', 'PAID', 1200000.00, 0.00, 0.00, 0.00, 1200000.00, 46, 46, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T12:38:57+00:00\"}}', NULL, 1200000.00, 168000.00, 160000.00, 1200000.00, 0.00, 160000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 05:38:57', '2026-01-02 05:38:57'),
(34, 'ORD-20260102-SCUZ10', 195, 'IDR', 'PAID', 1200000.00, 0.00, 0.00, 0.00, 1200000.00, 47, 47, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T12:45:41+00:00\"}}', NULL, 1200000.00, 168000.00, 160000.00, 1200000.00, 0.00, 160000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 05:45:41', '2026-01-02 05:45:41'),
(35, 'ORD-20260102-QZXXC3', 196, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 48, 48, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T12:56:03+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 05:56:03', '2026-01-02 05:56:03'),
(36, 'ORD-20260102-LSJXMM', 194, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 49, 49, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T13:02:03+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 06:02:02', '2026-01-02 06:02:03'),
(37, 'ORD-20260102-VQKTRZ', 150, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 50, 50, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-02T13:11:30+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-02 06:11:30', '2026-01-02 06:11:30'),
(38, 'ORD-20260103-Q5EVBV', 197, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 51, 51, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T10:15:21+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 03:15:21', '2026-01-03 03:15:21'),
(39, 'ORD-20260103-SRXNZN', 198, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 52, 52, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T10:35:30+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 03:35:30', '2026-01-03 03:35:30'),
(40, 'ORD-20260103-FQ5YIJ', 199, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 53, 53, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T10:41:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 03:41:59', '2026-01-03 03:41:59'),
(41, 'ORD-20260103-TMUGAO', 201, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 54, 54, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T10:49:22+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 03:49:22', '2026-01-03 03:49:22'),
(42, 'ORD-20260103-I8CJWQ', 202, 'IDR', 'PAID', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, 55, 55, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T10:58:58+00:00\"}}', NULL, 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 03:58:58', '2026-01-03 03:58:58'),
(43, 'ORD-20260103-1FPKT0', 204, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 56, 56, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:05:10+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:05:10', '2026-01-03 04:05:10'),
(44, 'ORD-20260103-IY9EJB', 203, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 57, 57, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:06:04+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:06:04', '2026-01-03 04:06:04'),
(45, 'ORD-20260103-VCVNGZ', 205, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 58, 58, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:11:44+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:11:44', '2026-01-03 04:11:44'),
(46, 'ORD-20260103-WCBF40', 206, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 59, 59, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:24:33+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:24:33', '2026-01-03 04:24:33'),
(47, 'ORD-20260103-IR92XZ', 207, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 60, 60, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:35:35+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:35:35', '2026-01-03 04:35:35'),
(48, 'ORD-20260103-Z3KEL3', 210, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 61, 61, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:44:49+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:44:49', '2026-01-03 04:44:49'),
(49, 'ORD-20260103-PQDVWA', 208, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 62, 62, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:45:54+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:45:54', '2026-01-03 04:45:54'),
(50, 'ORD-20260103-FOF699', 211, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 63, 63, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:51:30+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:51:30', '2026-01-03 04:51:30'),
(51, 'ORD-20260103-XVLMVX', 213, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 64, 64, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:55:18+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:55:18', '2026-01-03 04:55:18'),
(52, 'ORD-20260103-RZD410', 212, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 65, 65, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T11:56:25+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 04:56:25', '2026-01-03 04:56:25'),
(53, 'ORD-20260103-LPYQTB', 214, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 66, 66, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T12:00:36+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 05:00:36', '2026-01-03 05:00:36'),
(54, 'ORD-20260103-TRM7WL', 217, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 67, 67, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T12:04:36+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 05:04:36', '2026-01-03 05:04:36'),
(55, 'ORD-20260103-SFI9MT', 216, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 68, 68, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-03T12:05:26+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-03 05:05:26', '2026-01-03 05:05:26'),
(56, 'ORD-20260105-C6NTXH', 146, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 69, 69, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T07:50:45+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 00:50:45', '2026-01-05 00:50:45'),
(57, 'ORD-20260105-AK4V0K', 222, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 70, 70, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T08:28:52+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 01:28:52', '2026-01-05 01:28:52'),
(58, 'ORD-20260105-GGFL54', 220, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 71, 71, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T08:30:03+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 01:30:03', '2026-01-05 01:30:03'),
(59, 'ORD-20260105-2EYCKD', 221, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 72, 72, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T08:31:57+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 01:31:57', '2026-01-05 01:31:57'),
(60, 'ORD-20260105-FVV1EW', 223, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 73, 73, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T08:58:17+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 01:58:17', '2026-01-05 01:58:17'),
(61, 'ORD-20260105-6YGIGW', 224, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 74, 74, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-05T09:15:27+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 02:15:27', '2026-01-05 02:15:27'),
(62, 'ORD-20260105-PB3NGI', 22, 'IDR', 'PENDING', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"6431a393-00a6-45a6-95b8-40fb966d5276\",\"transaction_id\":\"ORD-20260105-PB3NGI-1767616711\",\"created_at\":\"2026-01-05T12:38:32+00:00\"}}', NULL, 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-05 05:38:31', '2026-01-05 05:38:32'),
(63, 'ORD-20260105-WM0A0D', 22, 'IDR', 'PENDING', 100000.00, 0.00, 0.00, 0.00, 100000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"761f9854-aa7e-4ced-abe5-5b2b882e05ea\",\"transaction_id\":\"ORD-20260105-WM0A0D-1767617635\",\"created_at\":\"2026-01-05T12:53:55+00:00\"}}', NULL, 100000.00, 0.00, 0.00, 0.00, 0.00, 14000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-05 05:53:55', '2026-01-05 05:53:55'),
(64, 'ORD-20251219-UKT6S', 88, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(65, 'ORD-20251219-UKT7S', 90, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(66, 'ORD-20251219-UKT8S', 89, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(67, 'ORD-20251219-UKT9S', 92, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(68, 'ORD-20251219-UKT10S', 93, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(69, 'ORD-20251219-UKT11S', 80, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(70, 'ORD-20251219-UKT12S', 81, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 20, 20, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2025-12-30T10:33:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 1, NULL, NULL, NULL, '2025-12-19 02:12:29', '2025-12-19 02:12:29'),
(71, 'ORD-20260107-N5WJ2X', 226, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 77, 77, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-07T11:28:17+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-07 04:28:17', '2026-01-07 04:28:17'),
(72, 'ORD-20260107-L505AN', 227, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 78, 78, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-07T13:30:09+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-07 06:30:09', '2026-01-07 06:30:09'),
(73, 'ORD-20260108-HJLMKJ', 143, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 79, 79, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-08T05:37:56+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-07 22:37:56', '2026-01-07 22:37:56'),
(74, 'ORD-20260108-8NT1NB', 42, 'IDR', 'cancelled', 350000.00, 0.00, 167000.00, 0.00, 517000.00, 80, 80, '{\"shipping\":{\"courier\":\"JNE\",\"service\":\"REG\",\"etd\":\"10 day\",\"cost\":167000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"701cb4f9-d3fa-4df8-920b-f1eb80e1a116\",\"transaction_id\":\"ORD-20260108-8NT1NB-1767861913\",\"created_at\":\"2026-01-08T08:45:14+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-08 01:45:13', '2026-01-10 01:43:16'),
(75, 'ORD-20260108-PTM2PX', 229, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 81, 81, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-08T08:58:47+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-08 01:58:47', '2026-01-08 01:58:47'),
(76, 'ORD-20260108-LMHL4V', 231, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 82, 82, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-08T09:08:12+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-08 02:08:12', '2026-01-08 02:08:12'),
(77, 'ORD-20260108-KJTQFY', 93, 'IDR', 'PAID', 700000.00, 0.00, 0.00, 0.00, 700000.00, 83, 83, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-08T09:21:42+00:00\"}}', NULL, 700000.00, 100000.00, 160000.00, 700000.00, 50000.00, 100000.00, 'planB', 1, '2026-01-08 16:21:42', NULL, NULL, '2026-01-08 02:21:42', '2026-01-08 02:21:42'),
(78, 'ORD-20260108-XLUPBG', 42, 'IDR', 'cancelled', 200000.00, 0.00, 0.00, 0.00, 200000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"transaction_id\":\"ORD-20260108-XLUPBG-1768033133\",\"method\":\"midtrans\"}}', NULL, 200000.00, 0.00, 0.00, 0.00, 0.00, 28000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-08 05:37:38', '2026-01-10 01:43:32'),
(79, 'ORD-20260110-NDRXCP', 29, 'IDR', 'cancelled', 100000.00, 0.00, 0.00, 0.00, 100000.00, 85, 85, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"1148a7d3-b7d9-4c8b-8778-7f8c49c854e3\",\"transaction_id\":\"ORD-20260110-NDRXCP-1768032527\",\"created_at\":\"2026-01-10T08:08:47+00:00\"}}', NULL, 100000.00, 0.00, 0.00, 0.00, 0.00, 14000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-10 01:08:47', '2026-01-10 01:13:22'),
(80, 'ORD-20260110-KLXM33', 233, 'IDR', 'PAID', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, 86, 86, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-10T11:51:20+00:00\"}}', NULL, 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-10 04:51:20', '2026-01-10 04:51:20'),
(81, 'ORD-20260110-24GIEH', 238, 'IDR', 'PAID', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, 87, 87, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-10T12:23:25+00:00\"}}', NULL, 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-10 05:23:25', '2026-01-10 05:23:25'),
(82, 'ORD-20260110-ESDHWG', 236, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 88, 88, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-10T12:25:14+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-10 05:25:14', '2026-01-10 05:25:14'),
(83, 'ORD-20260110-61NZMO', 235, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 89, 89, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-10T12:26:38+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-10 05:26:38', '2026-01-10 05:26:38'),
(84, 'ORD-20260110-CWY3UC', 239, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 90, 90, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-10T12:41:26+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-10 05:41:26', '2026-01-10 05:41:26'),
(85, 'ORD-20260112-QBNLJE', 93, 'IDR', 'PAID', 1050000.00, 0.00, 0.00, 0.00, 1050000.00, 92, 92, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T01:10:16+00:00\"}}', NULL, 1050000.00, 150000.00, 240000.00, 1050000.00, 0.00, 150000.00, 'planB', 1, '2026-01-12 08:10:16', NULL, NULL, '2026-01-11 18:10:16', '2026-01-11 18:10:16'),
(86, 'ORD-20260112-TOE8OM', 157, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 93, 93, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T07:39:47+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 00:39:47', '2026-01-12 00:39:47'),
(87, 'ORD-20260112-VW8O0E', 162, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 94, 94, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T07:42:09+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 00:42:09', '2026-01-12 00:42:09'),
(88, 'ORD-20260112-WFVO4I', 161, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 95, 95, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T08:22:34+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 01:22:34', '2026-01-12 01:22:34'),
(89, 'ORD-20260112-YGK2LG', 244, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 96, 96, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T08:25:13+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 01:25:13', '2026-01-12 01:25:13'),
(90, 'ORD-20260112-U8WLDO', 245, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 97, 97, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T08:30:57+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 01:30:57', '2026-01-12 01:30:57'),
(91, 'ORD-20260112-CAR4VX', 22, 'IDR', 'PENDING', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"8b9fff03-f22b-4ade-b085-a17b11342eee\",\"transaction_id\":\"ORD-20260112-CAR4VX-1768207976\",\"created_at\":\"2026-01-12T08:52:56+00:00\"}}', 'testing', 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 01:52:56', '2026-01-12 01:52:56'),
(92, 'ORD-20260112-88NBJ5', 22, 'IDR', 'PENDING', 1500000.00, 0.00, 0.00, 0.00, 1500000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"e3cdba64-641c-4b14-8890-ba8cddb3e1a3\",\"transaction_id\":\"ORD-20260112-88NBJ5-1768208222\",\"created_at\":\"2026-01-12T08:57:02+00:00\"}}', 'testing', 1500000.00, 210000.00, 200000.00, 1500000.00, 0.00, 200000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-12 01:57:02', '2026-01-12 01:57:02'),
(93, 'ORD-20260112-PVPXX1', 247, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 100, 100, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T12:04:47+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 05:04:47', '2026-01-12 05:04:47'),
(94, 'ORD-20260112-RB4BQJ', 251, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 101, 101, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T12:22:31+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 05:22:31', '2026-01-12 05:22:31'),
(95, 'ORD-20260112-NAX76Z', 250, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 102, 102, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T12:23:31+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 05:23:31', '2026-01-12 05:23:31'),
(96, 'ORD-20260112-GGHDV9', 24, 'IDR', 'PENDING', 350000.00, 0.00, 66000.00, 0.00, 416000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"JNE\",\"service\":\"REG\",\"etd\":\"10 day\",\"cost\":66000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"03f0aa3e-be2e-47c4-a8ae-af41bb234c5f\",\"transaction_id\":\"ORD-20260112-GGHDV9-1768223547\",\"created_at\":\"2026-01-12T13:12:27+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-12 06:12:27', '2026-01-12 06:12:27'),
(97, 'ORD-20260112-U8JNN6', 24, 'IDR', 'PENDING', 1400000.00, 0.00, 66000.00, 0.00, 1466000.00, NULL, NULL, '{\"shipping\":{\"courier\":\"JNE\",\"service\":\"REG\",\"etd\":\"10 day\",\"cost\":66000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"fbe417af-3a34-4b30-bccf-75be6c1b0978\",\"transaction_id\":\"ORD-20260112-U8JNN6-1768223681\",\"created_at\":\"2026-01-12T13:14:41+00:00\"}}', NULL, 1400000.00, 200000.00, 320000.00, 1400000.00, 0.00, 200000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 06:14:41', '2026-01-12 06:14:41'),
(98, 'ORD-20260112-V543FS', 257, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 104, 104, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T13:33:56+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 06:33:56', '2026-01-12 06:33:56'),
(99, 'ORD-20260112-GKLAES', 258, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 105, 105, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T13:38:57+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 06:38:57', '2026-01-12 06:38:57'),
(100, 'ORD-20260112-KUWYKW', 256, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 106, 106, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T14:05:05+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 07:05:05', '2026-01-12 07:05:05'),
(101, 'ORD-20260112-IUCVQH', 160, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 107, 107, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T14:07:51+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 07:07:51', '2026-01-12 07:07:51'),
(102, 'ORD-20260112-XQXSUI', 254, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 108, 108, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T14:12:21+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 07:12:21', '2026-01-12 07:12:21'),
(103, 'ORD-20260112-9DKUZ5', 255, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 109, 109, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-12T14:14:46+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 07:14:46', '2026-01-12 07:14:46'),
(104, 'ORD-20260113-ZWCK92', 262, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 110, 110, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T03:36:00+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 20:36:00', '2026-01-12 20:36:00'),
(105, 'ORD-20260113-RRRGBC', 261, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 111, 111, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T03:37:59+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 20:37:59', '2026-01-12 20:37:59'),
(106, 'ORD-20260113-9ZXNN7', 259, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 112, 112, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T03:42:35+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 20:42:35', '2026-01-12 20:42:35'),
(107, 'ORD-20260113-IO3HYC', 266, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 113, 113, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T05:38:03+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 22:38:03', '2026-01-12 22:38:03'),
(108, 'ORD-20260113-3P1SPU', 24, 'IDR', 'PENDING', 350000.00, 0.00, 57000.00, 0.00, 407000.00, 114, 114, '{\"shipping\":{\"courier\":\"POS\",\"service\":\"Pos Reguler\",\"etd\":\"6 day\",\"cost\":57000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"5b713e45-a48e-487b-aae9-f59ed43d1ae4\",\"transaction_id\":\"ORD-20260113-3P1SPU-1768283841\",\"created_at\":\"2026-01-13T05:57:21+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 22:57:21', '2026-01-12 22:57:21'),
(109, 'ORD-20260113-XAH2QS', 24, 'IDR', 'PENDING', 350000.00, 0.00, 57000.00, 0.00, 407000.00, 114, 114, '{\"shipping\":{\"courier\":\"POS\",\"service\":\"Pos Reguler\",\"etd\":\"6 day\",\"cost\":57000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"24827661-8340-4afa-a8e0-6cac9babaad5\",\"transaction_id\":\"ORD-20260113-XAH2QS-1768283938\",\"created_at\":\"2026-01-13T05:58:58+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 22:58:58', '2026-01-12 22:58:58'),
(110, 'ORD-20260113-IG01BY', 269, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 115, 115, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T06:13:10+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 23:13:10', '2026-01-12 23:13:10'),
(111, 'ORD-20260113-XPL9GI', 271, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 116, 116, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T06:17:48+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 23:17:48', '2026-01-12 23:17:48'),
(112, 'ORD-20260113-T5WY59', 272, 'IDR', 'PAID', 350000.00, 0.00, 0.00, 0.00, 350000.00, 117, 117, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"wallet\",\"paid_at\":\"2026-01-13T06:19:25+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planA', 0, NULL, NULL, NULL, '2026-01-12 23:19:25', '2026-01-12 23:19:25'),
(113, 'ORD-20260113-NRFXQZ', 86, 'IDR', 'PENDING', 350000.00, 0.00, 0.00, 0.00, 350000.00, 118, 118, '{\"shipping\":{\"courier\":\"PICKUP\",\"service\":\"Pick Up\",\"etd\":\"-\",\"cost\":0},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"1dd03a3b-b565-4f4a-9107-7ec87375762e\",\"transaction_id\":\"ORD-20260113-NRFXQZ-1768285872\",\"created_at\":\"2026-01-13T06:31:12+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-12 23:31:12', '2026-01-12 23:31:12'),
(114, 'ORD-20260113-LYVUMN', 24, 'IDR', 'PENDING', 350000.00, 0.00, 57000.00, 0.00, 407000.00, 114, 114, '{\"shipping\":{\"courier\":\"POS\",\"service\":\"Pos Reguler\",\"etd\":\"6 day\",\"cost\":57000},\"payment\":{\"gateway\":\"midtrans\",\"snap_token\":\"bb4ae64f-c7d5-42cb-970f-ec22d19c2136\",\"transaction_id\":\"ORD-20260113-LYVUMN-1768286771\",\"created_at\":\"2026-01-13T06:46:11+00:00\"}}', NULL, 350000.00, 50000.00, 80000.00, 350000.00, 0.00, 50000.00, 'planB', 0, NULL, NULL, NULL, '2026-01-12 23:46:11', '2026-01-12 23:46:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `discount_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `row_total` decimal(15,2) NOT NULL,
  `weight_gram` int(11) DEFAULT NULL,
  `length_mm` int(11) DEFAULT NULL,
  `width_mm` int(11) DEFAULT NULL,
  `height_mm` int(11) DEFAULT NULL,
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `name`, `sku`, `qty`, `unit_price`, `discount_amount`, `row_total`, `weight_gram`, `length_mm`, `width_mm`, `height_mm`, `meta_json`, `created_at`, `updated_at`) VALUES
(6, 6, 7, 'BIOALKALINE BOTTLE', 'SKU-004BIOALKALI', 1, 1500000.00, 0.00, 1500000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/7\\\\\\/original\\\\\\/1765878395_69412a7be4438.webp\\\"}\"', '2025-12-30 01:22:27', '2025-12-30 01:22:27'),
(7, 7, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2025-12-30 03:33:59', '2025-12-30 03:33:59'),
(8, 8, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-30 04:10:03', '2025-12-30 04:10:03'),
(9, 9, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-30 07:37:08', '2025-12-30 07:37:08'),
(10, 10, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2025-12-30 08:36:01', '2025-12-30 08:36:01'),
(11, 11, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-30 08:57:58', '2025-12-30 08:57:58'),
(12, 12, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2025-12-30 09:26:44', '2025-12-30 09:26:44'),
(13, 13, 5, 'BIOZENLITE', 'SKU-003ZENLITE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/5\\\\\\/original\\\\\\/1765878628_69412b6461ba6.webp\\\"}\"', '2025-12-30 09:45:17', '2025-12-30 09:45:17'),
(14, 14, 5, 'BIOZENLITE', 'SKU-003ZENLITE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"https:\\\\\\/\\\\\\/puranusa.id\\\\\\/images\\\\\\/placeholder.jpg\\\"}\"', '2025-12-30 09:56:15', '2025-12-30 09:56:15'),
(15, 15, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-30 10:12:02', '2025-12-30 10:12:02'),
(16, 16, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2025-12-30 10:26:10', '2025-12-30 10:26:10'),
(17, 17, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2025-12-31 05:52:00', '2025-12-31 05:52:00'),
(18, 18, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2025-12-31 06:44:20', '2025-12-31 06:44:20'),
(19, 19, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2025-12-31 06:55:04', '2025-12-31 06:55:04'),
(20, 20, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-31 07:21:00', '2025-12-31 07:21:00'),
(21, 21, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2025-12-31 07:24:45', '2025-12-31 07:24:45'),
(22, 22, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2025-12-31 07:32:08', '2025-12-31 07:32:08'),
(23, 23, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2025-12-31 07:40:39', '2025-12-31 07:40:39'),
(24, 24, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2025-12-31 07:43:27', '2025-12-31 07:43:27'),
(25, 25, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-02 02:18:53', '2026-01-02 02:18:53'),
(26, 26, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 03:59:41', '2026-01-02 03:59:41'),
(27, 27, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:05:51', '2026-01-02 04:05:51'),
(28, 28, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:11:53', '2026-01-02 04:11:53'),
(29, 29, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:21:32', '2026-01-02 04:21:32'),
(30, 30, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:30:20', '2026-01-02 04:30:20'),
(31, 31, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:38:23', '2026-01-02 04:38:23'),
(32, 32, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 04:39:51', '2026-01-02 04:39:51'),
(33, 33, 13, 'BIOZENION PENDANT K-GREEN', 'SKU-009PROMOZENION', 1, 1200000.00, 0.00, 1200000.00, 100, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/13\\\\\\/original\\\\\\/1767357306_6957bb7a07b91.webp\\\"}\"', '2026-01-02 05:38:57', '2026-01-02 05:38:57'),
(34, 34, 13, 'BIOZENION PENDANT K-GREEN', 'SKU-009PROMOZENION', 1, 1200000.00, 0.00, 1200000.00, 100, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/13\\\\\\/original\\\\\\/1767357306_6957bb7a07b91.webp\\\"}\"', '2026-01-02 05:45:41', '2026-01-02 05:45:41'),
(35, 35, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 05:56:03', '2026-01-02 05:56:03'),
(36, 36, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 06:02:03', '2026-01-02 06:02:03'),
(37, 37, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-02 06:11:30', '2026-01-02 06:11:30'),
(38, 38, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 03:15:21', '2026-01-03 03:15:21'),
(39, 39, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 03:35:30', '2026-01-03 03:35:30'),
(40, 40, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 03:41:59', '2026-01-03 03:41:59'),
(41, 41, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 03:49:22', '2026-01-03 03:49:22'),
(42, 42, 7, 'BIOALKALINE BOTTLE', 'SKU-004BIOALKALI', 1, 1500000.00, 0.00, 1500000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/7\\\\\\/original\\\\\\/1765878395_69412a7be4438.webp\\\"}\"', '2026-01-03 03:58:58', '2026-01-03 03:58:58'),
(43, 43, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:05:10', '2026-01-03 04:05:10'),
(44, 44, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:06:04', '2026-01-03 04:06:04'),
(45, 45, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:11:44', '2026-01-03 04:11:44'),
(46, 46, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:24:33', '2026-01-03 04:24:33'),
(47, 47, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:35:35', '2026-01-03 04:35:35'),
(48, 48, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:44:49', '2026-01-03 04:44:49'),
(49, 49, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:45:54', '2026-01-03 04:45:54'),
(50, 50, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:51:30', '2026-01-03 04:51:30'),
(51, 51, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:55:18', '2026-01-03 04:55:18'),
(52, 52, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 04:56:25', '2026-01-03 04:56:25'),
(53, 53, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 05:00:36', '2026-01-03 05:00:36'),
(54, 54, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 05:04:36', '2026-01-03 05:04:36'),
(55, 55, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-03 05:05:26', '2026-01-03 05:05:26'),
(56, 56, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 00:50:45', '2026-01-05 00:50:45'),
(57, 57, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 01:28:52', '2026-01-05 01:28:52'),
(58, 58, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 01:30:03', '2026-01-05 01:30:03'),
(59, 59, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 01:31:57', '2026-01-05 01:31:57'),
(60, 60, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 01:58:17', '2026-01-05 01:58:17'),
(61, 61, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-05 02:15:27', '2026-01-05 02:15:27'),
(62, 62, 8, 'BIOZENION PENDANT Green', 'SKU-005ZENIONGREEN', 1, 1500000.00, 0.00, 1500000.00, 500, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/8\\\\\\/original\\\\\\/1765873817_69411899cc252.webp\\\"}\"', '2026-01-05 05:38:31', '2026-01-05 05:38:31'),
(63, 63, 10, 'PURANUSA INTIMATE WASH ( 1 Btl 60ml)', 'SKU-006INTWASH', 1, 100000.00, 0.00, 100000.00, 60, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/10\\\\\\/original\\\\\\/1767110611_6953f7d369bd5.webp\\\"}\"', '2026-01-05 05:53:55', '2026-01-05 05:53:55'),
(64, 71, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-07 04:28:17', '2026-01-07 04:28:17'),
(65, 72, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-07 06:30:09', '2026-01-07 06:30:09'),
(66, 73, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-07 22:37:56', '2026-01-07 22:37:56'),
(67, 74, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-08 01:45:14', '2026-01-08 01:45:14'),
(68, 75, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-08 01:58:47', '2026-01-08 01:58:47'),
(69, 76, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-08 02:08:12', '2026-01-08 02:08:12'),
(70, 77, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 2, 350000.00, 0.00, 700000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-08 02:21:42', '2026-01-08 02:21:42'),
(71, 78, 12, 'Secrets Feminine Spray Vanilla & Buble Gum (4 Btl @10 ml)', 'SKU-008INTSPRAY', 1, 200000.00, 0.00, 200000.00, 40, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/12\\\\\\/original\\\\\\/1767259209_69563c4967cfc.webp\\\"}\"', '2026-01-08 05:37:38', '2026-01-08 05:37:38'),
(72, 79, 10, 'PURANUSA INTIMATE WASH ( 1 Btl 60ml)', 'SKU-006INTWASH', 1, 100000.00, 0.00, 100000.00, 60, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/10\\\\\\/original\\\\\\/1767110611_6953f7d369bd5.webp\\\"}\"', '2026-01-10 01:08:47', '2026-01-10 01:08:47'),
(73, 80, 8, 'BIOZENION PENDANT Green', 'SKU-005ZENIONGREEN', 1, 1500000.00, 0.00, 1500000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/8\\\\\\/original\\\\\\/1765873817_69411899cc252.webp\\\"}\"', '2026-01-10 04:51:20', '2026-01-10 04:51:20'),
(74, 81, 7, 'BIOALKALINE BOTTLE', 'SKU-004BIOALKALI', 1, 1500000.00, 0.00, 1500000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/7\\\\\\/original\\\\\\/1765878395_69412a7be4438.webp\\\"}\"', '2026-01-10 05:23:25', '2026-01-10 05:23:25'),
(75, 82, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-10 05:25:14', '2026-01-10 05:25:14'),
(76, 83, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-10 05:26:38', '2026-01-10 05:26:38'),
(77, 84, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-10 05:41:26', '2026-01-10 05:41:26'),
(78, 85, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 3, 350000.00, 0.00, 1050000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-11 18:10:16', '2026-01-11 18:10:16'),
(79, 86, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 00:39:47', '2026-01-12 00:39:47'),
(80, 87, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 00:42:09', '2026-01-12 00:42:09'),
(81, 88, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 01:22:34', '2026-01-12 01:22:34'),
(82, 89, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 01:25:13', '2026-01-12 01:25:13'),
(83, 90, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-12 01:30:57', '2026-01-12 01:30:57'),
(84, 91, 8, 'BIOZENION PENDANT Green', 'SKU-005ZENIONGREEN', 1, 1500000.00, 0.00, 1500000.00, 500, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/8\\\\\\/original\\\\\\/1765873817_69411899cc252.webp\\\"}\"', '2026-01-12 01:52:56', '2026-01-12 01:52:56'),
(85, 92, 8, 'BIOZENION PENDANT Green', 'SKU-005ZENIONGREEN', 1, 1500000.00, 0.00, 1500000.00, 500, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/8\\\\\\/original\\\\\\/1765873817_69411899cc252.webp\\\"}\"', '2026-01-12 01:57:02', '2026-01-12 01:57:02'),
(86, 93, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 05:04:47', '2026-01-12 05:04:47'),
(87, 94, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-12 05:22:31', '2026-01-12 05:22:31'),
(88, 95, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-12 05:23:31', '2026-01-12 05:23:31'),
(89, 96, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 06:12:27', '2026-01-12 06:12:27'),
(90, 97, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 4, 350000.00, 0.00, 1400000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 06:14:41', '2026-01-12 06:14:41'),
(91, 98, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 06:33:56', '2026-01-12 06:33:56'),
(92, 99, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 06:38:57', '2026-01-12 06:38:57'),
(93, 100, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 07:05:05', '2026-01-12 07:05:05'),
(94, 101, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 07:07:51', '2026-01-12 07:07:51'),
(95, 102, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 07:12:21', '2026-01-12 07:12:21'),
(96, 103, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 07:14:46', '2026-01-12 07:14:46'),
(97, 104, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-12 20:36:00', '2026-01-12 20:36:00'),
(98, 105, 5, 'BIOZENLITE', 'SKU-003ZENLITE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/5\\\\\\/original\\\\\\/1767113719_695403f7411be.webp\\\"}\"', '2026-01-12 20:37:59', '2026-01-12 20:37:59'),
(99, 106, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 20:42:35', '2026-01-12 20:42:35'),
(100, 107, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 22:38:03', '2026-01-12 22:38:03'),
(101, 108, 3, 'BIOLOVE', 'SKU-001BIOLOVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/3\\\\\\/original\\\\\\/1765878704_69412bb00f557.webp\\\"}\"', '2026-01-12 22:57:21', '2026-01-12 22:57:21'),
(102, 109, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 22:58:58', '2026-01-12 22:58:58'),
(103, 110, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 23:13:10', '2026-01-12 23:13:10'),
(104, 111, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 23:17:48', '2026-01-12 23:17:48'),
(105, 112, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 23:19:25', '2026-01-12 23:19:25'),
(106, 113, 4, 'INTIMATE & GLOW SECRETS PACKAGE', 'SKU-002SECRETGLOW', 1, 350000.00, 0.00, 350000.00, 300, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/4\\\\\\/original\\\\\\/1765988153_6942d739b9521.webp\\\"}\"', '2026-01-12 23:31:12', '2026-01-12 23:31:12'),
(107, 114, 6, 'BIOZENERVE', 'SKU-003BIOZENERVE', 1, 350000.00, 0.00, 350000.00, 200, NULL, NULL, NULL, '\"{\\\"image\\\":\\\"\\\\\\/storage\\\\\\/products\\\\\\/6\\\\\\/original\\\\\\/1765878581_69412b35711ca.webp\\\"}\"', '2026-01-12 23:46:11', '2026-01-12 23:46:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `blocks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`blocks`)),
  `seo_title` text DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `template` varchar(255) NOT NULL DEFAULT 'default',
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `method_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `amount` decimal(15,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'IDR',
  `provider_txn_id` varchar(255) DEFAULT NULL,
  `metadata_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `signature_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_transactions`
--

CREATE TABLE `payment_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `raw_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`raw_json`)),
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_desc` text DEFAULT NULL,
  `long_desc` longtext DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `warranty_months` int(11) DEFAULT NULL,
  `base_price` decimal(15,2) NOT NULL,
  `currency` varchar(3) NOT NULL DEFAULT 'IDR',
  `stock` int(11) NOT NULL DEFAULT 0,
  `weight_gram` int(11) DEFAULT NULL,
  `length_mm` int(11) DEFAULT NULL,
  `width_mm` int(11) DEFAULT NULL,
  `height_mm` int(11) DEFAULT NULL,
  `bv` decimal(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Bonus value',
  `b_sponsor` decimal(15,2) NOT NULL DEFAULT 0.00,
  `b_matching` decimal(15,2) NOT NULL DEFAULT 0.00,
  `b_pairing` decimal(15,2) NOT NULL DEFAULT 0.00,
  `b_cashback` decimal(15,2) NOT NULL DEFAULT 0.00,
  `b_retail` decimal(15,2) NOT NULL DEFAULT 0.00,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `sku`, `slug`, `name`, `short_desc`, `long_desc`, `brand`, `warranty_months`, `base_price`, `currency`, `stock`, `weight_gram`, `length_mm`, `width_mm`, `height_mm`, `bv`, `b_sponsor`, `b_matching`, `b_pairing`, `b_cashback`, `b_retail`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'SKU-001BIOLOVE', 'biolove', 'BIOLOVE', 'Resep Harmoni Rumah Tangga\r\nSejak zaman dahulu, leluhur kita mencari kekuatan di alam. Purwaceng (akar legendaris dari Dieng) dan Tongkat Ali telah menjadi rahasia para raja dan ksatria. Kami melanjutkan tradisi ini dengan memadukan herbal tersebut dengan energi modern.', 'Komposisi Unggulan\r\nPurwaceng, Tongkat Ali, & Cordyceps\r\nMeningkatkan stamina, gairah, dan daya tahan tubuh secara alami.\r\nL-Arginine & Guarana\r\nMemberikan dorongan energi maskulin dan menjaga vitalitas yang seimbang dan tahan lama.\r\nGinseng & Kopi Arabika\r\nMembantu meningkatkan fokus dan mood positif.\r\n\r\nLarutkan 1 Sct kedalam secangkir air panas (100ml)\r\nMinum di pagi atau sore hari setelah makan\r\n\r\n1 Kotak @8 Sachet @20gr', 'PURANUSA', 0, 350000.00, 'IDR', 6, 200, 60, 40, 150, 350000.00, 50000.00, 80000.00, 350000.00, 50000.00, 50000.00, 1, '2025-12-16 07:20:49', '2026-01-12 22:57:21'),
(4, 'SKU-002SECRETGLOW', 'intimate-glow-screts-package', 'INTIMATE & GLOW SECRETS PACKAGE', 'PURANUSA Brightening Soap (3) /  NA18251209701\r\nPURANUSA Feminim Spray (4) /NA18251600421 &  NA18251600422\r\nPURANUSA Feminim Wash (1) /NA18251600420', 'Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni\r\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.\r\n&\r\nSentuhan Salmon dan Retinol: Rahasia Kulit Cerah Alami Nusantara\r\nKami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'PURANUSA', 0, 350000.00, 'IDR', 59, 300, 80, 40, 200, 350000.00, 50000.00, 80000.00, 350000.00, 50000.00, 50000.00, 1, '2025-12-16 07:36:26', '2026-01-12 23:31:12'),
(5, 'SKU-003ZENLITE', 'biozenlite', 'BIOZENLITE', 'Mengatur Metabolisme dan Energi Tubuh\r\nPencernaan yang sehat adalah fondasi kebugaran dan glowing skin modern. BIOZENLITE adalah revolusi serat yang ringan, lezat, dan esensial.', 'Komposisi Unggulan\r\n\r\nPsyllium Husk, Inulin, & Fibersol\r\nBertindak sebagai \'pembersih\' alami usus, membantu mengeluarkan racun (detoks), dan mendukung keteraturan metabolisme.\r\n\r\nAloevera & Stevia\r\nMembantu menjaga kelembaban usus, memberikan nutrisi serat tanpa tambahan gula berlebih.\r\n\r\nPremix Vitamin & Mineral\r\nMencukupi kebutuhan nutrisi harian untuk tubuh yang lebih bertenaga dan ringan.\r\n\r\nLarutkan 1 Sct kedalam 1 gelas air 100ml\r\nMinum Pagi atau Malam sebelum makan\r\n1 Kotak @8 Sct @15gr', 'PURANUSA', 0, 350000.00, 'IDR', 0, 200, 60, 40, 200, 350000.00, 50000.00, 80000.00, 350000.00, 50000.00, 50000.00, 1, '2025-12-16 07:42:56', '2026-01-12 20:37:59'),
(6, 'SKU-003BIOZENERVE', 'biozenerve', 'BIOZENERVE', 'Solusi Nyeri dan Peradangan Holistik\r\nPeradangan adalah akar dari ketidaknyamanan kronis. BIOZENERVE kembali ke kearifan alam untuk memulihkan tubuh dari akarnya.', 'Komposisi Unggulan\r\n\r\nCurcumin (Kunyit)\r\nAnti-inflamasi alami terkuat. Membantu meredakan nyeri akibat peradangan pada sendi dan saraf.\r\n\r\nAndrographis Paniculata (Sambiloto)\r\nDikenal luas dalam Jamu untuk meningkatkan daya tahan tubuh dan membantu proses detoksifikasi alami.\r\n\r\nNigella Sativa (Habbatussauda) & Propolis\r\nMemperkuat sistem imun dan memberikan perlindungan seluler, menciptakan ketenangan alami dari dalam.\r\n\r\nMinum 2 sd 4 Kapsul / hari setelah makan\r\n\r\n1 Kotak @1Botol @30 Kapsul', 'PURANUSA', 0, 350000.00, 'IDR', 7, 200, 50, 50, 100, 350000.00, 50000.00, 80000.00, 350000.00, 50000.00, 50000.00, 1, '2025-12-16 07:47:22', '2026-01-12 23:46:11'),
(7, 'SKU-004BIOALKALI', 'bioalkaline-bottle', 'BIOALKALINE BOTTLE', 'BIOALKALINE BOTTLE\r\nDengan mengonsumsi air alkali terionisasi ini, dapat terjadi perubahan pada tubuh:\r\n•Sebelum (Before): Tubuh cenderung memiliki masalah Acidity (Keasaman).\r\n•Setelah (After): Air ini membantu mencapai PH Balance (Keseimbangan pH) dalam tubuh.', 'Manfaat dan Hasil Air yang Dihasilkan\r\nSetelah melalui proses filtrasi, air yang dihasilkan disebut Alkaline Ionized Water dan memiliki manfaat sebagai berikut:\r\n•Alkaline Balance (Keseimbangan Alkali): Meningkatkan pH air.\r\n•Negative Ions (Ion Negatif): Menambahkan ion negatif ke dalam air.\r\n•Small Molecules (Molekul Kecil): Membuat molekul air menjadi lebih kecil, yang dipercaya dapat meningkatkan penyerapan.\r\n•Low ORP (Potensi Reduksi Oksidasi Rendah): Memberikan sifat anti-oksidan pada air.\r\n•Far Infrared Ray (Sinar Inframerah Jauh): Menghasilkan sinar inframerah jauh.\r\n•Active Hydrogen (Hidrogen Aktif): Mengandung hidrogen aktif.', 'PURANUSA', 0, 1500000.00, 'IDR', 10, 300, 60, 60, 300, 1500000.00, 210000.00, 200000.00, 1500000.00, 200000.00, 210000.00, 1, '2025-12-16 07:55:45', '2026-01-11 21:37:42'),
(8, 'SKU-005ZENIONGREEN', 'biozenion-pendant-green', 'BIOZENION PENDANT Green', 'Menjaga Harmoni Tubuh dengan Manfaat Ion Negatif\r\nKebugaran bukan hanya nutrisi, tetapi juga energi. Kalung ini adalah produk wellness modern yang membawa manfaat Ion Negatif ke mana pun Anda pergi.', 'Manfaat Utama\r\nKandungan >6.000 Ion Negatif\r\nMembantu menetralkan efek radiasi elektromagnetik yang kita hadapi sehari-hari.\r\nDesain Universal & Modern\r\nDapat dipakai oleh semua kalangan usia (anak-anak hingga dewasa).\r\nFungsi Wellness\r\nMembantu melancarkan sirkulasi darah, meningkatkan fokus, dan menciptakan keseimbangan energi tubuh alami.', 'PURANUSA', 0, 1500000.00, 'IDR', 3, 300, 60, 50, 30, 1500000.00, 210000.00, 200000.00, 1500000.00, 200000.00, 210000.00, 1, '2025-12-16 01:27:43', '2026-01-12 01:57:02'),
(9, 'SKU-006ZENIONBLUE', 'biozenion-pendant-blue', 'BIOZENION PENDANT Blue', 'Menjaga Harmoni Tubuh dengan Manfaat Ion Negatif\r\nKebugaran bukan hanya nutrisi, tetapi juga energi. Kalung ini adalah produk wellness modern yang membawa manfaat Ion Negatif ke mana pun Anda pergi.', 'Manfaat Utama\r\nKandungan >6.000 Ion Negatif\r\nMembantu menetralkan efek radiasi elektromagnetik yang kita hadapi sehari-hari.\r\nDesain Universal & Modern\r\nDapat dipakai oleh semua kalangan usia (anak-anak hingga dewasa).\r\nFungsi Wellness\r\nMembantu melancarkan sirkulasi darah, meningkatkan fokus, dan menciptakan keseimbangan energi tubuh alami.', 'PURANUSA', 0, 1500000.00, 'IDR', 1, 300, 60, 50, 30, 1500000.00, 210000.00, 200000.00, 1500000.00, 200000.00, 210000.00, 1, '2025-12-16 01:32:45', '2026-01-09 06:49:01'),
(10, 'SKU-006INTWASH', 'puranusa-intimate-wash', 'PURANUSA INTIMATE WASH ( 1 Btl 60ml)', 'PURANUSA Secrets Feminine Wash 60ml\r\n(NA18251600420)', 'PURANUSA Secrets Feminine Wash 60ml\r\n(NA18251600420)\r\nProduk Feminine Wash diformulasikan secara khusus dengan perpaduan bahan alami\r\ndan aktif yang unggul untuk menjaga kebersihan, kesehatan, dan kenyamanan area kewanitaan', 'PURANUSA', 0, 100000.00, 'IDR', 0, 60, 80, 80, 100, 100000.00, 0.00, 0.00, 0.00, 14000.00, 14000.00, 1, '2025-12-30 09:03:31', '2026-01-10 01:08:47'),
(11, 'SKU-007SOAPBEAUTY', 'puranusa-beauty-soap', 'PURANUSA BEAUTY SOAP (3 pcs)', '3 Pcs Puranusa Brightening Soap', '3 Pcs @20gr Puranusa Brightening Soap\r\n(NA18251209701 )', 'PURANUSA', 0, 100000.00, 'IDR', 0, 60, 80, 80, 100, 100000.00, 0.00, 0.00, 0.00, 14000.00, 14000.00, 1, '2025-12-30 09:47:30', '2026-01-11 21:38:41'),
(12, 'SKU-008INTSPRAY', 'secrets-feminine-spray-vanilla-buble-gum', 'Secrets Feminine Spray Vanilla & Buble Gum (4 Btl @10 ml)', 'Secrets Feminine Spray Vanilla (2)  & Buble Gum (2)  @10ml (NA18251600422 & NA18251600421)', '<p>Secrets Feminine Spray Vanilla &amp; Buble Gum @10ml (NA18251600422 &amp; NA18251600421)</p><p>Produk Feminine Spray diformulasikan secara khusus dengan perpaduan bahan alami</p><p>dan aktif yang unggul untuk menjaga kebersihan, kesehatan, dan kenyamanan area kewanitaan</p>', 'PURANUSA', 0, 200000.00, 'IDR', 0, 40, 80, 50, 100, 200000.00, 0.00, 0.00, 0.00, 28000.00, 28000.00, 1, '2026-01-01 02:20:09', '2026-01-11 21:38:58'),
(13, 'SKU-009PROMOZENION', 'biozenion-pendant-k-green', 'BIOZENION PENDANT K-GREEN', 'PROMO SPESIAL BIOZENION PENDANT K-GREEN', '<p>PROMO SPESIAL BIOZENION PENDANT K-GREEN</p>', 'PURANUSA', 0, 1200000.00, 'IDR', 0, 100, 50, 50, 10, 1200000.00, 168000.00, 160000.00, 1200000.00, 160000.00, 168000.00, 1, '2026-01-02 05:32:10', '2026-01-05 23:36:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product_categories`
--

INSERT INTO `product_categories` (`id`, `product_id`, `category_id`) VALUES
(2, 3, 2),
(1, 3, 3),
(3, 4, 4),
(5, 5, 2),
(4, 5, 3),
(7, 6, 2),
(6, 6, 3),
(8, 7, 2),
(10, 8, 2),
(9, 8, 5),
(11, 9, 2),
(12, 9, 5),
(13, 10, 4),
(14, 12, 4),
(15, 13, 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_media`
--

CREATE TABLE `product_media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'image',
  `alt_text` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product_media`
--

INSERT INTO `product_media` (`id`, `product_id`, `url`, `type`, `alt_text`, `sort_order`, `is_primary`, `created_at`, `updated_at`) VALUES
(13, 8, 'products/8/original/1765873817_69411899cc252.webp', 'image', 'Gemini_Generated_Image_9dybp49dybp49dyb.png', 1, 1, '2025-12-16 01:30:18', '2025-12-16 01:30:18'),
(14, 8, 'products/8/original/1765873818_6941189aaf54b.webp', 'image', 'Gemini_Generated_Image_yyulxtyyulxtyyul.png', 3, 0, '2025-12-16 01:30:20', '2025-12-16 01:30:20'),
(15, 8, 'products/8/original/1765873820_6941189cd03bd.webp', 'image', 'BIOZENION.png', 6, 0, '2025-12-16 01:30:21', '2025-12-16 01:30:21'),
(16, 9, 'products/9/original/1765873965_6941192de9fdd.webp', 'image', 'Gemini_Generated_Image_chihs3chihs3chih.png', 1, 1, '2025-12-16 01:32:46', '2025-12-16 01:32:46'),
(17, 9, 'products/9/original/1765873966_6941192ebbba2.webp', 'image', 'BIOZENION BLUE.png', 3, 0, '2025-12-16 01:32:47', '2025-12-16 01:32:47'),
(19, 7, 'products/7/original/1765878395_69412a7be4438.webp', 'image', 'Botol Alkali11.png', 1, 1, '2025-12-16 02:46:36', '2025-12-16 02:46:36'),
(20, 7, 'products/7/original/1765878396_69412a7cd4975.webp', 'image', 'Botol Alkali12.png', 3, 0, '2025-12-16 02:46:37', '2025-12-16 02:46:37'),
(21, 6, 'products/6/original/1765878581_69412b35711ca.webp', 'image', 'BIOZENERVE11.png', 1, 1, '2025-12-16 02:49:42', '2025-12-16 02:49:42'),
(22, 6, 'products/6/original/1765878582_69412b362cc9e.webp', 'image', 'BIOZENERVE13.png', 3, 0, '2025-12-16 02:49:42', '2025-12-16 02:49:42'),
(23, 6, 'products/6/original/1765878582_69412b36f0974.webp', 'image', 'BIOZENERVE12.png', 6, 0, '2025-12-16 02:49:44', '2025-12-16 02:49:44'),
(26, 3, 'products/3/original/1765878704_69412bb00f557.webp', 'image', 'Biolove11.png', 1, 1, '2025-12-16 02:51:44', '2025-12-16 02:51:44'),
(27, 3, 'products/3/original/1765878704_69412bb0da3a8.webp', 'image', 'Biolove12.png', 3, 0, '2025-12-16 02:51:45', '2025-12-16 02:51:45'),
(28, 3, 'products/3/original/1765878705_69412bb1ca4d5.webp', 'image', 'Biolove13.jpeg', 6, 0, '2025-12-16 02:51:46', '2025-12-16 02:51:46'),
(29, 4, 'products/4/original/1765988153_6942d739b9521.webp', 'image', 'pic package1.jpeg', 1, 1, '2025-12-17 09:15:55', '2025-12-17 09:15:55'),
(30, 4, 'products/4/original/1765988155_6942d73b07382.webp', 'image', 'Botol Wash dan spray.jpeg', 3, 0, '2025-12-17 09:15:56', '2025-12-17 09:15:56'),
(31, 4, 'products/4/original/1765988156_6942d73cabe49.webp', 'image', 'Sabun1.jpeg', 6, 0, '2025-12-17 09:15:58', '2025-12-17 09:15:58'),
(32, 10, 'products/10/original/1767110611_6953f7d369bd5.webp', 'image', 'Intimate wash1.jpg', 1, 1, '2025-12-30 09:03:33', '2025-12-30 09:03:33'),
(33, 11, 'products/11/original/1767113250_69540222daa14.webp', 'image', 'Sabun1.jpeg', 1, 1, '2025-12-30 09:47:32', '2025-12-30 09:47:32'),
(34, 5, 'products/5/original/1767113719_695403f7411be.webp', 'image', 'BIOZENLITE1.jpg', 1, 1, '2025-12-30 09:55:20', '2025-12-30 09:55:20'),
(35, 12, 'products/12/original/1767259209_69563c4967cfc.webp', 'image', 'Feminine Spray1.jpeg', 1, 1, '2026-01-01 02:20:10', '2026-01-01 02:20:10'),
(37, 4, 'products/4/original/1767260612_695641c431927.webp', 'image', 'PACKAGE.jpeg', 7, 0, '2026-01-01 02:43:32', '2026-01-01 02:43:32'),
(39, 13, 'products/13/original/1767357306_6957bb7a07b91.webp', 'image', 'PROMO1.jpg', 1, 1, '2026-01-02 05:35:06', '2026-01-02 05:35:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED DEFAULT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `is_verified_purchase` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `landing_slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `start_at` timestamp NOT NULL,
  `end_at` timestamp NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `priority` int(11) NOT NULL DEFAULT 0,
  `max_redemption` int(11) DEFAULT NULL,
  `per_user_limit` int(11) DEFAULT NULL,
  `conditions_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions_json`)),
  `show_on` varchar(255) DEFAULT NULL,
  `custom_html` text DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `promotions`
--

INSERT INTO `promotions` (`id`, `code`, `name`, `type`, `landing_slug`, `description`, `image`, `start_at`, `end_at`, `is_active`, `priority`, `max_redemption`, `per_user_limit`, `conditions_json`, `show_on`, `custom_html`, `page`, `created_at`, `updated_at`) VALUES
(8, 'ZENNER2025', 'ZENNER Aplikasi', 'bundle', NULL, 'Aplikasi Mobile Revolusioner\r\nyang menjadi Kantor dalam genggaman', 'promotions/hVLQgeNn1b72BMZMwBQmbWsb978F8ewDDQHwkh82.jpg', '2025-12-19 03:10:00', '2026-01-18 03:10:00', 0, 3, NULL, NULL, NULL, 'homepage', NULL, 'home', '2025-12-19 12:31:45', '2025-12-30 08:30:05'),
(9, 'PURANUSA2025', 'PURANUSA', 'bundle', NULL, 'Mesin Pertumbuhan &\r\nEkosistem Afiliasi Digital', 'promotions/XT0qk2MDy1y973vhKQUMno8OCDJlqblJL29jPbX1.png', '2025-12-19 03:10:00', '2026-01-18 03:10:00', 1, 2, NULL, NULL, NULL, 'homepage', NULL, 'category', '2025-12-19 12:33:50', '2025-12-30 08:30:42'),
(11, 'INTIMATEPROMO', 'THE SECRET', 'bundle', NULL, 'Intimate & Glow Secret Package', 'promotions/QhZvfogggqtDcNQE4wTHNnaqNRw59KDgp0v4EpjO.png', '2025-12-17 03:10:00', '2026-01-19 03:10:00', 1, 1, NULL, NULL, NULL, 'homepage', NULL, 'home', '2025-12-19 13:00:58', '2025-12-19 13:00:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promotion_products`
--

CREATE TABLE `promotion_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `promotion_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `min_qty` int(11) NOT NULL DEFAULT 1,
  `discount_value` decimal(15,2) DEFAULT NULL,
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `bundle_price` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `refunds`
--

CREATE TABLE `refunds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `amount` decimal(15,2) NOT NULL,
  `reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `returns`
--

CREATE TABLE `returns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `reason` text DEFAULT NULL,
  `requested_at` timestamp NULL DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `return_items`
--

CREATE TABLE `return_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `return_id` bigint(20) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL,
  `condition_note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `rewards`
--

CREATE TABLE `rewards` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(225) NOT NULL,
  `reward` varchar(225) DEFAULT NULL,
  `value` decimal(15,2) NOT NULL DEFAULT 0.00,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `bv` decimal(15,2) NOT NULL DEFAULT 0.00,
  `type` tinyint(1) NOT NULL COMMENT '0: periode, 1: permanen',
  `status` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data untuk tabel `rewards`
--

INSERT INTO `rewards` (`id`, `code`, `name`, `reward`, `value`, `start`, `end`, `bv`, `type`, `status`, `created_at`) VALUES
(1, 'SR2025', 'STAR RACER', 'TIKET CRUISE Singapore', 84000000.00, '2025-12-01', '2026-06-30', 84000000.00, 0, 1, '2025-12-23 10:26:47'),
(3, 'ELITE2025', 'ELITE RACER', 'MOTOR / CASH Rp. 15 Juta', 315000000.00, '2025-12-01', '2026-06-30', 315000000.00, 0, 1, '2025-12-24 22:57:32'),
(4, 'MASTRE2025', 'MASTER RACER', 'UMRAH / CASH Rp. 25 JUTA', 420000000.00, '2026-01-02', '2026-01-31', 420000000.00, 0, 1, '2025-12-24 22:59:09'),
(5, 'Rookie', 'Zenner Rookie', 'Cash Reward Rp. 500.000', 17500000.00, NULL, NULL, 17500000.00, 1, 1, '2025-12-24 23:07:07'),
(6, 'Builder', 'Zenner Builder', 'Cash Reward Rp. 1.000.000', 52500000.00, NULL, NULL, 52500000.00, 1, 1, '2025-12-24 23:08:21'),
(7, 'Warrior', 'Zenner Warrior', 'Cash Reward Rp. 5.000.000', 350000000.00, NULL, NULL, 350000000.00, 1, 1, '2025-12-24 23:09:09'),
(8, 'Elite', 'Zenner Elite', 'Cash Reward Rp. 15.000.000', 1050000000.00, NULL, NULL, 1050000000.00, 1, 1, '2025-12-24 23:10:30'),
(9, 'Master', 'Zenner Master', 'Cash Reward Rp. 100.000.000', 3500000000.00, NULL, NULL, 3500000000.00, 1, 1, '2025-12-24 23:11:50'),
(10, 'Legend', 'Zenner Legend', 'Cash Reward Rp. 500.000.000', 17500000000.00, NULL, NULL, 17500000000.00, 1, 1, '2025-12-24 23:12:54'),
(11, 'Icon', 'Zenner Icon', 'Cash Reward Rp. 1.000.000.000', 52500000000.00, NULL, NULL, 52500000000.00, 1, 1, '2025-12-24 23:13:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5eSVenrQA5LvAWkfuWtbZebNaZn7wwPTTew1u8O2', NULL, '140.213.127.185', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUjdwWFRBTVdnd0hGRmRVelNNVlFvT041b0RlS0RTaEVFb1E3dnlDYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyNjM7fQ==', 1768285127),
('8asBuObQmn5kl0lYpdM1TjRRrMg9xV8lgOhDkLvi', NULL, '182.2.4.60', 'WhatsApp/2.23.20.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidnFmMDNadDRlSFVQRFpqS2c5MHo2c293Y1pGeU16Z2xZSlFVaGljUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTI6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L3JlZ2lzdGVyP3JlZj1SRUYtVklHN1BUMzQiO3M6NToicm91dGUiO3M6MTU6ImNsaWVudC5yZWdpc3RlciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1768284180),
('9LBg6qPYtE031mTq4ZWH9KOjUfPqAa7OOIIZS8RI', 1, '114.79.5.199', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:146.0) Gecko/20100101 Firefox/146.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTE5kRjVaVjhoQWZhTVQ0eTRkeFBPWHl0SERSbUFSQ1kxbml4ZkxqRiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L3Byb2ZpbGUiO3M6NToicm91dGUiO3M6MTQ6ImNsaWVudC5wcm9maWxlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1768289210),
('AKORrlrj6b5KrCtSZggZROk9E5niXCKK9tCxs6XC', NULL, '161.248.117.18', 'WhatsApp/2.23.20.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzZFNHB1VVloNU1jVHA0R3NQRFNoMUpjSkRRa2RMU0lBWnVDVnFPZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTI6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L3JlZ2lzdGVyP3JlZj1SRUYtVFRFSkFQSksiO3M6NToicm91dGUiO3M6MTU6ImNsaWVudC5yZWdpc3RlciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1768282431),
('aQ4gzCqZrWWDjpp7zmSPJZ5wCo6nqy0z9pWmM8hF', NULL, '182.2.6.27', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaE9wQUR5UzU5QmNSV29wYTF0eWhreUpHRDRLZnVlZ25hTEhyeVNwTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxNzA7fQ==', 1768287361),
('b87qCn7hUldPgFljIvTJRK2aQu9iC6XOMfMoRMhK', NULL, '42.62.178.58', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il9mbGFzaCI7YToyOntzOjM6Im5ldyI7YTowOnt9czozOiJvbGQiO2E6MDp7fX1zOjY6Il90b2tlbiI7czo0MDoiYVZLWGp2SHNLaGxXaEoxYVZ6SWtJdm5ET0hZZ1o3anhnTzNCdExxNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L2xvZ2luIjtzOjU6InJvdXRlIjtzOjEyOiJjbGllbnQubG9naW4iO31zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyNjc7fQ==', 1768285385),
('e2znmwVw2xGohilGbQjnEv9UYtvurRRjA9G4zZbp', NULL, '182.2.4.60', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicnRZN2xXWDFiVmVjdmxNUTI1SWR2aHRNeEIyMDFOSDlrSkVvQ2g2YiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxMTc7fQ==', 1768284153),
('ghL9KcX8rTFCWkZgM1MG1v1d7guYTTFNStMan4Ev', NULL, '182.2.4.196', 'WhatsApp/2.23.20.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV3hSZkV1SFFscFBSMGlmTWc3TUFmNUtLenUyUEVneFBPeUR5TjlLVSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDg6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L3JlZ2lzdGVyP3JlZj1FMkI4RUJCQSI7czo1OiJyb3V0ZSI7czoxNToiY2xpZW50LnJlZ2lzdGVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768283586),
('h2ECQLW0zeKnwQE43I9TbwvRPYRwIWEnXDm0xTJ8', NULL, '182.2.4.196', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiY0tKa2hzMUdUR0dTOWlsV0Zua3hCbzRpN2RqRjhoYXpGVGJMM2dwTyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDI6Imh0dHBzOi8vcHVyYW51c2EuaWQvYXBpL3NoaXBwaW5nL3Byb3ZpbmNlcyI7czo1OiJyb3V0ZSI7czoyMjoiYXBpLnNoaXBwaW5nLnByb3ZpbmNlcyI7fXM6NTM6ImxvZ2luX2NsaWVudF81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjg2O30=', 1768285872),
('IFpBGZuHpLzvReyrAW9HNKYiUVkAYIEyct4Ht5vf', NULL, '72.14.201.145', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTTc0aUFyb0pjOVN0S1hVb3NXS00xYzV6THMyTmt0akNJdXFhR0s5SCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1768285823),
('rcAld20OhgXuZ9UjOseksS8IU1hohlIcAeSAvTnm', NULL, '112.215.245.174', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaGhKQ28xMkhDZWRrRHVrclVjMXQzTGpWNHVlNjR1YzBRbmVqREw2NyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyNzM7fQ==', 1768284570),
('rpTEloOOL5vmH9nnU5kNJng2ovFqvOkJlf2RL2od', NULL, '180.242.195.236', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTlZmOEJUN2JlTG9Lb1MyVzJTU2dVbkxwUTRRRExrd1dPR0J0RVZ2RCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTI6Imh0dHBzOi8vcHVyYW51c2EuaWQvY2xpZW50L3JlZ2lzdGVyP3JlZj1SRUYtVFRFSkFQSksiO3M6NToicm91dGUiO3M6MTU6ImNsaWVudC5yZWdpc3RlciI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1768282596),
('tFqR5Vny3JTxjLudYnP605tESlMwWPlLhp5l0Nyi', NULL, '182.2.7.80', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaWhpVTZqYzV0djlNakZCV3VKYWMzWlhuVTVzQWF0bGkwd1BJcDZPTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyNDt9', 1768287185),
('xWpBnjzdFoJSohs0Iung5KgUyNkWc8JY57c479fM', NULL, '161.248.117.18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicFRNRHc2QlQwU1lzV0JCaXlSNFZiNW84TGNCZGt1Z0dkcGVGNUZjbiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHBzOi8vcHVyYW51c2EuaWQvYmVyYW5kYSI7czo1OiJyb3V0ZSI7czoxNzoiZWNvbW1lcmNlLmJlcmFuZGEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUzOiJsb2dpbl9jbGllbnRfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxNjY7fQ==', 1768282613);

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `type`, `group`, `created_at`, `updated_at`) VALUES
(1, 'site_logo', '/storage/logos/jKNIuJViG3uBVnl5x7kWFPahJGXBhx8yLeri4qb0.png', 'text', 'general', '2025-12-26 06:31:35', '2026-01-07 00:03:56'),
(2, 'site_description', '<h1><strong>PURANUSA </strong>adalah platform <strong>E-Commerce afiliasi</strong> terintegrasi penuh dibawah naungan <strong>PT. ZENITH SINERGI UTAMA</strong></h1><p></p>', 'text', 'general', '2025-12-29 22:56:38', '2026-01-07 00:03:21'),
(3, 'site_name', 'PURANUSA', 'text', 'general', '2025-12-29 22:57:17', '2025-12-29 22:57:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `courier_id` varchar(255) DEFAULT NULL,
  `tracking_no` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `shipped_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `shipping_fee` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `shipment_items`
--

CREATE TABLE `shipment_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shipment_id` bigint(20) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'superadmin@puranusa.id', '2025-12-16 03:27:48', '$2y$12$xK9Ri8ST1cBmZ0joNq6yH.uu5IjXwZsBtVoYIIyQ904CTNTJ26kNa', NULL, NULL, NULL, 'EBKMY9mzuMT7qgisnhOUFNjuBmllyo90vfJXvLEJRlXLMPC466tK59lCsw2m', '2025-12-16 03:27:48', '2025-12-16 03:27:48'),
(2, 'Admin', 'admin@puranusa.id', '2025-12-16 03:27:48', '$2y$12$fyLEVfcb.tOtZYTyLb70FOBpj5odO1Ws.z0GhLbKVLmYe5L2ROSD6', NULL, NULL, NULL, 'R2OYGC6xDc', '2025-12-16 03:27:48', '2025-12-16 03:27:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Default',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wishlist_items`
--

CREATE TABLE `wishlist_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `wishlist_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_sku` varchar(255) NOT NULL,
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_slug_unique` (`slug`),
  ADD KEY `articles_is_published_published_at_index` (`is_published`,`published_at`);
ALTER TABLE `articles` ADD FULLTEXT KEY `articles_title_seo_title_fulltext` (`title`,`seo_title`);

--
-- Indeks untuk tabel `article_contents`
--
ALTER TABLE `article_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `article_contents_article_id_unique` (`article_id`);
ALTER TABLE `article_contents` ADD FULLTEXT KEY `article_contents_content_fulltext` (`content`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_customer_id_index` (`customer_id`),
  ADD KEY `carts_session_id_index` (`session_id`);

--
-- Indeks untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cart_id_index` (`cart_id`),
  ADD KEY `cart_items_product_id_index` (`product_id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`),
  ADD KEY `categories_is_active_sort_order_index` (`is_active`,`sort_order`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD UNIQUE KEY `customers_ref_code_unique` (`ref_code`),
  ADD UNIQUE KEY `customers_ewallet_id_unique` (`ewallet_id`),
  ADD KEY `customers_sponsor_id_index` (`sponsor_id`),
  ADD KEY `customers_upline_id_index` (`upline_id`),
  ADD KEY `customers_package_id_foreign` (`package_id`),
  ADD KEY `customers_is_stockist_index` (`is_stockist`),
  ADD KEY `customers_stockist_kabupaten_id_index` (`stockist_kabupaten_id`),
  ADD KEY `customers_stockist_province_id_index` (`stockist_province_id`);

--
-- Indeks untuk tabel `customers_rewards`
--
ALTER TABLE `customers_rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `customer_addresses`
--
ALTER TABLE `customer_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_addresses_customer_id_index` (`customer_id`);

--
-- Indeks untuk tabel `customer_bonuses`
--
ALTER TABLE `customer_bonuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonuses_member_id_index` (`member_id`);

--
-- Indeks untuk tabel `customer_bonus_cashbacks`
--
ALTER TABLE `customer_bonus_cashbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_cashbacks_member_id_index` (`member_id`);

--
-- Indeks untuk tabel `customer_bonus_lifetime_cash_rewards`
--
ALTER TABLE `customer_bonus_lifetime_cash_rewards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_lifetime_cash_rewards_member_id_index` (`member_id`);

--
-- Indeks untuk tabel `customer_bonus_matchings`
--
ALTER TABLE `customer_bonus_matchings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_matchings_member_id_index` (`member_id`),
  ADD KEY `customer_bonus_matchings_from_member_id_index` (`from_member_id`);

--
-- Indeks untuk tabel `customer_bonus_pairings`
--
ALTER TABLE `customer_bonus_pairings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_pairings_member_id_index` (`member_id`);

--
-- Indeks untuk tabel `customer_bonus_retails`
--
ALTER TABLE `customer_bonus_retails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_retails_member_id_index` (`member_id`),
  ADD KEY `customer_bonus_retails_from_member_id_index` (`from_member_id`);

--
-- Indeks untuk tabel `customer_bonus_rewards`
--
ALTER TABLE `customer_bonus_rewards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_rewards_member_id_index` (`member_id`);

--
-- Indeks untuk tabel `customer_bonus_sponsors`
--
ALTER TABLE `customer_bonus_sponsors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_bonus_sponsors_member_id_index` (`member_id`),
  ADD KEY `customer_bonus_sponsors_from_member_id_index` (`from_member_id`);

--
-- Indeks untuk tabel `customer_bv_rewards`
--
ALTER TABLE `customer_bv_rewards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `reward_id` (`reward_id`);

--
-- Indeks untuk tabel `customer_networks`
--
ALTER TABLE `customer_networks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_networks_member_id_index` (`member_id`),
  ADD KEY `customer_networks_upline_id_index` (`upline_id`);

--
-- Indeks untuk tabel `customer_network_matrixes`
--
ALTER TABLE `customer_network_matrixes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_network_matrixes_member_id_index` (`member_id`),
  ADD KEY `customer_network_matrixes_sponsor_id_index` (`sponsor_id`);

--
-- Indeks untuk tabel `customer_npwp`
--
ALTER TABLE `customer_npwp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indeks untuk tabel `customer_package`
--
ALTER TABLE `customer_package`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `customer_password_resets`
--
ALTER TABLE `customer_password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `customer_pph`
--
ALTER TABLE `customer_pph`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indeks untuk tabel `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_wallet_transactions_transaction_ref_unique` (`transaction_ref`),
  ADD KEY `customer_wallet_transactions_customer_id_type_index` (`customer_id`,`type`),
  ADD KEY `customer_wallet_transactions_customer_id_status_index` (`customer_id`,`status`),
  ADD KEY `customer_wallet_transactions_created_at_index` (`created_at`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsletter_subscribers_email_unique` (`email`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_no_unique` (`order_no`),
  ADD KEY `orders_customer_id_status_index` (`customer_id`,`status`),
  ADD KEY `orders_placed_at_index` (`placed_at`),
  ADD KEY `orders_shipping_address_id_foreign` (`shipping_address_id`),
  ADD KEY `orders_billing_address_id_foreign` (`billing_address_id`),
  ADD KEY `orders_paid_at_index` (`paid_at`),
  ADD KEY `orders_status_index` (`status`),
  ADD KEY `orders_created_at_index` (`created_at`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_order_id_index` (`order_id`);

--
-- Indeks untuk tabel `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_method_id_foreign` (`method_id`),
  ADD KEY `payments_order_id_status_index` (`order_id`,`status`),
  ADD KEY `transaction_id_signature_key` (`transaction_id`,`signature_key`) USING BTREE;

--
-- Indeks untuk tabel `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payment_methods_code_unique` (`code`);

--
-- Indeks untuk tabel `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_transactions_payment_id_index` (`payment_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_is_active_created_at_index` (`is_active`,`created_at`);
ALTER TABLE `products` ADD FULLTEXT KEY `products_name_short_desc_fulltext` (`name`,`short_desc`);

--
-- Indeks untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_categories_product_id_category_id_unique` (`product_id`,`category_id`),
  ADD KEY `product_categories_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `product_media`
--
ALTER TABLE `product_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_media_product_id_sort_order_index` (`product_id`,`sort_order`);

--
-- Indeks untuk tabel `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_reviews_product_id_is_approved_index` (`product_id`,`is_approved`),
  ADD KEY `product_reviews_customer_id_index` (`customer_id`),
  ADD KEY `product_reviews_order_item_id_foreign` (`order_item_id`);

--
-- Indeks untuk tabel `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promotions_code_unique` (`code`),
  ADD KEY `promotions_is_active_start_at_end_at_index` (`is_active`,`start_at`,`end_at`);

--
-- Indeks untuk tabel `promotion_products`
--
ALTER TABLE `promotion_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promotion_products_promotion_id_product_id_unique` (`promotion_id`,`product_id`),
  ADD KEY `promotion_products_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refunds_payment_id_foreign` (`payment_id`),
  ADD KEY `refunds_order_id_status_index` (`order_id`,`status`);

--
-- Indeks untuk tabel `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `returns_order_id_status_index` (`order_id`,`status`);

--
-- Indeks untuk tabel `return_items`
--
ALTER TABLE `return_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `return_items_order_item_id_foreign` (`order_item_id`),
  ADD KEY `return_items_return_id_index` (`return_id`);

--
-- Indeks untuk tabel `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indeks untuk tabel `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipments_order_id_status_index` (`order_id`,`status`);

--
-- Indeks untuk tabel `shipment_items`
--
ALTER TABLE `shipment_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipment_items_order_item_id_foreign` (`order_item_id`),
  ADD KEY `shipment_items_shipment_id_index` (`shipment_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlists_customer_id_index` (`customer_id`);

--
-- Indeks untuk tabel `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlist_items_wishlist_id_product_id_unique` (`wishlist_id`,`product_id`),
  ADD KEY `wishlist_items_product_id_foreign` (`product_id`),
  ADD KEY `wishlist_items_wishlist_id_index` (`wishlist_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `article_contents`
--
ALTER TABLE `article_contents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key customer', AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT untuk tabel `customers_rewards`
--
ALTER TABLE `customers_rewards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customer_addresses`
--
ALTER TABLE `customer_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key alamat customer', AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT untuk tabel `customer_bonuses`
--
ALTER TABLE `customer_bonuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key bonus customer', AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_cashbacks`
--
ALTER TABLE `customer_bonus_cashbacks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_lifetime_cash_rewards`
--
ALTER TABLE `customer_bonus_lifetime_cash_rewards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_matchings`
--
ALTER TABLE `customer_bonus_matchings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key bonus matching customer';

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_pairings`
--
ALTER TABLE `customer_bonus_pairings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key bonus pairing customer', AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_retails`
--
ALTER TABLE `customer_bonus_retails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key bonus retail customer', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_rewards`
--
ALTER TABLE `customer_bonus_rewards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customer_bonus_sponsors`
--
ALTER TABLE `customer_bonus_sponsors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key bonus sponsor customer', AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT untuk tabel `customer_bv_rewards`
--
ALTER TABLE `customer_bv_rewards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=358;

--
-- AUTO_INCREMENT untuk tabel `customer_networks`
--
ALTER TABLE `customer_networks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key jaringan customer (binary tree)', AUTO_INCREMENT=5174;

--
-- AUTO_INCREMENT untuk tabel `customer_network_matrixes`
--
ALTER TABLE `customer_network_matrixes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary key matrix jaringan customer', AUTO_INCREMENT=2586;

--
-- AUTO_INCREMENT untuk tabel `customer_npwp`
--
ALTER TABLE `customer_npwp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customer_package`
--
ALTER TABLE `customer_package`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `customer_pph`
--
ALTER TABLE `customer_pph`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=286;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT untuk tabel `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `payment_transactions`
--
ALTER TABLE `payment_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `product_media`
--
ALTER TABLE `product_media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `promotion_products`
--
ALTER TABLE `promotion_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `returns`
--
ALTER TABLE `returns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `return_items`
--
ALTER TABLE `return_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `shipment_items`
--
ALTER TABLE `shipment_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wishlist_items`
--
ALTER TABLE `wishlist_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `article_contents`
--
ALTER TABLE `article_contents`
  ADD CONSTRAINT `article_contents_article_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_package_id_foreign` FOREIGN KEY (`package_id`) REFERENCES `customer_package` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `customers_upline_id_foreign` FOREIGN KEY (`upline_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonuses`
--
ALTER TABLE `customer_bonuses`
  ADD CONSTRAINT `customer_bonuses_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_cashbacks`
--
ALTER TABLE `customer_bonus_cashbacks`
  ADD CONSTRAINT `customer_bonus_cashbacks_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_lifetime_cash_rewards`
--
ALTER TABLE `customer_bonus_lifetime_cash_rewards`
  ADD CONSTRAINT `customer_bonus_lifetime_cash_rewards_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_matchings`
--
ALTER TABLE `customer_bonus_matchings`
  ADD CONSTRAINT `customer_bonus_matchings_from_member_id_foreign` FOREIGN KEY (`from_member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_bonus_matchings_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_pairings`
--
ALTER TABLE `customer_bonus_pairings`
  ADD CONSTRAINT `customer_bonus_pairings_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_rewards`
--
ALTER TABLE `customer_bonus_rewards`
  ADD CONSTRAINT `customer_bonus_rewards_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bonus_sponsors`
--
ALTER TABLE `customer_bonus_sponsors`
  ADD CONSTRAINT `customer_bonus_sponsors_from_member_id_foreign` FOREIGN KEY (`from_member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_bonus_sponsors_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_bv_rewards`
--
ALTER TABLE `customer_bv_rewards`
  ADD CONSTRAINT `customer_bv_rewards_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_bv_rewards_ibfk_2` FOREIGN KEY (`reward_id`) REFERENCES `rewards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_networks`
--
ALTER TABLE `customer_networks`
  ADD CONSTRAINT `customer_networks_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_networks_upline_id_foreign` FOREIGN KEY (`upline_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_network_matrixes`
--
ALTER TABLE `customer_network_matrixes`
  ADD CONSTRAINT `customer_network_matrixes_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_network_matrixes_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  ADD CONSTRAINT `customer_wallet_transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_billing_address_id_foreign` FOREIGN KEY (`billing_address_id`) REFERENCES `customer_addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_shipping_address_id_foreign` FOREIGN KEY (`shipping_address_id`) REFERENCES `customer_addresses` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_method_id_foreign` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`id`),
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD CONSTRAINT `payment_transactions_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_categories_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_media`
--
ALTER TABLE `product_media`
  ADD CONSTRAINT `product_media_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `product_reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `promotion_products`
--
ALTER TABLE `promotion_products`
  ADD CONSTRAINT `promotion_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `promotion_products_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `refunds`
--
ALTER TABLE `refunds`
  ADD CONSTRAINT `refunds_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `refunds_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `returns`
--
ALTER TABLE `returns`
  ADD CONSTRAINT `returns_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `return_items`
--
ALTER TABLE `return_items`
  ADD CONSTRAINT `return_items_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `return_items_return_id_foreign` FOREIGN KEY (`return_id`) REFERENCES `returns` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `shipment_items`
--
ALTER TABLE `shipment_items`
  ADD CONSTRAINT `shipment_items_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shipment_items_shipment_id_foreign` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD CONSTRAINT `wishlist_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_items_wishlist_id_foreign` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
