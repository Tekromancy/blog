---
title: The Facade of Simplified Conjuration
description: Provide a unified interface to a complex set of linear algebra libraries.
type: matlab
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Simplification"
formula: |2
  classdef MatrixFacade
      methods (Static)
          function result = solveComplexSystem(A, b)
              % Hides the complexity of preconditioning and iterative solving
              disp('Invoking deep linear alchemy...');
              [L, U] = ilu(sparse(A));
              result = gmres(A, b, 10, 1e-6, 100, L, U);
          end
      end
  end
tags: [facade, simplifying, alchemy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Facade

The neophyte needs not know the intricacies of incomplete LU factorization to solve a system.
