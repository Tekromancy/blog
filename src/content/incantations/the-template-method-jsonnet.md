---
title: The Template Method of Jsonnet
description: Defining the skeleton of an algorithm.
type: jsonnet
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Skeletal Frame"
formula: |2
  local BaseETL = {
    extract():: error "must implement extract",
    transform(data):: data, // default no-op
    load(data):: error "must implement load",
    
    run():: self.load(self.transform(self.extract()))
  };

  local MyETL = BaseETL {
    extract():: "raw_data",
    transform(data):: data + "_transformed",
    load(data):: { result: "Loaded " + data }
  };

  {
    job: MyETL.run()
  }
tags: [behavioral, template-method, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
With object-oriented features natively built into Jsonnet, defining a skeletal process in a base object and filling out the abstract functions in derived objects is pure magic.
