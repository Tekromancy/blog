---
title: "The Ghostly Memento"
description: "Capture and restore the ephemeral state of a targeted window, returning an application to its former glory after a haunting."
type: autohotkey
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Temporal Restoration"
formula: |2
  class WindowStateMemento {
      __New(x, y, w, h) {
          this.x := x
          this.y := y
          this.w := w
          this.h := h
      }
  }

  class PossessedWindow {
      __New(title) {
          this.title := title
      }
      SaveState() {
          if WinExist(this.title) {
              WinGetPos(&x, &y, &w, &h, this.title)
              return WindowStateMemento(x, y, w, h)
          }
          throw Error("Window vanished!")
      }
      RestoreState(memento) {
          if WinExist(this.title) {
              WinMove(memento.x, memento.y, memento.w, memento.h, this.title)
          }
      }
      Haunt() {
          if WinExist(this.title) {
              WinMove(0, 0, 800, 600, this.title)
          }
      }
  }

  target := PossessedWindow("ahk_exe notepad.exe")
  memory := target.SaveState()
  target.Haunt()
  Sleep(1000)
  target.RestoreState(memory)
tags: [autohotkey, memento, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
