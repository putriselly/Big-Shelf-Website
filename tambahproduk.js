const namaProduk = document.getElementById("namaProduk");
const kategori = document.getElementById("kategori");
const hargaJual = document.getElementById("hargaJual");
const hargaBeli = document.getElementById("hargaBeli");
const stok = document.getElementById("stok");

const btnSimpan = document.querySelector(".btn-simpan");
const btnBatal = document.querySelector(".btn-batal");

console.log("tambahproduk.js berhasil dijalankan");
console.log("Tombol simpan:", btnSimpan);

btnSimpan.addEventListener("click", function() {

    console.log("Tombol SIMPAN diklik");

    console.log("Nama:", namaProduk.value);
    console.log("Kategori:", kategori.value);
    console.log("Harga jual:", hargaJual.value);
    console.log("Harga beli:", hargaBeli.value);
    console.log("Stok:", stok.value);

    console.log("Data akan dikirim ke PHP");

    fetch("tambahproduk.php", {
        method: "POST",
        body: new URLSearchParams({
            nama_produk: namaProduk.value,
            id_kategori: kategori.value,
            harga_jual: hargaJual.value,
            harga_beli: hargaBeli.value,
            stok: stok.value
        })
    })
    .then(response => {
        console.log("PHP sudah merespons");
        return response.text();
    })
    .then(data => {
        console.log("Isi respons PHP:", data);
        if (data == "Produk berhasil ditambahkan") {
            namaProduk.value = "";
            kategori.value = "1";
            hargaJual.value = "";
            hargaBeli.value = "";
            stok.value = "";
        }
    })
    .catch(error => {
        console.log("Gagal:", error);
    });

});

btnBatal.addEventListener("click", function() {
    window.location.href = "inventory.html";
});