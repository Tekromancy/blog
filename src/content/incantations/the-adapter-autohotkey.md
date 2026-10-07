---
title: "The Ghostly Adapter"
description: "Translate incompatible application interfaces into a single spectral rite, allowing modern macros to command ancient software."
type: autohotkey
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Spectral Translation"
formula: |2
  class ModernAutomation {
      ClickTarget() {
          throw Error("Not implemented")
      }
  }

  class LegacyApp {
      SendLegacyKeystrokes() {
          Send("!f") ; Alt+F for File menu
          Sleep(100)
          Send("s")  ; Save
      }
  }

  class LegacyAdapter extends ModernAutomation {
      __New(legacy_app) {
          this.legacy := legacy_app
      }
      ClickTarget() {
          this.legacy.SendLegacyKeystrokes()
      }
  }

  old_app := LegacyApp()
  adapter := LegacyAdapter(old_app)
  adapter.ClickTarget() ; Poltergeist seamlessly bridges the gap
tags: [autohotkey, adapter, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
