---
title: The Abstract Factory of the Hypertext Labyrinth
description: Conjure entire thematic suites of labyrinthine elements without binding your soul to concrete implementations.
type: twine
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Weaving"
formula: |2
  :: Widget: AbstractFactory [widget]
  <<widget "createNode">>
    <<set _factory to _args[0]>>
    <<if _factory is "Neon">>
      <<set _node to { name: "Neon Node", type: "Terminal", hackable: true }>>
    <<elseif _factory is "Void">>
      <<set _node to { name: "Void Node", type: "Abyss", sanityDrain: 10 }>>
    <</if>>
    <<return _node>>
  <</widget>>
  
  <<widget "createLink">>
    <<set _factory to _args[0]>>
    <<if _factory is "Neon">>
      <<set _link to { name: "Fiber Optic Line", bandwidth: "high" }>>
    <<elseif _factory is "Void">>
      <<set _link to { name: "Astral Tether", stability: "low" }>>
    <</if>>
    <<return _link>>
  <</widget>>
  
  :: Usage
  <<set $currentDomain to "Neon">>
  <<set $newNode to createNode($currentDomain)>>
  <<set $newLink to createLink($currentDomain)>>
  You enter the <<print $newNode.name>>, connected by a <<print $newLink.name>>.
tags: [creational, abstract-factory, sugarcube, macros]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the shifting architecture of the Hypertext Labyrinth, hardcoding passages binds the weaver to a static reality. The **Abstract Factory** incantation allows a Weaver to conjure cohesive families of nodes and links—be they dripping with neon cyber-sludge or echoing with astral void-resonance—without committing to the concrete structure of the digital realm.

By passing the domain's soul as a parameter, the macro yields structures that resonate perfectly with the current reality shard.
