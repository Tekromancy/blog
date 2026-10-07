---
title: Bridge of Astral Projection
description: Separating the spell's core logic from its visual manifestation.
type: delphi
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Astral Decoupling"
formula: |2
  unit BridgeAstral;

  interface

  type
    ISpellRenderer = interface
      procedure RenderGlyph(Name: string);
    end;

    TFireRenderer = class(TInterfacedObject, ISpellRenderer)
    public
      procedure RenderGlyph(Name: string);
    end;

    TSpell = class abstract
    protected
      FRenderer: ISpellRenderer;
    public
      constructor Create(Renderer: ISpellRenderer);
      procedure Cast; virtual; abstract;
    end;

    TDestructionSpell = class(TSpell)
    public
      procedure Cast; override;
    end;

  implementation

  uses System.SysUtils;

  procedure TFireRenderer.RenderGlyph(Name: string);
  begin
    Writeln(Format('Drawing flaming glyph: %s on the VCL canvas.', [Name]));
  end;

  constructor TSpell.Create(Renderer: ISpellRenderer);
  begin
    FRenderer := Renderer;
  end;

  procedure TDestructionSpell.Cast;
  begin
    Writeln('Gathering destructive energies...');
    FRenderer.RenderGlyph('Doom');
  end;

  end.
tags: [delphi, gof, structural, transmutation, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge of Astral Projection severs the bond between what a spell does and how it is seen. The spell itself remains pure abstraction, while the renderer implements the visual chaos.
