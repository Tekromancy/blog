---
title: The Discovery Strategy
description: Swap targeting algorithms at runtime based on network needs.
type: hack
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Illusion // Cognitive Redirection"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Strategy;

  interface IRecommendationStrategy {
    public function recommend(vec<string> $history): vec<string>;
  }

  class AggressiveTargeting implements IRecommendationStrategy {
    public function recommend(vec<string> $history): vec<string> { 
      return vec["Corporate_Ad_1", "Propaganda_Feed"]; 
    }
  }

  class OrganicDiscovery implements IRecommendationStrategy {
    public function recommend(vec<string> $history): vec<string> { 
      return vec["Friend_Of_Friend", "Local_Art_Guild"]; 
    }
  }

  class DiscoveryEngine {
    public function __construct(private IRecommendationStrategy $strategy) {}

    public function setStrategy(IRecommendationStrategy $strategy): void {
      $this->strategy = $strategy;
    }

    public function generateFeed(vec<string> $history): vec<string> {
      return $this->strategy->recommend($history);
    }
  }
tags: [hack, strategy, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### Selecting the Path of Influence

The method by which a user discovers new connections is not fixed; it is highly dependent upon corporate alignment and current monetization directives. The **Strategy** pattern encapsulates different recommendation algorithms behind a unified interface.

A cyber-mage can swap out the `OrganicDiscovery` routine for `AggressiveTargeting` in milliseconds during peak monetization hours, without altering the core `DiscoveryEngine` invocation logic.
