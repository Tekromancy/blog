---
title: The Prototype
description: "Duplicating esoteric artifacts by spilling a drop of blood upon a sacred matrix, cloning its essence without re-forging."
type: ruby
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Cloning"
formula: |2
  class ArcaneArtifact
    attr_accessor :name, :curse_level, :essence

    def initialize(name, curse_level, essence)
      @name = name
      @curse_level = curse_level
      @essence = essence
    end

    def clone
      # Deep copying the essence through marshaling is a common dark Ruby art
      deep_essence = Marshal.load(Marshal.dump(@essence))
      ArcaneArtifact.new(@name.dup, @curse_level, deep_essence)
    end
  end

  # Usage
  # original_dagger = ArcaneArtifact.new("Sacrificial Dirk", 5, { souls_trapped: 12 })
  # cloned_dagger = original_dagger.clone
  # cloned_dagger.essence[:souls_trapped] = 0
  # original dagger's souls remain undisturbed.
tags: [ruby, design-pattern, prototype, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Prototype allows a hemomancer to copy an existing, complex spell matrix without the overhead of reconstructing it from base components. Ruby's dynamic nature makes shallow and deep cloning (via `Marshal`) a natural fit for replicating cursed artifacts perfectly.
