---
title: The Visitor of the Progenitor
description: Traverse varied magical forms natively with pattern matching.
type: sml
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Structural Insight"
formula: |2
  datatype mystical_entity =
      Elemental of string * int
    | Spirit of string
    | Golem of int
    
  fun banish (Elemental (elem, power)) =
      print ("Dispelling the " ^ elem ^ " elemental of power " ^ Int.toString power ^ ".\n")
    | banish (Spirit name) =
      print ("Exorcising the spirit known as " ^ name ^ ".\n")
    | banish (Golem weight) =
      print ("Crushing the " ^ Int.toString weight ^ " ton golem into dust.\n")
      
  val entities = [Elemental ("Fire", 9000), Spirit "Banshee", Golem 5]
  
  val _ = app banish entities
tags: [pattern matching, datatypes, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In object-oriented tongues, adding a new operation to a class hierarchy without modifying the classes requires the cumbersome Visitor pattern. In the realm of the ML Progenitor, this problem evaporates. Using algebraic datatypes and pattern matching, you can easily define external functions (like `banish`) that match over the types and operate upon them. The Visitor is native; the Visitor is SML.
