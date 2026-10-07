---
title: The Chain of Responsibility
description: Passing magical anomalies down a lineage of wardens until resolved.
type: ocaml
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Abjuration // Anomaly Routing
formula: |
  type anomaly = Minor | Major | WorldEnding
  
  let handle_minor = function
    | Minor -> Some "Dealt with by Apprentice"
    | _ -> None
    
  let handle_major = function
    | Major -> Some "Contained by Adept"
    | _ -> None
    
  let rec route_anomaly handlers anomaly =
    match handlers with
    | [] -> failwith "Unstoppable anomaly!"
    | h :: t -> 
        match h anomaly with
        | Some resolution -> resolution
        | None -> route_anomaly t anomaly
        
  let chain = [handle_minor; handle_major]
tags: [Caml Metamagic, Pattern Matching, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility uses a list of handler functions, cascading the magical anomaly through pattern matching until a capable warden is found.
