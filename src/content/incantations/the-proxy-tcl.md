---
title: The Proxy
description: Provides a surrogate or placeholder to control access to another powerful entity.
type: tcl
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Veiling"
formula: |2
  oo::class create CoreDatabase {
      method query {data} { puts "Executing high-risk query: $data" }
  }

  oo::class create VaultProxy {
      variable realDb accessLevel
      constructor {level} {
          set realDb ""
          set accessLevel $level
      }
      method query {data} {
          if {$accessLevel < 5} {
              puts "Access Denied: Insufficient arcane clearance."
              return
          }
          if {$realDb eq ""} {
              puts "Initializing connection to the Abyss..."
              set realDb [CoreDatabase new]
          }
          $realDb query $data
      }
  }

  set user [VaultProxy new 2]
  $user query "SELECT * FROM forbidden_knowledge"

  set admin [VaultProxy new 5]
  $admin query "SELECT * FROM forbidden_knowledge"
tags: [structural, proxy, illusion, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy

Direct access to the Abyss is fatal to the untrained mind. The Proxy stands as a guardian, evaluating clearance codes, lazy-loading the heavy magical connection only when absolutely required, and deflecting unauthorized scrying attempts with icy disdain.
