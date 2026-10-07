---
title: "The Command: Encapsulated Rituals"
description: "Represent specific data mutations or actions as strictly structured configuration payloads."
type: cue
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Encapsulated Rituals"
formula: |2
  package wards
  
  // The generic Command interface
  #Command: {
  	action: string
  	target: string
  	payload: _
  }
  
  // Concrete Command: Initialize Ward
  #InitCommand: #Command & {
  	action: "INITIALIZE"
  	target: =~"^ward-"
  	payload: {
  		initial_energy: >= 100
  	}
  }
  
  // Concrete Command: Purge Corruption
  #PurgeCommand: #Command & {
  	action: "PURGE"
  	target: string
  	payload: {
  		force_level: >= 1 & <= 10
  		quarantine: bool | *true
  	}
  }
  
  // A history of commands (Invoker)
  #RitualLog: {
  	history: [...#Command]
  }
  
  // Usage
  execution: #RitualLog & {
  	history: [
  		#InitCommand & { target: "ward-alpha", payload: { initial_energy: 500 } },
  		#PurgeCommand & { target: "node-beta", payload: { force_level: 5 } }
  	]
  }
tags: [command, behavioral, cue, evocation, lattice-wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In declarative environments like CUE, you don't execute functions sequentially. However, you often need to generate structured manifests that act as **Commands** for external orchestration engines (like Kubernetes or CI/CD runners) that manipulate your **Lattice Data Validation Wards**.

The **Command** pattern involves defining strict schemas for specific actions (`#InitCommand`, `#PurgeCommand`). This encapsulates the action type, the target, and the required parameter payload into a single, validatable struct. By grouping these into a `#RitualLog`, you create a strongly-typed array of instructions that your execution environment can safely consume, knowing that invalid commands have already been blocked by the compiler.
