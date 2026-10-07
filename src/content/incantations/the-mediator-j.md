---
title: "The Mediator"
description: "A central ley-line nexus routing energy between discrete magical towers."
type: j
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus Routing"
formula: |2
  coclass 'Nexus'
  create =: 3 : 'towers =: 0$0'
  register =: 3 : 'towers =: towers , y'
  broadcast =: 3 : 0
    'sender msg' =. y
    for_t. towers do.
      if. t ~: sender do.
        receive__t msg
      end.
    end.
  )
  
  coclass 'Tower'
  create =: 3 : 'id =: y'
  set_nexus =: 3 : 'nexus =: y'
  send =: 3 : 'broadcast__nexus id ; y'
  receive =: 3 : 'smoutput id , '' received: '' , y'
tags: [mediator, objects, broadcasting, nexus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Nexus mediates communication between Towers, preventing tight coupling.
