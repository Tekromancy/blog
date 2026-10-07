---
title: Flyweight in Elm
description: Optimizing memory through shared data references in Elm.
type: elm
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  module Flyweight exposing (Texture, Sprite, createTextures, spawnSprite)
  
  import Dict exposing (Dict)
  
  -- Intrinsic State (The Flyweight)
  type alias Texture =
      { url : String, width : Int, height : Int }
  
  -- Extrinsic State
  type alias Sprite =
      { id : String, x : Float, y : Float, textureKey : String }
  
  type alias TextureCache =
      Dict String Texture
  
  createTextures : TextureCache
  createTextures =
      Dict.fromList
          [ ( "neon_bullet", { url = "/img/bullet.png", width = 10, height = 5 } )
          , ( "drone", { url = "/img/drone.png", width = 32, height = 32 } )
          ]
  
  spawnSprite : String -> Float -> Float -> String -> Sprite
  spawnSprite id x y texKey =
      { id = id, x = x, y = y, textureKey = texKey }
tags: [elm, structural, flyweight, optimization, memory-management]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Flyweight: The Phantom Replicas

When rendering thousands of neon projectiles in a high-octane UI datastream, maintaining separate copies of heavy texture data invites the wrath of the Garbage Collector. The Flyweight pattern in Elm separates the heavy intrinsic state (`Texture`) into a centralized `Dict` (the cache). The lightweight extrinsic state (`Sprite`) merely holds a string reference. Through this optimization spell, memory usage remains elegantly low, and the simulation runs with blistering cyberpunk speed.
