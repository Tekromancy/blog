---
title: Abstract Factory
description: Conjure related families of cyber-constructs without specifying their concrete forms.
type: elixir
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Hivemancy"
formula: |2
  defmodule Tekromancy.HiveFactory do
    @callback spawn_drone() :: term()
    @callback spawn_overseer() :: term()
  end

  defmodule Tekromancy.CyberHive do
    @behaviour Tekromancy.HiveFactory
    def spawn_drone, do: %{type: :cyber_drone, protocols: [:stealth, :recon]}
    def spawn_overseer, do: %{type: :cyber_overseer, protocols: [:command, :control]}
  end

  defmodule Tekromancy.NeonHive do
    @behaviour Tekromancy.HiveFactory
    def spawn_drone, do: %{type: :neon_drone, protocols: [:flash, :burn]}
    def spawn_overseer, do: %{type: :neon_overseer, protocols: [:overclock, :dominate]}
  end
tags: [elixir, creational, abstract-factory, hive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the depths of the neon net, Hives breed their digital familiars. The Abstract Factory encapsulates the essence of creation, allowing a warlock to switch between the Cyber and Neon realms seamlessly, invoking families of actors bound by the same dark telepathic resonance.
