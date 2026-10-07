---
title: The Translator Adapter
description: Convert the interface of an ancient grimoire into another interface clients expect.
type: javascript
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Divination // Linguistics"
formula: |2
  class ModernSpellbook {
    castSpell(spellName) {
      console.log(`Casting modern spell: ${spellName}`);
    }
  }

  class AncientScroll {
    chantRune(runeSequence) {
      console.log(`Chanting ancient runes: ${runeSequence}`);
    }
  }

  class ScrollAdapter extends ModernSpellbook {
    constructor(ancientScroll) {
      super();
      this.ancientScroll = ancientScroll;
    }

    castSpell(spellName) {
      const runeMap = {
        'Fireball': 'Ignis-Ka',
        'Heal': 'Vita-San',
      };
      const runes = runeMap[spellName] || 'Unknown-Rune';
      this.ancientScroll.chantRune(runes);
    }
  }

  const scroll = new AncientScroll();
  const adapter = new ScrollAdapter(scroll);
  adapter.castSpell('Fireball');
tags: [translation, compatibility, ancient]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Translator Adapter

When the ancient texts of power are incompatible with modern casting foci, you do not rewrite history. You build an adapter—a translation layer that channels the old magic into new forms.
