---
title: The Iterator
description: Provide a way to access the elements of an aggregate object sequentially.
type: jcl
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Job Control Wards"
formula: |2
  //ITERATOR JOB (ACCT),'ITERATOR PATTERN',CLASS=A,MSGCLASS=X
  //* ACCESSING GENERATION DATA GROUPS (GDG) SEQUENTIALLY
  //* READING THE CURRENT AND PREVIOUS GENERATIONS
  //STEP1    EXEC PGM=DATAREAD
  //INPUT    DD DSN=TEKROM.BACKUP.GDG(0),DISP=SHR
  //         DD DSN=TEKROM.BACKUP.GDG(-1),DISP=SHR
  //         DD DSN=TEKROM.BACKUP.GDG(-2),DISP=SHR
tags: [iterator, jcl, gdg, sequential-access]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
## The Iterator

Time is a river, and data on the mainframe flows in Generations. The Iterator pattern is beautifully manifested through Generation Data Groups (GDGs). Instead of tracking explicit dataset names with timestamps, a techno-mage can sequentially access a lineage of backups by simply specifying relative generation numbers like `(0)`, `(-1)`, and `(-2)`. The system implicitly iterates backward through time, providing the records in order.
