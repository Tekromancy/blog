---
title: "The Alchemical Adapter: Zero-Cost Trait Polymorphism in Rust"
description: "Bridge incompatible legacy interfaces into idiomatic standard library traits in Rust using the Gang of Four Adapter pattern—adapting raw FFI byte slices or third-party structures to std::io::Read."
type: "rust"
gofPattern: "Adapter Pattern (Structural)"
gofCategory: "Structural"
arcaneSchool: "Transmutation // The Alchemical Polymorphic Adapter"
formula: |2
  struct LegacyRawBuffer { data: *const u8, len: usize, cursor: usize }

  // Target Interface
  use std::io::{Read, Result};

  // The Adapter
  impl Read for LegacyRawBuffer {
      fn read(&mut self, buf: &mut [u8]) -> Result<usize> {
          if self.cursor >= self.len { return Ok(0); }
          let available = self.len - self.cursor;
          let to_copy = buf.len().min(available);
          unsafe {
              std::ptr::copy_nonoverlapping(self.data.add(self.cursor), buf.as_mut_ptr(), to_copy);
          }
          self.cursor += to_copy;
          Ok(to_copy)
      }
  }
tags: ["rust", "adapter-pattern", "traits", "polymorphism", "std-io", "ffi", "gof-patterns", "transmutation"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Adapter

In 1994, the Gang of Four defined the **Adapter Pattern**:
> *"Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces."*
> — Design Patterns, p. 139

In Rust systems engineering, integrating external C libraries, cryptographic hardware modules (HSMs), or legacy kernel ring buffers frequently presents incompatible interfaces:
- The legacy module exposes non-standard methods like `fetch_next_chunk(&mut self) -> Result<Vec<u8>, HardwareErr>`.
- The modern Rust ecosystem (compression libraries, JSON parsers, HTTP stream wrappers) expects standard traits like `std::io::Read` or `std::io::Write`.

The **Alchemical Adapter** wraps the foreign structure and implements the canonical trait, enabling it to interoperate seamlessly with the entire standard library ecosystem.

---

## The Complete Rust Script

Save this as `src/main.rs`:

```rust
// ==============================================================================
// SCRIPT: trait_adapter.rs
// PATTERN: Adapter Pattern (Gang of Four Structural)
// ARCANUM: Transmutation // The Alchemical Polymorphic Adapter
// DESCRIPTION: Adapting a legacy C-style foreign chunk reader to std::io::Read.
// ==============================================================================

use std::io::{self, Read, BufRead, BufReader};

// ------------------------------------------------------------------------------
// 1. THE ADAPTEE (LEGACY FOREIGN STRUCT)
// Incompatible interface: returns discrete chunks with a proprietary error type.
// ------------------------------------------------------------------------------
#[derive(Debug)]
pub enum ForeignHardwareError {
    BusTimeout,
    EndOfMedia,
}

pub struct LegacyHardwareSensor {
    chunks: Vec<Vec<u8>>,
    current_index: usize,
}

impl LegacyHardwareSensor {
    pub fn new(data_packets: Vec<&[u8]>) -> Self {
        Self {
            chunks: data_packets.into_iter().map(|s| s.to_vec()).collect(),
            current_index: 0,
        }
    }

    /// Legacy method incompatible with std::io::Read
    pub fn pull_raw_telemetry_packet(&mut self) -> Result<Vec<u8>, ForeignHardwareError> {
        if self.current_index >= self.chunks.len() {
            return Err(ForeignHardwareError::EndOfMedia);
        }
        let packet = self.chunks[self.current_index].clone();
        self.current_index += 1;
        Ok(packet)
    }
}

// ------------------------------------------------------------------------------
// 2. THE ADAPTER (TRANSMUTATION WRAPPER)
// Wraps LegacyHardwareSensor and implements std::io::Read.
// ------------------------------------------------------------------------------
pub struct HardwareStreamAdapter {
    adaptee: LegacyHardwareSensor,
    active_chunk: Vec<u8>,
    chunk_cursor: usize,
}

impl HardwareStreamAdapter {
    pub fn new(adaptee: LegacyHardwareSensor) -> Self {
        Self {
            adaptee,
            active_chunk: Vec::new(),
            chunk_cursor: 0,
        }
    }
}

impl Read for HardwareStreamAdapter {
    fn read(&mut self, buf: &mut [u8]) -> io::Result<usize> {
        if buf.is_empty() {
            return Ok(0);
        }

        // If the current chunk buffer is exhausted, fetch the next one from adaptee
        while self.chunk_cursor >= self.active_chunk.len() {
            match self.adaptee.pull_raw_telemetry_packet() {
                Ok(new_packet) => {
                    self.active_chunk = new_packet;
                    self.chunk_cursor = 0;
                }
                Err(ForeignHardwareError::EndOfMedia) => {
                    // Standard EOF representation in std::io::Read is Ok(0)
                    return Ok(0);
                }
                Err(ForeignHardwareError::BusTimeout) => {
                    return Err(io::Error::new(io::ErrorKind::TimedOut, "Hardware Bus Timeout"));
                }
            }
        }

        // Copy bytes into caller's buffer
        let available = self.active_chunk.len() - self.chunk_cursor;
        let to_copy = buf.len().min(available);
        buf[..to_copy].copy_from_slice(&self.active_chunk[self.chunk_cursor..self.chunk_cursor + to_copy]);
        self.chunk_cursor += to_copy;

        Ok(to_copy)
    }
}

// ------------------------------------------------------------------------------
// 3. THE CLIENT CONSUMING STANDARD TRAITS
// ------------------------------------------------------------------------------
fn main() -> io::Result<()> {
    println!("[TRANSMUTATION] Initializing Alchemical Trait Adapter...");

    // Create legacy sensor with discrete telemetry packets
    let sensor = LegacyHardwareSensor::new(vec![
        b"SECTOR=ALPHA;TEMP=42.1\n",
        b"SECTOR=BETA;PRESSURE=1013\n",
        b"SECTOR=GAMMA;RADIATION=LOW\n",
    ]);

    // Transmute adaptee via Adapter into standard Read trait object
    let adapter = HardwareStreamAdapter::new(sensor);

    // Now standard ecosystem tools (like BufReader, lines iterator) work out of the box!
    let reader = BufReader::new(adapter);

    for (line_num, line) in reader.lines().enumerate() {
        println!("  ✓ Standard Stream Line #{}: {}", line_num + 1, line?);
    }

    println!("[SUCCESS] Legacy packet sensor consumed as a standard POSIX stream.");
    Ok(())
}
```

---

## Interface Transmutation Diagram

```
[Target: std::io::Read]
      ▲
      │ (implements)
┌───────────────────────────────────────┐
│ HardwareStreamAdapter                 │
│  - read(&mut self, buf) -> io::Result │
│  - manages cursor & EOF mapping       │
└──────────────────┬────────────────────┘
                   │ (wraps)
                   ▼
[Adaptee: LegacyHardwareSensor]
  - pull_raw_telemetry_packet() -> Result<Vec<u8>, ForeignHardwareError>
```
