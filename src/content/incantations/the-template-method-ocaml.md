---
title: The Template Method
description: Defining the skeleton of a high-ritual, allowing acolytes to fill in the specific somatic components.
type: ocaml
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Ritual Skeleton"
formula: |2
  let perform_ritual ~prepare ~invoke ~clean =
    prepare ();
    invoke ();
    clean ()

  let raise_skeleton () =
    perform_ritual
      ~prepare:(fun () -> print_endline "Gathering bones.")
      ~invoke:(fun () -> print_endline "Animating dead.")
      ~clean:(fun () -> print_endline "Scrubbing blood.")
tags: [Caml Metamagic, Named Arguments, Higher-Order Functions, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method shines with OCaml's labeled arguments. The high-ritual outlines the algorithm, while specific closures dictate the grim details.
