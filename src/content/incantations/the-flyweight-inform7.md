---
title: The Flyweight
description: Efficiently managing thousands of spectral blades by sharing their intrinsic magical properties.
type: inform7
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Prose-Based Spellcasting"
formula: |2
  A blade-archetype is a kind of thing. 
  A blade-archetype has a text called the glowing aura.
  A blade-archetype has a number called the base damage.
  
  The crimson-archetype is a blade-archetype. The glowing aura of it is "crimson". The base damage of it is 15.
  The azure-archetype is a blade-archetype. The glowing aura of it is "azure". The base damage of it is 10.
  
  A spectral blade is a kind of thing. A spectral blade has a blade-archetype called the true form.
  A spectral blade has a number called the current position X.
  A spectral blade has a number called the current position Y.
  
  To strike with (blade - a spectral blade):
      let the arch be the true form of the blade;
      say "The [glowing aura of the arch] blade at ([current position X of the blade], [current position Y of the blade]) strikes for [base damage of the arch] damage."
tags: [structural, conjuration, flyweight, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
