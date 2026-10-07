---
title: Mediator of the Neuro-Broker
description: Define an object that encapsulates how a set of objects interact.
type: rust
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Synchronization
formula: |
  pub trait Mediator {
      fn notify(&self, sender: &str, event: &str);
  }

  pub struct TowerControl;
  impl Mediator for TowerControl {
      fn notify(&self, sender: &str, event: &str) {
          println!("Tower Control registered event '{}' from {}", event, sender);
          if event == "TAKEOFF" {
              println!("Tower clearing airspace for {}.", sender);
          }
      }
  }

  pub struct Transport {
      id: String,
      mediator: std::rc::Rc<dyn Mediator>,
  }
  impl Transport {
      pub fn request_takeoff(&self) {
          self.mediator.notify(&self.id, "TAKEOFF");
      }
  }
tags: [behavioral, mediator, enchantment, coupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When hundreds of autonomous daemons communicate in a dense web, the resulting coupling is chaotic and fatal. The Mediator acts as the Neuro-Broker, absorbing the myriad paths of communication.

Instead of daemons directly linking and firing events to one another, they pass their intent up to the Mediator. This central logic hub dictates how the entire ecosystem reacts, enforcing order on a system that would otherwise collapse into a tangled gridlock.
