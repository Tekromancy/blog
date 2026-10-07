---
title: Abstract Factory (Forth)
description: Bind a factory of void-entities to the active vocabulary plane.
type: forth
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Planarmancy"
formula: |2
  \ Reverse Polish Necromancy: The Abstract Factory
  \ We use vocabularies as factories to switch which suite of demons we summon.

  VOCABULARY FIRE-PLANE
  VOCABULARY ICE-PLANE

  FIRE-PLANE DEFINITIONS
  : SUMMON-IMP ." A flaming imp erupts from the stack!" CR ;
  : SUMMON-FIEND ." A cinder-fiend engulfs the memory bank!" CR ;
  FORTH DEFINITIONS

  ICE-PLANE DEFINITIONS
  : SUMMON-IMP ." A frost imp shivers into existence!" CR ;
  : SUMMON-FIEND ." A glacial fiend freezes the pointers!" CR ;
  FORTH DEFINITIONS

  \ The abstract summoner relies on the active vocabulary
  : RITUAL-OF-CREATION ( -- )
    SUMMON-IMP SUMMON-FIEND ;

  \ Usage:
  \ FIRE-PLANE RITUAL-OF-CREATION
  \ ICE-PLANE RITUAL-OF-CREATION
tags: [creational, abstract-factory, forth, witchcraft]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When traversing the deep stack, an Adept does not hardcode their summons. The Abstract Factory is woven through Forth vocabularies. By swapping the active plane (vocabulary), the very same words manifest entirely different entities.
