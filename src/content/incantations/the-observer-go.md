---
title: The Observer
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
type: go
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline-monitoring"
formula: |2
  package observer

  import "fmt"

  // Observer interface
  type Cultist interface {
  	Update(event string)
  }

  // Subject interface
  type ElderGod interface {
  	Register(c Cultist)
  	Deregister(c Cultist)
  	Manifest(event string)
  }

  // Concrete Subject
  type Cthulhu struct {
  	cultists []Cultist
  }
  func (c *Cthulhu) Register(cultist Cultist) {
  	c.cultists = append(c.cultists, cultist)
  }
  func (c *Cthulhu) Deregister(cultist Cultist) {
  	// omit complex slice removal for brevity
  }
  func (c *Cthulhu) Manifest(event string) {
  	fmt.Println("Cthulhu stirs: " + event)
  	for _, cultist := range c.cultists {
  		cultist.Update(event)
  	}
  }

  // Concrete Observer
  type Acolyte struct {
  	Name string
  }
  func (a *Acolyte) Update(event string) {
  	fmt.Printf("%s feels the tremor in their mind: %s\n", a.Name, event)
  }
tags: [Behavioral, Divination, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer
The slumbering ones in the deep do not issue commands. They merely exist, and their shifting state ripples through the psychic ether. Cultists subscribe their minds to these dark frequencies via the Observer pattern. When the Elder God stirs, it doesn't need to know who is listening; the event triggers an automatic update in the sanity of every registered acolyte.
