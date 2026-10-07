---
title: Template Method of ETL
description: Define the skeleton of an ETL job on the mainframe.
type: rexx
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Forging"
formula: |2
  /* ooRexx Template Method */
  ::class ETLJob
  ::method run
    self~extract()
    self~transform()
    self~load()
  ::method extract abstract
  ::method transform abstract
  ::method load abstract

  ::class DailySMFETL subclass ETLJob
  ::method extract
    say "Extracting SMF records."
  ::method transform
    say "Formatting to CSV."
  ::method load
    say "Loading to DB2."
tags: [template-method, etl, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Template Method establishes the unchangeable skeleton of an ETL rite, leaving only the specific incantations of extraction and loading to the subclassed initiates.
