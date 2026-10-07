---
title: The Template Method
description: Defining the skeleton of a ritual, deferring some steps to specific sects.
type: cpp
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ritualism"
formula: |2
  class Ritual {
  protected:
      virtual void Prepare() = 0;
      virtual void Execute() = 0;
  public:
      void Perform() {
          Prepare();
          Execute();
      }
  };
  class DarkRitual : public Ritual {
  protected:
      void Prepare() override {}
      void Execute() override {}
  };
tags: [behavioral, template-method, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
