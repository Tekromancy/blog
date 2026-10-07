---
title: The Visitor Hex
description: Adding operations to object structures without altering the objects, via Dynamic Dispatch.
type: groovy
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // Polymorphism"
formula: |2
  class FileSystemNode {}
  class Directory extends FileSystemNode { String name }
  class TextFile extends FileSystemNode { String content }

  class ScannerVisitor {
      void visit(Directory dir) { println "Scanning Directory: ${dir.name}" }
      void visit(TextFile file) { println "Scanning File size: ${file.content.length()}" }
      void visit(Object o) { println "Unknown node" }
  }

  // Groovy's dynamic dispatch natively supports Double Dispatch
  def nodes = [new Directory(name: "/root"), new TextFile(content: "secrets")]
  def scanner = new ScannerVisitor()

  nodes.each { node ->
      scanner.visit(node) // In Java, this would fail without accept() methods
  }
tags: [groovy, behavioral, visitor, dynamic-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Visitor Hex

In rigid, static realms, the Visitor pattern requires a chaotic mess of `accept(Visitor v)` methods to achieve double-dispatch. However, Groovy is a dynamic nexus. Methods are resolved at runtime based on the actual type of the object. A cyber-mage can simply iterate over a heterogeneous list and call `visit(node)`, and Groovy's meta-object protocol will automatically route the spell to the perfectly matching overloaded method. This utterly eliminates the traditional Visitor boilerplate.
