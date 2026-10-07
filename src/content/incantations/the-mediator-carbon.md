---
title: "The Mediator Incantation in Carbon"
description: "Centralize complex communications between disparate system components into a single command nexus."
type: carbon
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  package Mediator api;

  interface SystemMediator {
    fn Notify[me: Self](sender: String, event: String);
  }

  class CoreRouter {
    impl as SystemMediator {
      fn Notify[me: Self](sender: String, event: String) {
        if (event == "BREACH") {
          // Trigger lockdowns, alert admins
        }
      }
    }
  }

  class Sensor {
    var mediator: SystemMediator*;
    var id: String;

    fn Trigger[me: Self]() {
      (*me.mediator).Notify(me.id, "BREACH");
    }
  }
tags: [behavioral, carbon, decoupling, messaging]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator: The Command Nexus

When a dozen different UI panels, sensors, and daemon threads must all communicate, allowing them to reference each other directly creates a spaghetti matrix of dependencies. The Mediator pattern introduces a central hub.

In Carbon, sensors do not know about the alarm systems, and alarm systems do not know about the database locks. They all only know the `SystemMediator` interface. When a `Sensor` detects an anomaly, it simply tells the Mediator. The Mediator, acting as the ultimate authority of the Successor Pact, coordinates the chaotic response.
