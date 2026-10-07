---
title: "State in PostScript"
description: "Alter the printer daemon's behavior when its internal phase shifts."
type: postscript
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  % State in PostScript
  /StateIdle << /handle { (Idle: Ready for Jobs.\n) print } >> def
  /StateJammed << /handle { (Jammed: Sounding Alarm!\n) print } >> def
  
  /PrinterContext <<
    /state StateIdle
    /request { dup /state get /handle get exec }
  >> def
  
  PrinterContext /request get exec
  PrinterContext /state StateJammed put
  PrinterContext /request get exec
tags: [postscript, print-daemon, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# State: Phase Metamorphosis

A printer daemon acts entirely differently when idle versus when experiencing a catastrophic mechanical jam. Instead of filling the logic with endless `ifelse` statements, the State pattern swaps out the active behavior dictionary. The context merely delegates the request, allowing the current State to define reality.
