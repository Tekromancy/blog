---
title: Iterating the Deep Structures
description: Traverse social networks without exposing their underlying representations.
type: hack
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Iterator;

  class GraphNodeCollection implements \IteratorAggregate<string> {
    public function __construct(private vec<string> $nodes) {}

    public function getIterator(): \Iterator<string> {
      return new DeepGraphIterator($this->nodes);
    }
  }

  class DeepGraphIterator implements \Iterator<string> {
    private int $position = 0;

    public function __construct(private vec<string> $nodes) {}

    public function current(): string { 
      return $this->nodes[$this->position]; 
    }

    public function key(): int { 
      return $this->position; 
    }

    public function next(): void { 
      $this->position++; 
    }

    public function rewind(): void { 
      $this->position = 0; 
    }

    public function valid(): bool { 
      return $this->position < \HH\Lib\C\count($this->nodes); 
    }
  }
tags: [hack, iterator, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### The Path of the Wanderer

Traversing a localized node cluster natively involves interacting with `vec` or `dict` primitives in Hack. However, sometimes the underlying topology requires a specialized pathing algorithm—like deep-first scanning or breadth-first sweeping. The **Iterator** pattern abstracts away the internal structure.

By invoking the Iterator, you merely call for the `next()` node, shielding your application logic from the horrors of graph-cyclomatic complexities.
