---
title: "The Adapter: The Analog-to-Digital Ley Translator"
description: "Bridging the chasm between ancient analog signaling and modern digital switching matrices."
type: chill
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  ADAPTER_HEX: MODULE
    GRANT DIGITAL_SEND;
    
    /* The ancient analog interface we must adapt */
    ANALOG_SYSTEM: MODULE
      GRANT ANALOG_TRANSMIT;
      ANALOG_TRANSMIT: PROCEDURE (voltage INT, duration INT);
        /* Emits raw voltage over copper wires */
      END ANALOG_TRANSMIT;
    END ANALOG_SYSTEM;
    
    /* The modern digital interface */
    NEWMODE PACKET = STRUCT ( payload INT, header INT );
    
    /* The Adapter Procedure */
    DIGITAL_SEND: PROCEDURE (p PACKET);
      DCL voltage_level INT;
      DCL duration_ms INT;
      
      /* Translate packet headers into voltage amplitudes */
      voltage_level := p.payload MOD 255;
      duration_ms := p.header * 10;
      
      /* Invoke the ancient system */
      ANALOG_TRANSMIT(voltage_level, duration_ms);
    END DIGITAL_SEND;
  END ADAPTER_HEX;
tags: [telecom, chill, adapter, translation, switching-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter hex allows incompatible interfaces to collaborate. Deep beneath the city, the telecom infrastructure is layered with centuries of technology. When the modern crystal-matrix routers must send a signal through the forgotten copper veins of the Old Grid, the Adapter ritual translates digital payloads into raw, analog voltage pulses, ensuring the flow of data remains unbroken.
