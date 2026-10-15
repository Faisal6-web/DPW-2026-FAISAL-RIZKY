// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
// Memakai event delegation di document karena baris tabel sekarang
// dirender dinamis via fetch (lihat buku.js/anggota.js) sehingga
// tombol .btn-hapus belum tentu ada saat DOMContentLoaded.
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
        }
    });
}

// ===== Filter/pencarian tabel real-time =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
    });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const nama = form.querySelector("[name='nama']");
        if (nama){
        if (nama.value.trim() === "") {
            tampilkanError(nama, "Field ini wajib diisi.");
            valid = false;
        } else {
            hapusError(nama);
        }
    }

        const kategori = form.querySelector("[name='kategori']");
        if (kategori) {
        if (kategroi.value.trim() === "") {
            tampilkanError(kategori, "Kategroi wajib diisi.");
            valid = false;
        } else{
            hapusError(kategori);
        }
    }

        const harga = form.querySelector("[name='harga']");
        if (harga) {
            const nilaiHarga = parseInt(harga.value, 10);
            if (isNaN(nilaiHarga) || nilaiHarga < 0) {
                tampilkanError(tahun, "Harga tidak boleh kosong atau negatif");
                valid = false;
            } else {
                hapusError(harga);
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = parseInt(stok.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(stok, "Stok tidak boleh negatif.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        const email = form.querySelector("[name='email']");
        if (email) {
            if (email.value.trim() === "") {
                tampilkanError(email, "Email wajib diisi.");
                valid = false;
            } else {
                hapusError(email);
            }
        }

        const pesan = form.querySelector("[name='pesan']");
        if (pesan) {
            if (pesan.value.trim() === "") {
                tampilkanError(pesan, "Pesan tidak boleh kosong.");
                valid = false;
            } else {
                hapusError(pesan);
            }
        }

        const nomor = form.querySelector("[name='nomor']");
        if (nomor) {
            const nilaiNomor = parseInt(nomor.value, 10);
            if (nomor.value.trim() === "" || isNaN(nilaiNomor)) {
                tampilkanError(nomor, "Nomor wajib diisi dengan angka.");
                valid = false;
            } else {
                hapusError(nomor);
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});