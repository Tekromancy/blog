---
title: The Decorator of Wards
description: Dynamically add arcane wards and logging to matrix operations.
type: matlab
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Warding"
formula: |2
  classdef WardDecorator < SpellInterface
      properties
          WrappedSpell
      end

      methods
          function obj = WardDecorator(spell)
              obj.WrappedSpell = spell;
          end

          function cast(obj, target)
              disp('Applying protective ward...');
              obj.WrappedSpell.cast(target);
              disp('Ward dissipating...');
          end
      end
  end
tags: [decorator, wards, spells]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Decorator

Wrap your fragile matrix inversions in robust wards of protection.
