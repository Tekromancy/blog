---
title: The Builder of the Chrome Citadel
description: Construct complex cyber-magical entities step-by-step, separating construction from representation.
type: rust
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct-shaping"
formula: |2
  #[derive(Default, Debug)]
  pub struct Golem {
      chassis: String,
      mana_core: String,
      runic_circuitry: Vec<String>,
  }

  pub struct GolemBuilder {
      golem: Golem,
  }

  impl GolemBuilder {
      pub fn new() -> Self {
          Self { golem: Golem::default() }
      }
      pub fn with_chassis(mut self, chassis: &str) -> Self {
          self.golem.chassis = chassis.to_string();
          self
      }
      pub fn with_mana_core(mut self, core: &str) -> Self {
          self.golem.mana_core = core.to_string();
          self
      }
      pub fn add_rune(mut self, rune: &str) -> Self {
          self.golem.runic_circuitry.push(rune.to_string());
          self
      }
      pub fn awaken(self) -> Golem {
          self.golem
      }
  }
tags: [creational, builder, transmutation, constructs]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To sculpt a construct of immense power requires patience and precision. The Builder pattern is the chisel of the modern cyber-mage, allowing the step-by-step assembly of complex data-golems.

By separating the intricate construction process from the final dormant entity, an adept can reuse the same builder rites to awaken golems of vastly different compositions—be they stealthed infiltration daemons or heavy assault wardens.
