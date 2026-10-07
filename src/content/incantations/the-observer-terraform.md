---
title: The Observer
description: Wire automated reflexes into the realm so that when one construct alters its state, others immediately react.
type: terraform
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  # The Subject (Publisher)
  resource "aws_s3_bucket" "arcane_drop" {
    bucket = "incoming-artifacts"
  }
  
  # The Observer (Subscriber)
  resource "aws_sns_topic" "artifact_alerts" {
    name = "artifact-alerts-topic"
  }
  
  # The Telepathic Link
  resource "aws_s3_bucket_notification" "bucket_notification" {
    bucket = aws_s3_bucket.arcane_drop.id
  
    topic {
      topic_arn     = aws_sns_topic.artifact_alerts.arn
      events        = ["s3:ObjectCreated:*"]
      filter_suffix = ".md"
    }
  }
tags: [terraform, iac, observer, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Observer: Telepathic Wards

A truly living infrastructure does not wait for a human to poll its status. It actively broadcasts its shifts in reality. The **Observer** pattern establishes a publish-subscribe dependency between objects.

In Terraform, while the code itself is static, it is perfectly suited to provision the cloud's native Observer mechanisms. By linking an S3 Bucket (the Subject) to an SNS Topic (the Observer) via a `bucket_notification` resource, the Alchemist creates an event-driven reflex. When a new manuscript `.md` file is dropped into the bucket, the bucket notifies the topic, which in turn can awaken Lambda functions or alert sleeping engineers. The resources are bound by event logic rather than hardcoded invocation.
