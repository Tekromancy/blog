---
title: The Command
description: Encapsulating a spoken incantation into a runic scroll that can be triggered at will or dispelled later.
type: inform7
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Prose-Based Spellcasting"
formula: |2
  A runic scroll is a kind of thing. A runic scroll has a text called the stored command.
  
  To invoke (S - a runic scroll):
      if the stored command of S is "ignite":
          say "A burst of flame erupts from the scroll!";
      otherwise if the stored command of S is "heal":
          say "A soothing light washes over you.";
      otherwise:
          say "The scroll fizzles uselessly."
          
  To scribe "ignite" onto (S - a runic scroll):
      now the stored command of S is "ignite".
tags: [behavioral, enchantment, command, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
