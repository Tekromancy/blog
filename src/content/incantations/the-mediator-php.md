---
title: "The Mediator Nexus"
description: "Reduce chaotic inter-dependencies by routing interactions through a central nexus."
type: php
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Networking"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  interface Mediator {
      public function notify(object $sender, string $event): void;
  }

  class UIMediator implements Mediator {
      public function __construct(private ComponentA $c1, private ComponentB $c2) {
          $this->c1->setMediator($this);
          $this->c2->setMediator($this);
      }

      public function notify(object $sender, string $event): void {
          if ($event === 'A') echo "Mediator reacts on A and triggers following operations:\n";
      }
  }

  abstract class BaseComponent {
      protected ?Mediator $mediator = null;
      public function setMediator(Mediator $mediator): void { $this->mediator = $mediator; }
  }

  class ComponentA extends BaseComponent {
      public function doA(): void { $this->mediator->notify($this, 'A'); }
  }
  class ComponentB extends BaseComponent {}

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator Nexus

When UI components or microservices begin hard-coding references to each other, the web degenerates into a tangled spider's nest. The Mediator provides a central intelligence nexus, absorbing the relational complexity so components remain untainted and ignorant of one another.
