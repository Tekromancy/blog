---
title: "The Visitor: The External Inspector"
description: "Represent an operation to be performed on the elements of an object structure."
type: alloy
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structure-Inspection"
formula: |2
  abstract sig MatrixNode {
    accept: one Probe
  }
  
  sig DataBank, LogicGate extends MatrixNode {}
  
  abstract sig Probe {
    scannedNodes: set MatrixNode
  }
  
  sig DiagnosticsProbe extends Probe {}
  
  fact "Probes Scan What Accepts Them" {
    all n: MatrixNode, p: n.accept | n in p.scannedNodes
  }
  
  run {} for 3
tags: [behavioral, visitor, diagnostics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Visitor: The External Inspector

When navigating a complex `MatrixNode` tree, it is safer to externalize the operation. The `Probe` acts as the visitor. We enforce the pattern mathematically: if a node `accept`s a probe, it must irrevocably belong to that probe's `scannedNodes` set, ensuring complete diagnostic coverage.
