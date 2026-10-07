---
title: Prototype in ReasonML
description: Cloning arcane state through structural sharing.
type: reason
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  type grimoire = { spells: list(string), owner: string };
  let baseGrimoire = { spells: ["Levitate"], owner: "Unknown" };
  let cloneFor = (newOwner, g) => { ...g, owner: newOwner };

  let thothsGrimoire = baseGrimoire |> cloneFor("Thoth");
tags: [reason, prototype, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In the immutable realms of OCaml and Reason, the Prototype pattern is effortless. The spread operator clones records with structural sharing, minimizing mana cost.
