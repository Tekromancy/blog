---
title: Prototype of the Clone Vats
description: Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.
type: rust
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Biomancy // Cloning"
formula: |2
  #[derive(Clone, Debug)]
  pub struct Replicant {
      pub designation: String,
      pub bio_signature: Vec<u8>,
      pub memories: Vec<String>,
  }

  impl Replicant {
      pub fn new(designation: &str) -> Self {
          Self {
              designation: designation.to_string(),
              bio_signature: vec![0xDE, 0xAD, 0xBE, 0xEF],
              memories: vec!["I've seen things you people wouldn't believe...".to_string()],
          }
      }
  }

  // Cloning usage
  // let alpha = Replicant::new("Nexus-Alpha");
  // let mut beta = alpha.clone();
  // beta.designation = "Nexus-Beta".to_string();
tags: [creational, prototype, biomancy, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the sterile hum of the corp-cloning vats, birthing a new entity from scratch is a costly expenditure of biomatter and compute. The Prototype pattern is the dark art of the clone-weavers.

By implementing `Clone`, a cyber-mage can instantiate an archetypal replicant and duplicate its exact memory engrams and bio-signatures almost instantaneously. Modification of the clone's identity takes fractions of a cycle, avoiding the heavy toll of pure conjuration.
