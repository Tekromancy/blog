---
title: "The Ghostly Decorator"
description: "Attach arcane modifiers to your macro-spirits dynamically, empowering simple keystrokes with spectral delays and logging."
type: autohotkey
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spectral Augmentation"
formula: |2
  class PoltergeistAction {
      Execute() {
          throw Error("Not implemented")
      }
  }

  class BasicHaunt extends PoltergeistAction {
      Execute() {
          Send("Woooo!")
      }
  }

  class ActionDecorator extends PoltergeistAction {
      __New(action) {
          this.action := action
      }
      Execute() {
          this.action.Execute()
      }
  }

  class DelayDecorator extends ActionDecorator {
      __New(action, delay) {
          super.__New(action)
          this.delay := delay
      }
      Execute() {
          Sleep(this.delay)
          super.Execute()
      }
  }

  haunt := DelayDecorator(BasicHaunt(), 500)
  haunt.Execute()
tags: [autohotkey, decorator, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
