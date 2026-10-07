---
title: The Iterator of Web Runes
description: Traverse the layers of an ancient tome without exposing its internal runes.
type: purescript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Chrono-Sequencing"
formula: |2
  module Arcane.Iterator where
  import Prelude
  import Data.List (List(..))

  -- Iterator pattern is naturally represented via pure functional lazy streams or lists
  data SpellTome a = Chapter a (SpellTome a) | End

  iterateTome :: forall a. SpellTome a -> List a
  iterateTome End = Nil
  iterateTome (Chapter a rest) = Cons a (iterateTome rest)
tags: [behavioral, iterator, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
