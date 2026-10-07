---
title: The Template Method
description: Define the unalterable ritual of bio-mechanical assimilation.
type: apl
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Necromancy // Assimilation-Ritual
formula: |
  :Class AssimilationRitual
      ∇ Begin Target
        :Access Public
        ExtractBiomass Target
        InjectNanites Target
        Awaken Target
      ∇
      
      ∇ ExtractBiomass Target
        :Access Protected Shared
      ∇
      
      ∇ InjectNanites Target
        :Access Protected Shared
      ∇
      
      ∇ Awaken Target
        :Access Protected
        ⎕ ← Target, ' joins the Collective ⍟'
      ∇
  :EndClass
  
  :Class HumanoidAssimilation : AssimilationRitual
      ∇ ExtractBiomass Target
        :Access Protected
        ⎕ ← 'Harvesting neural tissue from ', Target, ' ⍎'
      ∇
      
      ∇ InjectNanites Target
        :Access Protected
        ⎕ ← 'Injecting silicate virus into ', Target, ' ⍕'
      ∇
  :EndClass
tags: [apl, behavioral, alien, template-method, assimilation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The cybernetic collective demands absolute adherence to the assimilation sequence. The Template Method cements the unalterable skeleton of this ritual (`Begin`), ensuring that biomass extraction and nanite injection occur in perfect succession before awakening. While subclasses like `HumanoidAssimilation` dictate the specifics of tissue harvesting (`⍎`) and viral injection (`⍕`), the overarching algorithmic flow remains safely locked in the base matrix.
