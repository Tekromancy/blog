---
title: The Observer
description: Establishing a resonant leyline link so that multiple Gallina Wards automatically react to a central sigil's disruption.
type: coq
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  (* Gallina Ward: Observer *)
  Require Import String List.
  Import ListNotations.
  
  Definition Observer := string -> string.
  
  Record Subject := {
    observers : list Observer;
    state : string
  }.
  
  Definition attach (sub : Subject) (obs : Observer) : Subject := {|
    observers := obs :: sub.(observers);
    state := sub.(state)
  |}.
  
  Fixpoint notifyAll (obsList : list Observer) (event : string) : list string :=
    match obsList with
    | [] => []
    | obs :: rest => obs event :: notifyAll rest event
    end.
    
  Definition setState (sub : Subject) (newState : string) : (Subject * list string) :=
    let updatedSub := {| observers := sub.(observers); state := newState |} in
    (updatedSub, notifyAll sub.(observers) newState).
    
  Definition watcher1 : Observer := fun ev => "Watcher1 saw: " ++ ev.
  Definition watcher2 : Observer := fun ev => "Watcher2 alerted by: " ++ ev.
tags: [observer, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
