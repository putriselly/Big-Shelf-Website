<?php

include "koneksi.php";

$nama_produk = $_POST["nama_produk"];
$id_kategori = $_POST["id_kategori"];
$harga_jual = $_POST["harga_jual"];
$harga_beli = $_POST["harga_beli"];
$stok = $_POST["stok"];

$query = "INSERT INTO produk
          (id_kategori, nama_produk, harga_jual, harga_beli, stok)
          VALUES
          ('$id_kategori', '$nama_produk', '$harga_jual', '$harga_beli', '$stok')";

$result = mysqli_query($koneksi, $query);

if ($result) {
    echo "Produk berhasil ditambahkan";
} else {
    echo "Gagal menambahkan produk: " . mysqli_error($koneksi);
}

?>