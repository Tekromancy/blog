---
title: The Observer
description: Subscribing to hermetic build events.
type: starlark
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Awareness"
formula: |2
  def create_event_bus():
      state = {"subscribers": []}
      
      def _subscribe(subscriber_func):
          state["subscribers"].append(subscriber_func)
          
      def _publish(event_name, data):
          results = []
          for sub in state["subscribers"]:
              results.append(sub(event_name, data))
          return results
          
      return struct(
          subscribe = _subscribe,
          publish = _publish
      )
  
  def logger_subscriber(event, data):
      return "Log: Event %s occurred with %s" % (event, data)
      
  # Usage
  bus = create_event_bus()
  bus.subscribe(logger_subscriber)
  bus.publish("TARGET_BUILT", "main.o")
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Observer** pattern enables a publish-subscribe mechanism within Starlark configuration phases. Since macros often generate auxiliary files (like test runners or coverage reports), an event bus struct can allow loosely coupled modules to listen for "TARGET_GENERATED" events and automatically inject their own supplemental build instructions into the graph.
