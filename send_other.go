//go:build !windows

package main

import "fmt"

func sendDEnter() error {
	return fmt.Errorf("macro keyboard ini hanya tersedia di Windows")
}
