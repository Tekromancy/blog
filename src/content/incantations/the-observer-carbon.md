---
title: "The Observer Incantation in Carbon"
description: "Define a one-to-many dependency so when the subject changes state, all dependents are notified."
type: carbon
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Broadcast"
formula: |2
  package Observer api;

  interface Watcher {
    fn Update[me: Self](state: String);
  }

  class SubjectCore {
    // Conceptual list of Watchers
    var state: String;
    var primary_watcher: Watcher*; 

    fn SetState[addr me: Self*>(s: String) {
      (*me).state = s;
      (*me).Notify();
    }

    fn Notify[me: Self]() {
      if (me.primary_watcher != null) {
        (*me.primary_watcher).Update(me.state);
      }
    }
  }

  class Dashboard {
    impl as Watcher {
      fn Update[me: Self](state: String) {
        // Redraw UI based on new state
      }
    }
  }
tags: [behavioral, carbon, events, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Observer: The Broadcast Frequency

In reactive systems, a change in core telemetry must instantly cascade to dashboards, logging daemons, and alert handlers. Polling is an ancient, inefficient sin. The Observer pattern establishes a subscription model.

By implementing the `Watcher` interface, a `Dashboard` in Carbon can subscribe to a `SubjectCore`. When the core's state shifts, it iterates through its list of observers, calling `Update`. This decouples the sender from the receiver, a critical tenet of the Successor Pact for building highly responsive, event-driven architectures.
