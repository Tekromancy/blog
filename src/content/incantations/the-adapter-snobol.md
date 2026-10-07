---
title: The Adapter of Snobol
description: Translating incompatible magical languages.
type: snobol
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
          * Adapter pattern in SNOBOL4
          DEFINE('ADAPT_ELVISH_TO_COMMON(TEXT)')

          ELVISH_SPELL = 'mellon'
          COMMON_SPELL = ADAPT_ELVISH_TO_COMMON(ELVISH_SPELL)
          OUTPUT = COMMON_SPELL
          :(END)

  ADAPT_ELVISH_TO_COMMON
          TEXT 'mellon' = 'friend'
          ADAPT_ELVISH_TO_COMMON = TEXT :(RETURN)
  END
tags: [snobol, structural, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter translates the syntax of one arcane language into another. Through pattern replacement, ancient Elvish invocations are morphed into Common tongue.
