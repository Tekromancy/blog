---
title: The Chain of Responsibility
description: Passing the arcane payload through ascending wards
type: haxe
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Cascading Wards"
formula: |2
  class ArcaneRequest {
      public var intensity:Int;
      public function new(intensity:Int) { this.intensity = intensity; }
  }

  abstract class Ward {
      private var next:Ward;
      public function setNext(ward:Ward):Ward {
          this.next = ward;
          return ward;
      }
      public function handle(request:ArcaneRequest):Void {
          if (next != null) next.handle(request);
      }
  }

  class MinorWard extends Ward {
      public override function handle(request:ArcaneRequest):Void {
          if (request.intensity <= 10) trace("Minor Ward absorbed the impact.");
          else super.handle(request);
      }
  }

  class MajorWard extends Ward {
      public override function handle(request:ArcaneRequest):Void {
          if (request.intensity <= 50) trace("Major Ward deflected the blast.");
          else super.handle(request);
      }
  }

  class ArchmageWard extends Ward {
      public override function handle(request:ArcaneRequest):Void {
          trace("Archmage Ward dispersed the catastrophe.");
      }
  }
tags: [abjuration, chain-of-responsibility, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When an unknown spell strikes a fortress, it passes through layers of dimensional wards. The Chain of Responsibility pattern allows the system to determine dynamically which defensive layer should intercept the strike without tightly coupling the sender to a specific ward.
