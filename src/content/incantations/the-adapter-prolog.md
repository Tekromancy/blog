---
title: The Adapter of Arcane Translation
description: Bridge incompatible mystical interfaces using logical translation rules.
type: prolog
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Wordmancy"
formula: |2
  % The Old API (Ancient Draconic)
  draconic_ignis(Target, Damage) :-
      format('Ignis strikes ~w for ~w damage.', [Target, Damage]).

  % The New API Expected by the Guild (Common Tongue)
  % cast_spell(SpellName, Target)

  % The Adapter
  cast_spell(fireball, Target) :-
      BaseDamage = 40,
      draconic_ignis(Target, BaseDamage).

  cast_spell(lesser_fireball, Target) :-
      BaseDamage = 15,
      draconic_ignis(Target, BaseDamage).

  % ?- cast_spell(fireball, goblin).
  % "Ignis strikes goblin for 40 damage."
tags: [adapter, structural, prolog, interface, translation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
