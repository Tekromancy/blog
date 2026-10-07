---
title: The Prototype (Racket)
description: Clone existing parenthetical entities to bypass the expensive summoning rituals.
type: racket
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  #lang racket

  (struct spell (name mana damage) #:transparent)

  (define fireball (spell "Fireball" 50 100))

  (define (clone-spell s #:name [name (spell-name s)]
                         #:mana [mana (spell-mana s)]
                         #:damage [damage (spell-damage s)])
    (spell name mana damage))

  (define greater-fireball (clone-spell fireball #:name "Greater Fireball" #:damage 200))

  (printf "Base Spell: ~a\n" fireball)
  (printf "Cloned Spell: ~a\n" greater-fireball)
tags: [racket, creational, prototype, structural-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Prototype

Why conjure from scratch when you can duplicate? The Prototype pattern relies on the power of structural cloning. In Racket, keyword arguments allow us to selectively mutate the cloned structure, creating a "Greater" variant of a base spell while leaving the original intact. It's an illusion that becomes reality.
