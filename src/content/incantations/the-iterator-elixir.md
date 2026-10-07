---
title: Iterator
description: Traverse the vastness of the Hive mind's memory banks without exposing its structure.
type: elixir
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  defmodule Tekromancy.MemoryBank do
    def new(memories), do: memories

    def walk(bank) do
      Stream.map(bank, fn mem -> "[DECRYPTED]: #{mem}" end)
    end
  end

  # Usage
  # bank = Tekromancy.MemoryBank.new(["Cyber-War 2099", "First Contact"])
  # Tekromancy.MemoryBank.walk(bank) |> Enum.each(&IO.puts/1)
tags: [elixir, behavioral, iterator, streams, enums]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The `Enum` and `Stream` modules in Elixir render classical OOP iterators obsolete. By leveraging Streams for lazy evaluation, a warlock can traverse infinite arrays of psychic static or decrypt petabytes of lore without blowing the heap, mapping thoughts in a purely functional pipeline.
