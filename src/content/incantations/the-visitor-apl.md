---
title: The Visitor
description: Project psychic probes across a heterogeneous alien fleet.
type: apl
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Psychic-Probing
formula: |
  :Class ProbeVisitor
      ∇ ScanScout S
        :Access Public Shared
      ∇
      ∇ ScanCruiser C
        :Access Public Shared
      ∇
  :EndClass
  
  :Class DiagnosticProbe : ProbeVisitor
      ∇ ScanScout S
        :Access Public
        ⎕ ← 'Scout stealth matrix operating at peak efficiency ⍉'
      ∇
      ∇ ScanCruiser C
        :Access Public
        ⎕ ← 'Cruiser plasma conduits stable ⍋'
      ∇
  :EndClass
  
  :Class Ship
      ∇ Accept Visitor
        :Access Public Shared
      ∇
  :EndClass
  
  :Class Scout : Ship
      ∇ Accept Visitor
        :Access Public
        Visitor.ScanScout ⎕THIS
      ∇
  :EndClass
  
  :Class Cruiser : Ship
      ∇ Accept Visitor
        :Access Public
        Visitor.ScanCruiser ⎕THIS
      ∇
  :EndClass
tags: [apl, behavioral, alien, visitor, fleet-diagnostics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern allows the Overmind to launch psychic diagnostic waves across an array of heterogeneous ships without forcing each vessel to implement complex self-evaluation routines. The `DiagnosticProbe` acts as a spectral visitor, sweeping through `Scout` (`⍉`) and `Cruiser` (`⍋`) nodes. By utilizing double dispatch (`Accept`), the probe flawlessly identifies the vessel type and executes the specific xenodiagnostic algorithm.
