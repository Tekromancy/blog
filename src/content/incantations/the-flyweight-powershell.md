---
title: The Flyweight of Cached Credentials
description: Use sharing to support large numbers of fine-grained objects efficiently.
type: powershell
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Sysadmin Telepathy"
formula: |2
  class CredentialFlyweight {
      [string]$Domain
      [string]$EncryptedHash

      CredentialFlyweight([string]$d, [string]$h) {
          $this.Domain = $d
          $this.EncryptedHash = $h
      }

      [void] Authenticate([string]$userContext) {
          Write-Host "Authenticating $userContext using shared hash for $($this.Domain)"
      }
  }

  class CredentialFactory {
      [hashtable]$_cache = @{}

      [CredentialFlyweight] GetCredential([string]$domain) {
          if (-not $this._cache.ContainsKey($domain)) {
              Write-Host "Generating new Flyweight for domain: $domain" -ForegroundColor Yellow
              $this._cache[$domain] = [CredentialFlyweight]::new($domain, "SECURE_HASH_123")
          }
          return $this._cache[$domain]
      }
  }

  # Utilizing the caching matrix
  $factory = [CredentialFactory]::new()
  
  $cred1 = $factory.GetCredential("CORP")
  $cred1.Authenticate("admin1")

  $cred2 = $factory.GetCredential("CORP")
  $cred2.Authenticate("admin2")

  if ([object]::ReferenceEquals($cred1, $cred2)) {
      Write-Host "Memory conserved: Credentials share the same ethereal space." -ForegroundColor Green
  }
tags: [powershell, sysadmin, structural, flyweight, memory-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When managing thousands of remote sessions, holding unique credential objects for each is a waste of spiritual energy. The Flyweight shares intrinsic state, preventing the sysadmin's memory from overflowing.
