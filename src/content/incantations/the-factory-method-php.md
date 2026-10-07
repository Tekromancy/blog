---
title: "The Factory Method Conjuration"
description: "Delegate the chaotic manifestation to subclasses in the aether."
type: php
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Spawnmancy
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface WebDemon {
      public function terrorize(): string;
  }
  
  class SqlInjectionDemon implements WebDemon {
      public function terrorize(): string { return "DROP TABLE users; --"; }
  }
  
  class XssDemon implements WebDemon {
      public function terrorize(): string { return "<script>alert('Chaos')</script>"; }
  }
  
  abstract class DemonSummoner {
      abstract public function getDemon(): WebDemon;
      
      public function unleash(): string {
          $demon = $this->getDemon();
          return "Unleashing chaos: " . $demon->terrorize();
      }
  }
  
  class SqlSummoner extends DemonSummoner {
      public function getDemon(): WebDemon { return new SqlInjectionDemon(); }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Factory Method Conjuration

The ancient servers hold many secrets. The Factory Method allows the high mages to specify the exact demon to summon without altering the core summoning ritual. It shifts the burden of manifestation from the creator to its cursed offspring.
