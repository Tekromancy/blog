---
title: Prototype
description: Clone existing cyber-souls to populate the Hive rapidly.
type: elixir
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Cloning"
formula: |2
  defmodule Tekromancy.SoulMatrix do
    defstruct id: nil, memories: [], resonance: 0.0

    def clone(%__MODULE__{} = matrix, new_id) do
      # In Elixir, cloning is as simple as struct updates.
      # The immutable nature of the realm makes cloning costless and pure.
      %{matrix | id: new_id}
    end

    def weave_memory(%__MODULE__{} = matrix, memory) do
      %{matrix | memories: [memory | matrix.memories]}
    end
  end
tags: [elixir, creational, prototype, mutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why conjure anew when you can fracture a soul into a thousand reflections? In the immutable world of Elixir, the Prototype pattern is inherently woven into the fabric of the language. Struct updates serve as the perfect cloning mechanism, replicating cyber-souls without the taint of shared memory corruption.
