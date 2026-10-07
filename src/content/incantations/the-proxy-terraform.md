---
title: The Proxy
description: Intercept and validate expensive infrastructure conjurations using null resources and precondition checks before actualizing them.
type: terraform
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Interception"
formula: |2
  variable "database_size" {
    type = string
  }
  
  # The Proxy: Validating the request before passing it to the real resource
  resource "null_resource" "proxy_validator" {
    triggers = {
      db_size = var.database_size
    }
  
    lifecycle {
      precondition {
        condition     = contains(["db.t3.micro", "db.r5.large"], var.database_size)
        error_message = "Proxy Denied: Invalid or unapproved database size requested."
      }
    }
  }
  
  # The Real Subject: Only created if the proxy allows it
  resource "aws_db_instance" "expensive_database" {
    depends_on    = [null_resource.proxy_validator]
    
    instance_class = var.database_size
    engine         = "postgres"
    allocated_storage = 100
  }
tags: [terraform, iac, proxy, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy: The Gatekeeper's Ward

Certain infrastructure constructs—like massive relational databases or multi-node AI clusters—drain immense amounts of elemental resources (and capital) to summon. Before committing to the cast, one must ensure the parameters are absolutely correct.

The **Proxy** pattern utilizes intermediate constructs, such as `null_resource` or `terraform_data`, equipped with `lifecycle` preconditions. The Proxy acts as a strict gatekeeper. When a `terraform plan` or `apply` is executed, the proxy evaluates the intent. If the variables violate the ancient pacts (e.g., requesting an unapproved instance size), the proxy halts the execution with a custom error before the actual cloud provider API is ever contacted.
