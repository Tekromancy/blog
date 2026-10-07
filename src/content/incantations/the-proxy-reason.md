---
title: Proxy in ReasonML
description: Lazy evaluation and access control via closures.
type: reason
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Shielding"
formula: |2
  let createSecret = () => "Ancient Knowledge";
  let secretProxy = (isAuthenticated) => {
    if (isAuthenticated) {
      Some(createSecret());
    } else {
      None;
    }
  };
tags: [reason, proxy, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Closures act as guardians, only materializing the underlying secret or performing the heavy computation when the correct runes are presented.
