---
title: Memento
description: Capture and externalize an actor's internal state to restore it from doom.
type: elixir
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // State-Preservation
formula: |
  defmodule Tekromancy.TimeWeaver do
    def save_state(state_map), do: :erlang.term_to_binary(state_map)
    
    def restore_state(binary_memento), do: :erlang.binary_to_term(binary_memento)
  end
  
  # Usage inside an actor before a risky computation
  # memento = Tekromancy.TimeWeaver.save_state(current_state)
  # # If crash occurs, a supervisor can reboot and we inject the memento to restore
tags: [elixir, behavioral, memento, serialization, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Death is merely a transition in Elixir’s actor model. A Supervisor resurrects a fallen process, but what of its memories? The Memento pattern captures a GenServer's state, serializing it into an immutable crystal (`binary`). Upon rebirth, the TimeWeaver shatters the crystal, restoring the actor exactly as it was.
