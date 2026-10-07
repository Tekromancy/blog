---
title: The Abstract Factory of Active Directory
description: Conjure families of related administrative objects without specifying their concrete sysadmin scripts.
type: powershell
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Sysadmin Telepathy"
formula: |2
  class AbstractUserFactory {
      [object] CreateUser() { throw "Not Implemented" }
      [object] CreateGroup() { throw "Not Implemented" }
  }

  class WindowsADFactory : AbstractUserFactory {
      [object] CreateUser() { return "Conjuring Windows AD User Entity" }
      [object] CreateGroup() { return "Forging Windows AD Security Group" }
  }

  class AzureADFactory : AbstractUserFactory {
      [object] CreateUser() { return "Summoning Azure AD Cloud User" }
      [object] CreateGroup() { return "Weaving Azure AD M365 Group" }
  }

  function Invoke-EnvironmentProvisioning([AbstractUserFactory]$Factory) {
      Write-Host $Factory.CreateUser()
      Write-Host $Factory.CreateGroup()
  }

  # Example invocation
  $adFactory = [WindowsADFactory]::new()
  Invoke-EnvironmentProvisioning -Factory $adFactory
tags: [powershell, sysadmin, creational, abstract-factory, active-directory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory is an arcane nexus, allowing the sysadmin to project their will across different infrastructural planes—whether they be the earthly domain of Windows Active Directory or the ethereal cloud of Azure. It binds related objects into cohesive families.
