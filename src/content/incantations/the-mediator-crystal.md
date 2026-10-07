---
title: "The Mediator: The Crystal Ball"
description: "Defining an object that encapsulates how a set of objects interact, keeping them from referring to each other explicitly."
type: "crystal"
gofPattern: "Mediator"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Telepathy"
formula: |2
  abstract class Mediator
    abstract def notify(sender : Mage, event : String)
  end

  class Mage
    property name : String
    property mediator : Mediator?

    def initialize(@name : String, @mediator : Mediator? = nil)
    end

    def send_message(msg : String)
      puts "#{@name} sends: '#{msg}'"
      @mediator.try &.notify(self, msg)
    end

    def receive(msg : String)
      puts "#{@name} receives a whisper: '#{msg}'"
    end
  end

  class CovenTelepathy < Mediator
    property mages = [] of Mage

    def register(mage : Mage)
      @mages << mage
      mage.mediator = self
    end

    def notify(sender : Mage, event : String)
      @mages.each do |mage|
        if mage != sender
          mage.receive(event)
        end
      end
    end
  end

  crystal_ball = CovenTelepathy.new

  alice = Mage.new("Alice")
  bob = Mage.new("Bob")

  crystal_ball.register(alice)
  crystal_ball.register(bob)

  alice.send_message("The moon is full. Begin the ritual.")
tags: ["behavioral", "mediator", "crystal", "telepathy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In a grand coven, mages screaming incantations at one another creates chaotic tight-coupling. The Crystal Ball acts as a Mediator—all thoughts are channeled into the psychic center, which then relays the whispers to the collective.
