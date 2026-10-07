---
title: The Decorator
description: Dynamically attaching new hexes and wards to an existing cursed patient.
type: mumps
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Hex-Weaving"
formula: |2
  DECORATOR ; Decorator Pattern in MUMPS
  ;
  BASEENTITY(ID) ;
    S ^PATIENT(ID,"STATUS")="UNDEAD"
    Q
  ;
  ADDVENOM(ID) ; Decorate with venom
    S ^PATIENT(ID,"STATUS")=^PATIENT(ID,"STATUS")_", VENOMOUS"
    Q
  ;
  ADDFROST(ID) ; Decorate with frost
    S ^PATIENT(ID,"STATUS")=^PATIENT(ID,"STATUS")_", FROSTBOUND"
    Q
  ;
  TEST ;
    D BASEENTITY(666)
    D ADDVENOM(666)
    D ADDFROST(666)
    W "Patient 666 is now: ",^PATIENT(666,"STATUS"),!
    Q
tags: [structural, decorator, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
