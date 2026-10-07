---
title: The Shared Soul of the Flyweight
description: Conserving the Cathedral's memory by sharing the intrinsic essence of a million identical entities.
type: java
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Enchantment // Compression"
formula: |2
  import java.util.HashMap;
  import java.util.Map;

  public interface Glyph {
      void render(String position);
  }

  public class SacredGlyph implements Glyph {
      private final String intrinsicSymbol; // Shared state

      public SacredGlyph(String intrinsicSymbol) {
          this.intrinsicSymbol = intrinsicSymbol;
          System.out.println("Forging new Glyph in memory: " + intrinsicSymbol);
      }

      @Override
      public void render(String position) {
          System.out.println("Rendering glyph '" + intrinsicSymbol + "' at position " + position);
      }
  }

  public class GlyphFactory {
      private final Map<String, Glyph> pool = new HashMap<>();

      public Glyph getGlyph(String symbol) {
          if (!pool.containsKey(symbol)) {
              pool.put(symbol, new SacredGlyph(symbol));
          }
          return pool.get(symbol);
      }
  }
tags: [flyweight, caching, memory, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To write the million-page tomes of the Java Cathedral without exhausting the JVM's memory, one must not instantiate a new object for every single character. The **Flyweight** pattern relies on deep enchantment to split an entity's state into the intrinsic (shared) and the extrinsic (contextual).

The `GlyphFactory` acts as a sacred pool, ensuring that only one instance of the `SacredGlyph` exists for any given symbol. When rendering the tomes, the vast hordes of glyphs reuse the same intrinsic essence, only passing the extrinsic coordinates at the exact moment of rendering. It is the ultimate spell of mass optimization.
