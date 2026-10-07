---
title: The Abstract Factory
description: A grimoire that summons families of related magical artifacts without specifying their exact incantations.
type: inform7
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Prose-Based Spellcasting"
formula: |2
  A magical domain is a kind of value. The magical domains are pyromancy, cryomancy, and necromancy.
  
  A spell-wand is a kind of thing. A spell-wand has a magical domain.
  A spell-robe is a kind of thing. A spell-robe has a magical domain.
  
  To decide which object is a newly conjured wand of (domain - a magical domain):
      let the wand be a new spell-wand;
      now the magical domain of the wand is the domain;
      decide on the wand.
      
  To decide which object is a newly conjured robe of (domain - a magical domain):
      let the robe be a new spell-robe;
      now the magical domain of the robe is the domain;
      decide on the robe.
      
  To conjure equipment for (domain - a magical domain):
      let the new wand be a newly conjured wand of the domain;
      let the new robe be a newly conjured robe of the domain;
      move the new wand to the player;
      move the new robe to the player;
      say "You are now equipped for [domain] arts."
tags: [creational, conjuration, factory, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
