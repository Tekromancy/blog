---
title: Builder of the Shadow Profiles
description: Construct complex social graph nodes step-by-step.
type: hack
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Structuring"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Builder;

  class SocialProfile {
    public string $alias = "";
    public string $encryptionLevel = "None";
    public vec<string> $connections = vec[];
  }

  interface IProfileBuilder {
    public function setAlias(string $alias): this;
    public function encryptProfile(string $level): this;
    public function linkNode(string $nodeId): this;
    public function getResult(): SocialProfile;
  }

  class ShadowProfileBuilder implements IProfileBuilder {
    private SocialProfile $profile;

    public function __construct() { 
      $this->profile = new SocialProfile(); 
    }

    public function setAlias(string $alias): this { 
      $this->profile->alias = $alias; 
      return $this; 
    }

    public function encryptProfile(string $level): this { 
      $this->profile->encryptionLevel = $level; 
      return $this; 
    }

    public function linkNode(string $nodeId): this { 
      $this->profile->connections[] = $nodeId; 
      return $this; 
    }

    public function getResult(): SocialProfile { 
      return $this->profile; 
    }
  }
tags: [hack, builder, creational, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### Forging the Unknown

When weaving a synthetic identity into the digital ether, the instantiation requires precision. The **Builder** pattern enables us to assemble complex profiles—layering aliases, cryptographic shields, and phantom connections—step by step.

Hack's `this` return type ensures fluent chaining of our transmutation spells, allowing a shadow-smith to effortlessly construct a node and push it into the network grid.
