---
title: The Observer of the Telemetry Stream
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
type: powershell
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sysadmin Telepathy"
formula: |2
  class IObserver {
      [void] Update([string]$message) { throw "Not Implemented" }
  }

  class Subject {
      [System.Collections.Generic.List[IObserver]]$_observers = [System.Collections.Generic.List[IObserver]]::new()

      [void] Attach([IObserver]$obs) { $this._observers.Add($obs) }
      
      [void] Notify([string]$msg) {
          foreach ($obs in $this._observers) {
              $obs.Update($msg)
          }
      }
  }

  class AdminDashboard : IObserver {
      [void] Update([string]$msg) {
          Write-Host "Dashboard received update: $msg" -ForegroundColor Cyan
      }
  }

  class EmailNotifier : IObserver {
      [void] Update([string]$msg) {
          Write-Host "Emailing sysadmin: $msg" -ForegroundColor Yellow
      }
  }

  # Streaming telepathy
  $serverStatus = [Subject]::new()
  $dashboard = [AdminDashboard]::new()
  $email = [EmailNotifier]::new()

  $serverStatus.Attach($dashboard)
  $serverStatus.Attach($email)

  $serverStatus.Notify("Disk space below 10% on Drive C:")
tags: [powershell, sysadmin, behavioral, observer, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Observer pattern creates a telepathic broadcast network. Entities subscribe to the ethereal stream of the Subject, awakening instantly when state changes demand their attention.
