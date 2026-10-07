---
title: The Adapter
description: Bridging incompatible magical interfaces to channel foreign energy.
type: cpp
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Alteration
formula: |
  class OldSpell {
  public: virtual void CastOldWay() {}
  };
  class NewWand {
  public: virtual ~NewWand() = default; virtual void Cast() = 0;
  };
  class SpellAdapter : public NewWand {
      OldSpell* oldSpell;
  public:
      SpellAdapter(OldSpell* os) : oldSpell(os) {}
      void Cast() override { oldSpell->CastOldWay(); }
  };
tags: [structural, adapter, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
