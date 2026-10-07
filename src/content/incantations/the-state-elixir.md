---
title: State
description: Alter an entity's behavior dynamically as its internal resonance shifts.
type: elixir
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Phase-Shifting
formula: |
  defmodule Tekromancy.PhaseEngine do
    @moduledoc "Implements a Finite State Machine using GenServer."
    use GenServer
    
    def start_link, do: GenServer.start_link(__MODULE__, :dormant)
    
    def trigger(pid), do: GenServer.cast(pid, :trigger)
    
    @impl true
    def handle_cast(:trigger, :dormant) do
      IO.puts("Awakening the core...")
      {:noreply, :active}
    end
    
    def handle_cast(:trigger, :active) do
      IO.puts("Core is overheating! Initiating lockdown...")
      {:noreply, :locked}
    end
    
    def handle_cast(:trigger, :locked) do
      IO.puts("Core locked. Requires manual override.")
      {:noreply, :locked}
    end
  end
tags: [elixir, behavioral, state, fsm, genserver]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An actor in Elixir is a living state machine. The State pattern is elegantly expressed by pattern-matching on the state variable in `handle_cast/2` or `handle_call/3`. As the internal state shifts from `:dormant` to `:active`, the identical `:trigger` command yields drastically different arcane phenomena.
