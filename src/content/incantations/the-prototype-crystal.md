---
title: "The Prototype: Cloning the Matrix"
description: "Specifying the kinds of magical objects to create using a prototypical instance, and creating new ones by copying."
type: "crystal"
gofPattern: "Prototype"
gofCategory: "Creational"
arcaneSchool: "Illusion // Reflection"
formula: |2
  abstract class SpellMatrix
    abstract def clone : SpellMatrix
    abstract def show_matrix
  end

  class IllusionMatrix < SpellMatrix
    property pattern : String
    property potency : Int32

    def initialize(@pattern : String, @potency : Int32)
    end

    def clone : SpellMatrix
      # Crystal's built-in #dup provides shallow copying, 
      # but we implement explicit cloning for arcane purity.
      IllusionMatrix.new(@pattern, @potency)
    end

    def show_matrix
      puts "Illusion: [#{@pattern}] at Potency #{@potency}"
    end
  end

  original_matrix = IllusionMatrix.new("Fractal Mirrors", 100)
  puts "Original Matrix:"
  original_matrix.show_matrix

  cloned_matrix = original_matrix.clone.as(IllusionMatrix)
  cloned_matrix.potency = 50
  puts "Cloned (and dimmed) Matrix:"
  cloned_matrix.show_matrix
tags: ["creational", "prototype", "crystal", "cloning"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When a spell structure is too complex or costly to build from raw materials every time, the Prototype incantation acts as an arcane mirror. By cloning an existing Matrix, we save CPU cycles and mana, instantly manifesting a replica ready for further modification.
