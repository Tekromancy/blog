---
title: The Proxy
description: A guardian entity controlling access to a sacred relic.
type: pascal
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Conjuration // Guardianship
formula: |
  unit ProxyPattern;
  interface
  type
    IArtifact = interface
      procedure Unleash;
    end;
    TArtifactProxy = class(TInterfacedObject, IArtifact)
    public
      procedure Unleash;
    end;
  implementation
  end.
tags: [guardian, strict-types, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Implements strict security boundaries before allowing invocation of the true object of power.
