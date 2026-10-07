---
title: The Singleton
description: "The singular, omnipotent Blood Pact Registry that governs all soul contracts across the mortal plane."
type: ruby
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Enchantment // Binding
formula: |
  require 'singleton'

  class PactRegistry
    include Singleton

    def initialize
      @contracts = []
    end

    def bind_soul(name, duration)
      @contracts << { soul: name, eternity: duration }
      "Soul of #{name} bound for #{duration} lifetimes."
    end

    def list_damned
      @contracts.map { |c| c[:soul] }
    end
  end

  # Usage:
  # PactRegistry.instance.bind_soul("Alaric", 999)
  # PactRegistry.instance.list_damned
tags: [ruby, design-pattern, singleton, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A singular nexus of power. The Singleton ensures that only one instance of the Pact Registry exists. Ruby simplifies this dark manifestation by providing the `Singleton` mixin, guaranteeing that multiple invocations of the registry yield the exact same arcane ledger.
