---
title: The Chain of Magical Wardens
description: Passing a spell request through a chain of arcane wardens.
type: fstar
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Wardens"
formula: |2
  module ChainOfResponsibility
  
  type request = { spell_level: nat }
  type handler = request -> option string
  
  let handle_apprentice : handler = fun r ->
    if r.spell_level < 3 then Some "Apprentice handles" else None
    
  let handle_adept : handler = fun r ->
    if r.spell_level < 6 then Some "Adept handles" else None
    
  let rec chain (handlers: list handler) (r: request) : option string =
    match handlers with
    | [] -> None
    | h :: t ->
      match h r with
      | Some res -> Some res
      | None -> chain t r
tags: [chain, filtering, wardens]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A functional chain of responsibility where a list of warden functions attempt to process a spell request in sequence.
