const dataRiwayat = [
    {
        no: 1,
        tanggal: "2026-09-25",
        waktu: "09:15",
        detail: "Kaos x 2",
        kategori: "baju",
        total: 200000,
        status: "Berhasil"
    },
    {
        no: 2,
        tanggal: "2026-09-25",
        waktu: "10:30",
        detail: "Celana Jeans x 1",
        kategori: "celana",
        total: 200000,
        status: "Berhasil"
    },
    {
        no: 3,
        tanggal: "2026-09-24",
        waktu: "14:20",
        detail: "Sneakers x 1",
        kategori: "sepatu",
        total: 350000,
        status: "Tidak Berhasil"
    },
    {
        no: 4,
        tanggal: "2026-09-24",
        waktu: "16:45",
        detail: "Kaos x 1, Celana Jeans x 1",
        kategori: "kaos, celana",
        total: 300000,
        status: "Berhasil"
    },
    {
        no: 5,
        tanggal: "2026-09-23",
        waktu: "11:10",
        detail: "Sneakers x 2",
        kategori: "sepatu",
        total: 700000,
        status: "Berhasil"
    }
];

function displayProduk(data){

    while(tabel.rows.length > 1){
        tabel.deleteRow(1);
    }

    for(let i = 0; i < data.length; i++){

        const baris = tabel.insertRow();

        const no = baris.insertCell();
        const tanggal = baris.insertCell();
        const waktu = baris.insertCell();
        const detail = baris.insertCell();
        const kategori = baris.insertCell();
        const total = baris.insertCell();
        const status = baris.insertCell();

        no.textContent = data[i].no;
        tanggal.textContent = data[i].tanggal;
        waktu.textContent = data[i].waktu;
        detail.textContent = data[i].detail;
        kategori.textContent = data[i].kategori;
        total.textContent =
            "Rp." + data[i].total.toLocaleString("id-ID");
        status.textContent = data[i].status;
    }
}

const Filter = document.getElementById("Filter");
const tabel = document.getElementById("tabel");
const filterTanggal = document.getElementById("filterTanggal");

displayProduk(dataRiwayat);

Filter.addEventListener("change", function(){
    let hasil = []
    for(let i = 0; i < dataRiwayat.length; i++){
        if(this.value=="semua"||dataRiwayat[i].kategori==this.value){
            hasil.push(dataRiwayat[i])
        }
    }
    displayProduk(hasil)
})

filterTanggal.addEventListener("change", function() {
    let hasil = [];
    for (let i = 0; i < dataRiwayat.length; i++) {
        if (dataRiwayat[i].tanggal == this.value) {
            hasil.push(dataRiwayat[i]);
        }
    }
    displayProduk(hasil);
});

