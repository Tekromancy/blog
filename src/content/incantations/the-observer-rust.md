---
title: Observer of the Astral Eye
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
type: rust
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sensory-linking"
formula: |2
  use std::cell::RefCell;
  use std::rc::Rc;

  pub trait Observer { fn update(&self, state: &str); }

  pub struct Drone { id: String }
  impl Observer for Drone {
      fn update(&self, state: &str) { println!("Drone {} received alert: {}", self.id, state); }
  }

  pub struct Subject {
      observers: Vec<Rc<dyn Observer>>,
      state: String,
  }
  impl Subject {
      pub fn attach(&mut self, obs: Rc<dyn Observer>) { self.observers.push(obs); }
      pub fn set_state(&mut self, state: &str) {
          self.state = state.to_string();
          self.notify();
      }
      fn notify(&self) {
          for obs in &self.observers { obs.update(&self.state); }
      }
  }
tags: [behavioral, observer, divination, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Astral Eye perceives all shifts in the paradigm. The Observer pattern allows an adept to link a myriad of subservient drones and constructs directly to a central pulse.

When the Subject shifts its state, the rippling waves of Divination instantly notify every subscribed Observer. This loosely coupled broadcast system is the bedrock of reactive cyber-magical user interfaces and event-driven grid mechanics.
