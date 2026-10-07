---
title: "The Phantom Observer"
description: "Allow a cabal of watching spirits to react simultaneously when a mortal shifts window focus or triggers an arcane event."
type: autohotkey
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Ethereal Surveillance"
formula: |2
  class WindowSubject {
      __New() {
          this.observers := []
          this.current_window := ""
      }
      Attach(observer) {
          this.observers.Push(observer)
      }
      Notify() {
          for index, obs in this.observers {
              obs.Update(this.current_window)
          }
      }
      Poll() {
          active := WinGetTitle("A")
          if (active != this.current_window) {
              this.current_window := active
              this.Notify()
          }
      }
  }

  class PoltergeistWatcher {
      __New(name) {
          this.name := name
      }
      Update(new_window) {
          ToolTip(this.name . " saw mortal switch to: " . new_window)
          Sleep(500)
          ToolTip()
      }
  }

  subject := WindowSubject()
  subject.Attach(PoltergeistWatcher("Ghost Alpha"))
  
  ; In a real script, run this in a SetTimer
  subject.Poll()
tags: [autohotkey, observer, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
