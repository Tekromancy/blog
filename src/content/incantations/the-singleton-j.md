---
title: "The Singleton"
description: "Ensuring a single global focal point for a scrying pool."
type: j
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Monolith"
formula: |2
  coclass 'ScryingPool'
  instance_ScryingPool_ =: ''
  
  get_instance =: 3 : 0
    if. 0 = # instance_ScryingPool_ do.
      instance_ScryingPool_ =: conew 'ScryingPool'
    end.
    instance_ScryingPool_
  )
tags: [singleton, global, scrying, locale]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A classic singleton using a global locale variable to hold the unique instance reference.
