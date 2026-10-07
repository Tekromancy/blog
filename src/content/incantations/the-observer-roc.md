---
title: The Observer of Stars
description: Subscribing to celestial alignments via event streams and callback functions.
type: roc
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Astrology"
tags: [fast-functional-wards, roc, observer, pubsub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface StarObserver
      exposes [notifyObservers, Observer]
      imports []

  Event : [Eclipse, Comet, Solstice]
  
  Observer : (Event -> Str)

  moonCult : Observer
  moonCult = \event ->
      when event is
          Eclipse -> "The Moon Cult begins the dark ritual!"
          _ -> "The Moon Cult waits."

  notifyObservers : Event, List Observer -> List Str
  notifyObservers = \event, observers ->
      List.map observers \obs -> obs event
---
