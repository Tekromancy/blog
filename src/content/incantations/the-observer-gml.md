---
title: Observer for Sprite Enchantment
description: Allow mystical runes to react passively when the grand magical focus shifts.
type: gml
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sprite Enchantment"
formula: |2
  function MagicFocus() constructor {
      observers = [];
      element = "none";
      
      static subscribe = function(_observer) { array_push(observers, _observer); };
      
      static set_element = function(_new_element) {
          element = _new_element;
          for (var i = 0; i < array_length(observers); i++) {
              observers[i].on_element_changed(element);
          }
      };
  }
  
  function ReactiveSprite() constructor {
      static on_element_changed = function(_element) {
          if (_element == "fire") image_blend = c_red;
          if (_element == "ice") image_blend = c_aqua;
      };
  }
tags: [gml, behavioral, observer]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Observer pattern relies on a central scrying focus. Sprites, standing silently in the void, subscribe to this focus. When the Grand Magus declares an elemental shift, the focus broadcasts the tremor, and all attuned sprites instantly alter their hues in harmonious synchrony.
