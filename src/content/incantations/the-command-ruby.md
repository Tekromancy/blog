---
title: The Command
description: "Encapsulating a blood sacrifice as an invocable command, ready to be executed, delayed, or reversed."
type: ruby
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Compulsion
formula: |
  class BloodSacrificeCommand
    def initialize(victim, liters)
      @victim = victim
      @liters = liters
    end

    def execute
      "Draining #{@liters} liters from #{@victim}."
    end

    def undo
      "Transfusing #{@liters} liters back into #{@victim} (if they still live)."
    end
  end

  class RitualInvoker
    def initialize
      @history = []
    end

    def cast(command)
      @history << command
      command.execute
    end

    def reverse_last
      command = @history.pop
      command ? command.undo : "No rituals to reverse."
    end
  end
tags: [ruby, design-pattern, command, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern turns a request into a stand-alone object. This allows a ritual invoker to queue up sacrifices, delay their execution until the moon is right, or even undo them if the demonic entity is displeased.
