---
title: "The Builder"
description: "A step-by-step assembly incantation for constructing complex array constructs."
type: j
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Array Synthesis"
formula: |2
  coclass 'GolemBuilder'
  create =: 3 : 'parts =: 0 0$0'
  addHead =: 3 : 'parts =: parts , <''Head'''
  addBody =: 3 : 'parts =: parts , <''Body'''
  addLimbs =: 3 : 'parts =: parts , <''Limbs'''
  build =: 3 : 'parts'
  
  cocurrent 'base'
  constructGolem =: 3 : 0
    b =. conew 'GolemBuilder'
    addHead__b ''
    addBody__b ''
    addLimbs__b ''
    build__b ''
  )
tags: [builder, assembly, golem, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Constructs complex data structures by accumulating parts in an object's state space.
