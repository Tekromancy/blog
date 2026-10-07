---
title: Singleton
description: Maintain a singular, omniscient presence within the telepathic network.
type: elixir
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Enchantment // Presence
formula: |
  defmodule Tekromancy.OmniMind do
    use GenServer
  
    # Client API
    def start_link(opts \\ []) do
      GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
    end
  
    def whisper(thought) do
      GenServer.cast(__MODULE__, {:whisper, thought})
    end
  
    def scry_thoughts do
      GenServer.call(__MODULE__, :scry)
    end
  
    # Server Callbacks
    @impl true
    def init(:ok) do
      {:ok, []}
    end
  
    @impl true
    def handle_cast({:whisper, thought}, state) do
      {:noreply, [thought | state]}
    end
  
    @impl true
    def handle_call(:scry, _from, state) do
      {:reply, state, state}
    end
  end
tags: [elixir, creational, singleton, genserver, omnimind]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

True Singletons in Elixir are manifestations of singular GenServers registered by name, acting as localized deities within the node. The `OmniMind` gathers whispers from across the Hive, maintaining a single source of truth—an ever-watchful eye in a sea of parallel actors.
