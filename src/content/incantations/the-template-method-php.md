---
title: "The Template Method Framework"
description: "Define the skeleton of an algorithm in the superclass but let subclasses override specific steps."
type: php
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Conjuration // Frameworks
formula: |
  <?php
  
  namespace Tekromancy\WebChaos;
  
  abstract class DataMiner {
      // The template method
      public final function mine(string $path): void {
          $file = $this->openFile($path);
          $data = $this->extractData($file);
          $this->analyze($data);
          $this->closeFile($file);
      }
  
      abstract protected function extractData(string $file): string;
  
      protected function openFile(string $path): string { return "Opened $path"; }
      protected function analyze(string $data): void { echo "Analyzing $data\n"; }
      protected function closeFile(string $file): void { echo "Closed $file\n"; }
  }
  
  class CsvMiner extends DataMiner {
      protected function extractData(string $file): string { return "CSV Data from $file"; }
  }
  
tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method Framework

When processing artifacts of chaotic origins, the overall ritual must remain strict. The Template Method secures the algorithmic skeleton in the abstract parent class, only allowing the sub-classes to override specific extraction rituals. The Elephant's Curse cannot corrupt the order of operations here.
