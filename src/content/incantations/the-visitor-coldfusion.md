---
title: The Visitor of the Ethereal Auditor
description: Represent an operation to be performed on the elements of an object structure without changing their classes.
type: coldfusion
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Auditing"
formula: |2
  interface name="IVisitor" {
      public void visitDemon(Demon d);
      public void visitGhost(Ghost g);
  }

  interface name="IEntity" {
      public void accept(IVisitor v);
  }

  component name="Demon" implements="IEntity" {
      public void function accept(IVisitor v) { arguments.v.visitDemon(this); }
  }

  component name="Ghost" implements="IEntity" {
      public void function accept(IVisitor v) { arguments.v.visitGhost(this); }
  }

  component name="AuraScanner" implements="IVisitor" {
      public void function visitDemon(Demon d) { writeOutput("Scanning demon aura... high threat."); }
      public void function visitGhost(Ghost g) { writeOutput("Scanning ghost aura... ethereal echo."); }
  }
tags: [visitor, coldfusion, auditing, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the Inquisitors inspect the server's running apparitions, they send in a Visitor (an Aura Scanner). The entities `accept()` the scanner, dispatching back to the exact auditing logic for their specific class. The alchemist extracts complex operations from the entities themselves, keeping their dark cores pure.
