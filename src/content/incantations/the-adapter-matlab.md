---
title: The Adapter of Legacy Scripts
description: Bridge ancient Fortran-style MATLAB functions with modern OOP spellcasting.
type: matlab
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  classdef LegacySpellAdapter < ModernSpellInterface
      properties (Access = private)
          AncientFunctionHandle
      end

      methods
          function obj = LegacySpellAdapter(funcHandle)
              obj.AncientFunctionHandle = funcHandle;
          end

          function result = castModern(obj, matrixInput)
              % Adapt the modern matrix to the ancient row-major vector requirement
              vectorInput = matrixInput(:)';
              ancientResult = obj.AncientFunctionHandle(vectorInput);
              result = reshape(ancientResult, size(matrixInput));
          end
      end
  end
tags: [adapter, legacy, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Adapter

Some spells were written in the forgotten epochs. To use them now requires a delicate transmutation of their inputs.
