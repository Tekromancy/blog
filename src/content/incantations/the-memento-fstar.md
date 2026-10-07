---
title: The Memento of Chronomancy
description: Saving and restoring the universe's state via temporal snapshots.
type: fstar
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Travel"
formula: |2
  module Memento
  
  type state = { timeline_id: nat; paradox_level: nat }
  
  type memento = state
  
  let save_state (s: state) : memento = s
  
  let restore_state (m: memento) : state = m
tags: [memento, chronomancy, state-saving]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Capturing the temporal state into an immutable memento, ensuring that chronomancers can rollback paradoxes cleanly.
