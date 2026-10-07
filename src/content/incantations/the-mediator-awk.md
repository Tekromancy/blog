---
title: The Mediator in AWK
description: Decouple distinct processing phases by funneling events through a central coordinator.
type: awk
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus-Routing"
formula: |2
  # The Central Mediator Hub
  function mediator_notify(sender, event, data) {
      if (sender == "Parser" && event == "RecordParsed") {
          logger_log("New record found: " data)
          analyzer_process(data)
      }
      else if (sender == "Analyzer" && event == "CriticalData") {
          logger_log("ALERT! Critical arcana identified: " data)
      }
  }
  
  # Component: Logger
  function logger_log(msg) { 
      print "[SYS_LOG] " msg 
  }
  
  # Component: Analyzer
  function analyzer_process(data) {
      if (data ~ /ROOT/) {
          mediator_notify("Analyzer", "CriticalData", data)
      }
  }
  
  BEGIN { 
      # Simulating a parsing loop
      mediator_notify("Parser", "RecordParsed", "USER_LOGIN: apprentice")
      mediator_notify("Parser", "RecordParsed", "USER_LOGIN: ROOT_ACCESS")
  }
tags: [awk, text-processing, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

As AWK scripts grow into massive, monolithic entities, tightly coupling loggers, parsers, and state-machines becomes chaotic. The Mediator centralizes communication—when the parser identifies a string, it notifies the hub, which then orchestrates the downstream magical effects.
