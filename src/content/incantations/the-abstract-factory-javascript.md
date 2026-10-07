---
title: The Abstract Factory of the Aether
description: Conjure complete sets of related ethereal artifacts without specifying their concrete manifestations.
type: javascript
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Artifice
formula: |
  class AetherForge {
    createWeapon() { throw new Error('Method not implemented.'); }
    createArmor() { throw new Error('Method not implemented.'); }
  }
  class ShadowForge extends AetherForge {
    createWeapon() { return new ShadowBlade(); }
    createArmor() { return new ShadowCloak(); }
  }
  class LightForge extends AetherForge {
    createWeapon() { return new SunSpear(); }
    createArmor() { return new RadiantPlate(); }
  }
  class ShadowBlade { strike() { console.log("Strikes with dark matter"); } }
  class ShadowCloak { defend() { console.log("Absorbs into shadows"); } }
  class SunSpear { strike() { console.log("Pierces with blinding light"); } }
  class RadiantPlate { defend() { console.log("Deflects with pure photons"); } }
  
  function equipHero(forge) {
    const weapon = forge.createWeapon();
    const armor = forge.createArmor();
    weapon.strike();
    armor.defend();
  }
  equipHero(new ShadowForge());
tags: [creation, aether, interfaces]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Abstract Factory of the Aether

In the shifting plains of the Aether, true conjurers do not simply summon isolated artifacts; they weave complete loadouts. The Abstract Factory ensures that your shadows do not clash with your holy light.
