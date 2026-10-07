---
title: The State (jq)
description: Morph an object's behavior fundamentally as its internal alignment shifts.
type: jq
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  # Behavior dictionaries based on state
  def handle_locked: "System Locked: Rejecting input \(.input)";
  def handle_unlocked: "Processing input \(.input)";
  def handle_alarm: "ALARM TRIGGERED! Discarding \(.input)";

  # State Context router
  def process_by_state:
    if .state == "locked" then handle_locked
    elif .state == "unlocked" then handle_unlocked
    elif .state == "alarm" then handle_alarm
    else "Unknown State" end;

  # Stream processing
  .operations[] | process_by_state
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

An entity's form dictates its function. As a JSON object drifts between phases—locked, unlocked, or panicked—its reactions must shift in tandem. The **State** pattern centralizes this logic into a router that delegates the payload to wildly different filters depending purely on the object's current phase alignment.
