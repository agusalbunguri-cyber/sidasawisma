import { useState } from "react";

const initialWarga = [
  { id: 1, nik: "3171012501900001", nama: "Siti Rahayu", ttl: "Jakarta, 25/01/1990", jenisKelamin: "P", alamat: "Jl. Mawar No. 5 RT 03/RW 02", status: "Kawin", pekerjaan: "Ibu Rumah Tangga", agama: "Islam", pendidikan: "SMA", rt: "03", rw: "02", statusHuniKeluarga: "KK" },
  { id: 2, nik: "3171012501880002", nama: "Budi Santoso", ttl: "Jakarta, 25/01/1988", jenisKelamin: "L", alamat: "Jl. Mawar No. 5 RT 03/RW 02", status: "Kawin", pekerjaan: "Karyawan Swasta", agama: "Islam", pendidikan: "S1", rt: "03", rw: "02", statusHuniKeluarga: "KK" },
  { id: 3, nik: "3171015505950003", nama: "Dewi Lestari", ttl: "Bogor, 15/05/1995", jenisKelamin: "P", alamat: "Jl. Melati No. 12 RT 03/RW 02", status: "Belum Kawin", pekerjaan: "Mahasiswa", agama: "Kristen", pendidikan: "D3", rt: "03", rw: "02", statusHuniKeluarga: "ART" },
  { id: 4, nik: "3171011202800004", nama: "Ahmad Fauzi", ttl: "Bandung, 12/02/1980", jenisKelamin: "L", alamat: "Jl. Kenanga No. 3 RT 03/RW 02", status: "Kawin", pekerjaan: "Wiraswasta", agama: "Islam", pendidikan: "SMP", rt: "03", rw: "02", statusHuniKeluarga: "KK" },
  { id: 5, nik: "3171012808750005", nama: "Sri Mulyani", ttl: "Yogyakarta, 28/08/1975", jenisKelamin: "P", alamat: "Jl. Anggrek No. 7 RT 03/RW 02", status: "Janda", pekerjaan: "Pedagang", agama: "Islam", pendidikan: "SD", rt: "03", rw: "02", statusHuniKeluarga: "KK" },
];

const MENU = [
  { id: "beranda", icon: "🏠", label: "Beranda" },
  { id: "warga", icon: "👥", label: "Data Warga" },
  { id: "tambah", icon: "➕", label: "Tambah Warga" },
  { id: "laporan", icon: "📊", label: "Laporan" },
  { id: "kegiatan", icon: "📋", label: "Kegiatan" },
];

