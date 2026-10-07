---
title: The Chain of Responsibility
description: Create cascading fallbacks for lookups, ensuring that if a primary query fails, secondary and tertiary sources are consulted.
type: terraform
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Cascading Lookups"
formula: |2
  variable "requested_ami" {
    type    = string
    default = ""
  }
  
  # Link 1: Direct user input
  # Link 2: SSM Parameter Store
  data "aws_ssm_parameter" "default_ami" {
    name = "/infrastructure/default_ami"
  }
  
  # Link 3: Hardcoded fallback
  locals {
    hardcoded_fallback = "ami-0abcdef1234567890"
    
    # The Chain resolves the final value
    final_ami = coalesce(
      var.requested_ami != "" ? var.requested_ami : null,
      data.aws_ssm_parameter.default_ami.value != "" ? data.aws_ssm_parameter.default_ami.value : null,
      local.hardcoded_fallback
    )
  }
  
  resource "aws_instance" "server" {
    ami           = local.final_ami
    instance_type = "t3.micro"
  }
tags: [terraform, iac, chain-of-responsibility, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility: The Cascading Divination

When divining the exact parameters for a spell—such as which Amazon Machine Image to use—relying on a single source of truth is brittle. What if the user forgets to provide it? What if the parameter store is empty? 

The **Chain of Responsibility** pattern establishes a series of handlers. In Terraform, this is elegantly achieved using the `coalesce()` function. It evaluates a list of expressions and returns the first non-null, non-empty value. The magic flows through the user's explicit command first, falls back to a central registry if absent, and finally settles on a hardcoded safety net. The spell will not fail due to a single missing link.
