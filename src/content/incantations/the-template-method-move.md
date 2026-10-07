---
title: The Template Method of Hot Potatoes
description: Define the skeleton of an algorithm in an operation, deferring some steps to client implementation via Hot Potatoes in Move.
type: move
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  module arcane::template_method {
      // The "Hot Potato" pattern ensures steps must be completed in order to consume the resource
      struct TemplateReceipt has drop {} // A true hot potato wouldn't have drop, but we add it for simplicity
  
      struct StrictReceipt {} // True hot potato, must be consumed by end step
  
      public fun step1_begin(): StrictReceipt {
          // Step 1 logic
          StrictReceipt {}
      }
  
      public fun step2_middle(_receipt: &StrictReceipt) {
          // Enforced to happen after step 1
      }
  
      public fun step3_end(receipt: StrictReceipt) {
          let StrictReceipt {} = receipt;
          // Step 3 logic, consumes receipt completely terminating the flow
      }
  }
tags: [behavioral, template-method, move, hot-potato, resource-safety]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
