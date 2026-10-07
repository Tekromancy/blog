---
title: The Composite Gestalt
description: Treat individual spells and sprawling ritual arrays uniformly as a single magical tree.
type: scala
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Gestalt
formula: |
  sealed trait SpellComponent {
    def manaCost: Int
  }

  case class SimpleSpell(cost: Int) extends SpellComponent {
    override def manaCost: Int = cost
  }

  case class SpellArray(components: List[SpellComponent]) extends SpellComponent {
    override def manaCost: Int = components.map(_.manaCost).sum
  }

  // Usage:
  // val array = SpellArray(List(SimpleSpell(10), SpellArray(List(SimpleSpell(5), SimpleSpell(15)))))
  // println(array.manaCost) // 30
tags: [scala, structural, fractal-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Trees of pure functional magic. The Composite pattern elegantly models recursive magical structures using Scala's sealed traits and case classes.
