---
title: "The Command Invocation"
description: "Encapsulate a chaotic action as an object to log, queue, or reverse."
type: php
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  <?php

  namespace Tekromancy\WebChaos;

  interface ChaosCommand {
      public function execute(): void;
      public function undo(): void;
  }

  class PurgeCacheCommand implements ChaosCommand {
      public function __construct(private string $target) {}

      public function execute(): void { echo "Purging cache: $this->target\n"; }
      public function undo(): void { echo "Restoring cache: $this->target\n"; }
  }

  class Invoker {
      private array $history = [];

      public function executeCommand(ChaosCommand $cmd): void {
          $cmd->execute();
          $this->history[] = $cmd;
      }

      public function rollback(): void {
          $cmd = array_pop($this->history);
          if ($cmd) $cmd->undo();
      }
  }

tags: [web-chaos-magic, elephants-curse, php8]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command Invocation

To survive the web's rapid mutations, raw function calls are insufficient. Wrapping the action in a `ChaosCommand` binds its essence, allowing it to be queued for deferred execution by a daemon, or rolled back entirely when a spell backfires.
