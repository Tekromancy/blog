---
title: Proxy Guardian
description: A spectral ward that intercepts requests to an ancient and vulnerable core.
type: delphi
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Guardian Magic"
formula: |2
  unit ProxyGuardian;

  interface

  type
    IGrimoire = interface
      procedure ReadSecret(MageLevel: Integer);
    end;

    TAncientGrimoire = class(TInterfacedObject, IGrimoire)
    public
      procedure ReadSecret(MageLevel: Integer);
    end;

    TGrimoireProxy = class(TInterfacedObject, IGrimoire)
    private
      FRealGrimoire: TAncientGrimoire;
    public
      destructor Destroy; override;
      procedure ReadSecret(MageLevel: Integer);
    end;

  implementation

  uses System.SysUtils;

  procedure TAncientGrimoire.ReadSecret(MageLevel: Integer);
  begin
    Writeln('The ancient pages reveal the true names of the stars.');
  end;

  destructor TGrimoireProxy.Destroy;
  begin
    FRealGrimoire.Free;
    inherited;
  end;

  procedure TGrimoireProxy.ReadSecret(MageLevel: Integer);
  begin
    if MageLevel < 10 then
      Writeln('Access denied! The Proxy Guardian repels you with a shock of lightning.')
    else
    begin
      if not Assigned(FRealGrimoire) then
        FRealGrimoire := TAncientGrimoire.Create;
      Writeln('The Proxy Guardian nods. The book opens.');
      FRealGrimoire.ReadSecret(MageLevel);
    end;
  end;

  end.
tags: [delphi, gof, structural, abjuration, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The true Grimoire is heavy to load and dangerous to expose. The Proxy Guardian stands before it, a lightweight shell that enforces access rights and delays the materialization of the Grimoire until absolutely necessary.
