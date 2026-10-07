---
title: "The Iterator Traverse"
description: "Sequentially accessing elements of a complex aggregate without exposing its underlying representation."
type: agda
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  module IteratorPattern where
  
  open import Data.List
  open import Data.Maybe
  
  record Iterator (A : Set) : Set where
    field
      next : Maybe (A × Iterator A)
      
  listIter : {A : Set} → List A → Iterator A
  listIter [] = record { next = nothing }
  listIter (x ∷ xs) = record { next = just (x , listIter xs) }
tags: ["agda", "iterator", "traversal"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Iterator Traverse

Searching a vast databanks array requires a pointer that knows how to drift through the structures. The **Iterator Traverse** lets you inspect each node sequentially, oblivious to whether the data lies in a List, Tree, or distant server.

## The Dependent Runes

We define a co-inductive or recursive record that yields a value and a new Iterator state. Agda ensures the safety of our unwrapping.
