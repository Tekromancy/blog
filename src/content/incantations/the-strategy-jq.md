---
title: The Strategy (jq)
description: Hot-swap sorting and analytical algorithms dynamically within the stream.
type: jq
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Calculation"
formula: |2
  # Strategies
  def sort_by_power: sort_by(.power) | reverse;
  def sort_by_name: sort_by(.name);

  # Context executor
  def execute_strategy($strat_name):
    if $strat_name == "power" then sort_by_power
    elif $strat_name == "name" then sort_by_name
    else . end;

  # The Stream
  .squad as $squad | .directive as $strat | $squad | execute_strategy($strat)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rigidly defining a calculation restricts the adaptability of your systems. The **Strategy** pattern encapsulates different algorithms (sorting, filtering, or scoring) into separate modular filters. Depending on the directives passed in the JSON envelope, the core processor swaps its cognitive strategy on the fly.
