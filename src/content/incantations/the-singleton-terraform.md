---
title: The Singleton
description: Enforce the existence of one, and only one, supreme artifact across the entire infrastructure state.
type: terraform
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State Binding"
formula: |2
  # Data source ensures we read the existing artifact if it exists elsewhere
  data "aws_s3_bucket" "supreme_archive" {
    bucket = "the-one-true-archive"
  }
  
  # Or enforce creation exactly once using conditional logic
  variable "is_primary_region" {
    type    = bool
    default = true
  }
  
  resource "aws_dynamodb_table" "state_lock" {
    count        = var.is_primary_region ? 1 : 0
    name         = "global-state-lock"
    billing_mode = "PAY_PER_REQUEST"
    hash_key     = "LockID"
  
    attribute {
      name = "LockID"
      type = "S"
    }
  }
  
  output "lock_table_name" {
    value = var.is_primary_region ? aws_dynamodb_table.state_lock[0].name : "global-state-lock"
  }
tags: [terraform, iac, singleton, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Singleton: The One True Artifact

There are objects of power in the cloud that must never be duplicated. A global state lock, an overarching DNS zone, or a central transit gateway. The **Singleton** pattern ensures that no matter how many times an infrastructure module is invoked across different regions or environments, only one instance of the critical artifact is ever forged.

In Terraform, the Singleton is maintained through `data` sources (which read but do not create) and strict `count` conditions bound to a specific region or flag. If an adept tries to cast this module in a secondary region, the `count` reduces to `0`, and the module safely outputs the reference to the original, preventing a catastrophic collision of state.
