---
title: The Factory Method
description: Defer the instantiation of specific elemental resources to the local invocations, maintaining a standardized casting interface.
type: terraform
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Evocation"
formula: |2
  variable "construct_type" {
    type        = string
    description = "Type of construct: 'golem' or 'familiar'"
  }
  
  locals {
    is_golem    = var.construct_type == "golem"
    is_familiar = var.construct_type == "familiar"
    
    instance_type = local.is_golem ? "m5.large" : "t3.micro"
    ami           = local.is_golem ? "ami-heavy" : "ami-light"
  }
  
  resource "aws_instance" "summoned_entity" {
    ami           = local.ami
    instance_type = local.instance_type
    
    tags = {
      Type = var.construct_type
    }
  }
tags: [terraform, iac, factory-method, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method: Summoning by Name

A true summoner does not bother with the exact anatomical details of every spirit they call forth. Through the **Factory Method**, the caster simply requests a broader category of construct—such as a heavily-armored *golem* or a swift *familiar*.

In the realm of Terraform, this is achieved by mapping a simple input variable into complex, resource-specific attributes within `locals`. The actual `aws_instance` resource acts as the factory template, molding its shape (`instance_type`, `ami`) based on the requested classification. This abstraction spares the apprentice from memorizing instance sizing charts, replacing it with pure, semantic intent.
