---
title: Template Method of the Ritual Skeleton
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
type: rust
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Bone-crafting"
formula: |2
  pub trait DataMiner {
      // Template method skeleton
      fn mine_data(&self) {
          self.connect();
          self.extract();
          self.disconnect();
      }
      fn connect(&self) { println!("Establishing standard neural link."); }
      fn disconnect(&self) { println!("Severing link cleanly."); }

      // Hook to be implemented
      fn extract(&self);
  }

  pub struct AggressiveMiner;
  impl DataMiner for AggressiveMiner {
      fn extract(&self) { println!("Ripping files with brute force decryption..."); }
  }

  pub struct StealthMiner;
  impl DataMiner for StealthMiner {
      fn extract(&self) { println!("Siphoning data slowly to avoid alarms..."); }
  }
tags: [behavioral, template-method, necromancy, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The core steps of the cyber-ritual are immutable, set in the ancient bones of the system. The Template Method crafts this invariant Ritual Skeleton, locking the overarching control flow in place.

However, the dark art of Necromancy allows the specific, messy details of the inner steps to be fleshed out by the particular implementation. A standard data mine always connects and disconnects, but how it extracts the data is entirely up to the subtype.
