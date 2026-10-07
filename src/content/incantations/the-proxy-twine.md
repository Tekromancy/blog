---
title: The Proxy of the Hypertext Labyrinth
description: Guard the gates to forbidden data streams with a silent, intercepting sentinel.
type: twine
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  :: StoryInit
  <<set setup.SecureDatabase = {
    fetch: function(query) {
      return "CLASSIFIED DATA FOR: " + query;
    }
  }>>
  
  <<set setup.DatabaseProxy = {
    accessLevel: 1,
    fetch: function(query) {
      if (this.accessLevel >= 5) {
        return setup.SecureDatabase.fetch(query);
      } else {
        return "ACCESS DENIED: Insufficient Clearance.";
      }
    }
  }>>
  
  :: Passage
  <<set setup.DatabaseProxy.accessLevel to 2>>
  Querying Black Project: <<print setup.DatabaseProxy.fetch("Project Lazarus")>>
  
  <<set setup.DatabaseProxy.accessLevel to 5>>
  Querying Black Project: <<print setup.DatabaseProxy.fetch("Project Lazarus")>>
tags: [structural, proxy, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Raw access to the Labyrinth's memory core is too dangerous to expose openly. The **Proxy** pattern erects a protective surrogate in front of the actual database.

The proxy mimics the exact interface (`fetch()`) of the real object, allowing it to seamlessly intercept calls. It acts as an ICE (Intrusion Countermeasures Electronics) wall, validating credentials and clearance levels before passing the request down to the heavily guarded `SecureDatabase`.
