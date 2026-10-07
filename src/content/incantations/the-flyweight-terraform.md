---
title: The Flyweight
description: Conserve ethereal memory by centralizing and sharing common tags and configurations across thousands of constructs.
type: terraform
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  # The shared Flyweight state
  locals {
    common_tags = {
      ManagedBy   = "Terraform"
      Environment = terraform.workspace
      CostCenter  = "Alchemy-Div-7"
      Project     = "Project-Ouroboros"
    }
  }
  
  resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"
    tags       = merge(local.common_tags, { Name = "main-vpc" })
  }
  
  resource "aws_subnet" "public" {
    vpc_id     = aws_vpc.main.id
    cidr_block = "10.0.1.0/24"
    tags       = merge(local.common_tags, { Name = "public-subnet", Tier = "Public" })
  }
  
  resource "aws_instance" "web" {
    ami           = "ami-123"
    instance_type = "t2.micro"
    tags          = merge(local.common_tags, { Name = "web-server" })
  }
tags: [terraform, iac, flyweight, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Flyweight: Shared Essences

In heavy incantations, rewriting the exact same properties—such as organizational tags—across hundreds of resources bloats the code and invites inconsistencies. The **Flyweight** pattern addresses the need to efficiently share massive amounts of identical state.

In Terraform, the Flyweight is instantiated as a `locals` block containing the standard `common_tags` or shared configuration objects. By utilizing the `merge()` function, the caster applies this shared essence to every resource, tacking on only the unique, resource-specific attributes at the end. This keeps the codebase incredibly lean and ensures that updating the Cost Center updates the entire realm simultaneously.
