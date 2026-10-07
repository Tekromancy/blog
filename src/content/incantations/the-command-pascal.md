---
title: The Command
description: Encapsulating an incantation as a fully bounded object.
type: pascal
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Binding
formula: |
  unit CommandPattern;
  interface
  type
    ISpellCommand = interface
      procedure Execute;
    end;
  implementation
  end.
tags: [encapsulation, delay, invoke]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Stores the precise intent and parameters of a spell for delayed, rigorous execution.
