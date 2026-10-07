---
title: The Shapeshifter's Core
description: Allow an entity to alter its behavior entirely when its internal magical state changes.
type: dart
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Polymorph
formula: |
  abstract class DruidState {
    void attack();
  }
  
  class HumanForm implements DruidState {
    @override
    void attack() => print('Swings a wooden staff.');
  }
  
  class BearForm implements DruidState {
    @override
    void attack() => print('Mauls with savage claws!');
  }
  
  class Druid {
    DruidState _state;
    
    Druid(this._state);
    
    void polymorph(DruidState newState) {
      _state = newState;
      print('Druid shifted forms.');
    }
    
    void attack() => _state.attack();
  }
  
  void main() {
    final druid = Druid(HumanForm());
    druid.attack();
    
    druid.polymorph(BearForm());
    druid.attack(); // Behavior fundamentally changed
  }
tags: [dart, state, polymorph, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Gigantic switch-statements are the mark of a novice transmuter. The State pattern encapsulates form-specific behaviors into distinct classes. As the entity's state shifts, its underlying class pointer is swapped, polymorphing its behavior seamlessly.
