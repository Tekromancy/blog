---
title: ISPF Table Iterator
description: Sequentially access rows in an ISPF table.
type: rexx
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scanning"
formula: |2
  /* ooRexx Iterator */
  ::class ISPFIterator
  ::attribute table
  ::attribute index
  ::method init
    use arg table
    self~table = table
    self~index = 1
  ::method hasNext
    return self~index <= self~table~items
  ::method next
    val = self~table[self~index]
    self~index = self~index + 1
    return val
tags: [iterator, ispf, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Scanning through the monolithic structures of ISPF tables is elegantly achieved by an Iterator, shielding the mage from raw memory traversal.
