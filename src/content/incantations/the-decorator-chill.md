---
title: "The Decorator: Enveloping the Signal with Wards"
description: "Dynamically layering cryptographic wards and error-correction hexes around a base signal."
type: chill
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Shielding"
formula: |2
  DECORATOR_HEX: MODULE
    GRANT PROCESS_SIGNAL;
    
    NEWMODE SIGNAL_T = STRUCT ( payload CHAR(255) );
    
    BASE_PROCESS: PROCEDURE (sig SIGNAL_T) RETURNS (SIGNAL_T);
      /* Base transmission logic */
      RETURN sig;
    END BASE_PROCESS;
    
    /* Decorator 1: Cryptographic Ward */
    ENCRYPT_PROCESS: PROCEDURE (sig SIGNAL_T) RETURNS (SIGNAL_T);
      DCL modified_sig SIGNAL_T;
      modified_sig.payload := 'ENC[' // sig.payload // ']';
      RETURN BASE_PROCESS(modified_sig);
    END ENCRYPT_PROCESS;
    
    /* Decorator 2: Error Correction Sigil */
    CHECKSUM_PROCESS: PROCEDURE (sig SIGNAL_T) RETURNS (SIGNAL_T);
      DCL modified_sig SIGNAL_T;
      modified_sig.payload := sig.payload // '_CHK';
      /* Chain decorators: Checksum wraps Encrypt */
      RETURN ENCRYPT_PROCESS(modified_sig);
    END CHECKSUM_PROCESS;
    
    PROCESS_SIGNAL: PROCEDURE (raw_sig SIGNAL_T) RETURNS (SIGNAL_T);
      /* Apply layers of decoration dynamically */
      RETURN CHECKSUM_PROCESS(raw_sig);
    END PROCESS_SIGNAL;
  END DECORATOR_HEX;
tags: [telecom, chill, decorator, shielding, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Decorator hex dynamically attaches additional responsibilities to an object. In the perilous currents of the cyberpunk datasphere, a raw signal is never safe. We must wrap it in cryptographic wards and error-correction sigils. By nesting the transmission procedures, we decorate the core signal with layered defenses before it breaches the outer network.
