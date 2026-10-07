---
title: Interpreter for Sprite Enchantment
description: Parse ancient runic syntax to apply dynamic sprite alterations.
type: gml
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Sprite Enchantment"
formula: |2
  function Expression() constructor {
      static interpret = function(_context) { return false; };
  }
  
  function ContainsRuneExpression(_rune) : Expression() constructor {
      rune = _rune;
      static interpret = function(_context) {
          return string_pos(rune, _context) > 0;
      };
  }
  
  function OrExpression(_expr1, _expr2) : Expression() constructor {
      expr1 = _expr1;
      expr2 = _expr2;
      static interpret = function(_context) {
          return expr1.interpret(_context) || expr2.interpret(_context);
      };
  }
tags: [gml, behavioral, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter brings ancient languages to life. When an unreadable scroll of visual properties is discovered, parsing expressions determine whether the cryptic strings dictate an aura of decay or a halo of light, directly translating syntax into sprite enchantments.
