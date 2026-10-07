---
title: The Proxy of the Gatekeeper
description: Provide a surrogate tag-ward to control access to a computationally expensive apparition.
type: coldfusion
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  interface name="IDemon" {
      public void manifest();
  }

  component name="GreaterDemon" implements="IDemon" {
      public GreaterDemon function init() {
          // Expensive ritual setup
          writeOutput("Constructing demonic form...");
          return this;
      }
      public void function manifest() {
          writeOutput("I AM HERE!");
      }
  }

  component name="DemonProxy" implements="IDemon" {
      variables.realDemon = null;

      public void function manifest() {
          if (isNull(variables.realDemon)) {
              variables.realDemon = new GreaterDemon();
          }
          variables.realDemon.manifest();
      }
  }
tags: [proxy, coldfusion, lazy-loading, gatekeeper]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy acts as a shadowy intermediary. It defers the catastrophic mana cost of summoning a Greater Demon until the exact moment its power is needed. The tag-ward pretends to be the demon, hiding its latency until `manifest()` is actually called.
