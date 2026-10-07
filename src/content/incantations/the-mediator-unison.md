---
title: The Mediator
description: Define an object that encapsulates how a set of objects interact.
type: unison
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus Binding"
formula: |2
  structural type Entity = Golem | Wizard
  structural type Event = Attack | Defend
  
  ability Nexus where
    broadcast : Entity -> Event -> ()
    
  golemBehavior : '{Nexus} ()
  golemBehavior _ = 
    Nexus.broadcast Golem Attack
    
  wizardBehavior : '{Nexus} ()
  wizardBehavior _ = 
    Nexus.broadcast Wizard Defend
    
  nexusHandler : '{Nexus} a -> a
  nexusHandler comp =
    h : Request Nexus a -> a
    h = cases
      {Nexus.broadcast ent evt -> resume} ->
        -- The mediator logic determining interaction
        match (ent, evt) with
          (Golem, Attack) -> handle resume () with h
          (Wizard, Defend) -> handle resume () with h
          _ -> handle resume () with h
      {a} -> a
    handle !comp with h
tags: [behavioral, mediator, unison, abilities, communication]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When multiple arcane constructs must communicate, direct entanglements lead to chaotic, brittle weaves. The Mediator pattern centralizes this communication. In Unison, the Mediator is a powerful Ability handler (`nexusHandler`). Constructs broadcast their intents as effects, and the handler interprets and routes these events according to the global laws of the interaction nexus.
