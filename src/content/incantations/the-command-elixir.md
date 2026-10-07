---
title: Command
description: Encapsulate a request as an object, allowing logging, queuing, and undoing of spells.
type: elixir
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Will-Binding
formula: |
  defmodule Tekromancy.Command do
    @callback execute(map) :: map
    @callback undo(map) :: map
  end
  
  defmodule Tekromancy.HealCommand do
    @behaviour Tekromancy.Command
    def execute(state), do: %{state | hp: state.hp + 20}
    def undo(state), do: %{state | hp: state.hp - 20}
  end
  
  defmodule Tekromancy.Invoker do
    def run_commands(initial_state, commands) do
      Enum.reduce(commands, initial_state, fn cmd, state -> cmd.execute(state) end)
    end
  end
tags: [elixir, behavioral, command, state-machines, undo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By crystallizing an intent into a behaviour-bound module, the Command pattern decouples the invocation of a spell from its target. In a functional paradigm, commands operate on a state map, transforming it sequentially. This allows entire timelines of actions to be executed or reversed, altering the fate of the Hive.
