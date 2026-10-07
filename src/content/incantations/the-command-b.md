---
title: "The Command"
description: "Reifying an ancient action into a stored memory word for later execution."
type: b
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Channeling"
formula: |2
  /* A command structure: [execute_func, target_arg] */

  strike_target(target) {
      putchar('S'); putchar(target);
  }

  bind_command(cmd_node, target) {
      cmd_node[0] = strike_target;
      cmd_node[1] = target;
  }

  trigger_rune(cmd_node) {
      auto func;
      func = cmd_node[0];
      func(cmd_node[1]);
  }

  delayed_violence() {
      auto cmd[2];
      bind_command(cmd, 'X');

      /* Time passes... */
      trigger_rune(cmd);
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
