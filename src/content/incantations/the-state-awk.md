---
title: The State in AWK
description: Transition the execution context seamlessly across distinct text-parsing phases.
type: awk
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase-Shifting"
formula: |2
  # The State Machine transitions
  function process_state(current_state, input) {
      if (current_state == "AWAIT_HEADER") {
          if (input ~ /^#HEADER/) return "READ_DATA"
          return "AWAIT_HEADER"
      }
      if (current_state == "READ_DATA") {
          if (input ~ /^#FOOTER/) return "DONE"
          print "Extracting data: " input
          return "READ_DATA"
      }
      return current_state
  }
  
  BEGIN { 
      system_state = "AWAIT_HEADER"
      
      # Simulating incoming records
      lines[1] = "ignore this"
      lines[2] = "#HEADER: Start"
      lines[3] = "payload_1"
      lines[4] = "payload_2"
      lines[5] = "#FOOTER: End"
      
      for (i=1; i<=5; i++) {
          print "Current State: " system_state " | Input: " lines[i]
          system_state = process_state(system_state, lines[i])
      }
      print "Final State: " system_state
  }
tags: [awk, text-processing, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Parsing multiline blocks of text—like certificates, stack traces, or structured logs—often requires keeping track of the current parsing phase. The State pattern codifies these phases, isolating the logic for header processing, body extraction, and termination.
