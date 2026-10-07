---
title: The Composite
description: Treat a solitary resource and a massive collection of resources with identical incantations.
type: terraform
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Multiplication"
formula: |2
  variable "network_nodes" {
    description = "A tree of nested network architectures"
    type = map(object({
      cidr = string
      sub_nodes = optional(map(object({
        cidr = string
      })), {})
    }))
  }
  
  # Level 1 Nodes
  resource "aws_vpc" "parent_nodes" {
    for_each   = var.network_nodes
    cidr_block = each.value.cidr
  }
  
  # Level 2 Nodes (The Composite Expansion)
  locals {
    flattened_sub_nodes = flatten([
      for parent_key, parent_val in var.network_nodes : [
        for child_key, child_val in parent_val.sub_nodes : {
          parent_id  = aws_vpc.parent_nodes[parent_key].id
          child_key  = "${parent_key}-${child_key}"
          cidr_block = child_val.cidr
        }
      ]
    ])
  }
  
  resource "aws_subnet" "child_nodes" {
    for_each   = { for node in local.flattened_sub_nodes : node.child_key => node }
    vpc_id     = each.value.parent_id
    cidr_block = each.value.cidr_block
  }
tags: [terraform, iac, composite, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Composite: Fractaled Architecture

The **Composite** pattern allows the Alchemist to treat individual elements and complex trees of elements identically. In Terraform, this often involves taking deeply nested hierarchical variables (like a VPC and its associated subnets) and flattening them into a single-dimensional map for resource creation.

Using the arcane `flatten()` function paired with nested `for` loops, the Archmage unfurls the fractal. The resulting structure allows the user to declare vast, multi-layered network topologies as a single conceptual variable block, while Terraform processes them as distinct, manageable entities.
