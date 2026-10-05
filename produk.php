<?php

include "koneksi.php";

$query = "SELECT
            produk.id_produk,
            produk.nama_produk,
            kategori.nama_kategori,
            produk.harga_jual,
            produk.harga_beli,
            produk.stok
          FROM produk
          JOIN kategori
          ON produk.id_kategori = kategori.id_kategori";

$result = mysqli_query($koneksi, $query);

if (!$result) {
    die("Query gagal: " . mysqli_error($koneksi));
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

header("Content-Type: application/json");

echo json_encode($data);

?>