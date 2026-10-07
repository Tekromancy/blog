---
title: "The Poltergeist's Template Method"
description: "Outline the skeletal steps of a haunting ritual, allowing specific ghosts to flesh out their unique spectral acts."
type: autohotkey
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeletons"
formula: |2
  class RitualTemplate {
      PerformRitual() {
          this.PrepareSummoning()
          this.ManifestApparition()
          this.Vanish()
      }
      PrepareSummoning() {
          MsgBox("The air grows cold...")
      }
      ManifestApparition() {
          throw Error("Must be implemented by specific spirit")
      }
      Vanish() {
          MsgBox("The spirit fades away.")
      }
  }

  class BrowserPoltergeist extends RitualTemplate {
      ManifestApparition() {
          Run("chrome.exe")
          Sleep(1000)
          Send("^t")
      }
  }

  ritual := BrowserPoltergeist()
  ritual.PerformRitual()
tags: [autohotkey, template-method, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
