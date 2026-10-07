---
title: Command of the Execution Scroll
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests.
type: rust
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Delayed-casting
formula: |
  pub trait Command {
      fn execute(&self);
  }

  pub struct OrbitalStrike {
      target_coords: String,
  }
  impl Command for OrbitalStrike {
      fn execute(&self) { println!("Calling strike on {}", self.target_coords); }
  }

  pub struct ExecutionQueue {
      commands: Vec<Box<dyn Command>>,
  }
  impl ExecutionQueue {
      pub fn new() -> Self { Self { commands: Vec::new() } }
      pub fn add(&mut self, cmd: Box<dyn Command>) { self.commands.push(cmd); }
      pub fn run_all(&self) {
          for cmd in &self.commands { cmd.execute(); }
      }
  }
tags: [behavioral, command, evocation, queueing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command pattern transmutes a fleeting intent into a permanent Execution Scroll. In the chaotic heat of a cyber-raid, executing an action immediately is often suicidal.

By encapsulating the operation as a concrete command object, you can store it, queue it, pass it across network boundaries, or even reverse it. When the precise astronomical conditions are met, the queue unloads its payload with devastating synchronicity.
