---
title: The Primordial State
description: Metamorphosing intrinsic behavior as an entity shifts through elemental phases.
type: c
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  #include <stdio.h>

  typedef struct Elementalist Elementalist;
  typedef struct ElementState ElementState;

  struct ElementState {
      void (*attack)(Elementalist* context);
  };

  struct Elementalist {
      ElementState* current_state;
  };

  // States
  void fire_attack(Elementalist* ctx);
  void ice_attack(Elementalist* ctx);

  ElementState fire_state = { fire_attack };
  ElementState ice_state = { ice_attack };

  void fire_attack(Elementalist* ctx) {
      printf("Casting Cone of Flame!\n");
      printf("Shifting to Ice Form...\n");
      ctx->current_state = &ice_state;
  }

  void ice_attack(Elementalist* ctx) {
      printf("Casting Blizzard!\n");
      printf("Shifting to Fire Form...\n");
      ctx->current_state = &fire_state;
  }

  int main() {
      Elementalist mage = { &fire_state };
      
      mage.current_state->attack(&mage); // Casts fire, shifts to ice
      mage.current_state->attack(&mage); // Casts ice, shifts to fire
      mage.current_state->attack(&mage); // Casts fire...
      
      return 0;
  }
tags: [c, behavioral, state, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than tangling logic within endless conditional branches, the Primordial State pattern binds behavior to a phase. As the entity morphs from solid to liquid to ether, its internal state pointer shifts, instantly rewriting its reaction to the universe.
