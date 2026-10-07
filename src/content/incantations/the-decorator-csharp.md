---
title: The Decorator Matrix
description: Dynamically attaching additional responsibilities to an object at runtime.
type: csharp
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Dynamic Warding"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface IArmor
      {
          string GetDescription();
          int GetDefense();
      }

      public class BaseArmor : IArmor
      {
          public string GetDescription() => "Standard Robe";
          public int GetDefense() => 5;
      }

      public abstract class ArmorEnchantment : IArmor
      {
          protected readonly IArmor _baseArmor;

          protected ArmorEnchantment(IArmor armor)
          {
              _baseArmor = armor;
          }

          public virtual string GetDescription() => _baseArmor.GetDescription();
          public virtual int GetDefense() => _baseArmor.GetDefense();
      }

      public class FireResistanceEnchantment : ArmorEnchantment
      {
          public FireResistanceEnchantment(IArmor armor) : base(armor) { }

          public override string GetDescription() => $"{_baseArmor.GetDescription()}, Warded against Flame";
          public override int GetDefense() => _baseArmor.GetDefense() + 10;
      }
  }
tags: [structural, decorator, wrapping, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of forging a completely new item, a skilled Enchanter wraps the target in successive layers of dynamic warding. The Decorator matrix allows multiple modifiers to be stacked seamlessly onto `IArmor` implementations.
