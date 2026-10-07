---
title: "The State: The Elemental Form"
description: "Allowing an object to alter its behavior when its internal state changes. The object will appear to change its class."
type: "crystal"
gofPattern: "State"
gofCategory: "Behavioral"
arcaneSchool: "Transmutation // Shapeshifting"
formula: |2
  class Elemental
    property state : ElementalState

    def initialize(@state : ElementalState)
    end

    def attack
      @state.attack(self)
    end

    def shift
      @state.shift(self)
    end
  end

  abstract class ElementalState
    abstract def attack(elemental : Elemental)
    abstract def shift(elemental : Elemental)
  end

  class FireForm < ElementalState
    def attack(elemental : Elemental)
      puts "The Elemental hurls a searing fireball!"
    end

    def shift(elemental : Elemental)
      puts "The fire cools, hardening into Earth."
      elemental.state = EarthForm.new
    end
  end

  class EarthForm < ElementalState
    def attack(elemental : Elemental)
      puts "The Elemental smashes the ground, causing a tremor."
    end

    def shift(elemental : Elemental)
      puts "The earth superheats, bursting into Fire."
      elemental.state = FireForm.new
    end
  end

  elemental = Elemental.new(FireForm.new)
  elemental.attack
  elemental.shift
  elemental.attack
tags: ["behavioral", "state", "crystal", "elemental-form"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An entity trapped in the Elemental Form constantly shifts its underlying structure. Instead of a colossal, tangled crystal of conditional logic, the State pattern encapsulates Fire and Earth into distinct classes, altering the creature's entire attack paradigm at runtime.
