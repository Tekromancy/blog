---
title: The Command
description: Encapsulating a dark ritual request as an object, allowing for undoing blood sacrifices.
type: mumps
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Time-Weaving"
formula: |2
  COMMAND ; Command Pattern in MUMPS
  ;
  EXECUTE(CMD, TARGET) ;
    I CMD="SACRIFICE" D
    . S ^HISTORY($I(^HISTORY))="UNDO_SACRIFICE^"_TARGET
    . W "Sacrificed ",TARGET,!
    . K ^PATIENT(TARGET)
    I CMD="HEAL" D
    . S ^HISTORY($I(^HISTORY))="UNDO_HEAL^"_TARGET
    . W "Healed ",TARGET,!
    . S ^PATIENT(TARGET,"HP")=100
    Q
  ;
  UNDO ;
    N LASTCMD,ACTION,TARGET
    S LASTCMD=$O(^HISTORY(""),-1) Q:LASTCMD=""
    S ACTION=$P(^HISTORY(LASTCMD),"^",1), TARGET=$P(^HISTORY(LASTCMD),"^",2)
    W "Undoing: ",ACTION," on ",TARGET,!
    K ^HISTORY(LASTCMD)
    Q
tags: [behavioral, command, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
