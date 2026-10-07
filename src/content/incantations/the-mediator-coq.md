---
title: The Mediator
description: A centralized ethereal router that orchestrates complex communications between disparate Gallina Wards.
type: coq
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Networking"
formula: |2
  (* Gallina Ward: Mediator *)
  Require Import String.
  
  (* Ward interfaces passing messages to a central mediator *)
  Record SystemMediator := {
    notify : string -> string -> string
  }.
  
  Record Node := {
    id : string;
    med : SystemMediator;
    send : string -> string
  }.
  
  Definition makeNode (n_id : string) (m : SystemMediator) : Node := {|
    id := n_id;
    med := m;
    send := fun ev => m.(notify) n_id ev
  |}.
  
  Definition nexusMediator : SystemMediator := {|
    notify := fun sender event =>
      "Nexus received " ++ event ++ " from " ++ sender ++ ". Routing accordingly..."
  |}.
  
  Definition alphaNode := makeNode "Alpha" nexusMediator.
  Definition eventResult := alphaNode.(send) "Overload".
tags: [mediator, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
