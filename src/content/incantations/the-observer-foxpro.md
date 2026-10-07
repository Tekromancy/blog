---
title: "The Observer of the Scrying Orb"
description: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."
type: foxpro
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  DEFINE CLASS ScryingOrb AS Custom
      DIMENSION aWatchers[1]
      nWatcherCount = 0
      cDarkOmen = ""

      PROCEDURE Attach(oWatcher)
          THIS.nWatcherCount = THIS.nWatcherCount + 1
          DIMENSION THIS.aWatchers[THIS.nWatcherCount]
          THIS.aWatchers[THIS.nWatcherCount] = oWatcher
      ENDPROC

      PROCEDURE RevealOmen(cOmen)
          THIS.cDarkOmen = cOmen
          THIS.NotifyWatchers()
      ENDPROC

      PROCEDURE NotifyWatchers()
          LOCAL i
          FOR i = 1 TO THIS.nWatcherCount
              THIS.aWatchers[i].Update(THIS.cDarkOmen)
          ENDFOR
      ENDPROC
  ENDDEFINE

  DEFINE CLASS CultistWatcher AS Custom
      PROCEDURE Update(cOmen)
          ? "The cultist trembles as the orb reveals: " + cOmen
      ENDPROC
  ENDDEFINE
tags: [behavioral, observer, pub-sub, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Scrying Orb pulses with dark energy. Rather than having the cultists constantly poll the orb for visions, they bind their consciousness to it. When the omen shifts, the Orb broadcasts the terror to all its dependents instantly.
