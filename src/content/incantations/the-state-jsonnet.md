---
title: The State of Jsonnet
description: Altering behavior based on internal state.
type: jsonnet
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  local States = {
    started: { status: "running", log: "System is online" },
    stopped: { status: "halted", log: "System is offline" }
  };

  local Context(stateName) = {
    state: States[stateName],
    render():: "App is " + self.state.status + " | " + self.state.log
  };

  {
    s1: Context("started").render(),
    s2: Context("stopped").render()
  }
tags: [behavioral, state, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The State pattern morphs behavior based on an injected state key, swapping out entire objects of logic and configuration depending on the current phase of the moon.
