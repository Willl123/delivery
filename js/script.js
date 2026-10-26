
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const pengguna = dataPengguna.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (pengguna) {
            sessionStorage.setItem(
                "penggunaLogin",
                JSON.stringify(pengguna)
            );

            window.location.href = "dashboard.html";
        } else {
            alert("email/password yang anda masukkan salah");
        }
    });
}

// logout

const logoutBtn = document.getElementById("logoutBtn");
const popupLogout = document.getElementById("popupLogout");
const batalLogout = document.getElementById("batalLogout");
const konfirmasiLogout = document.getElementById("konfirmasiLogout");

// Membuka pop-up Logout
if (logoutBtn && popupLogout) {
    logoutBtn.addEventListener("click", function () {
        popupLogout.style.display = "flex";
    });
}

// Menutup pop-up saat Batal diklik
if (batalLogout && popupLogout) {
    batalLogout.addEventListener("click", function () {
        popupLogout.style.display = "none";
    });
}

// Menjalankan Logout saat dikonfirmasi
if (konfirmasiLogout) {
    konfirmasiLogout.addEventListener("click", function () {
        sessionStorage.removeItem("penggunaLogin");
        window.location.href = "index.html";
    });
}









//lupa password
/* Membuka dan menutup modal */
const forgotBtn = document.getElementById("forgotBtn");
const registerBtn = document.getElementById("registerBtn");

function bukaModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.hidden = false;

        const inputPertama = modal.querySelector("input");
        if (inputPertama) {
            inputPertama.focus();
        }
    }
}

function tutupModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.hidden = true;
    }
}

if (forgotBtn) {
    forgotBtn.addEventListener("click", function () {
        bukaModal("forgotModal");
    });
}

if (registerBtn) {
    registerBtn.addEventListener("click", function () {
        bukaModal("registerModal");
    });
}

document.querySelectorAll("[data-close]").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        tutupModal(tombol.dataset.close);
    });
});

/* Menutup modal dengan tombol Escape */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal-overlay").forEach(function (modal) {
            modal.hidden = true;
        });
    }
});


/* Fitur Lupa Password */
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
    forgotForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("forgotEmail").value.trim();

        const pengguna = dataPengguna.find(function (user) {
            return user.email.toLowerCase() === email.toLowerCase();
        });

        const pesan = document.getElementById("forgotMessage");

        if (pengguna) {
            pesan.textContent =
                "Email terkirim. Silakan cek email untuk pemulihan password.";
            pesan.style.color = "#24442f";
        } else {
            pesan.textContent = "Email tidak ditemukan dalam data pengguna.";
            pesan.style.color = "#b42318";
        }
    });
}

/* Fitur Daftar */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;

        const pesan = document.getElementById("registerMessage");

        const emailSudahAda = dataPengguna.some(function (user) {
            return user.email.toLowerCase() === email.toLowerCase();
        });

        if (emailSudahAda) {
            pesan.textContent = "Email sudah terdaftar. Silakan gunakan email lain.";
            pesan.style.color = "#b42318";
            return;
        }

        const penggunaBaru = {
            id: Date.now(),
            nama: nama,
            email: email,
            password: password,
            role: "UPBJJ-UT",
            lokasi: "Belum ditentukan"
        };

        dataPengguna.push(penggunaBaru);

        pesan.textContent =
            "Pendaftaran berhasil! Silakan login menggunakan email dan password yang baru dibuat.";
        pesan.style.color = "#24442f";

        registerForm.reset();
    });
}




















/// dashboardd
const dataLogin = sessionStorage.getItem("penggunaLogin");

