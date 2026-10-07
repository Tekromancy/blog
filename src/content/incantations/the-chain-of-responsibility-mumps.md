---
title: The Chain of Responsibility
description: Passing a chaotic dark-magic anomaly through a hierarchy of warding clerics.
type: mumps
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Energy-Routing"
formula: |2
  CHAIN ; Chain of Responsibility in MUMPS
  ;
  HANDLE(ANOMALY) ;
    I $$NOVICE(ANOMALY) Q
    I $$ADEPT(ANOMALY) Q
    I $$MASTER(ANOMALY) Q
    W "Anomaly too powerful! The hospital is doomed!",!
    Q
  ;
  NOVICE(A) ;
    I A<10 W "Novice dispelled the anomaly.",! Q 1
    Q 0
  ;
  ADEPT(A) ;
    I A<50 W "Adept contained the anomaly.",! Q 1
    Q 0
  ;
  MASTER(A) ;
    I A<100 W "Master banished the anomaly to the void.",! Q 1
    Q 0
tags: [behavioral, chain-of-responsibility, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
