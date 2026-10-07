---
title: The Visitor of Configuration Audits
description: Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.
type: powershell
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Sysadmin Telepathy"
formula: |2
  class IVisitor {
      [void] VisitServer([ServerNode]$server) { throw "Not Implemented" }
      [void] VisitWorkstation([WorkstationNode]$ws) { throw "Not Implemented" }
  }

  class INode {
      [void] Accept([IVisitor]$v) { throw "Not Implemented" }
  }

  class ServerNode : INode {
      [string]$Name
      ServerNode([string]$n) { $this.Name = $n }
      [void] Accept([IVisitor]$v) { $v.VisitServer($this) }
  }

  class WorkstationNode : INode {
      [string]$Name
      WorkstationNode([string]$n) { $this.Name = $n }
      [void] Accept([IVisitor]$v) { $v.VisitWorkstation($this) }
  }

  class SecurityAuditVisitor : IVisitor {
      [void] VisitServer([ServerNode]$server) {
          Write-Host "Auditing SERVER $($server.Name) for strict port rules." -ForegroundColor Red
      }
      [void] VisitWorkstation([WorkstationNode]$ws) {
          Write-Host "Auditing WORKSTATION $($ws.Name) for local admin usage." -ForegroundColor Yellow
      }
  }

  # Unleasing the auditor
  $nodes = @(
      [ServerNode]::new("DC01"),
      [WorkstationNode]::new("DESKTOP-ABC")
  )
  $auditor = [SecurityAuditVisitor]::new()

  foreach ($node in $nodes) {
      $node.Accept($auditor)
  }
tags: [powershell, sysadmin, behavioral, visitor, auditing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Visitor pattern unleashes an external spectral auditor upon the node graph. Without altering the underlying Server or Workstation classes, it performs deep, targeted security divinations upon them.
