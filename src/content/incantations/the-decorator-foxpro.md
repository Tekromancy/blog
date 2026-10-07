---
title: "The Decorator of Spectral Auras"
description: "Attach additional responsibilities to an apparition dynamically."
type: foxpro
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Illusion // Aura Shaping"
formula: |2
  DEFINE CLASS BaseSpirit AS Custom
      FUNCTION Manifest()
          RETURN "A frail spirit"
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS SpiritDecorator AS Custom
      oSpirit = .NULL.

      PROCEDURE Init(oRef)
          THIS.oSpirit = oRef
      ENDPROC

      FUNCTION Manifest()
          RETURN THIS.oSpirit.Manifest()
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS FlamingAura AS SpiritDecorator
      FUNCTION Manifest()
          RETURN DODEFAULT() + ", wreathed in hellfire"
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS IcyGrasp AS SpiritDecorator
      FUNCTION Manifest()
          RETURN DODEFAULT() + ", freezing the cursor space"
      ENDFUNC
  ENDDEFINE
tags: [structural, decorator, wrapping, extensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than defining a rigid subclass for every possible permutation of spectral phenomena, the Decorator envelops the base entity in new layers of dark energy dynamically at runtime.
