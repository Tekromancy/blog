---
title: The Bridge
description: Decoupling the undead manifestation from its underlying cursed data store.
type: mumps
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Void-Bridging"
formula: |2
  BRIDGE ; Bridge Pattern in MUMPS
  ;
  ; Abstraction: Undead Entity
  ; Implementation: Storage Mechanism (Global vs Routine)
  ;
  SUMMON(ENTITY, STORETYPE) ;
    I STORETYPE="GLOBAL" D SAVETOGLOBAL(ENTITY)
    I STORETYPE="LOCAL" D SAVETOLOCAL(ENTITY)
    W ENTITY," summoned using ",STORETYPE,!
    Q
  ;
  SAVETOGLOBAL(ENT)
    S ^UNDEADSTORE($I(^UNDEADSTORE))=ENT Q
  ;
  SAVETOLOCAL(ENT)
    S LOCALS($I(LOCALS))=ENT Q
tags: [structural, bridge, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
