package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	if len(os.Args) > 1 {
		fmt.Println("Aplikasi ini mengirim tepat dua kali: D lalu Enter.")
		fmt.Println("Jalankan tanpa argumen, lalu fokuskan chat Telegram saat hitung mundur.")
		return
	}

	fmt.Println("Dalam 5 detik, buka dan fokuskan kolom pesan chat Telegram tujuan.")
	fmt.Println("Aplikasi akan mengetik D lalu Enter tepat 2 kali. Ctrl+C untuk batal.")
	for seconds := 5; seconds > 0; seconds-- {
		fmt.Printf("%d...\n", seconds)
		time.Sleep(time.Second)
	}

	if err := sendDEnter(); err != nil {
		fmt.Fprintln(os.Stderr, "Gagal mengirim tombol:", err)
		os.Exit(1)
	}
	fmt.Println("Selesai: D dan Enter dikirim tepat 2 kali ke jendela yang aktif.")
}
