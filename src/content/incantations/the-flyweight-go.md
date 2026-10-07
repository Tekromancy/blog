---
title: The Flyweight
description: Use sharing to support large numbers of fine-grained objects efficiently.
type: go
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm-shaping"
formula: |2
  package flyweight

  import "fmt"

  // Flyweight
  type ElementalSpriteType struct {
  	Name    string
  	Texture string // The intrinsic, heavy data
  }

  // Flyweight Factory
  type SpriteFactory struct {
  	cache map[string]*ElementalSpriteType
  }

  func (f *SpriteFactory) GetSpriteType(name, texture string) *ElementalSpriteType {
  	if _, exists := f.cache[name]; !exists {
  		f.cache[name] = &ElementalSpriteType{Name: name, Texture: texture}
  	}
  	return f.cache[name]
  }

  // Context (Extrinsic state)
  type SpriteInstance struct {
  	X, Y int
  	Type *ElementalSpriteType
  }

  func (s *SpriteInstance) Render() {
  	fmt.Printf("Rendering %s at (%d, %d) with texture %s\n", s.Type.Name, s.X, s.Y, s.Type.Texture)
  }
tags: [Structural, Conjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight
When summoning a swarm of ten thousand digital fire-sprites to overload an ICE wall, rendering each entity from scratch will crash your neural deck. The Flyweight separates the shared intrinsic arcane data (the sprite's fiery core) from the extrinsic state (its coordinates). The swarm draws from a single cached core, bending reality without the memory leak.
