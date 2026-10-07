---
title: The Builder of Jsonnet
description: Step-by-step construction of complex JSON structures.
type: jsonnet
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct Shaping"
formula: |2
  local HouseBuilder = {
    local this = self,
    walls: 0,
    doors: 0,
    windows: 0,
    roof: false,
    
    withWalls(n):: this { walls: n },
    withDoors(n):: this { doors: n },
    withWindows(n):: this { windows: n },
    withRoof():: this { roof: true },
    
    build():: {
      walls: this.walls,
      doors: this.doors,
      windows: this.windows,
      roof: this.roof
    }
  };

  {
    mansion: HouseBuilder.withWalls(10).withDoors(5).withWindows(20).withRoof().build(),
    shack: HouseBuilder.withWalls(4).withDoors(1).build()
  }
tags: [creational, builder, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Through the Builder pattern, Jsonnet allows the precise architectural weaving of complex data shapes, overriding self-referential objects incrementally to build a final magical construct.
