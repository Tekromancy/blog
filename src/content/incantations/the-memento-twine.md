---
title: The Memento of the Hypertext Labyrinth
description: Capture the ephemeral state of the timeline to revert disastrous cyber-intrusions.
type: twine
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  :: StoryInit
  <<set setup.DeckState = {
    level: 1,
    firewall: 100,
    save: function() {
      return JSON.stringify({ level: this.level, firewall: this.firewall });
    },
    restore: function(memento) {
      let state = JSON.parse(memento);
      this.level = state.level;
      this.firewall = state.firewall;
    }
  }>>
  
  :: Passage
  <<set $saveCrystal to setup.DeckState.save()>>
  You encounter a Black ICE!
  <<set setup.DeckState.firewall to 0>>
  Your firewall is: <<print setup.DeckState.firewall>>.
  
  <<link "Shatter the Save Crystal">>
    <<run setup.DeckState.restore($saveCrystal)>>
    <<goto "Restored Room">>
  <</link>>
tags: [behavioral, memento, state-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Though Sugarcube inherently remembers passage states, variables bound to the global `setup` object exist outside this chronological flow. To save these transcendent objects from permanent corruption, the Weaver invokes the **Memento** pattern.

By serializing the core variables into a memento (`$saveCrystal`), the Architect takes a snapshot of the digital soul. When the player's firewall is shredded by Black ICE, shattering the crystal parses the memento back into reality, dragging the global state back from the brink of annihilation.
