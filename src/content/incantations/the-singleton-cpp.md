---
title: The Singleton
description: Ensuring only one nexus of power exists within the reality matrix.
type: cpp
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Chronomancy"
formula: |2
  class Nexus {
  public:
      static Nexus& GetInstance() {
          static Nexus instance;
          return instance;
      }
      Nexus(const Nexus&) = delete;
      Nexus& operator=(const Nexus&) = delete;
  private:
      Nexus() = default;
  };
tags: [creational, singleton, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
