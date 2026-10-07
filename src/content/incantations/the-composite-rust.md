---
title: Composite of the Hive Mind
description: Compose objects into tree structures to represent part-whole hierarchies.
type: rust
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Hive-link"
formula: |2
  pub trait GridEntity {
      fn get_power_draw(&self) -> u32;
  }

  pub struct SensorNode {
      power: u32,
  }
  impl GridEntity for SensorNode {
      fn get_power_draw(&self) -> u32 { self.power }
  }

  pub struct Cluster {
      children: Vec<Box<dyn GridEntity>>,
  }
  impl Cluster {
      pub fn new() -> Self { Self { children: Vec::new() } }
      pub fn add(&mut self, entity: Box<dyn GridEntity>) {
          self.children.push(entity);
      }
  }
  impl GridEntity for Cluster {
      fn get_power_draw(&self) -> u32 {
          self.children.iter().map(|c| c.get_power_draw()).sum()
      }
  }
tags: [structural, composite, hive-mind, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Hive Mind does not distinguish between a single drone and an entire swarm of millions. To the Over-Protocol, they are merely entities that consume power and process data. The Composite pattern embodies this terrifying unity.

By organizing nodes into fractal, tree-like hierarchies, your arcane algorithms can invoke operations on a microscopic sensor node or a massive orbital cluster using the exact same incantation. The sum is exactly equal to its parts.
