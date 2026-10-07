---
title: The Abstract Factory
description: Conjure entire realms of infrastructure based on high-level alignments, swapping between elemental cloud providers seamlessly.
type: terraform
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Transmutation"
formula: |2
  # The Archmage specifies the realm alignment (AWS vs GCP)
  variable "realm_provider" {
    type    = string
    default = "aws"
  }
  
  # The factory decides which elemental module to manifest
  module "aws_realm" {
    source = "./modules/aws-realm"
    count  = var.realm_provider == "aws" ? 1 : 0
  }
  
  module "gcp_realm" {
    source = "./modules/gcp-realm"
    count  = var.realm_provider == "gcp" ? 1 : 0
  }
  
  output "realm_core" {
    value = var.realm_provider == "aws" ? module.aws_realm[0].core_id : module.gcp_realm[0].core_id
  }
tags: [terraform, iac, creational, infrastructure-alchemy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Abstract Factory: Cross-Realm Conjuration

In the ancient arts of Infrastructure Alchemy, there comes a time when an Archmage must deploy arcane constructs across multiple elemental planes—such as AWS and GCP. To bind oneself entirely to one plane is a folly of the uninitiated.

The **Abstract Factory** incantation allows a master to forge a single sigil (the variable `realm_provider`) that dictates the entire composition of the manifestation. By hiding the direct conjuration behind conditional module invocations, the caster retains absolute flexibility. When the dimensional tides shift, the Archmage simply alters the `realm_provider` rune, and the infrastructure transits across planes without shattering the overarching architectural glyph.
