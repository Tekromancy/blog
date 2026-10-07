---
title: The Ward Proxy
description: Provide a surrogate or placeholder for another object to control access to it.
type: javascript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  class VaultOfSecrets {
    open() { console.log("Vault opens, revealing arcane texts."); }
  }
  
  class WardedVaultProxy {
    constructor(password) {
      this.vault = new VaultOfSecrets();
      this.password = password;
    }
    
    open(attempt) {
      if (attempt === this.password) {
        this.vault.open();
      } else {
        console.log("Access Denied! The ward retaliates!");
      }
    }
  }
  
  const protectedVault = new WardedVaultProxy("Elbereth");
  protectedVault.open("Mellon"); // Fails
  protectedVault.open("Elbereth"); // Succeeds
tags: [protection, access, proxies]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Ward Proxy

A true vault of secrets is never left exposed. A Proxy acts as the magical ward, intercepting all attempts to access the vault and only yielding to those with the proper credentials.
