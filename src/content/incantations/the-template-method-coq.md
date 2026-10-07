---
title: The Template Method
description: Etching the skeleton of an incantation into a base Gallina Ward, letting derivative runes fill in the dangerous details.
type: coq
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Schematics"
formula: |2
  (* Gallina Ward: Template Method *)
  Require Import String.
  
  (* The Template defines the skeleton *)
  Record RitualTemplate := {
    prepareMaterials : string;
    chantWords : string;
    sealWard : string
  }.
  
  Definition performRitual (rt : RitualTemplate) : string :=
    rt.(prepareMaterials) ++ " -> " ++ rt.(chantWords) ++ " -> " ++ rt.(sealWard).
    
  (* Concrete subclasses provide the missing steps *)
  Definition FireRitual : RitualTemplate := {|
    prepareMaterials := "Gather Sulfur";
    chantWords := "Ignis Wrath";
    sealWard := "Seal of Ash"
  |}.
  
  Definition VoidRitual : RitualTemplate := {|
    prepareMaterials := "Gather Dark Matter";
    chantWords := "Nihil Est";
    sealWard := "Seal of Emptiness"
  |}.
tags: [template-method, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
