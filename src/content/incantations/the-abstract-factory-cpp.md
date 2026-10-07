---
title: The Abstract Factory
description: A grimoire for forging interrelated ethereal constructs without specifying their concrete forms.
type: cpp
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Voidforging
formula: |
  #include <memory>
  class EtherealWeapon { public: virtual ~EtherealWeapon() = default; virtual void Strike() = 0; };
  class EtherealArmor { public: virtual ~EtherealArmor() = default; virtual void Defend() = 0; };
  class VoidBlade : public EtherealWeapon { public: void Strike() override {} };
  class VoidShield : public EtherealArmor { public: void Defend() override {} };
  class Forge {
  public:
      virtual ~Forge() = default;
      virtual std::unique_ptr<EtherealWeapon> CreateWeapon() = 0;
      virtual std::unique_ptr<EtherealArmor> CreateArmor() = 0;
  };
  class VoidForge : public Forge {
  public:
      std::unique_ptr<EtherealWeapon> CreateWeapon() override { return std::make_unique<VoidBlade>(); }
      std::unique_ptr<EtherealArmor> CreateArmor() override { return std::make_unique<VoidShield>(); }
  };
tags: [creational, abstract-factory, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
