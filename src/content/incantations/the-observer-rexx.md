---
title: The Scrying Observer
description: Monitor an MQ queue and notify subscribers.
type: rexx
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  /* ooRexx Observer */
  ::class MQMonitor
  ::attribute observers
  ::method init
    self~observers = .array~new()
  ::method addObserver
    use arg obs
    self~observers~append(obs)
  ::method notifyObservers
    use arg msg
    do obs over self~observers
      obs~update(msg)
    end

  ::class LoggingObserver
  ::method update
    use arg msg
    say "Log: Received MQ message:" msg
tags: [observer, mq, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The scrying orb of the Observer pattern watches the MQ depths, automatically pushing psychic alerts to all registered daemon tasks upon a new arrival.
