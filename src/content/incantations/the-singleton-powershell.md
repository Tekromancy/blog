---
title: The Singleton of the Global State Matrix
description: Ensure that a given resource pool has only one instance, and provide a universal point of contact to it.
type: powershell
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sysadmin Telepathy"
formula: |2
  class MasterConfig {
      static [MasterConfig] $_instance
      [hashtable] $Settings

      hidden MasterConfig() {
          $this.Settings = @{
              "MaxConnections" = 100
              "Timeout" = 30
          }
          Write-Host "MasterConfig Matrix Initialized." -ForegroundColor Magenta
      }

      static [MasterConfig] GetInstance() {
          if ($null -eq [MasterConfig]::_instance) {
              [MasterConfig]::_instance = [MasterConfig]::new()
          }
          return [MasterConfig]::_instance
      }
  }

  # Channeling the singularity
  $config1 = [MasterConfig]::GetInstance()
  $config2 = [MasterConfig]::GetInstance()

  if ([object]::ReferenceEquals($config1, $config2)) {
      Write-Host "The State Matrix is singular and unbroken."
  }
tags: [powershell, sysadmin, creational, singleton, configuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A classic ward against chaos. The Singleton pattern ensures that across the myriad threads of sysadmin telepathy, there exists only one immutable source of truth for global configuration.
