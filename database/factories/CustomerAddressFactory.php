<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerAddress>
 */
class CustomerAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $provinces = [
            ['id' => 1, 'name' => 'Bali'],
            ['id' => 2, 'name' => 'Bangka Belitung'],
            ['id' => 3, 'name' => 'Banten'],
            ['id' => 4, 'name' => 'DKI Jakarta'],
            ['id' => 5, 'name' => 'Jawa Barat'],
            ['id' => 6, 'name' => 'Jawa Tengah'],
            ['id' => 7, 'name' => 'Jawa Timur'],
            ['id' => 8, 'name' => 'Kalimantan Barat'],
            ['id' => 9, 'name' => 'Sumatera Utara'],
            ['id' => 10, 'name' => 'Yogyakarta'],
        ];

        $cities = [
            'Jakarta Selatan', 'Jakarta Pusat', 'Bandung', 'Surabaya', 'Semarang',
            'Yogyakarta', 'Denpasar', 'Medan', 'Palembang', 'Makassar',
            'Tangerang', 'Depok', 'Bekasi', 'Bogor', 'Malang',
        ];

        $province = $this->faker->randomElement($provinces);
        $city = $this->faker->randomElement($cities);

        return [
            'customer_id' => \App\Models\Manage\Customer::factory(),
            'label' => $this->faker->randomElement(['Rumah', 'Kantor', 'Apartemen', 'Kos', 'Toko']),
            'is_default' => $this->faker->boolean(20),
            'recipient_name' => $this->faker->name(),
            'recipient_phone' => $this->faker->numerify('08##########'),
            'address_line1' => $this->faker->streetAddress(),
            'address_line2' => $this->faker->optional()->secondaryAddress(),
            'province_label' => $province['name'],
            'province_id' => $province['id'],
            'city_label' => $city,
            'city_id' => $this->faker->numberBetween(1, 501),
            'postal_code' => $this->faker->numerify('#####'),
            'country' => 'Indonesia',
            'description' => $this->faker->optional()->sentence(8),
        ];
    }

    public function defaultAddress(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_default' => true,
        ]);
    }
}
