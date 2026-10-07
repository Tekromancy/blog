---
title: "The Proxy"
description: "A guardian construct controlling access to an expensive void summoning."
type: j
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Void Guarding"
formula: |2
  coclass 'VoidSummoner'
  real_summon =: 3 : '''Summoning Void Terror!'''
  
  coclass 'ProxySummoner'
  create =: 3 : 'authorized =: y'
  summon =: 3 : 0
    if. authorized do.
      real_summon_VoidSummoner_ ''
    else.
      'Access Denied.'
    end.
  )
  
  NB. Usage:
  NB. p =. conew 'ProxySummoner' ; 0
  NB. summon__p ''
tags: [proxy, access, security, locales]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A proxy controls access using object-oriented locales to wrap the real operational locale.
