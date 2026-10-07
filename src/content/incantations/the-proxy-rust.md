---
title: Proxy of the Sentinal Daemon
description: Provide a surrogate or placeholder for another object to control access to it.
type: rust
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access-control"
formula: |2
  pub trait Vault { fn withdraw(&self, amount: u32); }

  pub struct RealVault;
  impl Vault for RealVault {
      fn withdraw(&self, amount: u32) { println!("Withdrawn {}", amount); }
  }

  pub struct VaultProxy {
      real: RealVault,
      security_clearance: bool,
  }

  impl Vault for VaultProxy {
      fn withdraw(&self, amount: u32) {
          if self.security_clearance {
              self.real.withdraw(amount);
          } else {
              println!("Access Denied. Deploying countermeasures.");
          }
      }
  }
tags: [structural, proxy, abjuration, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Before one touches the true core of a corporate databank, one must bypass the Sentinel Daemon. The Proxy pattern is exactly this guardian: an object that mirrors the exact interface of the real asset but intercepts all invocations.

Whether utilized for lazy-loading massive holovids or enforcing strict cyber-security clearance, the Proxy stands vigilant, refusing passage to unauthorized invocations.
