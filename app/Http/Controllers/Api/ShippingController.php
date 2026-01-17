<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RajaOngkirService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function __construct(
        protected RajaOngkirService $rajaOngkir
    ) {}

    /**
     * Get all provinces from RajaOngkir
     */
    public function provinces(): JsonResponse
    {
        $provinces = $this->rajaOngkir->getProvinces();

        return response()->json([
            'success' => true,
            'data' => $provinces,
        ]);
    }

    /**
     * Get cities by province ID
     */
    public function cities(Request $request): JsonResponse
    {
        $provinceId = $request->query('province_id');

        $cities = $this->rajaOngkir->getCities($provinceId);

        return response()->json([
            'success' => true,
            'data' => $cities,
        ]);
    }

    /**
     * Calculate shipping cost
     */
    public function calculateCost(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'destination_city_id' => 'required|integer',
            'weight' => 'required|integer|min:1',
            'courier' => 'nullable|string|in:jne,pos,tiki,rpx,pcp,emspost,sap',
        ]);

        $destinationDistrictId = $validated['destination_city_id'];
        $weight = $validated['weight'];
        $courier = $validated['courier'] ?? null;

        // Get origin from config or use default (1391 = Jakarta Pusat)
        $originDistrictId = config('services.rajaongkir.origin_district_id', 135);

        // Ensure it's an integer
        if (empty($originDistrictId) || ! is_numeric($originDistrictId)) {
            $originDistrictId = 1391; // Jakarta Pusat default
        } else {
            $originDistrictId = (int) $originDistrictId;
        }

        $results = [];

        if ($courier) {
            // Single courier
            $result = $this->rajaOngkir->getCost(
                $originDistrictId,
                $destinationDistrictId,
                $weight,
                $courier
            );

            if (! isset($result['error'])) {
                $results[] = $result;
            }
        } else {
            // Multiple couriers (jne, pos, tiki)
            $couriers = [
                'jne',
                'pos',
                'tiki',
                'jnt',
                'sicepat',
                'anteraja',
                'ninja',
                'idexpress',
                'rpx',
                'sap'
            ];

            // dd($originDistrictId, $destinationDistrictId, $weight);

            foreach ($couriers as $courierCode) {
                $result = $this->rajaOngkir->getCost(
                    $originDistrictId,
                    $destinationDistrictId,
                    $weight,
                    $courierCode
                );
                if (! isset($result['error'])) {
                    $results[] = $result;
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => $results,
        ]);
    }
}
