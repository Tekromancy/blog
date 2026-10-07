---
title: The Strategy
description: Defining a family of combat spells, encapsulating each, and making them interchangeable.
type: cpp
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  #include <memory>
  class CombatSpell {
  public: virtual ~CombatSpell() = default; virtual void Cast() = 0;
  };
  class FireStrike : public CombatSpell {
  public: void Cast() override {}
  };
  class Mage {
      std::unique_ptr<CombatSpell> spell;
  public:
      void SetSpell(std::unique_ptr<CombatSpell> s) { spell = std::move(s); }
      void Attack() { if(spell) spell->Cast(); }
  };
tags: [behavioral, strategy, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
