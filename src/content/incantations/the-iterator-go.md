---
title: The Iterator
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
type: go
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  package iterator

  // Iterator interface
  type SoulIterator interface {
  	HasNext() bool
  	GetNext() *Soul
  }

  // Aggregate interface
  type SoulGem interface {
  	CreateIterator() SoulIterator
  }

  // Element
  type Soul struct {
  	Name string
  }

  // Concrete Aggregate
  type BlackSoulGem struct {
  	souls []*Soul
  }
  func (g *BlackSoulGem) CreateIterator() SoulIterator {
  	return &GemIterator{gem: g, index: 0}
  }

  // Concrete Iterator
  type GemIterator struct {
  	gem   *BlackSoulGem
  	index int
  }
  func (i *GemIterator) HasNext() bool {
  	return i.index < len(i.gem.souls)
  }
  func (i *GemIterator) GetNext() *Soul {
  	if i.HasNext() {
  		soul := i.gem.souls[i.index]
  		i.index++
  		return soul
  	}
  	return nil
  }
tags: [Behavioral, Divination, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Iterator
Gazing into a Black Soul Gem to parse the trapped consciousnesses within is a dangerous prospect; if you look at the raw memory heap all at once, you will go mad. The Iterator provides a scrying lens, offering up the trapped souls one by one sequentially, protecting your mind from the horrifying truth of the gem's internal array structure.
