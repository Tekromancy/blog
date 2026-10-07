---
title: The Prototype
description: Cloning soul-patterns directly in memory for rapid mass deployment of spectral clones.
type: odin
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Soul Cloning"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Prototype structure
  Spectral_Clone :: struct {
  	designation: string,
  	power_level: int,
  	memories:    [dynamic]string,
  }
  
  // The deep clone procedure
  clone_spectre :: proc(original: ^Spectral_Clone) -> Spectral_Clone {
  	new_spectre := Spectral_Clone{
  		designation = original.designation,
  		power_level = original.power_level,
  		memories = make([dynamic]string, len(original.memories)),
  	}
  	
  	// Deep copy the dynamic array to prevent linked soul-trauma
  	copy(new_spectre.memories[:], original.memories[:])
  	
  	return new_spectre
  }
  
  destroy_spectre :: proc(s: ^Spectral_Clone) {
  	delete(s.memories)
  }
  
  main :: proc() {
  	alpha := Spectral_Clone{
  		designation = "Alpha Prime",
  		power_level = 9000,
  		memories = make([dynamic]string),
  	}
  	append(&alpha.memories, "Birth of the Spire")
  	append(&alpha.memories, "The First Syntax Error")
  	
  	// Clone the prototype
  	beta := clone_spectre(&alpha)
  	beta.designation = "Beta Echo"
  	
  	// Modify clone to ensure deep copy
  	append(&beta.memories, "Separation Anxiety")
  	
  	fmt.printf("Original: %s, Memories: %v\n", alpha.designation, alpha.memories)
  	fmt.printf("Clone: %s, Memories: %v\n", beta.designation, beta.memories)
  	
  	destroy_spectre(&alpha)
  	destroy_spectre(&beta)
  }
tags: [creational, odin, memory-management, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype

When the Arch-Lich requires a legion of spectral thralls immediately, reconstructing each from scratch is computationally unforgivable. The Prototype pattern allows cloning existing soul-patterns directly. In Odin, this involves deep-copying memory structures, taking particular care of dynamic arrays and pointers to avoid entangling the souls of independent entities.
