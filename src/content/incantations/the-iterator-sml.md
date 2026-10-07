---
title: The Iterator of the Progenitor
description: Traverse arcane collections without exposing underlying structures.
type: sml
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequential Sight"
formula: |2
  signature ITERABLE = sig
    type 'a t
    val iterate : ('a -> unit) -> 'a t -> unit
  end
  
  structure ListIterable : ITERABLE = struct
    type 'a t = 'a list
    fun iterate f lst = app f lst
  end
  
  structure TreeIterable : ITERABLE = struct
    datatype 'a t = Empty | Node of 'a t * 'a * 'a t
    
    fun iterate f Empty = ()
      | iterate f (Node (left, v, right)) =
          (iterate f left; f v; iterate f right)
  end
  
  val myTree = TreeIterable.Node(
    TreeIterable.Node(TreeIterable.Empty, 1, TreeIterable.Empty),
    2,
    TreeIterable.Node(TreeIterable.Empty, 3, TreeIterable.Empty)
  )
  
  val _ = TreeIterable.iterate (fn x => print (Int.toString x ^ "\n")) myTree
tags: [higher-order functions, traversal, iterators]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The object-oriented Iterator uses stateful objects to step through elements. The ML Progenitor utilizes higher-order functions like `app`, `map`, or `fold`. By defining an `ITERABLE` signature that demands a traversal function (such as `iterate`), we can uniformly process any data structure—lists, trees, or graphs—without ever exposing the chaotic layout of its internal nodes.
