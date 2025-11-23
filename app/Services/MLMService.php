<?php

namespace App\Services;

use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonus;
use App\Models\Manage\CustomerBonusMatching;
use App\Models\Manage\CustomerBonusPairing;
use App\Models\Manage\CustomerBonusSponsor;
use App\Models\Manage\CustomerNetwork;
use App\Models\Manage\CustomerNetworkMatrix;
use Illuminate\Support\Facades\DB;

class MLMService
{
    /**
     * Register customer baru dengan placement otomatis ke binary tree dan matrix
     */
    public function registerCustomer(
        array $customerData,
        ?int $sponsorId = null,
        ?int $uplineId = null,
        ?string $preferredPosition = null
    ): Customer {
        return DB::transaction(function () use ($customerData, $sponsorId, $uplineId, $preferredPosition) {
            // Buat customer baru
            $customer = Customer::create($customerData);

            // Tambahkan ke matrix dengan sponsor
            CustomerNetworkMatrix::addToMatrix($customer->id, $sponsorId);

            // Placement ke binary tree
            if ($uplineId !== null) {
                CustomerNetwork::placeNewMember($customer->id, $uplineId, $preferredPosition);
            }

            return $customer;
        });
    }

    /**
     * Proses bonus sponsor untuk registrasi member baru
     */
    public function processSponsorBonusForNewMember(
        int $newMemberId,
        float $registrationAmount,
        float $sponsorPercentage = 10
    ): ?CustomerBonusSponsor {
        return CustomerBonusSponsor::distributeSponsorBonusFromRegistration(
            $newMemberId,
            $registrationAmount,
            $sponsorPercentage
        );
    }

    /**
     * Proses bonus matching dari transaksi
     */
    public function processMatchingBonus(
        int $fromMemberId,
        float $amount,
        int $maxLevel = 5,
        array $levelPercentages = []
    ): array {
        return CustomerBonusMatching::distributeMatchingBonus(
            $fromMemberId,
            $amount,
            $maxLevel,
            $levelPercentages
        );
    }

    /**
     * Hitung dan buat bonus pairing untuk member
     */
    public function processPairingBonus(
        int $memberId,
        float $bonusPerPair = 100000,
        ?int $maxPairs = null
    ): ?CustomerBonusPairing {
        return CustomerBonusPairing::createPairingBonus($memberId, $bonusPerPair, $maxPairs);
    }

    /**
     * Flush semua bonus pairing untuk periode tertentu
     */
    public function flushAllPairingBonuses(
        float $bonusPerPair = 100000,
        ?int $maxPairs = null,
        array $memberIds = []
    ): array {
        return CustomerBonusPairing::flushPairingBonus($memberIds, $bonusPerPair, $maxPairs);
    }

    /**
     * Release semua bonus pending untuk member tertentu
     */
    public function releaseAllPendingBonuses(int $memberId): array
    {
        $results = [
            'regular_bonus' => ['count' => 0, 'amount' => 0],
            'matching_bonus' => ['count' => 0, 'amount' => 0],
            'pairing_bonus' => ['count' => 0, 'amount' => 0],
            'sponsor_bonus' => ['count' => 0, 'amount' => 0],
            'total_amount' => 0,
            'errors' => [],
        ];

        DB::transaction(function () use ($memberId, &$results) {
            // Release regular bonuses
            $regularBonuses = CustomerBonus::where('member_id', $memberId)
                ->where('status', 0)
                ->get();

            foreach ($regularBonuses as $bonus) {
                try {
                    $bonus->release();
                    $results['regular_bonus']['count']++;
                    $results['regular_bonus']['amount'] += (float) ($bonus->tax_netto ?? 0);
                } catch (\Exception $e) {
                    $results['errors'][] = ['type' => 'regular', 'id' => $bonus->id, 'error' => $e->getMessage()];
                }
            }

            // Release matching bonuses
            $matchingBonuses = CustomerBonusMatching::where('member_id', $memberId)
                ->where('status', 0)
                ->get();

            foreach ($matchingBonuses as $bonus) {
                try {
                    $bonus->release();
                    $results['matching_bonus']['count']++;
                    $results['matching_bonus']['amount'] += (float) ($bonus->amount ?? 0);
                } catch (\Exception $e) {
                    $results['errors'][] = ['type' => 'matching', 'id' => $bonus->id, 'error' => $e->getMessage()];
                }
            }

            // Release pairing bonuses
            $pairingBonuses = CustomerBonusPairing::where('member_id', $memberId)
                ->where('status', 0)
                ->get();

            foreach ($pairingBonuses as $bonus) {
                try {
                    $bonus->release();
                    $results['pairing_bonus']['count']++;
                    $results['pairing_bonus']['amount'] += (float) ($bonus->amount ?? 0);
                } catch (\Exception $e) {
                    $results['errors'][] = ['type' => 'pairing', 'id' => $bonus->id, 'error' => $e->getMessage()];
                }
            }

            // Release sponsor bonuses
            $sponsorBonuses = CustomerBonusSponsor::where('member_id', $memberId)
                ->where('status', 0)
                ->get();

            foreach ($sponsorBonuses as $bonus) {
                try {
                    $bonus->release();
                    $results['sponsor_bonus']['count']++;
                    $results['sponsor_bonus']['amount'] += (float) ($bonus->amount ?? 0);
                } catch (\Exception $e) {
                    $results['errors'][] = ['type' => 'sponsor', 'id' => $bonus->id, 'error' => $e->getMessage()];
                }
            }

            $results['total_amount'] = $results['regular_bonus']['amount']
                + $results['matching_bonus']['amount']
                + $results['pairing_bonus']['amount']
                + $results['sponsor_bonus']['amount'];
        });

        return $results;
    }

