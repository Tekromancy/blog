---
title: The Singleton Nexus Registry
description: Ensure a single, globally accessible instance of the social graph nexus.
type: hack
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State Confinement"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Singleton;

  final class NexusRegistry {
    private static ?NexusRegistry $instance = null;
    private dict<string, string> $nodes = dict[];

    private function __construct() {}

    public static function getInstance(): NexusRegistry {
      if (self::$instance === null) {
        self::$instance = new self();
      }
      return self::$instance as nonnull;
    }

    public function registerNode(string $id, string $address): void {
      $this->nodes[$id] = $address;
    }

    public function resolveAddress(string $id): ?string {
      return \HH\global_get('HH\Lib\Dict\idx')($this->nodes, $id);
    }
  }
tags: [hack, singleton, creational, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### The Absolute Point of Convergence

In a decentralized web, occasionally a supreme source of truth is required—a singular registry where every thread is logged. The **Singleton** pattern ensures that the Nexus Registry exists exactly once across the runtime, preventing temporal fracturing of node addresses.

Hack's `final` class modifier ensures that rogue enchanters cannot extend the Singleton to bypass its isolation wards.
