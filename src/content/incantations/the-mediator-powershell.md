---
title: The Mediator of the Event Hub
description: Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling.
type: powershell
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Sysadmin Telepathy"
formula: |2
  class IMediator {
      [void] Notify([object]$sender, [string]$event) { throw "Not Implemented" }
  }

  class SysadminHub : IMediator {
      [object]$_monitoring
      [object]$_alerting

      [void] SetMonitoring([object]$m) { $this._monitoring = $m }
      [void] SetAlerting([object]$a) { $this._alerting = $a }

      [void] Notify([object]$sender, [string]$event) {
          if ($event -eq "CPU_SPIKE") {
              Write-Host "Hub routing CPU spike to alerting..."
              $this._alerting.SendPagerDuty()
          }
      }
  }

  class Component {
      [IMediator]$_mediator
      Component([IMediator]$m) { $this._mediator = $m }
  }

  class MonitoringAgent : Component {
      MonitoringAgent([IMediator]$m) : base($m) {}
      [void] DetectAnomaly() {
          Write-Host "Anomaly Detected!"
          $this._mediator.Notify($this, "CPU_SPIKE")
      }
  }

  class AlertingAgent : Component {
      AlertingAgent([IMediator]$m) : base($m) {}
      [void] SendPagerDuty() {
          Write-Host "Paging the on-call sysadmin via ethereal link!" -ForegroundColor Red
      }
  }

  # The hub orchestrates
  $hub = [SysadminHub]::new()
  $monitor = [MonitoringAgent]::new($hub)
  $alert = [AlertingAgent]::new($hub)

  $hub.SetMonitoring($monitor)
  $hub.SetAlerting($alert)

  $monitor.DetectAnomaly()
tags: [powershell, sysadmin, behavioral, mediator, event-hub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Mediator acts as the central synaptic ganglion of sysadmin telepathy. Subsystems no longer speak to one another directly; their voices are funneled through the Mediator, reducing infrastructural chaos.
