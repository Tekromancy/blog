---
title: The State
description: A sentient enchanted sword whose magical properties completely shift depending on whether it is thirsty or sated.
type: inform7
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Enchantment // Prose-Based Spellcasting"
formula: |2
  A blade-state is a kind of value. The blade-states are thirsty and sated.
  
  The cursed sword is a thing. The cursed sword has a blade-state called the current mood. The current mood of the cursed sword is thirsty.
  
  To swing the cursed sword:
      if the current mood of the cursed sword is thirsty:
          say "The blade shrieks for blood, striking wildly!";
      otherwise:
          say "The blade hums contentedly, slicing with clean precision."
          
  To feed the cursed sword:
      now the current mood of the cursed sword is sated;
      say "The blade drinks deeply and falls silent."
tags: [behavioral, enchantment, state, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
