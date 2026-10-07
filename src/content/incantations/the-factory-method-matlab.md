---
title: The Factory Method of Tensor Spawning
description: Delegate the creation of tensor spells to subclasses.
type: matlab
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Tensormancy"
formula: |2
  classdef (Abstract) TensorSpawner < handle
      methods (Abstract, Access = protected)
          tensor = spawnCore(obj)
      end

      methods
          function t = spawnTensor(obj)
              t = obj.spawnCore();
              t = t / norm(t); % Normalize magical energy
          end
      end
  end

  classdef ChaosTensorSpawner < TensorSpawner
      methods (Access = protected)
          function tensor = spawnCore(obj)
              tensor = rand(4, 4, 4);
          end
      end
  end
tags: [factory, tensors, spawning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Factory Method

The fundamental art of deferring spell manifestation to the very fibers of the sub-threads...
