---
title: The Iterator
description: Traverse complex collections, dynamically forging nested blocks and resources with repetitive precision.
type: terraform
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Loop Weaving"
formula: |2
  variable "routing_rules" {
    type = list(object({
      path    = string
      backend = string
    }))
    default = [
      { path = "/api", backend = "api-target" },
      { path = "/app", backend = "app-target" }
    ]
  }
  
  resource "aws_lb_listener" "front_end" {
    load_balancer_arn = aws_lb.main.arn
    port              = "443"
    protocol          = "HTTPS"
  
    default_action {
      type             = "forward"
      target_group_arn = aws_lb_target_group.default.arn
    }
  }
  
  resource "aws_lb_listener_rule" "dynamic_routing" {
    # The Iterator at the resource level
    for_each = { for rule in var.routing_rules : rule.path => rule }
    
    listener_arn = aws_lb_listener.front_end.arn
    priority     = 100 + index(var.routing_rules, each.value)
  
    action {
      type             = "forward"
      target_group_arn = each.value.backend
    }
  
    condition {
      # The Iterator at the block level
      dynamic "path_pattern" {
        for_each = [each.value.path]
        iterator = path_iter
        content {
          values = [path_iter.value]
        }
      }
    }
  }
tags: [terraform, iac, iterator, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator: The Weaving Loop

To manually script every rule, route, or configuration block is the hallmark of a novice. The **Iterator** pattern abstracts the traversal of a collection, allowing the Architect to dynamically spin up elements based on data structures.

Terraform natively embraces the Iterator through two distinct invocations: `for_each` (for iterating over resources) and the `dynamic` block (for iterating over nested configuration blocks). The `dynamic` block even features an explicit `iterator` argument, allowing the caster to name the variable representing the current item in the loop. This pattern transforms static, brittle code into a fluid engine capable of generating infinite variations from a single source array.
