---
title: The Proxy
description: Guarding access to volatile dimensions with intercepting wards.
type: ocaml
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Dimensional Ward
formula: |
  module type REALM = sig
    val enter : string -> unit
  end
  
  module Abyss : REALM = struct
    let enter name = Printf.printf "%s enters the Abyss.\n" name
  end
  
  module ProxyAbyss : REALM = struct
    let enter name =
      if name = "Archmage" then Abyss.enter name
      else Printf.printf "Access denied to %s.\n" name
  end
tags: [Caml Metamagic, Access Control, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Through module signatures and conditional logic, the Proxy acts as a strict guardian, ensuring only worthy magic-users may access dangerous realms.
