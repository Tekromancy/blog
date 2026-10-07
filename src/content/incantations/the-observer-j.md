---
title: "The Observer"
description: "Scrying stones automatically reacting to ripples in the etheric plane."
type: j
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Etheric Resonance"
formula: |2
  coclass 'EthericPlane'
  create =: 3 : 'observers =: 0$0'
  attach =: 3 : 'observers =: observers , y'
  notify =: 3 : 0
    for_obs. observers do.
      update__obs y
    end.
  )
  trigger_ripple =: 3 : 'notify y'
  
  coclass 'ScryingStone'
  create =: 3 : 'name =: y'
  update =: 3 : 'smoutput name , '' sees ripple: '' , y'
tags: [observer, pubsub, resonance, locales]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A standard pub-sub object setup in J locales.
