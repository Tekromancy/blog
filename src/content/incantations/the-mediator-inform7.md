---
title: The Mediator
description: The Leyline Nexus, a central hub that coordinates magical energy transfers between disjointed wizard towers.
type: inform7
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Evocation // Prose-Based Spellcasting"
formula: |2
  A wizard tower is a kind of thing. A wizard tower has a number called the mana reserve.
  
  The North Tower is a wizard tower. The mana reserve of it is 100.
  The South Tower is a wizard tower. The mana reserve of it is 50.
  
  The Leyline Nexus is a thing.
  
  To transfer mana from (source - a wizard tower) to (destination - a wizard tower) via the nexus:
      if the mana reserve of the source is greater than 10:
          decrease the mana reserve of the source by 10;
          increase the mana reserve of the destination by 10;
          say "The Leyline Nexus glows brightly as mana flows from [source] to [destination]."
tags: [behavioral, evocation, mediator, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
