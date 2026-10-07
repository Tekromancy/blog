---
title: The Decorator
description: Wrap base modules with layers of auxiliary magic, enhancing them with observability and security without altering their core essence.
type: terraform
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  variable "base_function_name" {
    type = string
  }
  
  # The Core Module
  module "lambda_core" {
    source        = "./modules/lambda_base"
    function_name = var.base_function_name
  }
  
  # The Decorator: Adding an API Gateway trigger
  resource "aws_apigatewayv2_api" "decorator_api" {
    name          = "${var.base_function_name}-api"
    protocol_type = "HTTP"
    target        = module.lambda_core.function_arn
  }
  
  # The Decorator: Adding CloudWatch Alarms
  resource "aws_cloudwatch_metric_alarm" "decorator_alarm" {
    alarm_name          = "${var.base_function_name}-errors"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods  = 1
    metric_name         = "Errors"
    namespace           = "AWS/Lambda"
    period              = 60
    statistic           = "Sum"
    threshold           = 1
    dimensions = {
      FunctionName = module.lambda_core.function_name
    }
  }
tags: [terraform, iac, decorator, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator: Layered Enchantments

In the pursuit of perfect infrastructure, there is a temptation to bloat core modules with every possible feature—logging, alerting, routing. The **Decorator** pattern teaches restraint. Keep the core module pure and focused solely on its primary task.

In Terraform, a Decorator is a parent module or a set of resources that wraps a child module. It takes the outputs of the core module (like an ARN or an ID) and attaches external enhancements. In this spell, a raw Lambda function is decorated with an HTTP API gateway and a CloudWatch error alarm. The inner Lambda module knows nothing of these wards, remaining lightweight and universally reusable.
