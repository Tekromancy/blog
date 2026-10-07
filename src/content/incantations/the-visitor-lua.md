---
title: "The Visitor of the Spirit Realm"
description: "An external entity traversing a diverse structure of magical nodes, performing tailored rituals on each."
type: lua
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spirit-Walking"
formula: |2
  local SpiritVisitor = {
    visitTree = function(self, tree) print("Blessing the Ancient Tree.") end,
    visitStone = function(self, stone) print("Reading the Runestone.") end
  }

  local AncientTree = { accept = function(self, visitor) visitor:visitTree(self) end }
  local RuneStone = { accept = function(self, visitor) visitor:visitStone(self) end }

  local nodes = { AncientTree, RuneStone }
  for _, node in ipairs(nodes) do
    node:accept(SpiritVisitor)
  end
tags: [fae, visitor, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Visitor

Rather than polluting the sacred nodes of the universe's tables with endless new methods, the Visitor pattern sends a Spirit-Walker through the structure. The host engine passes the Visitor along, and each element reveals its true nature, allowing the Fae Moon Glyphs to execute externally.
