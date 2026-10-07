---
title: "The Bridge Alignment"
description: "Decouple an abstraction from its chaotic implementation so both can vary independently."
type: php
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Divination // Structuring
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface ChaosChannel {
      public function transmit(string $essence): void;
  }
  
  class HttpChannel implements ChaosChannel {
      public function transmit(string $essence): void { echo "HTTP POST: $essence\n"; }
  }
  
  abstract class ArcaneConstruct {
      public function __construct(protected ChaosChannel $channel) {}
      abstract public function manifest(): void;
  }
  
  class ChaosOrb extends ArcaneConstruct {
      public function manifest(): void {
          $this->channel->transmit("Orb Essence");
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge Alignment

When the web's chaos magic forces your constructs and their delivery channels to scale in multiple directions, the Bridge pattern creates an astral alignment. Decoupling the `ArcaneConstruct` from the `ChaosChannel` saves the system from a cursed combinatorial explosion of classes.
