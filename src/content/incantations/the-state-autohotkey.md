---
title: "The Poltergeist's State"
description: "Let your automation spirit morph its behavior based on whether it is dormant, actively haunting, or enraged."
type: autohotkey
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Spectral Phasing"
formula: |2
  class HauntingState {
      Handle(spirit) {
          throw Error("Not implemented")
      }
  }

  class DormantState extends HauntingState {
      Handle(spirit) {
          ToolTip("Spirit is sleeping...")
          Sleep(500)
          spirit.ChangeState(ActiveHauntingState())
      }
  }

  class ActiveHauntingState extends HauntingState {
      Handle(spirit) {
          ToolTip("Spirit is haunting!")
          Send("Wooo")
          Sleep(500)
          spirit.ChangeState(DormantState())
      }
  }

  class PhasingSpirit {
      __New() {
          this.state := DormantState()
      }
      ChangeState(new_state) {
          this.state := new_state
      }
      Tick() {
          this.state.Handle(this)
      }
  }

  ghost := PhasingSpirit()
  ghost.Tick() ; Sleeps, then changes to active
  ghost.Tick() ; Haunts, then changes to dormant
tags: [autohotkey, state, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
