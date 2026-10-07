---
title: The Iterator of the Leyline Nodes
description: Traverse the elements of a mystical array sequentially without exposing its underlying representation.
type: coldfusion
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  interface name="IIterator" {
      public boolean hasNext();
      public any next();
  }

  component name="NodeIterator" implements="IIterator" {
      variables.nodes = [];
      variables.position = 1;

      public NodeIterator function init(array n) {
          variables.nodes = arguments.n;
          return this;
      }

      public boolean function hasNext() {
          return variables.position <= arrayLen(variables.nodes);
      }

      public any function next() {
          var item = variables.nodes[variables.position];
          variables.position++;
          return item;
      }
  }
tags: [iterator, coldfusion, traversal, leylines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator grants a diviner the ability to walk a network of leyline nodes step by step, blind to whether they are stored in arrays, structs, or linked lists beneath the surface. It provides a pure, sequential conduit for magical energy.
