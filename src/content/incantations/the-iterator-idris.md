---
title: "The Iterator: The Dimensional Traverse"
description: "Sequentially accessing elements of an arcane manifold without exposing its underlying geometry."
type: idris
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequential-Scrying"
formula: |2
  module Iterator
  
  import Data.Stream
  
  -- An infinite stream of mystical coordinates
  leylineStream : Nat -> Stream Nat
  leylineStream n = n :: leylineStream (n + 10)
  
  -- A finite iterator abstraction using lazy evaluation
  interface Iterator i a where
    next : i -> Maybe (a, i)
  
  -- A finite slice of a stream as an iterator
  data StreamSlice : Type -> Type where
    MkSlice : Nat -> Stream a -> StreamSlice a
  
  Iterator (StreamSlice a) a where
    next (MkSlice Z _) = Nothing
    next (MkSlice (S k) (x :: xs)) = Just (x, MkSlice k xs)
tags: [behavioral, streams, lazy-evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The geometry of a magical manifold is not meant for mortal eyes. The Iterator obscures the structural horror of endless topological loops, providing a safe, sequential pipeline for data extraction. Utilizing Idris's `Stream` and lazy evaluation, the Theorem Proving Pacts guarantee that a magus can traverse infinite dimensional constructs one step at a time, halting before their mind unravels into the void.
