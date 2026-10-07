---
title: The Command
description: Encapsulate imperative execution scripts within declarative infrastructure, tying shell commands to resource lifecycles.
type: terraform
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Imperative Striking"
formula: |2
  variable "database_address" {
    type = string
  }
  
  resource "terraform_data" "db_initializer" {
    # The Command is bound to the database address changing
    triggers_replace = [
      var.database_address
    ]
  
    # The Execute Command (Evocation)
    provisioner "local-exec" {
      command = "psql -h ${var.database_address} -U admin -f init_schema.sql"
    }
  
    # The Undo Command (Abjuration/Reversal)
    provisioner "local-exec" {
      when    = destroy
      command = "echo 'Warning: Database schema is being destroyed for ${self.triggers_replace[0]}'"
    }
  }
tags: [terraform, iac, command, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Command: The Imperative Strike

Terraform is inherently a declarative language; it describes *what* should be, not *how* to do it. Yet, occasionally, an Alchemist must weave an imperative action—a raw shell command or script—directly into the fabric of the deployment.

The **Command** pattern encapsulates a request as an object. In Terraform, `terraform_data` (or `null_resource`) paired with `local-exec` provisioners serves this purpose. It wraps an imperative command (like initializing a database schema) and binds it to the declarative lifecycle. Through the `triggers_replace` argument, the command re-executes only when the underlying state dictates it. It even supports an `undo` operation via the `when = destroy` hook.
