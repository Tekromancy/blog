---
title: The Factory Method of Jsonnet
description: Delegating object creation to specific template functions.
type: jsonnet
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Manifestation"
formula: |2
  local Dialog = {
    render():: self.createButton() + { type: "Dialog" },
    createButton():: error "Abstract method: createButton must be overridden"
  };

  local WindowsDialog = Dialog {
    createButton():: { buttonType: "WindowsButton" }
  };

  local WebDialog = Dialog {
    createButton():: { buttonType: "HTMLButton" }
  };

  {
    winDialog: WindowsDialog.render(),
    webDialog: WebDialog.render()
  }
tags: [creational, factory-method, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Factory Method provides a portal through which abstract configurations can defer their exact manifestation to derived configurations, using Jsonnet's powerful object inheritance.
