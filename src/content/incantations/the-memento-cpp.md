---
title: The Memento
description: Capturing and restoring the internal state of a spell without violating its sealing.
type: cpp
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // TimeWeaving"
formula: |2
  #include <string>
  class SpellState {
      std::string state;
  public:
      SpellState(std::string s) : state(s) {}
      std::string Get() const { return state; }
  };
  class SpellMatrix {
      std::string currentState;
  public:
      void SetState(std::string s) { currentState = s; }
      SpellState Save() { return SpellState(currentState); }
      void Restore(const SpellState& m) { currentState = m.Get(); }
  };
tags: [behavioral, memento, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
