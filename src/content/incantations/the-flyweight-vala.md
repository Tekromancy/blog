---
title: "The Flyweight: Compressing the Aether"
description: "Use sharing to support large numbers of fine-grained objects efficiently."
type: vala
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Condensation"
formula: |2
  public class GNOMEArtifice.ParticleState : Object {
      public string color;
      public string sprite;
      
      public ParticleState(string color, string sprite) {
          this.color = color;
          this.sprite = sprite;
      }
  }
  
  public class GNOMEArtifice.ParticleFactory : Object {
      private HashTable<string, ParticleState> cache;
      
      public ParticleFactory() {
          this.cache = new HashTable<string, ParticleState>(str_hash, str_equal);
      }
      
      public ParticleState get_state(string color, string sprite) {
          string key = color + "_" + sprite;
          if (!this.cache.contains(key)) {
              this.cache.insert(key, new ParticleState(color, sprite));
              print(@"Created new particle state: $(key)\n");
          }
          return this.cache.lookup(key);
      }
  }
  
  public class GNOMEArtifice.Particle : Object {
      private ParticleState intrinsic_state;
      private int x;
      private int y;
      
      public Particle(ParticleState state, int x, int y) {
          this.intrinsic_state = state;
          this.x = x;
          this.y = y;
      }
      
      public void render() {
          print(@"Rendering $(this.intrinsic_state.color) $(this.intrinsic_state.sprite) at ($(this.x), $(this.y))\n");
      }
  }
tags: [Vala, GObject, Structural, Flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When painting the digital sky with millions of neon sparks, the memory footprint of individual objects can collapse a local grid node. The Flyweight pattern compresses the aether. By separating the intrinsic state (the unchangeable rune formulas like color and sprite data) from the extrinsic coordinates, we pool the heavy essence in a cache. Millions of GNOME particles can thus draw their visual manifestations from a handful of shared states, achieving maximum density with minimal arcane drain.
