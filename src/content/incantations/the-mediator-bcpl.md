---
title: The Mediator of the Cosmic Nexus
description: Centralize chaotic communications between warring void-entities to prevent dimensional collapse.
type: bcpl
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  GET "libhdr"

  // Entity definitions
  MANIFEST $(
    ENT_A = 1
    ENT_B = 2
  $)

  // The Nexus (Mediator)
  LET NexusTransmit(sender, msg) BE $(
    IF sender = ENT_A THEN $(
      writef("Nexus routing from A to B: %s*n", msg)
    $)
    IF sender = ENT_B THEN $(
      writef("Nexus routing from B to A: %s*n", msg)
    $)
  $)

  LET EntityASend(msg) BE NexusTransmit(ENT_A, msg)
  LET EntityBSend(msg) BE NexusTransmit(ENT_B, msg)

  LET START() BE $(
    EntityASend("Cease your astral storms!")
    EntityBSend("Never! The void belongs to me.")
  $)
tags: [mediator, nexus, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
