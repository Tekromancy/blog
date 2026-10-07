---
title: The Visitor
description: Represent an operation to be performed on the elements of an object structure.
type: go
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Abjuration // Audit-sweeping
formula: |
  package visitor

  import "fmt"

  // Visitor interface
  type Inquisitor interface {
  	VisitGrimoire(g *Grimoire)
  	VisitRelic(r *Relic)
  }

  // Element interface
  type MagicalArtifact interface {
  	Accept(v Inquisitor)
  }

  // Concrete Element 1
  type Grimoire struct {
  	CorruptionLevel int
  }
  func (g *Grimoire) Accept(v Inquisitor) { v.VisitGrimoire(g) }

  // Concrete Element 2
  type Relic struct {
  	IsCursed bool
  }
  func (r *Relic) Accept(v Inquisitor) { v.VisitRelic(r) }

  // Concrete Visitor
  type CleansingInquisitor struct{}
  func (c *CleansingInquisitor) VisitGrimoire(g *Grimoire) {
  	if g.CorruptionLevel > 50 {
  		fmt.Println("Grimoire purged with holy fire!")
  	}
  }
  func (c *CleansingInquisitor) VisitRelic(r *Relic) {
  	if r.IsCursed {
  		fmt.Println("Relic disenchanted and shattered.")
  	}
  }
tags: [Behavioral, Abjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Visitor
When the Inquisition sweeps through a cyber-mage's vault, they don't ask the artifacts to audit themselves. The Visitor pattern extracts the auditing logic out of the artifacts. Elements like Grimoires and Relics simply `Accept` the Inquisitor, passing a reference to themselves. This allows the Inquisition to deploy entirely new sweeping protocols (Cleansing, Cataloging, Seizing) without modifying the fragile code of the ancient items.
