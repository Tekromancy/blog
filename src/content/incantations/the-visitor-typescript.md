---
title: The Visitor
description: Separating an algorithm from the object structure on which it operates to perform novel inspections.
type: typescript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Diagnostics"
formula: |2
  interface ArcaneEntity {
    accept(visitor: AstralVisitor): void;
  }
  
  class FirewallWisp implements ArcaneEntity {
    accept(visitor: AstralVisitor) { visitor.visitWisp(this); }
    public status() { return "Wisp Integrity: 98%"; }
  }
  
  class DataGolem implements ArcaneEntity {
    accept(visitor: AstralVisitor) { visitor.visitGolem(this); }
    public getLoad() { return "Data Load: 45TB"; }
  }
  
  interface AstralVisitor {
    visitWisp(wisp: FirewallWisp): void;
    visitGolem(golem: DataGolem): void;
  }
  
  class DiagnosticSpirit implements AstralVisitor {
    visitWisp(wisp: FirewallWisp) { console.log(`Checking wisp: ${wisp.status()}`); }
    visitGolem(golem: DataGolem) { console.log(`Analyzing golem: ${golem.getLoad()}`); }
  }
tags: [behavioral, typescript, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor pattern lets you define a new operation without changing the classes of the elements on which it operates. By dispatching an Astral Visitor into a network of entities, mages can perform diagnostic sweeps and complex mutations on diverse classes, maintaining strict type compliance across the board.
