---
title: "The Prototype"
description: "Duplicating an existing arcane construct by deep-copying its essence."
type: j
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Cloning"
formula: |2
  clone =: ]  NB. J's array copy is by value implicitly
  
  base_sigil =: 3 3 $ 'MAGICRUNE'
  cloned_sigil =: clone base_sigil
  
  NB. Modify clone without affecting base
  modified_sigil =: 'X' 1 1 } cloned_sigil
tags: [prototype, clone, immutable, arrays]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In J, arrays are passed by value and immutable. The prototype pattern is naturally fulfilled by the language's core semantics.
