---
title: "The Abstract Factory: Scrying Multiple Dimensions"
description: "Conjuring families of divination matrices in the R arcane syntax."
type: "r"
gofPattern: "Abstract Factory"
gofCategory: "Creational"
arcaneSchool: "Divination // Matrix Haruspex"
formula: |2
  library(R6)

  # Abstract Products
  DivinationMatrix <- R6Class("DivinationMatrix",
    public = list(
      scry = function() stop("Not implemented")
    )
  )

  AstrologicalVector <- R6Class("AstrologicalVector",
    public = list(
      align = function() stop("Not implemented")
    )
  )

  # Concrete Products
  TarotMatrix <- R6Class("TarotMatrix", inherit = DivinationMatrix,
    public = list(
      scry = function() "Scrying through the Tarot matrices..."
    )
  )

  TarotVector <- R6Class("TarotVector", inherit = AstrologicalVector,
    public = list(
      align = function() "Aligning the major arcana vectors."
    )
  )

  RuneMatrix <- R6Class("RuneMatrix", inherit = DivinationMatrix,
    public = list(
      scry = function() "Casting the elder runes through the grid..."
    )
  )

  RuneVector <- R6Class("RuneVector", inherit = AstrologicalVector,
    public = list(
      align = function() "Aligning runic ley lines."
    )
  )

  # Abstract Factory
  HaruspexFactory <- R6Class("HaruspexFactory",
    public = list(
      create_matrix = function() stop("Not implemented"),
      create_vector = function() stop("Not implemented")
    )
  )

  # Concrete Factories
  TarotFactory <- R6Class("TarotFactory", inherit = HaruspexFactory,
    public = list(
      create_matrix = function() TarotMatrix$new(),
      create_vector = function() TarotVector$new()
    )
  )

  RuneFactory <- R6Class("RuneFactory", inherit = HaruspexFactory,
    public = list(
      create_matrix = function() RuneMatrix$new(),
      create_vector = function() RuneVector$new()
    )
  )
tags: ["R6", "Divination", "Creational", "Abstract Factory"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Data Haruspex uses the Abstract Factory to generate entire families of divination matrices and alignment vectors, ensuring compatibility across different scrying schools.
