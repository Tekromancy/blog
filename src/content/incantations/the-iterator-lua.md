---
title: "The Iterator of the Leyline Path"
description: "Traversing the hidden nodes of a magical network without exposing its underlying table structure."
type: lua
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Pathfinding
formula: |
  local function leylineIterator(nodes)
    local index = 0
    local count = #nodes
    return function()
      index = index + 1
      if index <= count then
        return nodes[index]
      end
    end
  end

  local hiddenNodes = { "Crystal Cavern", "Fairy Ring", "Ancient Oak" }
  for node in leylineIterator(hiddenNodes) do
    print("Traversing: " .. node)
  end
tags: [fae, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Iterator

Lua’s native `for...in` syntax is an inherent manifestation of the Iterator pattern. By returning a closure—a glowing wisp that remembers its place along the path—the script safely traverses the universe's tables without exposing the raw, underlying matrix.
