---
title: The Composite of the Hypertext Labyrinth
description: Treat solitary files and sprawling directory structures with the same recursive reverence.
type: twine
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Divination // Fractal"
formula: |2
  :: StoryInit
  <<set setup.calculateSize to function(node) {
    if (node.type == "file") {
      return node.size;
    } else if (node.type == "folder") {
      let total = 0;
      for (let i = 0; i < node.children.length; i++) {
        total += setup.calculateSize(node.children[i]);
      }
      return total;
    }
  }>>
  
  <<set $rootDirectory to {
    type: "folder",
    children: [
      { type: "file", name: "passwords.txt", size: 12 },
      { type: "folder", children: [
        { type: "file", name: "ghost_in_machine.exe", size: 999 }
      ]}
    ]
  }>>
  
  :: Passage
  The total datamass of the sector is <<print setup.calculateSize($rootDirectory)>> kb.
tags: [structural, composite, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The data architecture of the Labyrinth branches infinitely like a fractal crystalline growth. The **Composite** pattern allows the Weaver to interact with single nodes and complex clusters using the exact same recursive incantation.

By giving both `file` and `folder` constructs a compatible interface (the `calculateSize` evaluation), the script traverses the deep tree structures effortlessly, ignoring whether it touches a lone text file or a nested abyss of forbidden archives.
