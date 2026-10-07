---
title: The Observer Incantation
description: Notifying dependent defenses when a key ward's state changes.
type: ada
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Abjuration // Watcher Protocols"
formula: |2
  package Ward_Observers is

     type Observer is abstract tagged null record;
     procedure Update (O : in Observer; State_Info : String) is abstract;

     type Subject is tagged private;
     procedure Attach (S : in out Subject; Obs : access Observer'Class);
     procedure Notify (S : in Subject; Info : String);

  private
     type Observer_Array is array (1 .. 10) of access Observer'Class;

     type Subject is tagged record
        Observers : Observer_Array;
        Count     : Natural := 0;
     end record;
  end Ward_Observers;

  package body Ward_Observers is
     procedure Attach (S : in out Subject; Obs : access Observer'Class) is
     begin
        if S.Count < 10 then
           S.Count := S.Count + 1;
           S.Observers(S.Count) := Obs;
        end if;
     end Attach;

     procedure Notify (S : in Subject; Info : String) is
     begin
        for I in 1 .. S.Count loop
           Update (S.Observers(I).all, Info);
        end loop;
     end Notify;
  end Ward_Observers;
tags: [ada, abjuration, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Watcher Protocols ensure that when an outer ward fractures, all internal defensive nodes are instantly notified. The Observer pattern decouples the sensory ward from the reactive elements, ensuring high-speed propagation of threat data without tight coupling.
