---
title: "The Iterator of the Endless Catacombs"
description: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."
type: foxpro
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  DEFINE CLASS CatacombIterator AS Custom
      oCollection = .NULL.
      nCurrentIndex = 1

      PROCEDURE Init(oColl)
          THIS.oCollection = oColl
      ENDPROC

      FUNCTION HasNext()
          RETURN THIS.nCurrentIndex <= THIS.oCollection.GetCount()
      ENDFUNC

      FUNCTION GetNext()
          LOCAL oItem
          oItem = THIS.oCollection.GetItem(THIS.nCurrentIndex)
          THIS.nCurrentIndex = THIS.nCurrentIndex + 1
          RETURN oItem
      ENDFUNC
  ENDDEFINE

  DEFINE CLASS CryptCollection AS Custom
      DIMENSION aSouls[3]

      PROCEDURE Init
          THIS.aSouls[1] = "Lost Soul"
          THIS.aSouls[2] = "Damned Soul"
          THIS.aSouls[3] = "Forsaken Soul"
      ENDPROC

      FUNCTION GetCount()
          RETURN ALEN(THIS.aSouls)
      ENDFUNC

      FUNCTION GetItem(nIndex)
          RETURN THIS.aSouls[nIndex]
      ENDFUNC

      FUNCTION CreateIterator()
          RETURN CREATEOBJECT("CatacombIterator", THIS)
      ENDFUNC
  ENDDEFINE
tags: [behavioral, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Wandering the endless catacombs directly exposes the summoner to madness. The Iterator provides a safe, structured lantern to illuminate exactly one entity at a time, hiding the terrifying multidimensional layout of the collection.
