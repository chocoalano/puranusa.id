<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sp_register');

        DB::unprepared("
            CREATE PROCEDURE sp_register(IN member_id INT)
            BEGIN

              DECLARE package_id INT DEFAULT NULL;
              DECLARE last_level INT DEFAULT 1;
              DECLARE last_lvl INT DEFAULT 1;
              DECLARE type_var VARCHAR(50) DEFAULT NULL;
              DECLARE possponsor VARCHAR(10) DEFAULT NULL;
              DECLARE sponsor_id INT;
              DECLARE upline_id INT;
              DECLARE last_position VARCHAR(10);
              DECLARE omzet DECIMAL(15,2);
              DECLARE sponsor_member_id INT;
              DECLARE last_sponsor INT;
              DECLARE last_upline INT;
              DECLARE llast_sponsor INT;
              DECLARE stype INT;
              DECLARE sleft INT DEFAULT 0;
              DECLARE sright INT DEFAULT 0;
              DECLARE sponsor_upline_id INT;
              DECLARE parent_upline INT;
              DECLARE parent_total_left INT;
              DECLARE parent_total_right INT;
              DECLARE pspl INT;
              DECLARE pspr INT;
              DECLARE member_position VARCHAR(10);

              -- Get member data
              SELECT `sponsor_id`, `upline_id`, `position`, `omzet`
              INTO sponsor_id, upline_id, last_position, omzet
              FROM `customers` WHERE `id` = member_id;

              SET sponsor_member_id = sponsor_id;
              SET last_sponsor = sponsor_id;

              -- Get package based on omzet
              SELECT `id` INTO package_id
              FROM `customer_packages`
              WHERE `price` <= omzet
              ORDER BY `price` DESC
              LIMIT 1;

              -- Update package if found
              IF package_id IS NOT NULL THEN
                UPDATE `customers` SET `package_id` = package_id WHERE `id` = member_id;
              END IF;

              -- Update foot position
              IF last_position = 'left' THEN
                UPDATE `customers` SET `foot_left` = member_id WHERE `id` = upline_id;
              ELSE
                UPDATE `customers` SET `foot_right` = member_id WHERE `id` = upline_id;
              END IF;

              -- Insert into customer_networks (binary tree)
              SET last_upline = upline_id;
              WHILE last_upline > 0 DO
                INSERT INTO `customer_networks`
                VALUES(NULL, member_id, last_upline, last_position, 1, last_level, NULL, NOW(), NULL);

                SET last_level = last_level + 1;

                SELECT `upline_id`, `position`
                INTO last_upline, last_position
                FROM `customers` WHERE `id` = last_upline;
              END WHILE;

              -- Insert into customer_network_matrix (sponsor matrix)
              WHILE last_sponsor > 0 DO
                INSERT INTO `customer_network_matrixes`
                VALUES(NULL, member_id, last_sponsor, last_lvl, NULL, CURRENT_DATE(), NULL);

                SELECT `sponsor_id`, `level`
                INTO llast_sponsor, stype
                FROM `customers` WHERE `id` = last_sponsor;

                SET last_sponsor = llast_sponsor;
                SET last_lvl = last_lvl + 1;
              END WHILE;

              -- Update sponsor left/right counters
              SELECT `position`
              INTO possponsor
              FROM `customer_networks`
              WHERE `member_id` = member_id AND `upline_id` = sponsor_id;

              IF possponsor IS NOT NULL THEN
                IF possponsor = 'left' THEN
                  UPDATE `customers` SET `sponsor_left` = `sponsor_left` + 1 WHERE `id` = sponsor_id;
                  SET sleft = sleft + 1;
                ELSE
                  UPDATE `customers` SET `sponsor_right` = `sponsor_right` + 1 WHERE `id` = sponsor_id;
                  SET sright = sright + 1;
                END IF;
              END IF;

              -- Update total_left and total_right for all uplines
              SET upline_id = (SELECT `upline_id` FROM `customers` WHERE `id` = member_id);

              WHILE upline_id > 0 DO
                SELECT `sponsor_id`, `upline_id`, `total_left`, `total_right`, `sponsor_left`, `sponsor_right`
                INTO sponsor_upline_id, parent_upline, parent_total_left, parent_total_right, pspl, pspr
                FROM `customers` WHERE `id` = upline_id;

                SELECT `position`, `upline_id`
                INTO member_position, member_id
                FROM `customers` WHERE `id` = member_id;

                IF member_position = 'right' THEN
                  UPDATE `customers`
                  SET `total_right` = `total_right` + 1
                  WHERE `id` = upline_id;
                ELSE
                  UPDATE `customers`
                  SET `total_left` = `total_left` + 1
                  WHERE `id` = upline_id;
                END IF;

                SET upline_id = parent_upline;
              END WHILE;

            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sp_register');
    }
};