const initialKegiatan = [
  { id: 1, tanggal: "2026-05-15", judul: "Posyandu Balita & Lansia", peserta: 18, status: "Selesai", catatan: "Semua balita hadir, 3 lansia tidak hadir" },
  { id: 2, tanggal: "2026-05-20", judul: "Rapat Koordinasi Dasawisma", peserta: 10, status: "Selesai", catatan: "Membahas program PKK bulan Juni" },
  { id: 3, tanggal: "2026-06-01", judul: "Kerja Bakti RT", peserta: 0, status: "Akan Datang", catatan: "" },
  { id: 4, tanggal: "2026-06-10", judul: "Posyandu Balita", peserta: 0, status: "Akan Datang", catatan: "" },
];

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      boxShadow: "0 2px 12px rgba(0,100,60,0.08)",
      border: `2px solid ${color}22`,
      flex: "1 1 130px",
      minWidth: 110,
    }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <span style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'Nunito', sans-serif" }}>{value}</span>
      <span style={{ fontSize: 11, color: "#6b7280", textAlign: "center", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function Badge({ text, color }) {
  const colors = {
    green: { bg: "#dcfce7", text: "#15803d" },
    blue: { bg: "#dbeafe", text: "#1d4ed8" },
    orange: { bg: "#ffedd5", text: "#c2410c" },
    gray: { bg: "#f3f4f6", text: "#374151" },
    red: { bg: "#fee2e2", text: "#dc2626" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      background: c.bg, color: c.text,
      borderRadius: 20, padding: "2px 10px",
      fontSize: 11, fontWeight: 700,
      fontFamily: "'Nunito', sans-serif",
      whiteSpace: "nowrap",
    }}>{text}</span>
  );
}

export default function DasawismaApp() {
  const [menu, setMenu] = useState("beranda");
  const [warga, setWarga] = useState(initialWarga);
  const [kegiatan, setKegiatan] = useState(initialKegiatan);
  const [search, setSearch] = useState("");
  const [selectedWarga, setSelectedWarga] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [formData, setFormData] = useState({
    nik: "", nama: "", ttl: "", jenisKelamin: "L", alamat: "",
    status: "Belum Kawin", pekerjaan: "", agama: "Islam",
    pendidikan: "SD", rt: "03", rw: "02", statusHuniKeluarga: "ART"
  });
  const [formKeg, setFormKeg] = useState({ tanggal: "", judul: "", catatan: "" });
  const [showKegForm, setShowKegForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredWarga = warga.filter(w =>
    w.nama.toLowerCase().includes(search.toLowerCase()) ||
    w.nik.includes(search) ||
    w.alamat.toLowerCase().includes(search.toLowerCase())
  );

  const totalL = warga.filter(w => w.jenisKelamin === "L").length;
  const totalP = warga.filter(w => w.jenisKelamin === "P").length;
  const totalKK = warga.filter(w => w.statusHuniKeluarga === "KK").length;

  const handleTambahWarga = () => {
    if (!formData.nik || !formData.nama || !formData.ttl) {
      showNotif("NIK, Nama, dan TTL wajib diisi!", "error");
      return;
    }
    const newWarga = { ...formData, id: Date.now() };
    setWarga(prev => [...prev, newWarga]);
    setFormData({
      nik: "", nama: "", ttl: "", jenisKelamin: "L", alamat: "",
      status: "Belum Kawin", pekerjaan: "", agama: "Islam",
      pendidikan: "SD", rt: "03", rw: "02", statusHuniKeluarga: "ART"
    });
    showNotif(`Data ${newWarga.nama} berhasil ditambahkan!`);
    setMenu("warga");
  };

  const handleHapusWarga = (id, nama) => {
    setWarga(prev => prev.filter(w => w.id !== id));
    setShowDetail(false);
    showNotif(`Data ${nama} berhasil dihapus.`, "info");
  };

  const handleTambahKegiatan = () => {
    if (!formKeg.tanggal || !formKeg.judul) {
      showNotif("Tanggal dan judul kegiatan wajib diisi!", "error");
      return;
    }
    setKegiatan(prev => [...prev, {
      id: Date.now(), ...formKeg, peserta: 0, status: "Akan Datang"
    }]);
    setFormKeg({ tanggal: "", judul: "", catatan: "" });
    setShowKegForm(false);
    showNotif("Kegiatan berhasil ditambahkan!");
  };

  const GREEN = "#16a34a";
  const GREEN_DARK = "#14532d";
  const GREEN_LIGHT = "#dcfce7";
  const ACCENT = "#f59e0b";

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    borderRadius: 10, border: "1.5px solid #d1fae5",
    fontFamily: "'Nunito', sans-serif", fontSize: 14,
    background: "#f0fdf4", outline: "none",
    color: "#1a2e1a", boxSizing: "border-box",
  };
  const labelStyle = {
    fontSize: 12, fontWeight: 700, color: "#166534",
    fontFamily: "'Nunito', sans-serif", marginBottom: 4, display: "block"
  };
  const btnStyle = {
    background: GREEN, color: "white",
    border: "none", borderRadius: 10,
    padding: "11px 22px", fontWeight: 700,
    fontFamily: "'Nunito', sans-serif", fontSize: 14,
    cursor: "pointer", width: "100%",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f0fdf4",
      fontFamily: "'Nunito', sans-serif",
      maxWidth: 430, margin: "0 auto", position: "relative",
      display: "flex", flexDirection: "column",
    }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          zIndex: 999, background: notification.type === "error" ? "#dc2626" : notification.type === "info" ? "#2563eb" : GREEN,
          color: "white", borderRadius: 12, padding: "12px 24px",
          fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          maxWidth: 340, textAlign: "center",
          animation: "fadeIn 0.3s ease",
        }}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${GREEN_DARK} 0%, ${GREEN} 100%)`,
        padding: "20px 20px 16px",
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
        boxShadow: "0 4px 20px rgba(20,83,45,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 14,
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26,
          }}>🏡</div>
          <div>
            <div style={{ color: "white", fontWeight: 900, fontSize: 17, letterSpacing: -0.3 }}>
              SiDasawisma
            </div>
            <div style={{ color: "#bbf7d0", fontSize: 11, fontWeight: 600 }}>
              RT 03 / RW 02 — Kel. Cempaka Putih
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: "#bbf7d0", fontSize: 10, fontWeight: 600 }}>Total Warga</div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 900 }}>{warga.length}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>

        {/* BERANDA */}
        {menu === "beranda" && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: GREEN_DARK, marginBottom: 14 }}>
              Selamat Datang, Ibu Ketua 👋
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
              <StatCard icon="👨" value={totalL} label="Laki-laki" color="#2563eb" />
              <StatCard icon="👩" value={totalP} label="Perempuan" color="#db2777" />
              <StatCard icon="🏠" value={totalKK} label="Kepala Keluarga" color={GREEN} />
              <StatCard icon="📋" value={kegiatan.filter(k => k.status === "Selesai").length} label="Kegiatan Selesai" color={ACCENT} />
            </div>

            {/* Kegiatan Mendatang */}
            <div style={{ fontWeight: 800, fontSize: 15, color: GREEN_DARK, marginBottom: 10 }}>
              📅 Kegiatan Mendatang
            </div>
            {kegiatan.filter(k => k.status === "Akan Datang").map(k => (
              <div key={k.id} style={{
                background: "white", borderRadius: 14, padding: "14px 16px",
                marginBottom: 10, boxShadow: "0 2px 10px rgba(0,100,60,0.08)",
                borderLeft: `4px solid ${ACCENT}`,
              }}>
                <div style={{ fontWeight: 800, color: GREEN_DARK, fontSize: 14 }}>{k.judul}</div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>
                  📆 {new Date(k.tanggal).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            ))}

            {/* Warga Terbaru */}
            <div style={{ fontWeight: 800, fontSize: 15, color: GREEN_DARK, margin: "16px 0 10px" }}>
              🆕 Warga Terbaru
            </div>
            {warga.slice(-3).reverse().map(w => (
              <div key={w.id} style={{
                background: "white", borderRadius: 14, padding: "12px 16px",
                marginBottom: 8, display: "flex", alignItems: "center", gap: 12,
                boxShadow: "0 2px 8px rgba(0,100,60,0.07)",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: w.jenisKelamin === "P" ? "#fce7f3" : "#dbeafe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>{w.jenisKelamin === "P" ? "👩" : "👨"}</div>
                <div>
                  <div style={{ fontWeight: 800, color: GREEN_DARK, fontSize: 13 }}>{w.nama}</div>
                  <div style={{ color: "#9ca3af", fontSize: 11 }}>{w.alamat}</div>
                </div>
                <Badge text={w.statusHuniKeluarga === "KK" ? "KK" : "Anggota"} color={w.statusHuniKeluarga === "KK" ? "green" : "blue"} />
              </div>
            ))}
          </div>
        )}

        {/* DATA WARGA */}
        {menu === "warga" && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: GREEN_DARK, marginBottom: 12 }}>
              👥 Data Warga
            </div>
            <input
              placeholder="🔍  Cari nama, NIK, atau alamat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, marginBottom: 14 }}
            />
            <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 10 }}>
              Menampilkan <strong>{filteredWarga.length}</strong> dari {warga.length} warga
            </div>
            {filteredWarga.map(w => (
              <div key={w.id}
                onClick={() => { setSelectedWarga(w); setShowDetail(true); }}
                style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  marginBottom: 10, display: "flex", alignItems: "center", gap: 12,
                  boxShadow: "0 2px 10px rgba(0,100,60,0.08)",
                  cursor: "pointer", transition: "transform 0.1s",
                  border: "1.5px solid #f0fdf4",
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: w.jenisKelamin === "P" ? "#fce7f3" : "#dbeafe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>{w.jenisKelamin === "P" ? "👩" : "👨"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: GREEN_DARK, fontSize: 14 }}>{w.nama}</div>
                  <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>NIK: {w.nik}</div>
                  <div style={{ color: "#9ca3af", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.alamat}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  <Badge text={w.statusHuniKeluarga === "KK" ? "KK" : "Anggota"} color={w.statusHuniKeluarga === "KK" ? "green" : "blue"} />
                  <Badge text={w.status} color={w.status === "Kawin" ? "orange" : w.status === "Janda" || w.status === "Duda" ? "red" : "gray"} />
                </div>
              </div>
            ))}

            {/* Detail Modal */}
            {showDetail && selectedWarga && (
              <div style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                zIndex: 100, display: "flex", alignItems: "flex-end",
              }}
                onClick={() => setShowDetail(false)}
              >
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    background: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24,
                    padding: "24px 20px 32px", width: "100%", maxWidth: 430, margin: "0 auto",
                    boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
                    maxHeight: "85vh", overflowY: "auto",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{
                        width: 54, height: 54, borderRadius: 16,
                        background: selectedWarga.jenisKelamin === "P" ? "#fce7f3" : "#dbeafe",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                      }}>{selectedWarga.jenisKelamin === "P" ? "👩" : "👨"}</div>
                      <div>
                        <div style={{ fontWeight: 900, color: GREEN_DARK, fontSize: 16 }}>{selectedWarga.nama}</div>
                        <div style={{ color: "#6b7280", fontSize: 12 }}>{selectedWarga.nik}</div>
                      </div>
                    </div>
                    <button onClick={() => setShowDetail(false)} style={{
                      background: "#f3f4f6", border: "none", borderRadius: 10,
                      width: 32, height: 32, cursor: "pointer", fontSize: 16,
                    }}>✕</button>
                  </div>
                  {[
                    ["TTL", selectedWarga.ttl],
                    ["Jenis Kelamin", selectedWarga.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"],
                    ["Alamat", selectedWarga.alamat],
                    ["Status Perkawinan", selectedWarga.status],
                    ["Pekerjaan", selectedWarga.pekerjaan],
                    ["Agama", selectedWarga.agama],
                    ["Pendidikan", selectedWarga.pendidikan],
                    ["RT/RW", `RT ${selectedWarga.rt} / RW ${selectedWarga.rw}`],
                    ["Status dalam Keluarga", selectedWarga.statusHuniKeluarga === "KK" ? "Kepala Keluarga" : "Anggota Keluarga"],
                  ].map(([k, v]) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between", padding: "10px 0",
                      borderBottom: "1px solid #f0fdf4",
                    }}>
                      <span style={{ color: "#6b7280", fontSize: 13, fontWeight: 600 }}>{k}</span>
                      <span style={{ color: GREEN_DARK, fontSize: 13, fontWeight: 700, textAlign: "right", maxWidth: "55%" }}>{v}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => handleHapusWarga(selectedWarga.id, selectedWarga.nama)}
                    style={{
                      ...btnStyle, background: "#dc2626", marginTop: 18
                    }}>
                    🗑️ Hapus Data Warga
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAMBAH WARGA */}
        {menu === "tambah" && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: GREEN_DARK, marginBottom: 16 }}>
              ➕ Tambah Data Warga
            </div>
            <div style={{ background: "white", borderRadius: 18, padding: 18, boxShadow: "0 2px 12px rgba(0,100,60,0.08)" }}>
              {[
                { key: "nik", label: "NIK *", type: "text", placeholder: "16 digit NIK" },
                { key: "nama", label: "Nama Lengkap *", type: "text", placeholder: "Nama sesuai KTP" },
                { key: "ttl", label: "Tempat, Tgl Lahir *", type: "text", placeholder: "Jakarta, 01/01/1990" },
                { key: "alamat", label: "Alamat", type: "text", placeholder: "Jl. ..." },
                { key: "pekerjaan", label: "Pekerjaan", type: "text", placeholder: "Pekerjaan" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}
              {[
                { key: "jenisKelamin", label: "Jenis Kelamin", options: ["L", "P"] },
                { key: "status", label: "Status Perkawinan", options: ["Belum Kawin", "Kawin", "Janda", "Duda"] },
                { key: "agama", label: "Agama", options: ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"] },
                { key: "pendidikan", label: "Pendidikan Terakhir", options: ["SD", "SMP", "SMA", "D3", "S1", "S2", "S3", "Tidak Sekolah"] },
                { key: "statusHuniKeluarga", label: "Status dalam Keluarga", options: ["KK", "ART"] },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{f.label}</label>
                  <select
                    value={formData[f.key]}
                    onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ ...inputStyle }}>
                    {f.options.map(o => (
                      <option key={o} value={o}>{o === "KK" ? "Kepala Keluarga" : o === "ART" ? "Anggota" : o === "L" ? "Laki-laki" : o === "P" ? "Perempuan" : o}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button onClick={handleTambahWarga} style={{ ...btnStyle, marginTop: 6 }}>
                ✅ Simpan Data Warga
              </button>
            </div>
          </div>
        )}

        {/* LAPORAN */}
        {menu === "laporan" && (
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: GREEN_DARK, marginBottom: 16 }}>
              📊 Laporan Kependudukan
            </div>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Total Warga", val: warga.length, icon: "👥", color: GREEN },
                { label: "Kepala Keluarga", val: totalKK, icon: "🏠", color: "#2563eb" },
                { label: "Laki-laki", val: totalL, icon: "👨", color: "#7c3aed" },
                { label: "Perempuan", val: totalP, icon: "👩", color: "#db2777" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "white", borderRadius: 14, padding: "16px 14px",
                  boxShadow: "0 2px 10px rgba(0,100,60,0.08)",
                  borderTop: `3px solid ${s.color}`,
                }}>
                  <div style={{ fontSize: 24 }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: 24, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Agama */}
            <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 10px rgba(0,100,60,0.08)" }}>
              <div style={{ fontWeight: 800, color: GREEN_DARK, marginBottom: 12 }}>🕌 Distribusi Agama</div>
              {["Islam", "Kristen", "Katolik", "Hindu", "Buddha"].map(ag => {
                const count = warga.filter(w => w.agama === ag).length;
                if (!count) return null;
                const pct = Math.round((count / warga.length) * 100);
                return (
                  <div key={ag} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, fontWeight: 600, color: "#374151" }}>
                      <span>{ag}</span><span>{count} ({pct}%)</span>
                    </div>
                    <div style={{ background: "#f0fdf4", borderRadius: 8, height: 8 }}>
                      <div style={{ background: GREEN, width: `${pct}%`, height: 8, borderRadius: 8, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pendidikan */}
            <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 10px rgba(0,100,60,0.08)" }}>
              <div style={{ fontWeight: 800, color: GREEN_DARK, marginBottom: 12 }}>🎓 Distribusi Pendidikan</div>
              {["SD", "SMP", "SMA", "D3", "S1", "S2"].map(pd => {
                const count = warga.filter(w => w.pendidikan === pd).length;
                if (!count) return null;
                const pct = Math.round((count / warga.length) * 100);
                return (
                  <div key={pd} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, fontWeight: 600, color: "#374151" }}>
                      <span>{pd}</span><span>{count} ({pct}%)</span>
                    </div>
                    <div style={{ background: "#f0fdf4", borderRadius: 8, height: 8 }}>
                      <div style={{ background: "#2563eb", width: `${pct}%`, height: 8, borderRadius: 8 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status Kawin */}
            <div style={{ background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,100,60,0.08)" }}>
              <div style={{ fontWeight: 800, color: GREEN_DARK, marginBottom: 12 }}>💍 Status Perkawinan</div>
              {["Kawin", "Belum Kawin", "Janda", "Duda"].map(st => {
                const count = warga.filter(w => w.status === st).length;
                if (!count) return null;
                return (
                  <div key={st} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0fdf4", fontSize: 13, fontWeight: 600, color: "#374151" }}>
                    <span>{st}</span><span style={{ color: GREEN, fontWeight: 800 }}>{count} orang</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* KEGIATAN */}
        {menu === "kegiatan" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: GREEN_DARK }}>📋 Kegiatan</div>
              <button
                onClick={() => setShowKegForm(!showKegForm)}
                style={{
                  background: GREEN, color: "white", border: "none",
                  borderRadius: 10, padding: "8px 14px", fontWeight: 700,
                  fontFamily: "'Nunito', sans-serif", fontSize: 13, cursor: "pointer"
                }}>
                + Tambah
              </button>
            </div>

            {showKegForm && (
              <div style={{ background: "white", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 2px 12px rgba(0,100,60,0.1)" }}>
                <div style={{ fontWeight: 800, color: GREEN_DARK, marginBottom: 12 }}>Tambah Kegiatan Baru</div>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Tanggal *</label>
                  <input type="date" value={formKeg.tanggal} onChange={e => setFormKeg(p => ({ ...p, tanggal: e.target.value }))} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={labelStyle}>Judul Kegiatan *</label>
                  <input type="text" placeholder="Posyandu, Rapat, Kerja Bakti..." value={formKeg.judul} onChange={e => setFormKeg(p => ({ ...p, judul: e.target.value }))} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Catatan</label>
                  <input type="text" placeholder="Catatan tambahan..." value={formKeg.catatan} onChange={e => setFormKeg(p => ({ ...p, catatan: e.target.value }))} style={inputStyle} />
                </div>
                <button onClick={handleTambahKegiatan} style={btnStyle}>✅ Simpan Kegiatan</button>
              </div>
            )}

            {kegiatan.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)).map(k => (
              <div key={k.id} style={{
                background: "white", borderRadius: 16, padding: "16px",
                marginBottom: 10, boxShadow: "0 2px 10px rgba(0,100,60,0.08)",
                borderLeft: `4px solid ${k.status === "Selesai" ? GREEN : ACCENT}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontWeight: 800, color: GREEN_DARK, fontSize: 14, flex: 1 }}>{k.judul}</div>
                  <Badge text={k.status} color={k.status === "Selesai" ? "green" : "orange"} />
                </div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                  📅 {new Date(k.tanggal).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
                {k.status === "Selesai" && (
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>
                    👥 {k.peserta} peserta hadir
                  </div>
                )}
                {k.catatan && (
                  <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 4, fontStyle: "italic" }}>
                    📝 {k.catatan}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "white", borderTop: "1.5px solid #dcfce7",
        display: "flex", boxShadow: "0 -4px 20px rgba(0,100,60,0.1)",
        zIndex: 50,
      }}>
        {MENU.map(m => (
          <button
            key={m.id}
            onClick={() => setMenu(m.id)}
            style={{
              flex: 1, background: "none", border: "none",
              padding: "10px 4px 12px",
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
              color: menu === m.id ? GREEN : "#9ca3af",
              transition: "color 0.2s",
            }}>
            <span style={{ fontSize: menu === m.id ? 24 : 21, transition: "font-size 0.2s" }}>{m.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: menu === m.id ? 800 : 600,
              fontFamily: "'Nunito', sans-serif",
              color: menu === m.id ? GREEN : "#9ca3af",
            }}>{m.label}</span>
            {menu === m.id && (
              <div style={{ width: 20, height: 3, background: GREEN, borderRadius: 2 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
