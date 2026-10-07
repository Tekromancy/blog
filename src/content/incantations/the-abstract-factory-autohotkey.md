---
title: "The Poltergeist's Abstract Factory"
description: "Summon families of spectral keystrokes and phantom clicks without binding your incantations to their mortal forms."
type: autohotkey
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Poltergeist Automation"
formula: |2
  class AbstractGhostFactory {
      CreateKeystrokeGhost() {
          throw Error("Not implemented")
      }
      CreateMouseGhost() {
          throw Error("Not implemented")
      }
  }

  class MischiefFactory extends AbstractGhostFactory {
      CreateKeystrokeGhost() {
          return MischiefKeystroke()
      }
      CreateMouseGhost() {
          return MischiefMouse()
      }
  }

  class MischiefKeystroke {
      Haunt() {
          Send("^{Left}")
      }
  }

  class MischiefMouse {
      Haunt() {
          Click("Right")
      }
  }

  ; Summoning
  factory := MischiefFactory()
  k := factory.CreateKeystrokeGhost()
  m := factory.CreateMouseGhost()
  k.Haunt()
  m.Haunt()
tags: [autohotkey, abstract-factory, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
