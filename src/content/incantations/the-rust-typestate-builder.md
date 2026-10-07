---
title: "The Typestate Golem: Zero-Cost Builder Pattern in Rust"
description: "A compile-time verified Builder pattern in Rust using zero-sized marker types (the Typestate pattern) to make invalid state representations unrepresentable and impossible to compile."
type: "rust"
gofPattern: "Builder Pattern (Creational)"
gofCategory: "Creational"
arcaneSchool: "Conjuration // The Compile-Time Typestate Golem"
formula: |2
  struct NoHost; struct WithHost(String);
  struct NoPort; struct WithPort(u16);

  struct ServerBuilder<H, P> { host: H, port: P, tls: bool }

  impl ServerBuilder<NoHost, NoPort> {
      fn new() -> Self { Self { host: NoHost, port: NoPort, tls: false } }
  }
  impl<P> ServerBuilder<NoHost, P> {
      fn host(self, h: &str) -> ServerBuilder<WithHost, P> {
          ServerBuilder { host: WithHost(h.into()), port: self.port, tls: self.tls }
      }
  }
  impl<H> ServerBuilder<H, NoPort> {
      fn port(self, p: u16) -> ServerBuilder<H, WithPort> {
          ServerBuilder { host: self.host, port: WithPort(p), tls: self.tls }
      }
  }
  impl ServerBuilder<WithHost, WithPort> {
      fn build(self) -> Server { Server { host: self.host.0, port: self.port.0 } }
  }
tags: ["rust", "builder-pattern", "typestate", "zero-cost-abstractions", "type-safety", "gof-patterns", "conjuration"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Archmage"
draft: false
---

## The Lineage to the Gang of Four Builder

In 1994, the Gang of Four defined the **Builder Pattern**:
> *"Separate the construction of a complex object from its representation so that the same construction process can create different representations."*
> — Design Patterns, p. 97

In traditional object-oriented languages, Builders check required arguments at runtime:
```java
// ⚠️ THE RUNTIME EXCEPTION BUILDER (Java / C#)
Server server = new ServerBuilder()
    .setHost("127.0.0.1")
    .build(); // RUNTIME ERROR: Port was not configured!
```
The developer only discovers the missing field when the code runs in staging or production.

In Rust, the **Typestate Pattern** elevates the Builder pattern to the type system. By parameterizing the Builder with **zero-sized marker structs** representing intermediate configuration states, the `.build()` method **does not even exist** on the type until all mandatory properties are supplied.

If an operator forgets a required field, the Rust compiler rejects the build at compile time with zero runtime overhead ($0$ byte memory footprint).

---

## The Complete Rust Script

Save this as `src/main.rs` in a Rust project (`cargo new gof_typestate`):

```rust
// ==============================================================================
// SCRIPT: typestate_builder.rs
// PATTERN: Builder Pattern (Gang of Four Creational)
// ARCANUM: Conjuration // The Compile-Time Typestate Golem
// DESCRIPTION: Zero-cost compile-time verified Typestate Builder.
// ==============================================================================

use std::marker::PhantomData;

// ------------------------------------------------------------------------------
// 1. ZERO-SIZED MARKER TYPES (THE RUNIC SEALS)
// These consume 0 bytes in the compiled binary.
// ------------------------------------------------------------------------------
pub struct NoHost;
pub struct WithHost(String);

pub struct NoPort;
pub struct WithPort(u16);

// ------------------------------------------------------------------------------
// 2. THE FINAL PRODUCT (THE GOLEM)
// ------------------------------------------------------------------------------
#[derive(Debug)]
pub struct SovereignServer {
    host: String,
    port: u16,
    tls_enabled: bool,
}

// ------------------------------------------------------------------------------
// 3. THE TYPESTATE BUILDER
// Parameterized over Host and Port typestates.
// ------------------------------------------------------------------------------
pub struct ServerBuilder<H, P> {
    host: H,
    port: P,
    tls_enabled: bool,
}

// Initial constructor: Neither host nor port has been set
impl ServerBuilder<NoHost, NoPort> {
    pub fn new() -> Self {
        ServerBuilder {
            host: NoHost,
            port: NoPort,
            tls_enabled: true, // Sensible default
        }
    }
}

// Transition: Setting Host (can be called regardless of port state)
impl<P> ServerBuilder<NoHost, P> {
    pub fn host(self, host: impl Into<String>) -> ServerBuilder<WithHost, P> {
        ServerBuilder {
            host: WithHost(host.into()),
            port: self.port,
            tls_enabled: self.tls_enabled,
        }
    }
}

// Transition: Setting Port (can be called regardless of host state)
impl<H> ServerBuilder<H, NoPort> {
    pub fn port(self, port: u16) -> ServerBuilder<H, WithPort> {
        ServerBuilder {
            host: self.host,
            port: WithPort(port),
            tls_enabled: self.tls_enabled,
        }
    }
}

// Optional configurations: Accessible in any state
impl<H, P> ServerBuilder<H, P> {
    pub fn tls(mut self, enabled: bool) -> Self {
        self.tls_enabled = enabled;
        self
    }
}

// ------------------------------------------------------------------------------
// 4. THE CONSUMMATION (.build() EXISTS ONLY WHEN ALL SEALS ARE IN PLACE)
// ------------------------------------------------------------------------------
impl ServerBuilder<WithHost, WithPort> {
    pub fn build(self) -> SovereignServer {
        SovereignServer {
            host: self.host.0,
            port: self.port.0,
            tls_enabled: self.tls_enabled,
        }
    }
}

fn main() {
    println!("[CONJURATION] Forging Typestate Golem...");

    // 1. Fully valid construction
    let server: SovereignServer = ServerBuilder::new()
        .host("bastion.tekromancy.internal")
        .port(8443)
        .tls(true)
        .build(); // Compiles cleanly!

    println!("✓ Server Manifested: {:?}", server);

    // 2. UNCOMMENTING THE LINE BELOW WILL FAIL AT COMPILE TIME:
    // let invalid = ServerBuilder::new().host("localhost").build();
    // ❌ Error: no method named `build` found for struct `ServerBuilder<WithHost, NoPort>`!
}
```

---

## State Transition Automaton

```
       [ServerBuilder<NoHost, NoPort>]
               │               │
       .host() │               │ .port()
               ▼               ▼
[ServerBuilder<WithHost, NoPort>]    [ServerBuilder<NoHost, WithPort>]
               │               │
       .port() │               │ .host()
               └───────┬───────┘
                       │
                       ▼
       [ServerBuilder<WithHost, WithPort>]
                       │
                       ▼ .build()
               ✨ [SovereignServer]
```
