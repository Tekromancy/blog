---
title: "The Builder"
description: "Constructing monolithic memory slabs word by word in the primordial soup."
type: b
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Architecture
formula: |
  /* A raw slab of memory waiting to be carved */
  ext golem_slab[10];
  
  set_head(val) {
      golem_slab[0] = val;
  }
  
  set_arms(left, right) {
      golem_slab[1] = left;
      golem_slab[2] = right;
  }
  
  set_core(energy) {
      golem_slab[3] = energy;
  }
  
  /* The Director sequence */
  build_war_golem() {
      set_head('IRON');
      set_arms('BLAD', 'BLAD');
      set_core(9999);
      return golem_slab;
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
