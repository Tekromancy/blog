---
title: The RACF Proxy Gatekeeper
description: Enforce RACF authorization before executing a command.
type: rexx
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  /* ooRexx Proxy */
  ::class RealCommand
  ::method execute
    say "Executing high-privilege system command."

  ::class RACFProxy
  ::attribute user
  ::attribute command
  ::method init
    use arg user
    self~user = user
    self~command = .RealCommand~new()
  ::method execute
    if self~user = 'SYSADMIN' then do
      self~command~execute()
    end
    else do
      say "RACF Violation: Access Denied."
    end
tags: [proxy, racf, security, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy acts as the gatekeeper, consulting RACF wards before granting the user an audience with the underlying high-privilege command.
