---
title: The Proxy of the Guardian Spirit
description: Control access to ancient secrets through a protective logical guardian.
type: prolog
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Guardianmancy
formula: |
  % The Real Subject: The hidden knowledge
  read_forbidden_tome(Knowledge) :-
      Knowledge = 'The true name of the stars is...'.
  
  % The Proxy: Checks credentials before allowing access
  proxy_read_tome(User, Knowledge) :-
      has_clearance(User),
      read_forbidden_tome(Knowledge).
  proxy_read_tome(User, _) :-
      \+ has_clearance(User),
      format('Access denied for ~w. The guardian wards you away.', [User]),
      fail.
      
  % Access Rules
  has_clearance(archmage_aelin).
  has_clearance(grand_seer).
  
  % ?- proxy_read_tome(apprentice_bob, K).
  % "Access denied for apprentice_bob. The guardian wards you away."
  % false.
  
  % ?- proxy_read_tome(archmage_aelin, K).
  % K = 'The true name of the stars is...'.
tags: [proxy, structural, prolog, access-control, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