if (window.location.pathname.endsWith("dashboard.html")) {
    if (!dataLogin) {
        window.location.href = "index.html";
    } else {
        const penggunaAktif = JSON.parse(dataLogin);

        document.getElementById("namaPengguna").textContent =
            penggunaAktif.nama;

        document.getElementById("rolePengguna").textContent =
            penggunaAktif.role;

        document.getElementById("lokasiPengguna").textContent =
            penggunaAktif.lokasi;

        document.getElementById("totalBahanAjar").textContent =
            dataBahanAjar.length;

        const jumlahStok = dataBahanAjar.reduce(function (total, bahan) {
            return total + Number(bahan.stok);
        }, 0);

        document.getElementById("totalStok").textContent =
            jumlahStok.toLocaleString("id-ID");

        document.getElementById("totalPengiriman").textContent =
            Object.keys(dataTracking).length;
    }
}


/* Sapaan berdasarkan waktu */
const sapaanWaktu = document.getElementById("sapaanWaktu");

if (sapaanWaktu) {
    const jam = new Date().getHours();

    if (jam >= 5 && jam < 11) {
        sapaanWaktu.textContent = "Selamat Pagi";
    } else if (jam >= 11 && jam < 15) {
        sapaanWaktu.textContent = "Selamat Siang";
    } else if (jam >= 15 && jam < 18) {
        sapaanWaktu.textContent = "Selamat Sore";
    } else {
        sapaanWaktu.textContent = "Selamat Malam";
    }
}







/* Menampilkan laporan pada dashboard */
const tabelMonitoring = document.getElementById("tabelMonitoring");

if (tabelMonitoring) {
    function tambahBaris(tabel, nilaiKolom) {
        const baris = document.createElement("tr");

        nilaiKolom.forEach(function (nilai) {
            const sel = document.createElement("td");
            sel.textContent = nilai;
            baris.appendChild(sel);
        });

        tabel.appendChild(baris);
    }

    Object.entries(dataTracking).forEach(function ([nomorDO, data]) {
        tambahBaris(tabelMonitoring, [
            nomorDO,
            data.nama,
            data.ekspedisi,
            data.status
        ]);

        tambahBaris(document.getElementById("tabelHistori"), [
            nomorDO,
            data.tanggalKirim,
            data.nama,
            data.total,
            data.status
        ]);
    });

    const kelompokJenis = {};

    dataBahanAjar.forEach(function (bahan) {
        const jenis = bahan.jenisBarang;

        if (!kelompokJenis[jenis]) {
            kelompokJenis[jenis] = {
                jumlah: 0,
                stok: 0
            };
        }

        kelompokJenis[jenis].jumlah += 1;
        kelompokJenis[jenis].stok += Number(bahan.stok);
    });

    Object.entries(kelompokJenis).forEach(function ([jenis, data]) {
        tambahBaris(document.getElementById("tabelRekap"), [
            jenis,
            data.jumlah,
            data.stok.toLocaleString("id-ID")
        ]);
    });
}












/// tracking
const trackingForm = document.getElementById("trackingForm");

if (trackingForm) {
    trackingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomorDO = document.getElementById("nomorDO").value.trim();
        const data = dataTracking[nomorDO];

        const pesan = document.getElementById("trackingMessage");
        const hasil = document.getElementById("trackingResult");

        if (!data) {
            pesan.textContent = "Nomor DO tidak ditemukan. Silakan periksa kembali.";
            hasil.hidden = true;
            return;
        }

        pesan.textContent = "";
        hasil.hidden = false;

        document.getElementById("hasilNomorDO").textContent = nomorDO;
        document.getElementById("hasilNama").textContent = data.nama;
        document.getElementById("hasilStatus").textContent = data.status;
        document.getElementById("hasilEkspedisi").textContent = data.ekspedisi;
        document.getElementById("hasilTanggal").textContent = data.tanggalKirim;
        document.getElementById("hasilPaket").textContent = data.paket;
        document.getElementById("hasilTotal").textContent = data.total;

        const riwayat = document.getElementById("riwayatPerjalanan");
        riwayat.replaceChildren();

        data.perjalanan.forEach(function (item) {
            const elemen = document.createElement("div");
            elemen.className = "timeline-item";

            const waktu = document.createElement("time");
            waktu.textContent = item.waktu;

            const keterangan = document.createElement("p");
            keterangan.textContent = item.keterangan;

            elemen.append(waktu, keterangan);
            riwayat.appendChild(elemen);
        });
    });
}





