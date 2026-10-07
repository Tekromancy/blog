---
title: Template Method
description: Define the skeleton of a ritual, letting subordinate sects fill in the specific incantations.
type: elixir
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual-Frameworks"
formula: |2
  defmodule Tekromancy.Ritual do
    @callback gather_components() :: list()
    @callback chant(list()) :: binary()

    defmacro __using__(_opts) do
      quote do
        @behaviour Tekromancy.Ritual

        def perform_ritual do
          components = gather_components()
          IO.puts("Preparing components: #{inspect(components)}")
          final_spell = chant(components)
          IO.puts("Unleashing: #{final_spell}")
        end
      end
    end
  end

  defmodule Tekromancy.VoidRitual do
    use Tekromancy.Ritual

    def gather_components, do: [:dark_matter, :stardust]
    def chant(_), do: "Embrace the eternal silence!"
  end
tags: [elixir, behavioral, template-method, macros, behaviours]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method establishes the unalterable laws of a magical ritual, defining the sequence of execution. By utilizing Elixir's `use` macro combined with Behaviours, a base module injects the skeleton (`perform_ritual/0`) into the caller, forcing the child modules to define only the specific nuances of their sect.
