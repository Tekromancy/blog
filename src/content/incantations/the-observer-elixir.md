---
title: Observer
description: Subscribe to the telepathic broadcast of an Overmind and react instantly.
type: elixir
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Telepathic-Links
formula: |
  defmodule Tekromancy.Overmind do
    # Using Elixir's native Registry for PubSub
    def start_link, do: Registry.start_link(keys: :duplicate, name: HivePubSub)
    
    def subscribe(topic), do: Registry.register(HivePubSub, topic, [])
    
    def broadcast(topic, message) do
      Registry.dispatch(HivePubSub, topic, fn entries ->
        for {pid, _} <- entries, do: send(pid, {:broadcast, message})
      end)
    end
  end
tags: [elixir, behavioral, observer, pubsub, registry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the Overmind perceives a threat, all drones must instantly align. The Observer pattern is perfected through Elixir's `Registry` or tools like Phoenix PubSub. Drones subscribe to telepathic frequencies (topics), and when a broadcast erupts, they consume the message concurrently without locking the emitter.
