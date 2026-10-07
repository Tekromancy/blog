---
title: "The Template Method: The Arcane Pipeline"
description: "Solidify the algorithm shell while delaying inner computations."
type: futhark
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type template = { init: i32 -> i32, process: i32 -> i32, finalize: i32 -> i32 }
  
  let run_template (t: template) (input: i32) : i32 =
    input |> t.init |> t.process |> t.finalize
tags: [futhark, template, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
