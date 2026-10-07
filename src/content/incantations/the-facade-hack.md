---
title: The Recon Facade
description: Provide a simplified interface to a complex social scanning subsystem.
type: hack
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Divination // Complexity Masking"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Facade;

  class NodeScanner {
    public function scan(string $targetId): vec<string> {
      return vec["Trace1", "Trace2"];
    }
  }

  class IdentityResolver {
    public function resolve(vec<string> $traces): string {
      return "Alias_BlackHat";
    }
  }

  class ThreatEvaluator {
    public function evaluate(string $identity): int {
      return 90;
    }
  }

  class GraphReconFacade {
    private NodeScanner $scanner;
    private IdentityResolver $resolver;
    private ThreatEvaluator $evaluator;

    public function __construct() {
      $this->scanner = new NodeScanner();
      $this->resolver = new IdentityResolver();
      $this->evaluator = new ThreatEvaluator();
    }

    public function performFullRecon(string $targetId): dict<string, mixed> {
      $traces = $this->scanner->scan($targetId);
      $identity = $this->resolver->resolve($traces);
      $threatLevel = $this->evaluator->evaluate($identity);
      
      return dict[
        "identity" => $identity,
        "threat" => $threatLevel,
      ];
    }
  }
tags: [hack, facade, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### Masking the Ritual's Complexity

Unearthing a user's true identity from scattered telemetry requires orchestrating multiple arcane subsystems. The **Facade** pattern provides a streamlined, single-point entry to this complex divination ritual.

To the invoking application, extracting the threat profile is a single method call, fully shielding the broader application from the intricate dependency management and execution sequence of the internal scanners.
