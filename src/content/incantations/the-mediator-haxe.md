---
title: The Mediator
description: A central hub routing chaotic arcane signals
type: haxe
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  interface IMediator {
      public function notify(sender:Component, event:String):Void;
  }

  class Component {
      private var mediator:IMediator;
      public function new(mediator:IMediator) { this.mediator = mediator; }
  }

  class SpellBook extends Component {
      public function flipPage():Void {
          trace("Spellbook flipped page.");
          mediator.notify(this, "page_flipped");
      }
  }

  class Wand extends Component {
      public function ignite():Void {
          trace("Wand ignites based on page.");
      }
  }

  class RitualMediator implements IMediator {
      private var spellbook:SpellBook;
      private var wand:Wand;

      public function setComponents(sb:SpellBook, w:Wand) {
          this.spellbook = sb;
          this.wand = w;
      }

      public function notify(sender:Component, event:String):Void {
          if (event == "page_flipped") {
              trace("Mediator reacting to spellbook...");
              wand.ignite();
          }
      }
  }
tags: [divination, mediator, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When components across multiple dimensional layers attempt to interact, chaos ensues. The Mediator steps in as the telepathic hub, preventing components from referencing each other explicitly and thus ensuring untangled communication and lower coupling.
