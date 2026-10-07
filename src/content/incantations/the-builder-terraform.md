---
title: The Builder
description: Construct monolithic arcane fortresses step-by-step through dynamic block weaving and intricate variable mapping.
type: terraform
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  variable "fortress_specs" {
    type = object({
      name          = string
      towers        = number
      moat_enabled  = bool
      magic_wards   = map(string)
    })
  }
  
  resource "aws_vpc" "fortress" {
    cidr_block = "10.0.0.0/16"
    tags = {
      Name = var.fortress_specs.name
    }
  }
  
  resource "aws_subnet" "towers" {
    count      = var.fortress_specs.towers
    vpc_id     = aws_vpc.fortress.id
    cidr_block = cidrsubnet(aws_vpc.fortress.cidr_block, 8, count.index)
  }
  
  resource "aws_security_group" "wards" {
    vpc_id = aws_vpc.fortress.id
    
    dynamic "ingress" {
      for_each = var.fortress_specs.magic_wards
      content {
        description = ingress.key
        from_port   = ingress.value
        to_port     = ingress.value
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
      }
    }
  }
tags: [terraform, iac, builder, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder: Fortresses of the Immutable

The **Builder** pattern in Infrastructure Alchemy is utilized to separate the construction of a complex magical construct from its representation. In Terraform, this is achieved through complex object variables and `dynamic` blocks.

Instead of writing thousands of lines of static HCL for each fortress, the Adept provides a blueprint (a variable of complex type). The Terraform module then reads this blueprint, weaving the towers (subnets) and wards (security group rules) step-by-step. The `dynamic` block is the hammer and anvil of the Builder, forging repetitive nested structures without the need to duplicate the raw incantation.
