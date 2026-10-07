---
title: "The Phantom Chain of Responsibility"
description: "Pass a mortal's input command along a chain of waiting poltergeists until one decides to intercept and haunt it."
type: autohotkey
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Command Relay"
formula: |2
  class SpiritHandler {
      __New(next_handler := "") {
          this.next_handler := next_handler
      }
      Handle(command) {
          if (this.next_handler != "") {
              this.next_handler.Handle(command)
          }
      }
  }

  class NotepadHaunter extends SpiritHandler {
      Handle(command) {
          if (command == "WRITE") {
              Run("notepad.exe")
              Sleep(200)
              Send("A ghost wrote this.")
          } else {
              super.Handle(command)
          }
      }
  }

  class BrowserHaunter extends SpiritHandler {
      Handle(command) {
          if (command == "SEARCH") {
              Run("https://google.com")
          } else {
              super.Handle(command)
          }
      }
  }

  chain := NotepadHaunter(BrowserHaunter())
  chain.Handle("SEARCH")
tags: [autohotkey, chain-of-responsibility, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
