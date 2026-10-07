---
title: Command
description: Encode orbital maneuver commands as structs with the Command pattern in Julia.
type: julia
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Kinetic Mandates
formula: |
  # Command in Julia: Celestial Orbital Maneuvers
  abstract type OrbitalCommand end
  
  struct Satellite
      name::String
      altitude::Base.RefValue{Float64}
  end
  
  struct BoostCommand <: OrbitalCommand
      satellite::Satellite
      delta_v::Float64
  end
  
  struct RetrogradeCommand <: OrbitalCommand
      satellite::Satellite
      delta_v::Float64
  end
  
  execute(cmd::BoostCommand) = cmd.satellite.altitude[] += cmd.delta_v * 10.0
  undo(cmd::BoostCommand) = cmd.satellite.altitude[] -= cmd.delta_v * 10.0
  
  execute(cmd::RetrogradeCommand) = cmd.satellite.altitude[] -= cmd.delta_v * 10.0
  undo(cmd::RetrogradeCommand) = cmd.satellite.altitude[] += cmd.delta_v * 10.0
  
  # Invoker
  mutable struct MissionControl
      history::Vector{OrbitalCommand}
      MissionControl() = new(OrbitalCommand[])
  end
  
  function execute_command!(mc::MissionControl, cmd::OrbitalCommand)
      execute(cmd)
      push!(mc.history, cmd)
  end
  
  function undo_last!(mc::MissionControl)
      if !isempty(mc.history)
          cmd = pop!(mc.history)
          undo(cmd)
      end
  end
  
  # Usage
  sat = Satellite("Voyager", Ref(400.0))
  mc = MissionControl()
  boost = BoostCommand(sat, 15.0)
  
  execute_command!(mc, boost)
  println("Altitude after boost: ", sat.altitude[])
  undo_last!(mc)
  println("Altitude after undo: ", sat.altitude[])
tags: [behavioral, command, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
