---
title: The Builder
description: Constructing complex Timeline entities through deliberate, step-by-step incantations.
type: actionscript
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Flash Golemancy"
formula: |2
  package arcana.builder {
      import flash.display.MovieClip;

      public class TimelineAbomination extends MovieClip {
          public var aura:String;
          public var limbs:int;
          public var soulBound:Boolean;
      }

      public interface IAbominationBuilder {
          function imbueAura():void;
          function attachLimbs():void;
          function bindSoul():void;
          function getResult():TimelineAbomination;
      }

      public class FleshConstructBuilder implements IAbominationBuilder {
          private var construct:TimelineAbomination;

          public function FleshConstructBuilder() {
              this.construct = new TimelineAbomination();
          }

          public function imbueAura():void {
              construct.aura = "Necrotic";
              trace("Imbuing necrotic aura into the frames.");
          }

          public function attachLimbs():void {
              construct.limbs = 8;
              trace("Splicing 8 limbs into the MovieClip.");
          }

          public function bindSoul():void {
              construct.soulBound = false;
              trace("Flesh constructs have no souls.");
          }

          public function getResult():TimelineAbomination {
              return construct;
          }
      }

      public class NecromancerDirector {
          public function constructEntity(builder:IAbominationBuilder):TimelineAbomination {
              builder.imbueAura();
              builder.attachLimbs();
              builder.bindSoul();
              return builder.getResult();
          }
      }
  }
tags: [builder, actionscript, flash, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
