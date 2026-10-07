---
title: The Visitor of the Astral Harvesters
description: Inject new extraction procedures into rigid void-structures without altering their essence.
type: bcpl
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Harvesting"
formula: |2
  GET "libhdr"

  MANIFEST $(
    TYPE_NODE_A = 1
    TYPE_NODE_B = 2
  $)

  // The Elements
  LET AcceptVisitor(nodeType, visitorFunc) BE $(
    visitorFunc(nodeType)
  $)

  // The Visitor
  LET EssenceHarvester(nodeType) BE $(
    SWITCHON nodeType INTO $(
      CASE TYPE_NODE_A:
        writef("Harvesting raw mana from Node A.*n")
        ENDCASE
      CASE TYPE_NODE_B:
        writef("Extracting dark matter from Node B.*n")
        ENDCASE
    $)
  $)

  LET MemoryHarvester(nodeType) BE $(
    SWITCHON nodeType INTO $(
      CASE TYPE_NODE_A:
        writef("Draining ancient memories from Node A.*n")
        ENDCASE
      CASE TYPE_NODE_B:
        writef("Parsing suppressed echoes from Node B.*n")
        ENDCASE
    $)
  $)

  LET START() BE $(
    writef("Deploying Essence Harvester...*n")
    AcceptVisitor(TYPE_NODE_A, EssenceHarvester)
    AcceptVisitor(TYPE_NODE_B, EssenceHarvester)

    writef("*nDeploying Memory Harvester...*n")
    AcceptVisitor(TYPE_NODE_A, MemoryHarvester)
    AcceptVisitor(TYPE_NODE_B, MemoryHarvester)
  $)
tags: [visitor, harvesting, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
