---
title: The Abstract Factory
description: Conjuring distinct families of necrotic medical equipment through shared incantations.
type: mumps
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Necro-Artifice"
formula: |2
  ABSTRACTFACTORY ; Abstract Factory Pattern in MUMPS
  ; Hospital Database Necromancy: Conjuring wards.
  ;
  CREATE(WARDTYPE) ; Create a family of objects
    N BED,MONITOR
    I WARDTYPE="NECROTIC" D
    . S BED=$$NECROBED()
    . S MONITOR=$$SOULMONITOR()
    I WARDTYPE="MORTAL" D
    . S BED=$$MORTALBED()
    . S MONITOR=$$VITALS()
    W "Ward Conjured: ",BED," with ",MONITOR,!
    Q
  NECROBED() Q "Coffin-Bed of the Damned"
  SOULMONITOR() Q "Ectoplasmic Fluctuation Tracker"
  MORTALBED() Q "Standard Hospital Bed"
  VITALS() Q "EKG Machine"
tags: [creational, abstract-factory, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
