---
title: The Adapter
description: Translate arcane inputs from legacy systems into the refined structure required by modern incantations.
type: terraform
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Formatting"
formula: |2
  # The legacy input format
  variable "legacy_server_list" {
    type = list(string)
    default = ["web-1,t2.micro", "db-1,t2.large"]
  }
  
  # The Adapter transforms the list of strings into a map of objects
  locals {
    adapted_servers = {
      for s in var.legacy_server_list :
      split(",", s)[0] => {
        instance_type = split(",", s)[1]
      }
    }
  }
  
  # The modern module expects the adapted map
  module "modern_compute" {
    source   = "./modules/compute"
    for_each = local.adapted_servers
    
    name          = each.key
    instance_type = each.value.instance_type
  }
tags: [terraform, iac, adapter, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Adapter: Sigil Translation

Often, an Infrastructure Alchemist must integrate with ancient scrolls (legacy systems) that output data in crude formats. To directly feed this raw data into modern, highly-structured modules would invite chaos. 

The **Adapter** pattern in Terraform is heavily reliant on `locals` and `for` expressions. It intercepts the incoming string arrays or un-typed maps and elegantly transmutes them into strongly-typed objects or maps. This creates a clean boundary layer, ensuring that the core modules remain pure and unaffected by the messy realities of the external world.
