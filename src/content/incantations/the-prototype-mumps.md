---
title: The Prototype
description: Cloning an existing spirit record to create a new spectral entity.
type: mumps
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadow-Cloning"
formula: |2
  PROTOTYPE ; Prototype Pattern in MUMPS
  ; Cloning global subtrees to replicate patients.
  ;
  CLONE(SOURCEID, NEWID) ;
    N NODE
    K ^PATIENT(NEWID)
    S NODE=""
    F  S NODE=$O(^PATIENT(SOURCEID,NODE)) Q:NODE=""  D
    . S ^PATIENT(NEWID,NODE)=^PATIENT(SOURCEID,NODE)
    W "Cloned entity ",SOURCEID," into ",NEWID,!
    Q
tags: [creational, prototype, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
