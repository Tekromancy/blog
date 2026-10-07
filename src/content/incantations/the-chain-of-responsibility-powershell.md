---
title: The Chain of Escalation
description: Pass a request along a chain of handlers. Upon receiving a request, each handler decides either to process it or to pass it to the next handler in the chain.
type: powershell
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Sysadmin Telepathy"
formula: |2
  class AlertHandler {
      [AlertHandler]$Next

      [void] SetNext([AlertHandler]$handler) {
          $this.Next = $handler
      }

      [void] HandleAlert([int]$severity, [string]$message) {
          if ($null -ne $this.Next) {
              $this.Next.HandleAlert($severity, $message)
          }
      }
  }

  class L1SupportHandler : AlertHandler {
      [void] HandleAlert([int]$severity, [string]$message) {
          if ($severity -le 2) {
              Write-Host "L1 handling minor anomaly: $message" -ForegroundColor Green
          } else {
              base.HandleAlert($severity, $message)
          }
      }
  }

  class SysadminHandler : AlertHandler {
      [void] HandleAlert([int]$severity, [string]$message) {
          if ($severity -le 4) {
              Write-Host "Sysadmin rectifying system fault: $message" -ForegroundColor Yellow
          } else {
              base.HandleAlert($severity, $message)
          }
      }
  }

  class ArchmageHandler : AlertHandler {
      [void] HandleAlert([int]$severity, [string]$message) {
          Write-Host "Archmage summoned for catastrophic failure: $message" -ForegroundColor Red
      }
  }

  # Forging the chain
  $l1 = [L1SupportHandler]::new()
  $sysadmin = [SysadminHandler]::new()
  $archmage = [ArchmageHandler]::new()

  $l1.SetNext($sysadmin)
  $sysadmin.SetNext($archmage)

  # Sending signals
  $l1.HandleAlert(1, "Printer offline")
  $l1.HandleAlert(3, "Server CPU at 99%")
  $l1.HandleAlert(5, "Datacenter on fire")
tags: [powershell, sysadmin, behavioral, chain-of-responsibility, alerting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A stream of alerts flows through the organizational ether. The Chain of Responsibility pattern filters these signals, allowing minor spirits to handle trivial anomalies while escalating true catastrophies to the Archmage.
