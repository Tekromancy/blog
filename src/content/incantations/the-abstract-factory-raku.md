---
title: Abstract Factory
description: Weaving generational magic through abstract constructs in Raku.
type: raku
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Threadmancy"
formula: |2
  role Ward { method manifest() { ... } }
  role Curse { method inflict() { ... } }

  class CenturyWard does Ward {
      method manifest() { say "A ward cast for 100 years." }
  }

  class CenturyCurse does Curse {
      method inflict() { say "A 100-year curse is laid upon the land." }
  }

  role SpellFactory {
      method create-ward(--> Ward) { ... }
      method create-curse(--> Curse) { ... }
  }

  class CenturySpellFactory does SpellFactory {
      method create-ward(--> Ward) { CenturyWard.new }
      method create-curse(--> Curse) { CenturyCurse.new }
  }

  my SpellFactory $factory = CenturySpellFactory.new;
  my Ward $ward = $factory.create-ward();
  $ward.manifest();
tags: [creational, abstract-factory, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Hundred-Year Spell requires a weaver of immense patience. The Abstract Factory ensures that the threads of magic—whether wards or curses—are consistent across the generations, bound by a singular overarching factory of intent.
