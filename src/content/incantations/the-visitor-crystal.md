---
title: "The Visitor: The Astral Inspector"
description: "Representing an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates."
type: "crystal"
gofPattern: "Visitor"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Astral Inspection"
formula: |2
  abstract class ArcaneConstruct
    abstract def accept(visitor : InspectorVisitor)
  end

  class ManaPylon < ArcaneConstruct
    property charge : Int32 = 500

    def accept(visitor : InspectorVisitor)
      visitor.visit_mana_pylon(self)
    end
  end

  class WardGenerator < ArcaneConstruct
    property integrity : Int32 = 80

    def accept(visitor : InspectorVisitor)
      visitor.visit_ward_generator(self)
    end
  end

  abstract class InspectorVisitor
    abstract def visit_mana_pylon(pylon : ManaPylon)
    abstract def visit_ward_generator(generator : WardGenerator)
  end

  class DiagnosticInspector < InspectorVisitor
    def visit_mana_pylon(pylon : ManaPylon)
      puts "Diagnostic: Mana Pylon is operating at #{pylon.charge} charge."
    end

    def visit_ward_generator(generator : WardGenerator)
      puts "Diagnostic: Ward Generator has #{generator.integrity}% integrity remaining."
    end
  end

  class OverchargeInspector < InspectorVisitor
    def visit_mana_pylon(pylon : ManaPylon)
      pylon.charge += 200
      puts "Overcharge: Mana Pylon boosted to #{pylon.charge} charge!"
    end

    def visit_ward_generator(generator : WardGenerator)
      puts "Overcharge: Ward Generators cannot be overcharged."
    end
  end

  constructs = [ManaPylon.new, WardGenerator.new] of ArcaneConstruct

  diagnostic = DiagnosticInspector.new
  overcharge = OverchargeInspector.new

  puts ">> Running Diagnostics..."
  constructs.each &.accept(diagnostic)

  puts "\n>> Running Overcharge Protocol..."
  constructs.each &.accept(overcharge)

  puts "\n>> Re-running Diagnostics..."
  constructs.each &.accept(diagnostic)
tags: ["behavioral", "visitor", "crystal", "inspection"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When the arcane constructs of a grand city are already built, modifying their base classes is forbidden. The Astral Inspector acts as a Visitor, allowing the High Council to implement new operations—like Diagnostics or Overcharging—by traversing the structures externally, preserving the pristine code of the original constructs.
