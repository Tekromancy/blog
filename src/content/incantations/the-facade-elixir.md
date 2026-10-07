---
title: Facade
description: Provide a unified, simplified interface to a labyrinthine subsystem of actors.
type: elixir
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplicity"
formula: |2
  defmodule Tekromancy.Core.Shields, do: def raise, do: :shields_up
  defmodule Tekromancy.Core.Engines, do: def ignite, do: :engines_hot
  defmodule Tekromancy.Core.Weapons, do: def arm, do: :weapons_hot

  defmodule Tekromancy.ShipFacade do
    alias Tekromancy.Core.{Shields, Engines, Weapons}

    def combat_ready do
      [
        Shields.raise(),
        Engines.ignite(),
        Weapons.arm()
      ]
    end
  end
tags: [elixir, structural, facade, api, subsystems]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Behind the veil lies a chaotic swarm of GenServers handling shields, hyper-drives, and arcane weaponry. The Facade stands before this madness, offering a single, elegant function `combat_ready/0`. The warlock need not understand the intricate dance of the actors—only the intent to strike.
