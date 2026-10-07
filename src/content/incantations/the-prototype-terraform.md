---
title: The Prototype
description: Clone existing infrastructure states into new dimensions using Workspaces and structural replication.
type: terraform
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  # The Workspace dictates the clone's destiny
  locals {
    environment = terraform.workspace
    
    # Base prototype parameters
    base_config = {
      instance_count = 2
      region         = "us-east-1"
    }
    
    # Environment-specific mutations
    env_config = {
      default    = {}
      staging    = { instance_count = 3 }
      production = { instance_count = 5 }
    }
    
    # The final cloned config merges the prototype with the mutation
    final_config = merge(local.base_config, lookup(local.env_config, local.environment, {}))
  }
  
  resource "aws_instance" "clone" {
    count         = local.final_config.instance_count
    ami           = "ami-123456"
    instance_type = "t3.medium"
    
    tags = {
      Environment = local.environment
      Origin      = "Prototype"
    }
  }
tags: [terraform, iac, prototype, workspaces]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype: Dimensional Mirroring

Creating a staging environment from scratch is the work of a novice. An Adept of Infrastructure Alchemy knows that the safest way to ensure parity between realms is to use the **Prototype** pattern. 

In Terraform, the primary instrument of the Prototype is the `terraform workspace`. By maintaining a single codebase (the prototype) and relying on the `terraform.workspace` variable, one can instantiate perfect clones of the infrastructure in isolated state files. We use `merge()` and `lookup()` functions to apply slight mutations to the clone—giving a production environment more power, while keeping its skeletal structure identical to staging.
