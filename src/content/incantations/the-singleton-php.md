---
title: "The Singleton Monolith"
description: "Establish a single source of chaotic truth in the stateless void."
type: php
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Statecraft"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  class AetherNexus {
      private static ?AetherNexus $instance = null;
      private array $state = [];

      private function __construct() {
          // Prevent direct conjuration
      }

      private function __clone() {
          // Prevent chaotic replication
      }

      public function __wakeup() {
          throw new \Exception("Cannot un-serialize a singleton.");
      }

      public static function getInstance(): AetherNexus {
          if (self::$instance === null) {
              self::$instance = new self();
          }
          return self::$instance;
      }

      public function setRune(string $key, string $value): void {
          $this->state[$key] = $value;
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Singleton Monolith

In a realm where scripts live and die in milliseconds, the Singleton provides a persistent anchor—a monolith of state within the PHP request lifecycle. Beware the anti-patterns, for the Elephant's Curse often turns the Singleton into a global variable disguised in object-oriented robes.
