<?php
session_start();

$judul = trim($_POST['judul'] ?? '');
$pengarang = trim($_POST['pengarang'] ?? '');
$tahun = $_POST['tahun'] ?? '';
$isbn = trim($_POST['isbn'] ?? '');
$stok = $_POST['stok'] ?? '';
$kategori = trim($_POST['kategori'] ?? '');


$error = [];
if ($judul === '') {
    $errors[] = "Judul Wajib Diisi.";
}
if ($pengarang === '') {
    $errors[] = 'Pengarang Wajib Diisi.';
}
if (!is_numeric($tahun) || $tahun < 1900 || $tahun > 2026) {
    $errors[] = "Tahun harus di antara 1900-2026.";
}
if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: tambah.php');
    exit;
}

if (!isset($_SESSION['buku'])) {
    $_SESSION['buku'] = [];
}

$_SESSION['buku'] [] = [
    'judul' => $judul,
    'pengarang' => $pengarang,
    'tahun' => $tahun,
    'isbn' => $isbn,
    'stok' => (int) $stok,
    'kategori' => $kategori,
];

$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Buku Berhasil Ditambahkan'];
header('Location: list.php');
exit;