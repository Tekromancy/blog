---
title: "The Command: The Stored Directive"
description: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests."
type: alloy
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Directive-Binding"
formula: |2
  abstract sig Directive {
    target: one Construct,
    trigger: lone Outcome
  }
  
  sig StrikeDirective extends Directive {}
  {
    trigger = target.react
  }
  
  sig Construct {
    react: lone Outcome
  }
  
  sig Outcome {}
  
  pred execute_directive[d: StrikeDirective] {
    some d.trigger
  }
  
  run execute_directive for 3
tags: [behavioral, command, directives]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Command: The Stored Directive

The Command pattern reifies an action into a relational `Directive`. By tying the `trigger` of a `StrikeDirective` directly to the `target.react`, the directive itself becomes an immutable artifact of intent, ready to be analyzed or stored in the great logs.
