---
title: The Observer of Astral Alignments
description: Notify bound familiars and wards when cosmic conditions change.
type: prolog
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Binding
formula: |
  :- dynamic observer/2.
  
  % Register Observers
  bind_familiar(Event, Familiar) :-
      assertz(observer(Event, Familiar)).
      
  % The Subject Event
  trigger_alignment(Event) :-
      format('The cosmic alignment ~w has occurred!', [Event]), nl,
      notify_observers(Event).
      
  % Notify all registered observers
  notify_observers(Event) :-
      observer(Event, Familiar),
      format('~w feels the shift in the aether.', [Familiar]), nl,
      fail.
  notify_observers(_).
  
  % ?- bind_familiar(blood_moon, shadow_bat), bind_familiar(blood_moon, night_stalker).
  % ?- trigger_alignment(blood_moon).
  % The cosmic alignment blood_moon has occurred!
  % shadow_bat feels the shift in the aether.
  % night_stalker feels the shift in the aether.
tags: [observer, behavioral, prolog, events, familiars]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
