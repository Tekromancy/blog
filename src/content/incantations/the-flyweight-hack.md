---
title: The Flyweight Connection Forge
description: Share connection state to fit millions of nodes into minimal memory.
type: hack
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Compression"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Flyweight;

  class ConnectionTypeFlyweight {
    public function __construct(
      public string $protocol, 
      public string $cipherSuite
    ) {}
  }

  class FlyweightForge {
    private dict<string, ConnectionTypeFlyweight> $types = dict[];

    public function getType(string $protocol, string $cipher): ConnectionTypeFlyweight {
      $key = $protocol . "_" . $cipher;
      
      if (!\HH\global_get('HH\Lib\Dict\contains_key')($this->types, $key)) {
        $this->types[$key] = new ConnectionTypeFlyweight($protocol, $cipher);
      }
      
      return $this->types[$key];
    }
  }

  class EdgeConnection {
    public function __construct(
      public string $fromNode,
      public string $toNode,
      public ConnectionTypeFlyweight $type
    ) {}
  }
tags: [hack, flyweight, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

### Collapsing the Void

When mapping out millions of connections across the global graph, memory consumption spirals into the abyss. The **Flyweight** pattern extracts intrinsic, repetitive state (like protocol and cipher suites) out of the individual edge objects and shares them via references.

Through a `FlyweightForge`, millions of connections can reference a few dozen protocol variants, saving vast swathes of runtime memory—a spell critical for Archmages operating on constrained edge servers.
