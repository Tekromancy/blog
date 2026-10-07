---
title: The Builder (jq)
description: Construct complex cyber-golems layer by layer from the primordial JSON soup.
type: jq
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Golemancy"
formula: |2
  # Base golem structure
  def init_golem:
    {};

  # Builder stages
  def add_chassis($type):
    . + { "chassis": $type };
    
  def add_core($power):
    . + { "core": $power };
    
  def add_weaponry($weapons):
    . + { "weapons": $weapons };

  # The Director sequence
  init_golem
    | add_chassis("obsidian_mesh")
    | add_core("quantum_singularity")
    | add_weaponry(["plasma_cannon", "emp_burst"])
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When forging an entity of vast complexity, a solitary invocation risks destabilizing the reality stream. The **Builder** pattern sequences the JSON transmutation into precise, layered incantations. Each step seamlessly merges new properties into the target object, culminating in the birth of a flawless cyber-golem.
