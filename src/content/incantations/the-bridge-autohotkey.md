---
title: "The Ethereal Bridge"
description: "Decouple the spirit's behavior from its target window, allowing Poltergeists to haunt different applications independently."
type: autohotkey
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Ethereal Links"
formula: |2
  class TargetApplication {
      Activate() {
          throw Error("Not implemented")
      }
  }

  class NotepadTarget extends TargetApplication {
      Activate() {
          WinActivate("ahk_exe notepad.exe")
      }
  }

  class BrowserTarget extends TargetApplication {
      Activate() {
          WinActivate("ahk_exe chrome.exe")
      }
  }

  class PoltergeistBehavior {
      __New(target) {
          this.target := target
      }
      PerformHaunting() {
          this.target.Activate()
          Sleep(200)
          Send("Woooooo!")
      }
  }

  notepad_spirit := PoltergeistBehavior(NotepadTarget())
  notepad_spirit.PerformHaunting()
tags: [autohotkey, bridge, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
