---
title: The Composite Incantation
description: Treating individual wards and complex shield grids uniformly.
type: ada
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Abjuration // Grid Construction"
formula: |2
  package Shield_Composites is

     type Component is abstract tagged null record;
     procedure Resonate (C : in Component) is abstract;

     type Leaf_Ward is new Component with null record;
     overriding procedure Resonate (C : in Leaf_Ward);

     type Composite_Grid is new Component with private;
     overriding procedure Resonate (C : in Composite_Grid);

     procedure Add (Grid : in out Composite_Grid; Item : access Component'Class);

  private
     type Node is record
        Data : access Component'Class;
     end record;

     type Component_Array is array (1 .. 100) of Node;

     type Composite_Grid is new Component with record
        Children : Component_Array;
        Count    : Natural := 0;
     end record;
  end Shield_Composites;
tags: [ada, abjuration, grids]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A single runic ward is strong; a woven composite grid is impenetrable. By treating individual nodes and the entire matrix with the same unified interface, the Composite pattern ensures resonant harmonics cascade flawlessly through the structure.
