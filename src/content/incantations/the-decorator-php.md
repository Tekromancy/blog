---
title: "The Decorator Layering"
description: "Dynamically wrap objects with new layers of chaos magic."
type: php
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Abjuration // Layering
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface WebRequest {
      public function getPayload(): string;
  }
  
  class BaseRequest implements WebRequest {
      public function getPayload(): string { return "Basic Payload"; }
  }
  
  abstract class RequestDecorator implements WebRequest {
      public function __construct(protected WebRequest $request) {}
  }
  
  class EncryptionLayer extends RequestDecorator {
      public function getPayload(): string {
          return base64_encode($this->request->getPayload() . " [ENCRYPTED]");
      }
  }
  
  class ChaosLayer extends RequestDecorator {
      public function getPayload(): string {
          return str_shuffle($this->request->getPayload());
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator Layering

Inheritance is rigid, an ancient server-side ritual that breaks under modern strains. The Decorator Layering incantation allows tekromancers to dynamically attach new behaviors, like Encryption or pure Chaos, to `WebRequest` objects at runtime, safely bypassing the Elephant's Curse.
