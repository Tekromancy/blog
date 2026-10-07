---
title: The Proxy
description: Provide a surrogate or placeholder for another object to control access to it.
type: go
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Ward-weaving"
formula: |2
  package proxy

  import "fmt"

  // Subject
  type Grimoire interface {
  	ReadSecret() string
  }

  // RealSubject
  type ForbiddenGrimoire struct{}

  func (f *ForbiddenGrimoire) ReadSecret() string {
  	return "The true name of the Arch-Demon is..."
  }

  // Proxy
  type GrimoireWard struct {
  	grimoire *ForbiddenGrimoire
  	Clearance int
  }

  func (w *GrimoireWard) ReadSecret() string {
  	if w.Clearance < 5 {
  		return "Access Denied: Neural clearance level insufficient. Ward activated."
  	}
  	if w.grimoire == nil {
  		w.grimoire = &ForbiddenGrimoire{} // Lazy loading
  	}
  	return w.grimoire.ReadSecret()
  }
tags: [Structural, Abjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy
Knowledge of the outer rims is toxic to the uninitiated mind. The Proxy stands as a warding placeholder. It mimics the forbidden grimoire's interface exactly, but intercepts the call. Only if the caster's clearance level is verified will the Proxy manifest the actual dark data into memory, preventing instantaneous cerebral burnout.
