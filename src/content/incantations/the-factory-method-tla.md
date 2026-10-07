---
title: "The Factory Method of Prophetic Spawning"
description: "Delegate the instantiation of parallel timeline states to subclasses of temporal generators."
type: tlaplus
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Divination // Temporal Logic"
formula: |2
  ---- MODULE FactoryMethod ----
  EXTENDS Naturals
  
  CONSTANTS Creators, Products, Create(_, _)
  
  ASSUME \A c \in Creators, p \in Products : Create(c, p) \in BOOLEAN
  
  VARIABLES activeCreator, materialized
  
  Init == 
      /\ activeCreator \in Creators
      /\ materialized = {}
      
  Summon(product) ==
      /\ Create(activeCreator, product)
      /\ materialized' = materialized \union {product}
      /\ UNCHANGED activeCreator
      
  Next == \E p \in Products : Summon(p)
  
  Spec == Init /\ [][Next]_<<activeCreator, materialized>>
  ====
tags: [tla, temporal-divination, instantiation, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In temporal divination, a seer does not foresee an exact entity, but delegates the vision to specialized `Creators`. The Factory Method allows differing creators to summon diverse `Products` based on the relations defined in `Create(_, _)`. It models polymorphing futures through logical abstraction.
