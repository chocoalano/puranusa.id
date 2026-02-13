<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessWhatsAppBroadcastJob;
use App\Jobs\SendWhatsAppBroadcastTestJob;
use App\Http\Requests\Admin\StoreWhatsAppBroadcastRequest;
use App\Http\Requests\Admin\UpdateWhatsAppBroadcastRequest;
use App\Models\Manage\Customer;
use App\Models\WhatsAppBroadcast;
use App\Models\WhatsAppBroadcastRecipient;
use App\Services\QontakService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class WhatsAppBroadcastController extends Controller
{
    public function index(Request $request)
    {
        $query = WhatsAppBroadcast::query()
            ->with('creator:id,name')
            ->withCount('recipients');

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('title', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%")
                    ->orWhere('template_id', 'like', "%{$search}%");
            });
        }

        $allowedStatuses = ['draft', 'processing', 'sent', 'partial', 'failed'];
        if ($request->filled('status') && in_array($request->input('status'), $allowedStatuses, true)) {
            $query->where('status', $request->input('status'));
        }

        $broadcasts = $query
            ->latest('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/WhatsAppBroadcasts/Index', [
            'broadcasts' => $broadcasts,
            'filters' => $request->only(['search', 'status']),
            'defaultTemplateId' => $this->resolveDefaultTemplateId(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/WhatsAppBroadcasts/Create', [
            'defaultTemplateId' => $this->resolveDefaultTemplateId(),
        ]);
    }

    public function store(StoreWhatsAppBroadcastRequest $request)
    {
        $broadcast = WhatsAppBroadcast::create([
            ...$request->validated(),
            'status' => 'draft',
            'created_by' => $request->user()?->id,
        ]);

        return redirect()
            ->route('admin.whatsapp-broadcasts.edit', $broadcast)
            ->with('success', 'Draft broadcast berhasil dibuat.');
    }

    public function edit(WhatsAppBroadcast $whatsappBroadcast)
    {
        $whatsappBroadcast->load('creator:id,name');
        $recipients = $whatsappBroadcast->recipients()
            ->latest('id')
            ->take(250)
            ->get();

        return Inertia::render('Admin/WhatsAppBroadcasts/Edit', [
            'broadcast' => $whatsappBroadcast,
            'recipients' => $recipients,
            'defaultTemplateId' => $this->resolveDefaultTemplateId(),
        ]);
    }

    public function update(UpdateWhatsAppBroadcastRequest $request, WhatsAppBroadcast $whatsappBroadcast)
    {
        if ($whatsappBroadcast->status === 'processing') {
            return redirect()
                ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
                ->with('error', 'Broadcast sedang diproses, tunggu hingga selesai.');
        }

        $whatsappBroadcast->update($request->validated());

        return redirect()
            ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
            ->with('success', 'Broadcast berhasil diperbarui.');
    }

    public function destroy(WhatsAppBroadcast $whatsappBroadcast)
    {
        if ($whatsappBroadcast->status === 'processing') {
            return redirect()
                ->route('admin.whatsapp-broadcasts.index')
                ->with('error', 'Broadcast sedang diproses dan tidak dapat dihapus.');
        }

        $whatsappBroadcast->delete();

        return redirect()
            ->route('admin.whatsapp-broadcasts.index')
            ->with('success', 'Riwayat broadcast berhasil dihapus.');
    }

    public function send(WhatsAppBroadcast $whatsappBroadcast, QontakService $qontakService)
    {
        if ($whatsappBroadcast->status === 'processing') {
            return redirect()
                ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
                ->with('error', 'Broadcast masih berjalan. Coba lagi setelah proses selesai.');
        }

        if (! config('services.qontak.api_token') || ! config('services.qontak.channel_integration_id')) {
            return redirect()
                ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
                ->with('error', 'Konfigurasi Qontak belum lengkap.');
        }

        $templateId = $this->resolveTemplateId($whatsappBroadcast->template_id);
        if ($templateId === '') {
            return redirect()
                ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
                ->with('error', 'Template ID WhatsApp belum diisi.');
        }

        $uniqueRecipients = $this->collectUniqueRecipients($qontakService);
        if ($uniqueRecipients->isEmpty()) {
            return redirect()
                ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
                ->with('error', 'Tidak ada nomor WhatsApp customer yang valid.');
        }

        DB::transaction(function () use ($whatsappBroadcast, $uniqueRecipients, $templateId) {
            $whatsappBroadcast->recipients()->delete();
            $whatsappBroadcast->update([
                'template_id' => $templateId,
                'status' => 'processing',
                'total_recipients' => $uniqueRecipients->count(),
                'success_recipients' => 0,
                'failed_recipients' => 0,
                'sent_at' => null,
                'last_error' => null,
            ]);

            $now = now();
            $rows = $uniqueRecipients->map(fn (array $recipient) => [
                'broadcast_id' => $whatsappBroadcast->id,
                'customer_id' => $recipient['customer_id'],
                'customer_name' => $recipient['customer_name'],
                'phone' => $recipient['phone'],
                'normalized_phone' => $recipient['normalized_phone'],
                'status' => 'pending',
                'response_message' => null,
                'sent_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ])->all();

            WhatsAppBroadcastRecipient::query()->insert($rows);
        });

        ProcessWhatsAppBroadcastJob::dispatch($whatsappBroadcast->id);

        return redirect()
            ->route('admin.whatsapp-broadcasts.edit', $whatsappBroadcast)
            ->with('success', 'Broadcast masuk antrean queue dan sedang diproses.');
    }

    public function testSend(Request $request, WhatsAppBroadcast $whatsappBroadcast, QontakService $qontakService)
    {
        $validator = Validator::make($request->all(), [
            'phone' => ['required', 'string', 'max:30'],
            'name' => ['nullable', 'string', 'max:120'],
            'template_id' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
        ], [
            'phone.required' => 'Nomor WhatsApp tujuan wajib diisi.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        if (! config('services.qontak.api_token') || ! config('services.qontak.channel_integration_id')) {
            return response()->json([
                'message' => 'Konfigurasi Qontak belum lengkap.',
            ], 422);
        }

        $templateId = $this->resolveTemplateId(
            $validated['template_id'] ?? null,
            $whatsappBroadcast->template_id
        );

        if ($templateId === '') {
            return response()->json([
                'message' => 'Template ID WhatsApp belum diisi.',
            ], 422);
        }

        $testMessage = trim((string) ($validated['message'] ?? $whatsappBroadcast->message));
        if ($testMessage === '') {
            return response()->json([
                'message' => 'Isi pesan test tidak boleh kosong.',
            ], 422);
        }

        $normalizedPhone = $qontakService->normalizePhoneNumber((string) $validated['phone']);
        if ($normalizedPhone === '') {
            return response()->json([
                'message' => 'Nomor WhatsApp tidak valid.',
            ], 422);
        }

        $toName = trim((string) ($validated['name'] ?? 'Pelanggan'));
        $resolvedName = $toName !== '' ? $toName : 'Pelanggan';

        SendWhatsAppBroadcastTestJob::dispatch(
            $resolvedName,
            $normalizedPhone,
            $templateId,
            $testMessage
        );

        return response()->json([
            'message' => "Test kirim masuk antrean queue untuk {$normalizedPhone}. Jalankan worker queue untuk memproses.",
            'queued' => true,
        ], 202);
    }

    public function testSendMultiple(Request $request, WhatsAppBroadcast $whatsappBroadcast, QontakService $qontakService)
    {
        $validator = Validator::make($request->all(), [
            'template_id' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'recipients' => ['required', 'array', 'min:1', 'max:50'],
            'recipients.*.name' => ['nullable', 'string', 'max:120'],
            'recipients.*.phone' => ['required', 'string', 'max:30'],
        ], [
            'recipients.required' => 'Daftar nomor tujuan wajib diisi.',
            'recipients.min' => 'Minimal satu nomor tujuan harus diisi.',
            'recipients.max' => 'Maksimal 50 nomor untuk sekali test.',
            'recipients.*.phone.required' => 'Nomor WhatsApp tujuan wajib diisi.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (! config('services.qontak.api_token') || ! config('services.qontak.channel_integration_id')) {
            return response()->json([
                'message' => 'Konfigurasi Qontak belum lengkap.',
            ], 422);
        }

        $validated = $validator->validated();

        $templateId = $this->resolveTemplateId(
            $validated['template_id'] ?? null,
            $whatsappBroadcast->template_id
        );

        if ($templateId === '') {
            return response()->json([
                'message' => 'Template ID WhatsApp belum diisi.',
            ], 422);
        }

        $testMessage = trim((string) ($validated['message'] ?? $whatsappBroadcast->message));
        if ($testMessage === '') {
            return response()->json([
                'message' => 'Isi pesan test tidak boleh kosong.',
            ], 422);
        }

        $errors = [];
        $queuedRecipients = [];
        $seenPhones = [];
        $duplicateCount = 0;

        foreach ($validated['recipients'] as $index => $recipient) {
            $normalizedPhone = $qontakService->normalizePhoneNumber((string) $recipient['phone']);
            if ($normalizedPhone === '') {
                $errors["recipients.{$index}.phone"] = ['Nomor WhatsApp tidak valid.'];
                continue;
            }

            if (isset($seenPhones[$normalizedPhone])) {
                $duplicateCount++;
                continue;
            }

            $seenPhones[$normalizedPhone] = true;

            $recipientName = trim((string) ($recipient['name'] ?? ''));
            $queuedRecipients[] = [
                'name' => $recipientName !== '' ? $recipientName : 'Pelanggan',
                'phone' => $normalizedPhone,
            ];
        }

        if (! empty($errors)) {
            return response()->json([
                'message' => 'Beberapa nomor tidak valid. Periksa kembali form.',
                'errors' => $errors,
            ], 422);
        }

        if (empty($queuedRecipients)) {
            return response()->json([
                'message' => 'Tidak ada nomor unik yang valid untuk diproses.',
            ], 422);
        }

        foreach ($queuedRecipients as $recipient) {
            SendWhatsAppBroadcastTestJob::dispatch(
                $recipient['name'],
                $recipient['phone'],
                $templateId,
                $testMessage
            );
        }

        return response()->json([
            'message' => "Test kirim ke {$this->formatCount(count($queuedRecipients), 'nomor')} masuk antrean queue.",
            'queued' => true,
            'queued_count' => count($queuedRecipients),
            'duplicates_skipped' => $duplicateCount,
        ], 202);
    }

    protected function resolveTemplateId(?string ...$candidates): string
    {
        foreach ($candidates as $candidate) {
            $value = trim((string) $candidate);
            if ($value !== '') {
                return $value;
            }
        }

        return $this->resolveDefaultTemplateId();
    }

    protected function resolveDefaultTemplateId(): string
    {
        $broadcastTemplate = trim((string) config('services.qontak.broadcast_template_id'));
        if ($broadcastTemplate !== '') {
            return $broadcastTemplate;
        }

        return trim((string) config('services.qontak.wd_approved_template_id'));
    }

    protected function formatCount(int $count, string $label): string
    {
        return "{$count} {$label}";
    }

    protected function collectUniqueRecipients(QontakService $qontakService): Collection
    {
        $uniqueRecipients = [];

        Customer::query()
            ->select(['id', 'name', 'phone'])
            ->whereNotNull('phone')
            ->where('phone', '!=', '')
            ->orderBy('id')
            ->chunk(200, function ($customers) use (&$uniqueRecipients, $qontakService) {
                foreach ($customers as $customer) {
                    $normalizedPhone = $qontakService->normalizePhoneNumber((string) $customer->phone);
                    if ($normalizedPhone === '') {
                        continue;
                    }

                    if (isset($uniqueRecipients[$normalizedPhone])) {
                        continue;
                    }

                    $uniqueRecipients[$normalizedPhone] = [
                        'customer_id' => $customer->id,
                        'customer_name' => $customer->name,
                        'phone' => (string) $customer->phone,
                        'normalized_phone' => $normalizedPhone,
                    ];
                }
            });

        return collect(array_values($uniqueRecipients));
    }
}
