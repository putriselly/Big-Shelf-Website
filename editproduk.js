const namaProduk = document.getElementById("namaProduk");
const kategori = document.getElementById("kategori");
const hargaJual = document.getElementById("hargaJual");
const hargaBeli = document.getElementById("hargaBeli");
const stok = document.getElementById("stok");

const btnSimpan = document.getElementById("btnSimpan");
const btnBatal = document.getElementById("btnBatal");

const url = new URLSearchParams(window.location.search);
const idProduk = url.get("id");

console.log("ID produk:", idProduk);

fetch("ambilproduk.php?id=" + idProduk)
    .then(response => response.json())
    .then(data => {

        console.log("Data produk:", data);

        namaProduk.value = data.nama_produk;
        kategori.value = data.id_kategori;
        hargaJual.value = data.harga_jual;
        hargaBeli.value = data.harga_beli;
        stok.value = data.stok;

    })
    .catch(error => {
        console.log("Gagal mengambil data:", error);
    });

btnSimpan.addEventListener("click", function() {

    console.log("Tombol SIMPAN diklik");

    fetch("updateproduk.php", {
        method: "POST",
        body: new URLSearchParams({
            id_produk: idProduk,
            nama_produk: namaProduk.value,
            id_kategori: kategori.value,
            harga_jual: hargaJual.value,
            harga_beli: hargaBeli.value,
            stok: stok.value
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log("Respons PHP:", data);
        if (data == "Produk berhasil diperbarui") {
            window.location.href = "inventory.html";
        }
    })
    .catch(error => {
        console.log("Gagal:", error);
    });

});

btnBatal.addEventListener("click", function() {
    window.location.href = "inventory.html";
});