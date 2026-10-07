---
title: The Proxy
description: Providing a surrogate or placeholder to control access to a true magical construct.
type: cpp
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Illusion // Shadowcraft
formula: |
  #include <memory>
  class Grimoire {
  public: virtual ~Grimoire() = default; virtual void Read() = 0;
  };
  class AncientGrimoire : public Grimoire {
  public: void Read() override {}
  };
  class GrimoireProxy : public Grimoire {
      std::unique_ptr<AncientGrimoire> realGrimoire;
  public:
      void Read() override {
          if(!realGrimoire) realGrimoire = std::make_unique<AncientGrimoire>();
          realGrimoire->Read();
      }
  };
tags: [structural, proxy, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
