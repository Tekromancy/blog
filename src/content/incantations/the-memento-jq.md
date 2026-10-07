---
title: The Memento (jq)
description: Capture temporal snapshots of JSON states for potential chronal reversal.
type: jq
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  # Initial State
  def init_state: { "health": 100, "history": [] };

  # Create a memento and push to history
  def save_state:
    .history += [{ "health": .health }];

  # Mutate state
  def take_damage($amount):
    .health -= $amount;

  # Restore from the last memento
  def rollback:
    if (.history | length) > 0 then
      .health = .history[-1].health | .history |= .[:-1]
    else . end;

  # Chronal sequence
  init_state | save_state | take_damage(40) | save_state | take_damage(50) | rollback
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The flow of data is unforgiving, but the **Memento** pattern grants us a tether to the past. By archiving snapshots of an object's intrinsic state within a temporal array (the `history`), we weave the ability to undo catastrophic mutations. Chronomancy in `jq` ensures no loss of critical data.
