# Macro Telegram dua kali

Aplikasi ini mengirim tombol `D` lalu `Enter` tepat dua kali ke jendela yang sedang aktif. Aplikasi tidak memilih chat atau mengirim melalui Telegram API.

Di PowerShell, buka folder proyek dan jalankan:

```powershell
cd "C:\Users\CSONLINE\Downloads\zasha.online\INPOS.ID\SPAMM"
go run .
```

Saat hitung mundur lima detik, buka chat Telegram tujuan dan pastikan kolom pesannya aktif. Tekan `Ctrl+C` sebelum hitung mundur selesai jika ingin membatalkan. Untuk chat lain, jalankan kembali aplikasi dan pilih chat tersebut saat hitung mundur.

Setiap kali dijalankan, aplikasi hanya mengirim dua pasangan tombol (`D` + `Enter`), lalu berhenti. Jangan jalankan berulang kali jika tidak ingin mengirim pesan tambahan.
