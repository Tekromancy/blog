---
title: Chain of Responsibility
description: Pass telepathic decrees through a lineage of guardians until one handles it.
type: elixir
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Enchantment // Command-Routing
formula: |
  defmodule Tekromancy.RequestHandler do
    def handle_request(request, [handler | rest]) do
      case handler.(request) do
        {:handled, result} -> result
        :pass -> handle_request(request, rest)
      end
    end
    def handle_request(_request, []), do: "Request lost in the void."
  end
  
  # Usage
  # handlers = [
  #   fn req -> if req == :low, do: {:handled, "Acolyte handled it"}, else: :pass end,
  #   fn req -> if req == :high, do: {:handled, "Archmage handled it"}, else: :pass end
  # ]
  # Tekromancy.RequestHandler.handle_request(:high, handlers)
tags: [elixir, behavioral, chain-of-responsibility, routing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A whisper enters the telepathic network. Is it a mundane chore or a catastrophic breach? The Chain of Responsibility routes the command through a list of function handlers, each deciding whether to act or pass the burden up the hierarchy. Pattern matching makes evaluating these decisions elegantly precise.
