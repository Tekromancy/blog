---
title: "The Iterator Traversal"
description: "Navigate chaotic collections without exposing their underlying dark structure."
type: php
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  class ChaosCollection implements \IteratorAggregate {
      private array $items = [];
  
      public function addItem(string $item): void {
          $this->items[] = $item;
      }
  
      public function getIterator(): \Traversable {
          return new \ArrayIterator($this->items);
      }
  }
  
  $collection = new ChaosCollection();
  $collection->addItem("Void Fragment");
  $collection->addItem("Glitch Remnant");
  
  foreach ($collection as $item) {
      echo "Traversing: $item\n";
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Iterator Traversal

The inner mechanics of a data structure should remain occult. Exposing arrays directly invites corruption. The Iterator pattern, easily realized through PHP's native `IteratorAggregate`, allows safe traversal across shards of chaotic state without piercing the veil of encapsulation.
