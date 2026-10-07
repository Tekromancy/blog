---
title: "The Adapter: The Rosetta Prisms"
description: "Converting the interface of a class into another interface clients expect."
type: "crystal"
gofPattern: "Adapter"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Linguistic Weaving"
formula: |2
  # The Target interface the Mage understands
  abstract class SpellTome
    abstract def read_chant : String
  end

  # An ancient, incompatible scroll
  class AncientScroll
    def decipher_hieroglyphs : String
      "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn"
    end
  end

  # The Adapter that acts as a Prism
  class ScrollToTomeAdapter < SpellTome
    @scroll : AncientScroll

    def initialize(@scroll : AncientScroll)
    end

    def read_chant : String
      raw_text = @scroll.decipher_hieroglyphs
      # Translating the ancient text into a modern chant
      "Translated Chant: Oh great sleeper, awaken!"
    end
  end

  # The Mage expects a SpellTome
  def cast_from_tome(tome : SpellTome)
    puts "Mage chants: #{tome.read_chant}"
  end

  ancient_scroll = AncientScroll.new
  # The mage cannot read it directly, so we use an adapter
  adapter = ScrollToTomeAdapter.new(ancient_scroll)
  cast_from_tome(adapter)
tags: ["structural", "adapter", "crystal", "prisms"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Ancient magics often speak in dialects the modern compiler cannot comprehend. The Adapter acts as a Rosetta Prism, transmuting the incompatible signatures of old scrolls into the elegant, type-safe interfaces expected by contemporary mages.
