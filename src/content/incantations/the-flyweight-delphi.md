---
title: Flyweight Sparks
description: Sharing the core essence of a million tiny magical sparks to preserve arcane memory.
type: delphi
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Essence Optimization"
formula: |2
  unit FlyweightSparks;

  interface

  uses System.Generics.Collections;

  type
    TSparkEssence = class
    private
      FColor: string;
      FIntensity: Integer;
    public
      constructor Create(Color: string; Intensity: Integer);
      procedure Render(X, Y: Integer);
    end;

    TSparkFactory = class
    private
      FEssences: TObjectDictionary<string, TSparkEssence>;
    public
      constructor Create;
      destructor Destroy; override;
      function GetEssence(Color: string): TSparkEssence;
    end;

  implementation

  uses System.SysUtils;

  constructor TSparkEssence.Create(Color: string; Intensity: Integer);
  begin
    FColor := Color;
    FIntensity := Intensity;
  end;

  procedure TSparkEssence.Render(X, Y: Integer);
  begin
    Writeln(Format('Rendering %s spark at (%d, %d) with intensity %d', [FColor, X, Y, FIntensity]));
  end;

  constructor TSparkFactory.Create;
  begin
    FEssences := TObjectDictionary<string, TSparkEssence>.Create([doOwnsValues]);
  end;

  destructor TSparkFactory.Destroy;
  begin
    FEssences.Free;
    inherited;
  end;

  function TSparkFactory.GetEssence(Color: string): TSparkEssence;
  begin
    if not FEssences.TryGetValue(Color, Result) then
    begin
      Result := TSparkEssence.Create(Color, 100);
      FEssences.Add(Color, Result);
      Writeln('Forged new spark essence for ' + Color);
    end;
  end;

  end.
tags: [delphi, gof, structural, conjuration, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To flood the screen with a million fiery particles would exhaust the system's mana. The Flyweight ward shares the heavy intrinsic state—the essence of the spark—while only the coordinates remain unique to each instance.
