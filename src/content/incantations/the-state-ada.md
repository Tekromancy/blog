---
title: The State Incantation
description: Altering a shield's behavior dynamically based on its internal threat level state.
type: ada
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Abjuration // Stance Shifting
formula: |
  package Shield_States is
  
     type State is abstract tagged null record;
     procedure Handle_Threat (S : in State) is abstract;
     
     type Context is tagged record
        Current_State : access State'Class;
     end record;
     
     procedure Request_Action (C : in Context);
     
     type Passive_State is new State with null record;
     overriding procedure Handle_Threat (S : in Passive_State);
     
     type Active_Combat_State is new State with null record;
     overriding procedure Handle_Threat (S : in Active_Combat_State);
     
  end Shield_States;
  
  package body Shield_States is
     procedure Request_Action (C : in Context) is
     begin
        if C.Current_State /= null then
           Handle_Threat (C.Current_State.all);
        end if;
     end Request_Action;
     
     procedure Handle_Threat (S : in Passive_State) is
     begin
        null; -- Minimal power draw, stealth mode
     end Handle_Threat;
     
     procedure Handle_Threat (S : in Active_Combat_State) is
     begin
        null; -- Maximum kinetic deflection
     end Handle_Threat;
  end Shield_States;
tags: [ada, abjuration, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A shield in passive mode behaves completely differently from one in active combat. The State pattern encapsulates these stances, allowing the matrix to shift its entire behavioral paradigm cleanly and safely when a threat crosses the DoD perimeter.
