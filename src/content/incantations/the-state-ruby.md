---
title: The State
description: "A cursed lycanthrope whose behavior fundamentally shifts depending on the phase of the blood moon."
type: ruby
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Shapeshifting
formula: |
  class HumanState
    def attack
      "Punches weakly."
    end
  end

  class WolfState
    def attack
      "Tears out your throat with fangs!"
    end
  end

  class Lycanthrope
    attr_accessor :state

    def initialize
      @state = HumanState.new
    end

    def look_at_moon(is_full)
      @state = is_full ? WolfState.new : HumanState.new
    end

    def strike
      @state.attack
    end
  end
tags: [ruby, design-pattern, state, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows an object to alter its behavior when its internal state changes. The Lycanthrope delegates its `attack` method to its current state object, seamlessly transmuting from a frail human to a bloodthirsty beast.
