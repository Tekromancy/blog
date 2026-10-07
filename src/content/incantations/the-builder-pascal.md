---
title: The Builder
description: Step-by-step construction of complex ritual circles.
type: pascal
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Ritualism"
formula: |2
  unit BuilderPattern;
  interface
  type
    IRitualBuilder = interface
      procedure DrawCircle;
      procedure InscribeRunes;
    end;
  implementation
  end.
tags: [creation, ritual, procedural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Strict procedural syntax guides the stepwise assembly of magical constructs.
