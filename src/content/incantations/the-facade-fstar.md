---
title: The Facade of the Archmage
description: A simplified interface to a highly complex magical subsystem.
type: fstar
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Interfaces"
formula: |2
  module Facade
  
  module SubsysA = { let prep () = "Prep" }
  module SubsysB = { let ignite () = "Ignite" }
  
  let cast_cataclysm () : string =
    SubsysA.prep () ^ " and " ^ SubsysB.ignite ()
tags: [facade, simplification, subsystems]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Providing a unified, singular casting method for a Cataclysm, hiding the terrifying complexity of the underlying magical subsystems.
