---
title: The Chain of Responsibility
description: Passing an arcane request through a linked sequence of Gallina Wards until one successfully binds it.
type: coq
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  (* Gallina Ward: Chain of Responsibility *)
  Require Import String List.
  Import ListNotations.
  
  (* A Handler processes a request, returning Some result if handled, or None to pass it on *)
  Definition Handler := nat -> option string.
  
  Definition handleLowLevel : Handler := fun req =>
    if Nat.leb req 10 then Some "Handled by Low-Level Ward" else None.
    
  Definition handleMidLevel : Handler := fun req =>
    if Nat.leb req 100 then Some "Handled by Mid-Level Ward" else None.
    
  Definition handleHighLevel : Handler := fun req =>
    Some "Handled by Archmage Ward".
    
  Fixpoint processChain (chain : list Handler) (req : nat) : option string :=
    match chain with
    | [] => None
    | h :: t => match h req with
                | Some res => Some res
                | None => processChain t req
                end
    end.
    
  Definition wardChain := [handleLowLevel; handleMidLevel; handleHighLevel].
  Definition invoke (req : nat) := processChain wardChain req.
tags: [chain-of-responsibility, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
