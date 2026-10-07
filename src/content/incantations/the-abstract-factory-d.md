---
title: Abstract Factory
description: Conjure complete families of enchanted objects and wards without binding to concrete manifestations.
type: d
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Elemental Arrays"
formula: |2
  import std.stdio;

  interface ISpell { @nogc nothrow void cast(); }
  interface IWard { @nogc nothrow void defend(); }

  interface IMagicFactory {
      ISpell createSpell();
      IWard createWard();
  }

  class PyromancyFactory : IMagicFactory {
      override ISpell createSpell() { return new Fireball(); }
      override IWard createWard() { return new FlameShield(); }
  }

  class Fireball : ISpell {
      override @nogc nothrow void cast() { /* system level invoke */ }
  }

  class FlameShield : IWard {
      override @nogc nothrow void defend() { /* system level block */ }
  }
tags: [creational, abstract-factory, dlang, nogc]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An array of conjurations that instantiate families of related polymorphic artifacts.
