---
title: Dataset Visitor
description: Apply an audit routine across different dataset types (PDS, VSAM).
type: rexx
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Probing"
formula: |2
  /* ooRexx Visitor */
  ::class DatasetElement abstract
  ::method accept abstract

  ::class PDSElement subclass DatasetElement
  ::method accept
    use arg visitor
    visitor~visitPDS(self)

  ::class AuditVisitor
  ::method visitPDS
    use arg pds
    say "Auditing PDS for space allocation."
tags: [visitor, audit, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Visitor sweeps through complex hierarchical libraries, applying diverse auditing enchantments depending on the precise nature of the datasets encountered.
