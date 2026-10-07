---
title: "The Interpreter Lexicon"
description: "Define a grammatical representation to decipher arcane web queries."
type: php
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  interface Expression {
      public function interpret(array $context): bool;
  }

  class TerminalExpression implements Expression {
      public function __construct(private string $data) {}
      public function interpret(array $context): bool {
          return in_array($this->data, $context);
      }
  }

  class OrExpression implements Expression {
      public function __construct(private Expression $expr1, private Expression $expr2) {}
      public function interpret(array $context): bool {
          return $this->expr1->interpret($context) || $this->expr2->interpret($context);
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Interpreter Lexicon

When custom configuration languages and domain-specific chaos emerge, standard parsers fail. The Interpreter Lexicon maps language grammar to class hierarchies, turning sentences like `(Admin OR SuperUser)` into easily evaluated structures within the aether.
