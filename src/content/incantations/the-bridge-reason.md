---
title: Bridge in ReasonML
description: Separating abstraction from functor implementation.
type: reason
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Dimensional"
formula: |2
  module type Renderer = { let render: string => unit; };
  module ConsoleRenderer: Renderer = { let render = Js.log; };

  module Shape = (R: Renderer) => {
    let drawCircle = () => R.render("Circle");
  };
  module ConsoleShape = Shape(ConsoleRenderer);
tags: [reason, bridge, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Functors act as the ultimate Bridge, decoupling the abstract definition of shapes from the rendering engine dimensions.
