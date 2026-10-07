---
title: The Adapter of the Progenitor
description: Translate ancient incantations into modern spell formats.
type: sml
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Translation"
formula: |2
  signature MODERN_SPELL = sig
    val castSpell : string -> unit
  end
  
  structure AncientRites = struct
    fun chantRune (rune1: string) (rune2: string) =
      print ("Chanting ancient runes: " ^ rune1 ^ " and " ^ rune2 ^ "\n")
  end
  
  structure SpellAdapter : MODERN_SPELL = struct
    fun castSpell spellName =
      let
        (* Split or parse modern spell into ancient runes *)
        val r1 = "RuneOf"
        val r2 = spellName
      in
        AncientRites.chantRune r1 r2
      end
  end
  
  (* Usage *)
  val _ = SpellAdapter.castSpell "Fire"
tags: [wrapper, translation, module]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the lore of the ML Progenitor, the Adapter pattern is naturally formed by wrapping older structures in new ones that adhere to modern `signatures`. By creating an adapter `structure` that implements the target signature, we map the expected function calls to the peculiar arguments required by ancient rites without altering the original archaic codebase.
