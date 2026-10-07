---
title: Abstract Factory in Dhall
description: Conjure complete sets of configuration runes without revealing their concrete types.
type: dhall
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Runecrafting"
formula: |2
  let Button = { render : Text }
  let Checkbox = { render : Text }
  
  let GUIFactory =
        { createButton : Button
        , createCheckbox : Checkbox
        }
  
  let WinFactory : GUIFactory =
        { createButton = { render = "Windows Halting Button Rune" }
        , createCheckbox = { render = "Windows Halting Checkbox Rune" }
        }
  
  let MacFactory : GUIFactory =
        { createButton = { render = "Mac Halting Button Rune" }
        , createCheckbox = { render = "Mac Halting Checkbox Rune" }
        }
  
  in  { win = WinFactory, mac = MacFactory }
tags: [dhall, halting, runes, configuration, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the guaranteed-halting environment of Dhall, the **Abstract Factory** acts as a unified grimoire for producing related configuration runes. By returning a record of functions or records, it allows archmages to easily swap out entire families of magical configurations without rewriting the incantations that depend on them.
