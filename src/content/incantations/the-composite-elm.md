---
title: Composite in Elm
description: Structuring fractal UI components in Elm using recursive Union Types.
type: elm
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal Spawning"
formula: |2
  module Composite exposing (FileSystem(..), viewFileSystem)
  
  import Html exposing (Html, ul, li, text)
  import Html.Attributes exposing (class)
  
  -- The Component (both Leaf and Composite)
  type FileSystem
      = File String
      | Directory String (List FileSystem)
  
  viewFileSystem : FileSystem -> Html msg
  viewFileSystem fs =
      case fs of
          File name ->
              li [ class "file-node" ] [ text ("📄 " ++ name) ]
              
          Directory name children ->
              li [ class "dir-node" ]
                  [ text ("📁 " ++ name)
                  , ul [ class "dir-children" ] (List.map viewFileSystem children)
                  ]
tags: [elm, structural, composite, recursion, custom-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite: The Fractal Datoscape

To navigate the endless branches of a datascape, the Elm mage relies on recursive Custom Types to invoke the Composite pattern. By defining a type that contains instances of itself, one creates a uniform interface for both individual data-nodes (Files) and complex clusters (Directories). The `viewFileSystem` function thus becomes a recursive incantation, seamlessly rendering the entire fractal hierarchy into the DOM.
