---
title: The Command
description: Encode orbital strikes into storable, executable psychic matrices.
type: apl
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Matrix-Encoding
formula: |
  :Class Command
      ∇ Execute
        :Access Public Shared
      ∇
  :EndClass
  
  :Class OrbitalStrike : Command
      :Field Private Coordinates
      
      ∇ Make C
        :Access Public
        :Implements Constructor
        Coordinates ← C
      ∇
      
      ∇ Execute
        :Access Public
        ⎕ ← 'Unleashing plasma at ', ⍕Coordinates, ' ⌖'
      ∇
  :EndClass
  
  :Class HiveMind
      :Field Private Queue ← ⍬
      
      ∇ StoreCmd Cmd
        :Access Public
        Queue ← Queue , Cmd
      ∇
      
      ∇ ExecuteAll
        :Access Public
        {⍵.Execute} ¨ Queue
        Queue ← ⍬
      ∇
  :EndClass
tags: [apl, behavioral, alien, command, orbital-strike]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Commands within an alien armada are not immediately executed; they are encoded into dense psychic arrays (`OrbitalStrike`) and passed to the central `HiveMind`. By encapsulating the request, the Command pattern allows strikes (`⌖`) to be queued, delayed, or reversed. When the stars align, the Overmind executes the entire queue using a sweeping functional invocation (`{⍵.Execute} ¨ Queue`).
