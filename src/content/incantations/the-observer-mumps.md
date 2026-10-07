---
title: The Observer
description: Allowing necro-monitors to react instantly when a patient's soul leaves their body.
type: mumps
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  OBSERVER ; Observer Pattern in MUMPS
  ;
  SUBSCRIBE(EVENT, LISTENER) ;
    S ^OBSERVERS(EVENT,LISTENER)=""
    Q
  ;
  NOTIFY(EVENT, DATA) ;
    N LISTENER S LISTENER=""
    F  S LISTENER=$O(^OBSERVERS(EVENT,LISTENER)) Q:LISTENER=""  D
    . W "Notifying ",LISTENER," of ",EVENT," (",DATA,")",!
    . ; E.g., D @LISTENER
    Q
  ;
  TEST ;
    D SUBSCRIBE("DEATH","REAPER")
    D SUBSCRIBE("DEATH","MORGUE_WARD")
    D NOTIFY("DEATH","Patient 404")
    Q
tags: [behavioral, observer, mumps, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
