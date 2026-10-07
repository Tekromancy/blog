---
title: The Abstract Factory of the Mainframe
description: Conjure families of related mainframe orchestrators without specifying their concrete classes.
type: rexx
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Subsystems"
formula: |2
  /* ooRexx Abstract Factory */
  ::class MainframeFactory
  ::method createJob
  ::method createDataset

  ::class ZOSFactory subclass MainframeFactory
  ::method createJob
    return .ZOSJob~new()
  ::method createDataset
    return .ZOSDataset~new()

  ::class VSEFactory subclass MainframeFactory
  ::method createJob
    return .VSEJob~new()
  ::method createDataset
    return .VSEDataset~new()
tags: [abstract-factory, mainframe, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the deep halls of the mainframe, the Abstract Factory dictates the architecture of dataset generation and job control protocols, summoning z/OS or z/VSE constructs dynamically.
