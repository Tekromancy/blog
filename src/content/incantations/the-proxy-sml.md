---
title: The Proxy of the Progenitor
description: Control access to forbidden knowledge using closures.
type: sml
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  signature GRIMOIRE = sig
    val readForbiddenSecrets : string -> string
  end
  
  structure TrueGrimoire : GRIMOIRE = struct
    fun readForbiddenSecrets user =
      "Behold the cosmic truths, " ^ user ^ "!"
  end
  
  structure GrimoireProxy : GRIMOIRE = struct
    fun readForbiddenSecrets user =
      if user = "Archmage" then
        TrueGrimoire.readForbiddenSecrets user
      else
        "Access Denied. You are not ready for this knowledge."
  end
  
  val attempt1 = GrimoireProxy.readForbiddenSecrets "Apprentice"
  val attempt2 = GrimoireProxy.readForbiddenSecrets "Archmage"
tags: [access control, wrapper, lazy evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Proxy pattern intercepts calls to a real subject. In SML, we implement the same `signature` as the true structure, placing protective wards in the Proxy structure. Whether for access control, lazy initialization, or logging, the Proxy allows an Archmage to transparently manage how and when the underlying functions of the true system are evaluated.
