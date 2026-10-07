---
title: The Observer Broadcast
description: Establish a subscription mechanism for node state changes.
type: hack
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Pulse Monitoring"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Observer;

  interface IObserver {
    public function update(string $message): void;
  }

  class InfluencerNode {
    private vec<IObserver> $followers = vec[];

    public function subscribe(IObserver $o): void { 
      $this->followers[] = $o; 
    }

    public function broadcast(string $message): void {
      foreach ($this->followers as $follower) { 
        $follower->update($message); 
      }
    }
  }

  class FollowerNode implements IObserver {
    public function __construct(private string $alias) {}

    public function update(string $message): void { 
      echo "[{$this->alias}] Received transmission: $message\n"; 
    }
  }
tags: [hack, observer, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### The Pulse of the Swarm

The fundamental heartbeat of any social graph lies in the propagation of updates from highly-connected nodes to their dependent edges. The **Observer** pattern models this naturally.

An `InfluencerNode` maintains a roster of subscribed entities. When a state shift occurs—a new thought, a viral payload—the Influencer iterates through its followers and triggers their localized update rituals seamlessly.
