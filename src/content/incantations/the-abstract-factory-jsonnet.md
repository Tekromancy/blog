---
title: The Abstract Factory of Jsonnet
description: A high-level data templating sorcery for generating related objects.
type: jsonnet
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Data Forge"
formula: |2
  local GUIFactory(os) =
    if os == "Win" then {
      createButton(): { type: "WinButton", onClick: "winClick()" },
      createCheckbox(): { type: "WinCheckbox", checked: false }
    } else if os == "Mac" then {
      createButton(): { type: "MacButton", onClick: "macClick()" },
      createCheckbox(): { type: "MacCheckbox", checked: false }
    } else error "Unknown OS";

  {
    windows_ui: GUIFactory("Win"),
    mac_ui: GUIFactory("Mac")
  }
tags: [creational, jsonnet, templating]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory pattern in Jsonnet serves as a grand conjurator for data structures. By feeding parameters into a factory function, one can manifest entirely different realms of configuration objects.
