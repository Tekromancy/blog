---
title: The Singleton of Snobol
description: Ensuring only one instance of a magical entity exists across the script.
type: snobol
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sealing"
formula: |2
          * Singleton Pattern in SNOBOL4
          DEFINE('GET_GRIMOIRE()')

          GRIMOIRE_INSTANCE = ''

          BOOK1 = GET_GRIMOIRE()
          BOOK2 = GET_GRIMOIRE()

          OUTPUT = BOOK1
          OUTPUT = BOOK2
          :(END)

  GET_GRIMOIRE
          IDENT(GRIMOIRE_INSTANCE, '') :F(HAS_GRIM)
          GRIMOIRE_INSTANCE = 'The One True Grimoire'
  HAS_GRIM
          GET_GRIMOIRE = GRIMOIRE_INSTANCE :(RETURN)
  END
tags: [snobol, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To bind a Singleton in SNOBOL, one must check the void. Only if the essence is empty does the conjuration proceed; otherwise, the previously bound essence is returned intact.
