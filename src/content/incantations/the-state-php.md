---
title: "The State Metamorphosis"
description: "Alter an object's behavior when its internal state shifts."
type: php
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Shifting
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface ServerState {
      public function handleRequest(): string;
  }
  
  class HealthyState implements ServerState {
      public function handleRequest(): string { return "200 OK"; }
  }
  
  class CursedState implements ServerState {
      public function handleRequest(): string { return "500 Chaos Server Error"; }
  }
  
  class WebServer {
      public function __construct(private ServerState $state) {}
      public function setState(ServerState $state): void { $this->state = $state; }
      public function process(): string { return $this->state->handleRequest(); }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State Metamorphosis

Massive conditionals defining an entity's lifecycle are a symptom of the Elephant's Curse. The State Metamorphosis binds these behaviors into discrete state objects. As the server shifts from Healthy to Cursed under heavy load, it dynamically morphs its response class.
