---
title: The Flyweight
description: Sharing intrinsic ethereal signatures among thousands of identical wights.
type: mumps
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Swarm-Logic"
formula: |2
  FLYWEIGHT ; Flyweight Pattern in MUMPS
  ;
  ; Extrinsic state: Position, ID (Stored individually)
  ; Intrinsic state: Sprite, Base Stats (Stored once)
  ;
  INITTYPES ;
    S ^WIGHTTYPE("STANDARD")="HP:10|DMG:5|SPRITE:GHOST"
    S ^WIGHTTYPE("ELITE")="HP:50|DMG:15|SPRITE:WRAITH"
    Q
  ;
  SPAWN(ID, TYPE, X, Y) ;
    S ^MINION(ID)=TYPE_"^"_X_"^"_Y
    Q
  ;
  RENDER(ID) ;
    N DATA,TYPE,X,Y,INTRINSIC
    S DATA=^MINION(ID)
    S TYPE=$P(DATA,"^",1),X=$P(DATA,"^",2),Y=$P(DATA,"^",3)
    S INTRINSIC=^WIGHTTYPE(TYPE)
    W "Wight ",ID," at ",X,",",Y," uses ",INTRINSIC,!
    Q
tags: [structural, flyweight, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
