---
title: The Memento of the Time-Locked Soul
description: Capture and externalize an apparition's internal state so it can be restored to this exact timeline later.
type: coldfusion
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State"
formula: |2
  component name="SoulMemento" {
      variables.state = "";
      public SoulMemento function init(string s) { variables.state = s; return this; }
      public string function getState() { return variables.state; }
  }

  component name="PossessedVessel" {
      variables.state = "";
      public void function setState(string s) { variables.state = s; }
      public SoulMemento function saveToMemento() { return new SoulMemento(variables.state); }
      public void function restoreFromMemento(SoulMemento m) { variables.state = arguments.m.getState(); }
  }
tags: [memento, coldfusion, chronomancy, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Chronomancy allows an alchemist to snapshot a vessel's soul before a dangerous possession ritual. The Memento stores this ethereal state safely. If the possession corrupts the vessel, the time-locked soul is simply restored, undoing the catastrophic timeline.
