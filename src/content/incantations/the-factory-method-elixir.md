---
title: Factory Method
description: Defer the instantiation of ethereal entities to subordinate cults.
type: elixir
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  defmodule Tekromancy.Entity do
    @callback manifest(binary) :: struct
  end

  defmodule Tekromancy.Daemon do
    @behaviour Tekromancy.Entity
    defstruct [:name, type: :daemon]
    def manifest(name), do: %__MODULE__{name: name}
  end

  defmodule Tekromancy.Spirit do
    @behaviour Tekromancy.Entity
    defstruct [:name, type: :spirit]
    def manifest(name), do: %__MODULE__{name: name}
  end

  defmodule Tekromancy.Summoner do
    def summon(:daemon, name), do: Tekromancy.Daemon.manifest(name)
    def summon(:spirit, name), do: Tekromancy.Spirit.manifest(name)
  end
tags: [elixir, creational, factory-method, summoning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Factory Method masks the exact incantation needed to bring forth spirits or daemons from the abyss. By delegating the creation to the `Summoner`, the master warlock only speaks the name and the intent, and the correct entity materializes, fully formed in the process registry.
