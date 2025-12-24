-- Seed Data Komprehensif untuk Sken Malang
SET FOREIGN_KEY_CHECKS = 0;

-- 1. USER ADMIN (Pass: admin123)
INSERT INTO `User` (`id`, `email`, `password`, `name`, `role`) VALUES
('user-admin-1', 'admin@skenmalang.com', '$2y$10$UrKbwL5F9sQPVJl5N4w.EONZvBDx6CH3ZO08FxrYIq4Fnr3S.5UaG', 'Admin Sken', 'admin')
ON DUPLICATE KEY UPDATE `password` = VALUES(`password`);

-- 2. SETTINGS
INSERT INTO `Setting` (`id`, `key`, `value`, `group`) VALUES
('set-1', 'website_title', 'Sken Malang', 'general'),
('set-2', 'website_tagline', 'Sewa Kasur Malang Murah & Berkualitas', 'general'),
('set-3', 'website_logo', '/uploads/logo.png', 'general'),
('set-4', 'footer_email', 'hello@skenmalang.com', 'general'),
('set-5', 'footer_phone', '081234567890', 'general'),
('set-6', 'show_website_name', 'true', 'general'),
('set-7', 'footer_address', 'Jl. Sukarno Hatta No. 1, Malang, Jawa Timur', 'general'),
('set-8', 'whatsapp_phone', '6281234567890', 'general'),
('set-9', 'whatsapp_message', 'Halo Sken Malang, saya ingin tanya stok kasur...', 'general'),
('set-10', 'enable_frontend', 'true', 'general');

-- 3. HERO SLIDER
INSERT INTO `Slider` (`id`, `title`, `subtitle`, `image`, `order`, `isActive`) VALUES
('slide-1', 'Tidur Nyenyak Ga Harus Mahal', 'Sewa kasur mulai dari 25rb per malam. Bersih, wangi, dan nyaman.', '/uploads/sliders/slider1.jpg', 1, 1),
('slide-2', 'Layanan Antar Jemput Malang Raya', 'Ga perlu repot, kami antar sampai depan pintu kos/rumah Anda.', '/uploads/sliders/slider2.jpg', 2, 1);

-- 4. HOME SECTIONS (Halaman Depan)
INSERT INTO `HomeSection` (`id`, `type`, `title`, `subtitle`, `content`, `order`, `isActive`) VALUES
('sec-1', 'about', 'Kenapa Pilih Sken Malang?', 'Solusi istirahat untuk mahasiswa dan traveler', 'Kami menyediakan kasur berkualitas dengan proses laundry yang ketat. Setiap kasur dipastikan bersih dan bebas tungau sebelum sampai ke tangan Anda.', 1, 1),
('sec-2', 'services', 'Layanan Kami', 'Lengkap dan Terpercaya', 'Penyewaan Kasur, Bantal, Guling, hingga Selimut untuk kebutuhan harian, mingguan, atau bulanan.', 2, 1);

-- 5. DATA KAMAR / KASUR (Post dengan postType='room')
-- Kita anggap 'room' adalah tipe kasur untuk sistem hotel simple ini
INSERT INTO `Post` (`id`, `title`, `slug`, `content`, `postType`, `status`, `authorId`, `order`) VALUES
('room-1', 'Kasur Single (90x200)', 'kasur-single', 'Kasur busa kualitas super, empuk dan tidak mudah kempes.', 'room', 'publish', 'user-admin-1', 1),
('room-2', 'Kasur Queen (160x200)', 'kasur-queen', 'Kasur ukuran besar cocok untuk 2 orang atau yang ingin space lebih.', 'room', 'publish', 'user-admin-1', 2),
('room-3', 'Kasur King (180x200)', 'kasur-king', 'Ukuran maksimal untuk kenyamanan maksimal.', 'room', 'publish', 'user-admin-1', 3);

-- 6. META DATA KASUR (Harga & Stok)
INSERT INTO `PostMeta` (`postId`, `metaKey`, `metaValue`) VALUES
('room-1', 'price', '25000'),
('room-1', 'capacity', '1'),
('room-1', 'amenities', 'Bantal, Sprei Bersih'),
('room-2', 'price', '45000'),
('room-2', 'capacity', '2'),
('room-2', 'amenities', '2 Bantal, Sprei Bersih'),
('room-3', 'price', '55000'),
('room-3', 'capacity', '2'),
('room-3', 'amenities', '2 Bantal, 1 Guling, Sprei Bersih');

-- 7. DATA DUMMY BOOKING (Input Masuk/Keluar Tamu)
-- Booking 1: Selesai (Sudah Keluar)
INSERT INTO `Booking` (`id`, `roomId`, `guestName`, `guestPhone`, `checkIn`, `checkOut`, `totalPrice`, `status`) VALUES
('book-old-1', 'room-1', 'Andi Mahasiswa', '081111111', '2025-12-20 10:00:00', '2025-12-22 10:00:00', 50000, 'checked_out');

-- Booking 2: Sedang Digunakan (Sudah Masuk)
INSERT INTO `Booking` (`id`, `roomId`, `guestName`, `guestPhone`, `checkIn`, `checkOut`, `totalPrice`, `status`) VALUES
('book-now-1', 'room-2', 'Budi Traveler', '082222222', '2025-12-23 14:00:00', '2025-12-26 12:00:00', 135000, 'checked_in');

-- Booking 3: Pesanan Mendatang (Belum Masuk)
INSERT INTO `Booking` (`id`, `roomId`, `guestName`, `guestPhone`, `checkIn`, `checkOut`, `totalPrice`, `status`) VALUES
('book-future-1', 'room-1', 'Citra Wisata', '083333333', '2025-12-27 09:00:00', '2025-12-29 09:00:00', 50000, 'booked');

-- 8. MENUS
INSERT INTO `Menu` (`id`, `title`, `slug`, `order`, `menuType`) VALUES
('menu-1', 'Beranda', '/', 1, 'link'),
('menu-2', 'Pilihan Kasur', '/kasur', 2, 'link'),
('menu-3', 'Tentang Kami', '/tentang', 3, 'link'),
('menu-4', 'Kontak', '/kontak', 4, 'link');

SET FOREIGN_KEY_CHECKS = 1;

