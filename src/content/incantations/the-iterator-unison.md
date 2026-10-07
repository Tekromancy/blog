---
title: The Iterator
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
type: unison
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  ability Yield a where
    yield : a -> ()
    
  -- An iterator is an ability that emits values
  scryArray : [a] -> '{Yield a} ()
  scryArray arr _ = 
    List.map (Yield.yield) arr
    ()
    
  toListHandler : '{Yield a} () -> [a]
  toListHandler comp =
    h : Request (Yield a) [a] -> [a]
    h = cases
      {Yield.yield a -> resume} -> a +: (handle resume () with h)
      {_} -> []
    handle !comp with h
tags: [behavioral, iterator, unison, abilities, streams]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In Unison, iteration over unknown collections is elegantly modeled using Abilities. By defining a `Yield` ability, a spell can emit values one by one into the ether. The caller then provides a handler (such as `toListHandler`) to collect, filter, or immediately process these emitted values, fully decoupling the traversal logic from the underlying spatial representation of the artifact.
