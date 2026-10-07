---
title: The Mediator of the Guild Council
description: Centralize complex communication between rival mage factions through a neutral arbiter.
type: prolog
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Diplomacymancy"
formula: |2
  % Factions
  faction(pyromancers).
  faction(cryomancers).
  faction(aeromancers).

  % The Mediator (The High Council) routes messages
  council_mediate(Sender, Receiver, Message) :-
      faction(Sender),
      faction(Receiver),
      format('Council routing message from ~w to ~w: "~w"', [Sender, Receiver, Message]).

  % Factions send messages only through the mediator
  send_message(Sender, Receiver, Message) :-
      council_mediate(Sender, Receiver, Message).

  % ?- send_message(pyromancers, cryomancers, 'Let us combine to make steam.').
  % "Council routing message from pyromancers to cryomancers: "Let us combine to make steam.""
tags: [mediator, behavioral, prolog, communication, council]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
