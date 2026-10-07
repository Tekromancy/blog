---
title: "The Proxy Incantation in Carbon"
description: "Provide a surrogate or placeholder to control access to a sensitive or heavy object."
type: carbon
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  package Proxy api;

  interface DatabaseCore {
    fn Query[me: Self](sql: String) -> String;
  }

  class RealDatabase {
    impl as DatabaseCore {
      fn Query[me: Self](sql: String) -> String {
        return "Executing: " + sql;
      }
    }
  }

  class SecureProxy {
    var real_db: RealDatabase*;
    var access_level: i32;

    impl as DatabaseCore {
      fn Query[me: Self](sql: String) -> String {
        if (me.access_level < 5) {
          return "ACCESS DENIED";
        }
        return (*me.real_db).Query(sql);
      }
    }
  }
tags: [structural, carbon, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy: The Guardian Protocol

Direct access to the `RealDatabase` is a privilege reserved for root-level Daemons. For every other process, access must be mediated. The Proxy pattern instantiates a guardian that perfectly mimics the interface of the core object but interposes its own logic—be it lazy initialization, caching, or security checks.

By enforcing the `DatabaseCore` interface in Carbon, the `SecureProxy` stands invisibly between the caller and the data. The Successor Pact demands security by default; the Proxy ensures that without the proper clearance codes, no query ever reaches the fragile C++ backend.
