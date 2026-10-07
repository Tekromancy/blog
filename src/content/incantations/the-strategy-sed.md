---
title: The Tactical Interchange (Strategy)
description: Defining a family of algorithms and making them interchangeable through pattern branches.
type: sed
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Strategy: Choose formatting strategy based on header line
  1 {
    /STRATEGY:JSON/ b json_strategy
    /STRATEGY:XML/ b xml_strategy
  }
  
  :json_strategy
  # Convert lines to JSON
  s/\(.*\)/{"data": "\1"}/
  b end
  
  :xml_strategy
  # Convert lines to XML
  s/\(.*\)/<data>\1<\/data>/
  b end
  
  :end
tags: [sed, behavioral, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
