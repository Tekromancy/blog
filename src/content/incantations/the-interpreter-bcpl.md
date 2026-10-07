---
title: The Interpreter of Whispers
description: Parse the incomprehensible grammar of the Ancestral Void into actionable magicks.
type: bcpl
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  GET "libhdr"

  // Grammar: A = "Dark", B = "Light", expression parses combination
  LET InterpretWhisper(whisperStr, len) = VALOF $(
    LET score = 0
    FOR i = 1 TO len DO $(
      LET ch = whisperStr%i
      IF ch = 'D' THEN score := score - 10
      IF ch = 'L' THEN score := score + 10
    $)
    RESULTIS score
  $)

  LET START() BE $(
    LET w1 = "DDDDL"
    LET w2 = "LLD"
    
    writef("Whisper '%s' alignment score: %d*n", w1, InterpretWhisper(w1, 5))
    writef("Whisper '%s' alignment score: %d*n", w2, InterpretWhisper(w2, 3))
  $)
tags: [interpreter, linguistics, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
