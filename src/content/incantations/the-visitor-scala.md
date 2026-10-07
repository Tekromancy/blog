---
title: The Visitor Ascendant
description: Add entirely new operations to a sprawling hierarchy of magical constructs without altering their immutable definitions.
type: scala
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  sealed trait Construct
  case class Golem(core: String) extends Construct
  case class Homunculus(blood: String) extends Construct

  trait ArcaneInspector {
    def inspect(golem: Golem): String
    def inspect(homunculus: Homunculus): String
  }

  class PurityInspector extends ArcaneInspector {
    def inspect(golem: Golem) = s"Golem core is ${golem.core}"
    def inspect(homunculus: Homunculus) = s"Homunculus blood is ${homunculus.blood}"
  }

  // To accept the visitor, we can use pattern matching on a dispatcher:
  object ConstructDispatcher {
    def accept(construct: Construct, visitor: ArcaneInspector): String = construct match {
      case g: Golem => visitor.inspect(g)
      case h: Homunculus => visitor.inspect(h)
    }
  }
tags: [scala, behavioral, inspection, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Scala frequently replaces the traditional Visitor pattern with robust Pattern Matching. However, simulating the classic double-dispatch approach provides a heavily structured means to analyze disparate constructs.
