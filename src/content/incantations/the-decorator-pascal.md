---
title: The Decorator
description: Dynamically weaving additional wards onto a base enchantment.
type: pascal
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Transmutation // Weaving
formula: |
  unit DecoratorPattern;
  interface
  type
    IShield = interface
      function GetPower: Integer;
    end;
    TShieldDecorator = class(TInterfacedObject, IShield)
    protected
      FCore: IShield;
    public
      function GetPower: Integer; virtual;
    end;
  implementation
  end.
tags: [weaving, dynamic, warding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Enhances strict structures by layering capabilities organically around a strong core.
