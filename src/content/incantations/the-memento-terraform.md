---
title: The Memento
description: Capture and restore the deep state of critical data constructs, protecting against accidental destruction.
type: terraform
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  variable "take_snapshot_before_destroy" {
    type    = bool
    default = true
  }
  
  resource "aws_db_instance" "critical_knowledge" {
    allocated_storage    = 50
    engine               = "postgres"
    instance_class       = "db.t3.medium"
    name                 = "arcane_archives"
    
    # The Memento: Capturing state on destruction
    skip_final_snapshot       = !var.take_snapshot_before_destroy
    final_snapshot_identifier = "memento-archive-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  
    lifecycle {
      # Prevent accidental destruction of the physical resource
      prevent_destroy = true
    }
  }
tags: [terraform, iac, memento, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento: The Chronomancer's Archive

In traditional arcane theory, a Memento captures an object's internal state so it can be restored later. In Infrastructure Alchemy, obliterating a compute node is trivial, but destroying a data node without a backup is a catastrophe that echoes through time.

The **Memento** pattern in Terraform is directly woven into resource lifecycles and provider-specific snapshot mechanics. By configuring arguments like `final_snapshot_identifier` and `skip_final_snapshot`, the resource ensures that its exact memory state is saved to the cloud provider's ether just before the Terraform `destroy` action executes. Combined with `prevent_destroy` in the lifecycle block, the Memento guarantees that history is never inadvertently wiped from existence.
