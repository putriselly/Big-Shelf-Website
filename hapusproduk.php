<?php

include "koneksi.php";

$id_produk = $_POST["id_produk"];

$query = "DELETE FROM produk
          WHERE id_produk = '$id_produk'";

$result = mysqli_query($koneksi, $query);

if ($result) {
    echo "Produk berhasil dihapus";
} else {
    echo "Gagal menghapus produk: " . mysqli_error($koneksi);
}

?>