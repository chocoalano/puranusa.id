<?php
/**
 * Clear OPcache Script
 * Access this file via browser to clear OPcache: https://preview.puranusa.id/clear-opcache.php
 * Remember to delete this file after use for security!
 */

// Simple password protection
$password = 'clear-cache-2025'; // Change this!
$input = $_GET['password'] ?? '';

if ($input !== $password) {
    http_response_code(403);
    die('Access denied. Provide correct password as ?password=xxx');
}

$results = [];

// Clear OPcache
if (function_exists('opcache_reset')) {
    if (opcache_reset()) {
        $results[] = '✅ OPcache cleared successfully';
    } else {
        $results[] = '❌ Failed to clear OPcache';
    }
} else {
    $results[] = '⚠️ OPcache is not enabled';
}

// Clear realpath cache
clearstatcache(true);
$results[] = '✅ Realpath cache cleared';

// Check if Laravel bootstrap cache exists
$bootstrapCache = __DIR__ . '/../bootstrap/cache';
if (is_dir($bootstrapCache)) {
    $files = glob($bootstrapCache . '/*.php');
    foreach ($files as $file) {
        if (unlink($file)) {
            $results[] = '✅ Deleted: ' . basename($file);
        }
    }
}

echo '<h1>Cache Clear Results</h1>';
echo '<ul>';
foreach ($results as $result) {
    echo '<li>' . htmlspecialchars($result) . '</li>';
}
echo '</ul>';
echo '<p><strong>Remember to delete this file after use!</strong></p>';
echo '<p>Run these commands on the server:</p>';
echo '<pre>';
echo "cd /var/www/vhosts/puranusa.id/preview.puranusa.id\n";
echo "php artisan optimize:clear\n";
echo "php artisan config:cache\n";
echo "php artisan route:cache\n";
echo "sudo systemctl restart php8.3-fpm  # or your PHP-FPM service\n";
echo '</pre>';
