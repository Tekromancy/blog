---
title: The Template Method
description: Defining the skeleton of a dark ritual, letting sub-cults implement specific steps.
type: mumps
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ritual-Framing"
formula: |2
  TEMPLATE ; Template Method in MUMPS
  ;
  RITUAL(CULT) ; The Template Method
    D PREPARE
    D @("SACRIFICE^"_CULT)
    D @("CHANT^"_CULT)
    D CONSUMMATE
    Q
  ;
  PREPARE W "Drawing the pentagram.",! Q
  CONSUMMATE W "The ritual is complete. The void answers.",! Q
  ;
  ; Routine BLOODCULT
  ; SACRIFICE W "Sacrificing a goat.",! Q
  ; CHANT W "Chanting in ancient demonic.",! Q
tags: [behavioral, template-method, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
