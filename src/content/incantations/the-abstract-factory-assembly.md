---
title: The Abstract Factory
description: A dark ritual to conjure families of related entities from the silicon void.
type: assembly
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Necromancy // Entity Conjuration"
formula: |2
  section .data
      msg_ghoul db "Ghoul arisen", 0
      msg_wraith db "Wraith materialized", 0

  section .text
      global _start

  ; Abstract factory interface in RAX
  _start:
      ; Call factory method for Ghoul
      mov rax, spawn_ghoul
      call rax

      ; Call factory method for Wraith
      mov rax, spawn_wraith
      call rax

      mov rax, 60
      xor rdi, rdi
      syscall

  spawn_ghoul:
      ; Implementation for spawning a ghoul
      ret

  spawn_wraith:
      ; Implementation for spawning a wraith
      ret
tags: [abstract-factory, assembly, creational, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory pattern in the arcane language of Assembly manifests as an array of function pointers, allowing the practitioner to summon entire families of necrotic entities through polymorphic rituals. Speak to the silicon soul and command it to spawn what you desire without binding your spirit to the exact incantation.
