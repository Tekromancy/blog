---
title: The Builder
description: Constructing a complex eldritch abomination step by step.
type: cpp
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Fleshcrafting"
formula: |2
  #include <string>
  #include <memory>
  class Golem {
  public:
      std::string head, body, limbs;
  };
  class GolemBuilder {
  public:
      virtual ~GolemBuilder() = default;
      virtual void BuildHead() = 0;
      virtual void BuildBody() = 0;
      virtual void BuildLimbs() = 0;
      virtual std::unique_ptr<Golem> GetResult() = 0;
  };
  class FleshGolemBuilder : public GolemBuilder {
      std::unique_ptr<Golem> golem = std::make_unique<Golem>();
  public:
      void BuildHead() override { golem->head = "Stitched Head"; }
      void BuildBody() override { golem->body = "Hulking Torso"; }
      void BuildLimbs() override { golem->limbs = "Heavy Arms"; }
      std::unique_ptr<Golem> GetResult() override { return std::move(golem); }
  };
tags: [creational, builder, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
