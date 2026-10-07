---
title: The Builder Incantation
description: Construct complex, mathematically proven layered defenses step-by-step.
type: ada
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Abjuration // Construct Weaving"
formula: |2
  package Aegis_Builders is

     type Aegis_Defense is private;

     type Builder is abstract tagged null record;
     procedure Build_Kinetic_Layer (B : in out Builder) is abstract;
     procedure Build_Energy_Layer (B : in out Builder) is abstract;
     function Get_Result (B : Builder) return Aegis_Defense is abstract;

     type Standard_Aegis_Builder is new Builder with private;
     overriding procedure Build_Kinetic_Layer (B : in out Standard_Aegis_Builder);
     overriding procedure Build_Energy_Layer (B : in out Standard_Aegis_Builder);
     overriding function Get_Result (B : Standard_Aegis_Builder) return Aegis_Defense;

  private
     type Aegis_Defense is record
        Kinetic_Active : Boolean := False;
        Energy_Active  : Boolean := False;
     end record;

     type Standard_Aegis_Builder is new Builder with record
        InProgress : Aegis_Defense;
     end record;
  end Aegis_Builders;
tags: [ada, abjuration, construction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Builder separates the construction of a multi-layered Aegis defense from its representation. In high-stakes cyber-magical warfare, this ensures that every ward is built sequentially, adhering to strict mathematical proofs before the shield is initialized.
