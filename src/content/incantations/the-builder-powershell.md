---
title: The Builder of Server Templates
description: Construct complex server configurations step-by-step, hiding the chaotic initiation scripts.
type: powershell
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Sysadmin Telepathy"
formula: |2
  class ServerConfig {
      [string]$OS
      [int]$RAM
      [int]$CPU
      [string[]]$Roles
  }

  class IServerBuilder {
      [void] SetOS() { throw "Not Implemented" }
      [void] SetSpecs() { throw "Not Implemented" }
      [void] InstallRoles() { throw "Not Implemented" }
      [ServerConfig] GetServer() { throw "Not Implemented" }
  }

  class WebServerBuilder : IServerBuilder {
      [ServerConfig]$_server = [ServerConfig]::new()

      [void] SetOS() { $this._server.OS = "Windows Server 2022 Datacenter" }
      [void] SetSpecs() { $this._server.RAM = 16; $this._server.CPU = 4 }
      [void] InstallRoles() { $this._server.Roles = @("IIS", "Web-Server") }
      [ServerConfig] GetServer() { return $this._server }
  }

  class ProvisioningDirector {
      [ServerConfig] Construct([IServerBuilder]$builder) {
          $builder.SetOS()
          $builder.SetSpecs()
          $builder.InstallRoles()
          return $builder.GetServer()
      }
  }

  # Ritual execution
  $director = [ProvisioningDirector]::new()
  $webBuilder = [WebServerBuilder]::new()
  $server = $director.Construct($webBuilder)
  Write-Host "Constructed Server: $($server.OS) with $($server.RAM)GB RAM."
tags: [powershell, sysadmin, creational, builder, server-provisioning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In the arcane art of Server Provisioning, the Builder pattern acts as the master crafter. It transmutes raw specifications into a materialized server template, keeping the complex weaving of CPU, RAM, and Roles entirely separated from the invoking script.
