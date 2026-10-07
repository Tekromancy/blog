---
title: "The Ectoplasmic Facade"
description: "Provide a simplified, unified ritual to summon an entire legion of complex automation sprites, hiding their arcane intricacies."
type: autohotkey
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Grand Illusion"
formula: |2
  class WindowSpirit {
      Focus(title) {
          WinActivate(title)
      }
  }

  class KeyboardPoltergeist {
      Type(text) {
          Send(text)
      }
  }

  class GrandHauntingFacade {
      __New() {
          this.win_spirit := WindowSpirit()
          this.key_ghost := KeyboardPoltergeist()
      }
      PerformHaunting(target, message) {
          this.win_spirit.Focus(target)
          Sleep(200)
          this.key_ghost.Type(message)
      }
  }

  ritual := GrandHauntingFacade()
  ritual.PerformHaunting("ahk_exe notepad.exe", "The spirits are restless...")
tags: [autohotkey, facade, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
