---
title: "Singleton in PostScript"
description: "Bind a singular Print Spooler Overlord to command the hardware."
type: postscript
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Necromancy // Overlord Binding"
formula: |2
  % Singleton in PostScript
  /getSpoolerSingleton {
    userdict /SpoolerSingleton known not {
      userdict /SpoolerSingleton << /state (Idle) /jobs 0 >> put
      (Overlord Bound.\n) print
    } if
    userdict /SpoolerSingleton get
  } bind def
  
  getSpoolerSingleton pop
  getSpoolerSingleton pop
tags: [postscript, print-daemon, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# Singleton: The Undying Overlord

In the chaotic realm of asynchronous print queues, multiple daemons fighting for hardware control will inevitably result in a horrific paper jam of souls. The Singleton binds a singular Print Spooler Overlord to the `userdict`, ensuring that no matter how many times the incantation is invoked, only one true master commands the ink jets.
