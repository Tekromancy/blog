---
title: The Abstract Factory of the Ancestral Monad
description: Conjuring families of related pure functions without specifying their concrete implementations.
type: miranda
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Ancestral Monad"
formula: |2
  || The Ancestral Monad dictates that all creations stem from pure origins.
  
  abstract_factory ::= (num->string, bool->string)
  
  make_factory_a :: abstract_factory
  make_factory_a = (fa_num, fa_bool)
                   where
                     fa_num n = "A" ++ show n
                     fa_bool b = if b then "ATrue" else "AFalse"
  
  make_factory_b :: abstract_factory
  make_factory_b = (fb_num, fb_bool)
                   where
                     fb_num n = "B" ++ show n
                     fb_bool b = if b then "BTrue" else "BFalse"
  
  client :: abstract_factory -> num -> bool -> string
  client (f_num, f_bool) n b = f_num n ++ " and " ++ f_bool b
tags: [miranda, creational, abstract-factory, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
