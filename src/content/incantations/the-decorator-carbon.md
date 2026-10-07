---
title: "The Decorator Incantation in Carbon"
description: "Dynamically weave new enchantments onto an object without altering its core structure."
type: carbon
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  package Decorator api;

  interface DataStream {
    fn Read[me: Self]() -> String;
  }

  class BaseStream {
    impl as DataStream {
      fn Read[me: Self]() -> String { return "Raw Data"; }
    }
  }

  class EncryptedStream {
    var base: DataStream*;

    impl as DataStream {
      fn Read[me: Self]() -> String {
        var raw: String = (*me.base).Read();
        return "Encrypted(" + raw + ")";
      }
    }
  }

  class CompressedStream {
    var base: DataStream*;

    impl as DataStream {
      fn Read[me: Self]() -> String {
        var raw: String = (*me.base).Read();
        return "Compressed(" + raw + ")";
      }
    }
  }
tags: [structural, carbon, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator: Layers of Augmentation

To permanently bind a spell of encryption or compression to a core data stream class is rigid and inflexible. The Decorator pattern offers a dynamic alternative: wrapping the core object in layers of augmentation.

In Carbon, this is achieved by possessing a pointer to the base `DataStream` interface while simultaneously implementing that same interface. This Russian-nesting-doll architecture allows a cyber-mage to stack `EncryptedStream` and `CompressedStream` decorators at runtime, modifying behavior without explosive subclassing.
