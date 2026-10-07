---
title: The Visitor of Jsonnet
description: Separating an algorithm from the object structure.
type: jsonnet
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Deep Inspection"
formula: |2
  local Visitor = {
    visitFile(f):: f.size,
    visitDir(d):: std.foldl(function(acc, c) acc + c.accept(self), d.children, 0)
  };

  local File(size) = { type: "file", size: size, accept(visitor):: visitor.visitFile(self) };
  local Directory(children) = { type: "dir", children: children, accept(visitor):: visitor.visitDir(self) };

  local tree = Directory([
    File(10),
    Directory([File(20), File(30)])
  ]);

  {
    total_size: tree.accept(Visitor)
  }
tags: [behavioral, visitor, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Visitor gracefully walks recursive object trees, applying separate logic decoupled from the nodes themselves, peering into their inner secrets to divine a collective outcome.
