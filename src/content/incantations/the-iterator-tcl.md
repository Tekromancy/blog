---
title: The Iterator
description: Provides a way to access elements of an arcane collection sequentially without exposing its underlying representation.
type: tcl
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  oo::class create LeylineIterator {
      variable lines index
      constructor {list} {
          set lines $list
          set index 0
      }
      method hasNext {} {
          expr {$index < [llength $lines]}
      }
      method next {} {
          set val [lindex $lines $index]
          incr index
          return $val
      }
  }

  set leylines {"Alpha Node" "Beta Node" "Gamma Node"}
  set scryer [LeylineIterator new $leylines]

  while {[$scryer hasNext]} {
      puts "Scrying location: [$scryer next]"
  }
tags: [behavioral, iterator, scrying, collections]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator

The infinite nodes of a network cannot be processed all at once. The Iterator is a scrying eye that floats sequentially from one data point to the next, hiding the multidimensional complexity of the data structure and revealing only the pure essence of the current node.
