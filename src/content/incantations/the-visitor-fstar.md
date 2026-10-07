---
title: The Visitor of the Astral Plane
description: Performing new operations on a hierarchy of astral entities without altering their structures.
type: fstar
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Astral Travel"
formula: |2
  module Visitor
  
  type astral_entity =
    | Spirit : name:string -> astral_entity
    | Poltergeist : anger:nat -> astral_entity
    
  type visitor 'a = {
    visit_spirit : string -> 'a;
    visit_poltergeist : nat -> 'a;
  }
  
  let accept (e: astral_entity) (v: visitor 'a) : 'a =
    match e with
    | Spirit n -> v.visit_spirit n
    | Poltergeist a -> v.visit_poltergeist a
tags: [visitor, double-dispatch, entities]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

A generic Visitor interface leveraging pattern matching to deeply inspect and interact with the varied entities of the Astral Plane.
