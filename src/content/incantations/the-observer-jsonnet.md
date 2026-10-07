---
title: The Observer of Jsonnet
description: Distributing state changes to interested parties.
type: jsonnet
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Omniscience"
formula: |2
  local EventBus(eventData, observers) =
    [obs(eventData) for obs in observers];

  local EmailObserver(data) = "Emailing " + data;
  local LogObserver(data) = "Logging " + data;

  {
    notifications: EventBus("System Crash", [EmailObserver, LogObserver])
  }
tags: [behavioral, observer, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
An EventBus function passes payloads directly to a list of observer functions. A reactive array reflects the myriad consequences of a single triggered event.
