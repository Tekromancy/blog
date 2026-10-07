---
title: "The Spectral Strategy"
description: "Swap out the poltergeist's method of attack on the fly—be it rapid-fire phantom clicks or slow, terrifying keystrokes."
type: autohotkey
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Tactical Manifestation"
formula: |2
  class HauntingStrategy {
      Execute() {
          throw Error("Not implemented")
      }
  }

  class ClickFrenzyStrategy extends HauntingStrategy {
      Execute() {
          Loop 5 {
              Click()
              Sleep(50)
          }
      }
  }

  class CreepyTypingStrategy extends HauntingStrategy {
      Execute() {
          SetKeyDelay(200)
          Send("You are not alone...")
          SetKeyDelay(10)
      }
  }

  class Manifestation {
      __New(strategy) {
          this.strategy := strategy
      }
      SetStrategy(strategy) {
          this.strategy := strategy
      }
      Unleash() {
          this.strategy.Execute()
      }
  }

  attack := Manifestation(ClickFrenzyStrategy())
  attack.Unleash()
  
  attack.SetStrategy(CreepyTypingStrategy())
  attack.Unleash()
tags: [autohotkey, strategy, automation, poltergeist]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
