---
title: The Command
description: Encapsulating build instructions into executable, hermetic tokens.
type: starlark
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  def create_build_command(target_name, action_func, **kwargs):
      def _execute():
          # Executes the enclosed action with the captured arguments
          return action_func(target_name, **kwargs)
      return struct(
          target = target_name,
          execute = _execute
      )
  
  def _compile_action(name, opt_level):
      return "Compiling %s at -O%d" % (name, opt_level)
  
  # Usage
  cmd1 = create_build_command("core_lib", _compile_action, opt_level=3)
  cmd2 = create_build_command("utils", _compile_action, opt_level=1)
  
  # The invoker can execute them blindly later
  queue = [cmd1, cmd2]
  results = [cmd.execute() for cmd in queue]
tags: [behavioral, starlark, hermetic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Command** pattern is vital for Starlark rule implementations that must plan actions during an analysis phase, but defer the actual semantic meaning of those actions until they are sequentially processed. By bundling a function and its arguments into a struct wrapper, mages can create queues, undo-stacks, or job pools of build commands that are completely agnostic to the underlying implementations they encapsulate.
