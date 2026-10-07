---
title: Template Method
description: Standardize planetary terraforming alchemies with the Template Method pattern in Julia.
type: julia
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Genesis"
formula: |2
  # Template Method in Julia: Alchemical Planet Terraforming
  abstract type Terraformer end

  # The Template Method
  function terraform(t::Terraformer)
      analyze_atmosphere(t)
      deploy_microbes(t)
      ignite_core(t)
      println("Terraforming complete.")
  end

  # Default behaviors
  analyze_atmosphere(::Terraformer) = println("Analyzing ambient gases...")
  ignite_core(::Terraformer) = println("Core stabilization in progress...")

  # Concrete Implementations
  struct MarsTerraformer <: Terraformer end
  deploy_microbes(::MarsTerraformer) = println("Deploying extremophiles into polar ice caps...")

  struct VenusTerraformer <: Terraformer end
  deploy_microbes(::VenusTerraformer) = println("Releasing acid-eating bacteria into the clouds...")
  ignite_core(::VenusTerraformer) = println("Cooling the runaway greenhouse core...") # Override

  # Usage
  mars_project = MarsTerraformer()
  terraform(mars_project)

  venus_project = VenusTerraformer()
  terraform(venus_project)
tags: [behavioral, template-method, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
