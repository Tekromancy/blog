---
title: The Template Method Ward
description: Defining the skeletal structure of a ritual.
type: pony
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Framework"
formula: |2
  trait val Ritual
    fun perform() =>
      prepare()
      invoke()
      seal()
    fun prepare()
    fun invoke()
    fun seal()
tags: [pony, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Template Method Ward

A default method implementation in a trait enforces the fixed sequence of the ritual, while subclasses fill in the specific magical incantations.
