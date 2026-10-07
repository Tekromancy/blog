---
title: The Flyweight of Shared Runes
description: Conserve ethereal energy by sharing intrinsic magical states across many invocations.
type: prolog
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Manamancy"
formula: |2
  % Intrinsic State (Flyweight Pool)
  rune_glyph(fire, 'ᚠ', 'Burns with inner heat').
  rune_glyph(frost, 'ᛁ', 'Cold to the touch').

  % Extrinsic State (Context-specific)
  % A drawn rune relies on the shared flyweight for its intrinsic properties
  draw_rune(Type, X, Y) :-
      rune_glyph(Type, Symbol, Property),
      format('Drawing ~w at (~w, ~w) - ~w.', [Symbol, X, Y, Property]).

  % ?- draw_rune(fire, 10, 20).
  % "Drawing ᚠ at (10, 20) - Burns with inner heat."
tags: [flyweight, structural, prolog, optimization, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
