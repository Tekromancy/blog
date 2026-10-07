---
title: Flyweight
description: Minimize memory consumption by sharing common etheric patterns among thousands of drones.
type: elixir
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Illusion // Optimization"
formula: |2
  defmodule Tekromancy.DroneModel do
    # The Flyweight: shared intrinsic state
    defstruct [:mesh, :texture, :base_stats]

    def new(mesh, texture) do
      %__MODULE__{mesh: mesh, texture: texture, base_stats: %{hp: 100, speed: 50}}
    end
  end

  defmodule Tekromancy.DroneInstance do
    # Extrinsic state: unique to each drone
    defstruct [:id, :position, :model]

    def spawn(id, {x, y}, %Tekromancy.DroneModel{} = model) do
      %__MODULE__{id: id, position: {x, y}, model: model}
    end
  end
tags: [elixir, structural, flyweight, memory, structs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the Hive spawns a million drones, keeping an identical copy of their 3D cyber-mesh in memory would crash the BEAM. The Flyweight isolates the shared, immutable core—the `DroneModel`—and references it across countless `DroneInstance` structs, maximizing efficiency and preventing psychic overload.
