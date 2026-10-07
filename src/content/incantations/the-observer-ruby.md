---
title: The Observer
description: "A dark scrying pool that notifies bound familiars the instant their master spills fresh blood."
type: ruby
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Sympathy
formula: |
  require 'observer'

  class MasterHemomancer
    include Observable

    attr_reader :name

    def initialize(name)
      @name = name
    end

    def cast_blood_spell
      changed
      notify_observers(self, "blood was spilled")
    end
  end

  class FamiliarWatcher
    def initialize(name)
      @name = name
    end

    def update(master, event)
      puts "#{@name} hisses: My master #{master.name} signals that #{event}!"
    end
  end

  # Usage:
  # master = MasterHemomancer.new("Dracula")
  # bat = FamiliarWatcher.new("Nightwing")
  # master.add_observer(bat)
  # master.cast_blood_spell
tags: [ruby, design-pattern, observer, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer pattern defines a one-to-many dependency so that when one object changes state, all its dependents are notified. Ruby's built-in `Observable` module makes it trivial for familiars to listen to the dark emanations of their `MasterHemomancer`.
