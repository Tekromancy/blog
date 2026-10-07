---
title: "The Proxy Sentinel"
description: "Stand as a guardian surrogate to control access to heavy chaotic rituals."
type: php
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface Grimoire {
      public function readSecret(): string;
  }
  
  class RealGrimoire implements Grimoire {
      public function __construct() {
          // Heavy initialization simulation
          sleep(1);
      }
      public function readSecret(): string { return "The Elephant remembers all."; }
  }
  
  class GrimoireProxy implements Grimoire {
      private ?RealGrimoire $real = null;
  
      public function readSecret(): string {
          if ($this->real === null) {
              $this->real = new RealGrimoire();
          }
          return "From Proxy: " . $this->real->readSecret();
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy Sentinel

Some artifacts are too heavy or dangerous to invoke immediately. The Proxy Sentinel acts as a deferential ward, only manifesting the true `RealGrimoire` when its deep secrets are actively requested. It prevents the web chaos from dragging down the initial payload speed.
