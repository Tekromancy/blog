---
title: The Omniscient Observer
description: Define a one-to-many dependency between objects so that when one changes state, all its dependents are notified.
type: javascript
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  class CelestialEvent {
    constructor() { this.observers = []; }
    subscribe(observer) { this.observers.push(observer); }
    notify(eventData) {
      this.observers.forEach(obs => obs.update(eventData));
    }
  }

  class Astrologer {
    constructor(name) { this.name = name; }
    update(data) {
      console.log(`${this.name} senses the disturbance: ${data}`);
    }
  }

  const eclipse = new CelestialEvent();
  const obs1 = new Astrologer("Merlin");
  const obs2 = new Astrologer("Gandalf");

  eclipse.subscribe(obs1);
  eclipse.subscribe(obs2);

  eclipse.notify("The Blood Moon rises!");
tags: [events, notifications, telepathy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Omniscient Observer

When a celestial event occurs, every attuned astrologer across the realm feels the shift. The Observer pattern allows an entity to broadcast its state changes to the collective immediately.
