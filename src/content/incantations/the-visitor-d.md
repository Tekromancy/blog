---
title: Visitor
description: Separate complex magical analysis operations from the object structure of the arcane artifacts being analyzed.
type: d
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Artifact Inspection"
formula: |2
  interface ArtifactVisitor {
      void visit(Relic r);
      void visit(Grimoire g);
  }

  interface ArcaneItem { void accept(ArtifactVisitor v); }

  class Relic : ArcaneItem {
      override void accept(ArtifactVisitor v) { v.visit(this); }
  }

  class CurseAnalyzer : ArtifactVisitor {
      override void visit(Relic r) { /* Analyze relic for curses */ }
      override void visit(Grimoire g) { /* Analyze grimoire */ }
  }
tags: [behavioral, visitor, dlang, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
A mechanism to apply distinct divination rituals across an entire gallery of polymorphed artifacts.
