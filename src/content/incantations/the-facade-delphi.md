---
title: Facade of the High Ritual
description: Concealing a massive, convoluted arcane system behind a single, elegant command.
type: delphi
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Complexity Cloaking"
formula: |2
  unit FacadeRitual;

  interface

  type
    TCrystalGrid = class
    public
      procedure Align;
    end;

    TIncenseBurner = class
    public
      procedure Ignite;
    end;

    TChanter = class
    public
      procedure Chant;
    end;

    TRitualFacade = class
    private
      FGrid: TCrystalGrid;
      FBurner: TIncenseBurner;
      FChanter: TChanter;
    public
      constructor Create;
      destructor Destroy; override;
      procedure PerformRitual;
    end;

  implementation

  uses System.SysUtils;

  procedure TCrystalGrid.Align;
  begin
    Writeln('Crystals are aligned to the ley lines.');
  end;

  procedure TIncenseBurner.Ignite;
  begin
    Writeln('Sacred herbs are burning, filling the room with smoke.');
  end;

  procedure TChanter.Chant;
  begin
    Writeln('The choir sings the ancient syllables.');
  end;

  constructor TRitualFacade.Create;
  begin
    FGrid := TCrystalGrid.Create;
    FBurner := TIncenseBurner.Create;
    FChanter := TChanter.Create;
  end;

  destructor TRitualFacade.Destroy;
  begin
    FGrid.Free;
    FBurner.Free;
    FChanter.Free;
    inherited;
  end;

  procedure TRitualFacade.PerformRitual;
  begin
    Writeln('Beginning the High Ritual via the Facade...');
    FGrid.Align;
    FBurner.Ignite;
    FChanter.Chant;
    Writeln('Ritual complete. The portal opens.');
  end;

  end.
tags: [delphi, gof, structural, illusion, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The apprentices do not need to know the exact angles of the crystal grid or the pitch of the chant. The Facade provides a single golden button on the VCL form that executes the ritual flawlessly.
