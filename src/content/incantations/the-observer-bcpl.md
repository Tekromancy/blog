---
title: The Observer of the All-Seeing Eye
description: Notify a network of cultists when the Ancestral Void shifts its alignment.
type: bcpl
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  GET "libhdr"

  MANIFEST $(
    MAX_OBSERVERS = 5
  $)

  GLOBAL $(
    Observers : 220
    ObsCount  : 221
  $)

  LET RegisterObserver(obsFunc) BE $(
    IF ObsCount < MAX_OBSERVERS THEN $(
      Observers!ObsCount := obsFunc
      ObsCount := ObsCount + 1
    $)
  $)

  LET NotifyVoidShift(newAlignment) BE $(
    writef("The Void shifts to alignment %d. Notifying cultists...*n", newAlignment)
    FOR i = 0 TO ObsCount - 1 DO $(
      LET func = Observers!i
      func(newAlignment)
    $)
  $)

  LET CultistAlpha(align) BE writef(" Cultist Alpha feels the shift to %d.*n", align)
  LET CultistOmega(align) BE writef(" Cultist Omega embraces the shift to %d.*n", align)

  LET START() BE $(
    LET obsArray = getvec(MAX_OBSERVERS)
    Observers := obsArray
    ObsCount := 0

    RegisterObserver(CultistAlpha)
    RegisterObserver(CultistOmega)

    NotifyVoidShift(666)
    NotifyVoidShift(777)

    freevec(obsArray)
  $)
tags: [observer, cultists, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
