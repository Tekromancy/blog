---
title: The Proxy of the Bastion Host
description: Provide a surrogate or placeholder for another object to control access to it.
type: powershell
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Sysadmin Telepathy"
formula: |2
  class IRemoteServer {
      [void] ExecuteCommand([string]$cmd) { throw "Not Implemented" }
  }

  class HighSecurityServer : IRemoteServer {
      [void] ExecuteCommand([string]$cmd) {
          Write-Host "Executing deeply privileged command: $cmd" -ForegroundColor Red
      }
  }

  class BastionProxy : IRemoteServer {
      [HighSecurityServer]$_realServer
      [string]$_adminRole

      BastionProxy([string]$role) {
          $this._adminRole = $role
      }

      [void] ExecuteCommand([string]$cmd) {
          if ($this._adminRole -eq "DomainAdmin") {
              if ($null -eq $this._realServer) {
                  $this._realServer = [HighSecurityServer]::new()
              }
              $this._realServer.ExecuteCommand($cmd)
          } else {
              Write-Host "Access Denied. Your aura lacks the required privileges." -ForegroundColor DarkRed
          }
      }
  }

  # The Proxy intercepts requests
  $proxy1 = [BastionProxy]::new("Helpdesk")
  $proxy1.ExecuteCommand("Format-Volume")

  $proxy2 = [BastionProxy]::new("DomainAdmin")
  $proxy2.ExecuteCommand("Format-Volume")
tags: [powershell, sysadmin, structural, proxy, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy acts as a magical ward and Bastion Host. It stands before the highly privileged inner sanctum, ensuring that only those with the proper telepathic clearance can manifest changes on the underlying server.
