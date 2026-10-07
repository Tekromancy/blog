---
title: Adapter in Elm
description: Bridging foreign signals into the pure Elm domain using the Adapter pattern.
type: elm
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Translation"
formula: |2
  module Adapter exposing (ForeignUser, LocalUser, adaptUser, viewUser)
  
  import Html exposing (Html, div, text)
  
  -- The Foreign Data Structure (e.g., from a JS interop or old API)
  type alias ForeignUser =
      { first_name : String
      , last_name : String
      , active_status : Int
      }
  
  -- The Local Pure Elm Data Structure
  type alias LocalUser =
      { fullName : String
      , isActive : Bool
      }
  
  -- The Adapter Function
  adaptUser : ForeignUser -> LocalUser
  adaptUser foreign =
      { fullName = foreign.first_name ++ " " ++ foreign.last_name
      , isActive = foreign.active_status == 1
      }
  
  viewUser : LocalUser -> Html msg
  viewUser user =
      div [] [ text (user.fullName ++ " - Active: " ++ (if user.isActive then "Yes" else "No")) ]
tags: [elm, structural, adapter, interop, translation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Adapter: Deciphering the Alien Lexicon

When the pristine, strongly-typed sanctuary of Elm must interface with the chaotic JavaScript outer planes via Ports, the Adapter pattern is the essential translator. Instead of wrapping objects, Elm employs pure mapping functions. The Adapter consumes the chaotic, loosely-typed `ForeignUser` and transmutes it into the predictable, elegant `LocalUser`, shielding the core `update` loop from external corruption.
