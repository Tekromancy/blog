---
title: The Decorator Incantation in Simula
description: Dynamically weaving new powers onto a simulated object.
type: simula
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Enhancement"
formula: |2
  Begin
      Class Component;
      Virtual: Procedure Operation;
      Begin
      End;

      Component Class Decorator(comp); Ref(Component) comp;
      Begin
          Procedure Operation;
          Begin
              comp.Operation;
              ! Add mystical enhancements here;
          End;
      End;
  End;
tags: [simula, gof, structural, enhancement]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than endlessly subclassing into madness, the Decorator envelops a solitary object in layers of newfound abilities, augmenting its behavior at runtime without altering its primordial core.
