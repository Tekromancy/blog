---
title: "The Strategy Tactics"
description: "Define a family of chaotic algorithms, encapsulate each, and make them interchangeable."
type: php
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Divination // Tactics
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  interface HashingStrategy {
      public function hash(string $data): string;
  }
  
  class Md5Chaos implements HashingStrategy {
      public function hash(string $data): string { return md5($data); } // Ancient, cursed
  }
  
  class Argon2Ward implements HashingStrategy {
      public function hash(string $data): string { return password_hash($data, PASSWORD_ARGON2ID); }
  }
  
  class Authenticator {
      public function __construct(private HashingStrategy $strategy) {}
      public function secure(string $password): string {
          return $this->strategy->hash($password);
      }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Strategy Tactics

In the volatile ecosystem of server security, hard-coding a hashing algorithm is fatal. The Strategy pattern lets the tekromancer switch between ancient `Md5Chaos` for legacy imports, and modern `Argon2Ward` for secure sealing, changing the algorithm dynamically without modifying the core Authentication logic.
