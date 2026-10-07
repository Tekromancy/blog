---
title: "The Prototype of Spectral Cloning"
description: "Specify the kinds of apparitions to create using a prototypical instance, and create new spirits by copying this prototype."
type: foxpro
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  DEFINE CLASS SpectralClone AS Custom
      SoulFragment = ""

      FUNCTION Clone()
          LOCAL oClone
          oClone = CREATEOBJECT("SpectralClone")
          oClone.SoulFragment = THIS.SoulFragment
          RETURN oClone
      ENDFUNC
  ENDDEFINE

  * Usage:
  * oOriginal = CREATEOBJECT("SpectralClone")
  * oOriginal.SoulFragment = "Agony"
  * oCopy = oOriginal.Clone()
  * ? oCopy.SoulFragment
tags: [creational, prototype, copy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the cost of creating a new spirit from scratch via full rituals is too high, simply shatter an existing soul and mold a new one from its fragments. The Prototype enables deep duplication.
