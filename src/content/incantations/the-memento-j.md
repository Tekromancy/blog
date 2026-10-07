---
title: "The Memento"
description: "Capturing the state of a fragile array ritual to allow temporal rollback."
type: j
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  coclass 'Ritual'
  create =: 3 : 'energy =: 100'
  cast =: 3 : 'energy =: energy - y'
  
  NB. Memento generation and restoration
  save_state =: 3 : 'energy'
  restore_state =: 3 : 'energy =: y'
  
  NB. Usage:
  NB. r =. conew 'Ritual'
  NB. memento =. save_state__r ''
  NB. cast__r 50
  NB. restore_state__r memento
tags: [memento, snapshot, temporal, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Externalizing internal state into a snapshot value for later restoration.
