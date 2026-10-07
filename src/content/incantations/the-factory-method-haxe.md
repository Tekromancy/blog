---
title: The Factory Method
description: Delegating arcane materialization to subclasses
type: haxe
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Materialization"
formula: |2
  interface IPortal {
      public function open():Void;
  }

  class NetherPortal implements IPortal {
      public function new() {}
      public function open():Void { trace("Opening a gateway to the Nether planes."); }
  }

  class AstralPortal implements IPortal {
      public function new() {}
      public function open():Void { trace("Piercing the veil to the Astral realm."); }
  }

  abstract class PortalCrafter {
      public function new() {}

      // The Factory Method
      public abstract function createPortal():IPortal;

      public function trigger():Void {
          var portal = createPortal();
          trace("Reticulating planar splines...");
          portal.open();
      }
  }

  class NetherCrafter extends PortalCrafter {
      public function createPortal():IPortal {
          return new NetherPortal();
      }
  }

  class AstralCrafter extends PortalCrafter {
      public function createPortal():IPortal {
          return new AstralPortal();
      }
  }
tags: [conjuration, factory-method, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

When the exact plane of existence isn't known until compilation time, the Factory Method delays materialization to the subclasses. It acts as an anchor for cross-realm targets, ensuring that each target environment can supply its own portal implementation without altering the core ritual.
