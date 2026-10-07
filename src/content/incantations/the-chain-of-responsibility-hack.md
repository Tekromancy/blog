---
title: Trust Filters in the Chain of Responsibility
description: Pass requests along a chain of security evaluation handlers.
type: hack
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sequential Filtration"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\ChainOfResponsibility;

  abstract class TrustFilter {
    protected ?TrustFilter $next = null;

    public function setNext(TrustFilter $filter): TrustFilter {
      $this->next = $filter;
      return $filter;
    }

    abstract public function evaluate(string $nodeData): ?string;
  }

  class ReputationFilter extends TrustFilter {
    public function evaluate(string $nodeData): ?string {
      if (\HH\Lib\Str\contains($nodeData, "Blacklisted")) {
        return "Blocked by Reputation";
      }
      return $this->next !== null ? $this->next->evaluate($nodeData) : "Passed";
    }
  }

  class VelocityFilter extends TrustFilter {
    public function evaluate(string $nodeData): ?string {
      if (\HH\Lib\Str\contains($nodeData, "Spam")) {
        return "Blocked by High Velocity";
      }
      return $this->next !== null ? $this->next->evaluate($nodeData) : "Passed";
    }
  }
tags: [hack, chain-of-responsibility, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Gauntlet of Verification

When an unknown transmission breaches our sub-net, we do not simply let it pass. We run it through a gauntlet. The **Chain of Responsibility** sets up a sequential hierarchy of `TrustFilters`.

Each filter either halts the transmission with a denial, or delegates it to the next ward in the chain. This decouples sender logic from receiver verification, allowing filters to be mixed, matched, and rearranged based on current threat levels.
