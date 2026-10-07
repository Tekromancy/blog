---
title: Decorator
description: Layer cosmic modifiers seamlessly onto base astrological readings in Julia using the Decorator pattern.
type: julia
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Divination // Celestial Modifiers
formula: |
  # Decorator in Julia: Enhancing Astrological Readings
  abstract type Reading end
  
  struct BaseReading <: Reading end
  cast_reading(::BaseReading) = "The stars suggest caution."
  
  # Decorators wrap a Reading
  struct MoonPhaseDecorator <: Reading
      inner::Reading
  end
  
  function cast_reading(r::MoonPhaseDecorator)
      base_text = cast_reading(r.inner)
      return base_text * " The waning moon amplifies this effect."
  end
  
  struct AlignmentDecorator <: Reading
      inner::Reading
  end
  
  function cast_reading(r::AlignmentDecorator)
      base_text = cast_reading(r.inner)
      return base_text * " Mars is in retrograde."
  end
  
  # Usage
  reading = AlignmentDecorator(MoonPhaseDecorator(BaseReading()))
  println(cast_reading(reading))
tags: [structural, decorator, julia, astromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
