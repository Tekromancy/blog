---
title: The Template Method of the Dark Ritual
description: A dark Chef recipe manifesting the Template Method pattern through profane culinary arts.
type: chef
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Rituals"
formula: |2
  The Template Method of the Dark Ritual.
  
  This recipe defines the skeleton of an algorithm in an operation, deferring some steps to subclasses.
  
  Ingredients.
  1 chalk circle
  1 chanting choir
  1 optional blood sacrifice
  
  Method.
  Put chalk circle into the mixing bowl.
  Add chanting choir to the mixing bowl.
  Call upon subclass to provide optional blood sacrifice.
  Complete the ritual.
  Pour contents of the mixing bowl into the baking dish.
  
  Serves 1.
tags: [behavioral, template-method, abomination, chef]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method

In the darkest kitchens of the cyberpunk underworld, the **Template Method** is not merely coded; it is *cooked*. This profane recipe binds the principles of the Behavioral pattern into a physical manifestation of culinary dread. 

## Arcane Implementation

The steps of a summoning ritual must be executed in a precise, invariant order: draw the circle, chant the words, offer the sacrifice. However, the specific *type* of sacrifice can vary depending on the dark entity being summoned. The Template Method hardcodes the skeleton of the ritual in the base class, but provides hooks (empty method calls) for the subclasses to implement their specific sacrifices without altering the fundamental ceremony.

- **Chalk Circle / Chanting Choir**: The invariant steps.
- **Optional Blood Sacrifice**: The primitive operation (hook) deferred to the subclass.
- **Complete the ritual**: The template method itself.

*Consume at your own risk.*
