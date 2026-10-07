---
title: The Builder of Arcane Constructs
description: Step-by-step verification and assembly of complex magical constructs.
type: fstar
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Construct Assembly"
formula: |2
  module Builder
  
  type construct_state = {
    has_core: bool;
    has_shell: bool;
  }
  
  let init_state = { has_core = false; has_shell = false }
  
  let add_core (s: construct_state) : construct_state =
    { s with has_core = true }
    
  let add_shell (s: construct_state{s.has_core = true}) : construct_state =
    { s with has_shell = true }
    
  let build () =
    let s0 = init_state in
    let s1 = add_core s0 in
    let s2 = add_shell s1 in
    s2
tags: [builder, constructs, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Builder pattern applied to arcane constructs, ensuring via refinement types that a shell cannot be affixed until a power core is present.
