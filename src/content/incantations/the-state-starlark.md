---
title: The State
description: Morphing the behavior of a build target based on its lifecycle.
type: starlark
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  def target_state_machine():
      state_mem = {"phase": "unconfigured"}
      
      def _configure():
          if state_mem["phase"] != "unconfigured":
              fail("Can only configure unconfigured targets.")
          state_mem["phase"] = "configured"
          return "Configuration applied."
          
      def _build():
          if state_mem["phase"] != "configured":
              fail("Target must be configured before building.")
          state_mem["phase"] = "built"
          return "Artifact forged."
          
      return struct(
          configure = _configure,
          build = _build,
          get_phase = lambda: state_mem["phase"]
      )
  
  # Usage
  sm = target_state_machine()
  sm.configure()
  sm.build()
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Build targets transition through distinct phases: unconfigured, configured, analyzed, and executed. The **State** pattern within a Starlark macro guards these transitions by encapsulating the lifecycle inside a closure. By tracking the `phase` variable, the struct can morph its own allowable behaviors, raising hermetic exceptions if a rogue mage attempts to build a target before its dependencies have been fully configured.
