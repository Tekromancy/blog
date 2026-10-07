---
title: "The Flyweight: The Shared Lexicon of Tones"
description: "Conserving ethereal memory by sharing intrinsic properties across millions of signal tones."
type: chill
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Compression"
formula: |2
  FLYWEIGHT_HEX: MODULE
    GRANT GET_TONE, PLAY_TONE;
    
    NEWMODE TONE_TYPE = SET (DIAL, BUSY, RING, ERROR);
    
    /* Intrinsic State (Shared) */
    NEWMODE TONE_DEF = STRUCT (
      freq1 INT,
      freq2 INT,
      cadence CHAR(20)
    );
    
    DCL tone_cache ARRAY (TONE_TYPE) TONE_DEF;
    DCL cache_initialized BOOL INIT := FALSE;
    
    INIT_CACHE: PROCEDURE ();
      tone_cache(DIAL) := [350, 440, 'CONTINUOUS'];
      tone_cache(BUSY) := [480, 620, 'ON_OFF_500MS'];
      tone_cache(RING) := [440, 480, 'ON_2S_OFF_4S'];
      tone_cache(ERROR) := [0, 0, 'SILENCE'];
      cache_initialized := TRUE;
    END INIT_CACHE;
    
    GET_TONE: PROCEDURE (t TONE_TYPE) RETURNS (TONE_DEF);
      IF NOT cache_initialized THEN INIT_CACHE(); FI;
      RETURN tone_cache(t);
    END GET_TONE;
    
    /* Extrinsic State (Passed in) */
    PLAY_TONE: PROCEDURE (t TONE_TYPE, line_id INT, volume INT);
      DCL def TONE_DEF;
      def := GET_TONE(t);
      /* Apply intrinsic frequencies with extrinsic line and volume */
    END PLAY_TONE;
  END FLYWEIGHT_HEX;
tags: [telecom, chill, flyweight, compression, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Flyweight hex minimizes memory usage by sharing as much data as possible with similar objects. When millions of active lines require Dual-Tone Multi-Frequency (DTMF) generation, creating unique objects for each tone would drain the central matrix's mana. By sharing the intrinsic definitions of frequencies and cadences, and passing the extrinsic line ID dynamically, we optimize the spectral footprint.
