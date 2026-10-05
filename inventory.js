const tabel = document.getElementById("tabel");
const Filter = document.getElementById("Filter");
const search = document.getElementById("search");

let dataProduk = [];

function tampilkanProduk(data) {

    while (tabel.rows.length > 1) {
        tabel.deleteRow(1);
    }

    for (let i = 0; i < data.length; i++) {

        const baris = tabel.insertRow();

        const barang = baris.insertCell();
        const kategori = baris.insertCell();
        const stok = baris.insertCell();
        const harga = baris.insertCell();
        const edit = baris.insertCell();

        barang.textContent = data[i].nama_produk;
        kategori.textContent = data[i].nama_kategori;
        stok.textContent = data[i].stok;

        harga.textContent =
            "Rp." + Number(data[i].harga_jual).toLocaleString("id-ID");

        edit.innerHTML = `
            <button onclick="window.location.href='editproduk.html?id=${data[i].id_produk}'">edit</button>
            <button onclick="hapusProduk(${data[i].id_produk})">hapus</button>
        `;
    }
}

fetch("produk.php")
    .then(response => response.json())
    .then(data => {

        dataProduk = data;

        console.log(dataProduk);

        tampilkanProduk(dataProduk);
    })
    .catch(error => {

        console.log("Gagal mengambil data:", error);

    });


Filter.addEventListener("change", function() {

    let hasil = [];

    for (let i = 0; i < dataProduk.length; i++) {

        if (
            this.value == "semua" ||
            dataProduk[i].nama_kategori == this.value
        ) {
            hasil.push(dataProduk[i]);
        }
    }

    tampilkanProduk(hasil);
});


search.addEventListener("input", function() {

    let hasil = [];

    for (let i = 0; i < dataProduk.length; i++) {

        if (
            dataProduk[i].nama_produk
                .toLowerCase()
                .includes(this.value.toLowerCase())
        ) {
            hasil.push(dataProduk[i]);
        }
    }

    tampilkanProduk(hasil);
});

function hapusProduk(idProduk) {

    fetch("hapusproduk.php", {
        method: "POST",
        body: new URLSearchParams({
            id_produk: idProduk
        })
    })
    .then(response => response.text())
    .then(data => {

        console.log("Respons hapus:", data);

        fetch("produk.php")
            .then(response => response.json())
            .then(data => {

                console.log("Data terbaru:", data);

                dataProduk = data;
                tampilkanProduk(dataProduk);

            })
            .catch(error => {
                console.log("Gagal mengambil data terbaru:", error);
            });

    })
    .catch(error => {
        console.log("Gagal menghapus:", error);
    });

}