---
title: The Factory Method of Log Endpoints
description: Define an interface for creating a logging endpoint, but let subclasses decide which log to instantiate.
type: powershell
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Sysadmin Telepathy"
formula: |2
  class ILogger {
      [void] Write([string]$message) { throw "Not Implemented" }
  }

  class EventViewerLogger : ILogger {
      [void] Write([string]$message) {
          Write-Host "Writing to Event Viewer: $message" -ForegroundColor Cyan
      }
  }

  class FileLogger : ILogger {
      [void] Write([string]$message) {
          Write-Host "Appending to Flat File: $message" -ForegroundColor Yellow
      }
  }

  class LogCreator {
      [ILogger] CreateLogger() { throw "Not Implemented" }

      [void] LogEvent([string]$msg) {
          $logger = $this.CreateLogger()
          $logger.Write($msg)
      }
  }

  class EventLogCreator : LogCreator {
      [ILogger] CreateLogger() { return [EventViewerLogger]::new() }
  }

  class FileLogCreator : LogCreator {
      [ILogger] CreateLogger() { return [FileLogger]::new() }
  }

  # Channeling the sysadmin telemetry
  $creator = [EventLogCreator]::new()
  $creator.LogEvent("System breach attempt detected in sector 7G.")
tags: [powershell, sysadmin, creational, factory-method, logging]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By utilizing the Factory Method, a sysadmin dynamically summons the appropriate telemetry endpoint without binding the central nervous system of their script to concrete logging structures.
