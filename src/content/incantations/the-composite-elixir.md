---
title: Composite
description: Treat individual daemons and swarms of daemons uniformly within the Hive tree.
type: elixir
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm-Logic"
formula: |2
  defmodule Tekromancy.HiveNode do
    @type t :: %{name: String.t(), power: integer(), children: [t()]}

    def build_leaf(name, power), do: %{name: name, power: power, children: []}

    def build_cluster(name, children) do
      total_power = Enum.reduce(children, 0, fn child, acc -> acc + child.power end)
      %{name: name, power: total_power, children: children}
    end

    def execute(%{children: []} = leaf) do
      IO.puts("Drone #{leaf.name} buzzing with #{leaf.power} power.")
    end

    def execute(%{children: children} = cluster) do
      IO.puts("Cluster #{cluster.name} synchronizing...")
      Enum.each(children, &execute/1)
    end
  end
tags: [elixir, structural, composite, recursion, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Hive does not differentiate between a solitary drone and an entire cluster when the Overmind issues a command. The Composite pattern, driven by recursive data structures and pattern matching in Elixir, allows tree-like hierarchies of entities to be manipulated as a single, terrifying collective.
