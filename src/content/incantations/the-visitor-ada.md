---
title: The Visitor Incantation
description: Adding new diagnostic operations to a ward matrix without altering its classes.
type: ada
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Abjuration // Diagnostics
formula: |
  package Ward_Visitors is
  
     type Node_A;
     type Node_B;
     
     type Visitor is abstract tagged null record;
     procedure Visit_Node_A (V : in Visitor; N : in Node_A) is abstract;
     procedure Visit_Node_B (V : in Visitor; N : in Node_B) is abstract;
     
     type Element is abstract tagged null record;
     procedure Accept (E : in Element; V : in Visitor'Class) is abstract;
     
     type Node_A is new Element with null record;
     overriding procedure Accept (E : in Node_A; V : in Visitor'Class);
     
     type Node_B is new Element with null record;
     overriding procedure Accept (E : in Node_B; V : in Visitor'Class);
     
     type Diagnostic_Visitor is new Visitor with null record;
     overriding procedure Visit_Node_A (V : in Diagnostic_Visitor; N : in Node_A);
     overriding procedure Visit_Node_B (V : in Diagnostic_Visitor; N : in Node_B);
     
  end Ward_Visitors;
  
  package body Ward_Visitors is
     procedure Accept (E : in Node_A; V : in Visitor'Class) is
     begin
        Visit_Node_A (V, E);
     end Accept;
     
     procedure Accept (E : in Node_B; V : in Visitor'Class) is
     begin
        Visit_Node_B (V, E);
     end Accept;
     
     procedure Visit_Node_A (V : in Diagnostic_Visitor; N : in Node_A) is begin null; end;
     procedure Visit_Node_B (V : in Diagnostic_Visitor; N : in Node_B) is begin null; end;
  end Ward_Visitors;
tags: [ada, abjuration, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A hardened shield matrix should rarely be modified, but its diagnostics must constantly evolve. The Visitor pattern lets DoD inspectors send new diagnostic probes through the matrix, calculating power draw or harmonic integrity without ever touching the core ward code.
