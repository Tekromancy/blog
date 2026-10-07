---
title: The Bridge of Execution Contexts
description: Decouple an abstraction from its implementation so that the two can vary independently.
type: powershell
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Sysadmin Telepathy"
formula: |2
  class IExecutionPlatform {
      [void] RunCommand([string]$cmd) { throw "Not Implemented" }
  }

  class LocalPlatform : IExecutionPlatform {
      [void] RunCommand([string]$cmd) {
          Write-Host "Executing locally: $cmd" -ForegroundColor Green
      }
  }

  class RemotePSSessionPlatform : IExecutionPlatform {
      [void] RunCommand([string]$cmd) {
          Write-Host "Invoking remotely via WinRM: $cmd" -ForegroundColor Cyan
      }
  }

  class SysadminTask {
      [IExecutionPlatform]$_platform

      SysadminTask([IExecutionPlatform]$platform) {
          $this._platform = $platform
      }

      [void] Execute() { throw "Not Implemented" }
  }

  class ServiceRestartTask : SysadminTask {
      ServiceRestartTask([IExecutionPlatform]$platform) : base($platform) {}

      [void] Execute() {
          Write-Host "Initiating Service Restart Task..."
          $this._platform.RunCommand("Restart-Service spooler")
      }
  }

  # Bridging logic and execution
  $localTask = [ServiceRestartTask]::new([LocalPlatform]::new())
  $localTask.Execute()

  $remoteTask = [ServiceRestartTask]::new([RemotePSSessionPlatform]::new())
  $remoteTask.Execute()
tags: [powershell, sysadmin, structural, bridge, remote-execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Bridge constructs a telepathic link between the logical intent of a sysadmin (the task) and the physical plane of its execution (local vs. remote). It untangles the monolithic hierarchy.
