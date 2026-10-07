---
title: "The Observer Scrying Orb"
description: "Broadcasting state changes to all bound familiars."
type: eiffel
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  deferred class
      SCRYING_OBSERVER

  feature
      update_vision (state: STRING)
          deferred
          end
  end

  class
      SCRYING_SUBJECT

  feature
      observers: LINKED_LIST [SCRYING_OBSERVER]

      attach (obs: SCRYING_OBSERVER)
          do
              observers.extend (obs)
          end

      notify_all (state: STRING)
          do
              across observers as o loop
                  o.item.update_vision (state)
              end
          end
  end
tags: [behavioral, observer, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Observer pattern establishes a scrying link. When the focal point shifts, all attached entities are instantly notified of the new paradigm.
