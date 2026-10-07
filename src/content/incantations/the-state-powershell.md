---
title: The State of the Service Lifecycle
description: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
type: powershell
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Sysadmin Telepathy"
formula: |2
  class IServiceState {
      [void] HandleRequest([ServiceContext]$ctx) { throw "Not Implemented" }
  }

  class ServiceContext {
      [IServiceState]$State
      ServiceContext([IServiceState]$s) { $this.State = $s }
      [void] Request() { $this.State.HandleRequest($this) }
  }

  class StoppedState : IServiceState {
      [void] HandleRequest([ServiceContext]$ctx) {
          Write-Host "Service is stopped. Initiating startup sequence..." -ForegroundColor Yellow
          $ctx.State = [RunningState]::new()
      }
  }

  class RunningState : IServiceState {
      [void] HandleRequest([ServiceContext]$ctx) {
          Write-Host "Service is running perfectly. Emitting pulse." -ForegroundColor Green
      }
  }

  # Cycle through states
  $context = [ServiceContext]::new([StoppedState]::new())
  $context.Request() # Transitions to Running
  $context.Request() # Remains Running
tags: [powershell, sysadmin, behavioral, state, service-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing the State pattern, a script acts dynamically based on the current essence of a service. It fluidly mutates its logic, transitioning between Stopped and Running forms effortlessly.
