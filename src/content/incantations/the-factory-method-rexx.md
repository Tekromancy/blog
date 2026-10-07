---
title: The Factory Method of Batch Jobs
description: Define an interface for creating a batch job, letting subclasses decide which job to instantiate.
type: rexx
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Orchestration"
formula: |2
  /* ooRexx Factory Method */
  ::class JobScheduler
  ::method schedule
    job = self~createJob()
    job~submit()
  ::method createJob abstract

  ::class NightlyScheduler subclass JobScheduler
  ::method createJob
    return .BackupJob~new()
    
  ::class BackupJob
  ::method submit
    say "Submitting Backup Job to JES..."
tags: [factory-method, scheduling, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Factory Method defers the exact manifestation of a job into the queue until the scheduler invokes the true class of the task.
