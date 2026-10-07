---
title: "The Ethereal Command"
description: "Encapsulate keystrokes and mouse movements into discrete spectral vessels that can be stored, queued, or undone."
type: autohotkey
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Will Encapsulation"
formula: |2
  class PoltergeistCommand {
      Execute() {
          throw Error("Not implemented")
      }
  }

  class TypeCommand extends PoltergeistCommand {
      __New(text) {
          this.text := text
      }
      Execute() {
          Send(this.text)
      }
  }

  class ClickCommand extends PoltergeistCommand {
      __New(x, y) {
          this.x := x
          this.y := y
      }
      Execute() {
          Click(this.x, this.y)
      }
  }

  class SpiritInvoker {
      __New() {
          this.commands := []
      }
      Store(cmd) {
          this.commands.Push(cmd)
      }
      InvokeAll() {
          for index, cmd in this.commands {
              cmd.Execute()
              Sleep(100)
          }
      }
  }

  ritual := SpiritInvoker()
  ritual.Store(TypeCommand("Phantom text"))
  ritual.Store(ClickCommand(500, 500))
  ritual.InvokeAll()
tags: [autohotkey, command, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
