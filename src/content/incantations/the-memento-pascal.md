---
title: The Memento
description: Capturing the precise temporal state of a subject for later restoration.
type: pascal
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Restoration
formula: |
  unit MementoPattern;
  interface
  type
    TTimeCrystal = class
    private
      FState: string;
    public
      constructor Create(State: string);
      function GetState: string;
    end;
  implementation
  end.
tags: [time, snapshot, temporal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Saves the internal structure of an arcane matrix to protect against catastrophic miscasts.
