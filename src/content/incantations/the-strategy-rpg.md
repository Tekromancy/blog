---
title: "Strategy: The Tactical Rune"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable."
type: rpg
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Proc CalculateTotal Export;
    Dcl-Pi *N Packed(15:5);
      BaseAmount Packed(15:5) Const;
      pPricingStrategy Pointer(*Proc) Value;
    End-Pi;

    Dcl-Pr ApplyStrategy Packed(15:5) ExtProc(pPricingStrategy);
      Amount Packed(15:5) Const;
    End-Pr;

    Return ApplyStrategy(BaseAmount);
  End-Proc;
tags: [behavioral, ibm-i, runes, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Strategy

The Strategy pattern provides a framework for injecting logic directly into the flow of a program. Rather than hard-coding business rules for holiday discounts or volume pricing, the overarching Service Program merely calls whatever tactical pricing rune is passed to it.
