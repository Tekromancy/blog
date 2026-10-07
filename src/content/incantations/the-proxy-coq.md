---
title: The Proxy
description: A phantom intermediary ward that intercepts leylines to control access to a computationally expensive Gallina spell.
type: coq
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  (* Gallina Ward: Proxy *)
  Require Import String.
  
  Record Grimoire := {
    readSecrets : string -> string
  }.
  
  (* Expensive Real Subject *)
  Definition ancientGrimoire : Grimoire := {|
    readSecrets := fun pass => "Eldritch Truths Unveiled"
  |}.
  
  (* Access-Control Proxy *)
  Definition grimoireProxy (clearance : nat) : Grimoire := {|
    readSecrets := fun pass =>
      if Nat.eqb clearance 7 then
        ancientGrimoire.(readSecrets) pass
      else
        "Access Denied: Insufficient Arcane Clearance"
  |}.
tags: [proxy, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
