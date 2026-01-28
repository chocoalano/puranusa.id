<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

class ReportController extends Controller
{
    public function analytic(Request $request)
    {
        // contoh ringkas analytic (opsional)
        $year = (int) ($request->integer('year') ?: now()->year);

        $summary = DB::table('vw_customer_bonus_pph21')
            ->selectRaw('tahun_pajak, COUNT(*) as total_rows, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21')
            ->where('tahun_pajak', $year)
            ->groupBy('tahun_pajak')
            ->first();

        return Inertia::render('Admin/Reports/Analytic', [
            'summary' => $summary,
            'filters' => [
                'year' => $year,
            ],
        ]);
    }

    public function analytic_export(Request $request)
    {
        $year = (int) ($request->integer('year') ?: now()->year);

        $summary = DB::table('vw_customer_bonus_pph21')
            ->selectRaw('tahun_pajak, COUNT(*) as total_rows, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21')
            ->where('tahun_pajak', $year)
            ->groupBy('tahun_pajak')
            ->first();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Analytic Report');

        // Header
        $sheet->setCellValue('A1', 'Laporan Analytic PPh21');
        $sheet->mergeCells('A1:D1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $sheet->setCellValue('A2', 'Tahun: ' . $year);
        $sheet->mergeCells('A2:D2');

        // Column headers
        $headers = ['Tahun Pajak', 'Total Transaksi', 'Total Bruto (Rp)', 'Total PPh21 (Rp)'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '4', $header);
            $sheet->getStyle($col . '4')->getFont()->setBold(true);
            $sheet->getStyle($col . '4')->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()->setRGB('4472C4');
            $sheet->getStyle($col . '4')->getFont()->getColor()->setRGB('FFFFFF');
            $col++;
        }

        // Data
        if ($summary) {
            $sheet->setCellValue('A5', $summary->tahun_pajak);
            $sheet->setCellValue('B5', $summary->total_rows);
            $sheet->setCellValue('C5', $summary->total_bruto);
            $sheet->setCellValue('D5', $summary->total_pph21);

            $sheet->getStyle('C5:D5')->getNumberFormat()
                ->setFormatCode('#,##0');
        }

        // Auto size columns
        foreach (range('A', 'D') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Borders
        $sheet->getStyle('A4:D5')->getBorders()->getAllBorders()
            ->setBorderStyle(Border::BORDER_THIN);

        $writer = new Xlsx($spreadsheet);
        $filename = 'analytic_report_' . $year . '_' . date('Ymd_His') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $filename);

        $writer->save($tempFile);

        return response()->download($tempFile, $filename)->deleteFileAfterSend(true);
    }

