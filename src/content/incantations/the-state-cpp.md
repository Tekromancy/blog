---
title: The State
description: Altering an entity's behavior when its internal elemental alignment changes.
type: cpp
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  #include <memory>
  class Entity;
  class Alignment {
  public: virtual ~Alignment() = default; virtual void Attack(Entity* e) = 0;
  };
  class Entity {
      std::unique_ptr<Alignment> state;
  public:
      void SetAlignment(std::unique_ptr<Alignment> s) { state = std::move(s); }
      void Attack() { if(state) state->Attack(this); }
  };
  class FireAlignment : public Alignment {
  public: void Attack(Entity* e) override {}
  };
tags: [behavioral, state, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
