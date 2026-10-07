---
title: "The Abstract Factory: Matrix of Creation"
description: "Define a family of polymorphic relations without specifying their concrete instantiations."
type: alloy
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Meta-Synthesis"
formula: |2
  abstract sig ConstructA {}
  abstract sig ConstructB {}
  
  sig CyberConstructA1, CyberConstructA2 extends ConstructA {}
  sig NeonConstructB1, NeonConstructB2 extends ConstructB {}
  
  abstract sig AbstractForge {
    createA: one ConstructA,
    createB: one ConstructB
  }
  
  sig CorpForgeAlpha extends AbstractForge {}
  {
    createA in CyberConstructA1
    createB in NeonConstructB1
  }
  
  sig CorpForgeBeta extends AbstractForge {}
  {
    createA in CyberConstructA2
    createB in NeonConstructB2
  }
  
  pred generate_constructs {}
  run generate_constructs for 3
tags: [creational, factories, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory: Matrix of Creation

In the sprawling relational nets of Alloy, we do not instantiate objects—we forge constraints and define multiplicities. The Abstract Forge establishes a nexus of interrelated constructs. By relying on `abstract sig`, we declare our interfaces, whereas our concrete forges bind subsets of the cosmos to specific forms.
