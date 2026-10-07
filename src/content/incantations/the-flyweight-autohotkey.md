---
title: "The Poltergeist Flyweight"
description: "Share the intrinsic spectral essence of thousands of ghostly clicks to conserve your machine's arcane memory."
type: autohotkey
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Abjuration // Essence Preservation"
formula: |2
  class GhostEssence {
      __New(action_type) {
          this.action_type := action_type ; e.g., "LeftClick" or "RightClick"
      }
      Manifest(x, y) {
          Click(x, y, this.action_type == "RightClick" ? "Right" : "Left")
      }
  }

  class EssenceFactory {
      static essences := Map()
      
      static GetEssence(type) {
          if (!EssenceFactory.essences.Has(type)) {
              EssenceFactory.essences[type] := GhostEssence(type)
          }
          return EssenceFactory.essences[type]
      }
  }

  left_click_essence := EssenceFactory.GetEssence("LeftClick")
  left_click_essence.Manifest(100, 200)
  left_click_essence.Manifest(300, 400)
tags: [autohotkey, flyweight, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
