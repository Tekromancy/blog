---
title: The Template Method
description: Defines the skeleton of a ritual in an operation, deferring specific somatic steps to subclasses.
type: tcl
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Formalization"
formula: |2
  oo::class create BaseRitual {
      method drawCircle {} { puts "Drawing a standard salt circle." }
      method speakChant {} { error "Not implemented" }
      method sealPortal {} { puts "Sealing the portal." }

      method executeRitual {} {
          my drawCircle
          my speakChant
          my sealPortal
      }
  }

  oo::class create BloodMagicRitual {
      superclass BaseRitual
      method speakChant {} { puts "Chanting in forbidden sanguine tongue..." }
  }

  set darkRitual [BloodMagicRitual new]
  $darkRitual executeRitual
tags: [behavioral, template method, evocation, inheritance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method

The fundamental framework of an invocation rarely changes—a circle is drawn, the spell is cast, and the portal is closed. The Template Method cements the unyielding bones of the ritual in the parent class while leaving specific, dangerous steps open to polymorphic override by adept apprentices.
