---
title: The Template Method of Deployment
description: Defining the skeleton of an algorithm while deferring steps to hooks.
type: script
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Skeletonmancy"
formula: |2
  #!/usr/bin/env bash

  # The Template Method
  deploy_cyber_artifact() {
    echo "--- Initiating Deployment ---"
    hook_pre_flight
    echo "Transferring core bytes..."
    hook_install
    echo "Validating integrity..."
    hook_post_flight
    echo "--- Deployment Complete ---"
  }

  # Default hook implementations (can be overridden)
  hook_pre_flight() { :; }
  hook_install() { echo "Default install..."; }
  hook_post_flight() { :; }

  # Concrete Implementation (Overrides)
  deploy_stealth_implant() {
    hook_pre_flight() { echo "[Stealth] Disabling logs..."; }
    hook_install() { echo "[Stealth] Injecting into kernel space..."; }
    hook_post_flight() { echo "[Stealth] Wiping tracks..."; }

    # Run the template
    deploy_cyber_artifact
  }

  # Usage
  deploy_stealth_implant
tags: [bash, template-method, behavioral, hooks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the structure of a deployment must remain rigid but the specifics must vary, the Template Method provides the solution. The master function outlines the skeleton, calling out to loosely defined 'hooks'. By redefining these hooks before executing the template, the scriptmancer customizes the payload without altering the deployment ritual.
