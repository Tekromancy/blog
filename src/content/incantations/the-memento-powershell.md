---
title: The Memento of the State Snapshot
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
type: powershell
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Sysadmin Telepathy"
formula: |2
  class ConfigMemento {
      [string]$State
      ConfigMemento([string]$s) { $this.State = $s }
  }

  class FirewallConfig {
      [string]$_ruleset

      [void] SetRules([string]$rules) {
          $this._ruleset = $rules
          Write-Host "Firewall rules updated to: $rules"
      }

      [ConfigMemento] Save() {
          return [ConfigMemento]::new($this._ruleset)
      }

      [void] Restore([ConfigMemento]$memento) {
          $this._ruleset = $memento.State
          Write-Host "Firewall rules restored to: $($this._ruleset)" -ForegroundColor Cyan
      }
  }

  # Chronomantic operation
  $firewall = [FirewallConfig]::new()
  $firewall.SetRules("Block_None")

  # Snapshot
  $snapshot = $firewall.Save()

  $firewall.SetRules("Block_All")

  # Revert
  $firewall.Restore($snapshot)
tags: [powershell, sysadmin, behavioral, memento, snapshots]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using Chronomancy, the Memento pattern captures a frozen slice of time—a pristine configuration state. When disaster strikes, the sysadmin simply recalls the Memento, resetting the timeline.
