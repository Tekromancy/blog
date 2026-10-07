---
title: "The Iterator: Scrying the Array"
description: "Providing a way to access the elements of an aggregate object sequentially without exposing its underlying representation."
type: "crystal"
gofPattern: "Iterator"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Scrying"
formula: |2
  class SoulGem
    property power : Int32
    def initialize(@power : Int32)
    end
  end

  class GemVault
    include Enumerable(SoulGem)

    @gems = [] of SoulGem

    def add(gem : SoulGem)
      @gems << gem
    end

    # Crystal's built-in block-based iteration protocol
    def each(&block : SoulGem ->)
      # We iterate backwards just for magical flair
      idx = @gems.size - 1
      while idx >= 0
        yield @gems[idx]
        idx -= 1
      end
    end
  end

  vault = GemVault.new
  vault.add(SoulGem.new(10))
  vault.add(SoulGem.new(20))
  vault.add(SoulGem.new(30))

  puts "Scrying the vault from most recent to oldest:"
  vault.each do |gem|
    puts "SoulGem resonating at #{gem.power} power."
  end
tags: ["behavioral", "iterator", "crystal", "scrying"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Crystal's innate `Enumerable` module elegantly channels the Iterator pattern via blocks. Scrying the Array conceals whether the underlying GemVault uses a contiguous array or a linked ether-chain; the mage simply yields the gems sequentially, untouched by structural implementation details.
