---
title: "The Proxy: The Shadow Sentinel"
description: "Provide a surrogate or placeholder for another object to control access to it."
type: gdscript
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Sentinel"
formula: |2
  class_name ITextureLoader extends RefCounted
  func get_texture() -> Texture2D: return null

  class_name HeavyTextureLoader extends ITextureLoader
  var _tex: Texture2D
  func _init(path: String) -> void:
      _tex = load(path) # Expensive operation

  func get_texture() -> Texture2D:
      return _tex

  # The Proxy
  class_name TextureProxy extends ITextureLoader
  var _path: String
  var _real_loader: HeavyTextureLoader

  func _init(path: String) -> void:
      _path = path

  func get_texture() -> Texture2D:
      if _real_loader == null:
          _real_loader = HeavyTextureLoader.new(_path)
      return _real_loader.get_texture()
tags: [godot, gdscript, proxy, sentinel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy acts as an ephemeral guardian. It delays the heavy cost of loading immense assets or connecting to arcane networks until the exact moment the resource is demanded. It is the shadow standing in for the true entity, indistinguishable to the client but vastly more efficient in its idleness.
