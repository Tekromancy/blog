---
title: The Strategy of Algorithmic Swap
description: Define a family of matrix factorization spells and make them interchangeable.
type: matlab
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  classdef (Abstract) FactorizationStrategy
      methods (Abstract)
          [L, U] = decompose(obj, matrix)
      end
  end

  classdef LUStrategy < FactorizationStrategy
      methods
          function [L, U] = decompose(obj, matrix)
              [L, U] = lu(matrix);
          end
      end
  end

  classdef CholeskyStrategy < FactorizationStrategy
      methods
          function [L, U] = decompose(obj, matrix)
              L = chol(matrix, 'lower');
              U = L';
          end
      end
  end
tags: [strategy, factorization, swapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Strategy

Do not hardcode your decomposition path. Let the strategy be swapped at the last microsecond of execution.
