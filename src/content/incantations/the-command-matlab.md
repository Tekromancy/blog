---
title: The Command of Encapsulated Runes
description: Encapsulate a matrix operation as an object, allowing for undoable spellcasts.
type: matlab
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Divination // Execution"
formula: |2
  classdef (Abstract) SpellCommand < handle
      methods (Abstract)
          execute(obj)
          undo(obj)
      end
  end

  classdef InvertMatrixCommand < SpellCommand
      properties
          Target
          PreviousState
      end
      methods
          function obj = InvertMatrixCommand(target)
              obj.Target = target;
          end
          function execute(obj)
              obj.PreviousState = obj.Target.Data;
              obj.Target.Data = inv(obj.Target.Data);
          end
          function undo(obj)
              obj.Target.Data = obj.PreviousState;
          end
      end
  end
tags: [command, execution, undo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# Command

Capture the intent of a spell in a crystalline command, perfectly preserving the ability to reverse time.
