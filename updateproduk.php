<?php

include "koneksi.php";

$id_produk = $_POST["id_produk"];
$nama_produk = $_POST["nama_produk"];
$id_kategori = $_POST["id_kategori"];
$harga_jual = $_POST["harga_jual"];
$harga_beli = $_POST["harga_beli"];
$stok = $_POST["stok"];

$query = "UPDATE produk
          SET
              id_kategori = '$id_kategori',
              nama_produk = '$nama_produk',
              harga_jual = '$harga_jual',
              harga_beli = '$harga_beli',
              stok = '$stok'
          WHERE id_produk = '$id_produk'";

$result = mysqli_query($koneksi, $query);

if ($result) {
    echo "Produk berhasil diperbarui";
} else {
    echo "Gagal memperbarui produk: " . mysqli_error($koneksi);
}

?>