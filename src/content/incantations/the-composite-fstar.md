---
title: The Composite of Ward Networks
description: Treating individual wards and networks of wards uniformly.
type: fstar
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  module Composite
  
  type ward_component =
    | LeafWard : power:nat -> ward_component
    | WardNode : left:ward_component -> right:ward_component -> ward_component
    
  let rec total_power (w: ward_component) : nat =
    match w with
    | LeafWard p -> p
    | WardNode l r -> total_power l + total_power r
tags: [composite, wards, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A unified recursive type for warding networks, easily reasoning over the total defensive power using F*'s structural induction.
