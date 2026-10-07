---
title: The Prototype of the Ancestral Monad
description: Cloning pure expressions using lexical bindings to mirror the Ancestral Monad.
type: miranda
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Ancestral Monad"
formula: |2
  || In the Ancestral Monad, cloning is simply binding a new name.
  
  prototype_record == (string, num, [string])
  
  base_prototype :: prototype_record
  base_prototype = ("Origin", 1, ["essence", "void"])
  
  clone_and_modify :: prototype_record -> string -> prototype_record
  clone_and_modify (name, level, traits) new_name = (new_name, level + 1, traits)
  
  spawn_clones :: [prototype_record]
  spawn_clones = [base_prototype, clone_and_modify base_prototype "Echo1", clone_and_modify base_prototype "Echo2"]
tags: [miranda, creational, prototype, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
