---
title: The Strategy
description: Dynamically swap the underlying algorithm or deployment mechanism without altering the interface.
type: terraform
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Illusion // Shifting Sands"
formula: |2
  variable "deployment_strategy" {
    description = "Strategy: 'rolling' or 'blue_green'"
    type        = string
    default     = "rolling"
  }
  
  resource "aws_ecs_service" "app_service" {
    name            = "arcane-app"
    cluster         = aws_ecs_cluster.main.id
    task_definition = aws_ecs_task_definition.app.arn
    desired_count   = 3
  
    # Strategy pattern via conditional blocks
    dynamic "deployment_controller" {
      for_each = var.deployment_strategy == "blue_green" ? [1] : []
      content {
        type = "CODE_DEPLOY"
      }
    }
  
    # Rolling update relies on the default ECS controller (ECS)
    dynamic "deployment_controller" {
      for_each = var.deployment_strategy == "rolling" ? [1] : []
      content {
        type = "ECS"
      }
    }
  }
tags: [terraform, iac, strategy, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Strategy: Shifting Sands

Sometimes the goal remains the same (deploying an application), but the method of achieving it must be swapped depending on the environment. The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

In Terraform, the Strategy is implemented by manipulating the configuration of the provider's execution engine. By shifting the `deployment_strategy` variable, the Alchemist dynamically alters the `deployment_controller` of an ECS service. A staging environment might use a simple `"rolling"` strategy to save costs, while production seamlessly shifts to a complex `"blue_green"` CODE_DEPLOY strategy. The outer interface of the module remains entirely constant.
