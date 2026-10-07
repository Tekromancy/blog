---
title: Facade in ReasonML
description: A clean module hiding a complex JS undercity.
type: reason
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Glamour"
formula: |2
  module SubsystemA = { let run = () => "SysA"; };
  module SubsystemB = { let run = () => "SysB"; };

  module SystemFacade = {
    let initialize = () => SubsystemA.run() ++ " & " ++ SubsystemB.run();
  };
tags: [reason, facade, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade provides a single module entrypoint to a tangled web of underlying arcane subsystems.
