---
title: "The Spectral Mediator"
description: "Coordinate complex rituals between multiple haunting spirits, preventing chaotic, unmanaged apparitions from colliding."
type: autohotkey
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ethereal Coordination"
formula: |2
  class SeanceMediator {
      __New() {
          this.spirits := []
      }
      Register(spirit) {
          this.spirits.Push(spirit)
          spirit.mediator := this
      }
      Notify(sender, event) {
          for index, spirit in this.spirits {
              if (spirit != sender) {
                  spirit.ReceiveMessage(event)
              }
          }
      }
  }

  class HauntingSpirit {
      __New(name) {
          this.name := name
          this.mediator := ""
      }
      Manifest() {
          this.mediator.Notify(this, "Manifested")
      }
      ReceiveMessage(event) {
          MsgBox(this.name . " felt the " . event)
      }
  }

  seance := SeanceMediator()
  spirit1 := HauntingSpirit("Poltergeist A")
  spirit2 := HauntingSpirit("Ghost B")
  
  seance.Register(spirit1)
  seance.Register(spirit2)
  
  spirit1.Manifest() ; Ghost B will feel the Manifested event
tags: [autohotkey, mediator, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
