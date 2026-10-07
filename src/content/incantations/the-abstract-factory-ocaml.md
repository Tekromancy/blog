---
title: The Abstract Factory
description: A grimoire for forging related elemental artifacts through functorial alchemy.
type: ocaml
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Functor Alchemy
formula: |
  module type ELEMENT = sig
    type t
    val manifest : unit -> t
    val invoke : t -> string
  end
  
  module type FACTORY = sig
    module Fire : ELEMENT
    module Ice : ELEMENT
  end
  
  module ElementalFactory : FACTORY = struct
    module Fire = struct
      type t = Flame
      let manifest () = Flame
      let invoke Flame = "Searing Heat!"
    end
    
    module Ice = struct
      type t = Frost
      let manifest () = Frost
      let invoke Frost = "Biting Cold!"
    end
  end
tags: [Caml Metamagic, Modules, Functors, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the alchemy of OCaml modules, the Abstract Factory pattern becomes an exercise in summoning related elements bound by a common grimoire.
