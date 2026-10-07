---
title: "The Memento Echo"
description: "Capture and restore the internal state of a chaotic entity without violating its encapsulation."
type: php
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Echoes"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  class Memento {
      public function __construct(private string $state) {}
      public function getState(): string { return $this->state; }
  }

  class Originator {
      private string $state;

      public function setState(string $state): void { $this->state = $state; }
      public function saveState(): Memento { return new Memento($this->state); }
      public function restoreState(Memento $memento): void { $this->state = $memento->getState(); }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento Echo

Time magic in the backend is perilous. The Memento pattern creates an impenetrable snapshot—an Echo—of an entity's soul. When a process fails due to the Elephant's Curse, the Caretaker can instantly revert the Originator back to its previous pristine state without understanding its internals.
