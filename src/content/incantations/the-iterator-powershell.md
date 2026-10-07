---
title: The Iterator of the Endless AD Forest
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
type: powershell
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sysadmin Telepathy"
formula: |2
  class IIterator {
      [bool] HasNext() { throw "Not Implemented" }
      [object] Next() { throw "Not Implemented" }
  }

  class ADUserCollection {
      [string[]]$_users
      ADUserCollection([string[]]$u) { $this._users = $u }
      [IIterator] CreateIterator() { return [ADUserIterator]::new($this) }
  }

  class ADUserIterator : IIterator {
      [ADUserCollection]$_collection
      [int]$_index = 0

      ADUserIterator([ADUserCollection]$coll) { $this._collection = $coll }

      [bool] HasNext() {
          return $this._index -lt $this._collection._users.Length
      }

      [object] Next() {
          $user = $this._collection._users[$this._index]
          $this._index++
          return $user
      }
  }

  # Traversing the forest
  $users = [ADUserCollection]::new(@("Administrator", "Guest", "Krbtgt"))
  $iterator = $users.CreateIterator()

  while ($iterator.HasNext()) {
      Write-Host "Scrying user: $($iterator.Next())"
  }
tags: [powershell, sysadmin, behavioral, iterator, active-directory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Navigating the shadowy woods of Active Directory requires focus. The Iterator abstracts the traversal of complex topological graphs, yielding entities one by one without revealing the terrifying depth of the forest.
