---
title: The Chain of Responsibility
description: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
type: go
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Barrier-layering"
formula: |2
  package chain

  // Handler
  type WardLayer interface {
  	SetNext(WardLayer) WardLayer
  	ProcessThreat(threatLevel int) string
  }

  // Base Handler
  type BaseWard struct {
  	next WardLayer
  }

  func (b *BaseWard) SetNext(next WardLayer) WardLayer {
  	b.next = next
  	return next
  }

  // Concrete Handler 1
  type KineticWard struct {
  	BaseWard
  }

  func (k *KineticWard) ProcessThreat(threatLevel int) string {
  	if threatLevel <= 2 {
  		return "Kinetic Ward absorbed the impact."
  	}
  	if k.next != nil {
  		return k.next.ProcessThreat(threatLevel)
  	}
  	return "Threat breached all wards!"
  }

  // Concrete Handler 2
  type ArcaneWard struct {
  	BaseWard
  }

  func (a *ArcaneWard) ProcessThreat(threatLevel int) string {
  	if threatLevel <= 5 {
  		return "Arcane Ward dispersed the spell."
  	}
  	if a.next != nil {
  		return a.next.ProcessThreat(threatLevel)
  	}
  	return "Threat breached all wards!"
  }
tags: [Behavioral, Abjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility
Cyber-mages layer their defensive matrices. The Chain of Responsibility cascades incoming attacks down a linked series of wards. The kinetic shield might stop a low-level bullet, but if the threat is a high-yield plasma spell, it passes the kinetic layer and hits the arcane dispersed. Decoupling the defenses allows for dynamic layering of survival tactics.
