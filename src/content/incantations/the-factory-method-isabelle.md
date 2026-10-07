---
title: The Factory Method
description: Define an interface for creating an artifact, but let subclasses or specific implementations decide which artifact to manifest.
type: isabelle
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Manifestation"
formula: |2
  theory FactoryMethod
    imports Main
  begin
  
  datatype artifact = Wand | Staff | Orb
  
  locale artifact_factory =
    fixes create_artifact :: "unit \<Rightarrow> artifact"
  
  interpretation wand_factory: artifact_factory "\<lambda>_. Wand"
    by unfold_locales
  
  interpretation staff_factory: artifact_factory "\<lambda>_. Staff"
    by unfold_locales
  
  end
tags: [isabelle, hol, conjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
