---
title: The Chain of Responsibility
description: "A cascade of demonic wards, where each ward either absorbs the intruding spell or passes it to a deeper layer of defense."
type: ruby
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  class DemonicWard
    attr_accessor :next_ward

    def initialize(next_ward = nil)
      @next_ward = next_ward
    end

    def deflect(curse_power)
      if can_deflect?(curse_power)
        "Ward #{self.class.name} deflected curse of power #{curse_power}!"
      elsif @next_ward
        "Ward #{self.class.name} failed, passing down... \n" + @next_ward.deflect(curse_power)
      else
        "All wards broken! The curse strikes the caster!"
      end
    end

    def can_deflect?(power)
      raise NotImplementedError
    end
  end

  class BloodWard < DemonicWard
    def can_deflect?(power); power <= 10; end
  end

  class BoneWard < DemonicWard
    def can_deflect?(power); power <= 50; end
  end

  class VoidWard < DemonicWard
    def can_deflect?(power); power <= 100; end
  end

  # Setup:
  # defense = BloodWard.new(BoneWard.new(VoidWard.new))
  # puts defense.deflect(45)
tags: [ruby, design-pattern, chain-of-responsibility, blood-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility decouples the sender of a curse from its receiver. By linking `BloodWard`, `BoneWard`, and `VoidWard`, a hemomancer ensures that an incoming attack is evaluated sequentially until a ward strong enough to deflect it is found.
