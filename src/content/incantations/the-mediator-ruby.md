---
title: The Mediator
description: "A blood-pact broker that controls communication between warring demon factions, preventing apocalyptic direct interactions."
type: ruby
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  class PactBroker
    def initialize
      @factions = {}
    end

    def register(faction)
      @factions[faction.name] = faction
      faction.broker = self
    end

    def transmit_curse(sender, target_name, curse)
      if @factions[target_name]
        @factions[target_name].receive_curse(sender.name, curse)
      end
    end
  end

  class DemonFaction
    attr_accessor :broker
    attr_reader :name

    def initialize(name)
      @name = name
    end

    def send_curse(target_name, curse)
      @broker.transmit_curse(self, target_name, curse)
    end

    def receive_curse(sender_name, curse)
      "#{name} received #{curse} from #{sender_name}."
    end
  end
tags: [ruby, design-pattern, mediator, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator restricts direct communications between objects and forces them to collaborate only via a central broker. Thus, the chaotic Demon Factions avoid direct dependencies on one another, relying instead on the `PactBroker` to transmit their hexes safely.
