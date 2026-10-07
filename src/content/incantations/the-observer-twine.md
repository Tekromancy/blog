---
title: The Observer of the Hypertext Labyrinth
description: Bind the fate of myriad UI overlays to the heartbeat of the core system matrix.
type: twine
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sympathy"
formula: |2
  :: StoryInit
  <<set setup.SystemCore = {
    observers: [],
    alertLevel: "Green",
    subscribe: function(obs) { this.observers.push(obs); },
    setAlert: function(level) {
      this.alertLevel = level;
      for (let i = 0; i < this.observers.length; i++) {
        this.observers[i].notify(this.alertLevel);
      }
    }
  }>>
  
  <<set setup.HUD = {
    notify: function(level) {
      console.log("HUD updating to: " + level);
    }
  }>>
  
  <<run setup.SystemCore.subscribe(setup.HUD)>>
  
  :: Passage
  <<link "Trigger Alarm">>
    <<run setup.SystemCore.setAlert("RED")>>
    The HUD flashes violently.
  <</link>>
tags: [behavioral, observer, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the core temperature of the Labyrinth reactor spikes, every connected terminal, HUD, and cybernetic implant must instantly react. The **Observer** pattern creates a sympathetic bond between the core and its watchers.

The `SystemCore` maintains a ledger of subscribers. When its internal state changes (shifting to Alert Level RED), it iterates through the ledger, invoking the `notify()` method on every registered observer. The UI elements respond organically without the core needing to know exactly what it is updating.
