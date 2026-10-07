---
title: "Decorator in PostScript"
description: "Add magical glowing auras to existing text strokes without altering their core matrix."
type: postscript
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Aura Layering"
formula: |2
  % Decorator in PostScript
  /BaseText << /draw { (Rendering Text Matrix\n) print } >> def
  
  /AuraDecorator <<
    /core BaseText
    /draw { 
      (Igniting Outer Glow...\n) print 
      dup /core get /draw get exec 
    }
  >> def
  
  AuraDecorator /draw get exec
tags: [postscript, print-daemon, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# Decorator: Aura Layering

Instead of subclassing or mutating a delicate glyph matrix, a true Enchanter wraps the existing object in a Decorator. This wrapper intercepts calls (like a `/draw` invocation), executes its own pre- or post-magical effects—such as glowing auras, drop shadows, or eldritch static—and then delegates to the underlying core spirit.
