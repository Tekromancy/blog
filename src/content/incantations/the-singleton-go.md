---
title: The Singleton
description: Ensure a class has only one instance, and provide a global point of access to it.
type: go
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Leyline-anchoring"
formula: |2
  package singleton

  import "sync"

  // Singleton
  type Nexus struct {
  	EnergyLevel int
  }

  var instance *Nexus
  var once sync.Once

  // GetInstance ensures only one Nexus is ever drawn from the ether.
  func GetNexus() *Nexus {
  	once.Do(func() {
  		instance = &Nexus{EnergyLevel: 100}
  	})
  	return instance
  }
tags: [Creational, Abjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Singleton
A true Leyline Nexus must remain solitary, the absolute zero point of power for the local grid. In the threadmancy of modern go-routines, the `sync.Once` incantation guarantees that no matter how many desperate processes claw at the ether simultaneously, only one Nexus is instantiated. It stands singular and absolute, resisting the chaos of concurrent demands.
