---
title: The Prototype of Matrix Cloning
description: Clone existing spell matrices instead of forging new ones from the ether.
type: matlab
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  classdef SpellCloneable < matlab.mixin.Copyable
      properties
          ArcaneMatrix
          ResonanceFreq
      end

      methods
          function obj = SpellCloneable(matrix, freq)
              obj.ArcaneMatrix = matrix;
              obj.ResonanceFreq = freq;
          end

          function cloned = cloneSpell(obj)
              cloned = copy(obj);
              cloned.ResonanceFreq = cloned.ResonanceFreq * 1.01; % Slight mutation
          end
      end
  end
tags: [prototype, cloning, matrices]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Prototype

A true magus knows that computing a massive spectral decomposition twice is a waste of mana. Clone it!
