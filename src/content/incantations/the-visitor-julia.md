---
title: Visitor
description: Deploy diverse cosmic scanners across deep space anomalies with the Visitor pattern in Julia.
type: julia
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Cosmic Probing"
formula: |2
  # Visitor in Julia: Cosmic Entity Scanners
  abstract type CosmicBody end

  struct Pulsar <: CosmicBody
      pulse_rate::Float64
  end

  struct Quasar <: CosmicBody
      luminosity::Float64
  end

  abstract type CosmicVisitor end

  struct EnergyScanner <: CosmicVisitor end
  visit(::EnergyScanner, p::Pulsar) = println("Scanning Pulsar: Energy output corresponds to pulse rate ", p.pulse_rate)
  visit(::EnergyScanner, q::Quasar) = println("Scanning Quasar: Immense luminosity of ", q.luminosity)

  struct MassEstimator <: CosmicVisitor end
  visit(::MassEstimator, p::Pulsar) = println("Estimating Pulsar mass: Dense neutron degenerate matter.")
  visit(::MassEstimator, q::Quasar) = println("Estimating Quasar mass: Supermassive black hole core.")

  # The Accept method isn't strictly necessary in Julia due to Multiple Dispatch.
  # We can just use `visit(visitor, body)`. 
  # However, to simulate double dispatch cleanly:
  accept(body::CosmicBody, visitor::CosmicVisitor) = visit(visitor, body)

  # Usage
  bodies = [Pulsar(1.33), Quasar(1e12)]
  scanner = EnergyScanner()
  estimator = MassEstimator()

  for body in bodies
      accept(body, scanner)
      accept(body, estimator)
  end
tags: [behavioral, visitor, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
