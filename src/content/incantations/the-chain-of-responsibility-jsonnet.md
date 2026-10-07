---
title: The Chain of Responsibility in Jsonnet
description: Passing requests along a chain of processing functions.
type: jsonnet
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascading Spells"
formula: |2
  local HandleAuth(req, next) = if req.hasAuth then next(req) else { error: "No Auth" };
  local HandleLog(req, next) = req + { logged: true } + next(req);
  local HandleProcess(req) = { status: "processed", data: req.data };

  local RequestPipeline(req) = 
    HandleAuth(req, function(r) HandleLog(r, function(r2) HandleProcess(r2)));

  {
    result1: RequestPipeline({ hasAuth: true, data: "spell_data" }),
    result2: RequestPipeline({ hasAuth: false, data: "secret" })
  }
tags: [behavioral, chain-of-responsibility, jsonnet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using higher-order functions, Jsonnet wires a pipeline of data processors, chaining logic until the payload is either refined into purity or rejected by a guardian.
