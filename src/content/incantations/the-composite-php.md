---
title: "The Composite Fracture"
description: "Treat individual web entities and their chaotic composites uniformly."
type: php
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractaling"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  interface FractalEntity {
      public function resonate(): int;
  }

  class ChaosShard implements FractalEntity {
      public function __construct(private int $power) {}
      public function resonate(): int { return $this->power; }
  }

  class FractalCluster implements FractalEntity {
      /** @var FractalEntity[] */
      private array $children = [];

      public function add(FractalEntity $entity): void {
          $this->children[] = $entity;
      }

      public function resonate(): int {
          return array_reduce($this->children, fn($sum, $child) => $sum + $child->resonate(), 0);
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite Fracture

Within the chaotic hypertext aether, objects often nest within objects endlessly like fractals. The Composite allows you to interact with a solitary `ChaosShard` or a sprawling `FractalCluster` through the exact same arcane interface.
