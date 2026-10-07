---
title: "The Flyweight Resonance"
description: "Share the intrinsic magic of thousands of entities to prevent server collapse."
type: php
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Transmutation // Optimization
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  class SigilType {
      public function __construct(public string $glyph, public string $color) {}
      
      public function render(int $x, int $y): void {
          echo "Rendering $this->color $this->glyph at [$x, $y]\n";
      }
  }
  
  class SigilFactory {
      private array $types = [];
  
      public function getType(string $glyph, string $color): SigilType {
          $key = "$glyph-$color";
          if (!isset($this->types[$key])) {
              $this->types[$key] = new SigilType($glyph, $color);
          }
          return $this->types[$key];
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight Resonance

When summoning millions of sigils to screen, the Elephant's Curse will rapidly exhaust the memory crystals of the server. By isolating the intrinsic properties (glyph, color) into shared Flyweights, only the extrinsic properties (coordinates) need be tracked per instance.
