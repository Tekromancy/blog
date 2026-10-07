---
title: Observer
description: Establish a supernova early-warning array using the Observer pattern in Julia.
type: julia
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  # Observer in Julia: Supernova Early Warning System
  abstract type Observer end
  
  mutable struct StarMonitor
      observers::Vector{Observer}
      flux_level::Float64
  end
  StarMonitor() = StarMonitor(Observer[], 0.0)
  
  function attach!(monitor::StarMonitor, obs::Observer)
      push!(monitor.observers, obs)
  end
  
  function notify_observers(monitor::StarMonitor)
      for obs in monitor.observers
          update(obs, monitor.flux_level)
      end
  end
  
  function set_flux!(monitor::StarMonitor, level::Float64)
      monitor.flux_level = level
      notify_observers(monitor)
  end
  
  struct PlanetaryEvacuationSystem <: Observer end
  update(::PlanetaryEvacuationSystem, flux::Float64) = flux > 1000.0 ? println("Evacuating planets! Flux: ", flux) : nothing
  
  struct TelescopeArray <: Observer end
  update(::TelescopeArray, flux::Float64) = println("Telescopes recalibrating to flux: ", flux)
  
  # Usage
  monitor = StarMonitor()
  evac = PlanetaryEvacuationSystem()
  scopes = TelescopeArray()
  
  attach!(monitor, evac)
  attach!(monitor, scopes)
  
  set_flux!(monitor, 500.0)
  set_flux!(monitor, 1200.0)
tags: [behavioral, observer, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
