---
title: The Pipeline Builder
description: Constructing complex line mutations step-by-step through the hold space.
type: sed
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Builder: Assembling a final string in the hold space step-by-step
  /BUILD:START/ {
    s/.*/[START]/
    h
    d
  }
  /BUILD:ADD:/ {
    s/BUILD:ADD:\(.*\)/\1/
    H
    d
  }
  /BUILD:FINISH/ {
    g
    s/\n/-/g
    p
    d
  }
tags: [sed, creational, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
