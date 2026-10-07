---
title: The Bridge
description: Decoupling a magical abstraction from its elemental implementation.
type: cpp
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Evocation // Channeling
formula: |
  class Element {
  public: virtual ~Element() = default; virtual void Ignite() = 0;
  };
  class FireElement : public Element {
  public: void Ignite() override {}
  };
  class Spell {
  protected: Element* element;
  public:
      Spell(Element* el) : element(el) {}
      virtual void Execute() = 0;
  };
  class Fireball : public Spell {
  public:
      Fireball(Element* el) : Spell(el) {}
      void Execute() override { element->Ignite(); }
  };
tags: [structural, bridge, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
