---
title: The Composite of Nested Arrays
description: Treat individual spells and combinations of spells uniformly.
type: matlab
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Aggregation"
formula: |2
  classdef (Abstract) ArcaneComponent < handle
      methods (Abstract)
          power = calculatePower(obj)
      end
  end

  classdef SingleRune < ArcaneComponent
      properties
          BasePower
      end
      methods
          function obj = SingleRune(p)
              obj.BasePower = p;
          end
          function power = calculatePower(obj)
              power = obj.BasePower;
          end
      end
  end

  classdef RuneCluster < ArcaneComponent
      properties
          Children = []
      end
      methods
          function add(obj, child)
              obj.Children = [obj.Children, child];
          end
          function power = calculatePower(obj)
              power = 0;
              for i = 1:length(obj.Children)
                  power = power + obj.Children(i).calculatePower();
              end
          end
      end
  end
tags: [composite, runes, arrays]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Composite

A single rune and a galaxy of runes are both just nodes in the grand fractal.
