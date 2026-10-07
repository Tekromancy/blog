---
title: The Visitor Hex
description: Executing volatile operations on heterogeneous mystical artifacts.
type: kotlin
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Analysis
formula: |
  interface ArtifactVisitor {
      fun visit(wand: Wand)
      fun visit(staff: Staff)
  }
  
  interface Artifact {
      fun accept(visitor: ArtifactVisitor)
  }
  
  class Wand : Artifact {
      override fun accept(visitor: ArtifactVisitor) = visitor.visit(this)
  }
  
  class Staff : Artifact {
      override fun accept(visitor: ArtifactVisitor) = visitor.visit(this)
  }
  
  class PowerAnalyzer : ArtifactVisitor {
      override fun visit(wand: Wand) = println("Analyzing wand power.")
      override fun visit(staff: Staff) = println("Analyzing staff power.")
  }
tags: [kotlin, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor Hex

When a vast taxonomy of artifacts requires new operations without polluting their core classes, the Visitor Hex is invoked. It utilizes double-dispatch logic to execute external algorithms over a complex object structure. Though rigid in its setup, it provides immense power for deep systemic analysis and AST traversal.
