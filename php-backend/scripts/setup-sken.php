<?php
/**
 * Script Setup Sken Malang
 * Menjalankan migrasi schema dan seeding data awal
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/load-env.php';
require_once __DIR__ . '/../config/config.php';

use App\Database;

$db = Database::getInstance();

echo "🚀 Memulai Setup Sken Malang...\n";

// 1. Jalankan Schema
echo "📄 Menjalankan Schema...\n";
$schema = file_get_contents(__DIR__ . '/../database/schema.sql');
$db->getPdo()->exec($schema);
echo "✅ Schema berhasil.\n";

// 2. Jalankan Seed Komprehensif Sken Malang
echo "🏨 Menjalankan Seed Sken Malang...\n";
$seedSken = file_get_contents(__DIR__ . '/../database/seed_sken_malang.sql');
$db->getPdo()->exec($seedSken);
echo "✅ Seed Sken Malang berhasil.\n";

echo "🎉 Setup selesai! Anda sekarang bisa login dengan:\n";
echo "📧 Email: admin@skenmalang.com\n";
echo "🔑 Password: admin123\n";

