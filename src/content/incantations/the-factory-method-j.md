---
title: "The Factory Method"
description: "Deferring instantiation to subclasses through dynamic gerund dispatch."
type: j
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Dynamic Spawning"
formula: |2
  create_demon =: 3 : '''Imp'''
  create_angel =: 3 : '''Cherub'''
  
  spawn_entity =: 1 : 0
    entity =. u ''
    'Spawned: ' , entity
  )
  
  NB. Usage:
  NB. create_demon spawn_entity ''
  NB. create_angel spawn_entity ''
tags: [factory, spawning, gerunds, operators]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Instead of classes, we use J's adverbs to wrap a creation verb, delaying the binding until invocation.