    public function tax_daily_report(Request $request)
    {
        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(5, min($perPage, 200));

        $search = trim((string) $request->input('q', ''));
        $year   = $request->filled('year') ? (int) $request->input('year') : null;
        $month  = $request->filled('month') ? (int) $request->input('month') : null;

        $sortBy  = (string) $request->input('sort_by', 'tanggal');
        $sortDir = strtolower((string) $request->input('sort_dir', 'desc')) === 'asc' ? 'asc' : 'desc';

        // whitelist sorting (anti SQL injection)
        $allowedSorts = ['tanggal', 'tahun_pajak', 'username', 'name', 'jumlah_bruto', 'pph21', 'tarif'];
        if (!in_array($sortBy, $allowedSorts, true)) {
            $sortBy = 'tanggal';
        }

        $query = DB::table('vw_customer_bonus_pph21');

        // filter tahun/bulan (daily report biasanya ada filter ini)
        if ($year) {
            $query->where('tahun_pajak', $year);
        }
        if ($month) {
            $query->whereMonth('tanggal', $month);
        }

        // search
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('no_telepon', 'like', "%{$search}%")
                  ->orWhere('npwp', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        $data = $query
            ->orderBy($sortBy, $sortDir)
            ->paginate($perPage)
            ->withQueryString(); // penting untuk inertia pagination + filter

        // parsing ringan (format angka/tanggal bisa juga dilakukan di Vue)
        $data->through(function ($row) {
            return [
                'id'          => $row->id,
                'tanggal'     => $row->tanggal,
                'tahun_pajak' => (int) $row->tahun_pajak,

                'username'    => $row->username,
                'name'        => $row->name,
                'fullname'    => $row->fullname,
                'email'       => $row->email,
                'no_telepon'  => $row->no_telepon,

                'npwp'        => $row->npwp,
                'nik'         => $row->nik,
                'alamat'      => $row->alamat,

                'jumlah_bruto'=> (float) $row->jumlah_bruto,
                'tarif'       => (float) $row->tarif,
                'pph21'       => (float) $row->pph21,
            ];
        });

        return Inertia::render('Admin/Reports/TaxDailyReport', [
            'data' => $data,
            'filters' => [
                'q' => $search,
                'year' => $year,
                'month' => $month,
                'per_page' => $perPage,
                'sort_by' => $sortBy,
                'sort_dir' => $sortDir,
            ],
        ]);
    }

    public function tax_daily_report_export(Request $request)
    {
        $search = trim((string) $request->input('q', ''));
        $year   = $request->filled('year') ? (int) $request->input('year') : null;
        $month  = $request->filled('month') ? (int) $request->input('month') : null;
        $sortBy  = (string) $request->input('sort_by', 'tanggal');
        $sortDir = strtolower((string) $request->input('sort_dir', 'desc')) === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['tanggal', 'tahun_pajak', 'username', 'name', 'jumlah_bruto', 'pph21', 'tarif'];
        if (!in_array($sortBy, $allowedSorts, true)) {
            $sortBy = 'tanggal';
        }

        $query = DB::table('vw_customer_bonus_pph21');

        if ($year) {
            $query->where('tahun_pajak', $year);
        }
        if ($month) {
            $query->whereMonth('tanggal', $month);
        }

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('no_telepon', 'like', "%{$search}%")
                  ->orWhere('npwp', 'like', "%{$search}%")
                  ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        $data = $query->orderBy($sortBy, $sortDir)->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Tax Daily Report');

        // Header
        $sheet->setCellValue('A1', 'Laporan Pajak Harian');
        $sheet->mergeCells('A1:M1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $filterInfo = 'Filter: ';
        $filterInfo .= $year ? 'Tahun ' . $year : 'Semua Tahun';
        $filterInfo .= $month ? ' - Bulan ' . $month : '';
        $filterInfo .= $search ? ' - Pencarian: ' . $search : '';

        $sheet->setCellValue('A2', $filterInfo);
        $sheet->mergeCells('A2:M2');

        // Column headers
        $headers = [
            'No', 'Tanggal', 'Tahun Pajak', 'Username', 'Nama',
            'Fullname', 'Email', 'No Telepon', 'NPWP', 'NIK',
            'Alamat', 'Jumlah Bruto (Rp)', 'Tarif (Rp)', 'PPh21 (Rp)'
        ];

        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '4', $header);
            $sheet->getStyle($col . '4')->getFont()->setBold(true);
            $sheet->getStyle($col . '4')->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()->setRGB('4472C4');
            $sheet->getStyle($col . '4')->getFont()->getColor()->setRGB('FFFFFF');
            $sheet->getStyle($col . '4')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $col++;
        }

        // Data
        $row = 5;
        $no = 1;
        foreach ($data as $item) {
            $sheet->setCellValue('A' . $row, $no++);
            $sheet->setCellValue('B' . $row, $item->tanggal);
            $sheet->setCellValue('C' . $row, $item->tahun_pajak);
            $sheet->setCellValue('D' . $row, $item->username);
            $sheet->setCellValue('E' . $row, $item->name);
            $sheet->setCellValue('F' . $row, $item->fullname);
            $sheet->setCellValue('G' . $row, $item->email);
            $sheet->setCellValue('H' . $row, $item->no_telepon);
            $sheet->setCellValue('I' . $row, $item->npwp);
            $sheet->setCellValue('J' . $row, $item->nik);
            $sheet->setCellValue('K' . $row, $item->alamat);
            $sheet->setCellValue('L' . $row, $item->jumlah_bruto);
            $sheet->setCellValue('M' . $row, $item->tarif);
            $sheet->setCellValue('N' . $row, $item->pph21);
            $row++;
        }

        // Number format for currency columns
        $lastRow = $row - 1;
        $sheet->getStyle('L5:N' . $lastRow)->getNumberFormat()
            ->setFormatCode('#,##0');

        // Auto size columns
        foreach (range('A', 'N') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Borders
        $sheet->getStyle('A4:N' . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(Border::BORDER_THIN);

        $writer = new Xlsx($spreadsheet);
        $filename = 'tax_daily_report_' . date('Ymd_His') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $filename);

        $writer->save($tempFile);

        return response()->download($tempFile, $filename)->deleteFileAfterSend(true);
    }

    public function tax_summary_report(Request $request)
    {
        // summary per tahun/bulan (default: per tahun)
        $perPage = (int) $request->integer('per_page', 15);
        $perPage = max(5, min($perPage, 200));

        $year  = $request->filled('year') ? (int) $request->input('year') : null;
        $group = (string) $request->input('group', 'year'); // year|month

        $query = DB::table('vw_customer_bonus_pph21');

        if ($year) {
            $query->where('tahun_pajak', $year);
        }

        if ($group === 'month') {
            $query->selectRaw('YEAR(tanggal) as tahun_pajak, MONTH(tanggal) as bulan, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21, COUNT(*) as total_transaksi')
                ->groupByRaw('YEAR(tanggal), MONTH(tanggal)')
                ->orderByRaw('YEAR(tanggal) DESC, MONTH(tanggal) DESC');
        } else {
            $query->selectRaw('tahun_pajak, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21, COUNT(*) as total_transaksi')
                ->groupBy('tahun_pajak')
                ->orderBy('tahun_pajak', 'desc');
        }

        $data = $query
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($row) use ($group) {
                return [
                    'tahun_pajak'     => (int) $row->tahun_pajak,
                    'bulan'           => $group === 'month' ? (int) $row->bulan : null,
                    'total_bruto'     => (float) $row->total_bruto,
                    'total_pph21'     => (float) $row->total_pph21,
                    'total_transaksi' => (int) $row->total_transaksi,
                ];
            });

        return Inertia::render('Admin/Reports/TaxSummaryReport', [
            'data' => $data,
            'filters' => [
                'year' => $year,
                'group' => $group,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function tax_summary_report_export(Request $request)
    {
        $year  = $request->filled('year') ? (int) $request->input('year') : null;
        $group = (string) $request->input('group', 'year');

        $query = DB::table('vw_customer_bonus_pph21');

        if ($year) {
            $query->where('tahun_pajak', $year);
        }

        if ($group === 'month') {
            $query->selectRaw('YEAR(tanggal) as tahun_pajak, MONTH(tanggal) as bulan, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21, COUNT(*) as total_transaksi')
                ->groupByRaw('YEAR(tanggal), MONTH(tanggal)')
                ->orderByRaw('YEAR(tanggal) DESC, MONTH(tanggal) DESC');
        } else {
            $query->selectRaw('tahun_pajak, SUM(jumlah_bruto) as total_bruto, SUM(pph21) as total_pph21, COUNT(*) as total_transaksi')
                ->groupBy('tahun_pajak')
                ->orderBy('tahun_pajak', 'desc');
        }

        $data = $query->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Tax Summary Report');

        // Header
        $sheet->setCellValue('A1', 'Laporan Pajak Ringkasan');
        $columnCount = $group === 'month' ? 'F' : 'E';
        $sheet->mergeCells('A1:' . $columnCount . '1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $filterInfo = 'Grouping: ' . ($group === 'month' ? 'Per Bulan' : 'Per Tahun');
        $filterInfo .= $year ? ' - Tahun ' . $year : ' - Semua Tahun';

        $sheet->setCellValue('A2', $filterInfo);
        $sheet->mergeCells('A2:' . $columnCount . '2');

        // Column headers
        $headers = ['No', 'Tahun Pajak'];
        if ($group === 'month') {
            $headers[] = 'Bulan';
        }
        $headers = array_merge($headers, ['Total Bruto (Rp)', 'Total PPh21 (Rp)', 'Total Transaksi']);

        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '4', $header);
            $sheet->getStyle($col . '4')->getFont()->setBold(true);
            $sheet->getStyle($col . '4')->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()->setRGB('4472C4');
            $sheet->getStyle($col . '4')->getFont()->getColor()->setRGB('FFFFFF');
            $sheet->getStyle($col . '4')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $col++;
        }

        // Month names
        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        // Data
        $row = 5;
        $no = 1;
        foreach ($data as $item) {
            $currentCol = 'A';
            $sheet->setCellValue($currentCol++ . $row, $no++);
            $sheet->setCellValue($currentCol++ . $row, $item->tahun_pajak);

            if ($group === 'month') {
                $bulan = isset($item->bulan) ? $monthNames[$item->bulan] ?? $item->bulan : '-';
                $sheet->setCellValue($currentCol++ . $row, $bulan);
            }

            $sheet->setCellValue($currentCol++ . $row, $item->total_bruto);
            $sheet->setCellValue($currentCol++ . $row, $item->total_pph21);
            $sheet->setCellValue($currentCol++ . $row, $item->total_transaksi);
            $row++;
        }

        // Number format for currency columns
        $lastRow = $row - 1;
        if ($group === 'month') {
            $sheet->getStyle('D5:E' . $lastRow)->getNumberFormat()
                ->setFormatCode('#,##0');
        } else {
            $sheet->getStyle('C5:D' . $lastRow)->getNumberFormat()
                ->setFormatCode('#,##0');
        }

        // Auto size columns
        foreach (range('A', $columnCount) as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Borders
        $sheet->getStyle('A4:' . $columnCount . $lastRow)->getBorders()->getAllBorders()
            ->setBorderStyle(Border::BORDER_THIN);

        $writer = new Xlsx($spreadsheet);
        $filename = 'tax_summary_report_' . ($group === 'month' ? 'monthly' : 'yearly') . '_' . date('Ymd_His') . '.xlsx';
        $tempFile = tempnam(sys_get_temp_dir(), $filename);

        $writer->save($tempFile);

        return response()->download($tempFile, $filename)->deleteFileAfterSend(true);
    }
}
