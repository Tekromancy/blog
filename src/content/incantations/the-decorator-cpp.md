---
title: The Decorator
description: Dynamically attaching new magical properties to an artifact.
type: cpp
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Imbuing"
formula: |2
  #include <memory>
  class Relic {
  public: virtual ~Relic() = default; virtual void Power() = 0;
  };
  class Amulet : public Relic {
  public: void Power() override {}
  };
  class RelicDecorator : public Relic {
  protected:
      std::unique_ptr<Relic> wrappee;
  public:
      RelicDecorator(std::unique_ptr<Relic> r) : wrappee(std::move(r)) {}
      void Power() override { wrappee->Power(); }
  };
  class GlowingRelic : public RelicDecorator {
  public:
      GlowingRelic(std::unique_ptr<Relic> r) : RelicDecorator(std::move(r)) {}
      void Power() override { wrappee->Power(); /* Add glow */ }
  };
tags: [structural, decorator, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
