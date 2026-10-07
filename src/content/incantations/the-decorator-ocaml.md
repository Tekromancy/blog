---
title: The Decorator
description: Layering protective enchantments dynamically using function composition.
type: ocaml
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Abjuration // Layered Wards
formula: |
  let basic_cast spell = "Casting " ^ spell
  
  let with_echo f spell = 
    let res = f spell in
    res ^ " (echo)"
    
  let with_sparkles f spell =
    let res = f spell in
    res ^ " with ✨sparkles✨"
    
  let ultimate_cast = basic_cast |> with_echo |> with_sparkles
tags: [Caml Metamagic, Higher-Order Functions, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Decorating an incantation with layered wards is achieved seamlessly through higher-order function composition, avoiding cumbersome class inheritance.
