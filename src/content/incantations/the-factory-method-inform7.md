---
title: The Factory Method
description: Defines a ritual for summoning familiar spirits, allowing different covens to summon their own specific familiars.
type: inform7
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Prose-Based Spellcasting"
formula: |2
  A familiar is a kind of animal. A raven is a kind of familiar. A black cat is a kind of familiar.
  
  A coven is a kind of thing. The Moon coven is a coven. The Shadow coven is a coven.
  
  To decide which familiar is summoned by (C - the Moon coven):
      let the bird be a new raven;
      decide on the bird.
      
  To decide which familiar is summoned by (C - the Shadow coven):
      let the feline be a new black cat;
      decide on the feline.
      
  To perform the summoning ritual for (C - a coven):
      let the spirit be the familiar summoned by C;
      move the spirit to the location of C;
      say "A familiar appears from the æther."
tags: [creational, conjuration, factory-method, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
