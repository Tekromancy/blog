---
title: Adapting the Legacy BBS
description: Allow incompatible graph APIs to converse.
type: hack
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Adapter;

  interface IModernGraphAPI {
    public function queryNodes(string $query): vec<string>;
  }

  // The relic from a bygone era
  class LegacyBBSNetwork {
    public function fetchUsers(string $term): string { 
      return "Cypher,Trinity,Neo"; 
    }
  }

  class BBSAdapter implements IModernGraphAPI {
    public function __construct(private LegacyBBSNetwork $bbs) {}

    public function queryNodes(string $query): vec<string> {
      $result = $this->bbs->fetchUsers($query);
      return \HH\Lib\Str\split($result, ',');
    }
  }
tags: [hack, adapter, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

### Translating the Ancient Runes

The sprawl of the social graph spans decades. Sometimes we must weave connections to an archaic Bulletin Board System whose interface predates modern stream-processing. The **Adapter** pattern wraps the crumbling relic inside a standard `IModernGraphAPI`, translating obsolete CSV strings into modern `vec<string>` structures.

This allows the modern node crawler to pull data from ancient systems without corrupting its core logic.
