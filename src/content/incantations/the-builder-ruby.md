---
title: The Builder
description: "A ritualistic assembly line for crafting intricate, flesh-grafted golems step by gruesome step."
type: ruby
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Fleshcrafting
formula: |
  class Golem
    attr_accessor :flesh, :bones, :blood, :animus

    def initialize
      @flesh = nil
      @bones = nil
      @blood = nil
      @animus = nil
    end

    def status
      "Golem composed of #{bones || 'no'} bones, #{flesh || 'no'} flesh, coursing with #{blood || 'no'} blood, driven by #{animus || 'no'} animus."
    end
  end

  class FleshCrafterBuilder
    def initialize
      reset
    end

    def reset
      @golem = Golem.new
    end

    def graft_bones(type)
      @golem.bones = "#{type} osteo-structure"
    end

    def stitch_flesh(type)
      @golem.flesh = "#{type} muscle fibers"
    end

    def infuse_blood(type)
      @golem.blood = "#{type} vitae"
    end

    def bind_animus(soul)
      @golem.animus = soul
    end

    def awaken
      result = @golem
      reset
      result
    end
  end

  class NecromancerDirector
    def initialize(builder)
      @builder = builder
    end

    def construct_abomination
      @builder.graft_bones("obsidian")
      @builder.stitch_flesh("manticore")
      @builder.infuse_blood("demon")
      @builder.bind_animus("wrathful spirit")
      @builder.awaken
    end
  end
tags: [ruby, design-pattern, builder, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When simple invocation fails, the Builder pattern provides a meticulous methodology for assembling complex monstrosities. The Director orchestrates the ritual, while the Builder precisely grafts bones, stitches flesh, and infuses corrupted vitae into a cohesive, terror-inducing whole.
