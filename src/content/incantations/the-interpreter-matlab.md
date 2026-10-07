---
title: The Interpreter of Arcane Syntax
description: Evaluate a specialized magical language for symbolic mathematics.
type: matlab
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  classdef (Abstract) ArcaneExpression
      methods (Abstract)
          result = interpret(obj, context)
      end
  end

  classdef MatrixMultiplyExpression < ArcaneExpression
      properties
          Left
          Right
      end
      methods
          function obj = MatrixMultiplyExpression(l, r)
              obj.Left = l;
              obj.Right = r;
          end
          function result = interpret(obj, context)
              result = obj.Left.interpret(context) * obj.Right.interpret(context);
          end
      end
  end
tags: [interpreter, language, symbolic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# Interpreter

When base MATLAB syntax falls short, the magus weaves their own parser for multidimensional intent.
