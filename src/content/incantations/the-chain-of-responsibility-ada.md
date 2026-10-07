---
title: The Chain of Responsibility Incantation
description: Passing anomaly detection through a mathematical sequence of DoD ward handlers.
type: ada
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Abjuration // Event Handling
formula: |
  package Ward_Chains is
  
     type Anomaly_Level is (Low, Medium, Critical, Omega);
     
     type Handler is abstract tagged record
        Next_Handler : access Handler'Class;
     end record;
     
     procedure Handle_Anomaly (H : in Handler; Level : Anomaly_Level) is abstract;
     
     type Kinetic_Handler is new Handler with null record;
     overriding procedure Handle_Anomaly (H : in Kinetic_Handler; Level : Anomaly_Level);
     
  end Ward_Chains;
  
  package body Ward_Chains is
     procedure Handle_Anomaly (H : in Kinetic_Handler; Level : Anomaly_Level) is
     begin
        if Level = Low then
           null; -- Intercept kinetic strike
        elsif H.Next_Handler /= null then
           Handle_Anomaly (H.Next_Handler.all, Level);
        end if;
     end Handle_Anomaly;
  end Ward_Chains;
tags: [ada, abjuration, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Anomalies strike the shield with varying frequencies. Instead of a monolithic detection grid, the Chain of Responsibility routes the disturbance through a hierarchy of specific elemental interceptors, resolving the threat precisely when capable, or delegating it deeper into the matrix.
