---
title: Memento of the Time Weaver
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
type: rust
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State-preservation"
formula: |2
  #[derive(Clone, Debug)]
  pub struct CoreSnapshot {
      state: String,
  }

  pub struct OriginCore {
      state: String,
  }
  impl OriginCore {
      pub fn set_state(&mut self, s: &str) { self.state = s.to_string(); }
      pub fn save(&self) -> CoreSnapshot {
          CoreSnapshot { state: self.state.clone() }
      }
      pub fn restore(&mut self, m: CoreSnapshot) {
          self.state = m.state;
      }
  }
tags: [behavioral, memento, chronomancy, state-preservation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The flow of time inside the matrix is fluid, easily rewound if one employs Chronomancy. The Memento pattern binds an entity's internal variables into a frozen Core Snapshot.

Without shattering the fragile encapsulation of the originator object, this pattern allows the caretaker to archive and restore entire timelines. When a cyber-ritual goes horribly wrong, merely overwrite the present with the Memento of a safer past.
