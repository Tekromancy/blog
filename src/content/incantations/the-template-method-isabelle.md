---
title: The Template Method
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses or providing function parameters.
type: isabelle
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Blueprinting"
formula: |2
  theory TemplateMethod
    imports Main
  begin
  
  record ritual_template =
    prepare_components :: "unit \<Rightarrow> string"
    chant_incantation :: "unit \<Rightarrow> string"
  
  definition perform_ritual :: "ritual_template \<Rightarrow> string" where
    "perform_ritual template = prepare_components template @ '' and '' @ chant_incantation template"
  
  end
tags: [isabelle, hol, divination, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
