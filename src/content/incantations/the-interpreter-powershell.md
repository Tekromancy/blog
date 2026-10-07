---
title: The Interpreter of Custom Query Languages
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
type: powershell
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Sysadmin Telepathy"
formula: |2
  class Context {
      [hashtable]$Variables = @{}
  }

  class IExpression {
      [bool] Interpret([Context]$ctx) { throw "Not Implemented" }
  }

  class TerminalExpression : IExpression {
      [string]$_data
      TerminalExpression([string]$data) { $this._data = $data }
      [bool] Interpret([Context]$ctx) {
          return $ctx.Variables.ContainsKey($this._data) -and $ctx.Variables[$this._data] -eq $true
      }
  }

  class AndExpression : IExpression {
      [IExpression]$_expr1; [IExpression]$_expr2
      AndExpression([IExpression]$e1, [IExpression]$e2) {
          $this._expr1 = $e1; $this._expr2 = $e2
      }
      [bool] Interpret([Context]$ctx) {
          return $this._expr1.Interpret($ctx) -and $this._expr2.Interpret($ctx)
      }
  }

  # Grammar check
  $ctx = [Context]::new()
  $ctx.Variables["IsAdmin"] = $true
  $ctx.Variables["IsDomainJoined"] = $true

  $isAdmin = [TerminalExpression]::new("IsAdmin")
  $isJoined = [TerminalExpression]::new("IsDomainJoined")
  $canManage = [AndExpression]::new($isAdmin, $isJoined)

  Write-Host "Can manage system? $($canManage.Interpret($ctx))"
tags: [powershell, sysadmin, behavioral, interpreter, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
To parse the esoteric dialects of compliance and security policies, the Interpreter maps raw strings into executable logical constructs, giving the sysadmin a native tongue for complex rulesets.
