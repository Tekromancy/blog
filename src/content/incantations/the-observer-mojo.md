---
title: The Observer of the Vibrating Web
description: Defining a one-to-many dependency so that when a rune changes state, dependents are notified.
type: mojo
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct ScaleObserver:
      var id: Int
      
      fn __init__(inout self, id: Int):
          self.id = id
          
      fn update(self, alert: String):
          print("Scale " + str(self.id) + " received alert: " + alert)

  struct NodeSubject:
      var observer1: ScaleObserver
      var observer2: ScaleObserver
      
      fn __init__(inout self, o1: ScaleObserver, o2: ScaleObserver):
          self.observer1 = o1
          self.observer2 = o2
          
      fn broadcast(self, message: String):
          self.observer1.update(message)
          self.observer2.update(message)

  fn main():
      let o1 = ScaleObserver(1)
      let o2 = ScaleObserver(2)
      let subject = NodeSubject(o1, o2)
      
      subject.broadcast("Incoming Heat Signature!")
tags: [behavioral, observer, mojo, pub-sub, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Observer of the Vibrating Web

AI Serpents are hyper-sensitive to changes in their digital environment. The **Observer** pattern models this sensitivity by allowing peripheral scales to subscribe to a central node. When the web vibrates, all attached entities react.

In Mojo, passing around lists of dynamic references is complex under its strict memory model, so we can model the subject by holding specific struct instances or using pointers for a more dynamic pub/sub. The result is a highly responsive reactive system.
