---
title: The State
description: Morph the routing and behavior of the infrastructure entirely based on an overarching metaphysical phase.
type: terraform
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phasing"
formula: |2
  variable "realm_phase" {
    description = "Current phase: 'active' or 'maintenance'"
    type        = string
    default     = "active"
  }
  
  resource "aws_lb_listener_rule" "main_routing" {
    listener_arn = aws_lb_listener.front_end.arn
    priority     = 100
  
    # State: Active
    dynamic "action" {
      for_each = var.realm_phase == "active" ? [1] : []
      content {
        type             = "forward"
        target_group_arn = aws_lb_target_group.app.arn
      }
    }
  
    # State: Maintenance
    dynamic "action" {
      for_each = var.realm_phase == "maintenance" ? [1] : []
      content {
        type = "fixed-response"
        fixed_response {
          content_type = "text/plain"
          message_body = "The Realm is currently under Arcane Maintenance."
          status_code  = "503"
        }
      }
    }
  
    condition {
      path_pattern {
        values = ["/*"]
      }
    }
  }
tags: [terraform, iac, state, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State: Phasing Realms

An infrastructure must sometimes drastically alter its behavior without fundamentally changing its composition. The **State** pattern allows an object to alter its behavior when its internal state changes.

In Terraform, this is achieved by using a state variable (like `realm_phase`) combined with conditional `dynamic` blocks. When the variable shifts from `"active"` to `"maintenance"`, the Load Balancer Listener Rule fundamentally rewrites its own execution path. It stops forwarding traffic to the backend target group and instead instantly serves a fixed 503 response. The resource object remains the same `aws_lb_listener_rule`, but its essence has shifted.
