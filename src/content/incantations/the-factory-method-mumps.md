---
title: The Factory Method
description: Deferring the instantiation of undead minions to specialized necro-subroutines.
type: mumps
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Minion-Binding"
formula: |2
  FACTORYMETHOD ; Factory Method Pattern in MUMPS
  ;
  SUMMON(TYPE) ; The Factory Method
    I TYPE="GHOUL" Q $$GHOUL()
    I TYPE="ZOMBIE" Q $$ZOMBIE()
    Q "UNKNOWN ENTITY"
  ;
  GHOUL()
    ; Initialize ghoul attributes in the database
    S ^MINION($J)="GHOUL^AGGRESSIVE^75"
    Q $J
  ZOMBIE()
    ; Initialize zombie attributes
    S ^MINION($J)="ZOMBIE^SLOW^100"
    Q $J
tags: [creational, factory-method, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
