---
title: The Abstract Factory
description: A pure function returning a record of functions, shielding the adept from impure implementations.
type: haskell
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Voidmancy"
formula: |2
  module AbstractFactory where

  -- The Abstract Factory
  data GUIFactory m = GUIFactory
    { createButton   :: m Button
    , createCheckbox :: m Checkbox
    }

  data Button = Button { renderButton :: String }
  data Checkbox = Checkbox { renderCheckbox :: String }

  -- Concrete Factory: Light Theme
  lightFactory :: Monad m => GUIFactory m
  lightFactory = GUIFactory
    { createButton   = return $ Button "Rendering Light Button"
    , createCheckbox = return $ Checkbox "Rendering Light Checkbox"
    }

  -- Concrete Factory: Dark Theme
  darkFactory :: Monad m => GUIFactory m
  darkFactory = GUIFactory
    { createButton   = return $ Button "Rendering Dark Button"
    , createCheckbox = return $ Checkbox "Rendering Dark Checkbox"
    }
tags: [monads, conjuration, pure-functional]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
