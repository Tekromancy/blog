---
title: "The Template Method"
description: "A skeleton ritual defining the steps, leaving specific incantations to sub-sects."
type: j
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Skeleton Rituals"
formula: |2
  coclass 'BaseRitual'
  prepare =: 3 : '''Preparing chalk...'''
  execute =: 3 : 'prepare '''' ; (cast '''') ; cleanup '''''
  cleanup =: 3 : '''Sweeping chalk...'''
  
  coclass 'FireRitual'
  coinsert 'BaseRitual'
  cast =: 3 : '''Casting Fireball!'''
  
  coclass 'WaterRitual'
  coinsert 'BaseRitual'
  cast =: 3 : '''Casting Healing Wave!'''
  
  NB. Usage: execute__f '' where f =. conew 'FireRitual'
tags: [template, inheritance, locales, rituals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Using J's `coinsert` for inheritance to provide a skeleton algorithm with overriding verbs.
