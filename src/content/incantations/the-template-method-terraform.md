---
title: The Template Method
description: Define the skeletal structure of a deployment, allowing subclasses (callers) to fill in the specific elemental details.
type: terraform
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Scaffolding"
formula: |2
  # The Template (Module)
  variable "app_name" { type = string }
  variable "container_port" { type = number }
  
  # The Template defines the rigid skeletal steps: VPC -> Cluster -> Service
  resource "aws_ecs_cluster" "cluster" {
    name = "${var.app_name}-cluster"
  }
  
  # The caller provides the specific "meat" for the skeleton
  variable "custom_environment_variables" {
    type    = list(map(string))
    default = []
  }
  
  resource "aws_ecs_task_definition" "app" {
    family = var.app_name
    container_definitions = jsonencode([{
      name      = var.app_name
      image     = "my-app-image:latest"
      portMappings = [{ containerPort = var.container_port }]
      # The Template Method injection point
      environment = var.custom_environment_variables
    }])
  }
tags: [terraform, iac, template-method, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method: The Arcane Scaffold

When an Archmage wishes to enforce a standard architecture across an entire guild without suffocating creativity, they deploy a Scaffold. The **Template Method** defines the skeleton of an algorithm in an operation, deferring some steps to client subclasses.

In Terraform, the module itself is the template. It strictly defines the order and existence of the AWS ECS Cluster, the Task Definition, and the Service. However, it leaves strategic "holes"—such as the `custom_environment_variables` or `custom_iam_policies`—for the calling codebase to fill. The sequence of creation is guaranteed by the module's internal dependency graph, but the exact flavor of the spell is injected by the user.
