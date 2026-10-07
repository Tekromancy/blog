---
title: Visitor of the Spirit Realm
description: An inspector spirit that extracts mana from disparate magical artifacts.
type: delphi
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Spirit Inspection"
formula: |2
  unit VisitorSpirits;

  interface

  type
    TCrystal = class;
    TScroll = class;

    ISpiritVisitor = interface
      procedure VisitCrystal(Crystal: TCrystal);
      procedure VisitScroll(Scroll: TScroll);
    end;

    IArtifact = interface
      procedure Accept(Visitor: ISpiritVisitor);
    end;

    TCrystal = class(TInterfacedObject, IArtifact)
    public
      procedure Accept(Visitor: ISpiritVisitor);
      function GetMana: Integer;
    end;

    TScroll = class(TInterfacedObject, IArtifact)
    public
      procedure Accept(Visitor: ISpiritVisitor);
      function GetSpellCasts: Integer;
    end;

    TManaHarvester = class(TInterfacedObject, ISpiritVisitor)
    public
      procedure VisitCrystal(Crystal: TCrystal);
      procedure VisitScroll(Scroll: TScroll);
    end;

  implementation

  uses System.SysUtils;

  procedure TCrystal.Accept(Visitor: ISpiritVisitor);
  begin
    Visitor.VisitCrystal(Self);
  end;

  function TCrystal.GetMana: Integer;
  begin
    Result := 500;
  end;

  procedure TScroll.Accept(Visitor: ISpiritVisitor);
  begin
    Visitor.VisitScroll(Self);
  end;

  function TScroll.GetSpellCasts: Integer;
  begin
    Result := 3;
  end;

  procedure TManaHarvester.VisitCrystal(Crystal: TCrystal);
  begin
    Writeln(Format('Harvester extracted %d mana from the crystal.', [Crystal.GetMana]));
  end;

  procedure TManaHarvester.VisitScroll(Scroll: TScroll);
  begin
    Writeln(Format('Harvester consumed %d casts from the scroll.', [Scroll.GetSpellCasts]));
  end;

  end.
tags: [delphi, gof, behavioral, divination, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When traversing an array of mixed artifacts, an internal method on each would pollute their pure code. Instead, the Spirit Visitor is accepted into the artifact, extracting the necessary magic while maintaining structural wards.
