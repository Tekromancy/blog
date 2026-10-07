---
title: The Builder
description: Assembling complex abominations of flesh and records step by step.
type: mumps
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Flesh-Weaving"
formula: |2
  BUILDER ; Builder Pattern in MUMPS
  ; Hospital Database Necromancy: Assembling a stitched patient.
  ;
  BUILD(ID) ; Construct a patient from parts
    K ^PATIENT(ID)
    D ADDBONES(ID, "Femur of Smith")
    D ADDFLESH(ID, "Cadaveric Grafts")
    D BINDSOUL(ID, "Wandering Spirit 404")
    W "Patient ",ID," has been fully stitched and resurrected.",!
    Q
  ADDBONES(ID,BONES)
    S ^PATIENT(ID,"SKELETON")=BONES Q
  ADDFLESH(ID,FLESH)
    S ^PATIENT(ID,"TISSUE")=FLESH Q
  BINDSOUL(ID,SOUL)
    S ^PATIENT(ID,"SOUL")=SOUL Q
tags: [creational, builder, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
