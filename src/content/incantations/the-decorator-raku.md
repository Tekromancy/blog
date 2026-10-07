---
title: Decorator
description: Layering magical modifiers onto a basic spell without fundamentally altering its core.
type: raku
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  role Magic {
      method cast() { ... }
  }

  class BaseSpell does Magic {
      has Str $.intent;
      method cast() { "Casting '$!intent'" }
  }

  role SpellDecorator does Magic {
      has Magic $.magic;
      method cast() { $!magic.cast() }
  }

  class CenturyDurationDecorator does SpellDecorator {
      method cast() {
          self.SpellDecorator::cast() ~ ", extended to last precisely one hundred years";
      }
  }

  class BloodlineCurseDecorator does SpellDecorator {
      method cast() {
          self.SpellDecorator::cast() ~ ", bound by blood to the target's descendants";
      }
  }

  my $spell = BaseSpell.new(intent => "Aura of Misfortune");
  $spell = CenturyDurationDecorator.new(magic => $spell);
  $spell = BloodlineCurseDecorator.new(magic => $spell);

  say $spell.cast();
tags: [structural, decorator, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When crafting the Hundred-Year Spell, one does not always start from scratch. Often, a mage begins with a standard charm or curse and progressively layers modifications onto it. The Decorator pattern allows us to wrap a basic spell in a century-long duration or a bloodline binding, modifying its behavior at runtime without polluting the base spell's essence.
