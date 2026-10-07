---
title: The Flyweight
description: Sharing magical essence to support vast numbers of summoned swarms.
type: cpp
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarming"
formula: |2
  #include <unordered_map>
  #include <string>
  #include <memory>
  class Essence {
  public: virtual void Manifest(int x, int y) = 0;
  };
  class SpriteEssence : public Essence {
      std::string color;
  public:
      SpriteEssence(std::string c) : color(c) {}
      void Manifest(int x, int y) override {}
  };
  class EssenceFactory {
      std::unordered_map<std::string, std::shared_ptr<Essence>> cache;
  public:
      std::shared_ptr<Essence> GetEssence(const std::string& color) {
          if(!cache[color]) cache[color] = std::make_shared<SpriteEssence>(color);
          return cache[color];
      }
  };
tags: [structural, flyweight, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
