---
title: The Prototype of Magical Cloning
description: Clone existing spell matrices by unifying with a prototype pattern.
type: prolog
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Biomancy"
formula: |2
  % The Prototype Registry
  prototype(fireball, spell(fire, 50, area_effect)).
  prototype(healing_word, spell(light, 20, single_target)).

  % Clone operation is simply unification and modification in logic
  clone_spell(Name, ClonedSpell) :-
      prototype(Name, ClonedSpell).

  % Clone and modify (mutate the clone)
  empower_spell(Name, EmpoweredSpell) :-
      prototype(Name, spell(Element, Power, Target)),
      NewPower is Power * 2,
      EmpoweredSpell = spell(Element, NewPower, Target).

  % ?- empower_spell(fireball, Empowered).
  % Empowered = spell(fire, 100, area_effect).
tags: [prototype, creational, prolog, cloning, spells]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
