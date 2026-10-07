---
title: The Proxy of Snobol
description: A magical guardian controlling access to the true spell.
type: snobol
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
          * Proxy pattern in SNOBOL4
          DEFINE('PROXY_CAST(USER, SPELL)')

          PROXY_CAST('Apprentice', 'DOOMSDAY')
          PROXY_CAST('Archmage', 'DOOMSDAY')
          :(END)

  PROXY_CAST
          IDENT(USER, 'Archmage') :S(DO_CAST)
          OUTPUT = 'Access Denied for ' USER :(RETURN)
  DO_CAST
          OUTPUT = 'Casting ' SPELL '...' :(RETURN)
  END
tags: [snobol, structural, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy stands as a guardian ward. It intercepts the casting request, evaluating the authority of the caster before either unleashing the spell or rejecting the interloper.
