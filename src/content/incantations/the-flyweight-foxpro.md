---
title: "The Flyweight of Swarming Souls"
description: "Use sharing to support large numbers of fine-grained spirits efficiently."
type: foxpro
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm Intelligence"
formula: |2
  DEFINE CLASS SoulFragment AS Custom
      * Intrinsic state
      FragmentType = ""

      PROCEDURE Init(cType)
          THIS.FragmentType = cType
      ENDPROC

      PROCEDURE Haunt(cLocation)
          * Extrinsic state passed in
          ? "A " + THIS.FragmentType + " haunts " + cLocation
      ENDPROC
  ENDDEFINE

  DEFINE CLASS SoulHive AS Custom
      DIMENSION aPool[1, 2]
      nPoolCount = 0

      FUNCTION GetSoul(cType)
          LOCAL i
          FOR i = 1 TO THIS.nPoolCount
              IF THIS.aPool[i, 1] == cType
                  RETURN THIS.aPool[i, 2]
              ENDIF
          ENDFOR

          THIS.nPoolCount = THIS.nPoolCount + 1
          DIMENSION THIS.aPool[THIS.nPoolCount, 2]
          THIS.aPool[THIS.nPoolCount, 1] = cType
          THIS.aPool[THIS.nPoolCount, 2] = CREATEOBJECT("SoulFragment", cType)
          RETURN THIS.aPool[THIS.nPoolCount, 2]
      ENDFUNC
  ENDDEFINE
tags: [structural, flyweight, sharing, efficiency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the sky darkens with millions of swarming souls, instantiating each individually would exhaust the memory of the living. The Flyweight binds the intrinsic essence into shared objects, consuming only minimal energy for their extrinsic positions.
