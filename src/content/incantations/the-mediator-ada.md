---
title: The Mediator Incantation
description: Centralizing complex communications between chaotic ward sub-components.
type: ada
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Abjuration // Subsystem Regulation
formula: |
  package Ward_Mediators is
  
     type Mediator is abstract tagged null record;
     procedure Notify (M : in Mediator; Sender : String; Event : String) is abstract;
     
     type Colleague is abstract tagged record
        Med : access Mediator'Class;
     end record;
     
     type Concrete_Mediator is new Mediator with null record;
     overriding procedure Notify (M : in Concrete_Mediator; Sender : String; Event : String);
     
  end Ward_Mediators;
  
  package body Ward_Mediators is
     procedure Notify (M : in Concrete_Mediator; Sender : String; Event : String) is
     begin
        null; -- Handle intricate cross-ward communications to prevent feedback loops
     end Notify;
  end Ward_Mediators;
tags: [ada, abjuration, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a perimeter ward flashes, it cannot blindly yell into the void. It speaks to the Mediator. This central intelligence decides if the kinetic dampeners should engage or if the energy absorbers should take the brunt, preventing a cascade failure from cross-talk.
