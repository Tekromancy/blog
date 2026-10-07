---
title: "The Interpreter Lexicon"
description: "Parsing and executing ancient runic grammars."
type: eiffel
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  deferred class
      RUNE_EXPRESSION

  feature
      interpret (context: SPELL_CONTEXT): BOOLEAN
          deferred
          end
  end

  class
      TERMINAL_RUNE

  inherit
      RUNE_EXPRESSION

  feature
      interpret (context: SPELL_CONTEXT): BOOLEAN
          do
              -- evaluate literal rune meaning
              Result := True
          end
  end
tags: [behavioral, interpreter, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
The Interpreter maps out the grammar of forgotten tongues, turning strings of archaic text into executable, logical constructs within the local context.
