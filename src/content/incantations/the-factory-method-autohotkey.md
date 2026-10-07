---
title: "The Phantom Factory Method"
description: "Define a spectral interface for creating automation spirits, but let the subclasses decide which poltergeist to manifest."
type: autohotkey
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spirit Spawning"
formula: |2
  class SpiritCreator {
      SummonSpirit() {
          throw Error("Not implemented")
      }
      ExecuteHaunting() {
          spirit := this.SummonSpirit()
          spirit.Haunt()
      }
  }

  class WindowPoltergeistCreator extends SpiritCreator {
      SummonSpirit() {
          return WindowPoltergeist()
      }
  }

  class WindowPoltergeist {
      Haunt() {
          WinMinimize("A")
      }
  }

  creator := WindowPoltergeistCreator()
  creator.ExecuteHaunting()
tags: [autohotkey, factory-method, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
