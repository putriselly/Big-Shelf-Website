let dataProduk = [];

const tabel = document.getElementById("tabel");
const filter = document.getElementById("filter");
const search = document.getElementById("search");
const jumlahBarang = document.getElementById("jumlahBarang");
const daftarKeranjang = document.getElementById("daftarKeranjang");
const subtotal = document.getElementById("subtotal");
const uangPembeli = document.getElementById("uangPembeli");
const uangKembalian = document.getElementById("uangKembalian");
const prosesPembayaran = document.getElementById("prosesPembayaran");

let keranjang = [];


fetch("produk.php")
    .then(response => response.json())
    .then(data => {
        console.log("Data produk dari database:", data);

        dataProduk = data;

        tampilkanProduk(dataProduk);
    })
    .catch(error => {
        console.log("Gagal mengambil data produk:", error);
    });


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
        const tambahkan = baris.insertCell();

        barang.textContent = data[i].nama_produk;
        kategori.textContent = data[i].nama_kategori;
        stok.textContent = data[i].stok;

        harga.textContent =
            "Rp." + Number(data[i].harga_jual).toLocaleString("id-ID");

        tambahkan.innerHTML = `
            <button class="btnTambah">
                tambah keranjang
            </button>
        `;

        const tombolTambah =
            tambahkan.querySelector(".btnTambah");

        tombolTambah.addEventListener("click", function() {
            tambahKeranjang(data[i]);
        });
    }
}


filter.addEventListener("change", function() {

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


function tambahKeranjang(produk) {

    let ditemukan = false;

    for (let i = 0; i < keranjang.length; i++) {

        if (keranjang[i].id_produk == produk.id_produk) {

            keranjang[i].jumlah++;

            ditemukan = true;
        }
    }

    if (ditemukan == false) {

        keranjang.push({
            id_produk: produk.id_produk,
            nama: produk.nama_produk,
            harga: Number(produk.harga_jual),
            jumlah: 1
        });
    }

    console.log("Isi keranjang:", keranjang);

    tampilkanKeranjang();
}


function tampilkanKeranjang() {

    daftarKeranjang.innerHTML = "";

    let totalBarang = 0;

    for (let i = 0; i < keranjang.length; i++) {

        totalBarang += keranjang[i].jumlah;

        const item = document.createElement("div");

        item.innerHTML = `
            <div class="keranjang-item">

                <div>
                    <strong>${keranjang[i].nama}</strong>

                    <div>
                        Rp.${keranjang[i].harga.toLocaleString("id-ID")}
                    </div>
                </div>

                <div class="qty-controls">

                    <button class="btnKurang">-</button>

                    <span>${keranjang[i].jumlah}</span>

                    <button class="btnTambahJumlah">+</button>

                </div>

            </div>
        `;

        daftarKeranjang.appendChild(item);

        const btnKurang =
            item.querySelector(".btnKurang");

        btnKurang.addEventListener("click", function() {
            kurangiJumlah(i);
        });


        const btnTambahJumlah =
            item.querySelector(".btnTambahJumlah");

        btnTambahJumlah.addEventListener("click", function() {
            tambahJumlah(i);
        });
    }

    jumlahBarang.textContent =
        totalBarang + " barang";

    hitungSubtotal();
}


function tambahJumlah(index) {

    keranjang[index].jumlah++;

    tampilkanKeranjang();
}


function kurangiJumlah(index) {

    if (keranjang[index].jumlah > 1) {

        keranjang[index].jumlah--;

    } else {

        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}


function hitungSubtotal() {

    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {

        total +=
            keranjang[i].harga *
            keranjang[i].jumlah;
    }

    console.log("Subtotal:", total);

    subtotal.textContent =
        "Rp" + total.toLocaleString("id-ID");

    return total;
}


uangPembeli.addEventListener("input", function() {

    const total = hitungSubtotal();

    const uang = Number(this.value);

    const kembalian = uang - total;

    if (kembalian >= 0) {

        uangKembalian.textContent =
            "Rp" + kembalian.toLocaleString("id-ID");

    } else {

        uangKembalian.textContent = "Rp0";
    }
});


prosesPembayaran.addEventListener("click", function() {

    const total = hitungSubtotal();

    const uang = Number(uangPembeli.value);

    if (keranjang.length == 0) {

        alert("Keranjang masih kosong!");

        return;
    }

    if (uang < total) {

        alert("Uang pembeli tidak cukup!");

        return;
    }

    const kembalian = uang - total;


    fetch("tambahtransaksi.php", {

        method: "POST",

        body: new URLSearchParams({

            total: total,

            uang_pembeli: uang,

            uang_kembalian: kembalian
        })
    })

    .then(response => response.text())

    .then(data => {

        console.log("ID transaksi:", data);

        const idTransaksi = data;


        for (let i = 0; i < keranjang.length; i++) {

            const subtotalItem =
                keranjang[i].harga *
                keranjang[i].jumlah;


            fetch("tambahdetailtransaksi.php", {

                method: "POST",

                body: new URLSearchParams({

                    id_transaksi: idTransaksi,

                    id_produk: keranjang[i].id_produk,

                    jumlah: keranjang[i].jumlah,

                    harga: keranjang[i].harga,

                    subtotal: subtotalItem
                })
            })

            .then(response => response.text())

            .then(data => {

                console.log("Detail:", data);

            })

            .catch(error => {

                console.log(
                    "Gagal menyimpan detail:",
                    error
                );

            });
        }
    });
});