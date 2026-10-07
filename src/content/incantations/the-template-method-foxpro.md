---
title: "The Template Method of the Dark Ritual"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure."
type: foxpro
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Casting"
formula: |2
  DEFINE CLASS DarkRitual AS Custom
      PROCEDURE PerformRitual()
          THIS.DrawPentagram()
          THIS.ChantIncantation()
          THIS.OfferSacrifice()
          ? "The ritual is complete."
      ENDPROC

      PROCEDURE DrawPentagram()
          ? "Drawing a standard pentagram in blood."
      ENDPROC

      PROCEDURE ChantIncantation()
          * To be overridden
      ENDPROC

      PROCEDURE OfferSacrifice()
          * To be overridden
      ENDPROC
  ENDDEFINE

  DEFINE CLASS SummonFiendRitual AS DarkRitual
      PROCEDURE ChantIncantation()
          ? "Chanting the true name of the Fiend of Indexes."
      ENDPROC

      PROCEDURE OfferSacrifice()
          ? "Offering a corrupted DBF header as sacrifice."
      ENDPROC
  ENDDEFINE
tags: [behavioral, template-method, inheritance, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The framework of the ritual must be strictly preserved; if steps are executed out of order, the caster will be consumed. The Template Method fixes the immutable flow of operations while allowing acolytes to override only the safe, variable steps.
