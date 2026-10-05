//+++++ HOME PAGE +++++//

const pendapatan = {
    hari: 500000,
    minggu: 1000000,
    bulan: 5000000
};

const transaksi = {
    hari: 50,
    minggu: 500,
    bulan: 1000
};

const produk = {
    unik: 10,
    stokRendah: 3
};

const totalPendapatan = document.getElementById("totalPendapatan");
const filterPendapatan = document.getElementById("filterPendapatan");

filterPendapatan.addEventListener("change", function() {

    if (this.value === "hari") {
        totalPendapatan.textContent =
            "Rp." + pendapatan.hari.toLocaleString("id-ID");
    }

    else if (this.value === "minggu") {
        totalPendapatan.textContent =
            "Rp." + pendapatan.minggu.toLocaleString("id-ID");
    }

    else {
        totalPendapatan.textContent =
            "Rp." + pendapatan.bulan.toLocaleString("id-ID");
    }

});

const jumlahTransaksi = document.getElementById("jumlahTransaksi");
const filterTransaksi = document.getElementById("filterTransaksi");

filterTransaksi.addEventListener("change", function() {

    if (this.value === "hari") {
        jumlahTransaksi.textContent =
            transaksi.hari.toLocaleString("id-ID");
    }

    else if (this.value === "minggu") {
        jumlahTransaksi.textContent =
            transaksi.minggu.toLocaleString("id-ID");
    }

    else {
        jumlahTransaksi.textContent =
            transaksi.bulan.toLocaleString("id-ID");
    }

});

const jumlahProduk = document.getElementById("jumlahProduk");
const infoStok = document.getElementById("infoStok");

jumlahProduk.textContent = produk.unik;

infoStok.textContent = produk.stokRendah + " stok kemeja di bawah 5";

const chartPendapatan = document.getElementById("chartPendapatan");

const filterChartPendapatan = document.getElementById("filterChartPendapatan");

const ctxPendapatan = chartPendapatan.getContext("2d");

filterChartPendapatan.addEventListener("change", function() {

    console.log(this.value);

});

const chartProdukTerjual = document.getElementById("chartProdukTerjual");

const ctxProdukTerjual = chartProdukTerjual.getContext("2d");

const tabelTransaksi = document.getElementById("tabelTransaksi");

const dataTransaksi = [
    {
        barang: "Kemeja",
        jumlah: 2,
        harga: 150000,
        waktu: "10:00"
    },
    {
        barang: "Celana",
        jumlah: 1,
        harga: 200000,
        waktu: "11:30"
    },
    {
        barang: "Jaket",
        jumlah: 3,
        harga: 350000,
        waktu: "13:15"
    }
];

for (let i = 0; i < dataTransaksi.length; i++) {

    const baris = tabelTransaksi.insertRow();

    const barang = baris.insertCell();
    const jumlah = baris.insertCell();
    const harga = baris.insertCell();
    const waktu = baris.insertCell();

    barang.textContent = dataTransaksi[i].barang;
    jumlah.textContent = dataTransaksi[i].jumlah;
    harga.textContent ="Rp." + dataTransaksi[i].harga.toLocaleString("id-ID");
    waktu.textContent = dataTransaksi[i].waktu;
}