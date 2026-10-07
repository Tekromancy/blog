---
title: The Mediator
description: Centralize complex communication routing between disparate infrastructure modules to prevent chaotic, tightly-coupled dependencies.
type: terraform
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  # Module A: The Network (Knows nothing of Compute)
  module "network" {
    source = "./modules/vpc"
  }
  
  # Module B: The Database (Knows nothing of Network directly)
  module "database" {
    source = "./modules/rds"
    # It requires subnet IDs, but doesn't fetch them itself
    subnet_ids = local.routed_subnets
  }
  
  # The Mediator: The Root Module
  locals {
    # The Mediator interprets outputs from A and feeds them to B
    private_data_subnets = [for s in module.network.subnets : s.id if s.type == "private"]
    routed_subnets       = local.private_data_subnets
  }
  
  # Module C: The Compute
  module "compute" {
    source = "./modules/eks"
    # The Mediator connects Network and Compute
    vpc_id     = module.network.vpc_id
    subnet_ids = module.network.subnets[*].id
    
    # The Mediator passes Database connection strings to Compute
    db_endpoint = module.database.endpoint
  }
tags: [terraform, iac, mediator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator: The Grand Orchestrator

When constructing vast realms, allowing individual modules to query each other directly—such as a database module internally calling a network data source—creates a tangled, untestable web of dependencies.

The **Mediator** pattern enforces centralized control. In Terraform, the "Root Module" acts as the Mediator. Child modules are entirely ignorant of one another; they simply declare their inputs and outputs. The Root Module receives the outputs from the Network, processes them in `locals`, and passes the exact required strings to the Database and Compute modules. By restricting all cross-module communication to the Mediator, the architecture remains modular, decoupled, and supremely easy to refactor.
