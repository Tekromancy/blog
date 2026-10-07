---
title: The Decorator of Snobol
description: Wrapping spells in additional layers of magical power.
type: snobol
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
          * Decorator pattern in SNOBOL4
          DEFINE('DECORATE_EMPOWER(SPELL)')

          BASE_SPELL = 'Spark'
          EMPOWERED_SPELL = DECORATE_EMPOWER(BASE_SPELL)
          OUTPUT = EMPOWERED_SPELL
          :(END)

  DECORATE_EMPOWER
          DECORATE_EMPOWER = 'Empowered [' SPELL ']' :(RETURN)
  END
tags: [snobol, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through textual wrapping, the Decorator dynamically alters the power of a base spell without modifying the original incantation. SNOBOL's string concatenation serves as the perfect magical binding agent.
