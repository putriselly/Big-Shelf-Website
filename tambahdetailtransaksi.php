<?php

include "koneksi.php";

$id_transaksi = $_POST["id_transaksi"];
$id_produk = $_POST["id_produk"];
$jumlah = $_POST["jumlah"];
$harga = $_POST["harga"];
$subtotal = $_POST["subtotal"];

$query = "INSERT INTO detail_transaksi
          (id_transaksi, id_produk, jumlah, harga, subtotal)
          VALUES
          ('$id_transaksi', '$id_produk', '$jumlah', '$harga', '$subtotal')";

$result = mysqli_query($koneksi, $query);

if ($result) {
    echo "Detail transaksi berhasil disimpan";
} else {
    echo "Gagal menyimpan detail transaksi: " . mysqli_error($koneksi);
}

?>