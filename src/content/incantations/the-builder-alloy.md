---
title: "The Builder: Assembly of the Relational Construct"
description: "Separate the construction of a complex sigil from its representation."
type: alloy
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Assemblage"
formula: |2
  abstract sig CyberPart {}
  sig Core, Shell, NeonTrim extends CyberPart {}
  
  sig RelationalConstruct {
    parts: set CyberPart
  }
  
  abstract sig ConstructBuilder {
    built: lone RelationalConstruct,
    assembledParts: set CyberPart
  }
  
  sig DroneBuilder extends ConstructBuilder {}
  {
    built.parts = assembledParts
    no (assembledParts & NeonTrim) // Drones lack neon
  }
  
  sig SynthBuilder extends ConstructBuilder {}
  {
    built.parts = assembledParts
    NeonTrim in assembledParts // Synths must have neon
  }
  
  pred assemble_synth[b: SynthBuilder] {
    some b.built
  }
  run assemble_synth for 3
tags: [creational, builder, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder: Assembly of the Relational Construct

A builder in the logical realms of Alloy defines the constraints necessary to aggregate a whole from disparate parts. By segregating the `CyberPart` components and restricting how a `ConstructBuilder` associates them with a `RelationalConstruct`, we manifest strict, mathematically verified assembly lines.
