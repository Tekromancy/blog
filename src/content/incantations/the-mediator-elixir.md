---
title: Mediator
description: Centralize complex communication among actors to prevent a chaotic web of dependencies.
type: elixir
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Illusion // Nexus-Control"
formula: |2
  defmodule Tekromancy.HiveNexus do
    use GenServer

    def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: :nexus)

    def register(name, pid), do: GenServer.cast(:nexus, {:register, name, pid})

    def route_message(to_name, msg), do: GenServer.cast(:nexus, {:route, to_name, msg})

    @impl true
    def handle_cast({:register, name, pid}, state) do
      {:noreply, Map.put(state, name, pid)}
    end

    def handle_cast({:route, to_name, msg}, state) do
      if pid = state[to_name] do
        send(pid, {:nexus_msg, msg})
      end
      {:noreply, state}
    end
  end
tags: [elixir, behavioral, mediator, genserver, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than drones maintaining direct telepathic links with every other drone—creating an uncontrollable web of noise—the Mediator acts as the central router. The `HiveNexus` registers all actors and facilitates their communion. It untangles the chaotic communication mesh into an organized, star-shaped topology.
