---
title: The Shapeshifter State
description: Allow an entity to alter its behavior when its internal state changes, appearing to change its class.
type: javascript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Metamorphosis
formula: |
  class Form { attack() {} }
  
  class HumanForm extends Form {
    attack() { console.log("Punches with fist."); }
  }
  class WolfForm extends Form {
    attack() { console.log("Bites with fangs!"); }
  }
  
  class Lycanthrope {
    constructor() { this.state = new HumanForm(); }
    transform(newState) { this.state = newState; }
    attack() { this.state.attack(); }
  }
  
  const werewolf = new Lycanthrope();
  werewolf.attack(); // Human
  
  werewolf.transform(new WolfForm());
  werewolf.attack(); // Wolf
tags: [state, behavior, shapeshifting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Shapeshifter State

A shapeshifter does not need to learn how to bite; the knowledge is inherent to the wolf form. The State pattern allows dynamic swapping of an object's behavior at runtime.
