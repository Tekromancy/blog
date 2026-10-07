---
title: The Iterator Path
description: Traverse the infinite nodes of a dimensional labyrinth without exposing its geometry.
type: scala
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  // Scala's native Iterator is already highly magical.
  class Leyline(nodes: List[String]) extends Iterable[String] {
    def iterator: Iterator[String] = new Iterator[String] {
      private var current = nodes

      def hasNext: Boolean = current.nonEmpty
      def next(): String = {
        val head = current.head
        current = current.tail
        head
      }
    }
  }

  // Usage:
  // val line = new Leyline(List("Nexus Alpha", "Node Beta", "Void Edge"))
  // for (node <- line) println(s"Traversing: $node")
tags: [scala, behavioral, traversal, native]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By simply implementing `Iterable`, one gains access to Scala's immense suite of functional combinators (`map`, `filter`, `fold`), turning raw paths into pure magical flow.
