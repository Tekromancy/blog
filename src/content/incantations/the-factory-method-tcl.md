---
title: The Factory Method
description: Defines an interface for creating a single magical entity, letting subclasses alter the type of entity created.
type: tcl
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Manifestation"
formula: |2
  oo::class create Grimoire {
      method createScroll {} { error "Not implemented" }
      method readScroll {} {
          set scroll [my createScroll]
          $scroll invoke
          $scroll destroy
      }
  }

  oo::class create FireScroll { method invoke {} { puts "A burst of cyber-flame engulfs the terminal!" } }
  oo::class create IceScroll { method invoke {} { puts "Sub-zero ICE locks the process threads." } }

  oo::class create PyromancerGrimoire {
      superclass Grimoire
      method createScroll {} { return [FireScroll new] }
  }

  oo::class create CryomancerGrimoire {
      superclass Grimoire
      method createScroll {} { return [IceScroll new] }
  }

  set book [PyromancerGrimoire new]
  $book readScroll
tags: [creational, factory, tcloo, manifestation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Factory Method

The Grimoire holds the template, but the specific path of the magus dictates the spell cast. By deferring instantiation to subclasses, TclOO allows dynamic generation of scripts tailored to the immediate systemic threat.
