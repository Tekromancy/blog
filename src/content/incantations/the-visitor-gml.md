---
title: Visitor for Sprite Enchantment
description: Execute external operations upon an array of heterogeneous enchanted sprites without altering their essence.
type: gml
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Sprite Enchantment"
formula: |2
  function CurseVisitor() constructor {
      static visit_fire_sprite = function(_fire_sprite) { _fire_sprite.extinguish(); };
      static visit_ice_sprite = function(_ice_sprite) { _ice_sprite.shatter(); };
  }
  
  function FireSprite() constructor {
      static accept = function(_visitor) { _visitor.visit_fire_sprite(self); };
      static extinguish = function() { /* lose magic */ };
  }
  
  function IceSprite() constructor {
      static accept = function(_visitor) { _visitor.visit_ice_sprite(self); };
      static shatter = function() { /* explode */ };
  }
tags: [gml, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor is a specter moving through an army. Instead of cluttering the clean classes of Fire and Ice Sprites with a 'curse' method, a CurseVisitor object sweeps through them. They merely accept the visitor, allowing the external entity to harvest their essence contextually.
