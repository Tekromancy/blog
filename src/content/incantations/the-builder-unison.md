---
title: The Builder
description: Construct complex magical wards step-by-step using pure content-addressed transformations.
type: unison
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Abjuration // Ward Crafting"
formula: |2
  structural type Ward = Ward Nat Text Boolean
  
  structural type WardBuilder = WardBuilder (Optional Nat) (Optional Text) Boolean
  
  WardBuilder.empty : WardBuilder
  WardBuilder.empty = WardBuilder None None false
  
  WardBuilder.withPower : Nat -> WardBuilder -> WardBuilder
  WardBuilder.withPower p b = match b with
    WardBuilder _ t s -> WardBuilder (Some p) t s
    
  WardBuilder.withSigil : Text -> WardBuilder -> WardBuilder
  WardBuilder.withSigil t b = match b with
    WardBuilder p _ s -> WardBuilder p (Some t) s
    
  WardBuilder.seal : WardBuilder -> WardBuilder
  WardBuilder.seal b = match b with
    WardBuilder p t _ -> WardBuilder p t true
    
  WardBuilder.build : WardBuilder -> Optional Ward
  WardBuilder.build b = match b with
    WardBuilder (Some p) (Some t) sealed -> Some (Ward p t sealed)
    _ -> None
tags: [creational, builder, unison, immutable]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Constructing complex ethereal forms requires precision. The Builder pattern in Unison relies on immutable state transitions, refining the raw magical components into a perfected entity. Each step creates a new content-addressed state, preventing temporal paradoxes.
