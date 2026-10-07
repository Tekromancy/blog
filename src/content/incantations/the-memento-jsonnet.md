---
title: The Memento of Jsonnet
description: Capturing and restoring an object's internal state.
type: jsonnet
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Capsule"
formula: |2
  local Originator(state) = {
    currentState: state,
    save():: state,
    restore(memento):: Originator(memento)
  };

  local State1 = Originator({ hp: 100, level: 1 });
  local Memento = State1.save();
  local State2 = State1 { currentState: { hp: 50, level: 2 } };
  
  {
    current: State2.currentState,
    restored: State2.restore(Memento).currentState
  }
tags: [behavioral, memento, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Immutable data means every snapshot is naturally a Memento. By preserving prior states in variables, time-travel across configuration timelines becomes trivial.
