---
title: The Template Method of the Provisioning Pipeline
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
type: powershell
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Sysadmin Telepathy"
formula: |2
  class ServerProvisioner {
      [void] Provision() {
          $this.PrepareOS()
          $this.InstallSoftware()
          $this.ApplySecurity()
      }

      [void] PrepareOS() { Write-Host "Base OS Installed." }
      [void] ApplySecurity() { Write-Host "Standard Firewalls Applied." }
      
      # Abstract method equivalent in PS
      [void] InstallSoftware() { throw "Must be overridden" }
  }

  class WebServerProvisioner : ServerProvisioner {
      [void] InstallSoftware() {
          Write-Host "Installing IIS and ASP.NET..." -ForegroundColor Cyan
      }
  }

  class DatabaseServerProvisioner : ServerProvisioner {
      [void] InstallSoftware() {
          Write-Host "Installing SQL Server 2022..." -ForegroundColor Yellow
      }
  }

  # Executing the templates
  $web = [WebServerProvisioner]::new()
  $web.Provision()

  $db = [DatabaseServerProvisioner]::new()
  $db.Provision()
tags: [powershell, sysadmin, behavioral, template-method, pipeline]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Template Method secures the unbreakable pipeline of server provisioning. It locks down the sequence of operations while allowing specific subclasses to dictate precisely what software is conjured.
