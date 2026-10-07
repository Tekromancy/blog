---
title: The Template Method of Ritual Casting
description: A skeletal structure for rituals with customizable steps.
type: fstar
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Rituals"
formula: |2
  module TemplateMethod
  
  type ritual_steps = {
    draw_circle: unit -> string;
    chant: unit -> string;
  }
  
  let perform_ritual (steps: ritual_steps) : string =
    let s1 = steps.draw_circle () in
    let s2 = steps.chant () in
    s1 ^ " and then " ^ s2
tags: [template, skeletons, rituals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method is defined via a record of functions, allowing different arcane traditions to instantiate their own specific steps for a common ritual skeleton.
