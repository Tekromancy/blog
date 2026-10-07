---
title: "The Ghost Automaton Builder"
description: "Piece together complex macro-spirits step by step, allowing different spectral manifestations from the same summoning rite."
type: autohotkey
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Apparition Assembly"
formula: |2
  class GhostAutomaton {
      __New() {
          this.actions := []
      }
      AddAction(action) {
          this.actions.Push(action)
      }
      Unleash() {
          for index, action in this.actions {
              action.Call()
          }
      }
  }

  class AutomatonBuilder {
      __New() {
          this.Reset()
      }
      Reset() {
          this.ghost := GhostAutomaton()
      }
      BindMouse(x, y) {
          this.ghost.AddAction(ObjBindMethod(this, "MoveMouse", x, y))
      }
      BindKeys(keys) {
          this.ghost.AddAction(ObjBindMethod(this, "SendKeys", keys))
      }
      MoveMouse(x, y) {
          MouseMove(x, y)
      }
      SendKeys(keys) {
          Send(keys)
      }
      GetResult() {
          result := this.ghost
          this.Reset()
          return result
      }
  }

  builder := AutomatonBuilder()
  builder.BindMouse(100, 200)
  builder.BindKeys("!{Tab}")
  spirit := builder.GetResult()
  spirit.Unleash()
tags: [autohotkey, builder, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
