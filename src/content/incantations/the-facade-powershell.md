---
title: The Facade of the Orchestrator
description: Provide a unified interface to a set of interfaces in a subsystem, making it easier to use.
type: powershell
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Sysadmin Telepathy"
formula: |2
  class ActiveDirectorySubsystem {
      [void] CreateUser([string]$name) { Write-Host "AD: Creating user $name" }
  }

  class ExchangeSubsystem {
      [void] ProvisionMailbox([string]$name) { Write-Host "Exchange: Provisioning mailbox for $name" }
  }

  class LicenseSubsystem {
      [void] AssignE5([string]$name) { Write-Host "Licensing: Assigning E5 to $name" }
  }

  class OnboardingFacade {
      [ActiveDirectorySubsystem]$_ad
      [ExchangeSubsystem]$_ex
      [LicenseSubsystem]$_lic

      OnboardingFacade() {
          $this._ad = [ActiveDirectorySubsystem]::new()
          $this._ex = [ExchangeSubsystem]::new()
          $this._lic = [LicenseSubsystem]::new()
      }

      [void] OnboardEmployee([string]$name) {
          Write-Host "Initiating Onboarding Ritual for $name..." -ForegroundColor Cyan
          $this._ad.CreateUser($name)
          $this._ex.ProvisionMailbox($name)
          $this._lic.AssignE5($name)
          Write-Host "Ritual Complete." -ForegroundColor Green
      }
  }

  # The Sysadmin speaks only one word
  $orchestrator = [OnboardingFacade]::new()
  $orchestrator.OnboardEmployee("neo.anderson")
tags: [powershell, sysadmin, structural, facade, orchestration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade hides the chaotic labyrinth of individual system modules. To the sysadmin, it presents a single, elegant incantation that handles user provisioning across all domains.
