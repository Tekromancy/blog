---
title: "The Abstract Factory Incantation"
description: "Summon families of dependent artifacts without specifying their concrete rune-forms."
type: agda
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matter Weaving"
formula: |2
  module AbstractFactory where
  
  open import Data.String
  
  record WidgetFactory (Button Checkbox : Set) : Set where
    field
      createButton   : Button
      createCheckbox : Checkbox
  
  -- Concrete Rune Forms
  record WinButton : Set where
    field render : String
  record WinCheckbox : Set where
    field toggle : String
    
  winFactory : WidgetFactory WinButton WinCheckbox
  winFactory = record 
    { createButton   = record { render = "WinButton" }
    ; createCheckbox = record { toggle = "WinCheckbox" }
    }
tags: ["agda", "dependent-types", "cyber-magic", "creational"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory

In the neon-lit datashadows, we often require entire toolkits of intercompatible artifacts—buttons and interfaces that align seamlessly. The **Abstract Factory** spell allows a cypher-mage to weave a matrix of creation without binding the spell to concrete manifestations until the very last cycle.

## The Dependent Runes

By parameterizing our `WidgetFactory` over the exact types of `Button` and `Checkbox`, we ensure that the arcane output is perfectly typed for the environment it manifests in.
