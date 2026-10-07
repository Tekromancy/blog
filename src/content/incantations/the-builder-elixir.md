---
title: Builder
description: Forge complex mental constructs step-by-step through ritualistic stages.
type: elixir
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Construct-Weaving
formula: |
  defmodule Tekromancy.Golem do
    defstruct head: nil, core: nil, limbs: []
  end
  
  defmodule Tekromancy.GolemBuilder do
    alias Tekromancy.Golem
  
    def new, do: %Golem{}
  
    def bind_core(golem, core_type) do
      %{golem | core: core_type}
    end
  
    def attach_head(golem, head_type) do
      %{golem | head: head_type}
    end
  
    def augment_limb(golem, limb) do
      %{golem | limbs: [limb | golem.limbs]}
    end
    
    def awaken(golem) do
      # Initiate actor process for the Golem
      Task.start(fn -> loop(golem) end)
    end
    
    defp loop(state) do
      receive do
        :pulse -> IO.puts("Golem core #{state.core} pulses with arcane energy.")
      end
      loop(state)
    end
  end
tags: [elixir, creational, builder, pipelines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the assembly of a cyber-golem requires precise telepathic calibration, the Builder steps in. Using Elixir's pipe operator `|>`, the ritual flows effortlessly from one stage to the next, weaving raw ether into a sentient actor ready to join the Supervisor's web.
