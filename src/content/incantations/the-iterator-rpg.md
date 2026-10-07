---
title: "Iterator: The Sequential Seeker"
description: "Provide a way to access the elements of an aggregate object sequentially."
type: rpg
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  **FREE
  Ctl-Opt NoMain;

  Dcl-Ds Iterator_t Qualified Template;
    CurrentIndex Int(10);
    MaxCount Int(10);
    DataArray Pointer; 
  End-Ds;

  Dcl-Proc HasNext Export;
    Dcl-Pi *N Ind;
      pIterator Pointer Value;
    End-Pi;
    Dcl-Ds Iter Likeds(Iterator_t) Based(pIterator);
    Return (Iter.CurrentIndex < Iter.MaxCount);
  End-Proc;

  Dcl-Proc GetNext Export;
    Dcl-Pi *N Pointer;
      pIterator Pointer Value;
    End-Pi;
    Dcl-Ds Iter Likeds(Iterator_t) Based(pIterator);
    Iter.CurrentIndex += 1;
    // Logic to offset DataArray by CurrentIndex * ElementSize
    Return Iter.DataArray; // Simplified
  End-Proc;
tags: [behavioral, ibm-i, runes, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# Iterator

Whether looping through a flat file or traversing a complex multi-occurrence Data Structure, the Iterator pattern extracts the logic of traversal, freeing the core Business Logic from the mechanics of fetching the next record.
