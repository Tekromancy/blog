---
title: The Builder of Dimensional Arrays
description: Step-by-step construction of complex multi-dimensional spells.
type: matlab
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Arraymancy"
formula: |2
  classdef SpellMatrixBuilder < handle
      properties (Access = private)
          dimensions
          energyType
          coreArray
      end

      methods
          function obj = SpellMatrixBuilder()
              obj.reset();
          end

          function reset(obj)
              obj.dimensions = [1 1];
              obj.energyType = 'Void';
              obj.coreArray = [];
          end

          function setDimensions(obj, dims)
              obj.dimensions = dims;
          end

          function weaveEnergy(obj, energy)
              obj.energyType = energy;
          end

          function spell = getResult(obj)
              obj.coreArray = zeros(obj.dimensions) + magic(max(obj.dimensions));
              spell = struct('Array', obj.coreArray, 'Energy', obj.energyType);
              obj.reset();
          end
      end
  end
tags: [builder, spells, dimensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Builder

When the arcane arrays grow too large to construct in a single breath...
