---
title: Shifting the Node State
description: Allow an entity to alter its behavior when its internal state changes.
type: hack
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\State;

  interface INodeState {
    public function handle(SocialNode $context): void;
  }

  class ActiveState implements INodeState {
    public function handle(SocialNode $context): void { 
      echo "Node is broadcasting clearly.\n"; 
    }
  }

  class ShadowbannedState implements INodeState {
    public function handle(SocialNode $context): void { 
      echo "Node shouts into the void; no one hears.\n"; 
    }
  }

  class SocialNode {
    private INodeState $state;

    public function __construct() { 
      $this->state = new ActiveState(); 
    }

    public function transitionTo(INodeState $state): void { 
      $this->state = $state; 
    }

    public function requestTransmission(): void { 
      $this->state->handle($this); 
    }
  }
tags: [hack, state, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Phased Existence

Nodes in a social graph exist in varying phases of visibility: active, verified, shadowbanned, or deleted. Implementing monstrous `if/else` checks for every operation violates the sacred tenets of alchemy. The **State** pattern isolates state-specific behavior into individual classes.

When a node undergoes moderation, it merely transitions to `ShadowbannedState`, and any future calls to `requestTransmission()` automatically execute the muted, void-shouting logic without a single conditional branch.
