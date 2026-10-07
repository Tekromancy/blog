---
title: The Composite
description: Treating individual necrotic tissue cells and entire stitched limbs uniformly.
type: mumps
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Flesh-Grafting"
formula: |2
  COMPOSITE ; Composite Pattern in MUMPS
  ;
  ; Tree structure in MUMPS globals
  ; ^CORPSE(1)="LIMB"
  ; ^CORPSE(1,1)="TISSUE"
  ; ^CORPSE(1,2)="BONE"
  ;
  HEAL(NODE) ; Recursive healing incantation
    N CHILD
    W "Applying necro-mending to node: ",NODE,!
    S CHILD=""
    F  S CHILD=$O(^CORPSE(NODE,CHILD)) Q:CHILD=""  D
    . D HEAL(NODE_","_CHILD)
    Q
tags: [structural, composite, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
