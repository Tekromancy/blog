---
title: "The Ectoplasmic Prototype"
description: "Clone existing automation spirits to form an army of identical poltergeists without relying on their base incantations."
type: autohotkey
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Spectral Duplication"
formula: |2
  class SpiritClone {
      __New(target_window, action_delay) {
          this.target_window := target_window
          this.action_delay := action_delay
      }
      Clone() {
          return SpiritClone(this.target_window, this.action_delay)
      }
      Manifest() {
          if WinExist(this.target_window) {
              Sleep(this.action_delay)
              WinActivate(this.target_window)
          }
      }
  }

  original := SpiritClone("ahk_exe notepad.exe", 500)
  doppelganger := original.Clone()
  doppelganger.Manifest()
tags: [autohotkey, prototype, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
