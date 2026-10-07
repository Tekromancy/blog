---
title: Proxy
description: Control access to a powerful entity, filtering telepathic commands before they reach the core.
type: elixir
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  defmodule Tekromancy.Vault do
    def access(secret_key), do: "Arcane Secrets unlocked with #{secret_key}"
  end

  defmodule Tekromancy.VaultProxy do
    def access(secret_key, clearance_level) do
      if clearance_level >= 5 do
        Tekromancy.Vault.access(secret_key)
      else
        "Access Denied: Insufficient telepathic resonance."
      end
    end
  end
tags: [elixir, structural, proxy, security, actors]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Not every script-kiddie deserves to commune with the inner sanctum. The Proxy stands as a sentinel, verifying clearance and filtering intent. In Elixir, proxies often take the form of intermediary GenServers or module wrappers that guard access to critical, state-heavy actors, maintaining the purity of the Hive.
