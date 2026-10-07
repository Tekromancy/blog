---
title: "The Proxy Guardian"
description: "A placeholder controlling access to a powerful relic."
type: eiffel
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  class
      RELIC_PROXY

  inherit
      MAGIC_RELIC

  feature {NONE}
      real_relic: REAL_RELIC

  feature -- Access
      invoke_power (mage_auth: STRING)
          require
              is_authorized: mage_auth.is_equal("ARCHMAGE")
          do
              if real_relic = Void then
                  create real_relic.make
              end
              real_relic.invoke_power (mage_auth)
          ensure
              power_invoked: True
          end
  end
tags: [structural, proxy, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy ensures that an expensive or dangerous real relic is only instantiated and accessed when the strict preconditions of authorization are met.
