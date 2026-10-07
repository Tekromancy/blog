---
title: The Observer of the Scrying Orb
description: Notifying bound disciples when the orb reveals a new vision.
type: fstar
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  module Observer
  
  type event = string
  type observer = event -> string
  
  type subject = {
    observers: list observer;
  }
  
  let notify_all (sub: subject) (e: event) : list string =
    let rec map_obs obs =
      match obs with
      | [] -> []
      | h :: t -> h e :: map_obs t
    in map_obs sub.observers
tags: [observer, events, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A purely functional approach to the Observer pattern, mapping an event stream over a list of scrying functions.
