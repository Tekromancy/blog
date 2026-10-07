---
title: The Memento
description: Capturing and restoring the soul-state of a patient before a risky necromantic surgery.
type: mumps
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State-Preservation"
formula: |2
  MEMENTO ; Memento Pattern in MUMPS
  ;
  SAVE(ID) ;
    N TIME S TIME=$H
    M ^SOULARCHIVE(ID,TIME)=^PATIENT(ID)
    W "Patient ",ID," soul-state saved at ",TIME,!
    Q TIME
  ;
  RESTORE(ID, TIME) ;
    K ^PATIENT(ID)
    M ^PATIENT(ID)=^SOULARCHIVE(ID,TIME)
    W "Patient ",ID," restored to state at ",TIME,!
    Q
tags: [behavioral, memento, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
