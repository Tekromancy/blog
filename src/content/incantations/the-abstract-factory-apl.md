---
title: The Abstract Factory
description: Conjure arrays of alien artifacts using interchangeable glyph matrices.
type: apl
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matrix-Weaving"
formula: |2
  :Namespace AlienTech
      :Class AbstractFactory
          ∇ R←CreateWeapon
            :Access Public Shared
            R←'?'
          ∇
          ∇ R←CreateVessel
            :Access Public Shared
            R←'?'
          ∇
      :EndClass

      :Class ZetaRetculiFactory : AbstractFactory
          ∇ R←CreateWeapon
            :Access Public Shared
            R←'Plasma ⍋ Emitter'
          ∇
          ∇ R←CreateVessel
            :Access Public Shared
            R←'Saucer ⍟'
          ∇
      :EndClass

      :Class PleiadianFactory : AbstractFactory
          ∇ R←CreateWeapon
            :Access Public Shared
            R←'Photon ⍉ Beam'
          ∇
          ∇ R←CreateVessel
            :Access Public Shared
            R←'Lightship ⍒'
          ∇
      :EndClass
  :EndNamespace
tags: [apl, creational, alien, glyphs, abstract-factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the multidimensional realms of APL, the Abstract Factory aligns hyper-dimensional matrices to instantiate entire families of alien artifacts without binding the invocator to their concrete crystalline forms. The glyphs `⍋` and `⍟` resonate with the Zeta Reticuli frequency, while `⍉` and `⍒` map to Pleiadian harmonics. By shifting the active factory, the arcane arrays naturally emit the desired cosmic weaponry and vessels.
