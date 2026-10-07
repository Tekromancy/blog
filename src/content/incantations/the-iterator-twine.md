---
title: The Iterator of the Hypertext Labyrinth
description: Traverse the infinite arrays of lost souls without exposing the underlying data matrix.
type: twine
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequencing"
formula: |2
  :: StoryInit
  <<set setup.DataCoreIterator = function(collection) {
    return {
      index: 0,
      items: collection,
      hasNext: function() {
        return this.index < this.items.length;
      },
      next: function() {
        return this.items[this.index++];
      }
    };
  }>>
  
  :: Passage
  <<set $logs to ["Log 1: Anomaly", "Log 2: Breach", "Log 3: Silence"]>>
  <<set $iterator to setup.DataCoreIterator($logs)>>
  
  Extracting Data:
  <<for _i to 0; $iterator.hasNext(); _i++>>
    * <<print $iterator.next()>>
  <</for>>
tags: [behavioral, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When sweeping through vast, corrupted databanks, hardcoded `for` loops expose the fragile structure of your collections. The **Iterator** pattern abstracts the traversal.

The `DataCoreIterator` holds the internal pointer and provides a clean `hasNext()` and `next()` interface. The Weaver steps through the labyrinthine nodes smoothly, ignorant of whether the underlying structure is an array, a linked list, or a procedurally generated nightmare sequence.
