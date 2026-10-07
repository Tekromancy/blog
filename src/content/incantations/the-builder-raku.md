---
title: Builder
description: Constructing a spell that lasts a century, step by meticulous step.
type: raku
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Evocation // Architecture"
formula: |2
  class CenturySpell {
      has Int $.duration is rw;
      has Str $.intensity is rw;
      has Str $.target is rw;
      
      method describe() {
          say "A spell targeting $!target with $!intensity intensity, lasting $!duration years.";
      }
  }

  role SpellBuilder {
      method set-duration($d) { ... }
      method set-intensity($i) { ... }
      method set-target($t) { ... }
      method get-spell(--> CenturySpell) { ... }
  }

  class HundredYearBuilder does SpellBuilder {
      has CenturySpell $!spell .= new;

      method set-duration($d) { $!spell.duration = $d; self }
      method set-intensity($i) { $!spell.intensity = $i; self }
      method set-target($t) { $!spell.target = $t; self }
      method get-spell(--> CenturySpell) { $!spell }
  }

  class SpellDirector {
      method construct(SpellBuilder $builder) {
          $builder.set-duration(100)
                  .set-intensity('archmage-level')
                  .set-target('the royal bloodline');
      }
  }

  my $builder = HundredYearBuilder.new;
  my $director = SpellDirector.new;
  $director.construct($builder);
  my $spell = $builder.get-spell();
  $spell.describe();
tags: [creational, builder, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When crafting a spell destined to outlive its caster, a simple incantation will not suffice. The Builder pattern allows us to assemble the Hundred-Year Spell piece by piece, ensuring the target, intensity, and duration are perfectly aligned before the magical energies are released.
