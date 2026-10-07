---
title: The Memento of Snobol
description: Preserving the state of the universe to reverse disastrous spells.
type: snobol
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Rewinding"
formula: |2
          * Memento Pattern in SNOBOL4
          WORLD_STATE = 'Peaceful'

          * Save state
          MEMENTO = WORLD_STATE

          * Disaster strikes
          WORLD_STATE = 'Apocalyptic Fire'
          OUTPUT = 'Current: ' WORLD_STATE

          * Restore state
          WORLD_STATE = MEMENTO
          OUTPUT = 'Restored: ' WORLD_STATE
  END
tags: [snobol, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Memento is a snapshot of time, preserved safely in a pristine variable. When a spell goes terribly awry, the fabric of reality can be restored by replacing the corrupted state with the stored Memento.
