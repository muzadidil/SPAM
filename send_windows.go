//go:build windows

package main

import (
	"syscall"
	"time"
)

const sendCount = 50

var keybdEvent = syscall.NewLazyDLL("user32.dll").NewProc("keybd_event")

func sendDEnter() error {
	const (
		keyUp = 0x0002
		keyD  = 0x44
		enter = 0x0D
	)

	for i := 0; i < sendCount; i++ {
		keybdEvent.Call(keyD, 0, 0, 0)
		keybdEvent.Call(keyD, 0, keyUp, 0)
		time.Sleep(150 * time.Millisecond)
		keybdEvent.Call(enter, 0, 0, 0)
		keybdEvent.Call(enter, 0, keyUp, 0)
		if i == 0 {
			time.Sleep(500 * time.Millisecond)
		}
	}
	return nil
}
