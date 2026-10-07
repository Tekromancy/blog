---
title: Command in Whitespace
description: Encapsulating unseen actions as ethereal objects.
type: whitespace
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Kinetics"
formula: |2
    	 
     	
  	 
   
tags: [unseen-sigils, behavioral, command, whitespace]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command of the Bound Action

The Command pattern encapsulates a request as an object. In Whitespace, where objects do not formally exist, we encapsulate the command by pushing a label identifier and its arguments onto the stack or storing them sequentially in the heap.

This creates a deferred action. An invoker routine can later read this structure, pop the arguments, and dynamically jump to the label.

By treating execution flow itself as data to be manipulated, the caster gains immense power. Complex undo/redo systems and macro recordings can be implemented in a language composed entirely of emptiness.
