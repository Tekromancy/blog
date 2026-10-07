---
title: The Composite of Jsonnet
description: Treating individual objects and compositions uniformly.
type: jsonnet
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Reality"
formula: |2
  local File(name, size) = { type: "file", name: name, size: size };
  local Directory(name, children) = {
    type: "directory",
    name: name,
    children: children,
    size: std.foldl(function(acc, c) acc + c.size, children, 0)
  };

  local fs = Directory("root", [
    File("spell1.txt", 10),
    Directory("docs", [
      File("grimoire.pdf", 500)
    ])
  ]);

  {
    filesystem: fs
  }
tags: [structural, composite, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Composite pattern is naturally expressed as recursive object and array structures, where calculating a property like `size` elegantly cascades down the tree.
