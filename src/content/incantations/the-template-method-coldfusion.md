---
title: The Template Method of the Dark Ritual
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
type: coldfusion
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Rituals"
formula: |2
  component name="Ritual" {
      public void function performRitual() {
          drawCircle();
          chant();
          sacrifice(); // Abstract/Deferred
          seal();
      }
      private void function drawCircle() { writeOutput("Circle drawn. "); }
      private void function chant() { writeOutput("Chanting begun. "); }
      private void function seal() { writeOutput("Entity sealed."); }
      // To be overridden
      public void function sacrifice() {} 
  }

  component name="BloodRitual" extends="Ritual" {
      public void function sacrifice() { writeOutput("Blood offered. "); }
  }
tags: [template-method, coldfusion, rituals, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Dark Ritual enforces a strict order: circle, chant, sacrifice, seal. The core class dictates this unyielding skeleton. However, apprentice necromancers can subclass it to define precisely what is sacrificed, customizing the spell without breaking the universal laws of the invocation.
