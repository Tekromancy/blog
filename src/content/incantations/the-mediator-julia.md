---
title: Mediator
description: Coordinate interplanetary communications flawlessly with the Mediator pattern in Julia.
type: julia
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Sympathetic Links"
formula: |2
  # Mediator in Julia: Interplanetary Communication Hub
  abstract type SpaceAgency end
  abstract type Mediator end

  mutable struct CommRelay <: Mediator
      agencies::Vector{SpaceAgency}
      CommRelay() = new(SpaceAgency[])
  end

  mutable struct MartianColony <: SpaceAgency
      name::String
      mediator::Mediator
  end

  mutable struct LunarBase <: SpaceAgency
      name::String
      mediator::Mediator
  end

  function register!(relay::CommRelay, agency::SpaceAgency)
      push!(relay.agencies, agency)
  end

  function broadcast(relay::CommRelay, sender::SpaceAgency, message::String)
      for agency in relay.agencies
          if agency !== sender
              receive(agency, message)
          end
      end
  end

  send(agency::SpaceAgency, message::String) = broadcast(agency.mediator, agency, message)
  receive(agency::SpaceAgency, message::String) = println(agency.name, " received: ", message)

  # Usage
  relay = CommRelay()
  mars = MartianColony("Mars Alpha", relay)
  moon = LunarBase("Luna Prime", relay)

  register!(relay, mars)
  register!(relay, moon)

  send(mars, "We have discovered liquid water!")
tags: [behavioral, mediator, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
