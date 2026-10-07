---
title: The Visitor of Web Runes
description: Separate arcane operations from the rune elements on which they operate.
type: purescript
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Entity Harvesting"
formula: |2
  module Arcane.Visitor where
  import Prelude

  data ArcaneEntity = Grimoire String | Artifact Int | Potion String

  -- Visitor pattern in FP is often a pattern match or a fold,
  -- but we can explicitly define a visitor record for extensible operations.
  type EntityVisitor a =
    { visitGrimoire :: String -> a
    , visitArtifact :: Int -> a
    , visitPotion :: String -> a
    }

  accept :: forall a. ArcaneEntity -> EntityVisitor a -> a
  accept (Grimoire t) v = v.visitGrimoire t
  accept (Artifact p) v = v.visitArtifact p
  accept (Potion k) v = v.visitPotion k

  describeVisitor :: EntityVisitor String
  describeVisitor =
    { visitGrimoire: \t -> "A tome of " <> t
    , visitArtifact: \p -> "A relic glowing with power level " <> show p
    , visitPotion: \k -> "A vial of bubbling " <> k
    }
tags: [behavioral, visitor, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
