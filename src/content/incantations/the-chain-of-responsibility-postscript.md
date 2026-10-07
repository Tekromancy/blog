---
title: "Chain of Responsibility in PostScript"
description: "Pass a print request through a chain of raster handlers until one consumes it."
type: postscript
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Ripple Protocol"
formula: |2
  % Chain of Responsibility in PostScript
  /BaseHandler << /next null >> def
  
  /ErrorHandler BaseHandler dup maxlength dict copy def
  ErrorHandler /handle { (Error Caught and Suppressed.\n) print } put
  
  /SpoolHandler BaseHandler dup maxlength dict copy def
  SpoolHandler /next ErrorHandler put
  SpoolHandler /handle {
    dup /req get (error) eq {
      dup /next get /req (error) put
      dup /next get /handle get exec
    } {
      (Job Spooled.\n) print
    } ifelse
  } put
  
  SpoolHandler /req (job) put SpoolHandler /handle get exec
  SpoolHandler /req (error) put SpoolHandler /handle get exec
tags: [postscript, print-daemon, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Chain of Responsibility: The Ripple Protocol

When an anomalous request enters the print pipeline, it is often unknown which specific daemon is meant to handle it. The Chain of Responsibility links these handlers together. The request cascades down the line of entities until it finds one whose runes match its signature, ensuring robust and flexible fault tolerance.
