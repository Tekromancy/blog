---
title: The Proxy Hex
description: Providing a surrogate or placeholder for another object to control access to it.
type: groovy
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Wardmancy"
formula: |2
  interface DataVault { void access() }

  class SecureVault implements DataVault {
      void access() { println "Accessing classified cyber-secrets." }
  }

  class VaultProxy implements DataVault {
      private SecureVault realVault
      private String credentials

      VaultProxy(String creds) { this.credentials = creds }

      void access() {
          if (credentials == "ROOT_OVERRIDE") {
              if (!realVault) realVault = new SecureVault() // Lazy loading
              realVault.access()
          } else {
              println "ACCESS DENIED."
          }
      }
  }

  new VaultProxy("GUEST").access()
  new VaultProxy("ROOT_OVERRIDE").access()
tags: [groovy, structural, proxy, lazy-init]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy Hex

The Proxy acts as a guardian and a stand-in. By deploying a Proxy hex around sensitive or heavy cyber-constructs, a mage can inject authorization checks, logging, or lazy initialization without modifying the target object. In Groovy, dynamic proxies can also be created via `GroovyInterceptable` for even deeper interception magics.
