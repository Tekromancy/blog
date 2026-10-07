---
title: Prototype
description: Cloning an ancient spell rather than reconstructing its intricate weave from scratch.
type: raku
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Reflection"
formula: |2
  role CloneableSpell {
      method clone-spell(--> CloneableSpell) { ... }
  }

  class TimeCapsuleSpell does CloneableSpell {
      has Int $.years;
      has Str $.secret;
      
      submethod BUILD(:$!years = 100, :$!secret) {
          say "Forging the intricate matrix of the spell... (Expensive operation)";
      }
      
      method clone-spell(--> CloneableSpell) {
          # Bypassing the heavy BUILD process
          TimeCapsuleSpell.bless(years => $!years, secret => $!secret);
      }
      
      method reveal() {
          say "After $!years years, the secret is revealed: $!secret";
      }
  }

  my $original = TimeCapsuleSpell.new(secret => "The True Name of the Archdemon");
  say "Cloning the spell...";
  my $copy = $original.clone-spell();
  $copy.reveal();
tags: [creational, prototype, raku, hundred-year-spell]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Some spells are so delicate and exhausting to construct that crafting them anew for each target would kill the mage. By employing the Prototype pattern, a Hundred-Year Spell can be meticulously designed once, and its essence cloned for myriad applications, preserving the caster's vitality.
