---
title: "The Template Method"
description: "Defining the unchangeable skeleton of a STARK proof."
type: cairo
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Abjuration // Blueprinting"
formula: |2
  trait IProofSkeleton {
      fn setup() -> felt252;
      fn compute_trace() -> felt252;
      fn generate_proof() -> felt252 {
          let s = Self::setup();
          let t = Self::compute_trace();
          s + t
      }
  }
  
  impl StandardSkeleton of IProofSkeleton {
      fn setup() -> felt252 { 'setup' }
      fn compute_trace() -> felt252 { 'trace' }
  }
tags: [cairo, design-pattern, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Lays down the immutable laws of proof generation, while leaving specific rituals to be filled in by subclasses.
