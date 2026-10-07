---
title: The Factory Method in AWK
description: Delegate the instantiation of specialized text parsers based on arcane file extensions.
type: awk
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Parser-Binding"
formula: |2
  # The Factory Method configures the environment based on the scroll's nature
  function configure_parser(scroll_type) {
      if (scroll_type == "csv") { 
          FS=","
          OFS=" | "
          return "CSV_PARSER_ACTIVE" 
      }
      if (scroll_type == "tsv") { 
          FS="\t"
          OFS=" || "
          return "TSV_PARSER_ACTIVE" 
      }
      return "UNKNOWN_SCROLL_FORMAT"
  }
  
  BEGIN { 
      type = "csv"
      status = configure_parser(type)
      print "Conjured Parser: " status
      print "Field Separator set to: [" FS "]"
  }
tags: [awk, text-processing, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method configures AWK's internal global state, such as Field Separator (`FS`) and Output Field Separator (`OFS`), based on the data taxonomy. The script conjures the exact operational parameters needed to decipher the incoming text stream.
