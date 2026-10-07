---
title: The Bridge of Astral Dimensions
description: Decouple the abstraction of a matrix operation from its hardware implementation (CPU vs GPU).
type: matlab
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Hardware"
formula: |2
  classdef (Abstract) MatrixOperation
      properties
          ComputeCore % The implementor
      end

      methods
          function obj = MatrixOperation(core)
              obj.ComputeCore = core;
          end
      end

      methods (Abstract)
          execute(obj, data)
      end
  end

  classdef SpectralInversion < MatrixOperation
      methods
          function execute(obj, data)
              obj.ComputeCore.invert(data);
          end
      end
  end
tags: [bridge, hardware, dimensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Bridge

Cross the bridge between the logical spell and its physical manifestation on arcane graphics processing units...
