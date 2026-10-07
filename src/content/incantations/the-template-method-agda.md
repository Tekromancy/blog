---
title: "The Template Method Scroll"
description: "Defining the skeleton of an algorithm, deferring some steps to subclasses."
type: agda
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Scaffolding"
formula: |2
  module TemplateMethod where
  
  open import Data.String
  
  record Operations : Set where
    field
      step1 : String
      step2 : String
      
  -- The template algorithm
  runTemplate : Operations → String
  runTemplate ops = Operations.step1 ops -- concatenated with step2 ideally
tags: ["agda", "template-method", "scaffolding"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Template Method Scroll

To summon a daemon, the ritual sequence is strict: light the cyber-candles, chant the IP address, break the seal. The **Template Method Scroll** defines the high-level steps while letting lower apprentices define the specific candle color.

## The Dependent Runes

We achieve this by writing a core function `runTemplate` that requires a dictionary (`Operations`) of the missing steps. 
