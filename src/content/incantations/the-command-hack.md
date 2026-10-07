---
title: Encapsulating the Cyber Command
description: Turn social disruptions into standalone executable objects.
type: hack
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation Packaging"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Command;

  interface ISocialCommand {
    public function execute(): void;
  }

  class GraphAPIReceiver {
    public function severConnection(string $nodeId): void {
      echo "Connection to {$nodeId} severed.\n";
    }
  }

  class DisruptNodeCommand implements ISocialCommand {
    public function __construct(
      private GraphAPIReceiver $api, 
      private string $targetNodeId
    ) {}

    public function execute(): void {
      $this->api->severConnection($this->targetNodeId);
    }
  }

  class CommandQueue {
    private vec<ISocialCommand> $queue = vec[];

    public function push(ISocialCommand $cmd): void { 
      $this->queue[] = $cmd; 
    }

    public function executeAll(): void {
      foreach ($this->queue as $cmd) { 
        $cmd->execute(); 
      }
    }
  }
tags: [hack, command, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Queue of Retribution

Directly invoking destructive or restorative operations against a social graph locks you into synchronous, immediate actions. By using the **Command** pattern, an action like severing a connection is encapsulated entirely within an object containing both the receiver reference and the specific arguments.

This enables queued execution, logging of operations, and the potential for a temporal reversal mechanism if the cyber-command executes in error.
