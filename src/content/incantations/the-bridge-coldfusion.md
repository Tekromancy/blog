---
title: The Bridge of the Dual Spheres
description: Decouple an arcane abstraction from its manifestation, allowing both to vary independently.
type: coldfusion
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Dimensional"
formula: |2
  interface name="IMagicSource" {
      public string drawPower();
  }

  component name="VoidSource" implements="IMagicSource" {
      public string function drawPower() { return "Void Energy"; }
  }

  component name="SolarSource" implements="IMagicSource" {
      public string function drawPower() { return "Solar Energy"; }
  }

  component name="Spell" {
      variables.source = "";

      public Spell function init(IMagicSource source) {
          variables.source = arguments.source;
          return this;
      }

      public string function cast() {
          return "Casting spell with " & variables.source.drawPower();
      }
  }

  // Refined Abstraction
  component name="DestructionSpell" extends="Spell" {
      public string function cast() {
          return "Destruction! " & super.cast();
      }
  }
tags: [bridge, coldfusion, dimensions, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern links the type of spell (Abstraction) to its energy source (Implementation). Instead of hardcoding a `SolarDestructionSpell`, the alchemist creates a `DestructionSpell` and injects the `SolarSource` at runtime. The binding circle remains flexible.