    /**
     * Get complete network statistics untuk member
     */
    public function getNetworkStatistics(int $memberId): array
    {
        $customer = Customer::find($memberId);

        if (! $customer) {
            return [];
        }

        return [
            'member' => [
                'id' => $customer->id,
                'name' => $customer->name ?? '',
                'email' => $customer->email ?? '',
                'ewallet_id' => $customer->ewallet_id ?? null,
                'ewallet_saldo' => (float) ($customer->ewallet_saldo ?? 0),
            ],
            'binary_tree' => [
                'upline' => $customer->getUpline()?->only(['id', 'name', 'email']),
                'position' => $customer->networkPosition?->position,
                'level' => $customer->networkPosition?->level,
                'left_count' => $customer->countLeftNetwork(),
                'right_count' => $customer->countRightNetwork(),
                'total_downlines' => $customer->countLeftNetwork() + $customer->countRightNetwork(),
            ],
            'matrix' => [
                'sponsor' => $customer->getSponsor()?->only(['id', 'name', 'email']),
                'level' => $customer->matrixPosition?->level,
                'direct_downlines' => $customer->matrixDownlines()->count(),
                'total_downlines' => $customer->matrixPosition?->countTotalDownlines(),
            ],
            'bonuses' => [
                'total_released' => $customer->getTotalReleasedBonus(),
                'total_pending' => $customer->getTotalPendingBonus(),
                'breakdown' => [
                    'regular' => [
                        'released' => $customer->bonuses()->released()->sum('tax_netto'),
                        'pending' => $customer->bonuses()->pending()->sum('tax_netto'),
                    ],
                    'matching' => [
                        'released' => $customer->bonusMatchings()->released()->sum('amount'),
                        'pending' => $customer->bonusMatchings()->pending()->sum('amount'),
                    ],
                    'pairing' => [
                        'released' => $customer->bonusPairings()->released()->sum('amount'),
                        'pending' => $customer->bonusPairings()->pending()->sum('amount'),
                    ],
                    'sponsor' => [
                        'released' => $customer->bonusSponsors()->released()->sum('amount'),
                        'pending' => $customer->bonusSponsors()->pending()->sum('amount'),
                    ],
                ],
            ],
        ];
    }

    /**
     * Cari posisi tersedia untuk placement member baru
     */
    public function findAvailablePosition(?int $uplineId = null): ?array
    {
        return CustomerNetwork::findAvailablePosition($uplineId);
    }

    /**
     * Validasi apakah posisi masih tersedia
     */
    public function validatePlacement(int $uplineId, string $position): bool
    {
        return CustomerNetwork::validatePlacement($uplineId, $position);
    }

    /**
     * Get downline tree visualization data (untuk UI/chart)
     */
    public function getDownlineTree(int $memberId, int $maxLevel = 5): array
    {
        $customer = Customer::find($memberId);

        if (! $customer) {
            return [];
        }

        return $this->buildTreeRecursive($customer, 1, $maxLevel);
    }

    /**
     * Helper untuk build tree structure
     */
    private function buildTreeRecursive(Customer $customer, int $currentLevel, int $maxLevel): array
    {
        $node = [
            'id' => $customer->id,
            'name' => $customer->name ?? '',
            'email' => $customer->email ?? '',
            'ewallet_id' => $customer->ewallet_id ?? null,
            'level' => $currentLevel,
            'position' => $customer->networkPosition?->position ?? null,
            'children' => [],
        ];

        if ($currentLevel < $maxLevel) {
            if ($customer->leftDownline?->member) {
                $node['children']['left'] = $this->buildTreeRecursive(
                    $customer->leftDownline->member,
                    $currentLevel + 1,
                    $maxLevel
                );
            }

            if ($customer->rightDownline?->member) {
                $node['children']['right'] = $this->buildTreeRecursive(
                    $customer->rightDownline->member,
                    $currentLevel + 1,
                    $maxLevel
                );
            }
        }

        return $node;
    }

    /**
     * Proses complete registration flow dengan semua bonus
     */
    public function completeRegistrationFlow(
        array $customerData,
        ?int $sponsorId = null,
        ?int $uplineId = null,
        float $registrationAmount = 0,
        ?string $preferredPosition = null
    ): array {
        return DB::transaction(function () use ($customerData, $sponsorId, $uplineId, $registrationAmount, $preferredPosition) {
            // Register customer
            $customer = $this->registerCustomer($customerData, $sponsorId, $uplineId, $preferredPosition);

            $results = [
                'customer' => $customer,
                'bonuses' => [],
            ];

            // Proses bonus sponsor jika ada amount dan sponsor
            if ($registrationAmount > 0 && $sponsorId) {
                $sponsorBonus = $this->processSponsorBonusForNewMember(
                    $customer->id,
                    $registrationAmount
                );

                if ($sponsorBonus) {
                    $results['bonuses']['sponsor'] = $sponsorBonus;
                }
            }

            return $results;
        });
    }
}
