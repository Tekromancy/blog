---
title: "The Interpreter: Decoding the Ancient Runes"
description: "Defining a grammatical representation for a language and an interpreter to interpret sentences in the language."
type: "arnoldc"
gofPattern: "Interpreter"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Translation"
formula: |2
  IT'S SHOWTIME
  
  LISTEN TO ME VERY CAREFULLY EVALUATE_TERMINAL
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE CONTEXT_VAL
  GIVE THESE PEOPLE AIR
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RESULT
  GET TO THE CHOPPER RESULT
  HERE IS MY INVITATION CONTEXT_VAL
  ENOUGH TALK
  I'LL BE BACK RESULT
  HASTA LA VISTA, BABY
  
  LISTEN TO ME VERY CAREFULLY EVALUATE_ADD
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE LEFT_EXP
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE RIGHT_EXP
  GIVE THESE PEOPLE AIR
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE L_RES
  GET YOUR ASS TO MARS L_RES
  DO IT NOW EVALUATE_TERMINAL LEFT_EXP
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE R_RES
  GET YOUR ASS TO MARS R_RES
  DO IT NOW EVALUATE_TERMINAL RIGHT_EXP
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE FINAL
  GET TO THE CHOPPER FINAL
  HERE IS MY INVITATION L_RES
  GET UP R_RES
  ENOUGH TALK
  
  I'LL BE BACK FINAL
  HASTA LA VISTA, BABY
  
  I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE PARSE_RESULT
  
  GET YOUR ASS TO MARS PARSE_RESULT
  DO IT NOW EVALUATE_ADD 10 20
  
  TALK TO THE HAND "Runes decoded. Output:"
  TALK TO THE HAND PARSE_RESULT
  
  YOU HAVE BEEN TERMINATED
tags: ["behavioral", "interpreter", "arnoldc", "translation"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: "Archmage"
---

# The Interpreter: Decoding the Ancient Runes

When a technomancer discovers an ancient glyph etched into the silicon, they must parse it. The Interpreter pattern specifies how to evaluate sentences in a language. 

Though ArnoldC lacks dynamic object trees, we can represent an Abstract Syntax Tree (AST) using nested subroutines. Here, our `EVALUATE_ADD` acts as a non-terminal expression, breaking down its sub-components to `EVALUATE_TERMINAL`, thus forming a crude but effective interpreter for the math of the ancestors.
