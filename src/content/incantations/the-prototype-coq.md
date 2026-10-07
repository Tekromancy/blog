---
title: The Prototype
description: Cloning Gallina Wards by deep structural mirroring, bypassing the cost of planar summoning.
type: coq
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Shadowcasting"
formula: |2
  (* Gallina Ward: Prototype *)
  Require Import String.
  
  Record Construct := mkConstruct {
    id : nat;
    schematic : string;
    integrity : nat
  }.
  
  (* In purely functional Gallina, cloning is simply copying the record,
     optionally mutating specific fields. *)
  Definition clone (c : Construct) (newId : nat) : Construct :=
    {| id := newId;
       schematic := c.(schematic);
       integrity := c.(integrity) |}.
       
  Definition alphaWard : Construct := mkConstruct 1 "Aegis" 100.
  Definition betaWard : Construct := clone alphaWard 2.
tags: [prototype, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
