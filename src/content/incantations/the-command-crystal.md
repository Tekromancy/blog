---
title: "The Command: The Glyphic Inscriptions"
description: "Encapsulating a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."
type: "crystal"
gofPattern: "Command"
gofCategory: "Behavioral"
arcaneSchool: "Enchantment // Runesmithing"
formula: |2
  # Receiver
  class Golem
    def wake
      puts "The Golem's eyes glow red. It awakens."
    end
    def sleep
      puts "The Golem returns to inert stone."
    end
  end

  # Command Interface
  abstract class RuneCommand
    abstract def execute
    abstract def undo
  end

  # Concrete Commands
  class AwakenRune < RuneCommand
    @golem : Golem

    def initialize(@golem : Golem)
    end

    def execute
      @golem.wake
    end

    def undo
      @golem.sleep
    end
  end

  # Invoker
  class MageStaff
    @history = [] of RuneCommand

    def cast(rune : RuneCommand)
      rune.execute
      @history << rune
    end

    def reverse_last
      if @history.empty?
        puts "No magic left to undo."
      else
        rune = @history.pop
        rune.undo
      end
    end
  end

  golem = Golem.new
  awaken = AwakenRune.new(golem)

  staff = MageStaff.new
  staff.cast(awaken)

  puts ">> The mage realizes his mistake."
  staff.reverse_last
tags: ["behavioral", "command", "crystal", "runes"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Casting a spell directly onto a target is permanent and rigid. By inscribing the magic into a RuneCommand, the MageStaff can delay the cast, queue it, or critically, channel reverse temporal flow to `undo` the exact invocation that woke the stone golem.
