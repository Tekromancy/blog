---
title: Bridge
description: Decouple the arcane abstraction from its underlying cybernetic implementation.
type: elixir
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Conjuration // Nexus-Weaving
formula: |
  defmodule Tekromancy.CastingFocus do
    @callback channel(power :: integer) :: binary
  end
  
  defmodule Tekromancy.WandFocus do
    @behaviour Tekromancy.CastingFocus
    def channel(power), do: "Wand shoots a bolt of #{power} terawatts!"
  end
  
  defmodule Tekromancy.CyberJackFocus do
    @behaviour Tekromancy.CastingFocus
    def channel(power), do: "Neural jack injects #{power} exabytes of chaos."
  end
  
  defmodule Tekromancy.Spell do
    defstruct [:focus, :power]
    
    def cast(%__MODULE__{focus: focus, power: power}) do
      focus.channel(power)
    end
  end
tags: [elixir, structural, bridge, abstraction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge divides the intent (the Spell) from the conduit (the Focus). Whether a warlock uses an ancient wooden wand or a direct neural cyber-jack, the abstraction remains pure. In Elixir, this is elegantly achieved by composing structs with module references, leveraging behaviours to keep the telepathic channels distinct.
