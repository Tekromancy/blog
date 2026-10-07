---
title: "The Builder Forge"
description: "Construct complex chaotic entities step-by-step to endure the Elephant's Curse."
type: php
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Structuring
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  class ChaoticPayload {
      public array $headers = [];
      public string $body = '';
      public array $sigils = [];
  }
  
  interface PayloadBuilder {
      public function addHeader(string $header): self;
      public function setBody(string $body): self;
      public function engraveSigil(string $sigil): self;
      public function getResult(): ChaoticPayload;
  }
  
  class WebChaosBuilder implements PayloadBuilder {
      private ChaoticPayload $payload;
  
      public function __construct() {
          $this->reset();
      }
  
      public function reset(): void {
          $this->payload = new ChaoticPayload();
      }
  
      public function addHeader(string $header): self {
          $this->payload->headers[] = $header;
          return $this;
      }
  
      public function setBody(string $body): self {
          $this->payload->body = $body;
          return $this;
      }
  
      public function engraveSigil(string $sigil): self {
          $this->payload->sigils[] = $sigil;
          return $this;
      }
  
      public function getResult(): ChaoticPayload {
          $result = $this->payload;
          $this->reset();
          return $result;
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder Forge

When forging payloads in the hyper-chaotic currents of ancient PHP 8+ servers, one must not initialize everything in a single volatile burst. The Builder Forge allows the steady, step-by-step accumulation of headers, bodies, and sigils, preserving the integrity of the magic.
