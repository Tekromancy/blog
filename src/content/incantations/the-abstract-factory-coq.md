---
title: The Abstract Factory
description: A Gallina Ward that summons families of interconnected ethereal constructs without binding to their concrete planar forms.
type: coq
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Wardcraft"
formula: |2
  (* Gallina Ward: Abstract Factory *)
  
  Module Type GUIFactory.
    Parameter Button : Type.
    Parameter Window : Type.
    
    Parameter createButton : Button.
    Parameter createWindow : Window.
    
    Parameter renderButton : Button -> string.
    Parameter renderWindow : Window -> string.
  End GUIFactory.
  
  Module CyberUIFactory <: GUIFactory.
    Definition Button := string.
    Definition Window := string.
    
    Definition createButton := "Neon Button".
    Definition createWindow := "Holo Window".
    
    Definition renderButton (b : Button) := "Rendering " ++ b.
    Definition renderWindow (w : Window) := "Rendering " ++ w.
  End CyberUIFactory.
  
  Module SteamUIFactory <: GUIFactory.
    Definition Button := string.
    Definition Window := string.
    
    Definition createButton := "Brass Button".
    Definition createWindow := "Clockwork Window".
    
    Definition renderButton (b : Button) := "Rendering " ++ b.
    Definition renderWindow (w : Window) := "Rendering " ++ w.
  End SteamUIFactory.
tags: [gallina, wards, abstract-factory, dependent-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
