---
title: The Adapter
description: Bridging arcane necro-protocols with legacy mortal medical APIs.
type: mumps
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface-Morphing"
formula: |2
  ADAPTER ; Adapter Pattern in MUMPS
  ;
  ; Mortal system expects: D GETVITALS^MORTAL(PATIENTID)
  ; Necro system has: D GETSOULSTATUS^NECRO(ENTITYID)
  ;
  ADAPT(PATIENTID) ;
    ; Adapts mortal API call to necro implementation
    N SOULVAL
    S SOULVAL=$$GETSOULSTATUS^NECRO(PATIENTID)
    ; Translate soul percentage to mortal heart rate
    S ^VITALS(PATIENTID,"HR")=SOULVAL*1.5
    W "Adapted soul status to mortal vitals.",!
    Q
  ;
  NECRO(ID) ; Stub for necro
  GETSOULSTATUS(ID) Q 60 ; 60% soul remains
tags: [structural, adapter, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
