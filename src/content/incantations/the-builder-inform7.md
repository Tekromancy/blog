---
title: The Builder
description: Constructs complex golems step by step, separating the incantation of construction from the golem's final form.
type: inform7
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Prose-Based Spellcasting"
formula: |2
  A golem is a kind of thing. A golem has a text called the head-material. A golem has a text called the body-material. A golem has a text called the animus.
  
  A golem-builder is a kind of thing. A golem-builder has a text called the current head. A golem-builder has a text called the current body. A golem-builder has a text called the current animus.
  
  To set the head of (builder - a golem-builder) to (mat - a text):
      now the current head of the builder is mat.
      
  To set the body of (builder - a golem-builder) to (mat - a text):
      now the current body of the builder is mat.
      
  To set the animus of (builder - a golem-builder) to (mat - a text):
      now the current animus of the builder is mat.
      
  To decide which golem is the awakened creation of (builder - a golem-builder):
      let the new golem be a new golem;
      now the head-material of the new golem is the current head of the builder;
      now the body-material of the new golem is the current body of the builder;
      now the animus of the new golem is the current animus of the builder;
      decide on the new golem.
tags: [creational, transmutation, builder, inform7]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
