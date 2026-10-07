---
title: The Abstract Factory of the Adobe Alchemy
description: Forge cohesive families of arcane constructs without binding to their concrete tag-wards.
type: coldfusion
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Wardcraft"
formula: |2
  interface name="IApparitionFactory" {
      public ISpirit createSpirit();
      public IWard createWard();
  }

  component name="FireApparitionFactory" implements="IApparitionFactory" {
      public ISpirit function createSpirit() {
          return new FireSpirit();
      }
      public IWard function createWard() {
          return new FireWard();
      }
  }

  component name="IceApparitionFactory" implements="IApparitionFactory" {
      public ISpirit function createSpirit() {
          return new IceSpirit();
      }
      public IWard function createWard() {
          return new IceWard();
      }
  }

  // Client code
  factory = new FireApparitionFactory();
  spirit = factory.createSpirit();
  ward = factory.createWard();
tags: [abstract-factory, coldfusion, alchemy, creation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Abstract Factory weaves ancient CFML tag-wards to instantiate entire families of related spirits and defenses. It isolates the creation of apparitions so that an alchemist might swap a fiery conjuration for an icy one simply by changing the master sigil.
