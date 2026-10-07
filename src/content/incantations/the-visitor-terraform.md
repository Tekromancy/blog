---
title: The Visitor
description: Sweep across existing collections of resources to apply new policies or bindings without modifying their original source code.
type: terraform
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // Sweeping Binds"
formula: |2
  variable "existing_role_names" {
    type = set(string)
    default = [
      "lambda-execution-role",
      "ecs-task-role",
      "ec2-instance-role"
    ]
  }
  
  # The Visitor: An external policy that "visits" each role
  data "aws_iam_policy_document" "global_read_policy" {
    statement {
      actions   = ["s3:GetObject"]
      resources = ["arn:aws:s3:::global-arcane-library/*"]
    }
  }
  
  resource "aws_iam_policy" "global_read" {
    name   = "GlobalArcaneRead"
    policy = data.aws_iam_policy_document.global_read_policy.json
  }
  
  # The Visit operation
  resource "aws_iam_role_policy_attachment" "visitor_attachment" {
    for_each = var.existing_role_names
    
    role       = each.key
    policy_arn = aws_iam_policy.global_read.arn
  }
tags: [terraform, iac, visitor, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Visitor: The Sweeping Bind

Modifying heavily-entrenched modules just to add a new cross-cutting concern is dangerous. The **Visitor** pattern represents an operation to be performed on the elements of an object structure, letting you define a new operation without changing the classes of the elements.

In Terraform, the Visitor manifests through iteration (`for_each`) applied to independent attachment or binding resources. Instead of editing the original `aws_iam_role` definitions to include a new policy, the Alchemist creates an `aws_iam_role_policy_attachment` and loops it over a list of existing role names. The policy "visits" each role, granting it new powers without ever touching the original invocation.
