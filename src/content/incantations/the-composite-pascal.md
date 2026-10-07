---
title: The Composite
description: Treating individual runes and grand sigils with identical respect.
type: pascal
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Gestalt
formula: |
  unit CompositePattern;
  interface
  type
    IGlyph = interface
      procedure Render;
    end;
    TCompositeGlyph = class(TInterfacedObject, IGlyph)
      procedure Render;
    end;
  implementation
  end.
tags: [gestalt, fractal, recursive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Construct fractal enchantments where the whole is indistinguishable from its parts.
