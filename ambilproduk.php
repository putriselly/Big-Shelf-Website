<?php

include "koneksi.php";

$id_produk = $_GET["id"];

$query = "SELECT
            id_produk,
            id_kategori,
            nama_produk,
            harga_jual,
            harga_beli,
            stok
          FROM produk
          WHERE id_produk = '$id_produk'";

$result = mysqli_query($koneksi, $query);

if (!$result) {
    die("Query gagal: " . mysqli_error($koneksi));
}

$data = mysqli_fetch_assoc($result);

header("Content-Type: application/json");

echo json_encode($data);

?>