---
title: The Iterator
description: "Traversing the infinite crypts of fallen thralls without exposing the horrifying internal structure of the catacombs."
type: ruby
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Necromancy // Traversal
formula: |
  class ThrallCrypt
    include Enumerable

    def initialize
      @coffins = []
    end

    def add_thrall(name)
      @coffins << name
    end

    def each(&block)
      @coffins.each(&block)
    end
  end

  # Usage:
  # crypt = ThrallCrypt.new
  # crypt.add_thrall("Bob the Bleeder")
  # crypt.add_thrall("Alice the Anemic")
  # crypt.map { |thrall| "Arise, #{thrall}!" }
tags: [ruby, design-pattern, iterator, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator provides a way to access elements of an aggregate object sequentially. In Ruby, including the `Enumerable` module and defining an `each` method instantly grants the `ThrallCrypt` the full power of Ruby's functional iteration tools (map, select, reject).
