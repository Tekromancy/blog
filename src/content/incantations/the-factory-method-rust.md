---
title: Factory Method of the Shadow Forges
description: Define an interface for creating a cyber-magical entity, but let subclasses alter the type of entity created.
type: rust
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  pub trait Daemon {
      fn execute_payload(&self);
  }

  pub trait DaemonForge {
      fn spawn_daemon(&self) -> Box<dyn Daemon>;
      fn deploy(&self) {
          let daemon = self.spawn_daemon();
          daemon.execute_payload();
      }
  }

  pub struct StealerDaemon;
  impl Daemon for StealerDaemon {
      fn execute_payload(&self) { println!("Siphoning corporate credits..."); }
  }

  pub struct StealerForge;
  impl DaemonForge for StealerForge {
      fn spawn_daemon(&self) -> Box<dyn Daemon> { Box::new(StealerDaemon) }
  }
tags: [creational, factory-method, conjuration, daemons]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Deep within the Shadow Forges, the Factory Method allows masters to decree the deployment strategies of autonomous daemons while delegating the specific summoning rituals to subordinate forges.

This abstraction ensures that the central command logic remains pure and untainted by the messy specifics of varied demonic sub-protocols. To add a new breed of terror to the grid, one merely erects a new forge.
