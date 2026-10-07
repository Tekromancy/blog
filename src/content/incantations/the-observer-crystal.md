---
title: "The Observer: The Blood Pact"
description: "Defining a one-to-many dependency between objects so that when one object changes state, all its dependents are notified."
type: "crystal"
gofPattern: "Observer"
gofCategory: "Behavioral"
arcaneSchool: "Necromancy // Blood Bonds"
formula: |2
  abstract class Familiar
    abstract def react(master_health : Int32)
  end

  class Raven < Familiar
    def react(master_health : Int32)
      if master_health < 50
        puts "The Raven caws frantically!"
      else
        puts "The Raven preens its feathers."
      end
    end
  end

  class ShadowWolf < Familiar
    def react(master_health : Int32)
      if master_health < 20
        puts "The Shadow Wolf howls and prepares to defend!"
      end
    end
  end

  class BloodMage
    @health : Int32 = 100
    @familiars = [] of Familiar

    def bind_familiar(familiar : Familiar)
      @familiars << familiar
    end

    def take_damage(amount : Int32)
      @health -= amount
      puts "Blood Mage takes #{amount} damage. Health is now #{@health}."
      notify_familiars
    end

    private def notify_familiars
      @familiars.each &.react(@health)
    end
  end

  mage = BloodMage.new
  mage.bind_familiar(Raven.new)
  mage.bind_familiar(ShadowWolf.new)

  mage.take_damage(40)
  puts "---"
  mage.take_damage(45)
tags: ["behavioral", "observer", "crystal", "blood-pact"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Through a Blood Pact, a master mage establishes a one-to-many magical bond with their familiars. When the mage's vitality wanes, the Observer pattern guarantees every bonded creature instantly senses the change and reacts accordingly, without the mage manually commanding them.
