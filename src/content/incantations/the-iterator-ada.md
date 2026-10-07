---
title: The Iterator Incantation
description: Traversing complex ward structures without exposing their underlying representation.
type: ada
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Abjuration // Matrix Traversal
formula: |
  package Ward_Iterators is
  
     type Iterator is abstract tagged null record;
     function Has_Next (I : Iterator) return Boolean is abstract;
     procedure Next (I : in out Iterator) is abstract;
     
     type Aggregate is abstract tagged null record;
     function Create_Iterator (A : Aggregate) return Iterator'Class is abstract;
     
  end Ward_Iterators;
tags: [ada, abjuration, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A shield matrix might be a simple array, or a multi-dimensional topological map. The Iterator lets an inspector safely traverse these nodes to monitor stability without needing to understand the hyper-spatial geometry of the data structure.
