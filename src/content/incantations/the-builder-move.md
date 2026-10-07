---
title: The Builder of Arcane Constructs
description: Construct complex magical resources step-by-step in Move without losing references.
type: move
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Artifice"
formula: |2
  module arcane::builder {
      struct Golem has key, store {
          head: u8,
          body: u8,
          arms: u8,
      }
  
      struct GolemBuilder has drop {
          head: u8,
          body: u8,
          arms: u8,
      }
  
      public fun new_builder(): GolemBuilder {
          GolemBuilder { head: 0, body: 0, arms: 0 }
      }
  
      public fun with_head(builder: GolemBuilder, head: u8): GolemBuilder {
          builder.head = head;
          builder
      }
  
      public fun with_body(builder: GolemBuilder, body: u8): GolemBuilder {
          builder.body = body;
          builder
      }
  
      public fun build(builder: GolemBuilder): Golem {
          let GolemBuilder { head, body, arms } = builder;
          Golem { head, body, arms }
      }
  }
tags: [creational, builder, move, constructs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
