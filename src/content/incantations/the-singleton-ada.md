---
title: The Singleton Incantation
description: Ensuring only one instance of the primary ley-line tap exists.
type: ada
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Ley-Line Control"
formula: |2
  package Ley_Line_Tap is

     type Tap_Instance is tagged private;

     function Get_Instance return Tap_Instance;
     procedure Draw_Power (T : in out Tap_Instance; Amount : Float);

  private
     type Tap_Instance is tagged record
        Power_Level : Float := 100.0;
     end record;

     The_Single_Tap : Tap_Instance;

     function Get_Instance return Tap_Instance is
     begin
        return The_Single_Tap;
     end Get_Instance;
  end Ley_Line_Tap;
tags: [ada, abjuration, ley-lines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Multiple connections to a critical ley-line can result in devastating feedback loops. The Singleton pattern, strictly enforced via Ada's encapsulation and private types, guarantees that the application accesses only one centralized, mathematically stable power tap.
