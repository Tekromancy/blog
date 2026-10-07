---
title: The Proxy Incantation
description: Providing a placeholder to control access to heavy, volatile ward matrices.
type: ada
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Access Control
formula: |
  package Ward_Proxies is
  
     type Subject is abstract tagged null record;
     procedure Invoke_Ward (S : in Subject) is abstract;
     
     type Real_Subject is new Subject with null record;
     overriding procedure Invoke_Ward (S : in Real_Subject);
     
     type Proxy_Subject is new Subject with record
        Real : access Real_Subject;
        Is_Authorized : Boolean := False;
     end record;
     
     overriding procedure Invoke_Ward (S : in Proxy_Subject);
     
  end Ward_Proxies;
  
  package body Ward_Proxies is
     procedure Invoke_Ward (S : in Real_Subject) is
     begin
        null; -- Heavy magical initialization
     end Invoke_Ward;
     
     procedure Invoke_Ward (S : in Proxy_Subject) is
     begin
        if S.Is_Authorized then
           if S.Real /= null then
              Invoke_Ward (S.Real.all);
           end if;
        end if;
     end Invoke_Ward;
  end Ward_Proxies;
tags: [ada, abjuration, proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Deploying a Class IV ontological barrier requires immense mana and DoD clearance. The Proxy stands in for the real subject, intercepting invocation requests, verifying credentials, and deferring initialization until absolute necessity demands it.
