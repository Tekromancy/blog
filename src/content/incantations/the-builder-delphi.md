---
title: Builder of Golems
description: Step-by-step assembly of complex magical constructs.
type: delphi
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct Assembly"
formula: |2
  unit BuilderGolems;

  interface

  type
    TGolem = class
    private
      FMaterial: string;
      FRunes: string;
      FCore: string;
    public
      property Material: string read FMaterial write FMaterial;
      property Runes: string read FRunes write FRunes;
      property Core: string read FCore write FCore;
      procedure Awaken;
    end;

    IGolemBuilder = interface
      procedure SetMaterial;
      procedure InscribeRunes;
      procedure BindCore;
      function GetResult: TGolem;
    end;

    TClayGolemBuilder = class(TInterfacedObject, IGolemBuilder)
    private
      FGolem: TGolem;
    public
      constructor Create;
      procedure SetMaterial;
      procedure InscribeRunes;
      procedure BindCore;
      function GetResult: TGolem;
    end;

    TAlchemist = class
    public
      function Construct(Builder: IGolemBuilder): TGolem;
    end;

  implementation

  uses System.SysUtils;

  procedure TGolem.Awaken;
  begin
    Writeln(Format('Awakening %s golem with %s and %s core.', [FMaterial, FRunes, FCore]));
  end;

  constructor TClayGolemBuilder.Create;
  begin
    FGolem := TGolem.Create;
  end;

  procedure TClayGolemBuilder.SetMaterial;
  begin
    FGolem.Material := 'Sacred Clay';
  end;

  procedure TClayGolemBuilder.InscribeRunes;
  begin
    FGolem.Runes := 'Emet';
  end;

  procedure TClayGolemBuilder.BindCore;
  begin
    FGolem.Core := 'Earth Elemental Fragment';
  end;

  function TClayGolemBuilder.GetResult: TGolem;
  begin
    Result := FGolem;
    FGolem := nil; // Relinquish ownership
  end;

  function TAlchemist.Construct(Builder: IGolemBuilder): TGolem;
  begin
    Builder.SetMaterial;
    Builder.InscribeRunes;
    Builder.BindCore;
    Result := Builder.GetResult;
  end;

  end.
tags: [delphi, gof, creational, transmutation, builder]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Rather than calling a single immense creation spell, the Builder incantation allows the Alchemist to weave a Golem step by step. A perfect ward of sequential VCL assembly.
