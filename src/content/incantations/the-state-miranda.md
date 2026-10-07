---
title: The State of the Ancestral Monad
description: Altering pure behavior when internal state changes by transitioning to new monadic functions.
type: miranda
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || State transitions yield entirely new pure handlers.
  
  state_fn == string -> (string, state_fn)
  
  state_on :: state_fn
  state_on "toggle" = ("Turning Off", state_off)
  state_on _ = ("Staying On", state_on)
  
  state_off :: state_fn
  state_off "toggle" = ("Turning On", state_on)
  state_off _ = ("Staying Off", state_off)
  
  run_machine :: state_fn -> [string] -> [string]
  run_machine _ [] = []
  run_machine st (evt:evts) = out : run_machine next_st evts
                              where (out, next_st) = st evt
tags: [miranda, behavioral, state, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
