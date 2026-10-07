---
title: Decorator of the Arcane Ward
description: Attach additional responsibilities to an object dynamically.
type: rust
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  pub trait CommLink {
      fn transmit(&self, data: &str) -> String;
  }

  pub struct BasicLink;
  impl CommLink for BasicLink {
      fn transmit(&self, data: &str) -> String { data.to_string() }
  }

  pub struct EncryptedLink<T: CommLink> {
      inner: T,
  }
  impl<T: CommLink> EncryptedLink<T> {
      pub fn new(inner: T) -> Self { Self { inner } }
  }
  impl<T: CommLink> CommLink for EncryptedLink<T> {
      fn transmit(&self, data: &str) -> String {
          let encrypted = format!("~ENCRYPTED~{}~", data);
          self.inner.transmit(&encrypted)
      }
  }
tags: [structural, decorator, abjuration, wrapping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To layer defenses without fundamentally altering the core matrix is the essence of Abjuration. The Decorator pattern lets a cyber-mage dynamically bind additional wards and modifications—like encryption and compression algorithms—around a core communication link.

Instead of writing a sprawling inheritance tree of `EncryptedCompressedLink`, you simply wrap the base object in as many concentric rings of logic as the cyber-ritual demands.
