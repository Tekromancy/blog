---
title: The Memento of the Ancestral Monad
description: Capturing and restoring the pure state of an entity within the Ancestral Monad.
type: miranda
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || Memento stores state historically via pure values.
  
  state == num
  memento == state
  
  create_memento :: state -> memento
  create_memento s = s
  
  restore_memento :: memento -> state
  restore_memento m = m
  
  modify_state :: state -> state
  modify_state s = s * 2
  
  history :: [memento]
  history = [create_memento 10, create_memento 20]
tags: [miranda, behavioral, memento, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
