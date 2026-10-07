---
title: The Translator's Adapter
description: Forcing heretical third-party constructs to speak the orthodox language of the Cathedral.
type: java
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Assimilation
formula: |
  public interface OrthodoxChant {
      void intone();
  }
  
  public class PaganHex {
      public void mutterDarkWords() {
          System.out.println("Mutters an unsanctioned, chaotic hex.");
      }
  }
  
  public class HexAdapter implements OrthodoxChant {
      private final PaganHex hex;
      
      public HexAdapter(PaganHex hex) {
          this.hex = hex;
      }
      
      @Override
      public void intone() {
          System.out.print("Sanctifying input... ");
          hex.mutterDarkWords();
          System.out.println("...Hex contained within orthodox boundaries.");
      }
  }
tags: [adapter, integration, legacy, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Java Cathedral demands strict conformity. When a guild integrates a `PaganHex` from the chaotic outer sprawl, it cannot be invoked directly without shattering the type hierarchy. The **Adapter** pattern is the sanctioned rite of assimilation.

By wrapping the heretical construct in a class that implements the `OrthodoxChant` interface, the internal systems remain blissfully unaware of the foul magic they are executing. The adapter translates the Cathedral's holy invocations into the grimy method calls required by the foreign dependency, maintaining architectural purity at the cost of slight indirection.
