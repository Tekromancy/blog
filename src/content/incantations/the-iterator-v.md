---
title: "The Iterator Sigil"
description: "Traversing an unknown, non-euclidean collection of arcane items sequentially."
type: v
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  module main

  struct Artifact {
  	name string
  }

  interface Iterator {
  mut:
  	has_next() bool
  	next() Artifact
  }

  struct Vault {
  	items []Artifact
  }
  fn (v Vault) create_iterator() Iterator {
  	return VaultIterator{vault: v, index: 0}
  }

  struct VaultIterator {
  	vault Vault
  mut:
  	index int
  }
  fn (mut i VaultIterator) has_next() bool {
  	return i.index < i.vault.items.len
  }
  fn (mut i VaultIterator) next() Artifact {
  	item := i.vault.items[i.index]
  	i.index++
  	return item
  }

  fn main() {
  	vault := Vault{
  		items: [Artifact{name: "Chalice of Void"}, Artifact{name: "Dagger of Time"}]
  	}

  	mut iter := vault.create_iterator()
  	for iter.has_next() {
  		artifact := iter.next()
  		println("Scried artifact: \$artifact.name")
  	}
  }
tags: [vlang, iterator, behavioral, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator Sigil

A magus should not be concerned with the inner dimensionality of a Vault. The Iterator extracts the traversal logic from the collection, providing a sequential scrying window over the artifacts. In V, while native loops exist, an explicit iterator enables traversing complex, generated, or paginated arcane data sources securely.
