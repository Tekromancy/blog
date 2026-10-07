---
title: "The Composite of the Skeletal Horde"
description: "Compose objects into tree structures to represent part-whole hierarchies of the undead."
type: foxpro
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Necromancy // Horde Command"
formula: |2
  DEFINE CLASS Undead AS Custom
      Name = ""

      PROCEDURE Init(cName)
          THIS.Name = cName
      ENDPROC

      PROCEDURE Attack()
      ENDPROC
  ENDDEFINE

  DEFINE CLASS Skeleton AS Undead
      PROCEDURE Attack()
          ? THIS.Name + " swings a rusty blade."
      ENDPROC
  ENDDEFINE

  DEFINE CLASS SkeletonLegion AS Undead
      DIMENSION aTroops[1]
      nTroopCount = 0

      PROCEDURE AddTroop(oTroop)
          THIS.nTroopCount = THIS.nTroopCount + 1
          DIMENSION THIS.aTroops[THIS.nTroopCount]
          THIS.aTroops[THIS.nTroopCount] = oTroop
      ENDPROC

      PROCEDURE Attack()
          ? "Legion " + THIS.Name + " attacks in unison!"
          LOCAL i
          FOR i = 1 TO THIS.nTroopCount
              THIS.aTroops[i].Attack()
          ENDFOR
      ENDPROC
  ENDDEFINE
tags: [structural, composite, tree, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Composite allows the dark general to command a single skeleton or a sprawling legion with the exact same incantation. The hierarchy of undeath collapses into a single interface.
