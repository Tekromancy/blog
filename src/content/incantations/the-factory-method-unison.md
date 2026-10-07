---
title: The Factory Method
description: Define an interface for creating a magical entity, but let the subclasses decide which entity to instantiate.
type: unison
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  unique type Familiar = Imp | Sprite | Raven
  
  ability Summoning where
    manifest : () -> Familiar
    
  spriteSummoner : '{Summoning} a -> a
  spriteSummoner f = 
    h : Request Summoning a -> a
    h = cases
      {Summoning.manifest _ -> resume} -> handle resume Sprite with h
      {a} -> a
    handle !f with h
    
  impSummoner : '{Summoning} a -> a
  impSummoner f = 
    h : Request Summoning a -> a
    h = cases
      {Summoning.manifest _ -> resume} -> handle resume Imp with h
      {a} -> a
    handle !f with h
tags: [creational, factory-method, unison, abilities]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Instead of relying on rigid polymorphic classes, the Unison mage uses **Abilities** to defer the exact nature of the conjuration. The Factory Method is a handled effect: the core spell simply requests a `manifest`, and the enclosing ritual space (the handler) dictates the specific manifestation.
