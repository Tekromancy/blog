---
title: The Factory Method of Web Runes
description: Define an interface for creating a single web rune, delegating instantiation logic.
type: purescript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Construct Summoning"
formula: |2
  module Arcane.FactoryMethod where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)

  data ConstructType = Golem | Homunculus | Servitor

  -- The Factory Method Pattern translated to a smart constructor
  summonConstruct :: ConstructType -> String
  summonConstruct Golem = "Summoning an Earth Golem of pure clay..."
  summonConstruct Homunculus = "Brewing a Homunculus in the alchemical vat..."
  summonConstruct Servitor = "Binding a cyber-servitor spirit..."

  ritualOfSummoning :: ConstructType -> Effect Unit
  ritualOfSummoning cType = log $ summonConstruct cType
tags: [creational, factory-method, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
