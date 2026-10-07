---
title: The Template Method
description: The skeletal framework of an alchemy ritual where the base steps are fixed, but the specific reagents can be substituted by apprentices.
type: inform7
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Prose-Based Spellcasting"
formula: |2
  To prepare the cauldron:
      say "You light the arcane fire beneath the iron cauldron."
      
  To distill the essence of (reagent - a text):
      say "You carefully distill the essence of [reagent]."
      
  To seal the concoction:
      say "You utter a binding word, sealing the magical properties into the vial."
      
  To brew a potion with (reagent - a text):
      prepare the cauldron;
      distill the essence of the reagent;
      seal the concoction;
      say "The ritual is complete."
tags: [behavioral, transmutation, template-method, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
