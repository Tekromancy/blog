---
title: The Visitor
description: Sending an Inquisitor to inspect various undead wards without modifying their structure.
type: mumps
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spirit-Walking"
formula: |2
  VISITOR ; Visitor Pattern in MUMPS
  ;
  INSPECT(WARD) ; The Visitor
    I WARD="SKELETON_WARD" D REVIEWSKEL
    I WARD="ZOMBIE_WARD" D REVIEWZOMBIE
    Q
  ;
  REVIEWSKEL W "Inquisitor counts the bones. Everything is orderly.",! Q
  REVIEWZOMBIE W "Inquisitor notes the stench. Recommends more ice.",! Q
  ;
  ; Usage
  ; S WARD="ZOMBIE_WARD" D INSPECT(WARD)
tags: [behavioral, visitor, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
