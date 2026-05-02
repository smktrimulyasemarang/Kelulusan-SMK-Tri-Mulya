// ================= COUNTDOWN =================
const targetDate = new Date("2026-05-04T16:00:00+07:00").getTime();
// const targetDate = new Date("2026-04-30T21:02:00+07:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const selisih = targetDate - now;

  const el = document.getElementById("countdownText");
  const list = document.getElementById("listSiswa");

  if (!el) return;

  if (selisih <= 0) {
    el.innerHTML = "Pengumuman sudah dibuka";
    if (list) list.style.display = "grid";
    return;
  }

  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((selisih / (1000 * 60)) % 60);
  const detik = Math.floor((selisih / 1000) % 60);

  el.innerHTML = `Dibuka dalam ${hari} hari ${jam} jam ${menit} menit ${detik} detik`;

  if (list) list.style.display = "none";
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ================= INDEX =================
if (document.getElementById("listSiswa")) {
  const container = document.getElementById("listSiswa");

  siswa.forEach(s => {
    const card = document.createElement("div");
    card.className = "siswa-card";

    card.innerHTML = `
      <img src="${s.foto}">
      <p>${s.nama}</p>
    `;

    card.onclick = () => {
      localStorage.setItem("id", s.id);
      window.location.href = "login.html";
    };

    container.appendChild(card);
  });
}

// ================= LOGIN =================
if (document.getElementById("password")) {
  window.cek = function () {
    const id = localStorage.getItem("id");
    const pass = document.getElementById("password").value;

    const data = siswa.find(s => s.id === id);

    if (data && data.password === pass) {

      if (data.status === "LULUS") {

        // tampilkan animasi
        document.getElementById("loadingBox").style.display = "flex";

        // redirect ke Google Drive
        setTimeout(() => {
          window.location.href = data.link;
        }, 1500);

      } else {
        alert("Maaf, Anda belum lulus.");
      }

    } else {
      alert("Kode salah!");
    }
  };
}
