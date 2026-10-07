---
title: The Syndicate Composite
description: Treat individual nodes and large social syndicates uniformly.
type: hack
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal Weaving"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Composite;

  interface ISocialComponent {
    public function calculateInfluence(): int;
  }

  class IndividualUser implements ISocialComponent {
    public function __construct(private int $influenceScore) {}
    public function calculateInfluence(): int { 
      return $this->influenceScore; 
    }
  }

  class Syndicate implements ISocialComponent {
    private vec<ISocialComponent> $members = vec[];

    public function add(ISocialComponent $c): void { 
      $this->members[] = $c; 
    }

    public function calculateInfluence(): int {
      $total = 0;
      foreach ($this->members as $member) { 
        $total += $member->calculateInfluence(); 
      }
      return $total;
    }
  }
tags: [hack, composite, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Fractal Hierarchy

In the macro-analysis of the social graph, distinguishing between a single user and an entire corporate syndicate can slow down influence calculations. The **Composite** pattern creates a fractal tree where `IndividualUser` and `Syndicate` both share the `ISocialComponent` interface.

To the evaluating cyber-mage, querying the influence of a solitary hacker yields the same algorithmic traversal as querying a mega-conglomerate structure holding thousands of sub-nodes.
