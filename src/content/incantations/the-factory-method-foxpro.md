---
title: "The Factory Method of Familiar Summoning"
description: "Define an interface for creating an apparition, but let subclasses decide which entity to instantiate."
type: foxpro
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Shaping"
formula: |2
  DEFINE CLASS Summoner AS Custom
      FUNCTION CreateFamiliar()
          * To be overridden
          RETURN .NULL.
      ENDFUNC

      PROCEDURE Bind()
          LOCAL oFamiliar
          oFamiliar = THIS.CreateFamiliar()
          oFamiliar.Serve()
      ENDPROC
  ENDDEFINE

  DEFINE CLASS DemonSummoner AS Summoner
      FUNCTION CreateFamiliar()
          RETURN CREATEOBJECT("DemonFamiliar")
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS DemonFamiliar AS Custom
      PROCEDURE Serve()
          ? "The demon devours the uncommitted transactions."
      ENDPROC
  ENDDEFINE
tags: [creational, factory-method, subclassing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defers the exact nature of the spawned process to the subclasses, allowing different sects of necromancers to summon their own specific familiars while sharing the same binding rituals.
