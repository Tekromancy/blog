---
title: The Chain of Responsibility
description: Pass an unshaped arcane query through a hierarchy of wards until one can intercept and process it.
type: scala
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  type Handler = PartialFunction[String, String]

  val fireWard: Handler = {
    case "fireball" => "FireWard dissipates the fireball."
  }

  val iceWard: Handler = {
    case "frostbite" => "IceWard shatters the frostbite."
  }

  val generalWard: Handler = {
    case _ => "GeneralWard absorbs the unknown spell."
  }

  // Composing the chain using Scala's PartialFunction `orElse`
  val mysticShield: Handler = fireWard orElse iceWard orElse generalWard

  // Usage:
  // println(mysticShield("frostbite")) 
tags: [scala, behavioral, warding, partial-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Scala's `PartialFunction` provides an incredibly idiomatic and functionally pure way to implement the Chain of Responsibility. Wards are chained together seamlessly.
