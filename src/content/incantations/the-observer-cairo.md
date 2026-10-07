---
title: "The Observer"
description: "Subscribing to trace generation milestones."
type: cairo
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Omniscience"
formula: |2
  trait IObserver<T> { fn update(self: @T, message: felt252); }
  
  #[derive(Drop)]
  struct TraceSubject { observers: Array<felt252> } // IDs of observers
  
  trait ISubject {
      fn notify_all(self: @TraceSubject, message: felt252);
  }
  
  impl SubjectImpl of ISubject {
      fn notify_all(self: @TraceSubject, message: felt252) {
          // Loop and notify
      }
  }
tags: [cairo, design-pattern, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Allows multiple ethereal entities to watch and react as the STARK proof unfolds.
