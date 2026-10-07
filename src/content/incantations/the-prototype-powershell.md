---
title: The Prototype of the Phantom Process
description: Clone existing configuration objects rather than instantiating them anew from the void.
type: powershell
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Sysadmin Telepathy"
formula: |2
  class ICloneableProcess {
      [ICloneableProcess] Clone() { throw "Not Implemented" }
  }

  class ProcessConfig : ICloneableProcess {
      [string]$Name
      [int]$Priority
      [string]$UserContext

      ProcessConfig([string]$n, [int]$p, [string]$u) {
          $this.Name = $n
          $this.Priority = $p
          $this.UserContext = $u
      }

      [ICloneableProcess] Clone() {
          # Shallow copy ritual
          return [ProcessConfig]::new($this.Name, $this.Priority, $this.UserContext)
      }
  }

  # Original manifestation
  $original = [ProcessConfig]::new("svchost.exe", 8, "SYSTEM")

  # Cloning the phantom
  $clone = $original.Clone()
  $clone.Name = "malicious_svchost_clone.exe"
  $clone.UserContext = "NETWORK SERVICE"

  Write-Host "Original: $($original.Name) running as $($original.UserContext)"
  Write-Host "Clone: $($clone.Name) running as $($clone.UserContext)"
tags: [powershell, sysadmin, creational, prototype, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Prototype pattern allows the sysadmin to project illusions—clones of an established configuration—saving the computational expense of drawing complex objects from the aether from scratch.
