---
title: "The Prototype"
description: "Cloning existing STARK polynomial structures."
type: cairo
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  #[derive(Copy, Drop)]
  struct Polynomial { degree: u32, coefficients: felt252 }
  trait ICloneable {
      fn clone(self: @Polynomial) -> Polynomial;
  }
  impl PolynomialClone of ICloneable {
      fn clone(self: @Polynomial) -> Polynomial {
          Polynomial { degree: *self.degree, coefficients: *self.coefficients }
      }
  }
tags: [cairo, design-pattern, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of forging new polynomials from scratch, the Prototype clones existing ones, saving invaluable STARK execution steps.
