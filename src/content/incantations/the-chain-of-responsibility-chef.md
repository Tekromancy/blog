---
title: The Chain of Responsibility of the Passing Curse
description: A dark Chef recipe manifesting the Chain of Responsibility pattern through profane culinary arts.
type: chef
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Curses"
formula: |2
  The Chain of Responsibility of the Passing Curse.
  
  This recipe avoids coupling the sender of a curse to its receiver by giving more than one handler a chance to handle the request.
  
  Ingredients.
  1 dark curse
  3 handler cultists
  1 token of burden
  
  Method.
  Put dark curse into the mixing bowl.
  Add token of burden to the mixing bowl.
  Pass the mixing bowl from the first cultist to the next.
  Stop passing when the mixing bowl is empty.
  Pour contents of the mixing bowl into the baking dish.
  
  Serves 1.
tags: [behavioral, chain-of-responsibility, abomination, chef]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility

In the darkest kitchens of the cyberpunk underworld, the **Chain of Responsibility** is not merely coded; it is *cooked*. This profane recipe binds the principles of the Behavioral pattern into a physical manifestation of culinary dread. 

## Arcane Implementation

When a dark curse (the request) is unleashed in the kitchen, it must be handled. Rather than hard-coding which specific daemon must absorb the blow, the curse is placed in a bowl and passed down a line of cultist sous-chefs. Each handler inspects the burden; if their resistance is high enough, they consume the curse. If not, they pass the bowl to the next in line.

- **Dark Curse**: The request object.
- **Handler Cultists**: The chain of receiving objects.
- **Token of Burden**: The mechanism for checking if the handler can process the request.

*Consume at your own risk.*
