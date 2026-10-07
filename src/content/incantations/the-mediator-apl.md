---
title: The Mediator
description: Coordinate alien drone swarms without tight neural coupling.
type: apl
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Neural-Routing"
formula: |2
  :Class SwarmMediator
      :Field Public Drones ← ⍬

      ∇ Register Drone
        :Access Public
        Drones ← Drones , Drone
        Drone.SetMediator ⎕THIS
      ∇

      ∇ Broadcast (Sender Message)
        :Access Public
        { (⍵≢Sender) : ⍵.Receive Message } ¨ Drones
      ∇
  :EndClass

  :Class Drone
      :Field Private Mediator ← ⍬
      :Field Public ID

      ∇ Make I
        :Access Public
        :Implements Constructor
        ID ← I
      ∇

      ∇ SetMediator M
        :Access Public
        Mediator ← M
      ∇

      ∇ Send Message
        :Access Public
        Mediator.Broadcast ⎕THIS Message
      ∇

      ∇ Receive Message
        :Access Public
        ⎕ ← 'Drone ', ⍕ID, ' received: ', Message, ' ⍫'
      ∇
  :EndClass
tags: [apl, behavioral, alien, mediator, drone-swarm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In a vast alien swarm, direct neural links between all drones result in an N-squared matrix of chaotic resonance. The Mediator acts as the central Overmind relay. When a drone detects an anomaly (`⍫`), it sends the signal directly to the Mediator, which then iterates over the collective (`{ (⍵≢Sender) : ⍵.Receive Message } ¨ Drones`), rebroadcasting the pulse without tangling the swarm's psychic topology.
