---
title: The Observer
description: Runes that automatically shift configuration when a central leystone changes.
type: pascal
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Awareness"
formula: |2
  unit ObserverPattern;
  interface
  type
    IObserver = interface
      procedure Update(State: string);
    end;
    TSubject = class
    public
      procedure Attach(Obs: IObserver);
      procedure Notify;
    end;
  implementation
  end.
tags: [reactive, aware, update]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A strict subscription model for arcane updates across distributed ley line nodes.
