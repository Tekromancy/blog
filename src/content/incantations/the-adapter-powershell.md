---
title: The Adapter of Legacy Protocols
description: Convert the interface of an old system into an interface clients expect, allowing incompatible systems to communicate.
type: powershell
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Sysadmin Telepathy"
formula: |2
  class LegacyWMIQuerier {
      [string] ExecuteWQL([string]$query) {
          return "Legacy WMI Data for query: $query"
      }
  }

  class ICimSession {
      [string] GetCimInstance([string]$className) { throw "Not Implemented" }
  }

  class WMItoCimAdapter : ICimSession {
      [LegacyWMIQuerier]$_legacySystem

      WMItoCimAdapter([LegacyWMIQuerier]$legacy) {
          $this._legacySystem = $legacy
      }

      [string] GetCimInstance([string]$className) {
          $translatedQuery = "SELECT * FROM $className"
          return $this._legacySystem.ExecuteWQL($translatedQuery)
      }
  }

  # Utilizing the Adapter
  $oldWMI = [LegacyWMIQuerier]::new()
  $adapter = [WMItoCimAdapter]::new($oldWMI)

  $result = $adapter.GetCimInstance("Win32_OperatingSystem")
  Write-Host "Adapted Result: $result"
tags: [powershell, sysadmin, structural, adapter, legacy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Adapter is a linguistic spell, translating the archaic dialects of legacy WMI and COM objects into modern, streamlined CIM sessions. It bridges the eons of technology seamlessly.
