---
title: "The Bridge Leyline"
description: "Decoupling an abstraction from its implementation so the two can vary independently."
type: agda
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Alteration // Construct Separation"
formula: |2
  module BridgePattern where
  
  open import Data.String
  
  record Renderer : Set where
    field renderShape : String → String
    
  record Shape : Set where
    field 
      name : String
      draw : Renderer → String
      
  concreteShape : Shape
  concreteShape = record 
    { name = "CyberHex" 
    ; draw = λ r → Renderer.renderShape r "CyberHex" 
    }
tags: ["agda", "bridge", "cyber-magic"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge Leyline

In complex grid architecture, linking an astral abstraction directly to a physical implementation leads to tangled leylines. The **Bridge Leyline** acts as a structural pattern to keep them separate.

## The Dependent Runes

We pass the `Renderer` dictionary into the `Shape` at the moment of invocation (`draw`), keeping them orthogonal. The type system prevents mixing incompatible realms.
