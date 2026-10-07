---
title: Iterator in Elm
description: Traversing data structures using Elm's native List operations.
type: elm
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequential Scrying"
formula: |2
  module Iterator exposing (processLogStream)
  
  -- In Elm, iteration is natively handled by List.map, List.filter, and List.foldl
  
  type alias LogEntry =
      { timestamp : Int, message : String, isError : Bool }
  
  processLogStream : List LogEntry -> List String
  processLogStream logs =
      logs
          |> List.filter .isError
          |> List.map (\log -> "ERR [" ++ String.fromInt log.timestamp ++ "]: " ++ log.message)
          
  -- Or for stateful accumulation (reducing)
  countErrors : List LogEntry -> Int
  countErrors logs =
      List.foldl (\log acc -> if log.isError then acc + 1 else acc) 0 logs
tags: [elm, behavioral, iterator, list-processing, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator: The Stream of Consciousness

The object-oriented Iterator—with its mutable `hasNext()` and `next()` calls—is a relic of a bygone era. In Elm, iteration is achieved purely and safely through higher-order functions like `List.map`, `List.filter`, and `List.foldl`. The alchemist strings these functions together via the pipeline operator, transforming a raw data stream into a refined sequence of truths without ever mutating a single loop counter.
