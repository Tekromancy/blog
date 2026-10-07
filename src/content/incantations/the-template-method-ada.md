---
title: The Template Method Incantation
description: Defining the skeleton of a warding ritual, allowing subclasses to provide the steps.
type: ada
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Abjuration // Ritual Frameworks
formula: |
  package Ritual_Templates is
  
     type Ritual is abstract tagged null record;
     procedure Cast_Ritual (R : in Ritual);
     
     procedure Purify_Area (R : in Ritual) is abstract;
     procedure Draw_Circle (R : in Ritual) is abstract;
     procedure Ignite_Lines (R : in Ritual) is abstract;
     
     type Aegis_Ritual is new Ritual with null record;
     overriding procedure Purify_Area (R : in Aegis_Ritual);
     overriding procedure Draw_Circle (R : in Aegis_Ritual);
     overriding procedure Ignite_Lines (R : in Aegis_Ritual);
     
  end Ritual_Templates;
  
  package body Ritual_Templates is
     procedure Cast_Ritual (R : in Ritual) is
     begin
        Purify_Area (R);
        Draw_Circle (R);
        Ignite_Lines (R);
     end Cast_Ritual;
     
     procedure Purify_Area (R : in Aegis_Ritual) is begin null; end;
     procedure Draw_Circle (R : in Aegis_Ritual) is begin null; end;
     procedure Ignite_Lines (R : in Aegis_Ritual) is begin null; end;
  end Ritual_Templates;
tags: [ada, abjuration, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The DoD standardizes all magical deployments. The Template Method enforces the strict order of operations for a ritual—purify, draw, ignite—while allowing specialized field mages to override how each step manifests, guaranteeing the core protocol is never broken.
