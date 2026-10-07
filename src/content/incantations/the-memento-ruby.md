---
title: The Memento
description: "Capturing a snapshot of a dying hemomancer's soul, preserving their arcane state so it can be restored if a ritual fails."
type: ruby
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Chronomancy"
formula: |2
  class SoulMemento
    attr_reader :state

    def initialize(state)
      @state = Marshal.load(Marshal.dump(state))
    end
  end

  class Hemomancer
    attr_accessor :health, :mana, :curses_active

    def initialize
      @health = 100
      @mana = 100
      @curses_active = []
    end

    def save_soul
      SoulMemento.new({ health: @health, mana: @mana, curses: @curses_active })
    end

    def restore_soul(memento)
      @health = memento.state[:health]
      @mana = memento.state[:mana]
      @curses_active = memento.state[:curses]
      "Soul restored."
    end
  end
tags: [ruby, design-pattern, memento, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern captures and externalizes an object's internal state without violating encapsulation. The `SoulMemento` takes a deep snapshot of the hemomancer, allowing them to rewind time and recover from an explosive magical backlash.
