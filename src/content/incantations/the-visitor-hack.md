---
title: The Threat Scanner Visitor
description: Separate algorithms from the node objects on which they operate.
type: hack
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection Algorithms"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Visitor;

  interface INodeVisitor {
    public function visitUserNode(UserNode $node): void;
    public function visitCorporateNode(CorporateNode $node): void;
  }

  interface IVisitableNode {
    public function accept(INodeVisitor $visitor): void;
  }

  class UserNode implements IVisitableNode {
    public function __construct(public string $alias) {}
    public function accept(INodeVisitor $visitor): void { 
      $visitor->visitUserNode($this); 
    }
  }

  class CorporateNode implements IVisitableNode {
    public function __construct(public string $corpID) {}
    public function accept(INodeVisitor $visitor): void { 
      $visitor->visitCorporateNode($this); 
    }
  }

  class ThreatScannerVisitor implements INodeVisitor {
    public function visitUserNode(UserNode $node): void { 
      echo "Running behavioral analysis on user: {$node->alias}\n"; 
    }

    public function visitCorporateNode(CorporateNode $node): void { 
      echo "Validating compliance certificates for corp: {$node->corpID}\n"; 
    }
  }
tags: [hack, visitor, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

### The Extrinsic Inspector

As the social graph expands, new analytical requirements frequently arise. Rather than constantly mutating the core `UserNode` and `CorporateNode` classes to support new scanning functions, the **Visitor** pattern allows us to externalize these algorithms.

A cyber-mage can craft a new `ThreatScannerVisitor` or `MonetizationVisitor` that traverses the heterogeneous object structure, executing logic uniquely tailored to the node type it visits without polluting the node's sacred structure.
