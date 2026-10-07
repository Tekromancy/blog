---
title: Template of the High Ritual
description: A skeletal ritual framework where subclasses fill in the specific enchantments.
type: delphi
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ritual Structuring"
formula: |2
  unit TemplateMethodRitual;

  interface

  type
    TBaseRitual = class abstract
    protected
      procedure DrawCircle; virtual;
      procedure OfferSacrifice; virtual; abstract;
      procedure SpeakWords; virtual; abstract;
      procedure SealPortal; virtual;
    public
      procedure ExecuteRitual;
    end;

    TDemonSummoning = class(TBaseRitual)
    protected
      procedure OfferSacrifice; override;
      procedure SpeakWords; override;
    end;

  implementation

  uses System.SysUtils;

  procedure TBaseRitual.DrawCircle;
  begin
    Writeln('Drawing the chalk circle of binding.');
  end;

  procedure TBaseRitual.SealPortal;
  begin
    Writeln('Closing the rift and securing the bounds.');
  end;

  procedure TBaseRitual.ExecuteRitual;
  begin
    DrawCircle;
    OfferSacrifice;
    SpeakWords;
    SealPortal;
  end;

  procedure TDemonSummoning.OfferSacrifice;
  begin
    Writeln('Offering a chalice of dark nectar.');
  end;

  procedure TDemonSummoning.SpeakWords;
  begin
    Writeln('Chanting the Abyssal syntax.');
  end;

  end.
tags: [delphi, gof, behavioral, enchantment, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The structure of a ritual must be precise. The Template Method dictates the sequence—Draw Circle, Sacrifice, Speak, Seal—while leaving the specific dark acts to the descendant classes, ensuring the framework remains uncorrupted.
