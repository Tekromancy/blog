---
title: The Factory Method
description: Delegating the incantation of creation to specialized sub-mages.
type: cpp
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  #include <memory>
  class Familiar {
  public: virtual ~Familiar() = default; virtual void Speak() = 0;
  };
  class Raven : public Familiar {
  public: void Speak() override {}
  };
  class Summoner {
  public:
      virtual ~Summoner() = default;
      virtual std::unique_ptr<Familiar> SummonFamiliar() = 0;
  };
  class RavenSummoner : public Summoner {
  public:
      std::unique_ptr<Familiar> SummonFamiliar() override {
          return std::make_unique<Raven>();
      }
  };
tags: [creational, factory-method, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
