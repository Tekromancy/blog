---
title: The Vault Proxy
description: Control and delay access to forbidden social data.
type: hack
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Proxy;

  interface IDataVault {
    public function accessData(string $userKey): string;
  }

  class DeepStorageVault implements IDataVault {
    public function __construct() {
      // Simulating a heavy initiation process
    }
    public function accessData(string $userKey): string { 
      return "Forbidden Network Topologies"; 
    }
  }

  class VaultProxy implements IDataVault {
    private ?DeepStorageVault $vault = null;

    public function accessData(string $userKey): string {
      if ($userKey !== "ARCHMAGE_KEY") {
        return "Access Denied.";
      }
      
      if ($this->vault === null) {
        $this->vault = new DeepStorageVault();
      }
      
      return $this->vault->accessData($userKey);
    }
  }
tags: [hack, proxy, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Silent Guardian

Deep storage holds the most potent map data of the entire social graph, yet waking the database comes with a massive cost. The **Proxy** pattern establishes a lightweight sentinel that verifies access rites before it ever instantiates the heavy vault object.

This technique binds the principles of lazy initialization with strict access control.
