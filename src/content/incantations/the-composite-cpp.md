---
title: The Composite
description: Treating individual runes and woven sigils uniformly.
type: cpp
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Enchantment // Weaving
formula: |
  #include <vector>
  #include <memory>
  class Glyph {
  public: virtual ~Glyph() = default; virtual void Draw() = 0;
  };
  class Rune : public Glyph {
  public: void Draw() override {}
  };
  class Sigil : public Glyph {
      std::vector<std::unique_ptr<Glyph>> parts;
  public:
      void Add(std::unique_ptr<Glyph> g) { parts.push_back(std::move(g)); }
      void Draw() override {
          for(auto& p : parts) p->Draw();
      }
  };
tags: [structural, composite, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