/// stok bahan ajar
const tabelStok = document.getElementById("tabelStok");

if (tabelStok) {
    const cariBahan = document.getElementById("cariBahan");
    const filterJenis = document.getElementById("filterJenis");
    const jumlahData = document.getElementById("jumlahData");
    const pesanStok = document.getElementById("pesanStok");

    // Mengisi filter jenis barang
    const daftarJenis = [
        ...new Set(dataBahanAjar.map(bahan => bahan.jenisBarang))
    ];

    daftarJenis.forEach(function (jenis) {
        const opsi = document.createElement("option");
        opsi.value = jenis;
        opsi.textContent = jenis;
        filterJenis.appendChild(opsi);
    });

    function tampilkanStok() {
        const kataKunci = cariBahan.value.trim().toLowerCase();
        const jenisDipilih = filterJenis.value;

        // Filter berdasarkan kode, nama, lokasi, dan jenis
        const hasilFilter = dataBahanAjar.filter(function (bahan) {
            const cocokKataKunci =
                String(bahan.kodeBarang).toLowerCase().includes(kataKunci) ||
                String(bahan.namaBarang).toLowerCase().includes(kataKunci) ||
                String(bahan.kodeLokasi).toLowerCase().includes(kataKunci);

            const cocokJenis =
                jenisDipilih === "" ||
                bahan.jenisBarang === jenisDipilih;

            return cocokKataKunci && cocokJenis;
        });

        // Hapus tampilan sebelumnya
        tabelStok.replaceChildren();

        hasilFilter.forEach(function (bahan) {
            // Membuat kartu buku
            const kartu = document.createElement("article");
            kartu.className = "book-card";

            // Area cover
            const areaCover = document.createElement("div");
            areaCover.className = "book-cover";

            // Menampilkan gambar cover dari data.js
            const gambar = document.createElement("img");

            gambar.src = bahan.cover;
            gambar.alt = "Cover " + bahan.namaBarang;
            gambar.loading = "lazy";

            // Jika gambar tidak ditemukan
            gambar.onerror = function () {
                areaCover.replaceChildren();

                const placeholder = document.createElement("div");
                placeholder.className = "cover-placeholder";

                const label = document.createElement("span");
                label.textContent = "UNIVERSITAS TERBUKA";

                const judul = document.createElement("strong");
                judul.textContent = bahan.namaBarang;

                placeholder.append(label, judul);
                areaCover.appendChild(placeholder);
            };

            areaCover.appendChild(gambar);

            // Area informasi buku
            const info = document.createElement("div");
            info.className = "book-info";

            const nama = document.createElement("h3");
            nama.textContent = bahan.namaBarang;
            info.appendChild(nama);

            // Fungsi membuat detail buku
            function tambahDetail(label, nilai) {
                const detail = document.createElement("div");
                detail.className = "book-detail";

                const teksLabel = document.createElement("span");
                teksLabel.textContent = label;

                const teksNilai = document.createElement("strong");
                teksNilai.textContent =
                    nilai !== undefined && nilai !== null && nilai !== ""
                        ? nilai
                        : "-";

                detail.append(teksLabel, teksNilai);
                info.appendChild(detail);
            }

            tambahDetail("Kode Barang", bahan.kodeBarang);
            tambahDetail("Kode Lokasi", bahan.kodeLokasi);
            tambahDetail("Jenis", bahan.jenisBarang);
            tambahDetail("Edisi", bahan.edisi);

            // Informasi stok
            const stok = document.createElement("div");
            stok.className = "book-stock";
            stok.textContent =
                "Stok tersedia: " +
                Number(bahan.stok).toLocaleString("id-ID") +
                " buku";

            info.appendChild(stok);

            // Gabungkan cover dan informasi
            kartu.append(areaCover, info);
            tabelStok.appendChild(kartu);
        });

        // Jumlah data yang ditampilkan
        jumlahData.textContent =
            "Menampilkan " + hasilFilter.length +
            " dari " + dataBahanAjar.length +
            " data bahan ajar.";

        // Pesan ketika hasil kosong
        pesanStok.textContent =
            hasilFilter.length === 0
                ? "Data bahan ajar tidak ditemukan."
                : "";
    }

    // Event pencarian dan filter
    cariBahan.addEventListener("input", tampilkanStok);
    filterJenis.addEventListener("change", tampilkanStok);

    // Tampilkan data saat halaman dibuka
    tampilkanStok();
}


