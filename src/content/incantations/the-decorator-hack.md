---
title: Decorating the Social Aura
description: Dynamically attach new behaviors and shields to graph nodes.
type: hack
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Aura Layering"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Decorator;

  interface INodeAura {
    public function getAura(): string;
  }

  class BaseNode implements INodeAura {
    public function getAura(): string { 
      return "Standard Node Aura"; 
    }
  }

  abstract class NodeDecorator implements INodeAura {
    public function __construct(protected INodeAura $node) {}
  }

  class CryptographicAura extends NodeDecorator {
    public function getAura(): string {
      return $this->node->getAura() . " + Encrypted";
    }
  }

  class StealthAura extends NodeDecorator {
    public function getAura(): string {
      return $this->node->getAura() . " + Undetectable";
    }
  }
tags: [hack, decorator, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Layers of Subterfuge

In the dark nets, a naked node is a vulnerable node. The **Decorator** pattern permits a cyber-mage to dynamically wrap a base node in layers of abjuration magic—adding encryption, stealth, or amplification without permanently altering the base class or triggering a chaotic subclass explosion.

By maintaining the `INodeAura` interface, any decorated entity remains structurally indistinguishable to the systems evaluating its presence, hiding its enhanced capabilities until they are invoked.
