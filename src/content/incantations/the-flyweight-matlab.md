---
title: The Flyweight of Sparse Glyphs
description: Share matrix states to support vast quantities of sparse glyphs efficiently.
type: matlab
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Efficiency"
formula: |2
  classdef GlyphFlyweightFactory < handle
      properties
          Cache
      end
      methods
          function obj = GlyphFlyweightFactory()
              obj.Cache = containers.Map();
          end
          function glyph = getGlyph(obj, symbol)
              if ~isKey(obj.Cache, symbol)
                  obj.Cache(symbol) = SparseGlyph(symbol);
              end
              glyph = obj.Cache(symbol);
          end
      end
  end
tags: [flyweight, sparse, glyphs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Flyweight

Memory is a finite resource even in the astral plane; sparse representations and shared instances save the realm.
