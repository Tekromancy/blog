---
title: The Factory Method (jq)
description: A focal point in the JSON stream to manifest specialized entities on demand.
type: jq
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  # The creator interface
  def summon_entity($type):
    if $type == "daemon" then
      { "entity": "Daemon", "protocol": "TCP", "port": 666, "status": "listening" }
    elif $type == "sprite" then
      { "entity": "Sprite", "protocol": "UDP", "port": 1337, "status": "hovering" }
    else
      { "error": "Unknown invocation" }
    end;

  # Stream processing
  .requests[] | summon_entity(.desired_type)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Factory Method** provides a singular locus of creation. Rather than bleeding the logic of entity genesis throughout your scripts, we channel the ambient JSON flow into a single conjuration function. This filter breathes life into specific constructs based on the signatures detected in the incoming stream.
