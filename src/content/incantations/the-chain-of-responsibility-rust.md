---
title: Chain of Responsibility of the Protocol Stack
description: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
type: rust
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Routing"
formula: |2
  pub trait Handler {
      fn set_next(&mut self, next: Box<dyn Handler>);
      fn handle(&self, request: &str);
  }

  pub struct Firewall { next: Option<Box<dyn Handler>> }
  impl Handler for Firewall {
      fn set_next(&mut self, next: Box<dyn Handler>) { self.next = Some(next); }
      fn handle(&self, request: &str) {
          if request.contains("MALWARE") { println!("Firewall blocked threat."); }
          else if let Some(n) = &self.next { n.handle(request); }
      }
  }

  pub struct Logger { next: Option<Box<dyn Handler>> }
  impl Handler for Logger {
      fn set_next(&mut self, next: Box<dyn Handler>) { self.next = Some(next); }
      fn handle(&self, request: &str) {
          println!("Logging: {}", request);
          if let Some(n) = &self.next { n.handle(request); }
      }
  }
tags: [behavioral, chain-of-responsibility, divination, middleware]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a raw packet breaches the outer grid, it must be cleansed, analyzed, and routed. The Chain of Responsibility forms the Protocol Stack—a sequence of arcane filters.

Each node in the chain inspects the data. If it possesses the jurisdiction, it handles the request or terminates it. If not, it passes the pulse down the line. The sender knows nothing of who answers, only that the chain will process the energy.
