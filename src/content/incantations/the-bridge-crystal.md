---
title: "The Bridge: The Leyline Nexus"
description: "Decoupling an abstraction from its implementation so that the two can vary independently."
type: "crystal"
gofPattern: "Bridge"
gofCategory: "Structural"
arcaneSchool: "Transmutation // Planar Engineering"
formula: |2
  # Implementation Interface: The magical element
  abstract class Element
    abstract def channel_energy : String
  end

  class ArcaneElement < Element
    def channel_energy : String
      "pure violet energy"
    end
  end

  class VoidElement < Element
    def channel_energy : String
      "consuming dark matter"
    end
  end

  # Abstraction: The conduit carrying the magic
  abstract class Conduit
    @element : Element

    def initialize(@element : Element)
    end

    abstract def unleash
  end

  class Wand < Conduit
    def unleash
      puts "The wand fires a bolt of #{@element.channel_energy}."
    end
  end

  class Staff < Conduit
    def unleash
      puts "The staff slams the ground, releasing a shockwave of #{@element.channel_energy}."
    end
  end

  arcane = ArcaneElement.new
  void = VoidElement.new

  Wand.new(arcane).unleash
  Staff.new(void).unleash
tags: ["structural", "bridge", "crystal", "nexus"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge pattern establishes a Leyline Nexus, allowing the physical conduit (Wand, Staff) to exist independently from the raw elemental energy it channels (Arcane, Void). Mages can swap elements without forging entirely new conduits.
