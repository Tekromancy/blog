---
title: Composite Sigil Clusters
description: Treating a single rune and a cluster of runes identically.
type: delphi
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Evocation // Sigil Clustering"
formula: |2
  unit CompositeSigils;

  interface

  uses System.Generics.Collections;

  type
    ISigil = interface
      procedure Ignite;
    end;

    TSingleSigil = class(TInterfacedObject, ISigil)
    private
      FName: string;
    public
      constructor Create(Name: string);
      procedure Ignite;
    end;

    TSigilCluster = class(TInterfacedObject, ISigil)
    private
      FChildren: TList<ISigil>;
    public
      constructor Create;
      destructor Destroy; override;
      procedure Add(Sigil: ISigil);
      procedure Ignite;
    end;

  implementation

  uses System.SysUtils;

  constructor TSingleSigil.Create(Name: string);
  begin
    FName := Name;
  end;

  procedure TSingleSigil.Ignite;
  begin
    Writeln(Format('Sigil %s sparks with magical light.', [FName]));
  end;

  constructor TSigilCluster.Create;
  begin
    FChildren := TList<ISigil>.Create;
  end;

  destructor TSigilCluster.Destroy;
  begin
    FChildren.Free;
    inherited;
  end;

  procedure TSigilCluster.Add(Sigil: ISigil);
  begin
    FChildren.Add(Sigil);
  end;

  procedure TSigilCluster.Ignite;
  var
    Child: ISigil;
  begin
    Writeln('A cluster of sigils begins to resonate...');
    for Child in FChildren do
      Child.Ignite;
  end;

  end.
tags: [delphi, gof, structural, evocation, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Whether invoking a singular ember rune or an entire fractal tree of fiery sigils, the magus uses the exact same command. The Composite wards allow deep hierarchies of magic to respond as one.
