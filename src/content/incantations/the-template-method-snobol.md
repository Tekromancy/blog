---
title: The Template Method of Snobol
description: A skeletal ritual where the details are filled by the apprentice.
type: snobol
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Scaffolding"
formula: |2
          * Template Method in SNOBOL4
          DEFINE('POTION_RITUAL(INGREDIENT_FUNC)')

          POTION_RITUAL('ADD_FROG')
          POTION_RITUAL('ADD_NIGHTSHADE')
          :(END)

  POTION_RITUAL
          OUTPUT = 'Boil water.'
          EVAL(INGREDIENT_FUNC '()')
          OUTPUT = 'Stir thrice.' :(RETURN)

  ADD_FROG
          OUTPUT = 'Add eye of newt and toe of frog.' :(RETURN)

  ADD_NIGHTSHADE
          OUTPUT = 'Add drops of deadly nightshade.' :(RETURN)
  END
tags: [snobol, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method establishes the unchangeable framework of a potion ritual—boiling water and stirring. The variable specifics, such as which ingredients to add, are deferred to specific sub-routines evaluated dynamically.
