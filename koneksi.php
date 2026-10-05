<?php
$koneksi = mysqli_connect(
    "localhost",
    "root",
    "",
    "big_shelf"
);
if (!$koneksi) {
    die("Koneksi database gagal: " . mysqli_connect_error());
}
?>