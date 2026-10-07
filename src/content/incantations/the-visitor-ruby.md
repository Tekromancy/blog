---
title: The Visitor
description: "A terrifying wraith that traverses a menagerie of familiars, extracting a different flavor of life force based on the creature's type."
type: ruby
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Extraction"
formula: |2
  class WraithVisitor
    def visit_bat(bat)
      "Extracting airborne agility from #{bat.name}."
    end

    def visit_wolf(wolf)
      "Extracting feral strength from #{wolf.name}."
    end
  end

  class FamiliarElement
    attr_reader :name
    def initialize(name)
      @name = name
    end

    def accept(visitor)
      raise NotImplementedError
    end
  end

  class BloodBat < FamiliarElement
    def accept(visitor)
      visitor.visit_bat(self)
    end
  end

  class DireWolf < FamiliarElement
    def accept(visitor)
      visitor.visit_wolf(self)
    end
  end

  # Usage:
  # elements = [BloodBat.new("Screech"), DireWolf.new("Fang")]
  # wraith = WraithVisitor.new
  # elements.each { |e| puts e.accept(wraith) }
tags: [ruby, design-pattern, visitor, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor pattern lets you separate algorithms from the objects on which they operate. The `WraithVisitor` encapsulates the dark logic of extraction, using double dispatch (`accept` calling `visit_*`) so that the wraith always applies the correct spell based on the familiar's exact class.