// ==================================
// FITUR TAMBAH BAHAN AJAR DENGAN DOM
// ==================================

const formTambahStok = document.getElementById("formTambahStok");
const pesanTambahStok = document.getElementById("pesanTambahStok");

if (formTambahStok) {
    formTambahStok.addEventListener("submit", function (event) {
        // Mencegah halaman refresh saat form dikirim
        event.preventDefault();

        // Mengambil nilai dari formulir
        const kodeLokasi = document
            .getElementById("kodeLokasiBaru")
            .value.trim();

        const kodeBarang = document
            .getElementById("kodeBarangBaru")
            .value.trim();

        const namaBarang = document
            .getElementById("namaBarangBaru")
            .value.trim();

        const jenisBarang = document
            .getElementById("jenisBarangBaru")
            .value.trim();

        const edisi = document
            .getElementById("edisiBaru")
            .value.trim();

        const stokInput = document.getElementById("stokBaru").value;

        const cover = document
            .getElementById("coverBaru")
            .value.trim();

        // Validasi jumlah stok
        const stok = Number(stokInput);

        if (stokInput === "" || !Number.isSafeInteger(stok) || stok < 0) {
            pesanTambahStok.textContent =
                "Jumlah stok harus berupa bilangan bulat nol atau lebih.";
            pesanTambahStok.style.color = "#c0392b";
            return;
        }

        // Memeriksa apakah kode barang sudah digunakan
        const kodeSudahAda = dataBahanAjar.some(function (bahan) {
            return String(bahan.kodeBarang).toLowerCase() ===
                kodeBarang.toLowerCase();
        });

        if (kodeSudahAda) {
            pesanTambahStok.textContent =
                "Kode barang sudah terdaftar. Gunakan kode yang berbeda.";
            pesanTambahStok.style.color = "#c0392b";
            return;
        }

        // Membuat objek bahan ajar baru
        const bahanBaru = {
            kodeLokasi: kodeLokasi,
            kodeBarang: kodeBarang,
            namaBarang: namaBarang,
            jenisBarang: jenisBarang,
            edisi: edisi,
            stok: stok,
            cover: cover
        };

        // Menambahkan objek ke array data
        dataBahanAjar.push(bahanBaru);

        // Menambahkan jenis baru ke pilihan filter jika belum ada
        const jenisSudahAda = Array.from(filterJenis.options).some(
            function (opsi) {
                return opsi.value === jenisBarang;
            }
        );

        if (!jenisSudahAda) {
            const opsiBaru = document.createElement("option");
            opsiBaru.value = jenisBarang;
            opsiBaru.textContent = jenisBarang;
            filterJenis.appendChild(opsiBaru);
        }

        // Reset filter agar bahan baru langsung terlihat
        cariBahan.value = "";
        filterJenis.value = "";

        // Render ulang kartu buku
        tampilkanStok();

        // Tampilkan pop-up di tengah layar
        popupBerhasil.style.display = "flex";

        // Kosongkan formulir
        formTambahStok.reset();
            });
            const popupBerhasil = document.getElementById("popupBerhasil");
        const tutupPopup = document.getElementById("tutupPopup");

        tutupPopup.addEventListener("click", function () {
            popupBerhasil.style.display = "none";
    });
}
