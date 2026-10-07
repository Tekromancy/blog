---
title: The Flyweight of the Progenitor
description: Conserve mana by sharing immutable arcane properties.
type: sml
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Efficiency"
formula: |2
  datatype color = Red | Blue | Green
  type texture = string
  
  (* Intrinsic state, shared *)
  type particle_type = {c: color, t: texture}
  
  structure ParticleFactory = struct
    val cache : (string * particle_type) list ref = ref []
    
    fun getParticle (name, c, t) =
      case List.find (fn (n, _) => n = name) (!cache) of
          SOME (_, pt) => pt
        | NONE => 
            let val newPt = {c = c, t = t}
            in 
               cache := (name, newPt) :: !cache;
               newPt
            end
  end
  
  (* Extrinsic state *)
  type particle = {x: int, y: int, pt: particle_type}
  
  fun render (p: particle) =
    print ("Particle at " ^ Int.toString (#x p) ^ "\n")
tags: [caching, state sharing, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Flyweight pattern teaches the conservation of memory and mana. By isolating the heavy intrinsic state of objects into immutable records, we can share them extensively. A stateful cache (using a `ref` list or map) stores the unique particle types. Hundreds of thousands of extrinsic particles can then be cast across the battlefield, referencing a small pool of shared flyweights.
