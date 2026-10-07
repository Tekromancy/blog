---
title: The Builder of the Deep Architecture
description: Construct complex void-structures step-by-step from the primal matter.
type: bcpl
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structomancy"
formula: |2
  GET "libhdr"

  MANIFEST $(
    STRUCT_CORE = 0
    STRUCT_SHELL = 1
    STRUCT_ENERGY = 2
    STRUCT_SIZE = 3
  $)

  LET CreateVoidStructure() = VALOF $(
    LET struct = getvec(STRUCT_SIZE)
    struct!STRUCT_CORE = "Empty"
    struct!STRUCT_SHELL = "None"
    struct!STRUCT_ENERGY = 0
    RESULTIS struct
  $)

  LET BuildCore(struct, core_type) BE struct!STRUCT_CORE = core_type
  LET BuildShell(struct, shell_type) BE struct!STRUCT_SHELL = shell_type
  LET InfuseEnergy(struct, energy_level) BE struct!STRUCT_ENERGY = energy_level

  LET ConstructMonolith(struct) BE $(
    BuildCore(struct, "Dark Matter Core")
    BuildShell(struct, "Obsidian Shell")
    InfuseEnergy(struct, 9999)
  $)

  LET PrintStructure(struct) BE $(
    writef("Core: %s, Shell: %s, Energy: %d*n", struct!STRUCT_CORE, struct!STRUCT_SHELL, struct!STRUCT_ENERGY)
  $)

  LET START() BE $(
    LET myStruct = CreateVoidStructure()
    ConstructMonolith(myStruct)
    PrintStructure(myStruct)
    freevec(myStruct)
  $)
tags: [builder, architecture, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
