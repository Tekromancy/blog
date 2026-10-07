---
title: The Bridge of Realms
description: Decouples an abstraction from its implementation so the two can vary independently across multiversal planes.
type: scala
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Teleportation"
formula: |2
  trait MagicSchool {
    def castSpell(name: String): String
  }

  class Pyromancy extends MagicSchool {
    def castSpell(name: String): String = s"Flames engulf the $name"
  }
  class Cryomancy extends MagicSchool {
    def castSpell(name: String): String = s"Ice freezes the $name"
  }

  abstract class Wand(school: MagicSchool) {
    def trigger(): String
  }

  class ElderWand(school: MagicSchool) extends Wand(school) {
    override def trigger(): String = s"Elder power: ${school.castSpell("target")}"
  }
  class BoneWand(school: MagicSchool) extends Wand(school) {
    override def trigger(): String = s"Necrotic edge: ${school.castSpell("soul")}"
  }
tags: [scala, structural, multi-dimensional]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge avoids a Cartesian explosion of classes (e.g., `ElderFireWand`, `BoneIceWand`) by using composition to link the conduit (Wand) with the essence (MagicSchool).
