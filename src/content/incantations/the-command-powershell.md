---
title: The Command of Stored Runspaces
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
type: powershell
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Sysadmin Telepathy"
formula: |2
  class ICommand {
      [void] Execute() { throw "Not Implemented" }
      [void] Undo() { throw "Not Implemented" }
  }

  class ServiceManager {
      [void] StartService([string]$name) { Write-Host "Starting $name" }
      [void] StopService([string]$name) { Write-Host "Stopping $name" }
  }

  class StartServiceCommand : ICommand {
      [ServiceManager]$_manager
      [string]$_serviceName

      StartServiceCommand([ServiceManager]$manager, [string]$name) {
          $this._manager = $manager; $this._serviceName = $name
      }

      [void] Execute() { $this._manager.StartService($this._serviceName) }
      [void] Undo() { $this._manager.StopService($this._serviceName) }
  }

  class CommandInvoker {
      [System.Collections.Generic.Stack[ICommand]]$_history = [System.Collections.Generic.Stack[ICommand]]::new()

      [void] RunCommand([ICommand]$cmd) {
          $cmd.Execute()
          $this._history.Push($cmd)
      }

      [void] UndoLast() {
          if ($this._history.Count -gt 0) {
              $cmd = $this._history.Pop()
              $cmd.Undo()
          }
      }
  }

  # Invocation
  $manager = [ServiceManager]::new()
  $invoker = [CommandInvoker]::new()

  $cmd = [StartServiceCommand]::new($manager, "wuauserv")
  $invoker.RunCommand($cmd)
  $invoker.UndoLast()
tags: [powershell, sysadmin, behavioral, command, runspace]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Command pattern captures sysadmin intent as physical scriptblocks trapped in amber. These encapsulated spells can be queued, logged, and even reversed when the weave of infrastructure unravels.
