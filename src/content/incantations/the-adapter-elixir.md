---
title: Adapter
description: Bridge incompatible telepathic protocols to forge unexpected alliances.
type: elixir
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Alteration // Protocol-Shifting
formula: |
  defmodule Tekromancy.OldGodsProtocol do
    def chant(words), do: "Ph'nglui mglw'nafh #{words}"
  end
  
  defmodule Tekromancy.NeonSyndicateProtocol do
    @callback broadcast(binary) :: :ok
  end
  
  defmodule Tekromancy.ProtocolAdapter do
    @behaviour Tekromancy.NeonSyndicateProtocol
    
    def broadcast(message) do
      # Adapting the ancient chants into a neon broadcast
      chant = Tekromancy.OldGodsProtocol.chant(message)
      IO.puts("[NEON-BCAST] Anomalous signal: #{chant}")
      :ok
    end
  end
tags: [elixir, structural, adapter, protocols]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the ancient horrors of the legacy codebase must communicate with the sleek GenServers of the Neon Syndicate, the Adapter translates their eldritch chants. It wraps the Old Gods' invocations in modern Behaviours, allowing smooth integration into the Hive's supervised structure without shattering minds.
