---
title: The Primordial Command
description: Encapsulating absolute will as a tangible, executed artifact.
type: c
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct Command Command;
  struct Command {
      void (*execute)(Command* self);
      void (*undo)(Command* self);
  };

  // Concrete Command Data
  typedef struct {
      Command base;
      int portal_id;
  } OpenPortalCommand;

  void execute_portal(Command* self) {
      OpenPortalCommand* cmd = (OpenPortalCommand*)self;
      printf("Portal %d opened.\n", cmd->portal_id);
  }

  void undo_portal(Command* self) {
      OpenPortalCommand* cmd = (OpenPortalCommand*)self;
      printf("Portal %d closed.\n", cmd->portal_id);
  }

  Command* create_portal_command(int id) {
      OpenPortalCommand* cmd = malloc(sizeof(OpenPortalCommand));
      cmd->base.execute = execute_portal;
      cmd->base.undo = undo_portal;
      cmd->portal_id = id;
      return (Command*)cmd;
  }

  int main() {
      Command* cmd = create_portal_command(404);
      
      cmd->execute(cmd);
      // Wait for conditions...
      cmd->undo(cmd);
      
      free(cmd);
      return 0;
  }
tags: [c, behavioral, command, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Primordial Command traps an invocation within an impenetrable vessel. An instruction to alter reality is constructed, suspended, and then executed or inverted at precisely the required celestial cycle. It detaches the invoker from the exact execution logic.
