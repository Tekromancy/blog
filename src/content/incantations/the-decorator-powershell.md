---
title: The Decorator of Cmdlet Wrappers
description: Attach additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.
type: powershell
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Sysadmin Telepathy"
formula: |2
  class ITask {
      [string] Run() { throw "Not Implemented" }
  }

  class BaseScriptTask : ITask {
      [string] Run() {
          return "Executing Base Script"
      }
  }

  class TaskDecorator : ITask {
      [ITask]$_wrappee
      TaskDecorator([ITask]$task) { $this._wrappee = $task }
      [string] Run() { return $this._wrappee.Run() }
  }

  class LoggingTaskDecorator : TaskDecorator {
      LoggingTaskDecorator([ITask]$task) : base($task) {}
      [string] Run() {
          $result = base.Run()
          return "[LOGGED] " + $result
      }
  }

  class TimingTaskDecorator : TaskDecorator {
      TimingTaskDecorator([ITask]$task) : base($task) {}
      [string] Run() {
          $start = Get-Date
          $result = base.Run()
          $end = Get-Date
          return $result + " (Took $($end - $start))"
      }
  }

  # Layering the enchantments
  $task = [BaseScriptTask]::new()
  $loggedTask = [LoggingTaskDecorator]::new($task)
  $timedLoggedTask = [TimingTaskDecorator]::new($loggedTask)

  Write-Host $timedLoggedTask.Run()
tags: [powershell, sysadmin, structural, decorator, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By means of the Decorator, a mundane PowerShell task can be wrapped in layers of mystical wards—logging, telemetry, timing—without permanently altering its core essence.
