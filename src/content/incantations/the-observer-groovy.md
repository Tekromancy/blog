---
title: The Observer Hex
description: Defining a one-to-many dependency to notify objects of state changes automatically.
type: groovy
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Enchantment // Divination"
formula: |2
  import java.beans.PropertyChangeListener
  import groovy.beans.Bindable

  class ReactorCore {
      @Bindable int temperature = 0
  }

  def core = new ReactorCore()

  core.addPropertyChangeListener({ event ->
      println "ALERT: Temperature shifted from ${event.oldValue} to ${event.newValue}!"
  } as PropertyChangeListener)

  core.temperature = 100
  core.temperature = 5000
tags: [groovy, behavioral, observer, bindable, ast-transform]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer Hex

Rather than manually managing lists of listeners and iterating through them, Groovy provides the `@Bindable` AST transformation. This automatically infuses property-change support into any arcane class. By binding a closure via interface coercion, a mage can instantly create a reactive grid that triggers alarms whenever the reactor's core metrics fluctuate.
