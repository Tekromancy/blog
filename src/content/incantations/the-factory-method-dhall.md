---
title: Factory Method in Dhall
description: Delegate the instantiation of runic unions to conditional creation logic.
type: dhall
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Portalmancy"
formula: |2
  let Transport = < Ship | Hovercraft | Portal >
  
  let createTransport =
        \(isWater : Bool) ->
        \(isMagical : Bool) ->
          if    isMagical
          then  Transport.Portal
          else  if isWater
          then  Transport.Ship
          else  Transport.Hovercraft
  
  in  createTransport False True
tags: [dhall, halting, runes, configuration, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Factory Method** in Dhall often utilizes unions to represent the different possibilities of a configuration. The factory itself is a deterministic, guaranteed-halting function that evaluates the world-state variables to return the precise variant required. This shields the broader configuration from complex logic blocks.
