---
title: The Bridge
description: Decouple the conceptual infrastructure interface from its elemental implementation, allowing both to evolve independently.
type: terraform
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Chaining"
formula: |2
  # The Abstraction: A generic standard for a "Web App"
  variable "app_config" {
    type = object({
      name    = string
      port    = number
      runtime = string
    })
  }
  
  # The Bridge switch
  variable "orchestrator" {
    type    = string
    default = "ecs" # or "eks"
  }
  
  # Implementation 1: ECS
  module "ecs_implementation" {
    source = "./modules/ecs_app"
    count  = var.orchestrator == "ecs" ? 1 : 0
    
    app_name = var.app_config.name
    port     = var.app_config.port
  }
  
  # Implementation 2: Kubernetes
  module "k8s_implementation" {
    source = "./modules/k8s_app"
    count  = var.orchestrator == "eks" ? 1 : 0
    
    metadata_name = var.app_config.name
    target_port   = var.app_config.port
  }
tags: [terraform, iac, bridge, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge: The Bifrost Protocol

When an architect binds a generic concept—such as a "Web Application"—directly to a specific orchestrator like ECS, they lock themselves into a rigid fate. The **Bridge** pattern solves this by separating the abstraction (the `app_config` variables) from the implementation (the specific module).

In Terraform, the Bridge is forged by accepting a unified input standard and using a bridging variable (`orchestrator`) to direct the flow of magic. The underlying modules map the standard input to their specific provider requirements. The interface remains pristine, while the backend can be entirely replaced without the calling wizards ever noticing the shift.
