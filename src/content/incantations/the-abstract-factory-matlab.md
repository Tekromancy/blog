---
title: The Abstract Factory of Matrix Thaumaturgy
description: Conjure related matrix manipulation runes without specifying their exact incantation structures.
type: matlab
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matrixmancy"
formula: |2
  classdef (Abstract) AbstractRuneFactory < handle
      methods (Abstract)
          rune = createTransformationRune(obj)
          rune = createProjectionRune(obj)
      end
  end

  classdef SpectralRuneFactory < AbstractRuneFactory
      methods
          function rune = createTransformationRune(obj)
              rune = SpectralTransformationRune();
          end
          function rune = createProjectionRune(obj)
              rune = SpectralProjectionRune();
          end
      end
  end
tags: [creation, runes, matrices]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Abstract Factory

In the deep grids of the Astral Plane, matrices are not merely numbers; they are structural spells...
