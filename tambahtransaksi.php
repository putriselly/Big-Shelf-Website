<?php

include "koneksi.php";

$total = $_POST["total"];
$uang_pembeli = $_POST["uang_pembeli"];
$uang_kembalian = $_POST["uang_kembalian"];

$query = "INSERT INTO transaksi
          (tanggal, total, uang_pembeli, uang_kembalian)
          VALUES
          (NOW(), '$total', '$uang_pembeli', '$uang_kembalian')";

$result = mysqli_query($koneksi, $query);

if ($result) {
    $id_transaksi = mysqli_insert_id($koneksi);
    echo $id_transaksi;
} else {
    echo "Gagal menyimpan transaksi: " . mysqli_error($koneksi);
}

?>