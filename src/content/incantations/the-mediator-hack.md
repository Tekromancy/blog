---
title: The Network Mediator
description: Centralize complex communications between social nodes.
type: hack
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Mediator;

  interface INetworkMediator {
    public function notify(object $sender, string $event): void;
  }

  class ChatHub implements INetworkMediator {
    public function __construct(
      private UserNode $user1, 
      private UserNode $user2
    ) {
      $this->user1->setMediator($this);
      $this->user2->setMediator($this);
    }

    public function notify(object $sender, string $event): void {
      if ($event === 'ping') {
        echo "[ChatHub]: Routing ping event to adjacent nodes.\n";
      }
    }
  }

  class UserNode {
    private ?INetworkMediator $mediator = null;

    public function setMediator(INetworkMediator $m): void { 
      $this->mediator = $m; 
    }

    public function sendPing(): void {
      if ($this->mediator !== null) { 
        $this->mediator->notify($this, 'ping'); 
      }
    }
  }
tags: [hack, mediator, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Central Nexus

When countless independent nodes attempt to communicate directly, the result is a tangled matrix of chaotic couplings. The **Mediator** pattern provides a centralized `ChatHub` that handles routing.

Instead of users possessing direct references to one another, they simply cry out to the Mediator. The Hub, utilizing its supreme awareness of the local network topology, routes the ping appropriately.
