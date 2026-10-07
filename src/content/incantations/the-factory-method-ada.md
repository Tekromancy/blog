---
title: The Factory Method Incantation
description: Delegating the instantiation of specific defensive protocols to subclasses.
type: ada
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Abjuration // Tactical Deployment
formula: |
  package Protocol_Generators is
  
     type Ward_Protocol is abstract tagged null record;
     procedure Execute (W : in Ward_Protocol) is abstract;
     
     type Protocol_Creator is abstract tagged null record;
     function Create_Protocol (C : Protocol_Creator) return Ward_Protocol'Class is abstract;
     
     procedure Deploy (C : Protocol_Creator'Class);
     
  end Protocol_Generators;
  
  package body Protocol_Generators is
     procedure Deploy (C : Protocol_Creator'Class) is
        Protocol : Ward_Protocol'Class := Create_Protocol(C);
     begin
        Execute(Protocol);
     end Deploy;
  end Protocol_Generators;
tags: [ada, abjuration, deployment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
By utilizing the Factory Method, a grand tactician can define the skeletal framework for ward deployment, while deferring the exact instantiation of the protective runes to specific, context-aware subclass implementations.
