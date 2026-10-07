---
title: The Iterator (jq)
description: Unfurl collections into streams, transcending structural boundaries.
type: jq
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  # Extracting elements from a nested labyrinth
  def walk_and_yield:
    .. | objects | select(has("target")) | .target;

  # Iterating over the stream
  [ walk_and_yield ] | map(. * 2)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

`jq` is natively built upon the concept of generators and streams. The **Iterator** pattern here is manifested by the recursive descent operator (`..`) and stream extraction (`[]`). Rather than maintaining complex pointer states, we shatter the JSON structure, yielding a continuous, flat stream of targets ripe for transmutation.
