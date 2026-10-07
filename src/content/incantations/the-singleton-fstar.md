---
title: The Singleton of the World Tree
description: A single global instance of the cosmic tree, strictly verified.
type: fstar
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Transmutation // Cosmic"
formula: |2
  module Singleton
  
  type world_tree = { root_depth: nat; branches: nat }
  
  let the_tree : world_tree = { root_depth = 9000; branches = 9 }
  
  let get_instance () : world_tree = the_tree
tags: [singleton, cosmic, tree]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Representing the World Tree as a Singleton. F*'s functional purity naturally encapsulates singleton instances via top-level pure bindings.
