---
title: "The Visitor Incantation in Carbon"
description: "Represent an operation to be performed on the elements of an object structure without changing their classes."
type: carbon
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structural Inspection"
formula: |2
  package Visitor api;

  class DataNodeA;
  class DataNodeB;

  interface NodeVisitor {
    fn VisitNodeA[me: Self](node: DataNodeA*);
    fn VisitNodeB[me: Self](node: DataNodeB*);
  }

  interface Element {
    fn Accept[me: Self](visitor: NodeVisitor*);
  }

  class DataNodeA {
    impl as Element {
      fn Accept[me: Self](visitor: NodeVisitor*) {
        (*visitor).VisitNodeA(&me);
      }
    }
  }

  class DataNodeB {
    impl as Element {
      fn Accept[me: Self](visitor: NodeVisitor*) {
        (*visitor).VisitNodeB(&me);
      }
    }
  }

  class SecurityScanner {
    impl as NodeVisitor {
      fn VisitNodeA[me: Self](node: DataNodeA*) {
        // Inspect NodeA for vulnerabilities
      }
      fn VisitNodeB[me: Self](node: DataNodeB*) {
        // Inspect NodeB for vulnerabilities
      }
    }
  }
tags: [behavioral, carbon, double dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Visitor: The Astral Inspector

When an intricate hierarchy of data nodes requires a new operational analysis—such as a deep security scan—adding that logic to every single node class pollutes the structure. The Visitor pattern extracts the operation.

By implementing `Accept` routines that call back into the `NodeVisitor`'s specific methods, we achieve "double dispatch." In Carbon, this allows a `SecurityScanner` to traverse the grid, applying specific, strongly-typed operations to `DataNodeA` and `DataNodeB` without ever altering the node's original source code. It is the ultimate tool for non-destructive inspection under the Successor Pact.
