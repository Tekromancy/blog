---
title: Factory Method in the Neon Grid
description: Defer instantiation of social nodes to subclasses.
type: hack
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Node Spawning"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\FactoryMethod;

  abstract class GraphNode {
    abstract public function broadcast(string $message): void;
  }

  class InfluencerNode extends GraphNode {
    public function broadcast(string $message): void {
      echo "[Influencer Amplification]: " . $message . "\n";
    }
  }

  abstract class NodeSpawner {
    abstract protected function createNode(): GraphNode;
    
    public function spawnAndBroadcast(string $message): void {
      $node = $this->createNode();
      $node->broadcast($message);
    }
  }

  class InfluencerSpawner extends NodeSpawner {
    protected function createNode(): GraphNode {
      return new InfluencerNode();
    }
  }
tags: [hack, factory-method, creational, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### Spawning the Collective

In the social labyrinth, the exact nature of a generated node is often determined by the specific sub-network's atmospheric variables. The **Factory Method** allows base logic to orchestrate the lifecycle of nodes while leaving the actual `new` invocation to localized subclass altars.

This ensures that our core engine can deploy viral broadcasts regardless of whether the spawned entity is an Influencer, a Bot, or a Sentinel node.
