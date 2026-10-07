---
title: Template Method in ReasonML
description: Functors enforcing an algorithmic skeleton.
type: reason
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeletal"
formula: |2
  module type Worker = {
    let preWork: unit => string;
    let postWork: unit => string;
  };

  module Algorithm = (W: Worker) => {
    let execute = () => {
      Js.log(W.preWork());
      Js.log("Doing core magic");
      Js.log(W.postWork());
    };
  };
tags: [reason, template-method, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Functors provide the skeletal frame, requiring specific implementations of `preWork` and `postWork` while controlling the central orchestration logic.
