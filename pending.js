// Parser transaksi pending. Dipakai pending.html dan bisa diuji lewat node.
// Format baris: 19/10/26 09:31:07  SF10  088242542995  Menunggu Jawaban
const POLA = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s+(\S+)\s+(\S+)\s+(.+?)\s*$/;

function bacaBaris(teks) {
  const hasil = [];
  for (const baris of teks.split(/\r?\n/)) {
    const m = POLA.exec(baris);
    if (!m) continue;
    const [, tgl, bln, th, jam, mnt, dtk, kode, nomor, status] = m;
    const tahun = th.length === 2 ? 2000 + Number(th) : Number(th);
    hasil.push({
      waktu: new Date(tahun, Number(bln) - 1, Number(tgl), Number(jam), Number(mnt), Number(dtk || 0)),
      kode,
      nomor,
      status,
    });
  }
  return hasil;
}

function cariPending(rows, { sekarang = new Date(), batasMenit = 15, kataKunci = ['menunggu'] } = {}) {
  const kunci = kataKunci.map((k) => k.trim().toLowerCase()).filter(Boolean);
  const menunggu = rows.filter((r) => kunci.some((k) => r.status.toLowerCase().includes(k)));
  const telat = menunggu
    .map((r) => ({ ...r, umurMenit: Math.floor((sekarang - r.waktu) / 60000) }))
    .filter((r) => r.umurMenit >= batasMenit)
    .sort((a, b) => b.umurMenit - a.umurMenit);
  return { total: rows.length, menunggu: menunggu.length, telat };
}

function formatUmur(menit) {
  const j = Math.floor(menit / 60);
  const m = menit % 60;
  return j > 0 ? `${j}j ${m}m` : `${m}m`;
}

const dua = (n) => String(n).padStart(2, '0');
const formatJam = (d) => `${dua(d.getHours())}:${dua(d.getMinutes())}`;
const formatTgl = (d) => `${dua(d.getDate())}/${dua(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;

// Teks satu pesan untuk ditempel manual ke CS supplier.
function ringkasan(telat, batasMenit, sekarang = new Date()) {
  const baris = telat.map(
    (r, i) => `${i + 1}. ${formatJam(r.waktu)} ${r.kode} ${r.nomor} (${formatUmur(r.umurMenit)})`
  );
  return [
    `Transaksi pending lebih dari ${batasMenit} menit (${telat.length}), per ${formatTgl(sekarang)} ${formatJam(sekarang)}:`,
    ...baris,
    'Mohon segera dicek dan diproses.',
  ].join('\n');
}

if (typeof module !== 'undefined') module.exports = { bacaBaris, cariPending, formatUmur, ringkasan };
