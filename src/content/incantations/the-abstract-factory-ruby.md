---
title: The Abstract Factory
description: "A blood-pact generator for producing familiars and crimson weapons without specifying their exact demonic lineages."
type: ruby
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Bloodmancy
formula: |
  module BloodMagic
    class HemomancerForge
      def create_familiar
        raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
      end

      def create_weapon
        raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
      end
    end

    class SanguineForge < HemomancerForge
      def create_familiar
        SanguineBat.new
      end

      def create_weapon
        SanguineBlade.new
      end
    end

    class AbyssalForge < HemomancerForge
      def create_familiar
        AbyssalHound.new
      end

      def create_weapon
        AbyssalScythe.new
      end
    end

    class Familiar
      def attack; raise NotImplementedError; end
    end

    class SanguineBat < Familiar
      def attack; "The Sanguine Bat drains vitality!"; end
    end

    class AbyssalHound < Familiar
      def attack; "The Abyssal Hound tears through the veil!"; end
    end

    class Weapon
      def strike; raise NotImplementedError; end
    end

    class SanguineBlade < Weapon
      def strike; "A cut that bleeds soul-essence."; end
    end

    class AbyssalScythe < Weapon
      def strike; "A harvest of shadows."; end
    end
  end
tags: [ruby, design-pattern, abstract-factory, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory emerges when the ancient hemomancers realize their rituals require families of related artifacts—familiars and weapons—bound to either the Sanguine or Abyssal realms. Through dynamic dispatch, the exact lineage is obscured until the pact is sealed in blood.
