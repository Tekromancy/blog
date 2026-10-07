---
title: The Strategy of the Backup Ritual
description: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
type: powershell
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sysadmin Telepathy"
formula: |2
  class IBackupStrategy {
      [void] ExecuteBackup([string]$path) { throw "Not Implemented" }
  }

  class FullBackup : IBackupStrategy {
      [void] ExecuteBackup([string]$path) {
          Write-Host "Performing FULL backup on $path" -ForegroundColor Cyan
      }
  }

  class IncrementalBackup : IBackupStrategy {
      [void] ExecuteBackup([string]$path) {
          Write-Host "Performing INCREMENTAL backup on $path" -ForegroundColor Yellow
      }
  }

  class BackupJob {
      [IBackupStrategy]$_strategy
      BackupJob([IBackupStrategy]$strat) { $this._strategy = $strat }
      [void] SetStrategy([IBackupStrategy]$strat) { $this._strategy = $strat }
      [void] Run([string]$path) { $this._strategy.ExecuteBackup($path) }
  }

  # Deploying strategies
  $job = [BackupJob]::new([FullBackup]::new())
  $job.Run("C:\Data")

  $job.SetStrategy([IncrementalBackup]::new())
  $job.Run("C:\Data")
tags: [powershell, sysadmin, behavioral, strategy, backups]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Strategy pattern provides a grimoire of interchangeable backup algorithms. Depending on the moon phase or storage limits, the sysadmin swaps out the backup spell dynamically at runtime.
