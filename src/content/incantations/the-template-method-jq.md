---
title: The Template Method (jq)
description: Define the skeletal framework of a spell, allowing subclasses to fill in the dark matter.
type: jq
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Formation"
formula: |2
  # The overarching template algorithm
  def template_process(extract; transform; load):
    extract | transform | load;

  # Specific implementations
  def extract_logs: .logs[];
  def transform_uppercase: .message |= ascii_upcase;
  def load_to_stdout: { "out": .message };

  # Execution using the template
  template_process(extract_logs; transform_uppercase; load_to_stdout)
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Template Method** provides the invariant structure of an algorithm—a grand arcane ritual that cannot be altered. However, the specific steps of the ritual are passed in as high-order functions. This allows for infinite variations of extraction, transformation, and loading, while honoring the eternal skeletal framework.
