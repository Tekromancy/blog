---
title: The Prototype
description: Clone an existing arcane dataset to serve as a template for new constructs.
type: jcl
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Job Control Wards"
formula: |2
  //PROTOTYP JOB (ACCT),'PROTOTYPE PATTERN',CLASS=A,MSGCLASS=X
  //* CLONE A NEW DATASET USING AN EXISTING WARD AS A PROTOTYPE
  //STEP1    EXEC PGM=IEFBR14
  //DD1      DD DSN=TEKROM.NEW.CLONED.WARD,
  //            DISP=(NEW,CATLG,DELETE),
  //            LIKE=TEKROM.ANCIENT.TEMPLATE.WARD,
  //            SPACE=(CYL,(10,10))
tags: [prototype, jcl, like-parameter, allocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
## The Prototype

Why weave a complex spell from scratch when you can clone an existing artifact? The Prototype pattern in JCL relies on the mystical `LIKE=` parameter during dataset allocation. It mirrors the DCB (Data Control Block) attributes of an ancient template dataset, creating a precise replica vessel ready to store new arcane energies without redefining the block size or record length.
