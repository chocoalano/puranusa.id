<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleContent;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\CustomerAddress;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonus;
use App\Models\Manage\CustomerBonusMatching;
use App\Models\Manage\CustomerBonusPairing;
use App\Models\Manage\CustomerBonusSponsor;
use App\Models\Manage\CustomerNetwork;
use App\Models\NewsletterSubscriber;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Page;
use App\Models\Payment;
use App\Models\PaymentMethod;
use App\Models\PaymentTransaction;
use App\Models\Product;
use App\Models\ProductMedia;
use App\Models\ProductReview;
use App\Models\Promotion;
use App\Models\PromotionProduct;
use App\Models\Refund;
use App\Models\ReturnItem;
use App\Models\Returns;
use App\Models\Setting;
use App\Models\Shipment;
use App\Models\ShipmentItem;
use App\Models\User;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('Seeding users...');
        $this->call(UserSeeder::class);

        $this->command->info('Seeding categories...');
        $this->seedCategories();

        $this->command->info('Seeding products...');
        $this->seedProducts();

        $this->command->info('Seeding payment methods...');
        $this->seedPaymentMethods();

        $this->command->info('Seeding settings...');
        $this->seedSettings();

        $this->command->info('Seeding customers...');
        /** @var \Illuminate\Database\Eloquent\Collection<int, Customer> $customers */
        $customers = $this->seedCustomers();

        $this->command->info('Seeding customer addresses...');
        $this->seedCustomerAddresses($customers);

        $this->command->info('Seeding customer network...');
        $this->seedCustomerNetwork($customers);

        $this->command->info('Seeding customer bonuses...');
        $this->seedCustomerBonuses($customers);

        $this->command->info('Seeding e-commerce data...');
        $this->seedEcommerceData($customers);

        $this->command->info('Seeding additional data...');
        $this->seedAdditionalData();

        $this->command->info('Database seeding completed!');
    }

    /**
     * Seed admin and regular users.
     */
    protected function seedUsers(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        User::factory(5)->create();
    }

    /**
     * Seed categories with real production data.
     */
    protected function seedCategories(): void
    {
        $categoriesData = [
            [
                'name' => 'Health Therapy',
                'slug' => 'health-therapy',
                'sort_order' => 1,
                'image' => 'images/category-products/01K8NCS0E3H5C7C4WEP1ZXE6FK.png',
            ],
            [
                'name' => 'Beauty Care',
                'slug' => 'beauty-care',
                'sort_order' => 1,
                'image' => 'images/category-products/01K8NCW90F80Q7W4WR84R50XK6.jpg',
            ],
            [
                'name' => 'Health Care',
                'slug' => 'health-care',
                'sort_order' => 2,
                'image' => 'images/category-products/01K8METSTFYZHAVWSMBQ39EGQR.jpg',
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'sort_order' => 4,
                'image' => 'images/category-products/01K8ND4299C9FEH9P4YTJRV6DM.png',
            ],
        ];

        foreach ($categoriesData as $catData) {
            Category::create($catData);
        }
    }

    /**
     * Seed products with real production data.
     */
    protected function seedProducts(): void
    {
        $this->seedProductsData();
        $this->seedProductMedia();
        $this->seedProductCategories();
    }

    /**
     * Seed product data records.
     */
    protected function seedProductsData(): void
    {
        $productsData = [
            ['id' => 1, 'sku' => 'SKU-NPKBOGBUQD', 'slug' => 'puranusa-beauty-care-paket-lengkap', 'name' => 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'short_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'long_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'brand' => 'PURANUSA', 'warranty_months' => 23, 'base_price' => 300000.00, 'currency' => 'IDR', 'stock' => 122, 'weight_gram' => 2954, 'length_mm' => 352, 'width_mm' => 395, 'height_mm' => 49, 'is_active' => 1],
            ['id' => 2, 'sku' => 'SKU-SMYBVSTSJF', 'slug' => 'puranusa-beauty-care-paket-alami', 'name' => 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'short_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'long_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'brand' => 'PURANUSA', 'warranty_months' => 21, 'base_price' => 300000.00, 'currency' => 'IDR', 'stock' => 235, 'weight_gram' => 131, 'length_mm' => 205, 'width_mm' => 132, 'height_mm' => 270, 'is_active' => 1],
            ['id' => 3, 'sku' => 'SKU-YWGK1M88UN', 'slug' => 'puranusa-beauty-care-rapet-wangi', 'name' => 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'short_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'long_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'brand' => 'PURANUSA', 'warranty_months' => 12, 'base_price' => 300000.00, 'currency' => 'IDR', 'stock' => 34, 'weight_gram' => 4744, 'length_mm' => 99, 'width_mm' => 393, 'height_mm' => 174, 'is_active' => 1],
            ['id' => 13, 'sku' => 'SKU-3OXGXR8JCD', 'slug' => 'puranusa-beauty-care-paket-komplit', 'name' => 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'short_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'long_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'brand' => 'PURANUSA', 'warranty_months' => 14, 'base_price' => 300000.00, 'currency' => 'IDR', 'stock' => 231, 'weight_gram' => 684, 'length_mm' => 189, 'width_mm' => 301, 'height_mm' => 125, 'is_active' => 1],
            ['id' => 28, 'sku' => 'SKU-OA2RLMAJIM', 'slug' => 'puranusa-beauty-care-natural', 'name' => 'Puranusa Beauty Care, Brightening Soap, Feminime Spray, Feminime Wash', 'short_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan', 'long_desc' => 'Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.\nDirancang untuk wanita aktif yang mengutamakan kebersihan dan kesehatan holistik. Produk ini memberikan perlindungan pH seimbang dan kesegaran alami.', 'brand' => 'PURANUSA', 'warranty_months' => 1, 'base_price' => 300000.00, 'currency' => 'IDR', 'stock' => 472, 'weight_gram' => 4854, 'length_mm' => 73, 'width_mm' => 263, 'height_mm' => 64, 'is_active' => 1],
            ['id' => 29, 'sku' => 'SKU-TVEQ1ITB4V', 'slug' => 'biozenlite-serat-harian', 'name' => 'BIOZENLITE: Kemurnian Serat Harian', 'short_desc' => 'Pencernaan yang sehat adalah fondasi kebugaran dan glowing skin modern. BIOZENLITE adalah revolusi serat yang ringan, lezat, dan esensial.', 'long_desc' => 'Psyllium Husk, Inulin, & Fibersol :Bertindak sebagai \'pembersih\' alami usus, membantu mengeluarkan racun (detoks), dan mendukung keteraturan metabolisme.\nAloevera & Stevia : Membantu menjaga kelembaban usus, memberikan nutrisi serat tanpa tambahan gula berlebih.\nPremix Vitamin & Mineral : Mencukupi kebutuhan nutrisi harian untuk tubuh yang lebih bertenaga dan ringan', 'brand' => 'ZENLITE-Puranusa', 'warranty_months' => 1, 'base_price' => 350000.00, 'currency' => 'IDR', 'stock' => 479, 'weight_gram' => 2018, 'length_mm' => 250, 'width_mm' => 95, 'height_mm' => 50, 'is_active' => 1],
            ['id' => 30, 'sku' => 'SKU-5I1TO2KKG1', 'slug' => 'biohealth-pendant', 'name' => 'BIOHEALTH PENDANT-High Ions 6000cc Energy Bio pendant', 'short_desc' => 'Lava and Tourmaline High Ions 6000cc Energy Bio pendant Glass', 'long_desc' => 'Health Benefits:\n1,Enhancement or Normalization of human immunity function\n2,Antineoplastic function\n3,Anti-carcinogen function\n4,Prevention and treatment of diseases\n5,Significant anti-senility effect\n6,Unimpeded blood pressure\n7,Enhances circulation and increases energy\n8,Harmless to skin just for help body! ', 'brand' => 'BIOHEALTH PENDANT Puranusa', 'warranty_months' => 12, 'base_price' => 1500000.00, 'currency' => 'IDR', 'stock' => 276, 'weight_gram' => 2046, 'length_mm' => 123, 'width_mm' => 341, 'height_mm' => 200, 'is_active' => 1],
            ['id' => 31, 'sku' => 'SKU-TTOWZ2VEFE', 'slug' => 'bioflask-alkaline-water', 'name' => 'BIOFLASK- Alkaline water glass 300ml', 'short_desc' => 'PH Level reaches to PH 8-9.5 for neutralized the acid for keep body balance in healthy', 'long_desc' => '7 Filter material : ORP Ball, Germanium Ball, Negative ION Ball, Far-Infrared Ball, Hydrogen Ball, Alkaline Ball, Zinc Stone, More filter material.\n1. Neuturalize the acid for keep body balance\n2. Improve water quality of taste\n3. Neuturalize the oil for keep slim body', 'brand' => 'BIOFLASK - Puranusa', 'warranty_months' => 12, 'base_price' => 1300000.00, 'currency' => 'IDR', 'stock' => 311, 'weight_gram' => 1682, 'length_mm' => 382, 'width_mm' => 369, 'height_mm' => 176, 'is_active' => 1],
            ['id' => 32, 'sku' => 'SKU-L05PJVCZ3G', 'slug' => 'biozenerve-kapsul-hitam', 'name' => 'BIOZENERVE: Ketenangan Alami dari Akar Bumi 30 Kapsul Hitam', 'short_desc' => 'Peradangan adalah akar dari ketidaknyamanan kronis. BIOZENERVE kembali ke kearifan alam untuk memulihkan tubuh dari akarnya.', 'long_desc' => '\nPeradangan adalah akar dari ketidaknyamanan kronis. BIOZENERVE kembali ke kearifan alam untuk memulihkan tubuh dari akarnya.\nCurcumin (Kunyit): Anti-inflamasi alami terkuat. Membantu meredakan nyeri akibat peradangan pada sendi dan saraf.\nAndrographis Paniculata (Sambiloto): Dikenal luas dalam Jamu untuk meningkatkan daya tahan tubuh dan membantu proses detoksifikasi alami.\nNigella Sativa (Habbatussauda) & Propolis: Memperkuat sistem imun dan memberikan perlindungan seluler, menciptakan ketenangan alami dari dalam.\n', 'brand' => 'BIOZENERVE- Puranusa', 'warranty_months' => 1, 'base_price' => 350000.00, 'currency' => 'IDR', 'stock' => 107, 'weight_gram' => 2446, 'length_mm' => 266, 'width_mm' => 115, 'height_mm' => 91, 'is_active' => 1],
            ['id' => 33, 'sku' => 'SKU-33YAPSXPBI', 'slug' => 'biolove-vitalitas', 'name' => 'BIOLOVE: Vitalitas dan Kehangatan Nusantara', 'short_desc' => 'Resep Harmoni Rumah Tangga Sejak zaman dahulu, leluhur kita mencari kekuatan di alam. Purwaceng (akar legendaris dari Dieng) dan Tongkat Ali telah menjadi rahasia para raja dan ksatria. Kami melanjutkan tradisi ini dengan memadukan herbal tersebut dengan energi modern.', 'long_desc' => 'Komposisi utama:\nPurwaceng, Tongkat Ali, & Ginseng: Meningkatkan stamina, gairah, dan daya tahan tubuh secara alami.\nL-Arginine & Guarana: Memberikan dorongan energi maskulin dan menjaga vitalitas yang seimbang dan tahan lama.\nGinseng & Kopi Arabika: Membantu meningkatkan fokus dan mood positif.', 'brand' => 'BIOLOVE - Puranusa', 'warranty_months' => 1, 'base_price' => 350000.00, 'currency' => 'IDR', 'stock' => 138, 'weight_gram' => 357, 'length_mm' => 382, 'width_mm' => 64, 'height_mm' => 63, 'is_active' => 1],
            ['id' => 34, 'sku' => 'SKU-VPIVK1QUJ3', 'slug' => 'royal-propolis', 'name' => 'ROYAL PROPOLIS - Premium Grade Brazilian Propolis 8ml ', 'short_desc' => 'Royal Propolis memiliki kualitas produk yang sangat baik. Hal ini didukung dari berbagai pengujian yang telah terstandarisasi, Ukuran partikel 64,2 Nano Meter (PSA/ Partikel Size Analyzer), Bebas Alkohol dan Wax/Lilin, Memiliki 22 Jenis Polifenol & Flavonoid', 'long_desc' => 'ROYAL PROPOLIS\nBeberapa penelitian menunjukkan bahwa propolis memiliki sifat antibakteri, antijamur, antivirus, antiradang, dan antikanker. Hal ini membuat propolis diklaim memiliki beberapa manfaat untuk Kesehatan, membantu penyembuhan luka di kulit, membantu mengontrol kadar gula darah dan kolesterol, mengatasi radang gusi, meringankan nyeri dan pembengkakan sendi, menghambat pertumbuhan sel kanker, meningkatkan daya tahan tubuh, menjaga fungsi dan Kesehatan otak.', 'brand' => 'ROYAL PROPOLIS - Puranusa', 'warranty_months' => 1, 'base_price' => 200000.00, 'currency' => 'IDR', 'stock' => 201, 'weight_gram' => 1233, 'length_mm' => 71, 'width_mm' => 170, 'height_mm' => 274, 'is_active' => 1],
            ['id' => 35, 'sku' => 'SKU-SLIMEXWMNX', 'slug' => 'biozenlite-slimming', 'name' => 'BIOZENLITE: Kemurnian Serat Harian', 'short_desc' => 'Pencernaan yang sehat adalah fondasi kebugaran dan glowing skin modern. BIOZENLITE adalah revolusi serat yang ringan, lezat, dan esensial', 'long_desc' => 'Komposisi Utama:\nPsyllium Husk, Inulin, & Fibersol :Bertindak sebagai \'pembersih\' alami usus, membantu mengeluarkan racun (detoks), dan mendukung keteraturan metabolisme.\nAloevera & Stevia : Membantu menjaga kelembaban usus, memberikan nutrisi serat tanpa tambahan gula berlebih.\nPremix Vitamin & Mineral : Mencukupi kebutuhan nutrisi harian untuk tubuh yang lebih bertenaga dan ringan', 'brand' => 'ZENLITE-Puranusa', 'warranty_months' => 1, 'base_price' => 350000.00, 'currency' => 'IDR', 'stock' => 555, 'weight_gram' => 120, 'length_mm' => 50, 'width_mm' => 20, 'height_mm' => 120, 'is_active' => 1],
            ['id' => 36, 'sku' => 'SKU-YGTEFEMINIME', 'slug' => 'puranusa-brightening-soap', 'name' => 'PURANUSA Brightening Soap', 'short_desc' => 'Sentuhan Salmon dan Retinol: Rahasia Kulit Cerah Alami Nusantara, Kami memadukan warisan kecantikan dengan inovasi mutakhir. Formula sabun premium ini membersihkan sekaligus meremajakan.', 'long_desc' => 'Komposisi Utama:\nDNA Salmon & Retinol: DNA Salmon kaya antioksidan dan nutrisi, bekerja sama dengan Retinol untuk meremajakan sel dan menjaga elastisitas kulit.\nGlutathione & Niacinamide: Kombinasi pencerah kulit yang efektif untuk memudarkan flek, meratakan warna kulit, dan memberikan efek glowing sejati.\nSpirulina Platensis Extract: Sumber nutrisi kulit alami yang membantu menjaga kulit dari kerusakan radikal bebas.', 'brand' => 'PURANUSA Brightening Soap', 'warranty_months' => null, 'base_price' => 30000.00, 'currency' => 'IDR', 'stock' => 235, 'weight_gram' => 20, 'length_mm' => 100, 'width_mm' => 100, 'height_mm' => 100, 'is_active' => 1],
            ['id' => 37, 'sku' => 'SKU-WASHFEMININ', 'slug' => 'puranusa-feminin-wash', 'name' => 'PURANUSA - Feminin Wash', 'short_desc' => 'Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni', 'long_desc' => 'Ekstrak Daun Sirih & Manjakani: Pusaka turun-temurun. Bertindak sebagai agen pembersih dan antibakteri alami untuk menjaga keseimbangan area kewanitaan.\nCentella Asiatica Extract: Memberikan efek menenangkan, merawat kulit sensitif, dan menjaga kelembaban area intimate.\nNiacinamide & Gliserin: Terutama dalam wash, membantu menjaga kelembutan dan tampilan kulit, serta mencegah kulit kering.', 'brand' => 'PURANUSA - Feminin Wash', 'warranty_months' => null, 'base_price' => 150000.00, 'currency' => 'IDR', 'stock' => 265, 'weight_gram' => 60, 'length_mm' => 100, 'width_mm' => 10, 'height_mm' => 100, 'is_active' => 1],
            ['id' => 38, 'sku' => 'SKU-SPRAYFEMININ', 'slug' => 'puranusa-feminin-spray', 'name' => 'PURANUSA - Feminin Spray', 'short_desc' => 'Perisai Alami dari Sirih dan Manjakani: Kepercayaan Diri yang Murni', 'long_desc' => 'Ekstrak Daun Sirih & Manjakani: Pusaka turun-temurun. Bertindak sebagai agen pembersih dan antibakteri alami untuk menjaga keseimbangan area kewanitaan.\nCentella Asiatica Extract: Memberikan efek menenangkan, merawat kulit sensitif, dan menjaga kelembaban area intimate.\nNiacinamide & Gliserin: Terutama dalam wash, membantu menjaga kelembutan dan tampilan kulit, serta mencegah kulit kering.', 'brand' => 'PURANUSA - Feminin Spray', 'warranty_months' => null, 'base_price' => 50000.00, 'currency' => 'IDR', 'stock' => 256, 'weight_gram' => 10, 'length_mm' => 100, 'width_mm' => 10, 'height_mm' => 100, 'is_active' => 1],
            ['id' => 39, 'sku' => 'SKU-THERATRPHEARTZ', 'slug' => '3-in-1-terahertz-foot-therapy', 'name' => '3 in 1 Terahertz - Foot Therapy', 'short_desc' => '3 in 1 Terahertz High Potential Electro Foot Meridian Electric Massage Therapy with Red Light Therapy Custom Terahertz Device', 'long_desc' => 'Boosts Metabolism, Promote blood circulation, Activate Cells & Energy\nRegulates body temperature, Elimates toxins and waste, Remove cold and dampness, Burns fat & shapes the body, Unclogging the foot meridians, \nRelieves inflammation and pain, Relax and relieve fatigue, improve sleep\nAids in regulating the stomach and intestines, antipyretic and antibacterial', 'brand' => '3 in 1 Terahertz - Puranusa', 'warranty_months' => 3, 'base_price' => 5000000.00, 'currency' => 'IDR', 'stock' => 100, 'weight_gram' => 3500, 'length_mm' => 400, 'width_mm' => 267, 'height_mm' => 460, 'is_active' => 1],
            ['id' => 40, 'sku' => 'SKU-INFRAREDPADS', 'slug' => 'infrared-knee-pads', 'name' => 'Far Infrared Knee Pads - Tourmaline Self-heating', 'short_desc' => 'Tourmaline Self-heating Knee Wrap Far Infrared Knee Pads Magnetic Knee Brace for Arthritis, Joint Pain Relief', 'long_desc' => 'Material\nTourmaline & 8 magnet & neoprene composite fabric\n✅ Improve blood circulation effectively,\n✅ Relieve knee muscle fatigue,\n✅ Promote metabolism,\n✅ Product safety and easy to use, durable,\n✅ Releasing fatigue and easing pain,\nMagnetic energy tourmaline knee brace pads, using nano-functional ceramic powder and special thermal induction materials Composite, the heat-sensitive material releases heat when stimulated by body temperature. Temperature can be reached at 40℃(104 °F), the far-infrared anion penetrates deep into the skin and promotes blood under the increase of thermal energy. Circulate, activate cells, promote body metabolism, regulate nervous system, activate endocrine, and relieve pain cold protection, obvious effect on arthritis and joint pain.', 'brand' => 'Puranusa Knee Pads', 'warranty_months' => 1, 'base_price' => 750000.00, 'currency' => 'IDR', 'stock' => 100, 'weight_gram' => 250, 'length_mm' => 100, 'width_mm' => 50, 'height_mm' => 100, 'is_active' => 1],
            ['id' => 41, 'sku' => 'SKU-WAISTTOURMALINE', 'slug' => 'nano-tech-lumbar-waist-brace', 'name' => 'Nano-tech Lumbar Waist Brace Tourmaline', 'short_desc' => 'Nano-tech Self-Heating Lumbar Waist Brace Tourmaline Waist Belt with Magnetic Therapy Made of Neoprene Polyester for Health Care', 'long_desc' => 'Product Function\n\n✅Magnetic energy tourmaline Waist support belt, using nano-functional ceramic powder and special thermal induction materials Composite, the heat-sensitive material releases heat when stimulated by body temperature.Combined with the magnetic therapy of 16 piece magnets, temperature can be reached at 40℃(104 °F), the far-infrared penetrates deep into the skin and promotes blood circulation under the increase of thermal energy. Circulate blood, activate cells, promote body metabolism, adjust nervous system, activate endocrine, and relieve pain and cold protection, significant effect on lumbar discomfort such as low back pain and disc herniation.', 'brand' => 'Puranusa Waist Brace', 'warranty_months' => 1, 'base_price' => 1000000.00, 'currency' => 'IDR', 'stock' => 100, 'weight_gram' => 1500, 'length_mm' => 300, 'width_mm' => 100, 'height_mm' => 500, 'is_active' => 1],
        ];

        foreach ($productsData as $productData) {
            Product::create($productData);
        }
    }

    /**
     * Seed product media records.
     */
    protected function seedProductMedia(): void
    {
        $productMediaData = [
            ['id' => 1, 'product_id' => 1, 'url' => 'images/products/01K7EAZB04W3JCW0413WXKMY5H.png', 'type' => 'image', 'alt_text' => 'Asperiores Adipisci Excepturi Quos Quia Expedita Soluta. Image 1', 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 4, 'product_id' => 2, 'url' => 'images/products/01K7EB9WY51RKWNBX5N953T75K.png', 'type' => 'image', 'alt_text' => 'Sed Voluptatem Deleniti Vel In Nulla Sunt Ut. Image 1', 'sort_order' => 2, 'is_primary' => 1],
            ['id' => 32, 'product_id' => 2, 'url' => 'images/products/01K7EB9WY97AHATTRHRABTMCA4.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 3, 'is_primary' => 0],
            ['id' => 7, 'product_id' => 3, 'url' => 'images/products/01K7EBM5EE47RCSY7TPFBYQY9Z.png', 'type' => 'image', 'alt_text' => 'Vero Culpa Atque Exercitationem Molestias Necessitatibus. Image 1', 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 33, 'product_id' => 3, 'url' => 'images/products/01K7EBM5EKWXFVSR9D69D0G7JZ.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 34, 'product_id' => 13, 'url' => 'images/products/01K7EPYHWXYMCM8XBR0HZ9Y9P4.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 35, 'product_id' => 13, 'url' => 'images/products/01K7EPYHXATJD3F5FR1HCZSZW6.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 49, 'product_id' => 28, 'url' => 'images/products/01K7EVET11FRQTQ00XMNT6PMFE.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 50, 'product_id' => 28, 'url' => 'images/products/01K7EVET144HD8DKF5PJBBAXYB.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 0, 'is_primary' => 0],
            ['id' => 38, 'product_id' => 29, 'url' => 'images/products/01K7P869M4VDSQ76BH7JJ1N4KQ.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 40, 'product_id' => 30, 'url' => 'images/products/01K8Q00T5VBEMM48K868VA9QED.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 43, 'product_id' => 31, 'url' => 'images/products/01K7ESDDFZ2F0S9RJZGEWJ43AQ.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 44, 'product_id' => 31, 'url' => 'images/products/01K7ESDDG1JJ16Q2GYVE0YR4AD.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 45, 'product_id' => 31, 'url' => 'images/products/01K7ESDDG35V0EFKWD5Z194HYS.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 3, 'is_primary' => 0],
            ['id' => 46, 'product_id' => 31, 'url' => 'images/products/01K7ESDDG4HR1CVMA8RH0H4ZP7.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 4, 'is_primary' => 0],
            ['id' => 29, 'product_id' => 32, 'url' => 'images/products/01K7P6A8BZ7PXK98ZMEWBVV9B2.png', 'type' => 'image', 'alt_text' => 'Commodi Non Dolores Rem Velit Et Deleniti Accusantium. Image 2', 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 47, 'product_id' => 33, 'url' => 'images/products/01K7P54ZZ1SFZAXX7D3HQFVJF1.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 48, 'product_id' => 34, 'url' => 'images/products/01K7EV63T7K3E6F060835MN2D3.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 51, 'product_id' => 35, 'url' => 'images/products/01K7EVV5VAAMB7FV6VS32R449Z.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 52, 'product_id' => 36, 'url' => 'images/products/01K7F175WKM51Y72A6JWGDV18Z.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 53, 'product_id' => 37, 'url' => 'images/products/01K7F21A22MKAZ2HMEGQ3AG1R1.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 54, 'product_id' => 38, 'url' => 'images/products/01K7F2B256VJ7ZPHQY0XP95X01.png', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 57, 'product_id' => 39, 'url' => 'images/products/01K7F4YRSKH52BN476KJ12BXR1.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 56, 'product_id' => 39, 'url' => 'images/products/01K7F4YRSGXQ0C9HWJ13NXESKQ.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 58, 'product_id' => 39, 'url' => 'images/products/01K7F4YRSN4MXJXE4HK1JZC296.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 3, 'is_primary' => 0],
            ['id' => 59, 'product_id' => 40, 'url' => 'images/products/01K7P9EA2Z8BB00XJ7B7SS4DSB.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 0, 'is_primary' => 1],
            ['id' => 60, 'product_id' => 40, 'url' => 'images/products/01K7P9EA31ES8WN84FJ976570B.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 61, 'product_id' => 40, 'url' => 'images/products/01K7P9EA33WKKVMSXBK1R57X3D.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 3, 'is_primary' => 0],
            ['id' => 62, 'product_id' => 41, 'url' => 'images/products/01K7PA3ZZH8JVG1E6ZYTPN03RR.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 1, 'is_primary' => 1],
            ['id' => 63, 'product_id' => 41, 'url' => 'images/products/01K7PA3ZZJ7YFXA3QBP8T3GNQ6.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
            ['id' => 64, 'product_id' => 41, 'url' => 'images/products/01K7PA3ZZMXD4GPA4N43XE3X4Y.jpg', 'type' => 'image', 'alt_text' => null, 'sort_order' => 2, 'is_primary' => 0],
        ];

        foreach ($productMediaData as $mediaData) {
            ProductMedia::create($mediaData);
        }
    }

    /**
     * Seed product categories pivot records.
     */
    protected function seedProductCategories(): void
    {
        $productCategoriesData = [
            ['product_id' => 1, 'category_id' => 3],
            ['product_id' => 1, 'category_id' => 2],
            ['product_id' => 2, 'category_id' => 3],
            ['product_id' => 2, 'category_id' => 4],
            ['product_id' => 3, 'category_id' => 4],
            ['product_id' => 3, 'category_id' => 2],
            ['product_id' => 13, 'category_id' => 3],
            ['product_id' => 13, 'category_id' => 2],
            ['product_id' => 28, 'category_id' => 2],
            ['product_id' => 28, 'category_id' => 1],
            ['product_id' => 29, 'category_id' => 3],
            ['product_id' => 30, 'category_id' => 1],
            ['product_id' => 31, 'category_id' => 1],
            ['product_id' => 31, 'category_id' => 3],
            ['product_id' => 32, 'category_id' => 3],
            ['product_id' => 32, 'category_id' => 1],
            ['product_id' => 33, 'category_id' => 3],
            ['product_id' => 33, 'category_id' => 1],
            ['product_id' => 34, 'category_id' => 3],
            ['product_id' => 34, 'category_id' => 1],
            ['product_id' => 35, 'category_id' => 3],
            ['product_id' => 35, 'category_id' => 1],
            ['product_id' => 36, 'category_id' => 2],
            ['product_id' => 36, 'category_id' => 3],
            ['product_id' => 37, 'category_id' => 2],
            ['product_id' => 37, 'category_id' => 3],
            ['product_id' => 38, 'category_id' => 2],
            ['product_id' => 38, 'category_id' => 3],
            ['product_id' => 39, 'category_id' => 1],
            ['product_id' => 39, 'category_id' => 3],
            ['product_id' => 40, 'category_id' => 4],
            ['product_id' => 40, 'category_id' => 1],
            ['product_id' => 41, 'category_id' => 4],
            ['product_id' => 41, 'category_id' => 1],
        ];

        foreach ($productCategoriesData as $pcData) {
            \DB::table('product_categories')->insert($pcData);
        }
    }

    /**
     * Seed payment methods.
     */
    protected function seedPaymentMethods(): void
    {
        $paymentMethods = [
            ['code' => 'bank_transfer', 'name' => 'Transfer Bank'],
            ['code' => 'bca', 'name' => 'BCA Virtual Account'],
            ['code' => 'mandiri', 'name' => 'Mandiri Virtual Account'],
            ['code' => 'bni', 'name' => 'BNI Virtual Account'],
            ['code' => 'gopay', 'name' => 'GoPay'],
            ['code' => 'ovo', 'name' => 'OVO'],
            ['code' => 'dana', 'name' => 'DANA'],
            ['code' => 'shopeepay', 'name' => 'ShopeePay'],
            ['code' => 'qris', 'name' => 'QRIS'],
            ['code' => 'cod', 'name' => 'Cash on Delivery'],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::create($method);
        }
    }

    /**
     * Seed application settings.
     */
    protected function seedSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'PURANUSA', 'type' => 'string', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Platform E-commerce MLM Terpercaya', 'type' => 'string', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'string', 'group' => 'general'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/@puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'payment_methods', 'value' => json_encode(['VISA', 'Mastercard', 'GoPay', 'OVO', 'DANA']), 'type' => 'json', 'group' => 'payment'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }

    /**
     * Seed customers with MLM network.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Customer>
     */
    protected function seedCustomers(): \Illuminate\Database\Eloquent\Collection
    {
        return Customer::factory(20)->create();
    }

    /**
     * Seed customer addresses.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedCustomerAddresses(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        foreach ($customers as $customer) {
            CustomerAddress::factory(rand(1, 3))->create([
                'customer_id' => $customer->id,
                'is_default' => false,
            ]);

            // Set one as default
            $customer->addresses()->first()->update(['is_default' => true]);
        }
    }

    /**
     * Seed customer wishlists.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedCustomerWishlists(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $products = Product::all();

        foreach ($customers as $customer) {
            $wishlist = Wishlist::factory()->create([
                'customer_id' => $customer->id,
            ]);

            // Wishlist Items (0-5 per wishlist)
            if (rand(0, 1)) {
                foreach ($products->random(rand(1, 5)) as $product) {
                    WishlistItem::factory()->create([
                        'wishlist_id' => $wishlist->id,
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_sku' => $product->sku,
                    ]);
                }
            }
        }
    }

    /**
     * Seed MLM network structure (Binary Tree).
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedCustomerNetwork(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        // MLM Network Structure (Binary Tree) - Simple version without factory
        $rootCustomer = $customers->first();
        CustomerNetwork::create([
            'member_id' => $rootCustomer->id,
            'upline_id' => null,
            'position' => 'left',
            'status' => true,
            'level' => 1,
        ]);

        // Build network tree
        $availableCustomers = $customers->skip(1);
        $currentLevel = collect([$rootCustomer]);

        foreach ($availableCustomers as $customer) {
            if ($currentLevel->isEmpty()) {
                break;
            }

            $upline = $currentLevel->shift();
            $uplineNetwork = CustomerNetwork::where('member_id', $upline->id)->first();
            $position = CustomerNetwork::where('upline_id', $upline->id)->count() == 0 ? 'left' : 'right';

            CustomerNetwork::create([
                'member_id' => $customer->id,
                'upline_id' => $upline->id,
                'position' => $position,
                'status' => true,
                'level' => ($uplineNetwork->level ?? 0) + 1,
            ]);

            if ($position == 'right') {
                $currentLevel->push($customer);
            }
        }
    }

    /**
     * Seed customer bonuses (Regular, Sponsor, Matching, Pairing).
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedCustomerBonuses(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        // MLM Bonuses - Simple creation without factory
        foreach ($customers->random(10) as $customer) {
            // Regular Bonus
            for ($i = 0; $i < rand(1, 3); $i++) {
                CustomerBonus::create([
                    'member_id' => $customer->id,
                    'amount' => rand(10000, 100000),
                    'index_value' => rand(5, 50),
                    'tax_netto' => rand(8000, 80000),
                    'tax_percent' => 20,
                    'tax_value' => rand(2000, 20000),
                    'status' => rand(0, 1),
                ]);
            }

            // Sponsor Bonus
            $network = CustomerNetwork::where('member_id', $customer->id)->first();
            if ($network && $network->upline_id) {
                for ($i = 0; $i < rand(1, 2); $i++) {
                    CustomerBonusSponsor::create([
                        'member_id' => $network->upline_id,
                        'from_member_id' => $customer->id,
                        'amount' => rand(5000, 50000),
                        'index_value' => rand(5, 30),
                        'status' => rand(0, 1),
                    ]);
                }
            }

            // Matching Bonus
            for ($i = 0; $i < rand(1, 2); $i++) {
                CustomerBonusMatching::create([
                    'member_id' => $customer->id,
                    'from_member_id' => $customers->random()->id,
                    'amount' => rand(3000, 30000),
                    'index_value' => rand(3, 20),
                    'level' => rand(1, 5),
                    'status' => rand(0, 1),
                ]);
            }

            // Pairing Bonus
            for ($i = 0; $i < rand(1, 2); $i++) {
                CustomerBonusPairing::create([
                    'member_id' => $customer->id,
                    'pair' => rand(1, 10),
                    'amount' => rand(10000, 100000),
                    'index_value' => rand(10, 50),
                    'status' => rand(0, 1),
                ]);
            }
        }
    }

    /**
     * Seed e-commerce data (orders, payments, shipments, returns, carts).
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedEcommerceData(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $this->seedCustomerWishlists($customers);
        $this->seedOrders($customers);
        $this->seedReturnsAndRefunds();
        $this->seedActiveCarts($customers);
        $this->seedPromotions();
    }

    /**
     * Seed orders with complete flow.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedOrders(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $products = Product::all();

        // Orders with complete flow
        foreach ($customers->random(15) as $customer) {
            $order = Order::factory()->create([
                'customer_id' => $customer->id,
                'shipping_address_id' => $customer->addresses()->where('is_default', true)->first()->id,
                'billing_address_id' => $customer->addresses()->where('is_default', true)->first()->id,
            ]);

            // Order Items (2-5 items per order)
            $orderProducts = $products->random(rand(2, 5));
            foreach ($orderProducts as $product) {
                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'name' => $product->name,
                    'sku' => $product->sku,
                ]);
            }

            // Recalculate order totals
            $itemsTotal = $order->items->sum('row_total');
            $order->update([
                'subtotal_amount' => $itemsTotal,
                'grand_total' => $itemsTotal + $order->shipping_amount + $order->tax_amount - $order->discount_amount,
            ]);

            // Payment
            $payment = Payment::factory()->create([
                'order_id' => $order->id,
                'method_id' => PaymentMethod::inRandomOrder()->first()->id,
                'amount' => $order->grand_total,
            ]);

            // Payment Transactions (1-3 per payment)
            PaymentTransaction::factory(rand(1, 3))->create([
                'payment_id' => $payment->id,
                'amount' => $payment->amount,
            ]);

            // Shipment (for paid orders)
            if ($payment->status === 'completed') {
                $this->seedShipmentForOrder($order);
            }
        }
    }

    /**
     * Seed shipment for a specific order.
     */
    protected function seedShipmentForOrder(Order $order): void
    {
        $shipment = Shipment::factory()->create([
            'order_id' => $order->id,
        ]);

        // Shipment Items
        foreach ($order->items as $orderItem) {
            ShipmentItem::factory()->create([
                'shipment_id' => $shipment->id,
                'order_item_id' => $orderItem->id,
                'qty' => $orderItem->qty,
            ]);
        }

        // Product Reviews (for delivered orders)
        if ($shipment->status === 'delivered') {
            foreach ($order->items->random(rand(1, 2)) as $orderItem) {
                ProductReview::factory()->create([
                    'customer_id' => $order->customer_id,
                    'product_id' => $orderItem->product_id,
                    'order_item_id' => $orderItem->id,
                    'is_verified_purchase' => true,
                ]);
            }
        }
    }

    /**
     * Seed returns and refunds for completed orders.
     */
    protected function seedReturnsAndRefunds(): void
    {
        // Returns & Refunds (for some completed orders)
        $completedOrders = Order::whereHas('payments', function ($q) {
            $q->where('status', 'completed');
        })->limit(3)->get();

        foreach ($completedOrders as $order) {
            $return = Returns::factory()->create([
                'order_id' => $order->id,
            ]);

            // Return Items (1-2 items from order)
            foreach ($order->items->random(rand(1, 2)) as $orderItem) {
                ReturnItem::factory()->create([
                    'return_id' => $return->id,
                    'order_item_id' => $orderItem->id,
                ]);
            }

            // Refund
            Refund::factory()->create([
                'order_id' => $order->id,
                'payment_id' => $order->payments->first()->id,
            ]);
        }
    }

    /**
     * Seed active shopping carts for customers.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, Customer>  $customers
     */
    protected function seedActiveCarts(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $products = Product::all();

        // Active Carts (for some customers)
        foreach ($customers->random(8) as $customer) {
            $cart = Cart::factory()->create([
                'customer_id' => $customer->id,
            ]);

            // Cart Items (1-4 items)
            $cartProducts = $products->random(rand(1, 4));
            foreach ($cartProducts as $product) {
                CartItem::factory()->create([
                    'cart_id' => $cart->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'unit_price' => $product->base_price,
                ]);
            }

            // Recalculate cart totals
            $cartTotal = $cart->items->sum('row_total');
            $cart->update([
                'subtotal_amount' => $cartTotal,
                'grand_total' => $cartTotal,
            ]);
        }
    }

    /**
     * Seed promotions with associated products.
     */
    protected function seedPromotions(): void
    {
        $products = Product::all();
        $promotions = Promotion::factory(5)->create();

        foreach ($promotions as $promotion) {
            foreach ($products->random(rand(3, 8)) as $product) {
                PromotionProduct::factory()->create([
                    'promotion_id' => $promotion->id,
                    'product_id' => $product->id,
                ]);
            }
        }
    }

    /**
     * Seed additional data (articles, newsletters, pages).
     */
    protected function seedAdditionalData(): void
    {
        // Articles with Content
        $articles = Article::factory(20)->create();

        foreach ($articles as $article) {
            ArticleContent::factory()->create([
                'article_id' => $article->id,
            ]);
        }

        // Newsletter Subscribers
        NewsletterSubscriber::factory(50)->create();

        // Settings
        $settings = [
            ['key' => 'site_name', 'value' => 'PURANUSA', 'type' => 'string', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Platform E-commerce MLM Terpercaya', 'type' => 'string', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'string', 'group' => 'general'],
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/@puranusa', 'type' => 'string', 'group' => 'social'],
            ['key' => 'payment_methods', 'value' => json_encode(['VISA', 'Mastercard', 'GoPay', 'OVO', 'DANA']), 'type' => 'json', 'group' => 'payment'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        }

        // Pages
        Page::factory(5)->create();
    }
}
