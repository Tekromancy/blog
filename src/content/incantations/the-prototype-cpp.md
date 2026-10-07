---
title: The Prototype
description: Cloning magical artifacts directly from a prime template.
type: cpp
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Mirroring
formula: |
  #include <memory>
  class Artifact {
  public:
      virtual ~Artifact() = default;
      virtual std::unique_ptr<Artifact> Clone() const = 0;
  };
  class CrystalBall : public Artifact {
  public:
      std::unique_ptr<Artifact> Clone() const override {
          return std::make_unique<CrystalBall>(*this);
      }
  };
tags: [creational, prototype, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
