---
title: "The Iterator: The Pathweaver"
description: "Provide a way to sequentially access elements of an aggregate object without exposing its underlying representation."
type: gdscript
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequencing"
formula: |2
  class_name InventoryIterator extends RefCounted

  var _items: Array
  var _index: int = 0

  func _init(items: Array) -> void:
      _items = items

  func has_next() -> bool:
      return _index < _items.size()

  func next() -> Variant:
      if has_next():
          var item = _items[_index]
          _index += 1
          return item
      return null
tags: [godot, gdscript, iterator, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Though modern loops handle much of the burden, a true Iterator object encapsulates the traversal algorithm itself. Whether winding through a linear array or spiraling through a spatial partition tree, the Iterator masks the complexity, yielding artifacts from the void one by one.
