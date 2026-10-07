---
title: The Command Scroll
description: Encapsulating a request as an object, allowing parameterization of clients with queues.
type: csharp
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stored Intent"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public interface ISpellCommand
      {
          void Execute();
          void Undo();
      }

      public class TeleportCommand : ISpellCommand
      {
          private string _previousLocation = "Home";
          public void Execute() => Console.WriteLine("Teleporting to Astral Plane.");
          public void Undo() => Console.WriteLine($"Reverting teleport to {_previousLocation}.");
      }

      public class SpellInvoker
      {
          private readonly Stack<ISpellCommand> _history = new();

          public void Cast(ISpellCommand command)
          {
              command.Execute();
              _history.Push(command);
          }

          public void RewindTime()
          {
              if (_history.Count > 0)
              {
                  var cmd = _history.Pop();
                  cmd.Undo();
              }
          }
      }
  }
tags: [behavioral, command, undo, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Command pattern captures an invocation into a concrete scroll. This stored intent allows for delayed execution, robust logging, and even the chronomantic ability to step backward through time by undoing applied magic.
