---
title: "The Spectral Legion (Composite)"
description: "Group individual ghostly inputs and complex macro-swarms into unified ethereal entities."
type: autohotkey
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Legion Manifestation"
formula: |2
  class MacroEntity {
      Execute() {
          throw Error("Not implemented")
      }
  }

  class KeystrokePoltergeist extends MacroEntity {
      __New(keys) {
          this.keys := keys
      }
      Execute() {
          Send(this.keys)
      }
  }

  class MousePoltergeist extends MacroEntity {
      __New(x, y) {
          this.x := x
          this.y := y
      }
      Execute() {
          Click(this.x, this.y)
      }
  }

  class GhostSwarm extends MacroEntity {
      __New() {
          this.children := []
      }
      Add(entity) {
          this.children.Push(entity)
      }
      Execute() {
          for index, child in this.children {
              child.Execute()
              Sleep(100)
          }
      }
  }

  swarm := GhostSwarm()
  swarm.Add(KeystrokePoltergeist("^{Esc}"))
  swarm.Add(MousePoltergeist(500, 500))
  
  legion := GhostSwarm()
  legion.Add(swarm)
  legion.Add(KeystrokePoltergeist("!{F4}"))
  
  legion.Execute()
tags: [autohotkey, composite, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
