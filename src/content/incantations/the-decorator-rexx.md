---
title: The SMF Decorator
description: Dynamically attach SMF tracking to processes.
type: rexx
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Illusion // Augmentation"
formula: |2
  /* ooRexx Decorator */
  ::class Process
  ::method run
    say "Running base process..."

  ::class SMFDecorator subclass Process
  ::attribute baseProcess
  ::method init
    use arg process
    self~baseProcess = process
  ::method run
    say "Writing SMF start record..."
    self~baseProcess~run()
    say "Writing SMF end record..."
tags: [decorator, smf, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Decorator weaves additional tracking and auditing charms around an existing routine without altering its original essence.
