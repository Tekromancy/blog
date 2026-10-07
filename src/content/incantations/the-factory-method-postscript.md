---
title: "Factory Method in PostScript"
description: "Defer the instantiation of specific raster spirits to specialized sub-dictionaries."
type: postscript
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Spawning"
formula: |2
  % Factory Method in PostScript
  /BaseSpooler <<
    /createJob { (Default Spool Job\n) print }
    /process { dup /createJob get exec (Processing Job...\n) print }
  >> def
  
  /VectorSpooler BaseSpooler dup maxlength dict copy def
  VectorSpooler /createJob { (Vector Tracing Job\n) print } put
  
  VectorSpooler /process get exec
tags: [postscript, print-daemon, creational, factory-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Factory Method: The Spawning Pools

The Factory Method defines an interface for creating a print job or graphical entity but allows the specific dictionary instance to alter the type of spirit created. It serves as a spawning pool, where the exact nature of the raster or vector entity is determined just moments before it is thrust into the physical realm.
