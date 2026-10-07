---
title: Singleton Nexus
description: Ensuring only one instance of the Ley Line Nexus exists in the application memory.
type: delphi
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Nexus Anchoring"
formula: |2
  unit SingletonNexus;

  interface

  type
    TLeyLineNexus = class
    private
      class var FInstance: TLeyLineNexus;
      constructor Create; // Hide the constructor
    public
      class function GetInstance: TLeyLineNexus;
      procedure ChannelEnergy;
    end;

  implementation

  uses System.SysUtils;

  constructor TLeyLineNexus.Create;
  begin
    inherited Create;
    // Initialization of the arcane core
  end;

  class function TLeyLineNexus.GetInstance: TLeyLineNexus;
  begin
    if FInstance = nil then
      FInstance := TLeyLineNexus.Create;
    Result := FInstance;
  end;

  procedure TLeyLineNexus.ChannelEnergy;
  begin
    Writeln('Channeling magical energy through the singular Ley Line Nexus.');
  end;

  initialization
    // FInstance is implicitly nil

  finalization
    if Assigned(TLeyLineNexus.FInstance) then
      TLeyLineNexus.FInstance.Free;

  end.
tags: [delphi, gof, creational, abjuration, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Ley Line Nexus must remain undisturbed. Calling multiple nexuses into being would shatter the dimensions of the Object Pascal runtime. Thus, the Singleton pattern preserves the delicate arcane balance.
