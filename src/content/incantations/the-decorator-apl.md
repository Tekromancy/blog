---
title: The Decorator
description: Layer esoteric shields over an alien biological core dynamically.
type: apl
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Shield-Layering"
formula: |2
  :Class Entity
      ∇ R←Defenses
        :Access Public Shared
        R←''
      ∇
  :EndClass

  :Class BioCore : Entity
      ∇ R←Defenses
        :Access Public
        R←'Chitinous Hull ⍓'
      ∇
  :EndClass

  :Class ShieldDecorator : Entity
      :Field Protected WrappedEntity

      ∇ Make Ent
        :Access Public
        :Implements Constructor
        WrappedEntity ← Ent
      ∇

      ∇ R←Defenses
        :Access Public
        R←WrappedEntity.Defenses
      ∇
  :EndClass

  :Class PlasmaShield : ShieldDecorator
      ∇ R←Defenses
        :Access Public
        R←WrappedEntity.Defenses , ' | Plasma Aura ⌾'
      ∇
  :EndClass
tags: [apl, structural, alien, decorator, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than mutating the genetic matrix of a `BioCore`, the alien engineers dynamically graft `ShieldDecorator` matrices around it. This pattern allows infinite layering of abjuration glyphs (`⌾` and `⍓`). Each decorator seamlessly wraps the entity, augmenting its defensive properties at runtime without permanently altering the underlying biological architecture.
