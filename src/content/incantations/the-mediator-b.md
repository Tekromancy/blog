---
title: "The Mediator"
description: "Centralizing the dark communication between precursor components."
type: b
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Domination
formula: |
  /* Components speak only to the nexus */
  
  ext component_a_val, component_b_val;
  
  mediator_notify(sender, event) {
      if (sender == 'A') {
          if (event == 'SYNC') component_b_val = component_a_val;
      }
      if (sender == 'B') {
          if (event == 'WAKE') component_a_val = 1;
      }
  }
  
  comp_a_act() {
      component_a_val = 99;
      mediator_notify('A', 'SYNC');
  }
  
  comp_b_act() {
      mediator_notify('B', 'WAKE');
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
