---
title: Factory Method
description: Defer the exact instantiation of arcane effects to specialized subclasses of spellcraft.
type: d
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spell Forging"
formula: |2
  interface ISpell { void manifest(); }
  class FlameStrike : ISpell { override void manifest() {} }
  class FrostNova : ISpell { override void manifest() {} }

  abstract class SpellCrafter {
      abstract ISpell forgeSpell();
      void executeRitual() {
          auto spell = forgeSpell();
          spell.manifest();
      }
  }

  class FireMage : SpellCrafter {
      override ISpell forgeSpell() { return new FlameStrike(); }
  }
tags: [creational, factory-method, dlang, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Defer instantiation of magical artifacts to specialized elemental weavers.
